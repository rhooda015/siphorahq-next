import React from 'react';
import Link from 'next/link';

export default function SecurityPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16 font-serif">
      <Link href="/account" className="text-xs uppercase tracking-widest text-gray-500 hover:text-black transition-colors mb-8 inline-block">← Back to Account</Link>
      <h1 className="text-3xl tracking-wide mb-2">Login & Security</h1>
      <p className="text-sm text-gray-500 font-sans mb-8">Update your password, email, and mobile number.</p>
      <div className="border-[0.5px] border-gray-200 p-6 font-sans text-sm bg-gray-50/50 flex flex-col gap-4">
        <div className="flex justify-between items-center border-b border-gray-100 pb-4">
          <div>
            <p className="font-medium text-gray-800">Security Status</p>
            <p className="text-xs text-gray-500 mt-0.5">Your account is fully protected via Google OAuth authentication.</p>
          </div>
          <span className="text-xs bg-green-50 text-green-700 px-2.5 py-1 rounded-[2px] font-medium uppercase tracking-wider">Active</span>
        </div>
      </div>
    </div>
  );
}
