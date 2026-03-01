'use client'

import React from 'react'
import Link from 'next/link'

export default function EssentialsDetailPage() {
  return (
    <div className="min-h-screen relative overflow-hidden bg-[#F4F7FA] text-[#2D312E] py-16 px-6 lg:px-24 font-sans">
      
      {/* Aesthetic White & Blue Frost Background */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white via-[#EAF2FA] to-[#F4F7FA] -z-10" />
      <div className="absolute top-[-5%] right-[-5%] w-[600px] h-[600px] bg-blue-200/40 rounded-full blur-[120px] -z-10" />
      <div className="absolute bottom-[0%] left-[-5%] w-[500px] h-[500px] bg-blue-100/60 rounded-full blur-[100px] -z-10" />

      <div className="max-w-5xl mx-auto relative z-10">
        
        {/* Navigation */}
        <Link href="/shopping" className="group inline-flex items-center gap-2 mb-12 text-[10px] font-bold uppercase tracking-[0.2em] text-blue-500 hover:text-blue-800 transition-all bg-white/80 px-5 py-2.5 rounded-full border border-blue-100 shadow-sm">
          <span className="group-hover:-translate-x-1 transition-transform">←</span> Back to Hub
        </Link>

        {/* Hero Header */}
        <header className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">🎒</span>
            <span className="text-[10px] font-bold uppercase tracking-widest text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-100">Packing Part 3</span>
          </div>
          <h1 className="text-6xl md:text-8xl font-bold tracking-tighter mb-8 leading-none bg-gradient-to-r from-slate-900 via-blue-900 to-blue-800 bg-clip-text text-transparent">
            Cabin Bag <br /> Essentials.
          </h1>
          <p className="text-xl text-slate-500 max-w-2xl leading-relaxed font-medium italic border-l-4 border-blue-400 pl-6">
            "Your survival kit for the flight and the first 48 hours. If your checked bags are delayed, this bag keeps you moving."
          </p>
        </header>

        {/* --- MAIN PACKING SECTIONS --- */}
        <div className="space-y-10">
          
          {/* 1. Medications - Critical Focus */}
          <div className="bg-white/80 backdrop-blur-md p-10 rounded-[3rem] border border-white shadow-sm">
            <h3 className="text-2xl font-bold mb-4 flex items-center gap-3 text-slate-800">
              <span className="text-2xl">💊</span> 1. Medications
            </h3>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="text-sm text-slate-600 leading-relaxed">
                <p className="font-bold text-blue-600 mb-2 uppercase tracking-tight italic">Always carry — never check.</p>
                <ul className="space-y-2">
                  <li>✔ Original labeled bottles</li>
                  <li>✔ Doctor's prescription/medical letter</li>
                  <li>✔ 2–4 week supply minimum</li>
                  <li>✔ Basic OTC (Pain relief, allergy meds)</li>
                </ul>
              </div>
              <div className="bg-blue-50 p-6 rounded-3xl border border-blue-100 flex flex-col justify-center">
                <p className="text-[11px] text-blue-800 font-medium italic">
                  <strong>Security Tip:</strong> Medically necessary liquids are generally allowed when declared to TSA. Replacing prescriptions in the US is expensive and difficult!
                </p>
              </div>
            </div>
          </div>

          {/* 2 & 3. Tech Core */}
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-slate-900 text-white p-10 rounded-[3.5rem] shadow-xl relative overflow-hidden group">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-3">
                <span className="text-2xl">📱</span> 2. Phone & 💻 3. Laptop
              </h3>
              <p className="text-slate-400 text-xs mb-4 leading-relaxed font-medium">Your lifeline for navigation, pickup contact, and school check-ins. Never pack electronics in checked bags.</p>
              <div className="space-y-1 text-[10px] font-bold text-blue-400 uppercase tracking-widest">
                <p>• Download Offline Maps</p>
                <p>• Save Important Contacts</p>
                <p>• Enable International Roaming</p>
              </div>
            </div>

            <div className="bg-white/80 backdrop-blur-md p-10 rounded-[3.5rem] border border-white shadow-sm">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-3 text-slate-800">
                <span className="text-2xl">🔌</span> 4. Chargers & 🔋 5. Power Bank
              </h3>
              <p className="text-sm text-slate-500 mb-4">Pack in an easy-access pouch. <strong>Important:</strong> Power banks are NOT allowed in checked luggage—carry-on only!</p>
              <span className="inline-block px-4 py-1.5 bg-blue-100 text-blue-600 rounded-full text-[10px] font-bold uppercase tracking-widest">Airline-Approved Capacity Only</span>
            </div>
          </div>

          {/* 6. Adapters & 10. Cash */}
          <div className="grid md:grid-cols-2 gap-8">
            <div className="p-10 bg-blue-600 text-white rounded-[3.5rem] shadow-xl shadow-blue-100">
              <h3 className="text-xl font-bold mb-4 italic">🔌 6. U.S. Plug Adapters</h3>
              <p className="text-sm text-blue-100 mb-4 leading-relaxed">U.S. uses 120V (Type A / B). Most modern chargers support 110–240V, but check your device labels before travel.</p>
            </div>
            <div className="p-10 bg-white rounded-[3.5rem] border border-blue-100">
              <h3 className="text-xl font-bold mb-4 text-slate-800">💵 10. Cash ($100–$300)</h3>
              <p className="text-sm text-slate-500 leading-relaxed">Necessary for food, taxis, or emergencies if cards fail. Carry small denominations for convenience.</p>
            </div>
          </div>

          {/* 7, 8, 9. Survival Essentials */}
          <div className="bg-white/40 backdrop-blur-md p-10 rounded-[4rem] border border-white">
            <h3 className="text-sm font-black text-blue-600 uppercase text-center mb-10 tracking-[0.3em]">Survival & Comfort</h3>
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div>
                <span className="text-3xl block mb-2">👕</span>
                <h5 className="font-bold text-slate-800 text-sm mb-2">7. Spare Clothes</h5>
                <p className="text-[11px] text-slate-500 italic">Pack 1–2 days of underwear and a jacket in case of luggage delay.</p>
              </div>
              <div>
                <span className="text-3xl block mb-2">💧</span>
                <h5 className="font-bold text-slate-800 text-sm mb-2">8. Water Bottle</h5>
                <p className="text-[11px] text-slate-500 italic">Empty before security. Refill after. Stay hydrated on long flights.</p>
              </div>
              <div>
                <span className="text-3xl block mb-2">🍫</span>
                <h5 className="font-bold text-slate-800 text-sm mb-2">9. Snacks</h5>
                <p className="text-[11px] text-slate-500 italic">Granola bars, nuts, or crackers. Avoid strong smells or spoiling foods.</p>
              </div>
            </div>
          </div>

          {/* 11 & 12. Comfort & Docs */}
          <div className="grid md:grid-cols-2 gap-8">
            <div className="p-10 bg-slate-50 rounded-[3rem]">
              <h4 className="font-bold text-slate-800 mb-4">🧴 11. Personal Comfort</h4>
              <p className="text-[11px] text-slate-500 leading-relaxed font-medium">Optional but helpful: Neck pillow, eye mask, hand sanitizer, travel toothbrush, and lip balm.</p>
            </div>
            <div className="p-10 bg-blue-50 rounded-[3rem] border border-blue-100">
              <h4 className="font-bold text-blue-900 mb-4">📄 12. Document Reminder</h4>
              <p className="text-[11px] text-blue-700 leading-relaxed font-medium">Your document folder MUST stay in your cabin bag. Never separate Passport/I-20 from your carry-on.</p>
            </div>
          </div>
        </div>

        {/* --- PROHIBITED ITEMS & STRATEGY --- */}
        <div className="mt-16 grid md:grid-cols-2 gap-12 border-t border-blue-100 pt-16">
          <div>
            <h3 className="text-2xl font-bold text-red-600 mb-6 italic tracking-tighter uppercase">⚠️ What NOT to pack</h3>
            <ul className="space-y-3 text-[11px] font-bold text-red-800 uppercase tracking-tight">
                <li>❌ Large liquids (over airline limits)</li>
                <li>❌ Sharp objects / Knives</li>
                <li>❌ Flammable items / Lighters</li>
                <li>❌ Heavy unnecessary items</li>
            </ul>
          </div>
          <div>
            <h3 className="text-2xl font-bold text-slate-800 mb-6 italic tracking-tighter uppercase">🧠 Packing Strategy</h3>
            <p className="text-sm text-slate-500 italic font-medium">
                Organize your bag into zones: Documents, Electronics Pouch, Med Kit, and Comfort items. This reduces stress at security checkpoints.
            </p>
          </div>
        </div>

        {/* Master Checklist */}
        <div className="mt-16 p-12 bg-white rounded-[4rem] border border-blue-50 shadow-xl text-center">
          <h3 className="text-2xl font-bold mb-10 text-slate-900">✅ Cabin Bag Checklist</h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6 max-w-5xl mx-auto">
            {['Meds + Rx', 'Phone', 'Laptop', 'Power Bank', 'US Adapter', 'Clothes', 'Water Bottle', 'Snacks', 'Cash', 'Docs'].map((item, idx) => (
              <div key={idx} className="flex flex-col items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-[10px] font-bold">✔</div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tight text-center">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-24 pt-12 border-t border-blue-100 text-center">
          <p className="text-[10px] font-bold text-blue-300 uppercase tracking-[0.6em]">YoursTruely Departure Protocol • 2026</p>
        </footer>
      </div>
    </div>
  )
}