"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, Lock, Check, ShoppingBag, CreditCard, Truck, ChevronDown } from "lucide-react";
import { useAppContext } from "@/lib/context";
import { formatPrice, cn } from "@/lib/utils";

type Step = "shipping" | "billing" | "payment" | "confirmation";
const STEPS: { key: Step; label: string }[] = [
  { key: "shipping", label: "Shipping" },
  { key: "billing", label: "Billing" },
  { key: "payment", label: "Payment" },
];
const countries = ["United States", "United Kingdom", "Canada", "France", "Switzerland", "Germany", "Australia", "Japan"];

export default function CheckoutPage() {
  const { cart } = useAppContext();
  const [step, setStep] = useState<Step>("shipping");
  const [promoCode, setPromoCode] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);
  const [promoError, setPromoError] = useState("");
  const [shipping, setShipping] = useState({ firstName: "", lastName: "", email: "", phone: "", address: "", apartment: "", city: "", state: "", zip: "", country: "United States" });
  const [billingSame, setBillingSame] = useState(true);
  const [payment, setPayment] = useState({ cardNumber: "", cardName: "", expiry: "", cvv: "" });

  const shippingCost = cart.totalPrice > 5000 ? 0 : 45;
  const discount = promoApplied ? Math.round(cart.totalPrice * 0.1) : 0;
  const tax = Math.round((cart.totalPrice - discount) * 0.08);
  const total = cart.totalPrice - discount + tax + shippingCost;
  const stepIndex = STEPS.findIndex(s => s.key === step);

  const handlePromo = () => {
    if (promoCode.toUpperCase() === "SUNRISE10") { setPromoApplied(true); setPromoError(""); }
    else { setPromoError("Invalid promo code"); }
  };

  if (cart.items.length === 0 && step !== "confirmation") {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center">
        <div className="text-center py-20">
          <ShoppingBag size={48} className="text-[#D6D6D6] mx-auto mb-5" />
          <h2 className="font-cormorant text-4xl font-light mb-3">Your bag is empty</h2>
          <p className="text-[#6B6B6B] font-inter text-sm mb-8">Add pieces to your bag before checking out.</p>
          <Link href="/jewellery" className="px-10 py-4 bg-[#111111] text-white text-[11px] tracking-[0.25em] font-inter font-semibold uppercase hover:bg-[#C7A76C] transition-colors duration-300">
            Shop Now
          </Link>
        </div>
      </div>
    );
  }

  const inputClass = (err?: string) =>
    `w-full px-4 py-3.5 border text-sm font-inter focus:outline-none transition-colors ${err ? "border-red-400" : "border-[#ECECEC] focus:border-[#111111]"}`;

  return (
    <div className="pt-20 min-h-screen bg-[#F8F8F8]">
      <div className="max-w-[1440px] mx-auto px-5 sm:px-10 lg:px-20 py-12">
        <div className="flex items-center justify-between mb-10">
          <Link href="/" className="font-cormorant text-xl tracking-[0.2em] text-[#111111]">SUNRISE TREASURES</Link>
          <div className="flex items-center gap-2 text-[11px] font-inter text-[#999]">
            <Lock size={12} className="text-[#C7A76C]" /><span>Secure Checkout</span>
          </div>
        </div>

        {step !== "confirmation" && (
          <div className="flex items-center gap-2 mb-10">
            {STEPS.map((s, i) => (
              <React.Fragment key={s.key}>
                <div className="flex items-center gap-2">
                  <div className={cn("w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-inter font-semibold transition-all duration-300",
                    i < stepIndex ? "bg-[#C7A76C] text-white" : i === stepIndex ? "bg-[#111111] text-white" : "bg-[#ECECEC] text-[#999]")}>
                    {i < stepIndex ? <Check size={12} /> : i + 1}
                  </div>
                  <span className={cn("text-[11px] tracking-[0.1em] font-inter font-semibold uppercase hidden sm:block transition-colors duration-300",
                    i === stepIndex ? "text-[#111111]" : "text-[#999]")}>{s.label}</span>
                </div>
                {i < STEPS.length - 1 && <ChevronRight size={14} className="text-[#D6D6D6]" />}
              </React.Fragment>
            ))}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2">
            <AnimatePresence mode="wait">
              {step === "shipping" && (
                <motion.div key="shipping" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.35 }}
                  className="bg-white p-8 shadow-sm">
                  <div className="flex items-center gap-3 mb-8">
                    <Truck size={18} className="text-[#C7A76C]" />
                    <h2 className="font-cormorant text-2xl font-light">Shipping Information</h2>
                  </div>
                  <div className="grid grid-cols-2 gap-5">
                    {[
                      { name: "firstName", label: "First Name", placeholder: "Isabelle", cols: 1 },
                      { name: "lastName", label: "Last Name", placeholder: "Morin", cols: 1 },
                      { name: "email", label: "Email", placeholder: "you@example.com", cols: 2 },
                      { name: "address", label: "Street Address", placeholder: "123 Main Street", cols: 2 },
                      { name: "city", label: "City", placeholder: "New York", cols: 1 },
                      { name: "state", label: "State", placeholder: "NY", cols: 1 },
                      { name: "zip", label: "ZIP Code", placeholder: "10001", cols: 1 },
                    ].map(f => (
                      <div key={f.name} className={f.cols === 2 ? "col-span-2" : "col-span-1"}>
                        <label className="block text-[10px] tracking-[0.25em] font-inter font-semibold uppercase text-[#111111] mb-2">{f.label} <span className="text-[#C7A76C]">*</span></label>
                        <input name={f.name} placeholder={f.placeholder}
                          value={shipping[f.name as keyof typeof shipping]}
                          onChange={e => setShipping(p => ({ ...p, [e.target.name]: e.target.value }))}
                          className={inputClass()} />
                      </div>
                    ))}
                    <div className="col-span-2">
                      <label className="block text-[10px] tracking-[0.25em] font-inter font-semibold uppercase text-[#111111] mb-2">Country <span className="text-[#C7A76C]">*</span></label>
                      <div className="relative">
                        <select value={shipping.country} onChange={e => setShipping(p => ({ ...p, country: e.target.value }))}
                          className="w-full px-4 py-3.5 border border-[#ECECEC] focus:border-[#111111] text-sm font-inter focus:outline-none appearance-none bg-white">
                          {countries.map(c => <option key={c}>{c}</option>)}
                        </select>
                        <ChevronDown size={14} className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-[#999]" />
                      </div>
                    </div>
                  </div>
                  <div className="mt-8">
                    <p className="text-[10px] tracking-[0.25em] font-inter font-semibold uppercase text-[#111111] mb-4">Shipping Method</p>
                    <div className="space-y-3">
                      {[
                        { label: "Express Shipping", sub: "3–5 business days · Insured", price: shippingCost === 0 ? "Free" : "$45" },
                        { label: "Standard Shipping", sub: "7–10 business days", price: "Free" },
                      ].map((m, i) => (
                        <label key={m.label} className={cn("flex items-center justify-between p-4 border cursor-pointer transition-colors duration-200",
                          i === 0 ? "border-[#111111]" : "border-[#ECECEC] hover:border-[#999]")}>
                          <div className="flex items-center gap-3">
                            <input type="radio" name="shippingMethod" defaultChecked={i === 0} className="accent-[#C7A76C]" />
                            <div>
                              <p className="text-sm font-inter font-semibold text-[#111111]">{m.label}</p>
                              <p className="text-[11px] text-[#6B6B6B] font-inter">{m.sub}</p>
                            </div>
                          </div>
                          <span className="font-cormorant text-lg font-light">{m.price}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  <button onClick={() => setStep("billing")}
                    className="mt-8 w-full py-4 bg-[#111111] text-white text-[11px] tracking-[0.25em] font-inter font-semibold uppercase flex items-center justify-center gap-3 hover:bg-[#C7A76C] transition-colors duration-300">
                    Continue to Billing <ChevronRight size={14} />
                  </button>
                </motion.div>
              )}

              {step === "billing" && (
                <motion.div key="billing" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.35 }}
                  className="bg-white p-8 shadow-sm">
                  <h2 className="font-cormorant text-2xl font-light mb-6">Billing Information</h2>
                  <label className="flex items-center gap-2.5 mb-6 cursor-pointer">
                    <input type="checkbox" checked={billingSame} onChange={e => setBillingSame(e.target.checked)} className="w-4 h-4 accent-[#C7A76C]" />
                    <span className="text-sm font-inter text-[#6B6B6B]">Same as shipping address</span>
                  </label>
                  {!billingSame && (
                    <div className="grid grid-cols-2 gap-5">
                      {[
                        { name: "billingFirst", label: "First Name", cols: 1 },
                        { name: "billingLast", label: "Last Name", cols: 1 },
                        { name: "billingAddr", label: "Street Address", cols: 2 },
                        { name: "billingCity", label: "City", cols: 1 },
                        { name: "billingZip", label: "ZIP Code", cols: 1 },
                      ].map(f => (
                        <div key={f.name} className={f.cols === 2 ? "col-span-2" : "col-span-1"}>
                          <label className="block text-[10px] tracking-[0.25em] font-inter font-semibold uppercase text-[#111111] mb-2">{f.label}</label>
                          <input className={inputClass()} placeholder="" />
                        </div>
                      ))}
                    </div>
                  )}
                  <div className="flex gap-4 mt-8">
                    <button onClick={() => setStep("shipping")}
                      className="px-8 py-4 border border-[#111111] text-[11px] tracking-[0.2em] font-inter font-semibold uppercase hover:bg-[#111111] hover:text-white transition-all duration-300">
                      Back
                    </button>
                    <button onClick={() => setStep("payment")}
                      className="flex-1 py-4 bg-[#111111] text-white text-[11px] tracking-[0.25em] font-inter font-semibold uppercase flex items-center justify-center gap-3 hover:bg-[#C7A76C] transition-colors duration-300">
                      Continue to Payment <ChevronRight size={14} />
                    </button>
                  </div>
                </motion.div>
              )}

              {step === "payment" && (
                <motion.div key="payment" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.35 }}
                  className="bg-white p-8 shadow-sm">
                  <div className="flex items-center gap-3 mb-8">
                    <CreditCard size={18} className="text-[#C7A76C]" />
                    <h2 className="font-cormorant text-2xl font-light">Payment</h2>
                  </div>
                  <div className="flex items-center gap-2 mb-6 p-3 bg-[#F8F8F8] border border-[#ECECEC]">
                    <Lock size={13} className="text-[#C7A76C]" />
                    <span className="text-[11px] font-inter text-[#6B6B6B]">Your payment information is encrypted and secure.</span>
                  </div>
                  <div className="space-y-5">
                    {[
                      { name: "cardNumber", label: "Card Number", placeholder: "0000 0000 0000 0000" },
                      { name: "cardName", label: "Name on Card", placeholder: "ISABELLE MORIN" },
                    ].map(f => (
                      <div key={f.name}>
                        <label className="block text-[10px] tracking-[0.25em] font-inter font-semibold uppercase text-[#111111] mb-2">{f.label} <span className="text-[#C7A76C]">*</span></label>
                        <input name={f.name} placeholder={f.placeholder}
                          value={payment[f.name as keyof typeof payment]}
                          onChange={e => setPayment(p => ({ ...p, [e.target.name]: e.target.value }))}
                          className={inputClass()} />
                      </div>
                    ))}
                    <div className="grid grid-cols-2 gap-5">
                      {[
                        { name: "expiry", label: "Expiry", placeholder: "MM / YY" },
                        { name: "cvv", label: "CVV", placeholder: "000" },
                      ].map(f => (
                        <div key={f.name}>
                          <label className="block text-[10px] tracking-[0.25em] font-inter font-semibold uppercase text-[#111111] mb-2">{f.label} <span className="text-[#C7A76C]">*</span></label>
                          <input name={f.name} placeholder={f.placeholder}
                            value={payment[f.name as keyof typeof payment]}
                            onChange={e => setPayment(p => ({ ...p, [e.target.name]: e.target.value }))}
                            className={inputClass()} />
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="flex gap-4 mt-8">
                    <button onClick={() => setStep("billing")}
                      className="px-8 py-4 border border-[#111111] text-[11px] tracking-[0.2em] font-inter font-semibold uppercase hover:bg-[#111111] hover:text-white transition-all duration-300">
                      Back
                    </button>
                    <button onClick={() => setStep("confirmation")}
                      className="flex-1 py-4 bg-[#C7A76C] text-white text-[11px] tracking-[0.25em] font-inter font-semibold uppercase flex items-center justify-center gap-3 hover:bg-[#a8893a] transition-colors duration-300">
                      <Lock size={14} /> Place Order · {formatPrice(total)}
                    </button>
                  </div>
                </motion.div>
              )}

              {step === "confirmation" && (
                <motion.div key="confirmation" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}
                  className="bg-white p-10 shadow-sm text-center">
                  <div className="w-20 h-20 bg-[#C7A76C] rounded-full flex items-center justify-center mx-auto mb-6">
                    <Check size={36} className="text-white" />
                  </div>
                  <p className="text-[10px] tracking-[0.4em] text-[#C7A76C] font-inter font-semibold uppercase mb-3">Order Confirmed</p>
                  <h2 className="font-cormorant text-4xl font-light mb-4">Thank you for your order</h2>
                  <p className="text-[#6B6B6B] font-inter font-light text-sm mb-3 max-w-sm mx-auto leading-relaxed">
                    Your order has been received and is being prepared with care. You&apos;ll receive a confirmation email shortly.
                  </p>
                  <p className="text-[11px] tracking-[0.1em] font-inter font-semibold text-[#111111] mb-10">
                    Order #SR-{Math.floor(Math.random() * 90000) + 10000}
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link href="/jewellery" className="px-10 py-4 bg-[#111111] text-white text-[11px] tracking-[0.25em] font-inter font-semibold uppercase hover:bg-[#C7A76C] transition-colors duration-300">
                      Continue Shopping
                    </Link>
                    <Link href="/" className="px-10 py-4 border border-[#111111] text-[11px] tracking-[0.2em] font-inter font-semibold uppercase hover:bg-[#111111] hover:text-white transition-all duration-300">
                      Return Home
                    </Link>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white p-8 shadow-sm sticky top-28">
              <h3 className="font-cormorant text-2xl font-light mb-6 pb-4 border-b border-[#ECECEC]">Order Summary</h3>
              <div className="space-y-4 mb-6">
                {cart.items.map(item => (
                  <div key={item.product.id} className="flex gap-3">
                    <div className="w-16 h-16 flex-shrink-0 bg-[#F8F8F8] overflow-hidden">
                      <img src={item.product.images?.[0] ?? item.product.image ?? ""} alt={item.product.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[11px] tracking-[0.1em] text-[#C7A76C] font-inter font-semibold uppercase mb-0.5">{item.product.category}</p>
                      <p className="text-sm font-cormorant font-light leading-snug truncate">{item.product.name}</p>
                      <p className="text-xs text-[#6B6B6B] font-inter">Qty: {item.quantity}</p>
                    </div>
                    <span className="font-cormorant text-base font-light flex-shrink-0">{formatPrice(item.product.price * item.quantity)}</span>
                  </div>
                ))}
              </div>

              <div className="border-t border-[#ECECEC] pt-5 mb-5">
                <div className="flex gap-2">
                  <input type="text" placeholder="Promo code" value={promoCode}
                    onChange={e => setPromoCode(e.target.value)}
                    className="flex-1 px-3 py-2.5 border border-[#ECECEC] text-sm font-inter focus:outline-none focus:border-[#111111] transition-colors" />
                  <button onClick={handlePromo}
                    className="px-4 py-2.5 bg-[#111111] text-white text-[10px] tracking-[0.1em] font-inter font-semibold uppercase hover:bg-[#C7A76C] transition-colors duration-300">
                    Apply
                  </button>
                </div>
                {promoApplied && <p className="text-[11px] text-emerald-600 mt-1.5 font-inter flex items-center gap-1"><Check size={11} /> 10% discount applied</p>}
                {promoError && <p className="text-[11px] text-red-500 mt-1.5 font-inter">{promoError}</p>}
              </div>

              <div className="space-y-3 border-t border-[#ECECEC] pt-5">
                <div className="flex justify-between text-sm font-inter">
                  <span className="text-[#6B6B6B]">Subtotal</span><span>{formatPrice(cart.totalPrice)}</span>
                </div>
                {promoApplied && (
                  <div className="flex justify-between text-sm font-inter text-emerald-600">
                    <span>Discount (10%)</span><span>–{formatPrice(discount)}</span>
                  </div>
                )}
                <div className="flex justify-between text-sm font-inter">
                  <span className="text-[#6B6B6B]">Shipping</span>
                  <span>{shippingCost === 0 ? "Free" : formatPrice(shippingCost)}</span>
                </div>
                <div className="flex justify-between text-sm font-inter">
                  <span className="text-[#6B6B6B]">Estimated Tax</span><span>{formatPrice(tax)}</span>
                </div>
                <div className="flex justify-between pt-3 border-t border-[#ECECEC]">
                  <span className="font-inter font-semibold text-[#111111]">Total</span>
                  <span className="font-cormorant text-2xl font-light">{formatPrice(total)}</span>
                </div>
              </div>

              <div className="mt-6 pt-5 border-t border-[#ECECEC] space-y-2">
                {["Free insured express shipping", "30-day returns", "Lifetime warranty included"].map(t => (
                  <div key={t} className="flex items-center gap-2">
                    <Check size={12} className="text-[#C7A76C] flex-shrink-0" />
                    <span className="text-[11px] text-[#6B6B6B] font-inter">{t}</span>
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