"use client";

import React, { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { MapPin, Phone, Mail, ChevronDown, CheckCircle, Send } from "lucide-react";
import NewsletterSection from "@/components/shared/NewsletterSection";
import SectionTitle from "@/components/shared/SectionTitle";

interface FormData {
  firstName: string; lastName: string; email: string;
  phone: string; subject: string; message: string;
}

const SUBJECTS = ["General Enquiry", "Product Question", "Book an Appointment", "Custom Order", "Returns & Exchanges", "Press Enquiry"];

const FAQ_ITEMS = [
  { q: "Do you offer custom or bespoke pieces?", a: "Yes. Our bespoke service allows you to create a completely original piece with our master goldsmiths. Book a consultation to begin." },
  { q: "How long does shipping take?", a: "All orders ship via insured express courier and arrive within 3–5 business days internationally. Signature required on delivery." },
  { q: "What is your returns policy?", a: "We accept returns within 30 days of delivery for unworn items in original condition. Bespoke and engraved pieces are non-returnable." },
  { q: "Can I get my ring resized?", a: "Yes. We offer a complimentary resizing service within 60 days of purchase. Please contact us to arrange." },
  { q: "Are your diamonds certified?", a: "All diamonds above 0.3ct are GIA certified. Certification documents are included with every purchase." },
  { q: "Do you offer gift packaging?", a: "Every Sunrise Treasures piece ships in our signature embossed jewellery box with tissue, ribbon, and our wax seal — at no extra cost." },
];

function validate(data: FormData) {
  const errors: Record<string, string> = {};
  if (!data.firstName.trim()) errors.firstName = "First name is required";
  if (!data.lastName.trim()) errors.lastName = "Last name is required";
  if (!data.email.trim()) errors.email = "Email is required";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) errors.email = "Please enter a valid email";
  if (!data.subject) errors.subject = "Please select a subject";
  if (!data.message.trim()) errors.message = "Message is required";
  else if (data.message.trim().length < 20) errors.message = "Please provide more detail (min 20 characters)";
  return errors;
}

export default function ContactPage() {
  const [form, setForm] = useState<FormData>({ firstName: "", lastName: "", email: "", phone: "", subject: "", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const formInView = useInView(formRef, { once: true, margin: "-80px" });
  const faqRef = useRef<HTMLDivElement>(null);
  const faqInView = useInView(faqRef, { once: true, margin: "-80px" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
    if (errors[e.target.name]) setErrors(prev => ({ ...prev, [e.target.name]: "" }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate(form);
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setSubmitted(true);
  };

  return (
    <div className="pt-20 min-h-screen">
      {/* Hero */}
      <div className="relative h-[360px] md:h-[440px] flex items-end overflow-hidden">
        <img src="https://images.unsplash.com/photo-1586878341523-7f4e7b66bce7?w=1600&q=85"
          alt="Contact" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        <div className="relative z-10 max-w-[1440px] mx-auto px-5 sm:px-10 lg:px-20 pb-14 w-full">
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}
            className="text-[10px] tracking-[0.45em] text-[#C7A76C] font-inter font-semibold uppercase mb-3">
            We&apos;d love to hear from you
          </motion.p>
          <motion.h1 initial={{ opacity: 0, y: 36 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.1 }}
            className="font-cormorant font-light text-white text-5xl md:text-6xl leading-[0.9]">
            Get in Touch
          </motion.h1>
        </div>
      </div>

      {/* Contact Cards */}
      <div className="max-w-[1440px] mx-auto px-5 sm:px-10 lg:px-20 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          {[
            { icon: MapPin, title: "Visit Us", lines: ["12 Rue du Rhône, Geneva", "Place Vendôme, Paris", "By appointment only"] },
            { icon: Phone, title: "Call Us", lines: ["+41 22 000 0000", "+33 1 000 00000", "Mon–Fri, 9am–6pm CET"] },
            { icon: Mail, title: "Email Us", lines: ["hello@sunrisetreasures.com", "press@sunrisetreasures.com", "Response within 24 hours"] },
          ].map((card, i) => {
            const Icon = card.icon;
            return (
              <motion.div key={card.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.7, delay: i * 0.1 }}
                className="border border-[#ECECEC] p-8 hover:border-[#C7A76C] transition-colors duration-400 group">
                <div className="w-12 h-12 border border-[#C7A76C]/30 group-hover:border-[#C7A76C] flex items-center justify-center mb-5 transition-colors duration-400">
                  <Icon size={20} className="text-[#C7A76C]" />
                </div>
                <h3 className="font-cormorant text-xl font-light mb-4">{card.title}</h3>
                {card.lines.map((line, j) => (
                  <p key={j} className={`text-sm font-inter ${j === card.lines.length - 1 ? "text-[#C7A76C] font-medium text-[11px] tracking-[0.1em] mt-3" : "text-[#6B6B6B] font-light"}`}>
                    {line}
                  </p>
                ))}
              </motion.div>
            );
          })}
        </div>

        {/* Form + Info */}
        <div ref={formRef} className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-20">
          <div className="lg:col-span-2">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={formInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }}>
              <p className="text-[10px] tracking-[0.4em] text-[#C7A76C] font-inter font-semibold uppercase mb-3">Send a Message</p>
              <h2 className="font-cormorant text-4xl font-light mb-8">How can we help?</h2>

              {submitted ? (
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="py-16 text-center">
                  <CheckCircle size={48} className="text-[#C7A76C] mx-auto mb-5" />
                  <h3 className="font-cormorant text-3xl font-light mb-3">Message Received</h3>
                  <p className="text-[#6B6B6B] font-inter font-light text-sm max-w-sm mx-auto">
                    Thank you for reaching out. A member of our team will be in touch within 24 hours.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {[
                      { name: "firstName", label: "First Name", placeholder: "Isabelle" },
                      { name: "lastName", label: "Last Name", placeholder: "Morin" },
                    ].map(f => (
                      <div key={f.name}>
                        <label className="block text-[10px] tracking-[0.25em] font-inter font-semibold uppercase text-[#111111] mb-2">
                          {f.label} <span className="text-[#C7A76C]">*</span>
                        </label>
                        <input name={f.name} type="text" placeholder={f.placeholder}
                          value={form[f.name as keyof FormData]} onChange={handleChange}
                          className={`w-full px-4 py-3.5 border text-sm font-inter focus:outline-none transition-colors ${errors[f.name] ? "border-red-400" : "border-[#ECECEC] focus:border-[#111111]"}`} />
                        {errors[f.name] && <p className="text-[11px] text-red-500 mt-1 font-inter">{errors[f.name]}</p>}
                      </div>
                    ))}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-[10px] tracking-[0.25em] font-inter font-semibold uppercase text-[#111111] mb-2">Email <span className="text-[#C7A76C]">*</span></label>
                      <input name="email" type="email" placeholder="isabelle@example.com"
                        value={form.email} onChange={handleChange}
                        className={`w-full px-4 py-3.5 border text-sm font-inter focus:outline-none transition-colors ${errors.email ? "border-red-400" : "border-[#ECECEC] focus:border-[#111111]"}`} />
                      {errors.email && <p className="text-[11px] text-red-500 mt-1 font-inter">{errors.email}</p>}
                    </div>
                    <div>
                      <label className="block text-[10px] tracking-[0.25em] font-inter font-semibold uppercase text-[#111111] mb-2">Phone</label>
                      <input name="phone" type="tel" placeholder="+1 000 000 0000"
                        value={form.phone} onChange={handleChange}
                        className="w-full px-4 py-3.5 border border-[#ECECEC] focus:border-[#111111] text-sm font-inter focus:outline-none transition-colors" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] tracking-[0.25em] font-inter font-semibold uppercase text-[#111111] mb-2">Subject <span className="text-[#C7A76C]">*</span></label>
                    <div className="relative">
                      <select name="subject" value={form.subject} onChange={handleChange}
                        className={`w-full px-4 py-3.5 border text-sm font-inter focus:outline-none appearance-none bg-white transition-colors ${errors.subject ? "border-red-400" : "border-[#ECECEC] focus:border-[#111111]"}`}>
                        <option value="">Select a subject</option>
                        {SUBJECTS.map(s => <option key={s} value={s}>{s}</option>)}
                      </select>
                      <ChevronDown size={14} className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-[#6B6B6B]" />
                    </div>
                    {errors.subject && <p className="text-[11px] text-red-500 mt-1 font-inter">{errors.subject}</p>}
                  </div>

                  <div>
                    <label className="block text-[10px] tracking-[0.25em] font-inter font-semibold uppercase text-[#111111] mb-2">Message <span className="text-[#C7A76C]">*</span></label>
                    <textarea name="message" rows={6} placeholder="Tell us how we can help…"
                      value={form.message} onChange={handleChange}
                      className={`w-full px-4 py-3.5 border text-sm font-inter focus:outline-none resize-none transition-colors ${errors.message ? "border-red-400" : "border-[#ECECEC] focus:border-[#111111]"}`} />
                    {errors.message && <p className="text-[11px] text-red-500 mt-1 font-inter">{errors.message}</p>}
                  </div>

                  <button type="submit"
                    className="flex items-center gap-3 px-10 py-4 bg-[#111111] text-white text-[11px] tracking-[0.25em] font-inter font-semibold uppercase hover:bg-[#C7A76C] transition-colors duration-300">
                    <Send size={14} /> Send Message
                  </button>
                </form>
              )}
            </motion.div>
          </div>

          {/* Hours + Map */}
          <motion.div initial={{ opacity: 0, y: 30 }} animate={formInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }} className="space-y-8">
            <div>
              <p className="text-[10px] tracking-[0.3em] font-inter font-semibold uppercase text-[#C7A76C] mb-4">Business Hours</p>
              <div className="space-y-2">
                {[
                  { day: "Monday – Friday", hours: "9:00am – 6:00pm CET" },
                  { day: "Saturday", hours: "10:00am – 4:00pm CET" },
                  { day: "Sunday", hours: "Closed" },
                ].map(h => (
                  <div key={h.day} className="flex justify-between text-sm font-inter">
                    <span className="text-[#6B6B6B] font-light">{h.day}</span>
                    <span className="text-[#111111] font-medium">{h.hours}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <p className="text-[10px] tracking-[0.3em] font-inter font-semibold uppercase text-[#C7A76C] mb-4">Geneva Atelier</p>
              <div className="bg-[#F8F8F8] h-48 flex items-center justify-center">
                <div className="text-center">
                  <MapPin size={24} className="text-[#C7A76C] mx-auto mb-2" />
                  <p className="text-sm font-inter text-[#6B6B6B]">12 Rue du Rhône</p>
                  <p className="text-sm font-inter text-[#6B6B6B]">Geneva, Switzerland</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* FAQ */}
      <section ref={faqRef} className="py-20 bg-[#F8F8F8]">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-10 lg:px-20">
          <SectionTitle eyebrow="Questions" title="Frequently Asked" className="mb-12" />
          <div className="max-w-3xl mx-auto divide-y divide-[#ECECEC]">
            {FAQ_ITEMS.map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={faqInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.07 }}>
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between py-5 text-left">
                  <span className="text-sm font-inter font-semibold text-[#111111] pr-8">{item.q}</span>
                  <ChevronDown size={16} className={`text-[#6B6B6B] flex-shrink-0 transition-transform duration-200 ${openFaq === i ? "rotate-180" : ""}`} />
                </button>
                <motion.div initial={false}
                  animate={{ height: openFaq === i ? "auto" : 0, opacity: openFaq === i ? 1 : 0 }}
                  transition={{ duration: 0.3 }} className="overflow-hidden">
                  <p className="pb-5 text-sm text-[#6B6B6B] font-inter font-light leading-relaxed">{item.a}</p>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <NewsletterSection />
    </div>
  );
}