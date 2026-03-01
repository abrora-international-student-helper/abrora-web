'use client'

import React, { useState } from 'react'
import Link from 'next/link'

export default function DepartureHub() {
  const [activeTab, setActiveTab] = useState('flights');
  const [activeStep, setActiveStep] = useState(0);

  // FLIGHT PART: UNCHANGED
  const flightDetails = [
    {
      slug: "planning", 
      title: "1. Planning & Booking properly",
      icon: "✈️",
      content: "Research routes via Google Flights, Kayak, or Skyscanner. Book 2–3 months early to avoid expensive last-minute rates.",
      tag: "Strategy"
    },
    {
      slug: "documents", 
      title: "2. Hand Bag Documents",
      icon: "👜",
      content: "You MUST show these at immigration: Passport (6+ months validity), F-1/J-1 Visa, I-20/DS-2019, SEVIS receipt, and Admission letter.",
      tag: "Critical"
    },
    {
      slug: "essentials",
      title: "3. Cabin Bag Essentials",
      icon: "🎒",
      content: "Pack medications, phone, laptop, chargers, power bank, and Type A/B adapters (120V). Carry $100–$300 USD cash.",
      tag: "Packing"
    },
    {
      slug: "immigration",
      title: "4. Landing & Immigration",
      icon: "🛂",
      content: "Arrive 3hrs before departure. At US entry, officers (CBP) check documents, ask about your school/major, and take fingerprints.",
      tag: "Process"
    }
  ];

  // SHOPPING PART: UPDATED WITH YOUR DETAILED CONTENT
  const shoppingDetails = [
    {
      slug: "dorm",
      title: "1. Housing & Dorm Essentials",
      icon: "🏠",
      content: "Bedding (Twin XL), pillows, mattress protector, towels, hangers, and laundry supplies. Check what your housing provides first!",
      tag: "Housing"
    },
    {
      slug: "kitchen",
      title: "2. Kitchen & Food Items",
      icon: "🥘",
      content: "Plates, bowls, utensils, reusable water bottles, and quick meals like instant noodles or granola bars for the first few nights.",
      tag: "Kitchen"
    },
    {
      slug: "academic",
      title: "3. Academic Supplies",
      icon: "💻",
      content: "Notebooks, backpacks, laptop chargers, pens, and calculators. Some items can wait until your first week of classes.",
      tag: "School"
    },
    {
      slug: "health",
      title: "4. Health & Safety",
      icon: "🛡",
      content: "First aid kits, pain relievers, hand sanitizer, and disinfecting wipes. Keep medications in original packaging.",
      tag: "Personal"
    }
  ];

  const customsRules = [
    { type: "Allowed", items: "Documents, personal belongings, prescribed medications, non-perishable snacks, and cash up to $10,000.", color: "text-green-600 bg-green-50 border-green-100" },
    { type: "Prohibited", items: "Fresh fruits, vegetables, meat, plants, seeds, weapons, illegal drugs, large quantities for resale.", color: "text-red-600 bg-red-50 border-red-100" }
  ];

  const currentGrid = activeTab === 'flights' ? flightDetails : shoppingDetails;

  return (
    <div className="min-h-screen relative overflow-hidden bg-[#F9F9F7] text-[#2D312E] py-16 px-6 lg:px-24">
      
      {/* Aesthetic Background Meshes */}
      <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[50%] bg-[#E8F0EE] rounded-full blur-[120px] opacity-80" />
      <div className="absolute top-[10%] right-[-10%] w-[50%] h-[50%] bg-[#E3E9F2] rounded-full blur-[120px] opacity-70" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header */}
        <header className="mb-20">
          <div className="inline-flex items-center gap-4 mb-8">
            <div className="px-4 py-1.5 rounded-full bg-slate-900 text-white text-[10px] font-bold uppercase tracking-[0.2em] shadow-xl">
              🇺🇸 International Student Guide
            </div>
            <div className="flex bg-white/50 backdrop-blur-md p-1 rounded-full border border-white/60">
              <button onClick={() => setActiveTab('flights')} className={`px-6 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all ${activeTab === 'flights' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-400'}`}>Part 1: Flights</button>
              <button onClick={() => setActiveTab('shopping')} className={`px-6 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all ${activeTab === 'shopping' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-400'}`}>Part 2: Shopping</button>
            </div>
          </div>
          <h1 className="text-6xl md:text-8xl font-light tracking-tighter mb-6 leading-[0.9]">
            {activeTab === 'flights' ? 'Landing Guide.' : 'Shopping Guide.'} <br />
            <span className="font-semibold text-slate-900 italic">{activeTab === 'flights' ? 'Step-by-Step.' : 'First Day Essentials.'}</span>
          </h1>
        </header>

        {/* Bento Grid (Logic changes content based on tab, but keeps design same) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
          {currentGrid.map((item, index) => (
            <Link 
              key={index} 
              href={`/shopping/${item.slug}`} 
              className="bg-white/40 backdrop-blur-xl border border-white/60 p-8 rounded-[3rem] hover:shadow-2xl transition-all duration-500 group hover:-translate-y-2 cursor-pointer block h-full"
            >
              <div className="flex justify-between items-start mb-8">
                <div className="text-4xl group-hover:rotate-12 transition-transform duration-500">{item.icon}</div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 bg-white/80 px-3 py-1 rounded-full border border-white">{item.tag}</span>
              </div>
              <h3 className="text-lg font-bold mb-3 text-slate-800 tracking-tight">{item.title}</h3>
              <p className="text-xs text-slate-600 leading-relaxed font-medium mb-4">{item.content}</p>
              <div className="text-[10px] font-bold text-blue-500 uppercase tracking-widest group-hover:translate-x-1 transition-transform">
                Open Details →
              </div>
            </Link>
          ))}
        </div>

        {/* SHOPPING SPECIFIC SECTION: Visible ONLY when Shopping Tab is active */}
        {activeTab === 'shopping' && (
          <div className="space-y-20 mb-24 animate-in fade-in slide-in-from-bottom-4 duration-1000">
            
            {/* Where to Shop Section */}
            <section>
              <h3 className="text-sm font-bold uppercase tracking-[0.3em] text-slate-400 mb-10 underline decoration-blue-500 underline-offset-8">Where to Shop</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { name: 'Walmart / Target', items: 'Dorm Essentials, Clothing, Toiletries' },
                  { name: 'University Bookstore', items: 'Notebooks, Backpacks, Tech' },
                  { name: 'CVS / Walgreens', items: 'Pharmacy, Personal Care, Medicine' },
                  { name: 'Supermarkets', items: 'Food, Drinks, Quick Snacks' }
                ].map((store, i) => (
                  <div key={i} className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
                    <h5 className="font-bold text-slate-800 mb-2">{store.name}</h5>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">{store.items}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Checklist Table */}
            <section className="bg-white/50 backdrop-blur-md rounded-[3rem] border border-white p-10 shadow-sm">
              <h3 className="text-xl font-bold mb-8 italic">Quick First-Day Shopping Checklist</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-slate-200">
                      <th className="py-4 font-bold uppercase tracking-widest text-slate-400">Category</th>
                      <th className="py-4 font-bold uppercase tracking-widest text-slate-400">Must-Have Items</th>
                    </tr>
                  </thead>
                  <tbody className="text-slate-600">
                    <tr className="border-b border-slate-100"><td className="py-4 font-bold">Bedding & Dorm</td><td className="py-4 italic">Sheets, pillow, towels, hangers</td></tr>
                    <tr className="border-b border-slate-100"><td className="py-4 font-bold">Kitchen</td><td className="py-4 italic">Plates, utensils, snacks, water bottle</td></tr>
                    <tr className="border-b border-slate-100"><td className="py-4 font-bold">Personal Care</td><td className="py-4 italic">Toiletries, shampoo, soap, razor</td></tr>
                    <tr className="border-b border-slate-100"><td className="py-4 font-bold">Academic</td><td className="py-4 italic">Notebook, pens, laptop charger</td></tr>
                  </tbody>
                </table>
              </div>
            </section>
          </div>
        )}

        {/* Customs Section: Remains same for both */}
        <div className="mb-24">
          <h3 className="text-sm font-bold uppercase tracking-[0.3em] text-slate-400 mb-10 underline decoration-blue-500 underline-offset-8">Customs & Immigration Rules</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {customsRules.map((rule, idx) => (
              <div key={idx} className={`p-10 rounded-[3rem] border backdrop-blur-md ${rule.color}`}>
                <h4 className="font-bold uppercase tracking-widest text-xs mb-4">{rule.type} Items</h4>
                <p className="text-sm leading-relaxed font-semibold">{rule.items}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Master Checklist: Remains same for both */}
        <section className="bg-slate-900 text-white rounded-[4rem] p-12 md:p-20 shadow-2xl">
          <div className="max-w-3xl">
            <h2 className="text-4xl font-bold mb-8 italic tracking-tighter decoration-blue-500 decoration-4 underline-offset-8">Final Checklist</h2>
            <div className="space-y-4">
              {[
                { title: 'Flight & Arrival', desc: 'Documents ready in hand bag. Arrive 3 hours early.' },
                { title: 'Dorm & Shopping', desc: 'Prioritize bedding and hygiene on Day 1.' },
                { title: 'Academic Setup', desc: 'Get US SIM card and check university orientation schedule.' }
              ].map((step, idx) => (
                <button key={idx} onClick={() => setActiveStep(idx)} className={`w-full text-left p-6 rounded-[2rem] transition-all border ${activeStep === idx ? 'bg-blue-600 border-blue-400 translate-x-2' : 'bg-white/5 border-white/10'}`}>
                  <div className="flex items-center gap-4">
                    <span className="text-[10px] font-bold w-6 h-6 rounded-full bg-slate-800 text-slate-400 flex items-center justify-center">0{idx + 1}</span>
                    <h4 className="font-bold text-sm uppercase tracking-widest">{step.title}</h4>
                  </div>
                  {activeStep === idx && <p className="mt-4 text-xs text-blue-50 leading-relaxed font-medium">{step.desc}</p>}
                </button>
              ))}
            </div>
          </div>
        </section>

      </div>
    </div>
  )
}