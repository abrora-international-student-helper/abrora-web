'use client'

import React, { useState } from 'react'
import Navbar from "../components/Nav";
import Footer from "../components/common/footer";

export default function CarGuidePage() {
  const [activeStep, setActiveStep] = useState<string | null>(null);

  const categories = [
    { id: "license", title: "Driver's License", icon: "🪪", desc: "Permit to road test process.", bg: "bg-blue-50/50" },
    { id: "budget", title: "Budget & Costs", icon: "💸", desc: "Insurance and hidden fees.", bg: "bg-orange-50/50" },
    { id: "buying", title: "Buying Tips", icon: "🚗", desc: "Finding reliable used cars.", bg: "bg-indigo-50/50" },
    { id: "insurance", title: "Insurance", icon: "🛡️", desc: "Getting quotes as a student.", bg: "bg-emerald-50/50" },
  ];

  return (
    <div className="min-h-screen relative overflow-hidden bg-[#F9F9F7] text-[#2D312E] font-sans">
      <Navbar />
      
      {/* Mesh Gradient Background Elements - Matching Wellness UI */}
      <div className="absolute top-[-5%] left-[-10%] w-[60%] h-[40%] bg-[#E8F0EE] rounded-full blur-[120px] opacity-70" />
      <div className="absolute bottom-[5%] right-[-5%] w-[45%] h-[50%] bg-[#E3E9F2] rounded-full blur-[100px] opacity-60" />

      <div className="max-w-7xl mx-auto relative z-10 py-12 px-6 lg:px-24">
        
        {/* Hero Section */}
        <header className="mb-12 text-center md:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100/50 border border-blue-200 text-blue-800 text-xs font-bold uppercase tracking-widest mb-6 backdrop-blur-md">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            Freedom on wheels
          </div>
          <h1 className="text-5xl md:text-6xl font-light tracking-tight mb-4 leading-tight text-gray-900">
            Car buying designed for <br />
            <span className="font-semibold text-blue-900 italic text-4xl md:text-6xl">your global journey.</span>
          </h1>
          <p className="text-lg text-gray-500 max-w-2xl leading-relaxed">
            Navigating the US car market is a complex milestone. From your first permit to signing the title, Abrora is your co-pilot.
          </p>
        </header>

        {/* 1. Quick Action Banner - Matching Wellness Crisis Style */}
        <div className="mb-12 p-8 bg-blue-50/40 border border-blue-100 rounded-[2.5rem] backdrop-blur-md flex flex-col md:flex-row items-center justify-between gap-8 shadow-sm">
          <div>
            <h2 className="text-xl font-bold text-blue-800 flex items-center gap-2 mb-2">
              🚗 Need a car immediately?
            </h2>
            <p className="text-blue-700/70 text-sm max-w-md italic">Compare rental options vs. buying costs before making a commitment.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <button className="bg-blue-600 text-white px-8 py-3.5 rounded-full font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-200/50">
              Buy vs Rent Guide
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Content Area */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* 3. Category Grid - Matching Fast Relief Tools Style */}
            <section className="bg-white/60 backdrop-blur-xl border border-white/80 rounded-[2.5rem] p-8 shadow-sm">
              <h3 className="text-2xl font-semibold mb-6 flex items-center gap-2">
                ⚡ Step-by-Step Guides
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {categories.map((cat) => (
                    <button 
                        key={cat.id}
                        onClick={() => setActiveStep(cat.id)}
                        className={`p-6 ${cat.bg} rounded-2xl text-left hover:scale-[1.02] transition-all group border border-transparent hover:border-white`}
                    >
                        <span className="block text-3xl mb-3">{cat.icon}</span>
                        <p className="font-bold text-gray-800">{cat.title}</p>
                        <p className="text-xs text-gray-500 mt-1">{cat.desc}</p>
                    </button>
                ))}
              </div>
            </section>

            {/* 2. Normalizing Section - Matching Emerald Box Style */}
            <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-[#1e293b] text-white rounded-[2.5rem] p-8 shadow-xl">
                <h3 className="text-xl font-bold mb-6 tracking-tight">The Legal Essentials</h3>
                <ul className="space-y-4 text-slate-100/80 text-sm">
                  <li className="flex items-start gap-3">
                    <span className="text-blue-400">●</span>
                    <p><strong>The SSA Letter:</strong> Ineligibility letters are required for the DMV if you lack an SSN.</p>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-blue-400">●</span>
                    <p><strong>Title Transfer:</strong> Never pay cash until the physical title is in your hand.</p>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-blue-400">●</span>
                    <p><strong>Registration:</strong> You have 7-30 days to register your car at the DMV after purchase.</p>
                  </li>
                </ul>
              </div>

              {/* 5. Budget Box - Matching Academic Pressure Style */}
              <div className="bg-white rounded-[2.5rem] p-8 border border-gray-100 shadow-sm flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-bold mb-2 text-gray-800">Budgeting 101</h3>
                  <p className="text-sm text-gray-500 mb-6 leading-relaxed">The purchase price is only 60% of the true cost.</p>
                </div>
                <div className="space-y-4">
                  <div className="p-4 bg-orange-50 rounded-2xl border border-orange-100">
                    <p className="text-xs font-bold text-orange-700 uppercase tracking-widest mb-1">The 10/20 Rule</p>
                    <p className="text-sm text-orange-900">Save 10% for repairs and 20% for insurance premiums.</p>
                  </div>
                  <button className="w-full py-3 bg-gray-50 hover:bg-gray-100 rounded-xl text-xs font-bold text-gray-600 transition-all uppercase tracking-widest">
                    Cost Calculator
                  </button>
                </div>
              </div>
            </section>

            {/* 7. Seeking Professional Help - Matching Demystifying Counseling Style */}
            <section className="bg-[#E7EBE8] rounded-[3rem] p-10 flex flex-col md:flex-row gap-10 items-center border border-white/50">
              <div className="flex-1">
                <h3 className="text-2xl font-bold mb-4 text-gray-900">Pre-Purchase Inspections</h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-6 italic">
                  "A mechanic is your best friend during a sale." Never buy a used car without a <strong>Professional Inspection (PPI).</strong> It usually costs $100 but can save you thousands.
                </p>
                <div className="flex flex-wrap gap-4">
                  <button className="text-blue-900 font-bold border-b-2 border-blue-900 pb-1 hover:text-blue-700 transition-all text-sm">
                    How to find a mechanic
                  </button>
                  <button className="text-gray-500 font-bold border-b-2 border-gray-300 pb-1 hover:text-gray-700 transition-all text-sm">
                    Inspection Checklist
                  </button>
                </div>
              </div>
              <div className="hidden md:flex w-40 h-40 bg-white/40 backdrop-blur-md rounded-full items-center justify-center text-5xl shadow-inner">
                🔧
              </div>
            </section>
          </div>

          {/* Sidebar Area */}
          <div className="space-y-8">
            
            {/* 8. Checklist - Matching Mood Check-in Style */}
            <div className="bg-white rounded-[2.5rem] p-8 border border-gray-100 shadow-xl shadow-gray-200/50">
              <h3 className="text-lg font-bold mb-6 text-center text-gray-800">Ready to Buy?</h3>
              <div className="space-y-4">
                {["Check IDP validity", "Compare 3 quotes", "Verify VIN history"].map((item) => (
                  <div key={item} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                    <input type="checkbox" className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                    <span className="text-sm text-gray-700 font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 4. Daily Maintenance - Matching Daily Wellness Habits Style */}
            <div className="bg-[#F4F4F9] rounded-[3rem] p-8 border border-white shadow-sm">
              <h3 className="font-bold text-gray-800 mb-6 flex items-center gap-2 px-2">
                <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                Ownership Habits
              </h3>
              <ul className="space-y-4">
                <li className="group flex gap-4 items-center bg-white p-4 rounded-[1.5rem] shadow-sm hover:shadow-md transition-all cursor-pointer">
                  <span className="text-2xl transform group-hover:rotate-12 transition-transform">🛢️</span>
                  <div>
                    <p className="text-sm font-bold text-gray-800">Oil Changes</p>
                    <p className="text-[10px] text-gray-400 font-medium tracking-tight">Every 5,000 miles.</p>
                  </div>
                </li>
                <li className="group flex gap-4 items-center bg-white p-4 rounded-[1.5rem] shadow-sm hover:shadow-md transition-all cursor-pointer">
                  <span className="text-2xl transform group-hover:rotate-12 transition-transform">🛞</span>
                  <div>
                    <p className="text-sm font-bold text-gray-800">Tire Pressure</p>
                    <p className="text-[10px] text-gray-400 font-medium tracking-tight">Check monthly for safety.</p>
                  </div>
                </li>
              </ul>
            </div>

            {/* Document Vault Teaser - Matching Quiz Style */}
            <div className="p-8 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-[2.5rem] border border-blue-100/50">
              <h4 className="text-sm font-bold text-blue-900 mb-2 uppercase tracking-tighter">Document Vault</h4>
              <p className="text-xs text-blue-700/70 mb-4 leading-relaxed">Store your Title, Insurance, and Registration safely in one place.</p>
              <button className="w-full py-3 bg-blue-900 text-white rounded-xl text-xs font-bold hover:bg-black transition-all">
                Go to Vault
              </button>
            </div>
          </div>
        </div>

        <footer className="mt-24 text-center border-t border-gray-200/40 pt-12">
          <p className="text-gray-400 text-sm mb-6 italic font-medium">Safe travels start with smart choices.</p>
          <button 
            onClick={() => window.location.href = '/dashboard'}
            className="text-xs font-bold tracking-[0.3em] text-gray-400 hover:text-blue-900 transition-all uppercase px-4 py-2"
          >
            ← Return to Dashboard
          </button>
        </footer>
      </div>
      <Footer />
    </div>
  )
}

function GuideDetail({ title, desc }: { title: string, desc: string }) {
    return (
      <div className="group">
        <h5 className="text-lg font-bold group-hover:text-blue-600 transition">{title}</h5>
        <p className="mt-2 text-gray-500 leading-relaxed">{desc}</p>
      </div>
    );
}