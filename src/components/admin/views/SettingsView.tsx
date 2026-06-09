'use client';
import React, { useState, useEffect } from 'react';
import { Save, Store, CreditCard, Truck, Receipt, Bell, Shield, MapPin, Loader2 } from 'lucide-react';

export default function SettingsView() {
  const [activeTab, setActiveTab] = useState('Store Details');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Settings State
  const [settings, setSettings] = useState({
    storeName: '',
    storeEmail: '',
    storePhone: '',
    freeShippingThreshold: 999,
    flatShippingRate: 100,

  });

  const tabs = [
    { id: 'Store Details', icon: Store, desc: 'Manage your brand, store name, and contact information' },
    { id: 'Payment Providers', icon: CreditCard, desc: 'Configure Razorpay, Stripe, and accepted methods' },
    { id: 'Shipping & Delivery', icon: Truck, desc: 'Manage shipping zones, rates, and fulfillment' },
    { id: 'Taxes & Duties', icon: Receipt, desc: 'Configure GST, international taxes, and pricing rules' },
    { id: 'Locations', icon: MapPin, desc: 'Manage warehouses and inventory locations' },
    { id: 'Notifications', icon: Bell, desc: 'Email and SMS templates for customers' },
    { id: 'User Permissions', icon: Shield, desc: 'Manage staff accounts and access levels' },
  ];

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const res = await fetch('/api/admin/settings');
      if (res.ok) {
        const data = await res.json();
        setSettings({
          storeName: data.storeName || '',
          storeEmail: data.storeEmail || '',
          storePhone: data.storePhone || '',
          freeShippingThreshold: data.freeShippingThreshold || 999,
          flatShippingRate: data.flatShippingRate || 100,

        });
      }
    } catch (error) {
      console.error('Failed to fetch settings:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await fetch('/api/admin/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings),
      });
      alert('Settings saved successfully!');
    } catch (error) {
      console.error('Failed to save settings:', error);
      alert('Failed to save settings');
    } finally {
      setSaving(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    setSettings(prev => ({
      ...prev,
      [name]: type === 'number' ? Number(value) : value
    }));
  };

  if (loading) {
    return <div className="p-12 text-center text-zinc-500"><Loader2 className="animate-spin mx-auto mb-4"/> Loading Settings...</div>;
  }

  return (
    <div className="max-w-6xl mx-auto pb-12 animate-in fade-in duration-300">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-[#18181b]">Settings</h2>
          <p className="text-sm text-zinc-500 mt-1">Manage your store configuration and preferences.</p>
        </div>
        <button 
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 bg-[#18181b] text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-black transition-colors disabled:opacity-70"
        >
          {saving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
          {saving ? 'Saving...' : 'Save Settings'}
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
                      <input type="text" name="storeName" value={settings.storeName} onChange={handleChange} className="w-full border border-zinc-300 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-[#18181b]/10 focus:border-[#18181b] outline-none" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#18181b] mb-1.5">Contact Email</label>
                      <input type="email" name="storeEmail" value={settings.storeEmail} onChange={handleChange} className="w-full border border-zinc-300 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-[#18181b]/10 focus:border-[#18181b] outline-none" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#18181b] mb-1.5">Contact Phone</label>
                      <input type="text" name="storePhone" value={settings.storePhone} onChange={handleChange} className="w-full border border-zinc-300 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-[#18181b]/10 focus:border-[#18181b] outline-none" />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'Payment Providers' && (
              <div className="space-y-8 animate-in fade-in duration-300">
                <div>
                  <h3 className="text-lg font-bold text-[#18181b] mb-1">Payment Gateways</h3>
                  <p className="text-sm text-zinc-500 mb-6">Configure your Razorpay API credentials.</p>
                  
                  <div className="border border-zinc-200 rounded-xl overflow-hidden">
                    <div className="p-5 flex items-center justify-between bg-zinc-50/50">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-white rounded shadow-sm border border-zinc-200 flex items-center justify-center p-2">
                          <span className="font-bold text-blue-600 text-[10px]">RAZORPAY</span>
                        </div>
                        <div>
                          <h4 className="font-semibold text-[#18181b]">Razorpay</h4>
                          <p className="text-xs text-zinc-500 mt-0.5">UPI, Credit/Debit Cards, NetBanking</p>
                        </div>
                      </div>
                    </div>
                    <div className="p-5 border-t border-zinc-200 bg-white space-y-4">
                      <div>
                        <label className="block text-xs font-bold text-zinc-500 uppercase tracking-wider mb-1.5">Key ID</label>
                        <input type="text" name="razorpayKeyId" value={settings.razorpayKeyId} onChange={handleChange} placeholder="rzp_live_xxxxxxxxxxx" className="w-full border border-zinc-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-[#18181b]/10 outline-none" />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-zinc-500 uppercase tracking-wider mb-1.5">Key Secret</label>
                        <input type="password" name="razorpayKeySecret" value={settings.razorpayKeySecret} onChange={handleChange} placeholder="xxxxxxxxxxxxxxxxxxxx" className="w-full border border-zinc-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-[#18181b]/10 outline-none" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'Shipping & Delivery' && (
              <div className="space-y-8 animate-in fade-in duration-300">
                <div>
                  <h3 className="text-lg font-bold text-[#18181b] mb-1">Shipping Rules</h3>
                  <p className="text-sm text-zinc-500 mb-6">Set your flat shipping rate and free shipping threshold.</p>
                  <div className="space-y-5">
                    <div>
                      <label className="block text-sm font-medium text-[#18181b] mb-1.5">Flat Shipping Rate (₹)</label>
                      <input type="number" name="flatShippingRate" value={settings.flatShippingRate} onChange={handleChange} className="w-full border border-zinc-300 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-[#18181b]/10 outline-none" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#18181b] mb-1.5">Free Shipping Threshold (₹)</label>
                      <input type="number" name="freeShippingThreshold" value={settings.freeShippingThreshold} onChange={handleChange} className="w-full border border-zinc-300 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-[#18181b]/10 outline-none" />
                      <p className="text-xs text-zinc-500 mt-2">Orders above this amount will automatically get free shipping.</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Placeholder for other tabs */}
            {activeTab !== 'Store Details' && activeTab !== 'Payment Providers' && activeTab !== 'Shipping & Delivery' && (
              <div className="h-full flex flex-col items-center justify-center text-center animate-in fade-in duration-300 py-20">
                <div className="w-16 h-16 bg-zinc-100 text-zinc-400 rounded-full flex items-center justify-center mb-4">
                  <Store size={24} />
                </div>
                <h3 className="text-lg font-bold text-[#18181b]">{activeTab} Configuration</h3>
                <p className="text-sm text-zinc-500 mt-2 max-w-sm">This module is not fully connected to the database yet. Future updates will enable this.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
