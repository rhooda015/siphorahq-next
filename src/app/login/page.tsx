"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, X } from 'lucide-react';
import { BRAND } from '@/config/brand';
import { signIn } from 'next-auth/react';

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
    <div className={`fixed top-4 right-4 z-[200] px-6 py-3 shadow-lg flex items-center gap-3 animate-fade-in ${type === 'success' ? 'bg-[#1e1a14] text-white' : 'bg-[#E24B4A] text-white'}`}>
      <span className="font-sans text-sm tracking-widest uppercase">{message}</span>
      <button onClick={onClose}><X className="w-4 h-4" /></button>
    </div>
  );
};

export default function LoginPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'email' | 'otp' | 'register'>('email');
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  // Common styles
  const inputBaseStyle = "w-full border-[0.5px] rounded-[2px] px-[14px] py-[12px] font-sans text-[13px] outline-none transition-colors";
  const btnBaseStyle = "w-full flex items-center justify-center tracking-[4px] uppercase rounded-[2px] transition-colors py-[14px] font-sans text-xs";

  const showToast = (message: string, type: 'success' | 'error') => setToast({ message, type });

  return (
    <div className="min-h-screen w-full flex flex-col md:flex-row bg-white">
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

      {/* LEFT PANEL */}
      <div 
        className="hidden md:flex w-[42%] bg-[#1e1a14] relative flex-col justify-center items-center px-12"
        style={{
          backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,0.02) 10px, rgba(255,255,255,0.02) 20px)'
        }}
      >
        <div className="absolute right-0 top-1/4 bottom-1/4 w-[1px]" style={{ background: 'linear-gradient(to bottom, transparent, #4a3c28, transparent)' }} />
        
        <Link href="/" className="text-white text-5xl font-serif tracking-[8px] uppercase mb-4 text-center z-10">
          {BRAND.name}
        </Link>
        <p className="text-[#b8922a] font-sans text-sm tracking-[4px] uppercase mb-16 text-center z-10">
          Luxury Redefined
        </p>
        
        <p className="text-white/60 font-serif italic text-xl text-center max-w-sm leading-relaxed z-10">
          "Where every meal becomes a masterpiece, and every gathering an unforgettable experience."
        </p>
      </div>

      {/* RIGHT PANEL */}
      <div className="flex-1 flex flex-col pt-8 md:pt-16 px-6 md:px-24">
        {/* Mobile Logo Fallback */}
        <div className="md:hidden text-center mb-10">
          <Link href="/" className="text-[#1e1a14] text-4xl font-serif tracking-[6px] uppercase">{BRAND.name}</Link>
          <p className="text-[#b8922a] font-sans text-[10px] tracking-[3px] uppercase mt-2">Luxury Redefined</p>
        </div>

        <div className="w-full max-w-md mx-auto">
          {/* Tabs */}
          <div className="flex border-b border-gray-200 mb-8 font-sans text-[11px] uppercase tracking-[2px]">
            <button 
              onClick={() => setActiveTab('email')} 
              className={`flex-1 pb-4 transition-colors ${activeTab === 'email' ? 'text-[#b8922a] border-b-[1.5px] border-[#b8922a] font-medium' : 'text-gray-400 hover:text-gray-600'}`}
            >
              Email Login
            </button>
            <button 
              onClick={() => setActiveTab('otp')} 
              className={`flex-1 pb-4 transition-colors ${activeTab === 'otp' ? 'text-[#b8922a] border-b-[1.5px] border-[#b8922a] font-medium' : 'text-gray-400 hover:text-gray-600'}`}
            >
              Mobile OTP
            </button>
            <button 
              onClick={() => setActiveTab('register')} 
              className={`flex-1 pb-4 transition-colors ${activeTab === 'register' ? 'text-[#b8922a] border-b-[1.5px] border-[#b8922a] font-medium' : 'text-gray-400 hover:text-gray-600'}`}
            >
              Register
            </button>
          </div>

          {/* Forms */}
          {activeTab === 'email' && <EmailLoginForm inputBaseStyle={inputBaseStyle} btnBaseStyle={btnBaseStyle} showToast={showToast} router={router} />}
          {activeTab === 'otp' && <OtpLoginForm inputBaseStyle={inputBaseStyle} btnBaseStyle={btnBaseStyle} showToast={showToast} router={router} />}
          {activeTab === 'register' && <RegisterForm inputBaseStyle={inputBaseStyle} btnBaseStyle={btnBaseStyle} showToast={showToast} router={router} setActiveTab={setActiveTab} />}

          {/* Social Links (Common for Email and Register) */}
          {activeTab !== 'otp' && (
            <div className="mt-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="flex-1 h-[1px] bg-gray-200" />
                <span className="font-sans text-[10px] tracking-[2px] text-gray-400 uppercase">Or continue with</span>
                <div className="flex-1 h-[1px] bg-gray-200" />
              </div>
              <div className="grid grid-cols-3 gap-3">
                <button onClick={() => signIn('google', { callbackUrl: '/' })} className="flex items-center justify-center gap-2 border-[0.5px] border-gray-300 py-3 rounded-[2px] hover:bg-gray-50 transition-colors">
                  <span className="font-bold font-sans text-lg leading-none">G</span>
                  <span className="font-sans text-[10px] tracking-widest uppercase">Google</span>
                </button>
                <button onClick={() => showToast('Connecting to Facebook...', 'success')} className="flex items-center justify-center gap-2 border-[0.5px] border-gray-300 py-3 rounded-[2px] hover:bg-gray-50 transition-colors">
                  <span className="font-bold font-serif text-lg leading-none text-blue-600">f</span>
                  <span className="font-sans text-[10px] tracking-widest uppercase">Facebook</span>
                </button>
                <button onClick={() => showToast('Connecting to Instagram...', 'success')} className="flex items-center justify-center gap-2 border-[0.5px] border-gray-300 py-3 rounded-[2px] hover:bg-gray-50 transition-colors">
                  <span className="font-sans text-[10px] tracking-widest uppercase">Insta</span>
                </button>
              </div>
            </div>
          )}

          {/* Footer Text */}
          <div className="mt-12 text-center pb-8">
            <p className="font-sans text-[11px] text-gray-400 leading-relaxed max-w-xs mx-auto">
              By proceeding, you agree to our <Link href="#" className="underline">Terms of Service</Link> & <Link href="#" className="underline">Privacy Policy</Link>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ----------------------------------------
// EMAIL LOGIN FORM
// ----------------------------------------
function EmailLoginForm({ inputBaseStyle, btnBaseStyle, showToast, router }: any) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPwd, setShowPwd] = useState(false);
  
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [loading, setLoading] = useState(false);

  const clearErr = (field: string) => setErrors(prev => ({ ...prev, [field]: undefined }));

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

  const getInputClass = (val: string, err?: string) => {
    if (err) return "border-[#E24B4A] bg-[#FCEBEB]";
    if (val) return "border-[#639922]";
    return "border-gray-300";
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <div>
        <input 
          type="text" 
          placeholder="Email Address" 
          className={`${inputBaseStyle} ${getInputClass(email, errors.email)}`}
          value={email}
          onChange={(e) => { setEmail(e.target.value); clearErr('email'); }}
        />
        {errors.email && <p className="text-[#E24B4A] font-sans text-[11px] mt-1.5 ml-1">{errors.email}</p>}
      </div>
      <div>
        <div className="relative">
          <input 
            type={showPwd ? "text" : "password"} 
            placeholder="Password" 
            className={`${inputBaseStyle} ${getInputClass(password, errors.password)} pr-10`}
            value={password}
            onChange={(e) => { setPassword(e.target.value); clearErr('password'); }}
          />
          <button type="button" onClick={() => setShowPwd(!showPwd)} className="absolute right-3 top-[13px] text-gray-400 hover:text-gray-600">
            {showPwd ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        </div>
        {errors.password && <p className="text-[#E24B4A] font-sans text-[11px] mt-1.5 ml-1">{errors.password}</p>}
      </div>
      <div className="text-right">
        <Link href="#" className="font-sans text-[10px] tracking-[1px] text-[#b8922a] uppercase hover:underline">Forgot Password?</Link>
      </div>
      <button 
        type="submit" 
        disabled={loading}
        className={`${btnBaseStyle} bg-[#1e1a14] text-[#b8922a] hover:bg-black mt-2 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
      >
        {loading ? "Signing In..." : "Sign In"}
      </button>
    </form>
  );
}

// ----------------------------------------
// OTP LOGIN FORM
// ----------------------------------------
function OtpLoginForm({ inputBaseStyle, btnBaseStyle, showToast, router }: any) {
  const [mobile, setMobile] = useState('');
  const [otp, setOtp] = useState('');
  const [errors, setErrors] = useState<{ mobile?: string; otp?: string }>({});
  
  const [timer, setTimer] = useState(0);
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let interval: any;
    if (timer > 0) interval = setInterval(() => setTimer(t => t - 1), 1000);
    return () => clearInterval(interval);
  }, [timer]);

  const clearErr = (field: string) => setErrors(prev => ({ ...prev, [field]: undefined }));

  const handleSendOtp = () => {
    if (!isValidMobile(mobile)) {
      setErrors({ mobile: "Enter a valid 10-digit number." });
      return;
    }
    setOtpSent(true);
    setTimer(30);
    showToast(`OTP sent to +91 ${mobile}`, "success");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!otpSent) return;
    
    if (otp.length !== 6) {
      setErrors({ otp: "Enter a valid 6-digit OTP." });
      showToast("Please fix the errors below.", "error");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      showToast("Successfully verified.", "success");
      router.push('/account');
    }, 1500);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <div>
        <div className={`flex border-[0.5px] rounded-[2px] transition-colors ${errors.mobile ? 'border-[#E24B4A] bg-[#FCEBEB]' : mobile.length === 10 ? 'border-[#639922]' : 'border-gray-300'}`}>
          <div className="px-4 py-[12px] text-gray-500 font-sans text-[13px] bg-gray-50 border-r border-gray-200">+91</div>
          <input 
            type="text" 
            placeholder="Mobile Number" 
            maxLength={10}
            className="flex-1 px-[14px] py-[12px] font-sans text-[13px] outline-none bg-transparent"
            value={mobile}
            onChange={(e) => { 
              const val = e.target.value.replace(/\D/g, '');
              setMobile(val); clearErr('mobile'); 
            }}
          />
        </div>
        {errors.mobile && <p className="text-[#E24B4A] font-sans text-[11px] mt-1.5 ml-1">{errors.mobile}</p>}
      </div>

      <div>
        <div className="flex gap-3">
          <input 
            type="text" 
            placeholder="ENTER OTP" 
            maxLength={6}
            disabled={!otpSent}
            className={`${inputBaseStyle} text-center tracking-[4px] flex-1 ${errors.otp ? 'border-[#E24B4A] bg-[#FCEBEB]' : otp.length === 6 ? 'border-[#639922]' : 'border-gray-300'} ${!otpSent ? 'opacity-50 bg-gray-50' : ''}`}
            value={otp}
            onChange={(e) => { 
              const val = e.target.value.replace(/\D/g, '');
              setOtp(val); clearErr('otp'); 
            }}
          />
          <button 
            type="button" 
            onClick={handleSendOtp}
            disabled={timer > 0 || mobile.length !== 10}
            className="px-6 border-[0.5px] border-[#1e1a14] text-[#1e1a14] font-sans text-[10px] tracking-[2px] uppercase rounded-[2px] hover:bg-gray-50 disabled:opacity-50 transition-colors min-w-[120px]"
          >
            {timer > 0 ? `${timer}s` : otpSent ? 'RESEND' : 'SEND OTP'}
          </button>
        </div>
        {errors.otp && <p className="text-[#E24B4A] font-sans text-[11px] mt-1.5 ml-1">{errors.otp}</p>}
      </div>

      <button 
        type="submit" 
        disabled={loading || !otpSent || otp.length !== 6}
        className={`${btnBaseStyle} bg-[#1e1a14] text-[#b8922a] hover:bg-black mt-2 disabled:opacity-50 disabled:cursor-not-allowed`}
      >
        {loading ? "Verifying..." : "Verify & Sign In"}
      </button>

      {/* OTP Social Links */}
      <div className="mt-4">
        <div className="flex items-center gap-4 mb-4">
          <div className="flex-1 h-[1px] bg-gray-200" />
          <span className="font-sans text-[10px] tracking-[2px] text-gray-400 uppercase">Or</span>
          <div className="flex-1 h-[1px] bg-gray-200" />
        </div>
        <div className="flex gap-3">
           <button type="button" onClick={() => signIn('google', { callbackUrl: '/' })} className="flex-1 flex items-center justify-center gap-2 border-[0.5px] border-gray-300 py-3 rounded-[2px] hover:bg-gray-50 transition-colors">
            <span className="font-sans text-[10px] tracking-widest uppercase">Google</span>
          </button>
          <button type="button" onClick={() => showToast('Connecting to Facebook...', 'success')} className="flex-1 flex items-center justify-center gap-2 border-[0.5px] border-gray-300 py-3 rounded-[2px] hover:bg-gray-50 transition-colors">
            <span className="font-sans text-[10px] tracking-widest uppercase">Facebook</span>
          </button>
        </div>
      </div>
    </form>
  );
}

// ----------------------------------------
// REGISTER FORM
// ----------------------------------------
function RegisterForm({ inputBaseStyle, btnBaseStyle, showToast, router, setActiveTab }: any) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [pwd, setPwd] = useState('');
  const [cPwd, setCPwd] = useState('');
  
  const [showPwd, setShowPwd] = useState(false);
  const [showCPwd, setShowCPwd] = useState(false);
  const [errors, setErrors] = useState<any>({});
  const [loading, setLoading] = useState(false);

  const clearErr = (field: string) => setErrors((prev:any) => ({ ...prev, [field]: undefined }));

  // Password Strength logic
  let strength = 0;
  if (pwd.length >= 8) strength++;
  if (/[A-Z]/.test(pwd)) strength++;
  if (/[0-9]/.test(pwd)) strength++;
  if (/[^A-Za-z0-9]/.test(pwd)) strength++;

  const getStrengthBars = () => {
    return [1, 2, 3, 4].map(level => {
      let color = 'bg-gray-200';
      if (pwd.length > 0) {
        if (strength === 1 && level <= 1) color = 'bg-[#E24B4A]';
        else if (strength === 2 && level <= 2) color = 'bg-[#f59e0b]';
        else if (strength === 3 && level <= 3) color = 'bg-[#f59e0b]';
        else if (strength === 4 && level <= 4) color = 'bg-[#639922]';
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

  const getInputClass = (val: string, err?: string, customValid?: boolean) => {
    if (err) return "border-[#E24B4A] bg-[#FCEBEB]";
    if (customValid !== undefined ? customValid : val) return "border-[#639922]";
    return "border-gray-300";
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div>
        <input 
          type="text" 
          placeholder="Full Name" 
          className={`${inputBaseStyle} ${getInputClass(name, errors.name, name.length >= 2)}`}
          value={name}
          onChange={(e) => { setName(e.target.value); clearErr('name'); }}
        />
        {errors.name && <p className="text-[#E24B4A] font-sans text-[11px] mt-1 ml-1">{errors.name}</p>}
      </div>

      <div>
        <input 
          type="email" 
          placeholder="Email Address" 
          className={`${inputBaseStyle} ${getInputClass(email, errors.email, isValidEmail(email))}`}
          value={email}
          onChange={(e) => { setEmail(e.target.value); clearErr('email'); }}
        />
        {errors.email && <p className="text-[#E24B4A] font-sans text-[11px] mt-1 ml-1">{errors.email}</p>}
      </div>

      <div>
        <div className={`flex border-[0.5px] rounded-[2px] transition-colors ${errors.mobile ? 'border-[#E24B4A] bg-[#FCEBEB]' : mobile.length === 10 ? 'border-[#639922]' : 'border-gray-300'}`}>
          <div className="px-4 py-[12px] text-gray-500 font-sans text-[13px] bg-gray-50 border-r border-gray-200">+91</div>
          <input 
            type="text" 
            placeholder="Mobile Number" 
            maxLength={10}
            className="flex-1 px-[14px] py-[12px] font-sans text-[13px] outline-none bg-transparent"
            value={mobile}
            onChange={(e) => { setMobile(e.target.value.replace(/\D/g, '')); clearErr('mobile'); }}
          />
        </div>
        {errors.mobile && <p className="text-[#E24B4A] font-sans text-[11px] mt-1 ml-1">{errors.mobile}</p>}
      </div>

      <div>
        <div className="relative">
          <input 
            type={showPwd ? "text" : "password"} 
            placeholder="Password" 
            className={`${inputBaseStyle} ${getInputClass(pwd, errors.pwd, pwd.length >= 8)} pr-10`}
            value={pwd}
            onChange={(e) => { setPwd(e.target.value); clearErr('pwd'); }}
          />
          <button type="button" onClick={() => setShowPwd(!showPwd)} className="absolute right-3 top-[13px] text-gray-400 hover:text-gray-600">
            {showPwd ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        </div>
        <div className="flex items-center justify-between mt-2 px-1">
          <div className="flex gap-1 w-24">{getStrengthBars()}</div>
          <span className="font-sans text-[10px] uppercase tracking-widest text-gray-500">{getStrengthText()}</span>
        </div>
        {errors.pwd && <p className="text-[#E24B4A] font-sans text-[11px] mt-1 ml-1">{errors.pwd}</p>}
      </div>

      <div>
        <div className="relative">
          <input 
            type={showCPwd ? "text" : "password"} 
            placeholder="Confirm Password" 
            className={`${inputBaseStyle} ${getInputClass(cPwd, errors.cPwd, cPwd.length > 0 && cPwd === pwd)} pr-10`}
            value={cPwd}
            onChange={(e) => { setCPwd(e.target.value); clearErr('cPwd'); }}
          />
          <button type="button" onClick={() => setShowCPwd(!showCPwd)} className="absolute right-3 top-[13px] text-gray-400 hover:text-gray-600">
            {showCPwd ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        </div>
        {errors.cPwd && <p className="text-[#E24B4A] font-sans text-[11px] mt-1 ml-1">{errors.cPwd}</p>}
      </div>

      <button 
        type="submit" 
        disabled={loading}
        className={`${btnBaseStyle} bg-[#1e1a14] text-[#b8922a] hover:bg-black mt-2 disabled:opacity-70 disabled:cursor-not-allowed`}
      >
        {loading ? "Creating Account..." : "Create Account"}
      </button>
      
      <div className="text-center mt-2">
        <button type="button" onClick={() => setActiveTab('email')} className="font-sans text-[11px] text-gray-500 hover:text-[#1e1a14] transition-colors">
          Already have an account? <span className="underline uppercase tracking-widest ml-1 text-[10px]">Sign in</span>
        </button>
      </div>
    </form>
  );
}
