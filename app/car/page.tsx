'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
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

  // Animation Variants
  const containerVars = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  };

  const itemVars = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-[#F9F9F7] text-[#2D312E] font-sans selection:bg-blue-100">
      <Navbar />
      
      {/* Animated Mesh Gradient Background Elements */}
      <motion.div 
        animate={{ 
          scale: [1, 1.1, 1],
          opacity: [0.5, 0.7, 0.5] 
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        className="absolute top-[-5%] left-[-10%] w-[60%] h-[40%] bg-[#E8F0EE] rounded-full blur-[120px] pointer-events-none" 
      />
      <motion.div 
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.4, 0.6, 0.4] 
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-[5%] right-[-5%] w-[45%] h-[50%] bg-[#E3E9F2] rounded-full blur-[100px] pointer-events-none" 
      />

      <motion.div 
        initial="hidden"
        animate="visible"
        variants={containerVars}
        className="max-w-7xl mx-auto relative z-10 py-12 px-6 lg:px-24"
      >
        
        {/* Hero Section */}
        <header className="mb-12 text-center md:text-left">
          <motion.div variants={itemVars} className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100/50 border border-blue-200 text-blue-800 text-xs font-bold uppercase tracking-widest mb-6 backdrop-blur-md">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            Freedom on wheels
          </motion.div>
          <motion.h1 variants={itemVars} className="text-5xl md:text-6xl font-light tracking-tight mb-4 leading-tight text-gray-900">
            Car buying designed for <br />
            <span className="font-semibold text-blue-900 italic text-4xl md:text-6xl">your global journey.</span>
          </motion.h1>
          <motion.p variants={itemVars} className="text-lg text-gray-500 max-w-2xl leading-relaxed">
            Navigating the US car market is a complex milestone. From your first permit to signing the title, Abrora is your co-pilot.
          </motion.p>
        </header>

        {/* Step-by-Step Guides Grid */}
        <motion.section variants={itemVars} className="mb-12 bg-white/40 backdrop-blur-xl border border-white/80 rounded-[2.5rem] p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] ring-1 ring-black/5">
          <h3 className="text-2xl font-semibold mb-8 flex items-center gap-2">
            ⚡ Step-by-Step Guides
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {categories.map((cat) => (
                <motion.button 
                    whileHover={{ y: -5, scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    key={cat.id}
                    onClick={() => setActiveStep(cat.id)}
                    className={`p-8 ${cat.bg} rounded-[2rem] text-left transition-all duration-300 group border border-transparent hover:border-white hover:shadow-xl flex flex-col justify-between h-[240px]`}
                >
                    <div className="bg-white/60 w-14 h-14 rounded-2xl flex items-center justify-center text-3xl shadow-sm group-hover:bg-white transition-colors group-hover:rotate-12 duration-300">
                      {cat.icon}
                    </div>
                    <div>
                      <p className="font-bold text-gray-900 text-lg tracking-tight">{cat.title}</p>
                      <p className="text-xs text-gray-500 mt-2 leading-relaxed opacity-80 group-hover:opacity-100">{cat.desc}</p>
                    </div>
                </motion.button>
            ))}
          </div>
        </motion.section>

        {/* Action Banner */}
        <motion.div variants={itemVars} className="mb-12 p-8 bg-blue-50/40 border border-blue-100 rounded-[2.5rem] backdrop-blur-md flex flex-col md:flex-row items-center justify-between gap-8 shadow-sm">
          <div>
            <h2 className="text-xl font-bold text-blue-800 flex items-center gap-2 mb-2">
              🚗 Need a car immediately?
            </h2>
            <p className="text-blue-700/70 text-sm max-w-md italic">Compare rental options vs. buying costs before making a commitment.</p>
          </div>
          <button className="bg-blue-600 text-white px-8 py-3.5 rounded-full font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-200/50 hover:scale-105 active:scale-95">
            Buy vs Rent Guide
          </button>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <motion.section variants={itemVars} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Dark Box */}
              <div className="bg-[#1e293b] text-white rounded-[2.5rem] p-8 shadow-xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform">
                    <span className="text-6xl">⚖️</span>
                </div>
                <h3 className="text-xl font-bold mb-6 tracking-tight relative z-10 text-white">The Legal Essentials</h3>
                <ul className="space-y-4 text-slate-100/80 text-sm relative z-10">
                  <li className="flex items-start gap-3">
                    <span className="text-blue-400">●</span>
                    <p><strong>The SSA Letter:</strong> Ineligibility letters are required for the DMV if you lack an SSN.</p>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-blue-400">●</span>
                    <p><strong>Title Transfer:</strong> Never pay cash until the physical title is in your hand.</p>
                  </li>
                </ul>
              </div>

              {/* Budget Box */}
              <div className="bg-white rounded-[2.5rem] p-8 border border-gray-100 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
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
            </motion.section>

            {/* Professional Help */}
            <motion.section variants={itemVars} className="bg-[#E7EBE8] rounded-[3rem] p-10 flex flex-col md:flex-row gap-10 items-center border border-white/50 hover:shadow-lg transition-all">
              <div className="flex-1">
                <h3 className="text-2xl font-bold mb-4 text-gray-900">Pre-Purchase Inspections</h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-6 italic">
                  &quot;A mechanic is your best friend during a sale.&quot; Never buy a used car without a professional inspection.
                </p>
                <div className="flex flex-wrap gap-4">
                  <button className="text-blue-900 font-bold border-b-2 border-blue-900 pb-1 hover:text-blue-700 transition-all text-sm">
                    How to find a mechanic
                  </button>
                </div>
              </div>
              <motion.div 
                animate={{ rotate: [0, 5, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="hidden md:flex w-40 h-40 bg-white/40 backdrop-blur-md rounded-full items-center justify-center text-5xl shadow-inner"
              >
                🔧
              </motion.div>
            </motion.section>
          </div>

          {/* Sidebar */}
          <motion.aside variants={itemVars} className="space-y-8">
            <div className="bg-white rounded-[2.5rem] p-8 border border-gray-100 shadow-xl shadow-gray-200/50">
              <h3 className="text-lg font-bold mb-6 text-center text-gray-800">Ready to Buy?</h3>
              <div className="space-y-4">
                {["Check IDP validity", "Compare 3 quotes", "Verify VIN history"].map((item) => (
                  <div key={item} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl hover:bg-blue-50/30 transition-colors">
                    <input type="checkbox" className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                    <span className="text-sm text-gray-700 font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-8 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-[2.5rem] border border-blue-100/50">
              <h4 className="text-sm font-bold text-blue-900 mb-2 uppercase tracking-tighter">Document Vault</h4>
              <p className="text-xs text-blue-700/70 mb-4 leading-relaxed text-indigo-900">Store your Title and Registration safely.</p>
              <button className="w-full py-3 bg-blue-900 text-white rounded-xl text-xs font-bold hover:bg-black transition-all">
                Go to Vault
              </button>
            </div>
          </motion.aside>
        </div>

        <footer className="mt-24 text-center border-t border-gray-200/40 pt-12">
          <p className="text-gray-400 text-sm mb-6 italic font-medium tracking-tight">Safe travels start with smart choices.</p>
          <button 
            onClick={() => window.location.href = '/dashboard'}
            className="text-xs font-bold tracking-[0.3em] text-gray-400 hover:text-blue-900 transition-all uppercase px-4 py-2"
          >
            ← Return to Dashboard
          </button>
        </footer>
      </motion.div>
      <Footer />
    </div>
  )
}