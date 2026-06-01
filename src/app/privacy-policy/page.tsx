import React from "react";
import { BRAND } from "@/config/brand";

export const metadata = {
  title: `Privacy Policy | ${BRAND.name}`,
};

export default function Page() {
  return (
    <div className="min-h-screen bg-[var(--color-bg)] py-16 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl md:text-5xl font-serif text-[var(--color-primary)] mb-8 text-center">
          Privacy Policy
        </h1>
        <div className="prose prose-lg mx-auto text-[var(--color-text-muted)] font-sans whitespace-pre-wrap leading-relaxed">
          At Siphorahq, we are committed to protecting your privacy in compliance with the Information Technology Act, 2000 and IT Rules 2011.\n\n1. Information Collection\nWe collect essential data including your name, shipping address, email, and phone number when you place an order. We do not store complete credit card details; all payments are processed through secure, RBI-compliant gateways.\n\n2. Use of Information\nYour data is used strictly for order fulfillment, customer support, and essential communication regarding your purchases.\n\n3. Data Sharing\nWe do not sell or rent your personal information to third parties. We may share your shipping details with our trusted courier partners strictly for delivery purposes.\n\n4. Data Retention\nWe retain your personal information only as long as necessary for business purposes and legal compliance.\n\n5. User Rights\nYou have the right to request access to or deletion of your personal data by contacting our Grievance Officer at support@siphorahq.in.
        </div>
      </div>
    </div>
  );
}
