const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE = /^[+()\-\s\d]{7,20}$/;

/**
 * Validates an enquiry payload. `rules` lists which fields are required.
 * Returns an object of { field: message } — empty when valid.
 */
export function validateEnquiry(values, required = []) {
  const errors = {};
  const req = (k, msg) => {
    if (required.includes(k) && !String(values[k] ?? '').trim()) errors[k] = msg;
  };
  req('name', 'Please enter your name.');
  req('company', 'Please enter your company or organisation.');
  req('email', 'Please enter your business email.');
  req('phone', 'Please enter a contact number.');
  req('enquiryType', 'Please choose an enquiry type.');
  req('product', 'Please tell us which product you are interested in.');
  req('quantity', 'Please select an approximate quantity.');
  req('message', 'Please add a short description of your requirement.');

  if (values.email && !EMAIL.test(values.email.trim())) errors.email = 'Please enter a valid email address.';
  if (values.phone && !PHONE.test(values.phone.trim())) errors.phone = 'Please enter a valid phone number.';
  if (values.name && values.name.length > 100) errors.name = 'Please keep the name under 100 characters.';
  if (values.company && values.company.length > 150) errors.company = 'Please keep this under 150 characters.';
  if (values.message && values.message.length > 2000) errors.message = 'Please keep your message under 2000 characters.';
  return errors;
}

/**
 * Sends an enquiry to the server (public/api/enquiry.php), which emails it to the team.
 * `guard` comes from useSpamGuard(). In local development (no PHP), it is simulated.
 * Returns { ok: true, reference } or { ok: false, error: 'rate' | 'failed' }.
 */
export async function submitEnquiry(payload, guard) {
  const body = { ...payload, _hp: guard?.hp ?? '', _t: guard ? Date.now() - guard.start : 0 };

  if (import.meta.env.DEV) {
    await new Promise((r) => setTimeout(r, 700));
    return { ok: true, reference: 'CE-DEV001' };
  }

  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), 15000);
  try {
    const res = await fetch('/api/enquiry.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
      credentials: 'same-origin',
      signal: ctrl.signal,
    });
    const data = await res.json().catch(() => null);
    if (res.ok && data?.ok) return { ok: true, reference: String(data.reference ?? '') };
    return { ok: false, error: res.status === 429 ? 'rate' : 'failed' };
  } catch {
    return { ok: false, error: 'failed' };
  } finally {
    clearTimeout(timer);
  }
}

export const SUBMIT_ERRORS = {
  rate: 'You have sent several enquiries in a short time. Please wait a few minutes and try again.',
  failed: 'Sorry, your enquiry could not be sent. Please try again, or email us at',
};
