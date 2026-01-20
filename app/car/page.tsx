'use client'

import React from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'

export default function CarGuidePage() {
  const categories = [
    { 
      id: "license", 
      title: "Driver's License", 
      icon: "🪪", 
      desc: "Complete guide to the U.S. permit and road test process.", 
      bg: "bg-blue-50/50", 
      href: "/car/license" 
    },
    { 
      id: "budget", 
      title: "Budget & Costs", 
      icon: "💸", 
      desc: "Understanding insurance and hidden fees.", 
      bg: "bg-orange-50/50", 
      href: "/car/budget" 
    },
    { 
      id: "buying", 
      title: "Buying Tips", 
      icon: "🚗", 
      desc: "Expert advice on finding reliable used cars.", 
      bg: "bg-indigo-50/50", 
      href: "/car/buyingtips" 
    },
    { 
      id: "insurance", 
      title: "Insurance", 
      icon: "🛡️", 
      desc: "How to get affordable quotes as an international student.", 
      bg: "bg-emerald-50/50", 
      href: "#" 
    },
  ];

  const containerVars = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  };

  const itemVars = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } }
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-[#F9F9F7] text-[#2D312E] font-sans">
      {/* Mesh Backgrounds */}
      <motion.div 
        animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.7, 0.5] }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        className="absolute top-[-5%] left-[-10%] w-[60%] h-[40%] bg-[#E8F0EE] rounded-full blur-[120px] pointer-events-none" 
      />
      <motion.div 
        animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.6, 0.4] }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-[5%] right-[-5%] w-[45%] h-[50%] bg-[#E3E9F2] rounded-full blur-[100px] pointer-events-none" 
      />

      <motion.div 
        initial="hidden" 
        animate="visible" 
        variants={containerVars} 
        className="max-w-7xl mx-auto relative z-10 py-12 px-6 lg:px-24"
      >
        <header className="mb-12 text-center md:text-left">
          <motion.div 
            variants={itemVars} 
            className="inline-flex items-center gap-3 px-3 py-1 rounded-full bg-blue-100/50 border border-blue-200 text-blue-800 text-xs font-bold uppercase tracking-widest mb-6 backdrop-blur-md"
          >
            {/* Blinking Live Action Dot */}
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600"></span>
            </span>
            Freedom on wheels
          </motion.div>
          
          <motion.h1 variants={itemVars} className="text-5xl md:text-6xl font-light tracking-tight mb-4 leading-tight text-gray-900">
            Car buying designed for <br />
            <span className="font-semibold text-blue-900 italic text-4xl md:text-6xl">your global journey.</span>
          </motion.h1>
          
          <motion.p variants={itemVars} className="text-lg text-gray-500 max-w-2xl leading-relaxed">
            Navigating the U.S. car market is a complex milestone. From your first permit to signing the title, Abrora is your co-pilot.
          </motion.p>
        </header>

        {/* Category Grid - Layout Inspired by Hims Treatments */}
        <motion.section variants={itemVars} className="mb-12 bg-white/40 backdrop-blur-xl border border-white/80 rounded-[2.5rem] p-8 shadow-sm">
          <h3 className="text-2xl font-semibold mb-8 flex items-center gap-2">
            ⚡ Step-by-Step Guides
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {categories.map((cat) => (
              <Link href={cat.href} key={cat.id} className="block">
                <motion.div 
                  whileHover={{ y: -8, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`p-8 ${cat.bg} rounded-[2rem] text-left transition-all duration-300 group border border-transparent hover:border-white h-[260px] flex flex-col justify-between cursor-pointer`}
                >
                  <div className="flex justify-between items-start">
                    <div className="bg-white/60 w-14 h-14 rounded-2xl flex items-center justify-center text-3xl shadow-sm group-hover:bg-white transition-colors">
                      {cat.icon}
                    </div>
                  </div>
                  <div>
                    <p className="font-bold text-gray-900 text-lg tracking-tight group-hover:text-blue-900">{cat.title}</p>
                    <p className="text-xs text-gray-500 mt-2 leading-relaxed">{cat.desc}</p>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </motion.section>

        {/* Sidebar and Bottom Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <motion.section variants={itemVars} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-[#1e293b] text-white rounded-[2.5rem] p-8 shadow-xl">
                <h3 className="text-xl font-bold mb-6 tracking-tight">The Legal Essentials</h3>
                <ul className="space-y-4 text-slate-100/80 text-sm">
                  <li>● <strong>SSA Letter:</strong> Required for the DMV if you lack an SSN.</li>
                  <li>● <strong>Title Transfer:</strong> Never pay cash until the physical title is in hand.</li>
                </ul>
              </div>
              <div className="bg-white rounded-[2.5rem] p-8 border border-gray-100 shadow-sm flex flex-col justify-between">
                <h3 className="text-xl font-bold mb-2 text-gray-800">Budgeting 101</h3>
                <div className="p-4 bg-orange-50 rounded-2xl border border-orange-100">
                  <p className="text-xs font-bold text-orange-700 uppercase tracking-widest mb-1">The 10/20 Rule</p>
                  <p className="text-sm text-orange-900">Save 10% for repairs and 20% for insurance.</p>
                </div>
              </div>
            </motion.section>
          </div>

          <motion.aside variants={itemVars} className="space-y-8">
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
          </motion.aside>
        </div>

        <footer className="mt-24 text-center border-t border-gray-200/40 pt-12">
          <p className="text-gray-400 text-sm mb-6 italic font-medium tracking-tight">Safe travels start with smart choices.</p>
          <Link href="/dashboard" className="text-xs font-bold tracking-[0.3em] text-gray-400 hover:text-blue-900 uppercase">
            ← Return to Dashboard
          </Link>
        </footer>
      </motion.div>
    </div>
  )
}