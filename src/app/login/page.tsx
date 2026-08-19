"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, X, ChevronRight, ArrowLeft } from 'lucide-react';
import { BRAND } from '@/config/brand';
import { signIn, useSession } from 'next-auth/react';

// Validation Helpers
const isValidEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
const isValidMobile = (mobile: string) => /^\d{10}$/.test(mobile);

// Toast Component
const Toast = ({ message, type, onClose }: { message: string; type: 'success' | 'error'; onClose: () => void }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={`fixed top-4 right-4 z-[200] px-6 py-3 shadow-lg flex items-center gap-3 animate-fade-in ${type === 'success' ? 'bg-[#1e1a14] text-white' : 'bg-[#d32f2f] text-white'}`}>
      <span className="font-sans text-sm tracking-widest uppercase">{message}</span>
      <button onClick={onClose}><X className="w-4 h-4" /></button>
    </div>
  );
};

export default function LoginPage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [mode, setMode] = useState<'otp' | 'email' | 'register'>('otp');
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  useEffect(() => {
    if (status === 'authenticated') {
      router.push('/account');
    }
  }, [status, router]);

  const showToast = (message: string, type: 'success' | 'error') => setToast({ message, type });

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-[#faf7f2] py-12 px-4 relative">
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

      {/* Top Brand Logo */}
      <div className="mb-8 text-center">
        <h1 className="text-[#1e1a14] text-3xl md:text-4xl font-serif tracking-[6px] uppercase">
          <Link href="/" className="transition-opacity hover:opacity-80">
            {BRAND.name}
          </Link>
        </h1>
        <p className="text-zinc-500 font-sans text-[10px] tracking-[3px] uppercase mt-1">Luxury Redefined</p>
      </div>

      {/* Nykaa-style Floating Card */}
      <div className="w-full max-w-[420px] bg-white rounded-lg p-6 md:p-8 shadow-[0_12px_40px_rgba(0,0,0,0.03)] border border-neutral-100 flex flex-col transition-all duration-300">
        
        {/* Back navigation button if not on default OTP landing screen */}
        {mode !== 'otp' && (
          <button 
            type="button"
            onClick={() => setMode('otp')} 
            className="flex items-center gap-1.5 text-zinc-500 hover:text-black font-sans text-[11px] uppercase tracking-wider mb-6 w-fit transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back
          </button>
        )}

        {/* Card Headers based on Mode */}
        {mode === 'otp' && (
          <div className="mb-6">
            <h2 className="text-[#1a1612] font-sans text-xl font-semibold tracking-tight">Login or Signup</h2>
            <p className="text-zinc-500 font-sans text-xs mt-1.5 leading-relaxed">
              Register now and get 2000 {BRAND.name} reward points instantly!
            </p>
          </div>
        )}

        {mode === 'email' && (
          <div className="mb-6">
            <h2 className="text-[#1a1612] font-sans text-xl font-semibold tracking-tight">Sign in with Email</h2>
            <p className="text-zinc-500 font-sans text-xs mt-1.5">
              Enter your registered email and password to log in.
            </p>
          </div>
        )}

        {mode === 'register' && (
          <div className="mb-6">
            <h2 className="text-[#1a1612] font-sans text-xl font-semibold tracking-tight">Create an Account</h2>
            <p className="text-zinc-500 font-sans text-xs mt-1.5">
              Sign up to earn rewards, save addresses, and track orders.
            </p>
          </div>
        )}

        {/* Form Container */}
        <div className="flex-1">
          {mode === 'otp' && <OtpLoginForm showToast={showToast} router={router} />}
          {mode === 'email' && <EmailLoginForm showToast={showToast} router={router} />}
          {mode === 'register' && <RegisterForm showToast={showToast} router={router} setMode={setMode} />}
        </div>

        {/* Divider */}
        <div className="flex items-center gap-3 my-6">
          <div className="flex-1 h-[0.5px] bg-neutral-200" />
          <span className="font-sans text-[9px] tracking-[2px] text-zinc-400 uppercase">Or sign in using</span>
          <div className="flex-1 h-[0.5px] bg-neutral-200" />
        </div>

        {/* Action Buttons Links (Nykaa style stacked) */}
        <div className="flex flex-col gap-2.5">
          {mode !== 'email' && (
            <button 
              type="button"
              onClick={() => setMode('email')} 
              className="w-full flex items-center justify-between border border-neutral-200 hover:border-neutral-400 transition-colors min-h-[46px] px-4 rounded-[4px] bg-white text-left focus:outline-none"
            >
              <span className="font-sans text-xs font-medium text-zinc-800">Sign in with Mobile / Email</span>
              <ChevronRight className="w-4 h-4 text-zinc-400" />
            </button>
          )}

          {mode !== 'otp' && (
            <button 
              type="button"
              onClick={() => setMode('otp')} 
              className="w-full flex items-center justify-between border border-neutral-200 hover:border-neutral-400 transition-colors min-h-[46px] px-4 rounded-[4px] bg-white text-left focus:outline-none"
            >
              <span className="font-sans text-xs font-medium text-zinc-800">Sign in with OTP</span>
              <ChevronRight className="w-4 h-4 text-zinc-400" />
            </button>
          )}

          {mode !== 'register' && (
            <button 
              type="button"
              onClick={() => setMode('register')} 
              className="w-full flex items-center justify-between border border-neutral-200 hover:border-neutral-400 transition-colors min-h-[46px] px-4 rounded-[4px] bg-white text-left focus:outline-none"
            >
              <span className="font-sans text-xs font-medium text-zinc-800">Register new account</span>
              <ChevronRight className="w-4 h-4 text-zinc-400" />
            </button>
          )}

          {/* Google SSO Button */}
          <button 
            type="button"
            onClick={() => signIn('google', { callbackUrl: '/account' })} 
            className="w-full flex items-center justify-between border border-neutral-200 hover:border-neutral-400 transition-colors min-h-[46px] px-4 rounded-[4px] bg-white text-left focus:outline-none"
          >
            <span className="font-sans text-xs font-medium text-zinc-800">Continue with Google</span>
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05" />
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
            </svg>
          </button>
        </div>

        {/* Footer Policy Text */}
        <div className="mt-8 text-center">
          <p className="font-sans text-[11px] text-zinc-400 leading-relaxed max-w-xs mx-auto">
            By proceeding, you agree to our <Link href="/terms-of-service" className="underline hover:text-black">Terms of Service</Link> & <Link href="/privacy-policy" className="underline hover:text-black">Privacy Policy</Link>.
          </p>
        </div>
      </div>

      {/* Membership Benefits Box */}
      <div className="w-full max-w-[420px] mt-6 bg-[#fcfbfa] border border-zinc-200/50 rounded-lg p-5 shadow-[0_4px_12px_rgba(0,0,0,0.01)]">
        <h3 className="font-sans text-xs font-semibold text-zinc-800 uppercase tracking-wider mb-3">Siphorahq Membership Benefits</h3>
        <ul className="space-y-2 text-[11px] text-zinc-500 font-sans leading-relaxed">
          <li>• <strong className="text-zinc-700">Instant Wallet Reward</strong>: Get 2,000 complimentary membership reward points in your wallet instantly upon registration.</li>
          <li>• <strong className="text-zinc-700">Express Checkouts</strong>: Securely store and manage multiple delivery addresses for a fast, seamless checkout experience.</li>
          <li>• <strong className="text-zinc-700">Advanced Order Tracking</strong>: Easily access detailed shipping updates, transit history, and direct carrier notifications.</li>
          <li>• <strong className="text-zinc-700">Priority Concierge Support</strong>: Enjoy fast-track WhatsApp and email support for all order queries and custom requests.</li>
        </ul>
      </div>
    </div>
  );
}

// ----------------------------------------------------------------------
// OTP LOGIN FORM (Nykaa inline mobile + send OTP layout style)
// ----------------------------------------------------------------------
function OtpLoginForm({ showToast, router }: { showToast: any, router: any }) {
  const [mobile, setMobile] = useState('');
  const [otp, setOtp] = useState('');
  const [timer, setTimer] = useState(0);
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    let interval: any;
    if (timer > 0) interval = setInterval(() => setTimer(t => t - 1), 1000);
    return () => clearInterval(interval);
  }, [timer]);

  const handleSendOtp = () => {
    if (!isValidMobile(mobile)) {
      setError("Enter a valid 10-digit number.");
      return;
    }
    setError('');
    setOtpSent(true);
    setTimer(30);
    showToast(`OTP sent to +91 ${mobile}`, "success");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!otpSent) return;
    
    if (otp.length !== 6) {
      setError("Enter a valid 6-digit OTP.");
      showToast("Please enter a valid 6-digit OTP.", "error");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      showToast("OTP login coming soon.", "error");
    }, 500);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      {/* Mobile Input + Send OTP inline */}
      <div>
        <div className={`flex border rounded-[4px] overflow-hidden bg-white transition-colors ${error && !otpSent ? 'border-red-500 bg-red-50/20' : mobile.length === 10 ? 'border-zinc-500' : 'border-neutral-200'} focus-within:border-black min-h-[48px]`}>
          <div className="px-3 flex items-center text-zinc-500 font-sans text-xs bg-neutral-50 border-r border-neutral-100">+91</div>
          <input 
            type="text" 
            placeholder="Mobile Number" 
            maxLength={10}
            className="flex-1 px-3 py-2.5 font-sans text-xs outline-none bg-transparent"
            value={mobile}
            onChange={(e) => { 
              const val = e.target.value.replace(/\D/g, '');
              setMobile(val);
              setError('');
            }}
          />
          <button 
            type="button" 
            onClick={handleSendOtp}
            disabled={timer > 0 || mobile.length !== 10}
            className="px-4 border-l border-neutral-100 text-xs font-sans font-medium text-zinc-700 hover:text-black hover:bg-neutral-50 disabled:opacity-50 disabled:hover:bg-transparent disabled:hover:text-zinc-700 transition-all uppercase tracking-wider"
          >
            {timer > 0 ? `${timer}s` : otpSent ? 'Resend' : 'Send OTP'}
          </button>
        </div>
        {error && !otpSent && <p className="text-red-500 font-sans text-[10px] mt-1.5 ml-1">{error}</p>}
      </div>

      {/* OTP Field, displayed after code gets sent */}
      {otpSent && (
        <div className="animate-fade-in">
          <input 
            type="text" 
            placeholder="Enter 6-Digit OTP" 
            maxLength={6}
            className={`w-full border rounded-[4px] px-3 py-2.5 text-center font-sans text-sm tracking-[6px] outline-none min-h-[48px] focus:border-black ${error ? 'border-red-500 bg-red-50/20' : 'border-neutral-200'}`}
            value={otp}
            onChange={(e) => { 
              const val = e.target.value.replace(/\D/g, '');
              setOtp(val);
              setError('');
            }}
          />
          {error && <p className="text-red-500 font-sans text-[10px] mt-1.5 ml-1">{error}</p>}
        </div>
      )}

      {otpSent && (
        <button 
          type="submit" 
          disabled={loading || otp.length !== 6}
          className="w-full bg-[#1e1a14] hover:bg-black text-[#c9a84c] hover:text-[#e5c56c] font-sans text-xs font-medium uppercase tracking-[3px] min-h-[48px] rounded-[4px] transition-colors mt-2 disabled:opacity-50"
        >
          {loading ? "Verifying..." : "Verify & Sign In"}
        </button>
      )}
    </form>
  );
}

// ----------------------------------------------------------------------
// EMAIL LOGIN FORM
// ----------------------------------------------------------------------
function EmailLoginForm({ showToast, router }: { showToast: any, router: any }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPwd, setShowPwd] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: any = {};
    if (!email) newErrors.email = "Email is required.";
    else if (!isValidEmail(email)) newErrors.email = "Please enter a valid email address.";
    
    if (!password) newErrors.password = "Password is required.";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      showToast("Please fix the errors below.", "error");
      return;
    }

    setLoading(true);
    try {
      const res = await signIn('credentials', {
        redirect: false,
        email,
        password,
      });
      if (res?.error) {
        showToast("Invalid email or password.", "error");
        setErrors({ password: "Incorrect email or password." });
      } else {
        showToast("Successfully logged in.", "success");
        router.push('/account');
      }
    } catch {
      showToast("Something went wrong. Try again.", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div>
        <input 
          type="text" 
          placeholder="Email Address" 
          className={`w-full border rounded-[4px] px-3 py-2.5 font-sans text-xs outline-none min-h-[48px] focus:border-black ${errors.email ? 'border-red-500 bg-red-50/20' : email ? 'border-zinc-500' : 'border-neutral-200'}`}
          value={email}
          onChange={(e) => { setEmail(e.target.value); setErrors(prev => ({ ...prev, email: undefined })); }}
        />
        {errors.email && <p className="text-red-500 font-sans text-[10px] mt-1.5 ml-1">{errors.email}</p>}
      </div>

      <div>
        <div className="relative">
          <input 
            type={showPwd ? "text" : "password"} 
            placeholder="Password" 
            className={`w-full border rounded-[4px] px-3 py-2.5 font-sans text-xs outline-none min-h-[48px] pr-10 focus:border-black ${errors.password ? 'border-red-500 bg-red-50/20' : password ? 'border-zinc-500' : 'border-neutral-200'}`}
            value={password}
            onChange={(e) => { setPassword(e.target.value); setErrors(prev => ({ ...prev, password: undefined })); }}
          />
          <button type="button" onClick={() => setShowPwd(!showPwd)} className="absolute right-1 top-1 bottom-1 w-[40px] flex items-center justify-center text-zinc-400 hover:text-black">
            {showPwd ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        </div>
        {errors.password && <p className="text-red-500 font-sans text-[10px] mt-1.5 ml-1">{errors.password}</p>}
      </div>

      <div className="text-right">
        <Link href="#" className="font-sans text-[10px] tracking-[1px] text-[#8c6b16] uppercase hover:underline">Forgot Password?</Link>
      </div>

      <button 
        type="submit" 
        disabled={loading}
        className="w-full bg-[#1e1a14] hover:bg-black text-[#c9a84c] hover:text-[#e5c56c] font-sans text-xs font-medium uppercase tracking-[3px] min-h-[48px] rounded-[4px] transition-colors mt-2"
      >
        {loading ? "Signing In..." : "Sign In"}
      </button>
    </form>
  );
}

// ----------------------------------------------------------------------
// REGISTER FORM
// ----------------------------------------------------------------------
function RegisterForm({ showToast, router, setMode }: { showToast: any, router: any, setMode: any }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [pwd, setPwd] = useState('');
  const [cPwd, setCPwd] = useState('');
  const [showPwd, setShowPwd] = useState(false);
  const [showCPwd, setShowCPwd] = useState(false);
  const [errors, setErrors] = useState<any>({});
  const [loading, setLoading] = useState(false);

  // Password Strength Logic
  let strength = 0;
  if (pwd.length >= 8) strength++;
  if (/[A-Z]/.test(pwd)) strength++;
  if (/[0-9]/.test(pwd)) strength++;
  if (/[^A-Za-z0-9]/.test(pwd)) strength++;

  const getStrengthBars = () => {
    return [1, 2, 3, 4].map(level => {
      let color = 'bg-gray-150';
      if (pwd.length > 0) {
        if (strength === 1 && level <= 1) color = 'bg-red-500';
        else if (strength === 2 && level <= 2) color = 'bg-amber-500';
        else if (strength === 3 && level <= 3) color = 'bg-amber-500';
        else if (strength === 4 && level <= 4) color = 'bg-green-600';
      }
      return <div key={level} className={`flex-1 h-1 rounded-full ${color} transition-colors duration-300`} />;
    });
  };

  const getStrengthText = () => {
    if (pwd.length === 0) return "";
    if (strength === 1) return "Weak";
    if (strength === 2) return "Fair";
    if (strength === 3) return "Good";
    if (strength === 4) return "Strong";
    return "";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: any = {};
    if (name.length < 2) newErrors.name = "Enter a valid name.";
    if (!isValidEmail(email)) newErrors.email = "Enter a valid email.";
    if (!isValidMobile(mobile)) newErrors.mobile = "Enter a 10-digit mobile number.";
    if (pwd.length < 8) newErrors.pwd = "Password must be at least 8 characters.";
    if (pwd !== cPwd) newErrors.cPwd = "Passwords do not match.";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      showToast("Please fix the errors below.", "error");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password: pwd }),
      });
      const data = await res.json();
      if (!res.ok) {
        showToast(data.error || "Registration failed.", "error");
        if (data.error?.includes('email')) setErrors((p:any) => ({ ...p, email: data.error }));
      } else {
        showToast("Account created! Signing you in...", "success");
        await signIn('credentials', { redirect: false, email, password: pwd });
        router.push('/account');
      }
    } catch {
      showToast("Something went wrong. Try again.", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div>
        <input 
          type="text" 
          placeholder="Full Name" 
          className={`w-full border rounded-[4px] px-3 py-2.5 font-sans text-xs outline-none min-h-[48px] focus:border-black ${errors.name ? 'border-red-500 bg-red-50/20' : name.length >= 2 ? 'border-zinc-500' : 'border-neutral-200'}`}
          value={name}
          onChange={(e) => { setName(e.target.value); setErrors((prev:any) => ({ ...prev, name: undefined })); }}
        />
        {errors.name && <p className="text-red-500 font-sans text-[10px] mt-1.5 ml-1">{errors.name}</p>}
      </div>

      <div>
        <input 
          type="email" 
          placeholder="Email Address" 
          className={`w-full border rounded-[4px] px-3 py-2.5 font-sans text-xs outline-none min-h-[48px] focus:border-black ${errors.email ? 'border-red-500 bg-red-50/20' : isValidEmail(email) ? 'border-zinc-500' : 'border-neutral-200'}`}
          value={email}
          onChange={(e) => { setEmail(e.target.value); setErrors((prev:any) => ({ ...prev, email: undefined })); }}
        />
        {errors.email && <p className="text-red-500 font-sans text-[10px] mt-1.5 ml-1">{errors.email}</p>}
      </div>

      <div>
        <div className={`flex border rounded-[4px] overflow-hidden bg-white transition-colors focus-within:border-black min-h-[48px] ${errors.mobile ? 'border-red-500 bg-red-50/20' : mobile.length === 10 ? 'border-zinc-500' : 'border-neutral-200'}`}>
          <div className="px-3 flex items-center text-zinc-500 font-sans text-xs bg-neutral-50 border-r border-neutral-100">+91</div>
          <input 
            type="text" 
            placeholder="Mobile Number" 
            maxLength={10}
            className="flex-1 px-3 py-2.5 font-sans text-xs outline-none bg-transparent"
            value={mobile}
            onChange={(e) => { setMobile(e.target.value.replace(/\D/g, '')); setErrors((prev:any) => ({ ...prev, mobile: undefined })); }}
          />
        </div>
        {errors.mobile && <p className="text-red-500 font-sans text-[10px] mt-1.5 ml-1">{errors.mobile}</p>}
      </div>

      <div>
        <div className="relative">
          <input 
            type={showPwd ? "text" : "password"} 
            placeholder="Password" 
            className={`w-full border rounded-[4px] px-3 py-2.5 font-sans text-xs outline-none min-h-[48px] pr-10 focus:border-black ${errors.pwd ? 'border-red-500 bg-red-50/20' : pwd.length >= 8 ? 'border-zinc-500' : 'border-neutral-200'}`}
            value={pwd}
            onChange={(e) => { setPwd(e.target.value); setErrors((prev:any) => ({ ...prev, pwd: undefined })); }}
          />
          <button type="button" onClick={() => setShowPwd(!showPwd)} className="absolute right-1 top-1 bottom-1 w-[40px] flex items-center justify-center text-zinc-400 hover:text-black">
            {showPwd ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        </div>
        <div className="flex items-center justify-between mt-1.5 px-1">
          <div className="flex gap-1 w-24">{getStrengthBars()}</div>
          <span className="font-sans text-[9px] uppercase tracking-widest text-zinc-500 font-medium">{getStrengthText()}</span>
        </div>
        {errors.pwd && <p className="text-red-500 font-sans text-[10px] mt-1 ml-1">{errors.pwd}</p>}
      </div>

      <div>
        <div className="relative">
          <input 
            type={showCPwd ? "text" : "password"} 
            placeholder="Confirm Password" 
            className={`w-full border rounded-[4px] px-3 py-2.5 font-sans text-xs outline-none min-h-[48px] pr-10 focus:border-black ${errors.cPwd ? 'border-red-500 bg-red-50/20' : cPwd && cPwd === pwd ? 'border-zinc-500' : 'border-neutral-200'}`}
            value={cPwd}
            onChange={(e) => { setCPwd(e.target.value); setErrors((prev:any) => ({ ...prev, cPwd: undefined })); }}
          />
          <button type="button" onClick={() => setShowCPwd(!showCPwd)} className="absolute right-1 top-1 bottom-1 w-[40px] flex items-center justify-center text-zinc-400 hover:text-black">
            {showCPwd ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        </div>
        {errors.cPwd && <p className="text-red-500 font-sans text-[10px] mt-1.5 ml-1">{errors.cPwd}</p>}
      </div>

      <button 
        type="submit" 
        disabled={loading}
        className="w-full bg-[#1e1a14] hover:bg-black text-[#c9a84c] hover:text-[#e5c56c] font-sans text-xs font-medium uppercase tracking-[3px] min-h-[48px] rounded-[4px] transition-colors mt-2"
      >
        {loading ? "Creating Account..." : "Create Account"}
      </button>
      
      <div className="text-center mt-1">
        <button type="button" onClick={() => setMode('email')} className="font-sans text-[11px] text-zinc-500 hover:text-black">
          Already have an account? <span className="underline uppercase tracking-wider ml-1 text-[10px] font-medium">Sign in</span>
        </button>
      </div>
    </form>
  );
}
