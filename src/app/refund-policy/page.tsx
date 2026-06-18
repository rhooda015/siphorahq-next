import ProtectedEmail from '@/components/ProtectedEmail';
export { refundMetadata as metadata } from '@/lib/metadata';

const highlights = [
  { icon: '7', label: 'Day Return Window', sub: 'From delivery date' },
  { icon: '₹', label: 'Full Refund', sub: 'For eligible returns' },
  { icon: '48', label: 'Hour Processing', sub: 'Refund initiation' },
  { icon: '✓', label: 'Free Pickup', sub: 'For damaged items' },
];

const sections = [
  {
    id: '01',
    title: 'Overview',
    content: `At SiphoraHQ, we take pride in the quality of every piece we craft. If you are not completely satisfied with your purchase, we are here to make it right. This policy outlines the conditions under which we accept returns and process refunds.

Please read this policy carefully before placing an order. By purchasing from siphorahq.in, you agree to the terms below.`,
  },
  {
    id: '02',
    title: 'Eligible Returns',
    content: 'We accept returns within 7 days of delivery for the following reasons:',
    bullets: [
      'Product received is damaged or broken during transit',
      'Product received is defective (manufacturing defect)',
      'Wrong product delivered (different from what was ordered)',
      'Product is missing from the package',
      'Product significantly differs from the description or images on our website',
    ],
    note: 'Photographic evidence is required for all damage/defect claims. Please photograph the item and packaging before disposing.',
  },
  {
    id: '03',
    title: 'Non-Eligible Returns',
    content: 'We do not accept returns in the following cases:',
    bullets: [
      'Return request raised after 7 days from delivery date',
      'Product has been used, washed, or damaged by the customer',
      'Product packaging has been discarded or is missing',
      'Minor colour variations due to photography lighting or screen calibration',
      'Change of mind after delivery (we encourage reviewing product details carefully before purchase)',
      'Products purchased during sale or at discounted prices (unless defective)',
    ],
  },
  {
    id: '04',
    title: 'How to Initiate a Return',
    content: null,
    steps: [
      {
        num: 'Step 1',
        title: 'Contact Us Within 7 Days',
        detail: 'Email concierge [at] siphorahq.in with your order number, reason for return, and clear photographs of the product and packaging.',
      },
      {
        num: 'Step 2',
        title: 'Return Approval',
        detail: 'Our team will review your request within 24–48 business hours and communicate approval or rejection with reason.',
      },
      {
        num: 'Step 3',
        title: 'Product Pickup',
        detail: 'For approved returns, we will arrange a free reverse pickup from your delivery address within 3–5 business days.',
      },
      {
        num: 'Step 4',
        title: 'Quality Inspection',
        detail: 'Once received, our team inspects the returned product within 2 business days.',
      },
      {
        num: 'Step 5',
        title: 'Refund Processed',
        detail: 'Upon successful inspection, your refund is initiated within 48 hours to your original payment method.',
      },
    ],
  },
  {
    id: '05',
    title: 'Refund Timeline',
    content: null,
    list: [
      { label: 'UPI / Net Banking', detail: '2–3 business days after refund initiation' },
      { label: 'Credit / Debit Card', detail: '5–7 business days (depends on your bank)' },
      { label: 'Razorpay Wallet', detail: '1–2 business days' },
      { label: 'Cash on Delivery', detail: 'Bank transfer within 5–7 business days (NEFT/IMPS)' },
    ],
    note: 'Refund timelines are after initiation from our end. Actual credit depends on your bank or payment provider.',
  },
  {
    id: '06',
    title: 'Exchange Policy',
    content: `We offer exchanges for the same product in case of damage or defect, subject to stock availability. If the original product is out of stock, a full refund will be processed instead.

To request an exchange, follow the same process as a return and mention your preference for exchange in your email.`,
  },
  {
    id: '07',
    title: 'Cancellation Policy',
    content: null,
    bullets: [
      'Orders can be cancelled within 12 hours of placement, before processing begins',
      'Once the order is packed and dispatched, cancellation is not possible',
      'To cancel, email concierge [at] siphorahq.in immediately with your order number',
      'Cancelled order refunds are processed within 2–3 business days',
    ],
  },
  {
    id: '08',
    title: 'Marketplace Orders',
    content: `For orders placed through Amazon, Flipkart, or Meesho, the return and refund policy of the respective marketplace applies. Please initiate returns directly through the marketplace platform.

For any additional support, you may write to us at concierge [at] siphorahq.in with your marketplace order ID.`,
  },
  {
    id: '09',
    title: 'Contact Us',
    content: null,
    contact: true,
  },
];

export default function RefundPolicy() {
  return (
    <main className="min-h-screen bg-white">
      <div className="border-b border-gray-100 py-12 px-6">
        <div className="max-w-3xl mx-auto">
          <p className="text-xs tracking-[0.2em] uppercase text-gray-400 mb-3">Legal</p>
          <h1 className="text-4xl font-light tracking-wide text-gray-900 mb-4">Refund & Return Policy</h1>
          <p className="text-sm text-gray-500">Effective Date: 1 June 2026 &nbsp;·&nbsp; Last Updated: 7 June 2026</p>
        </div>
      </div>

      {/* Highlights */}
      <div className="border-b border-gray-100">
        <div className="max-w-3xl mx-auto px-6 py-8">
          <div className="grid grid-cols-4 gap-4">
            {highlights.map((h, i) => (
              <div key={i} className="text-center">
                <div className="text-2xl font-light text-gray-900 mb-1">{h.icon}</div>
                <div className="text-xs font-medium text-gray-800">{h.label}</div>
                <div className="text-xs text-gray-400 mt-0.5">{h.sub}</div>
              </div>
            ))}
          </div>
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

                {'note' in section && section.note && (
                  <div className="mt-4 pl-4 border-l-2 border-amber-200">
                    <p className="text-xs text-amber-700">{section.note}</p>
                  </div>
                )}

                {section.list && (
                  <div className="space-y-3 mt-3">
                    {section.list.map((item, i) => (
                      <div key={i} className="flex items-center justify-between py-2 border-b border-gray-50 text-sm">
                        <span className="font-medium text-gray-800">{item.label}</span>
                        <span className="text-gray-500 text-right">{item.detail}</span>
                      </div>
                    ))}
                  </div>
                )}

                {section.steps && (
                  <div className="space-y-4 mt-3">
                    {section.steps.map((step, i) => (
                      <div key={i} className="flex gap-4">
                        <div className="flex-shrink-0 w-16 text-xs font-mono text-gray-400 pt-0.5">{step.num}</div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">{step.title}</p>
                          <p className="text-sm text-gray-500 mt-1 leading-relaxed">{step.detail}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {section.contact && (
                  <div className="bg-gray-50 rounded-lg p-6 text-sm space-y-2 text-gray-700">
                    <p className="font-medium text-gray-900">SiphoraHQ Customer Care</p>
                    <p>Email: <ProtectedEmail email="concierge@siphorahq.in" className="underline underline-offset-2" /></p>
                    <p>Response Time: Within 24–48 business hours</p>
                    <p className="text-gray-500 text-xs pt-1">Please include your order number in all correspondence for faster resolution.</p>
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
