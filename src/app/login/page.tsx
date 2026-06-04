"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { BRAND } from '@/config/brand';

export default function LoginPage() {
  const [activeTab, setActiveTab] = useState<'email' | 'mobile' | 'register'>('email');
  const [timer, setTimer] = useState(0);
  const router = useRouter();

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (timer > 0) {
      interval = setInterval(() => setTimer(prev => prev - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [timer]);

  const handleSendOTP = (e: React.MouseEvent) => {
    e.preventDefault();
    setTimer(30);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push('/account');
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-[#1a1612]">
      {/* Left Panel */}
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-12 text-center border-b-[0.5px] md:border-b-0 md:border-r-[0.5px] border-[#8b6914]/30 relative overflow-hidden">
        {/* Decorative diagonal line pattern */}
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'repeating-linear-gradient(45deg, #8b6914 0, #8b6914 1px, transparent 1px, transparent 20px)' }}></div>
        
        <div className="relative z-10">
          <h1 className="text-[#8b6914] text-5xl md:text-7xl mb-4 font-serif font-light tracking-[0.2em] uppercase">
            {BRAND.name}
          </h1>
          <p className="text-white/80 font-sans tracking-[0.3em] uppercase text-sm mb-12">
            Luxury Redefined
          </p>
          
          <div className="max-w-sm mx-auto text-[#8b6914]/80 font-serif italic text-xl md:text-2xl leading-relaxed">
            "Transforming everyday moments into poetic experiences through fine porcelain."
          </div>
        </div>
      </div>

      {/* Right Panel */}
      <div className="w-full md:w-1/2 bg-white flex flex-col justify-center px-8 py-16 md:p-20 relative">
        <div className="max-w-md w-full mx-auto">
          
          {/* Tabs */}
          <div className="flex border-b-[0.5px] border-[#1a1612]/20 mb-10">
            <button 
              className={`flex-1 pb-4 font-sans uppercase tracking-[0.15em] text-xs transition-colors ${activeTab === 'email' ? 'text-[#1a1612] border-b-[0.5px] border-[#1a1612] font-semibold' : 'text-gray-400 hover:text-[#1a1612]'}`}
              onClick={() => setActiveTab('email')}
            >
              Email Login
            </button>
            <button 
              className={`flex-1 pb-4 font-sans uppercase tracking-[0.15em] text-xs transition-colors ${activeTab === 'mobile' ? 'text-[#1a1612] border-b-[0.5px] border-[#1a1612] font-semibold' : 'text-gray-400 hover:text-[#1a1612]'}`}
              onClick={() => setActiveTab('mobile')}
            >
              Mobile OTP
            </button>
            <button 
              className={`flex-1 pb-4 font-sans uppercase tracking-[0.15em] text-xs transition-colors ${activeTab === 'register' ? 'text-[#1a1612] border-b-[0.5px] border-[#1a1612] font-semibold' : 'text-gray-400 hover:text-[#1a1612]'}`}
              onClick={() => setActiveTab('register')}
            >
              Register
            </button>
          </div>

          {/* Form Content */}
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {activeTab === 'email' && (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
                <div>
                  <label className="block font-sans text-[10px] uppercase tracking-[0.2em] text-[#1a1612] mb-2">Email Address</label>
                  <input type="email" required className="w-full border-[0.5px] border-[#1a1612]/30 p-3 text-sm font-sans focus:outline-none focus:border-[#8b6914] bg-transparent rounded-[3px] transition-colors" />
                </div>
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="block font-sans text-[10px] uppercase tracking-[0.2em] text-[#1a1612]">Password</label>
                    <a href="#" className="font-sans text-[10px] uppercase tracking-[0.1em] text-[#8b6914] hover:underline">Forgot?</a>
                  </div>
                  <input type="password" required className="w-full border-[0.5px] border-[#1a1612]/30 p-3 text-sm font-sans focus:outline-none focus:border-[#8b6914] bg-transparent rounded-[3px] transition-colors" />
                </div>
                <button type="submit" className="w-full bg-[#1a1612] text-white p-4 font-sans uppercase tracking-[0.2em] text-xs hover:bg-[#8b6914] transition-colors rounded-[3px]">
                  Sign In
                </button>
                
                <div className="pt-6 border-t-[0.5px] border-[#1a1612]/10 text-center">
                  <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-gray-400 mb-4">Or continue with</p>
                  <div className="flex justify-center gap-4">
                    <button type="button" className="w-12 h-12 flex items-center justify-center border-[0.5px] border-[#1a1612]/20 hover:border-[#8b6914] transition-colors rounded-[3px] text-[#1a1612] font-sans">
                      G
                    </button>
                    <button type="button" className="w-12 h-12 flex items-center justify-center border-[0.5px] border-[#1a1612]/20 hover:border-[#8b6914] transition-colors rounded-[3px] text-[#1a1612] font-sans">
                      f
                    </button>
                    <button type="button" className="w-12 h-12 flex items-center justify-center border-[0.5px] border-[#1a1612]/20 hover:border-[#8b6914] transition-colors rounded-[3px] text-[#1a1612] font-sans">
                      in
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'mobile' && (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
                <div>
                  <label className="block font-sans text-[10px] uppercase tracking-[0.2em] text-[#1a1612] mb-2">Mobile Number</label>
                  <div className="flex gap-2">
                    <input type="text" value="+91" readOnly className="w-16 border-[0.5px] border-[#1a1612]/30 p-3 text-sm font-sans bg-gray-50 text-center rounded-[3px] outline-none" />
                    <input type="tel" required placeholder="Mobile Number" className="flex-1 border-[0.5px] border-[#1a1612]/30 p-3 text-sm font-sans focus:outline-none focus:border-[#8b6914] bg-transparent rounded-[3px] transition-colors" />
                  </div>
                </div>
                <div>
                  <label className="block font-sans text-[10px] uppercase tracking-[0.2em] text-[#1a1612] mb-2">One Time Password</label>
                  <div className="flex gap-2">
                    <input type="text" placeholder="Enter OTP" className="flex-1 border-[0.5px] border-[#1a1612]/30 p-3 text-sm font-sans focus:outline-none focus:border-[#8b6914] bg-transparent rounded-[3px] transition-colors text-center tracking-[0.5em]" />
                    <button 
                      onClick={handleSendOTP} 
                      disabled={timer > 0}
                      className="px-4 border-[0.5px] border-[#1a1612] text-[#1a1612] font-sans uppercase tracking-[0.1em] text-[10px] hover:bg-gray-50 transition-colors disabled:opacity-50 rounded-[3px] whitespace-nowrap"
                    >
                      {timer > 0 ? `Resend in ${timer}s` : 'Send OTP'}
                    </button>
                  </div>
                </div>
                <button type="submit" className="w-full bg-[#1a1612] text-white p-4 font-sans uppercase tracking-[0.2em] text-xs hover:bg-[#8b6914] transition-colors rounded-[3px]">
                  Verify & Login
                </button>
                
                <div className="pt-6 border-t-[0.5px] border-[#1a1612]/10 text-center">
                  <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-gray-400 mb-4">Or continue with</p>
                  <button type="button" className="w-full py-3 flex items-center justify-center border-[0.5px] border-[#1a1612]/20 hover:border-[#8b6914] transition-colors rounded-[3px] text-[#1a1612] font-sans text-[10px] uppercase tracking-[0.1em]">
                    Google
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'register' && (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
                <div>
                  <label className="block font-sans text-[10px] uppercase tracking-[0.2em] text-[#1a1612] mb-2">Full Name</label>
                  <input type="text" required className="w-full border-[0.5px] border-[#1a1612]/30 p-3 text-sm font-sans focus:outline-none focus:border-[#8b6914] bg-transparent rounded-[3px] transition-colors" />
                </div>
                <div>
                  <label className="block font-sans text-[10px] uppercase tracking-[0.2em] text-[#1a1612] mb-2">Email Address</label>
                  <input type="email" required className="w-full border-[0.5px] border-[#1a1612]/30 p-3 text-sm font-sans focus:outline-none focus:border-[#8b6914] bg-transparent rounded-[3px] transition-colors" />
                </div>
                <div>
                  <label className="block font-sans text-[10px] uppercase tracking-[0.2em] text-[#1a1612] mb-2">Password</label>
                  <input type="password" required className="w-full border-[0.5px] border-[#1a1612]/30 p-3 text-sm font-sans focus:outline-none focus:border-[#8b6914] bg-transparent rounded-[3px] transition-colors" />
                </div>
                <button type="submit" className="w-full bg-[#1a1612] text-white p-4 font-sans uppercase tracking-[0.2em] text-xs hover:bg-[#8b6914] transition-colors rounded-[3px]">
                  Create Account
                </button>
                
                <div className="pt-6 border-t-[0.5px] border-[#1a1612]/10 text-center">
                  <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-gray-400 mb-4">Or sign up with</p>
                  <div className="flex gap-4">
                    <button type="button" className="flex-1 py-3 flex items-center justify-center border-[0.5px] border-[#1a1612]/20 hover:border-[#8b6914] transition-colors rounded-[3px] text-[#1a1612] font-sans text-[10px] uppercase tracking-[0.1em]">
                      Google
                    </button>
                    <button type="button" className="flex-1 py-3 flex items-center justify-center border-[0.5px] border-[#1a1612]/20 hover:border-[#8b6914] transition-colors rounded-[3px] text-[#1a1612] font-sans text-[10px] uppercase tracking-[0.1em]">
                      Facebook
                    </button>
                  </div>
                </div>
              </div>
            )}
          </form>
          
          <div className="mt-12 text-center text-xs font-sans text-gray-400 tracking-wide">
            By continuing, you agree to our <Link href="/terms-of-service" className="hover:text-[#8b6914] hover:underline">Terms</Link> and <Link href="/privacy-policy" className="hover:text-[#8b6914] hover:underline">Privacy Policy</Link>.
          </div>
        </div>
      </div>
    </div>
  );
}
