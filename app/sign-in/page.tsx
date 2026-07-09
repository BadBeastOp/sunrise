"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Eye, EyeOff, Mail, Lock, ArrowRight, Globe } from "lucide-react";

export default function SignInPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ email: "", password: "", remember: false });
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
    if (errors[name as keyof typeof errors]) setErrors(prev => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs: typeof errors = {};
    if (!form.email.trim()) errs.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = "Enter a valid email";
    if (!form.password) errs.password = "Password is required";
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setLoading(true);
    setTimeout(() => setLoading(false), 1500);
  };

  return (
    <div className="min-h-screen pt-20 flex items-center">
      <div className="w-full max-w-[1440px] mx-auto px-5 sm:px-10 lg:px-20 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 max-w-5xl mx-auto shadow-xl overflow-hidden">
          {/* Left — Image */}
          <div className="relative hidden lg:block">
            <img src="https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=800&q=85"
              alt="Luxury jewellery" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
            <div className="absolute bottom-10 left-10 right-10">
              <p className="text-[10px] tracking-[0.45em] text-[#C7A76C] font-inter font-semibold uppercase mb-3">Welcome Back</p>
              <h2 className="font-cormorant text-4xl font-light text-white leading-tight mb-4">
                Your collection<br />awaits
              </h2>
              <p className="text-white/55 text-sm font-inter font-light leading-relaxed">
                Access your wishlist, track orders, and manage your Sunrise Treasures account.
              </p>
            </div>
          </div>

          {/* Right — Form */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }}
            className="bg-white px-8 md:px-12 py-14 flex flex-col justify-center">
            <div className="mb-8">
              <Link href="/" className="font-cormorant text-xl tracking-[0.2em] text-[#111111] block mb-8">
                SUNRISE TREASURES
              </Link>
              <p className="text-[10px] tracking-[0.4em] text-[#C7A76C] font-inter font-semibold uppercase mb-2">Welcome Back</p>
              <h1 className="font-cormorant text-4xl font-light text-[#111111]">Sign In</h1>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="email" className="block text-[10px] tracking-[0.25em] font-inter font-semibold uppercase text-[#111111] mb-2">Email</label>
                <div className="relative">
                  <Mail size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#aaa]" />
                  <input id="email" name="email" type="email" placeholder="you@example.com"
                    value={form.email} onChange={handleChange}
                    className={`w-full pl-11 pr-4 py-3.5 border text-sm font-inter focus:outline-none transition-colors ${errors.email ? "border-red-400" : "border-[#ECECEC] focus:border-[#111111]"}`} />
                </div>
                {errors.email && <p className="text-[11px] text-red-500 mt-1 font-inter">{errors.email}</p>}
              </div>

              <div>
                <div className="flex justify-between mb-2">
                  <label htmlFor="password" className="text-[10px] tracking-[0.25em] font-inter font-semibold uppercase text-[#111111]">Password</label>
                  <Link href="#" className="text-[11px] font-inter text-[#C7A76C] hover:underline">Forgot password?</Link>
                </div>
                <div className="relative">
                  <Lock size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#aaa]" />
                  <input id="password" name="password" type={showPassword ? "text" : "password"}
                    placeholder="••••••••" value={form.password} onChange={handleChange}
                    className={`w-full pl-11 pr-12 py-3.5 border text-sm font-inter focus:outline-none transition-colors ${errors.password ? "border-red-400" : "border-[#ECECEC] focus:border-[#111111]"}`} />
                  <button type="button" onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[#aaa] hover:text-[#111111] transition-colors">
                    {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                </div>
                {errors.password && <p className="text-[11px] text-red-500 mt-1 font-inter">{errors.password}</p>}
              </div>

              <div className="flex items-center gap-2.5">
                <input id="remember" name="remember" type="checkbox" checked={form.remember} onChange={handleChange}
                  className="w-4 h-4 border border-[#ECECEC] accent-[#C7A76C]" />
                <label htmlFor="remember" className="text-sm text-[#6B6B6B] font-inter cursor-pointer">Remember me</label>
              </div>

              <button type="submit" disabled={loading}
                className="w-full py-4 bg-[#111111] text-white text-[11px] tracking-[0.25em] font-inter font-semibold uppercase flex items-center justify-center gap-3 hover:bg-[#C7A76C] transition-colors duration-300 disabled:opacity-60">
                {loading ? "Signing in…" : <><span>Sign In</span><ArrowRight size={14} /></>}
              </button>
            </form>

            <div className="my-6 flex items-center gap-4">
              <div className="flex-1 h-px bg-[#ECECEC]" />
              <span className="text-[11px] text-[#aaa] font-inter">or continue with</span>
              <div className="flex-1 h-px bg-[#ECECEC]" />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button className="flex items-center justify-center gap-2 py-3 border border-[#ECECEC] text-[11px] font-inter font-semibold tracking-[0.1em] hover:border-[#111111] transition-colors">
                <Globe size={14} /> Google
              </button>
              <button className="flex items-center justify-center gap-2 py-3 border border-[#ECECEC] text-[11px] font-inter font-semibold tracking-[0.1em] hover:border-[#111111] transition-colors">
                <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                </svg>
                Apple
              </button>
            </div>

            <p className="text-center text-sm text-[#6B6B6B] font-inter mt-6">
              New to Sunrise Treasures?{" "}
              <Link href="/sign-up" className="text-[#C7A76C] font-medium hover:underline">Create an account</Link>
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}