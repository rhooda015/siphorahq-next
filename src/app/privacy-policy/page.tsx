export { privacyMetadata as metadata } from '@/lib/metadata';

const sections = [
  {
    id: '01',
    title: 'About This Policy',
    content: `This Privacy Policy describes how SiphoraHQ ("we", "our", "us"), operated by Rohit Hooda, Faridabad, Haryana – 121001, India (GSTIN: 06APTPH1635N1ZG), collects, uses, stores, and protects your personal information when you visit siphorahq.in or make a purchase from us.

By accessing our website or placing an order, you consent to the practices described in this policy. If you do not agree with this policy, please do not use our website.`,
  },
  {
    id: '02',
    title: 'Information We Collect',
    content: null,
    list: [
      { label: 'Identity Information', detail: 'Full name, date of birth (if provided)' },
      { label: 'Contact Information', detail: 'Email address, phone number, shipping and billing address' },
      { label: 'Transaction Information', detail: 'Order history, payment method type, invoice details, GST information' },
      { label: 'Device & Usage Information', detail: 'IP address, browser type, pages visited, time spent, referral source, device identifiers' },
      { label: 'Communication Data', detail: 'Messages sent via email, WhatsApp, or contact forms' },
      { label: 'Marketing Preferences', detail: 'Newsletter subscriptions, promotional opt-ins and opt-outs' },
    ],
  },
  {
    id: '03',
    title: 'How We Collect Information',
    content: null,
    bullets: [
      'When you create an account or place an order on our website',
      'When you subscribe to our newsletter or fill a contact form',
      'When you interact with us on Instagram, WhatsApp, or other social channels',
      'Automatically via cookies, analytics tools, and server logs',
      'From third-party platforms (Amazon, Flipkart, Meesho) when you purchase our listed products',
    ],
  },
  {
    id: '04',
    title: 'How We Use Your Information',
    content: null,
    bullets: [
      'To process, fulfill, and deliver your orders',
      'To send order confirmations, shipping updates, and delivery notifications',
      'To respond to your queries, returns, or complaints',
      'To improve our website, products, and customer experience',
      'To send promotional emails or offers (only if you have opted in)',
      'To comply with legal obligations under Indian law, including GST regulations',
      'To detect and prevent fraud, abuse, and security incidents',
    ],
  },
  {
    id: '05',
    title: 'Payment & Financial Data',
    content: `All payment transactions on siphorahq.in are processed securely through Razorpay (a PCI-DSS Level 1 compliant payment gateway). We do not store, log, or have access to your card number, CVV, UPI PIN, or net banking credentials. Payment data is handled entirely by Razorpay under their own Privacy Policy available at razorpay.com/privacy.`,
  },
  {
    id: '06',
    title: 'Sharing Your Information',
    content: 'We do not sell or rent your personal data to any third party. We may share your information with the following trusted partners solely to operate our services:',
    list: [
      { label: 'Logistics Partners', detail: 'Delhivery, BlueDart, XpressBees, EcomExpress — for order delivery and tracking' },
      { label: 'Payment Processors', detail: 'Razorpay — for secure transaction processing' },
      { label: 'Marketing Tools', detail: 'Zoho Campaigns — for newsletters (opted-in users only)' },
      { label: 'Analytics', detail: 'Google Analytics — for anonymised website performance tracking' },
      { label: 'Legal Authorities', detail: 'When required by Indian law, court order, or government regulation' },
    ],
  },
  {
    id: '07',
    title: 'Cookies & Tracking',
    content: 'We use cookies and similar tracking technologies to remember your cart and session preferences, analyse traffic and user behaviour via Google Analytics, and serve relevant advertisements on Meta (Facebook/Instagram). You may manage or disable cookies via your browser settings. Disabling cookies may affect certain website features such as cart persistence.',
  },
  {
    id: '08',
    title: 'Data Retention',
    content: `We retain your personal data for as long as necessary to fulfill the purposes outlined in this policy, or as required by applicable Indian laws. GST and invoice records must be maintained for a minimum of 6 years under Indian tax law. Account data is retained until you formally request deletion by writing to us.`,
  },
  {
    id: '09',
    title: 'Your Rights',
    content: 'Under applicable Indian data protection laws, including the Digital Personal Data Protection Act 2023, you have the right to:',
    bullets: [
      'Access the personal data we hold about you',
      'Request correction of inaccurate or incomplete information',
      'Request deletion of your account and associated personal data',
      'Withdraw consent for marketing communications at any time',
      'Nominate a person to exercise your rights in the event of your death or incapacity',
      'Lodge a complaint with the Data Protection Board of India',
    ],
  },
  {
    id: '10',
    title: "Children's Privacy",
    content: `Our website and services are not directed at children under the age of 18. We do not knowingly collect personal information from minors. If you believe a minor has provided us with personal data without parental consent, please contact us immediately at concierge@siphorahq.in and we will take prompt steps to delete such data.`,
  },
  {
    id: '11',
    title: 'Third-Party Links',
    content: `Our website may contain links to third-party platforms including Amazon, Flipkart, Meesho, and Instagram. We are not responsible for the privacy practices of these platforms and encourage you to review their respective privacy policies before providing any personal information.`,
  },
  {
    id: '12',
    title: 'Security',
    content: `We implement industry-standard security measures including HTTPS encryption, secure server infrastructure, and restricted access controls to protect your personal data. However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.`,
  },
  {
    id: '13',
    title: 'Changes to This Policy',
    content: `We may update this Privacy Policy from time to time to reflect changes in our practices or applicable law. Any changes will be posted on this page with an updated effective date. Continued use of our website after changes constitutes your acceptance of the revised policy. For material changes, we will notify registered users by email.`,
  },
  {
    id: '14',
    title: 'Contact & Grievance Officer',
    content: null,
    contact: true,
  },
];

export default function PrivacyPolicy() {
  return (
    <main className="min-h-screen bg-white">
      <div className="border-b border-gray-100 py-12 px-6">
        <div className="max-w-3xl mx-auto">
          <p className="text-xs tracking-[0.2em] uppercase text-gray-400 mb-3">Legal</p>
          <h1 className="text-4xl font-light tracking-wide text-gray-900 mb-4">Privacy Policy</h1>
          <p className="text-sm text-gray-500">Effective Date: 1 June 2026 &nbsp;·&nbsp; Last Updated: 7 June 2026</p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-14">
        <div className="space-y-12">
          {sections.map((section) => (
            <section key={section.id} className="grid grid-cols-[64px_1fr] gap-8">
              <div className="pt-0.5">
                <span className="text-xs font-mono text-gray-300">{section.id}</span>
              </div>
              <div>
                <h2 className="text-sm font-medium uppercase tracking-[0.15em] text-gray-900 mb-4">{section.title}</h2>

                {section.content && (
                  <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-line">{section.content}</p>
                )}

                {section.list && (
                  <div className="space-y-3 mt-3">
                    {section.list.map((item, i) => (
                      <div key={i} className="flex gap-3 text-sm">
                        <span className="font-medium text-gray-800 min-w-[160px]">{item.label}</span>
                        <span className="text-gray-500">{item.detail}</span>
                      </div>
                    ))}
                  </div>
                )}

                {section.bullets && (
                  <ul className="space-y-2 mt-3">
                    {section.bullets.map((b, i) => (
                      <li key={i} className="flex gap-3 text-sm text-gray-600">
                        <span className="text-gray-300 mt-1.5 flex-shrink-0">—</span>
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {section.contact && (
                  <div className="bg-gray-50 rounded-lg p-6 text-sm space-y-2 text-gray-700">
                    <p className="font-medium text-gray-900">SiphoraHQ — Grievance Officer</p>
                    <p>Rohit Hooda</p>
                    <p>Faridabad, Haryana – 121001, India</p>
                    <p>GSTIN: 06APTPH1635N1ZG</p>
                    <p className="pt-1">
                      Email:{' '}
                      <a href="mailto:concierge@siphorahq.in" className="underline underline-offset-2">
                        concierge@siphorahq.in
                      </a>
                    </p>
                    <p className="text-gray-500 text-xs pt-1">We aim to respond to all grievances within 72 business hours.</p>
                  </div>
                )}
              </div>
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}
