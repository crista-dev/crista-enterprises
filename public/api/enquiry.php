<?php
/**
 * Crista Enterprises — enquiry form handler.
 * Receives JSON from the website's forms and emails it to the team.
 *
 * Security: POST + JSON only, same-site origin check, size limit, honeypot,
 * minimum fill time, per-IP rate limit, strict field validation, and
 * header-injection-safe email. No user input is ever echoed back.
 */

/* ---------- Settings ---------- */
const MAIL_TO   = 'contact@cristaenterprises.com';   // where enquiries are delivered
const MAIL_FROM = 'contact@cristaenterprises.com';   // must be a real mailbox on your domain
const ALLOWED_HOSTS = ['cristaenterprises.com', 'www.cristaenterprises.com'];
const RATE_LIMIT = 5;          // max enquiries per IP ...
const RATE_WINDOW = 900;       // ... per 15 minutes
const MIN_FILL_MS = 2500;      // faster than this = bot
const MAX_BODY = 20000;        // bytes

header_remove('X-Powered-By');
header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');
header('X-Content-Type-Options: nosniff');

function respond(int $code, array $data): void {
    http_response_code($code);
    echo json_encode($data);
    exit;
}

/* ---------- Request checks ---------- */
if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    header('Allow: POST');
    respond(405, ['ok' => false, 'error' => 'method']);
}
if (stripos($_SERVER['CONTENT_TYPE'] ?? '', 'application/json') !== 0) {
    respond(415, ['ok' => false, 'error' => 'type']);
}

// Same-site only: Origin (or Referer) must be our own domain.
$origin = $_SERVER['HTTP_ORIGIN'] ?? $_SERVER['HTTP_REFERER'] ?? '';
$host = strtolower((string) parse_url($origin, PHP_URL_HOST));
if (!in_array($host, ALLOWED_HOSTS, true)) {
    respond(403, ['ok' => false, 'error' => 'origin']);
}

$raw = file_get_contents('php://input', false, null, 0, MAX_BODY + 1);
if ($raw === false || strlen($raw) > MAX_BODY) {
    respond(413, ['ok' => false, 'error' => 'size']);
}
$in = json_decode($raw, true);
if (!is_array($in)) {
    respond(400, ['ok' => false, 'error' => 'json']);
}

$reference = 'CE-' . strtoupper(bin2hex(random_bytes(3)));

// Bot traps: pretend success so bots learn nothing.
if (!empty($in['_hp']) || (int) ($in['_t'] ?? 0) < MIN_FILL_MS) {
    respond(200, ['ok' => true, 'reference' => $reference]);
}

/* ---------- Rate limit (per IP, stored as a hash) ---------- */
$ip = $_SERVER['REMOTE_ADDR'] ?? '0.0.0.0';
$rlFile = rtrim(sys_get_temp_dir(), '/\\') . '/crista_rl_' . hash('sha256', $ip . __FILE__);
$now = time();
$hits = [];
if (is_file($rlFile)) {
    $hits = json_decode((string) @file_get_contents($rlFile), true) ?: [];
    $hits = array_values(array_filter($hits, fn($t) => is_int($t) && $t > $now - RATE_WINDOW));
}
if (count($hits) >= RATE_LIMIT) {
    respond(429, ['ok' => false, 'error' => 'rate']);
}

/* ---------- Validation helpers ---------- */
function text($v, int $max, bool $multiline = false): string {
    if (!is_string($v) && !is_numeric($v)) return '';
    $v = (string) $v;
    if (!mb_check_encoding($v, 'UTF-8')) return '';
    // Remove control characters (keep newlines/tabs only in multi-line fields).
    $v = $multiline
        ? preg_replace('/[^\P{C}\n\t]/u', '', str_replace("\r", '', $v))
        : preg_replace('/\p{C}/u', ' ', $v);
    $v = trim(preg_replace('/[ \t]{2,}/', ' ', $v));
    return mb_substr($v, 0, $max);
}
function slug($v, int $max = 80): string {
    return (is_string($v) && preg_match('/^[a-z0-9-]{1,' . $max . '}$/', $v)) ? $v : '';
}
function oneOf($v, array $allowed): string {
    return (is_string($v) && in_array($v, $allowed, true)) ? $v : '';
}

$type = oneOf($in['type'] ?? '', ['quote', 'contact', 'corporate-gifting']) ?: 'contact';
$d = [
    'name'     => text($in['name'] ?? '', 100),
    'company'  => text($in['company'] ?? '', 150),
    'email'    => text($in['email'] ?? '', 254),
    'phone'    => text($in['phone'] ?? '', 20),
    'enquiry'  => oneOf($in['enquiryType'] ?? '', ['quote', 'bulk', 'dealer', 'product', 'other']),
    'product'  => slug($in['product'] ?? ''),
    'quantity' => text($in['quantity'] ?? '', 40),
    'message'  => text($in['message'] ?? '', 2000, true),
    'occasion' => text($in['occasion'] ?? '', 60),
    'recipients' => text($in['recipients'] ?? '', 20),
    'budget'   => slug($in['budget'] ?? '', 20),
    'date'     => (is_string($in['date'] ?? null) && preg_match('/^\d{4}-\d{2}-\d{2}$/', $in['date'])) ? $in['date'] : '',
    'delivery' => oneOf($in['delivery'] ?? '', ['single', 'multiple']),
    'branding' => !empty($in['branding']) ? 'Yes' : 'No',
];
$hampers = [];
if (isset($in['hampers']) && is_array($in['hampers'])) {
    foreach (array_slice($in['hampers'], 0, 20) as $h) {
        if ($s = slug($h, 60)) $hampers[] = $s;
    }
}

$errors = [];
if ($d['name'] === '') $errors[] = 'name';
if ($d['company'] === '') $errors[] = 'company';
if (!filter_var($d['email'], FILTER_VALIDATE_EMAIL)) $errors[] = 'email';
if (!preg_match('/^[+()\-\s\d]{7,20}$/', $d['phone'])) $errors[] = 'phone';
if ($errors) {
    respond(422, ['ok' => false, 'error' => 'invalid', 'fields' => $errors]);
}

/* ---------- Compose email (plain text, header-safe) ---------- */
$noCrlf = fn(string $s) => str_replace(["\r", "\n", '%0a', '%0d'], '', $s);
$labels = ['quote' => 'Quote request', 'contact' => 'Contact enquiry', 'corporate-gifting' => 'Corporate gifting enquiry'];

$lines = [
    'Reference: ' . $reference,
    'Type: ' . $labels[$type] . ($d['enquiry'] ? ' (' . $d['enquiry'] . ')' : ''),
    '',
    'Name: ' . $d['name'],
    'Company: ' . $d['company'],
    'Email: ' . $d['email'],
    'Phone: ' . $d['phone'],
];
foreach (['product' => 'Product', 'quantity' => 'Quantity', 'occasion' => 'Occasion', 'recipients' => 'Recipients',
          'budget' => 'Budget per gift', 'date' => 'Needed by', 'delivery' => 'Delivery'] as $k => $label) {
    if ($d[$k] !== '') $lines[] = $label . ': ' . $d[$k];
}
if ($type === 'corporate-gifting') $lines[] = 'Logo branding: ' . $d['branding'];
if ($hampers) $lines[] = 'Shortlisted hampers: ' . implode(', ', $hampers);
if ($d['message'] !== '') {
    $lines[] = '';
    $lines[] = 'Message:';
    $lines[] = $d['message'];
}
$lines[] = '';
$lines[] = '— Sent from the cristaenterprises.com website on ' . gmdate('Y-m-d H:i') . ' UTC';

$subject = mb_encode_mimeheader($noCrlf($labels[$type] . ' — ' . $d['company'] . ' [' . $reference . ']'), 'UTF-8');
$headers = implode("\r\n", [
    'From: Crista Website <' . MAIL_FROM . '>',
    // Address only: a display name built from user input could be parsed as a different reply address.
    'Reply-To: ' . $noCrlf($d['email']),
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset=UTF-8',
    'Content-Transfer-Encoding: 8bit',
    'X-Mailer: Crista-Website',
]);

$sent = @mail(MAIL_TO, $subject, implode("\n", $lines), $headers, '-f' . MAIL_FROM);
if (!$sent) {
    respond(500, ['ok' => false, 'error' => 'mail']);
}

$hits[] = $now;
@file_put_contents($rlFile, json_encode($hits), LOCK_EX);

respond(200, ['ok' => true, 'reference' => $reference]);
