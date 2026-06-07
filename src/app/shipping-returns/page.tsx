import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Shipping Policy | SiphoraHQ',
  description: 'SiphoraHQ shipping information — delivery timelines, free shipping, tracking, and international orders.',
};

const shippingZones = [
  { zone: 'Metro Cities', cities: 'Delhi, Mumbai, Bangalore, Chennai, Hyderabad, Kolkata', days: '3–5 days' },
  { zone: 'Tier 1 Cities', cities: 'Pune, Ahmedabad, Jaipur, Lucknow, Chandigarh, Surat', days: '4–6 days' },
  { zone: 'Tier 2 Cities', cities: 'Faridabad, Gurgaon, Noida, Agra, Indore, Bhopal, Nagpur', days: '4–7 days' },
  { zone: 'Rest of India', cities: 'All remaining pincodes serviced by courier partners', days: '5–8 days' },
  { zone: 'Remote Areas', cities: 'J&K, Northeast states, Andaman, Lakshadweep', days: '7–12 days' },
];

const couriers = [
  { name: 'Delhivery', strength: 'Pan-India, fastest metro delivery' },
  { name: 'BlueDart', strength: 'Premium shipments, high-value orders' },
  { name: 'XpressBees', strength: 'Tier 2 & 3 city coverage' },
  { name: 'EcomExpress', strength: 'Remote pin code coverage' },
];

const sections = [
  {
    id: '01',
    title: 'Overview',
    content: `SiphoraHQ ships across India through a network of trusted courier partners. Every order is carefully packed to ensure your porcelain and ceramic pieces arrive safely. This policy covers our shipping timelines, charges, tracking process, and special conditions.`,
  },
  {
    id: '02',
    title: 'Free Shipping',
    content: null,
    freeShipping: true,
  },
  {
    id: '03',
    title: 'Order Processing',
    content: null,
    bullets: [
      'Orders are processed Monday to Saturday, 10 AM – 6 PM IST (excluding public holidays)',
      'Orders placed before 12 PM are typically dispatched the same day',
      'Orders placed after 12 PM are dispatched the next business day',
      'During sale periods or high-demand seasons, processing may take 1–2 additional business days',
      'You will receive a dispatch confirmation email with tracking details once your order ships',
    ],
  },
  {
    id: '04',
    title: 'Delivery Timeline',
    content: 'Estimated delivery times from dispatch date:',
    zones: true,
  },
  {
    id: '05',
    title: 'Our Courier Partners',
    content: 'We partner with India\'s leading logistics providers for reliable and timely delivery:',
    courierList: true,
    note: 'The courier partner is assigned automatically based on your pincode and order value to ensure the fastest and safest delivery.',
  },
  {
    id: '06',
    title: 'Order Tracking',
    content: null,
    bullets: [
      'A tracking link will be sent to your registered email and phone number once your order is dispatched',
      'You can track your order directly on the courier partner\'s website using the AWB number provided',
      'For tracking assistance, email concierge@siphorahq.in with your order number',
      'Live tracking is available 4–6 hours after dispatch',
    ],
  },
  {
    id: '07',
    title: 'Packaging',
    content: `Every SiphoraHQ piece is packed with premium protective materials including bubble wrap, foam cushioning, and reinforced outer boxes. We take extra care with fragile items to minimise breakage risk during transit.

If your package arrives visibly damaged, please photograph the outer packaging before opening and contact us immediately.`,
  },
  {
    id: '08',
    title: 'Failed Delivery & Re-Attempts',
    content: null,
    bullets: [
      'Our courier partners make up to 3 delivery attempts',
      'After 3 failed attempts, the package is held at the local facility for 3–5 days',
      'If unclaimed, the package is returned to us (RTO — Return to Origin)',
      'For RTO orders, we will contact you to reship. Reshipping charges may apply',
      'Please ensure your delivery address and phone number are correct at checkout',
    ],
  },
  {
    id: '09',
    title: 'Shipping to Remote Areas',
    content: `We ship to most pincodes across India including Jammu & Kashmir, Northeast states, Andaman & Nicobar Islands, and Lakshadweep. Delivery to these areas may take 7–12 business days and is subject to courier availability.

Additional shipping charges may apply for extremely remote pincodes. You will be informed at checkout if your pincode incurs a surcharge.`,
  },
  {
    id: '10',
    title: 'International Shipping',
    content: `At present, SiphoraHQ ships within India only. We are working on enabling international shipping and will update this policy when available.

For urgent international enquiries, write to us at concierge@siphorahq.in.`,
  },
  {
    id: '11',
    title: 'Lost or Delayed Shipments',
    content: null,
    bullets: [
      'If your order has not been delivered within 10 business days of dispatch, please contact us',
      'We will initiate a courier investigation within 24 hours of your complaint',
      'If the shipment is confirmed lost, we will reship or issue a full refund within 5–7 business days',
      'Delays caused by natural disasters, strikes, or government restrictions are outside our control',
    ],
  },
  {
    id: '12',
    title: 'Marketplace Orders',
    content: `For orders placed through Amazon, Flipkart, or Meesho, shipping is handled by the respective marketplace and their logistics partners. Shipping timelines and tracking for marketplace orders will be available on the marketplace platform directly.`,
  },
  {
    id: '13',
    title: 'Contact Us',
    content: null,
    contact: true,
  },
];

export default function ShippingPolicy() {
  return (
    <main className="min-h-screen bg-white">
      <div className="border-b border-gray-100 py-12 px-6">
        <div className="max-w-3xl mx-auto">
          <p className="text-xs tracking-[0.2em] uppercase text-gray-400 mb-3">Legal</p>
          <h1 className="text-4xl font-light tracking-wide text-gray-900 mb-4">Shipping Policy</h1>
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

                {section.freeShipping && (
                  <div className="bg-gray-50 rounded-lg p-5">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-lg">🚚</span>
                      <p className="text-sm font-medium text-gray-900">Free Shipping on all orders above ₹999</p>
                    </div>
                    <div className="space-y-2 text-sm text-gray-600">
                      <p>— Orders below ₹999: Flat ₹99 shipping charge</p>
                      <p>— Orders ₹999 and above: Completely free, pan-India</p>
                      <p>— Free shipping automatically applied at checkout — no coupon needed</p>
                    </div>
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

                {section.zones && (
                  <div className="mt-3 border border-gray-100 rounded-lg overflow-hidden">
                    <div className="grid grid-cols-3 bg-gray-50 px-4 py-2.5 text-xs font-medium text-gray-500 uppercase tracking-wider">
                      <span>Zone</span>
                      <span>Cities / Areas</span>
                      <span className="text-right">Delivery Time</span>
                    </div>
                    {shippingZones.map((z, i) => (
                      <div key={i} className="grid grid-cols-3 px-4 py-3 border-t border-gray-50 text-sm">
                        <span className="font-medium text-gray-800">{z.zone}</span>
                        <span className="text-gray-500 text-xs leading-relaxed">{z.cities}</span>
                        <span className="text-right text-gray-700 font-medium">{z.days}</span>
                      </div>
                    ))}
                  </div>
                )}

                {section.courierList && (
                  <div className="mt-3 space-y-2">
                    {couriers.map((c, i) => (
                      <div key={i} className="flex items-center gap-4 py-2.5 border-b border-gray-50 text-sm">
                        <span className="font-medium text-gray-800 w-32">{c.name}</span>
                        <span className="text-gray-500">{c.strength}</span>
                      </div>
                    ))}
                  </div>
                )}

                {'note' in section && section.note && (
                  <div className="mt-4 pl-4 border-l-2 border-amber-200">
                    <p className="text-xs text-amber-700">{section.note}</p>
                  </div>
                )}

                {section.contact && (
                  <div className="bg-gray-50 rounded-lg p-6 text-sm space-y-2 text-gray-700">
                    <p className="font-medium text-gray-900">SiphoraHQ Customer Care</p>
                    <p>Email: <a href="mailto:concierge@siphorahq.in" className="underline underline-offset-2">concierge@siphorahq.in</a></p>
                    <p>Hours: Monday – Saturday, 10 AM – 6 PM IST</p>
                    <p>Response Time: Within 24–48 business hours</p>
                    <p className="text-gray-500 text-xs pt-1">Please include your order number in all correspondence.</p>
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
