"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { User, Package, Heart, Settings, LogOut, ChevronRight } from "lucide-react";
import { products } from "@/data/products";
import { formatPrice } from "@/lib/utils";

const TABS = [
  { key: "profile", label: "Profile", icon: User },
  { key: "orders", label: "Orders", icon: Package },
  { key: "wishlist", label: "Wishlist", icon: Heart },
  { key: "settings", label: "Settings", icon: Settings },
];

const MOCK_ORDERS = [
  { id: "SR-82741", date: "June 12, 2024", status: "Delivered", total: 4850, item: products[0] },
  { id: "SR-67392", date: "March 3, 2024", status: "Delivered", total: 9600, item: products[9] },
];

export default function AccountPage() {
  const [activeTab, setActiveTab] = useState("profile");

  return (
    <div className="pt-20 min-h-screen bg-[#F8F8F8]">
      <div className="max-w-[1440px] mx-auto px-5 sm:px-10 lg:px-20 py-14">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="mb-10">
          <p className="text-[10px] tracking-[0.4em] text-[#C7A76C] font-inter font-semibold uppercase mb-2">My Account</p>
          <h1 className="font-cormorant text-5xl font-light">Welcome, Isabelle</h1>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white shadow-sm">
              <div className="p-8 border-b border-[#ECECEC] text-center">
                <div className="w-16 h-16 rounded-full bg-[#C7A76C]/20 flex items-center justify-center mx-auto mb-3">
                  <User size={24} className="text-[#C7A76C]" />
                </div>
                <p className="font-cormorant text-xl font-light">Isabelle Morin</p>
                <p className="text-[11px] text-[#6B6B6B] font-inter mt-0.5">isabelle@example.com</p>
                <span className="inline-block mt-2 text-[9px] tracking-[0.2em] font-inter font-semibold uppercase text-[#C7A76C] border border-[#C7A76C]/30 px-2.5 py-1">
                  Inner Circle Member
                </span>
              </div>
              <nav className="py-2">
                {TABS.map(tab => {
                  const Icon = tab.icon;
                  return (
                    <button key={tab.key} onClick={() => setActiveTab(tab.key)}
                      className={`w-full flex items-center gap-3 px-6 py-3.5 text-sm font-inter transition-colors duration-200 ${activeTab === tab.key ? "text-[#C7A76C] bg-[#C7A76C]/5 border-r-2 border-[#C7A76C]" : "text-[#6B6B6B] hover:text-[#111111]"}`}>
                      <Icon size={16} />
                      <span>{tab.label}</span>
                      <ChevronRight size={14} className="ml-auto opacity-40" />
                    </button>
                  );
                })}
                <button className="w-full flex items-center gap-3 px-6 py-3.5 text-sm font-inter text-[#6B6B6B] hover:text-red-500 transition-colors duration-200 border-t border-[#ECECEC] mt-2">
                  <LogOut size={16} /><span>Sign Out</span>
                </button>
              </nav>
            </div>
          </div>

          {/* Content */}
          <div className="lg:col-span-3">
            {activeTab === "profile" && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="bg-white shadow-sm p-8">
                <h2 className="font-cormorant text-3xl font-light mb-8">Personal Information</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-8">
                  {[
                    { label: "First Name", value: "Isabelle" },
                    { label: "Last Name", value: "Morin" },
                    { label: "Email", value: "isabelle@example.com" },
                    { label: "Phone", value: "+1 212 000 0000" },
                  ].map(f => (
                    <div key={f.label}>
                      <label className="block text-[10px] tracking-[0.25em] font-inter font-semibold uppercase text-[#111111] mb-2">{f.label}</label>
                      <input defaultValue={f.value} className="w-full px-4 py-3.5 border border-[#ECECEC] focus:border-[#111111] text-sm font-inter focus:outline-none transition-colors" />
                    </div>
                  ))}
                </div>
                <button className="px-8 py-3.5 bg-[#111111] text-white text-[11px] tracking-[0.2em] font-inter font-semibold uppercase hover:bg-[#C7A76C] transition-colors duration-300">
                  Save Changes
                </button>
              </motion.div>
            )}

            {activeTab === "orders" && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="bg-white shadow-sm p-8">
                <h2 className="font-cormorant text-3xl font-light mb-8">Order History</h2>
                <div className="space-y-6">
                  {MOCK_ORDERS.map(order => (
                    <div key={order.id} className="border border-[#ECECEC] p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <p className="text-[10px] tracking-[0.2em] text-[#C7A76C] font-inter font-semibold uppercase mb-1">{order.id}</p>
                          <p className="text-sm text-[#6B6B6B] font-inter">{order.date}</p>
                        </div>
                        <div className="text-right">
                          <span className="inline-block text-[9px] tracking-[0.15em] font-inter font-semibold uppercase bg-emerald-100 text-emerald-700 px-2.5 py-1">{order.status}</span>
                          <p className="font-cormorant text-xl font-light mt-1">{formatPrice(order.total)}</p>
                        </div>
                      </div>
                      <div className="flex gap-3">
                        <div className="w-14 h-14 bg-[#F8F8F8] overflow-hidden flex-shrink-0">
                          <img src={order.item.images?.[0] ?? order.item.image ?? ""} alt={order.item.name} className="w-full h-full object-cover" />
                        </div>
                        <div>
                          <p className="text-sm font-cormorant font-light">{order.item.name}</p>
                          <p className="text-[11px] text-[#6B6B6B] font-inter">{order.item.material}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === "wishlist" && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="bg-white shadow-sm p-8">
                <h2 className="font-cormorant text-3xl font-light mb-8">Saved Pieces</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                  {products.slice(0, 3).map(p => (
                    <Link key={p.id} href={`/products/${p.slug}`} className="group">
                      <div className="overflow-hidden bg-[#F8F8F8] aspect-square mb-3">
                        <img src={p.images?.[0] ?? p.image ?? ""} alt={p.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.05]" />
                      </div>
                      <p className="font-cormorant text-base font-light group-hover:text-[#C7A76C] transition-colors leading-snug">{p.name}</p>
                      <p className="font-cormorant text-base font-light text-[#6B6B6B]">{formatPrice(p.price)}</p>
                    </Link>
                  ))}
                </div>
                <Link href="/wishlist" className="mt-8 inline-block text-[11px] tracking-[0.2em] font-inter font-semibold uppercase text-[#C7A76C] hover:underline">
                  View Full Wishlist →
                </Link>
              </motion.div>
            )}

            {activeTab === "settings" && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="bg-white shadow-sm p-8">
                <h2 className="font-cormorant text-3xl font-light mb-8">Account Settings</h2>
                <div className="space-y-8">
                  <div>
                    <h3 className="text-[10px] tracking-[0.3em] font-inter font-semibold uppercase text-[#C7A76C] mb-5">Change Password</h3>
                    <div className="space-y-4 max-w-sm">
                      {["Current Password", "New Password", "Confirm New Password"].map(label => (
                        <div key={label}>
                          <label className="block text-[10px] tracking-[0.25em] font-inter font-semibold uppercase text-[#111111] mb-2">{label}</label>
                          <input type="password" placeholder="••••••••"
                            className="w-full px-4 py-3.5 border border-[#ECECEC] focus:border-[#111111] text-sm font-inter focus:outline-none transition-colors" />
                        </div>
                      ))}
                      <button className="px-8 py-3.5 bg-[#111111] text-white text-[11px] tracking-[0.2em] font-inter font-semibold uppercase hover:bg-[#C7A76C] transition-colors duration-300">
                        Update Password
                      </button>
                    </div>
                  </div>
                  <div className="pt-8 border-t border-[#ECECEC]">
                    <h3 className="text-[10px] tracking-[0.3em] font-inter font-semibold uppercase text-[#C7A76C] mb-5">Notifications</h3>
                    {["New arrivals & collections", "Exclusive member offers", "Order updates", "Event invitations"].map(pref => (
                      <div key={pref} className="flex items-center justify-between py-3 border-b border-[#F8F8F8]">
                        <span className="text-sm font-inter text-[#6B6B6B]">{pref}</span>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" defaultChecked className="sr-only peer" />
                          <div className="w-10 h-5 bg-[#ECECEC] rounded-full peer peer-checked:bg-[#C7A76C] transition-colors after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:after:translate-x-5" />
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}