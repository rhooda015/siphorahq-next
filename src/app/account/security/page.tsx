"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { Eye, EyeOff } from 'lucide-react';

export default function SecurityPage() {
  const { data: session, status } = useSession();
  
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      alert("New passwords do not match.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('https://siphorahq-backend.onrender.com/api/user/update-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session?.user?.email}` // Using email as mock token
        },
        body: JSON.stringify({ currentPassword, newPassword })
      });

      if (res.ok) {
        alert("Password updated successfully.");
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
      } else {
        const data = await res.json();
        alert(data.message || "Failed to update password.");
      }
    } catch (error) {
      console.error(error);
      alert("Network error: Could not reach the server.");
    } finally {
      setLoading(false);
    }
  };

  if (status === 'loading') {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 font-serif">
         <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#1a1612] mx-auto mt-20"></div>
      </div>
    );
  }

  // Fallbacks if missing
  const provider = (session?.user as any)?.provider || 'credentials';
  const isGoogle = provider === 'google';

  return (
    <div className="max-w-4xl mx-auto px-4 py-16 font-serif">
      <Link href="/account" className="text-xs uppercase tracking-widest text-zinc-500 hover:text-black transition-colors mb-8 inline-block font-sans">
        ← Back to Account
      </Link>
      
      <h1 className="text-3xl tracking-wide mb-2">Account Security</h1>
      <p className="text-sm text-zinc-500 font-sans mb-12 uppercase tracking-widest">
        Manage your authentication and password
      </p>

      {isGoogle ? (
        <div className="border-[0.5px] border-zinc-200 p-8 flex flex-col gap-4">
          <div className="flex justify-between items-center border-b-[0.5px] border-zinc-100 pb-6">
            <div>
              <p className="font-sans text-xs uppercase tracking-widest text-zinc-800 mb-2">Security Status</p>
              <p className="text-sm font-sans text-zinc-500">Your account is fully protected via Google OAuth.</p>
              <p className="text-sm font-sans text-black mt-2">{session?.user?.email}</p>
            </div>
            <span className="text-[10px] bg-green-50 text-green-700 border-[0.5px] border-green-200 px-3 py-1.5 rounded-[2px] font-sans uppercase tracking-widest">
              Authenticated via Google
            </span>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Details Column */}
          <div className="space-y-8">
            <div className="border-[0.5px] border-zinc-200 p-8">
              <p className="font-sans text-[10px] uppercase tracking-widest text-zinc-500 mb-2">Registered Email</p>
              <p className="font-sans text-sm text-black">{session?.user?.email || 'N/A'}</p>
            </div>
            <div className="border-[0.5px] border-zinc-200 p-8">
              <p className="font-sans text-[10px] uppercase tracking-widest text-zinc-500 mb-2">Linked Mobile</p>
              <p className="font-sans text-sm text-black">+91 ••••• •••••</p>
            </div>
          </div>

          {/* Form Column */}
          <div className="border-[0.5px] border-zinc-200 p-8">
            <p className="font-sans text-xs uppercase tracking-widest text-black mb-8 border-b-[0.5px] border-zinc-100 pb-4">
              Change Password
            </p>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="relative">
                <label className="block font-sans text-[10px] uppercase tracking-widest text-zinc-500 mb-2">Current Password</label>
                <input 
                  type={showCurrent ? "text" : "password"} 
                  value={currentPassword}
                  onChange={e => setCurrentPassword(e.target.value)}
                  className="w-full border-[0.5px] border-zinc-200 rounded-[2px] p-3 text-sm font-sans focus:outline-none focus:border-black pr-10"
                  required 
                />
                <button type="button" onClick={() => setShowCurrent(!showCurrent)} className="absolute right-3 top-9 text-zinc-400 hover:text-black">
                  {showCurrent ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>

              <div className="relative">
                <label className="block font-sans text-[10px] uppercase tracking-widest text-zinc-500 mb-2">New Password</label>
                <input 
                  type={showNew ? "text" : "password"} 
                  value={newPassword}
                  onChange={e => setNewPassword(e.target.value)}
                  className="w-full border-[0.5px] border-zinc-200 rounded-[2px] p-3 text-sm font-sans focus:outline-none focus:border-black pr-10"
                  required 
                />
                <button type="button" onClick={() => setShowNew(!showNew)} className="absolute right-3 top-9 text-zinc-400 hover:text-black">
                  {showNew ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>

              <div>
                <label className="block font-sans text-[10px] uppercase tracking-widest text-zinc-500 mb-2">Confirm New Password</label>
                <input 
                  type="password" 
                  value={confirmPassword}
                  onChange={e => setConfirmPassword(e.target.value)}
                  className="w-full border-[0.5px] border-zinc-200 rounded-[2px] p-3 text-sm font-sans focus:outline-none focus:border-black"
                  required 
                />
              </div>

              <button 
                type="submit" 
                disabled={loading}
                className="w-full bg-black text-white rounded-[2px] py-4 text-[10px] font-sans uppercase tracking-[0.2em] hover:bg-[#8b6914] transition-colors disabled:opacity-50 mt-4"
              >
                {loading ? 'Updating...' : 'Update Password'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
