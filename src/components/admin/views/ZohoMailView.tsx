'use client';
import React, { useState, useEffect } from 'react';
import { Mail, Settings, RefreshCw, Key, Shield, AlertCircle, Inbox, Send, Trash, Loader2 } from 'lucide-react';

export default function ZohoMailView() {
  const [loading, setLoading] = useState(true);
  const [configured, setConfigured] = useState(false);
  const [emails, setEmails] = useState<any[]>([]);
  const [folders, setFolders] = useState<any[]>([]);
  const [activeFolder, setActiveFolder] = useState<string>('Inbox');
  const [error, setError] = useState<string | null>(null);

  // Config State
  const [clientId, setClientId] = useState('');
  const [clientSecret, setClientSecret] = useState('');
  const [refreshToken, setRefreshToken] = useState('');
  const [region, setRegion] = useState('.in');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchEmails();
  }, []);

  const fetchEmails = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/admin/zoho-mail');
      const data = await res.json();
      
      if (res.status === 400 && data.configured === false) {
        setConfigured(false);
        await fetchConfig();
      } else if (res.ok) {
        setConfigured(true);
        setEmails(data.messages || []);
        setFolders(data.folders || []);
      } else {
        setConfigured(true); // Trying to connect but failing
        setError(data.error || 'Failed to fetch emails');
        await fetchConfig();
      }
    } catch (e: any) {
      setError(e.message || 'Network error');
    }
    setLoading(false);
  };

  const fetchConfig = async () => {
    try {
      const res = await fetch('/api/admin/zoho-mail/config');
      if (res.ok) {
        const data = await res.json();
        setClientId(data.zohoClientId || '');
        setClientSecret(data.zohoClientSecret || '');
        setRefreshToken(data.zohoRefreshToken || '');
        setRegion(data.zohoRegion || '.in');
      }
    } catch (e) {}
  };

  const saveConfig = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch('/api/admin/zoho-mail/config', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ zohoClientId: clientId, zohoClientSecret: clientSecret, zohoRefreshToken: refreshToken, zohoRegion: region })
      });
      if (res.ok) {
        alert('Configuration saved!');
        setConfigured(true);
        fetchEmails();
      } else {
        alert('Failed to save configuration');
      }
    } catch (error) {
      alert('Error saving configuration');
    }
    setSaving(false);
  };

  // -----------------------------------------
  // RENDER: NOT CONFIGURED (OR EDITING CONFIG)
  // -----------------------------------------
  if (!configured) {
    return (
      <div className="max-w-3xl mx-auto space-y-6 animate-in fade-in duration-300 pb-12 mt-10">
        <div className="bg-white p-8 rounded-2xl border border-zinc-200 shadow-sm">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600">
              <Mail size={28} />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-[#18181b]">Connect Zoho Mail</h2>
              <p className="text-sm text-zinc-500 mt-1">Configure your API credentials to fetch emails directly into your dashboard.</p>
            </div>
          </div>

          <div className="bg-amber-50 border border-amber-200 text-amber-800 p-4 rounded-xl mb-8 flex gap-3 text-sm">
            <Shield className="shrink-0 mt-0.5 text-amber-600" size={18} />
            <div>
              <p className="font-semibold mb-1">How to get these credentials:</p>
              <ol className="list-decimal pl-4 space-y-1 text-amber-700/90">
                <li>Go to the Zoho API Console (api-console.zoho{region}).</li>
                <li>Create a "Server-based Application".</li>
                <li>Copy the Client ID and Client Secret.</li>
                <li>Generate a self-client grant token with `ZohoMail.messages.READ` scope.</li>
                <li>Exchange the grant token for a Refresh Token.</li>
              </ol>
            </div>
          </div>

          <form onSubmit={saveConfig} className="space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-[#18181b] mb-1.5">Zoho Region</label>
                <select 
                  value={region} onChange={(e) => setRegion(e.target.value)}
                  className="w-full px-4 py-2.5 bg-zinc-50 border border-zinc-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#18181b]/10 focus:border-[#18181b]"
                >
                  <option value=".in">India (.in)</option>
                  <option value=".com">Global (.com)</option>
                  <option value=".eu">Europe (.eu)</option>
                  <option value=".com.au">Australia (.com.au)</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#18181b] mb-1.5">Client ID</label>
                <input 
                  type="text" value={clientId} onChange={(e) => setClientId(e.target.value)} required
                  className="w-full px-4 py-2.5 bg-zinc-50 border border-zinc-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#18181b]/10 focus:border-[#18181b]"
                  placeholder="1000.XXXXXXXXXXXXXXXXXXX"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-[#18181b] mb-1.5">Client Secret</label>
              <input 
                type="password" value={clientSecret} onChange={(e) => setClientSecret(e.target.value)} required
                className="w-full px-4 py-2.5 bg-zinc-50 border border-zinc-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#18181b]/10 focus:border-[#18181b]"
                placeholder="••••••••••••••••••••••••••••"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-[#18181b] mb-1.5">Refresh Token</label>
              <input 
                type="password" value={refreshToken} onChange={(e) => setRefreshToken(e.target.value)} required
                className="w-full px-4 py-2.5 bg-zinc-50 border border-zinc-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#18181b]/10 focus:border-[#18181b]"
                placeholder="1000.XXXXXXXXXXXXXXXXXXX"
              />
            </div>
            <button disabled={saving} type="submit" className="w-full bg-[#18181b] text-white py-3 rounded-xl font-medium hover:bg-black transition-colors flex items-center justify-center gap-2">
              {saving ? <Loader2 className="animate-spin" size={18} /> : <Key size={18} />}
              Save & Connect
            </button>
          </form>
        </div>
      </div>
    );
  }

  // -----------------------------------------
  // RENDER: INBOX VIEW
  // -----------------------------------------
  return (
    <div className="h-full flex flex-col space-y-4 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-[#18181b]">Mailbox</h2>
          <p className="text-sm text-zinc-500 mt-1">Manage customer support and inquiries via Zoho Mail.</p>
        </div>
        <div className="flex gap-3">
          <button onClick={() => setConfigured(false)} className="flex items-center gap-2 bg-white border border-zinc-200 text-[#18181b] px-4 py-2 rounded-lg text-sm font-medium hover:bg-zinc-50 transition-colors shadow-sm">
            <Settings size={16} /> Config
          </button>
          <button onClick={fetchEmails} disabled={loading} className="flex items-center gap-2 bg-[#18181b] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-black transition-colors shadow-sm disabled:opacity-70">
            {loading ? <Loader2 size={16} className="animate-spin" /> : <RefreshCw size={16} />}
            Refresh
          </button>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 text-red-600 border border-red-200 p-4 rounded-xl flex items-center gap-3">
          <AlertCircle size={18} />
          <p className="text-sm font-medium">{error}</p>
        </div>
      )}

      {/* Main Mail App Layout */}
      <div className="flex-1 bg-white rounded-2xl border border-zinc-200 shadow-sm overflow-hidden flex min-h-[600px]">
        
        {/* Sidebar */}
        <div className="w-64 border-r border-zinc-200 bg-zinc-50/50 p-4 flex flex-col gap-1">
          <button className="flex items-center justify-between w-full p-2.5 rounded-lg bg-white shadow-sm border border-zinc-200 text-[#18181b] font-medium text-sm mb-4">
            <div className="flex items-center gap-2"><Inbox size={16} className="text-luxury-gold" /> Inbox</div>
            <span className="bg-luxury-gold text-white text-[10px] px-2 py-0.5 rounded-full">{emails.length}</span>
          </button>
          <button className="flex items-center gap-2 w-full p-2.5 rounded-lg text-zinc-600 hover:bg-zinc-100 font-medium text-sm transition-colors">
            <Send size={16} /> Sent
          </button>
          <button className="flex items-center gap-2 w-full p-2.5 rounded-lg text-zinc-600 hover:bg-zinc-100 font-medium text-sm transition-colors">
            <Trash size={16} /> Trash
          </button>
        </div>

        {/* Email List */}
        <div className="flex-1 flex flex-col">
          {loading && emails.length === 0 ? (
            <div className="flex-1 flex items-center justify-center">
              <Loader2 className="animate-spin text-zinc-300" size={32} />
            </div>
          ) : emails.length > 0 ? (
            <div className="divide-y divide-zinc-100 overflow-y-auto">
              {emails.map((email: any, i: number) => (
                <div key={i} className="p-4 hover:bg-zinc-50 cursor-pointer transition-colors group">
                  <div className="flex justify-between items-start mb-1">
                    <span className="font-semibold text-[#18181b] text-sm">{email.sender || email.fromAddress}</span>
                    <span className="text-xs text-zinc-400">{new Date(Number(email.receivedTime)).toLocaleDateString()}</span>
                  </div>
                  <h4 className="text-sm font-medium text-zinc-800 mb-1">{email.subject}</h4>
                  <p className="text-xs text-zinc-500 line-clamp-1">{email.summary}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-zinc-400">
              <Inbox size={48} className="mb-4 text-zinc-200" />
              <p className="font-medium text-[#18181b]">No emails found</p>
              <p className="text-sm">Your inbox is empty or sync failed.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
