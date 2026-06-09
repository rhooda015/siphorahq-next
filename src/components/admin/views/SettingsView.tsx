'use client';
import React, { useState } from 'react';
import { Save, Store, CreditCard, Truck, Receipt, Bell, Shield, MapPin } from 'lucide-react';

export default function SettingsView() {
  const [activeTab, setActiveTab] = useState('Store Details');
  const [isSaving, setIsSaving] = useState(false);

  const tabs = [
    { id: 'Store Details', icon: Store, desc: 'Manage your brand, store name, and contact information' },
    { id: 'Payment Providers', icon: CreditCard, desc: 'Configure Razorpay, Stripe, and accepted methods' },
    { id: 'Shipping & Delivery', icon: Truck, desc: 'Manage shipping zones, rates, and fulfillment' },
    { id: 'Taxes & Duties', icon: Receipt, desc: 'Configure GST, international taxes, and pricing rules' },
    { id: 'Locations', icon: MapPin, desc: 'Manage warehouses and inventory locations' },
    { id: 'Notifications', icon: Bell, desc: 'Email and SMS templates for customers' },
    { id: 'User Permissions', icon: Shield, desc: 'Manage staff accounts and access levels' },
  ];

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      alert('Settings saved successfully!');
    }, 800);
  };

  return (
    <div className="max-w-6xl mx-auto pb-12 animate-in fade-in duration-300">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-[#18181b]">Settings</h2>
          <p className="text-sm text-zinc-500 mt-1">Manage your store configuration and preferences.</p>
        </div>
        <button 
          onClick={handleSave}
          disabled={isSaving}
          className="flex items-center gap-2 bg-[#18181b] text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-black transition-colors disabled:opacity-70"
        >
          <Save size={16} /> {isSaving ? 'Saving...' : 'Save Settings'}
        </button>
      </div>

      <div className="flex gap-8">
        {/* Settings Navigation */}
        <div className="w-1/3 space-y-1">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex flex-col items-start p-4 rounded-xl transition-all border ${
                activeTab === tab.id 
                  ? 'bg-white border-[#D4AF37]/50 shadow-sm ring-1 ring-[#D4AF37]/20' 
                  : 'bg-transparent border-transparent hover:bg-zinc-100 text-zinc-600'
              }`}
            >
              <div className="flex items-center gap-3 font-semibold text-[15px] text-[#18181b]">
                <tab.icon size={18} className={activeTab === tab.id ? 'text-[#D4AF37]' : 'text-zinc-400'} />
                {tab.id}
              </div>
              <p className="text-[13px] text-zinc-500 mt-1.5 ml-7 text-left leading-relaxed">{tab.desc}</p>
            </button>
          ))}
        </div>

        {/* Settings Content */}
        <div className="flex-1">
          <div className="bg-white rounded-2xl shadow-sm border border-zinc-200 p-8 min-h-[500px]">
            {activeTab === 'Store Details' && (
              <div className="space-y-8 animate-in fade-in duration-300">
                <div>
                  <h3 className="text-lg font-bold text-[#18181b] mb-1">Store Profile</h3>
                  <p className="text-sm text-zinc-500 mb-6">This information is displayed publicly on your store.</p>
                  <div className="space-y-5">
                    <div>
                      <label className="block text-sm font-medium text-[#18181b] mb-1.5">Store Name</label>
                      <input type="text" defaultValue="Siphorahq" className="w-full border border-zinc-300 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-[#18181b]/10 focus:border-[#18181b] outline-none" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#18181b] mb-1.5">Contact Email</label>
                      <input type="email" defaultValue="support@siphorahq.in" className="w-full border border-zinc-300 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-[#18181b]/10 focus:border-[#18181b] outline-none" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#18181b] mb-1.5">Store Currency</label>
                      <select className="w-full border border-zinc-300 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-[#18181b]/10 focus:border-[#18181b] outline-none bg-white">
                        <option value="INR">Indian Rupee (INR ₹)</option>
                        <option value="USD">US Dollar (USD $)</option>
                      </select>
                    </div>
                  </div>
                </div>
                
                <hr className="border-zinc-100" />
                
                <div>
                  <h3 className="text-lg font-bold text-[#18181b] mb-1">Formatting</h3>
                  <p className="text-sm text-zinc-500 mb-6">Standards and formats used across the admin and storefront.</p>
                  <div className="grid grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-[#18181b] mb-1.5">Timezone</label>
                      <select className="w-full border border-zinc-300 rounded-lg px-4 py-2.5 text-sm outline-none bg-white">
                        <option>(GMT+05:30) Chennai, Kolkata, Mumbai, New Delhi</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#18181b] mb-1.5">Unit System</label>
                      <select className="w-full border border-zinc-300 rounded-lg px-4 py-2.5 text-sm outline-none bg-white">
                        <option>Metric System</option>
                        <option>Imperial System</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'Payment Providers' && (
              <div className="space-y-8 animate-in fade-in duration-300">
                <div>
                  <h3 className="text-lg font-bold text-[#18181b] mb-1">Payment Gateways</h3>
                  <p className="text-sm text-zinc-500 mb-6">Enable or disable providers for customer checkout.</p>
                  
                  <div className="border border-zinc-200 rounded-xl overflow-hidden">
                    <div className="p-5 flex items-center justify-between bg-zinc-50/50">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-white rounded shadow-sm border border-zinc-200 flex items-center justify-center p-2">
                          {/* Razorpay Logo Mock */}
                          <span className="font-bold text-blue-600 text-[10px]">RAZORPAY</span>
                        </div>
                        <div>
                          <h4 className="font-semibold text-[#18181b]">Razorpay (Active)</h4>
                          <p className="text-xs text-zinc-500 mt-0.5">UPI, Credit/Debit Cards, NetBanking</p>
                        </div>
                      </div>
                      <button className="text-sm font-medium text-blue-600 hover:text-blue-700">Manage</button>
                    </div>
                    <div className="p-5 border-t border-zinc-200 bg-white space-y-4">
                      <div>
                        <label className="block text-xs font-bold text-zinc-500 uppercase tracking-wider mb-1.5">Key ID</label>
                        <input type="password" defaultValue="rzp_live_xxxxxxxxxxx" className="w-full border border-zinc-300 rounded-lg px-3 py-2 text-sm bg-zinc-50 focus:outline-none" readOnly />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-zinc-500 uppercase tracking-wider mb-1.5">Key Secret</label>
                        <input type="password" defaultValue="xxxxxxxxxxxxxxxxxxxx" className="w-full border border-zinc-300 rounded-lg px-3 py-2 text-sm bg-zinc-50 focus:outline-none" readOnly />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Placeholder for other tabs to show it's a complete UI */}
            {activeTab !== 'Store Details' && activeTab !== 'Payment Providers' && (
              <div className="h-full flex flex-col items-center justify-center text-center animate-in fade-in duration-300 py-20">
                <div className="w-16 h-16 bg-zinc-100 text-zinc-400 rounded-full flex items-center justify-center mb-4">
                  <Store size={24} />
                </div>
                <h3 className="text-lg font-bold text-[#18181b]">{activeTab} Configuration</h3>
                <p className="text-sm text-zinc-500 mt-2 max-w-sm">This module is currently in read-only mode for the demonstration. Full configuration options will appear here.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
