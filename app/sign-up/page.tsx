"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Eye, EyeOff, Mail, Lock, User, Phone, ArrowRight, Globe, Check } from "lucide-react";

interface FormData {
  firstName: string; lastName: string; email: string; phone: string;
  password: string; confirmPassword: string; terms: boolean;
}

function getPasswordStrength(password: string) {
  if (!password) return { score: 0, label: "", color: "" };
  let score = 0;
  if (password.length >= 8) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;
  const map = [
    { label: "Weak", color: "bg-red-400" },
    { label: "Fair", color: "bg-amber-400" },
    { label: "Good", color: "bg-yellow-400" },
    { label: "Strong", color: "bg-green-400" },
    { label: "Excellent", color: "bg-emerald-500" },
  ];
  return { score, ...map[score] };
}

function validate(data: FormData) {
  const errs: Record<string, string> = {};
  if (!data.firstName.trim()) errs.firstName = "First name is required";
  if (!data.lastName.trim()) errs.lastName = "Last name is required";
  if (!data.email.trim()) errs.email = "Email is required";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) errs.email = "Enter a valid email address";
  if (!data.password) errs.password = "Password is required";
  else if (data.password.length < 8) errs.password = "Password must be at least 8 characters";
  if (!data.confirmPassword) errs.confirmPassword = "Please confirm your password";
  else if (data.password !== data.confirmPassword) errs.confirmPassword = "Passwords do not match";
  if (!data.terms) errs.terms = "You must accept the terms to continue";
  return errs;
}

export default function SignUpPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [form, setForm] = useState<FormData>({
    firstName: "", lastName: "", email: "", phone: "",
    password: "", confirmPassword: "", terms: false,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const strength = getPasswordStrength(form.password);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate(form);
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setLoading(true);
    setTimeout(() => { setLoading(false); setSuccess(true); }, 1500);
  };

  return (
    <div className="min-h-screen pt-20 flex items-center bg-[#F8F8F8]">
      <div className="w-full max-w-[1440px] mx-auto px-5 sm:px-10 lg:px-20 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 max-w-5xl mx-auto shadow-xl overflow-hidden">

          {/* Left — Form */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }}
            className="bg-white px-8 md:px-12 py-14 flex flex-col justify-center order-2 lg:order-1">
            <div className="mb-8">
              <Link href="/" className="font-cormorant text-xl tracking-[0.2em] text-[#111111] block mb-8">SUNRISE TREASURES</Link>
              <p className="text-[10px] tracking-[0.4em] text-[#C7A76C] font-inter font-semibold uppercase mb-2">Join Us</p>
              <h1 className="font-cormorant text-4xl font-light text-[#111111]">Create Account</h1>
            </div>

            {success ? (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="py-10 text-center">
                <div className="w-16 h-16 bg-[#C7A76C] rounded-full flex items-center justify-center mx-auto mb-5">
                  <Check size={28} className="text-white" />
                </div>
                <h3 className="font-cormorant text-3xl font-light mb-3">Welcome to Sunrise Treasures</h3>
                <p className="text-[#6B6B6B] font-inter font-light text-sm mb-8 max-w-xs mx-auto">
                  Your account has been created. Explore our collections and start building your wishlist.
                </p>
                <Link href="/jewellery"
                  className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#111111] text-white text-[11px] tracking-[0.2em] font-inter font-semibold uppercase hover:bg-[#C7A76C] transition-colors duration-300">
                  Explore Collections <ArrowRight size={14} />
                </Link>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                <div className="grid grid-cols-2 gap-4">
                  {(["firstName", "lastName"] as const).map(field => (
                    <div key={field}>
                      <label htmlFor={field} className="block text-[10px] tracking-[0.25em] font-inter font-semibold uppercase text-[#111111] mb-2">
                        {field === "firstName" ? "First Name" : "Last Name"} <span className="text-[#C7A76C]">*</span>
                      </label>
                      <div className="relative">
                        <User size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#bbb]" />
                        <input id={field} name={field} type="text"
                          placeholder={field === "firstName" ? "Isabelle" : "Morin"}
                          value={form[field]} onChange={handleChange}
                          className={`w-full pl-10 pr-4 py-3 border text-sm font-inter focus:outline-none transition-colors ${errors[field] ? "border-red-400" : "border-[#ECECEC] focus:border-[#111111]"}`} />
                      </div>
                      {errors[field] && <p className="text-[11px] text-red-500 mt-1 font-inter">{errors[field]}</p>}
                    </div>
                  ))}
                </div>

                <div>
                  <label htmlFor="email" className="block text-[10px] tracking-[0.25em] font-inter font-semibold uppercase text-[#111111] mb-2">Email <span className="text-[#C7A76C]">*</span></label>
                  <div className="relative">
                    <Mail size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#bbb]" />
                    <input id="email" name="email" type="email" placeholder="you@example.com"
                      value={form.email} onChange={handleChange}
                      className={`w-full pl-10 pr-4 py-3 border text-sm font-inter focus:outline-none transition-colors ${errors.email ? "border-red-400" : "border-[#ECECEC] focus:border-[#111111]"}`} />
                  </div>
                  {errors.email && <p className="text-[11px] text-red-500 mt-1 font-inter">{errors.email}</p>}
                </div>

                <div>
                  <label htmlFor="phone" className="block text-[10px] tracking-[0.25em] font-inter font-semibold uppercase text-[#111111] mb-2">Phone <span className="text-[#999] text-[9px] normal-case ml-1">Optional</span></label>
                  <div className="relative">
                    <Phone size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#bbb]" />
                    <input id="phone" name="phone" type="tel" placeholder="+1 000 000 0000"
                      value={form.phone} onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 border border-[#ECECEC] focus:border-[#111111] text-sm font-inter focus:outline-none transition-colors" />
                  </div>
                </div>

                <div>
                  <label htmlFor="password" className="block text-[10px] tracking-[0.25em] font-inter font-semibold uppercase text-[#111111] mb-2">Password <span className="text-[#C7A76C]">*</span></label>
                  <div className="relative">
                    <Lock size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#bbb]" />
                    <input id="password" name="password" type={showPassword ? "text" : "password"}
                      placeholder="Min. 8 characters" value={form.password} onChange={handleChange}
                      className={`w-full pl-10 pr-12 py-3 border text-sm font-inter focus:outline-none transition-colors ${errors.password ? "border-red-400" : "border-[#ECECEC] focus:border-[#111111]"}`} />
                    <button type="button" onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-[#bbb] hover:text-[#111111] transition-colors">
                      {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                    </button>
                  </div>
                  {form.password && (
                    <div className="mt-2 space-y-1">
                      <div className="flex gap-1">
                        {Array.from({ length: 4 }).map((_, i) => (
                          <div key={i} className={`h-1 flex-1 rounded-full transition-all duration-300 ${i < strength.score ? strength.color : "bg-[#ECECEC]"}`} />
                        ))}
                      </div>
                      <p className="text-[11px] font-inter text-[#6B6B6B]">Strength: <span className="font-medium">{strength.label}</span></p>
                    </div>
                  )}
                  {errors.password && <p className="text-[11px] text-red-500 mt-1 font-inter">{errors.password}</p>}
                </div>

                <div>
                  <label htmlFor="confirmPassword" className="block text-[10px] tracking-[0.25em] font-inter font-semibold uppercase text-[#111111] mb-2">Confirm Password <span className="text-[#C7A76C]">*</span></label>
                  <div className="relative">
                    <Lock size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#bbb]" />
                    <input id="confirmPassword" name="confirmPassword" type={showConfirm ? "text" : "password"}
                      placeholder="Repeat your password" value={form.confirmPassword} onChange={handleChange}
                      className={`w-full pl-10 pr-12 py-3 border text-sm font-inter focus:outline-none transition-colors ${errors.confirmPassword ? "border-red-400" : "border-[#ECECEC] focus:border-[#111111]"}`} />
                    <button type="button" onClick={() => setShowConfirm(!showConfirm)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-[#bbb] hover:text-[#111111] transition-colors">
                      {showConfirm ? <EyeOff size={14} /> : <Eye size={14} />}
                    </button>
                  </div>
                  {form.confirmPassword && form.password === form.confirmPassword && (
                    <p className="text-[11px] text-emerald-600 mt-1 font-inter flex items-center gap-1"><Check size={11} /> Passwords match</p>
                  )}
                  {errors.confirmPassword && <p className="text-[11px] text-red-500 mt-1 font-inter">{errors.confirmPassword}</p>}
                </div>

                <div>
                  <div className="flex items-start gap-2.5">
                    <input id="terms" name="terms" type="checkbox" checked={form.terms} onChange={handleChange}
                      className="w-4 h-4 mt-0.5 accent-[#C7A76C] flex-shrink-0" />
                    <label htmlFor="terms" className="text-sm text-[#6B6B6B] font-inter font-light cursor-pointer leading-snug">
                      I agree to the <Link href="#" className="text-[#C7A76C] hover:underline">Terms of Service</Link>{" "}
                      and <Link href="#" className="text-[#C7A76C] hover:underline">Privacy Policy</Link>
                    </label>
                  </div>
                  {errors.terms && <p className="text-[11px] text-red-500 mt-1 font-inter">{errors.terms}</p>}
                </div>

                <button type="submit" disabled={loading}
                  className="w-full py-4 bg-[#111111] text-white text-[11px] tracking-[0.25em] font-inter font-semibold uppercase flex items-center justify-center gap-3 hover:bg-[#C7A76C] transition-colors duration-300 disabled:opacity-60 mt-2">
                  {loading ? "Creating Account…" : <><span>Create Account</span><ArrowRight size={14} /></>}
                </button>
              </form>
            )}

            {!success && (
              <>
                <div className="my-5 flex items-center gap-4">
                  <div className="flex-1 h-px bg-[#ECECEC]" />
                  <span className="text-[11px] text-[#aaa] font-inter">or sign up with</span>
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
                <p className="text-center text-sm text-[#6B6B6B] font-inter mt-5">
                  Already have an account?{" "}
                  <Link href="/sign-in" className="text-[#C7A76C] font-medium hover:underline">Sign in</Link>
                </p>
              </>
            )}
          </motion.div>

          {/* Right — Image */}
          <div className="relative hidden lg:block order-1 lg:order-2">
            <img src="https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=800&q=85"
              alt="Luxury jewellery" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-black/60" />
            <div className="absolute top-10 left-10 right-10">
              <p className="text-[10px] tracking-[0.45em] text-[#C7A76C] font-inter font-semibold uppercase mb-3">Member Benefits</p>
              <h2 className="font-cormorant text-3xl font-light text-white leading-tight mb-8">The Sunrise<br />Inner Circle</h2>
              <div className="space-y-4">
                {["Early access to new collections", "Exclusive member pricing", "Personalised wishlist & order history", "Priority client services", "Private event invitations"].map(benefit => (
                  <div key={benefit} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full border border-[#C7A76C] flex items-center justify-center flex-shrink-0">
                      <Check size={10} className="text-[#C7A76C]" />
                    </div>
                    <span className="text-white/75 text-sm font-inter font-light">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}