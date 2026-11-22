import usePageMeta from '../hooks/usePageMeta';
import Breadcrumbs from '../components/Breadcrumbs/Breadcrumbs';
import Button from '../components/Buttons/Button';
import { site } from '../data/site';

const UPDATED = '22 November 2026';
const EMAIL = site.contact.email.value;
const ADDRESS = site.contact.address.value;

const Mail = () => <a href={site.contact.email.href} className="text-ink underline underline-offset-2 hover:text-accent">{EMAIL}</a>;

/* Each section: { id, title, body: [paragraph | { list: [...] }] } */
const CONTENT = {
  privacy: {
    title: 'Privacy Policy',
    intro:
      'This Privacy Policy explains how Crista Enterprises (“Crista”, “we”, “us”) collects, uses and protects personal data when you visit cristaenterprises.com or send us an enquiry. It is written in line with the Digital Personal Data Protection Act, 2023, the Digital Personal Data Protection Rules, 2025 and the Information Technology Act, 2000.',
    sections: [
      {
        id: 'who-we-are',
        title: 'Who we are',
        body: [
          <>Crista Enterprises is a business-to-business supplier of commercial and industrial LED lighting, outdoor gym and playground equipment, and corporate gifting, based in {ADDRESS}, India. For the personal data described here, we are the Data Fiduciary.</>,
        ],
      },
      {
        id: 'data-we-collect',
        title: 'Personal data we collect',
        body: [
          'We only collect what we need to respond to you and supply our products:',
          {
            list: [
              <><strong>Enquiry and quote forms:</strong> your name, company or organisation, business email, phone number, the product or category you are interested in, required quantity, delivery location and any details you choose to add.</>,
              <><strong>Direct contact:</strong> information you share when you email, call or message us.</>,
              <><strong>Orders and supply:</strong> billing and delivery details, GST number and site contact details needed to quote, deliver and install products.</>,
              <><strong>Technical data:</strong> IP address, browser type and pages visited, recorded automatically in standard server logs by our hosting provider for security and performance.</>,
            ],
          },
          'We do not knowingly collect personal data from children. Our website and services are intended for businesses and adults.',
        ],
      },
      {
        id: 'how-we-use',
        title: 'How we use your data',
        body: [
          {
            list: [
              'To respond to enquiries and prepare quotations',
              'To process orders, arrange delivery and installation, and provide after-sales support',
              'To communicate with you about your enquiry, order or account',
              'To keep our website secure and working properly',
              'To meet legal, tax and accounting obligations',
            ],
          },
          'We do not sell your personal data, and we do not use it for purposes unrelated to your enquiry or business relationship with us without your consent.',
        ],
      },
      {
        id: 'legal-basis',
        title: 'Consent and legal basis',
        body: [
          'By submitting a form or contacting us, you give your consent for us to process the personal data you provide for the purposes above. Some processing is also needed to perform a contract with you or to comply with law.',
          <>You may withdraw your consent at any time by writing to <Mail />. Withdrawal does not affect processing already carried out, and we may be unable to continue an enquiry or order without the data needed for it.</>,
        ],
      },
      {
        id: 'sharing',
        title: 'Who we share it with',
        body: [
          'We share personal data only where needed, and only with:',
          {
            list: [
              'Service providers who help us run our business, such as website hosting, email and IT services',
              'Logistics, installation and manufacturing partners, limited to the details needed to fulfil your order',
              'Professional advisers such as accountants and auditors',
              'Government or regulatory authorities where required by law',
            ],
          },
          'Anyone who processes data on our behalf is required to protect it and use it only for the purpose we share it for.',
        ],
      },
      {
        id: 'cookies',
        title: 'Cookies and local storage',
        body: [
          'Our website does not use advertising or tracking cookies. Your browser’s local storage is used only to remember items you add to a shortlist on our Corporate Gifting page; this stays on your device and is not sent to us. Some images on the site are loaded from third-party content delivery services, which may receive your IP address as part of delivering them.',
        ],
      },
      {
        id: 'retention',
        title: 'How long we keep it',
        body: [
          'We keep enquiry data for as long as needed to respond and follow up, and order data for as long as required for the business relationship and under tax and accounting laws. When data is no longer needed, we delete it or make it anonymous.',
        ],
      },
      {
        id: 'security',
        title: 'How we protect it',
        body: [
          'We use reasonable security safeguards, including encrypted (HTTPS) connections and restricted access to personal data. If a personal data breach occurs, we will inform affected individuals and the Data Protection Board of India as required by law.',
        ],
      },
      {
        id: 'your-rights',
        title: 'Your rights',
        body: [
          'Under the Digital Personal Data Protection Act, 2023, you have the right to:',
          {
            list: [
              'Access a summary of the personal data we hold about you and how it is processed',
              'Correct, complete or update inaccurate or incomplete data',
              'Request erasure of data that is no longer needed',
              'Withdraw consent at any time',
              'Nominate another person to exercise your rights in the event of death or incapacity',
              'Seek grievance redressal from us, and then from the Data Protection Board of India',
            ],
          },
          <>To exercise any of these rights, email <Mail /> from the address you used with us, so we can verify your request.</>,
        ],
      },
      {
        id: 'grievance',
        title: 'Grievance redressal',
        body: [
          <>For any question or complaint about how we handle personal data, contact our Grievance Officer at <Mail />. We will acknowledge your complaint and resolve it within a reasonable time, and in any case within 90 days. If you are not satisfied with our response, you may approach the Data Protection Board of India.</>,
        ],
      },
      {
        id: 'changes',
        title: 'Changes to this policy',
        body: ['We may update this policy from time to time. The latest version will always be on this page, with the date it was last updated.'],
      },
    ],
  },

  terms: {
    title: 'Terms & Conditions',
    intro:
      'These Terms & Conditions govern your use of cristaenterprises.com and the supply of products by Crista Enterprises (“Crista”, “we”, “us”). By using this website or placing an order with us, you agree to these terms.',
    sections: [
      {
        id: 'website-use',
        title: 'Use of this website',
        body: [
          'This website is intended for business customers, institutions, contractors and dealers. You agree to use it lawfully and not to misuse it, attempt to gain unauthorised access to it, or submit false or misleading information through its forms.',
        ],
      },
      {
        id: 'product-info',
        title: 'Product information',
        body: [
          'We make every effort to keep product descriptions, specifications and images accurate. However, images are for illustration, and dimensions, colours, finishes and specifications may vary between batches or be updated by manufacturers without notice. The specifications confirmed in your quotation or order confirmation take precedence over information shown on this website.',
        ],
      },
      {
        id: 'quotations',
        title: 'Quotations and orders',
        body: [
          {
            list: [
              'Prices shown on this website are in Indian rupees and exclude GST. Products without a listed price are quoted on request.',
              'Each quotation states its validity period, scope of supply, taxes, delivery and payment terms. Unless stated otherwise, prices are exclusive of GST, freight and installation.',
              'An order is binding only after we confirm it in writing and, where applicable, receive the agreed advance payment.',
              'Custom sizes, colours or configurations may require approval of drawings or samples before production and may not be cancellable once production starts.',
            ],
          },
        ],
      },
      {
        id: 'payment',
        title: 'Payment',
        body: [
          'Payment terms are set out in each quotation or order confirmation. We may hold dispatch until payments due are received. Ownership of products passes to you once full payment has been made.',
        ],
      },
      {
        id: 'delivery',
        title: 'Delivery and installation',
        body: [
          'Delivery timelines are estimates and depend on stock, production and transport conditions. We are not liable for delays caused by events beyond our reasonable control. Risk in the products passes to you on delivery to the agreed location.',
          'Where installation is included, you are responsible for providing clear site access, a suitable prepared surface or foundation where required, and any approvals needed for the site. Please inspect products on delivery and report any transit damage or shortage within 48 hours, with photographs.',
        ],
      },
      {
        id: 'warranty',
        title: 'Warranty',
        body: [
          'Products carry the warranty stated in your quotation or the manufacturer’s warranty, whichever applies. Warranty covers manufacturing defects under normal use and does not cover damage caused by misuse, vandalism, accidents, improper installation by others, unauthorised modification, electrical fluctuations beyond rated limits, or normal wear and tear.',
          'Warranty claims must be raised in writing with the invoice details and photographs of the issue. At our option, we will repair or replace the defective item or part.',
        ],
      },
      {
        id: 'returns',
        title: 'Returns and cancellations',
        body: [
          'Because our products are supplied for business and project use, returns are accepted only for items that are defective or not as ordered, reported within the period above. Cancellations of confirmed orders are subject to our written approval and may attract charges for costs already incurred.',
        ],
      },
      {
        id: 'ip',
        title: 'Intellectual property',
        body: [
          'The content of this website, including text, design, logos and graphics, belongs to Crista Enterprises or its licensors. You may not copy, reproduce or use it for commercial purposes without our written permission. Third-party brand names, where mentioned, belong to their respective owners.',
        ],
      },
      {
        id: 'liability',
        title: 'Limitation of liability',
        body: [
          'To the extent permitted by law, we are not liable for indirect or consequential losses, including loss of profit or business. Our total liability for any order is limited to the amount paid for the products concerned. Nothing in these terms limits liability that cannot be limited under Indian law.',
        ],
      },
      {
        id: 'third-party',
        title: 'Third-party links',
        body: ['This website may link to third-party websites. We are not responsible for their content, policies or practices.'],
      },
      {
        id: 'law',
        title: 'Governing law and jurisdiction',
        body: [
          'These terms are governed by the laws of India. Any dispute will first be attempted to be resolved through good-faith discussion. If unresolved, the courts at Bhopal, Madhya Pradesh will have exclusive jurisdiction.',
        ],
      },
      {
        id: 'changes',
        title: 'Changes to these terms',
        body: ['We may update these terms from time to time. The version published on this page at the time of your order applies to that order.'],
      },
      {
        id: 'contact',
        title: 'Contact',
        body: [<>Questions about these terms can be sent to <Mail />.</>],
      },
    ],
  },
};

export default function Legal({ kind }) {
  const c = CONTENT[kind];
  usePageMeta(c.title);

  return (
    <section className="wrap py-14 lg:py-20">
      <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: c.title }]} />

      <div className="mt-10 max-w-3xl">
        <h1 className="display-lg">{c.title}</h1>
        <p className="mt-4 text-[13px] uppercase tracking-[0.14em] text-muted">Last updated: {UPDATED}</p>
        <p className="mt-6 text-[17px] leading-relaxed text-charcoal/80">{c.intro}</p>
      </div>

      <div className="mt-12 grid gap-12 lg:grid-cols-12">
        {/* Contents */}
        <nav aria-label="On this page" className="lg:col-span-3">
          <div className="lg:sticky lg:top-[calc(var(--header-h)+24px)]">
            <p className="eyebrow">On this page</p>
            <ol className="mt-4 space-y-2.5 border-l border-line pl-4 text-[14px]">
              {c.sections.map((s, i) => (
                <li key={s.id}>
                  <a href={`#${s.id}`} className="text-muted transition-colors hover:text-ink">
                    {i + 1}. {s.title}
                  </a>
                </li>
              ))}
            </ol>
          </div>
        </nav>

        {/* Body */}
        <div className="max-w-3xl lg:col-span-9">
          {c.sections.map((s, i) => (
            <section key={s.id} id={s.id} className="scroll-mt-[calc(var(--header-h)+24px)] border-t border-line py-8 first:border-t-0 first:pt-0">
              <h2 className="font-display text-[22px] font-semibold text-ink">
                <span className="mr-2 text-accent">{String(i + 1).padStart(2, '0')}</span>
                {s.title}
              </h2>
              <div className="mt-4 space-y-4 text-[16px] leading-relaxed text-charcoal/80">
                {s.body.map((b, j) =>
                  b && typeof b === 'object' && 'list' in b ? (
                    <ul key={j} className="list-disc space-y-2 pl-5 marker:text-accent">
                      {b.list.map((li, k) => <li key={k}>{li}</li>)}
                    </ul>
                  ) : (
                    <p key={j}>{b}</p>
                  ),
                )}
              </div>
            </section>
          ))}

          <div className="mt-6 border-l-2 border-accent bg-white p-6 text-[14px] leading-relaxed text-muted">
            Questions about this page? Write to <Mail />.
          </div>
          <Button to="/contact" variant="outline" className="mt-8">Contact us</Button>
        </div>
      </div>
    </section>
  );
}
