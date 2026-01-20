'use client'

import React from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Footer from "../../components/common/footer"

export default function CarInsurancePage() {
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
    <div className="min-h-screen relative overflow-hidden bg-background text-foreground font-sans selection:bg-primary-light">
      
      
      {/* Mesh Backgrounds - Matching Global Theme */}
      <motion.div 
        animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        className="absolute top-[-5%] left-[-10%] w-[60%] h-[40%] bg-primary-lighter rounded-full blur-[120px] pointer-events-none" 
      />
      <motion.div 
        animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-[5%] right-[-5%] w-[45%] h-[50%] bg-secondary-lighter rounded-full blur-[100px] pointer-events-none" 
      />

      <motion.div 
        initial="hidden" 
        animate="visible" 
        variants={containerVars} 
        className="max-w-7xl mx-auto relative z-10 py-12 px-6 lg:px-24"
      >
        {/* Header Section */}
        <header className="mb-12 text-center md:text-left">
          <motion.div 
            variants={itemVars} 
            className="inline-flex items-center gap-3 px-3 py-1 rounded-full bg-primary-lighter border border-primary-light text-primary-dark text-xs font-bold uppercase tracking-widest mb-6 backdrop-blur-md"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            Legal Requirement
          </motion.div>
          
          <motion.h1 variants={itemVars} className="text-5xl md:text-6xl font-light tracking-tight mb-4 leading-tight">
            Car Insurance <br />
            <span className="font-semibold text-primary italic text-4xl md:text-6xl text-blue-900 italic">in the USA.</span>
          </motion.h1>
          
          <motion.p variants={itemVars} className="text-lg text-muted-foreground max-w-2xl leading-relaxed">
            In the U.S., car insurance is mandatory by law. You cannot legally drive, register a car, or get license plates without it.
          </motion.p>
        </header>

        {/* Start Here Banner - UI Inspired by image top section */}
        <motion.div variants={itemVars} className="mb-16 p-10 bg-primary-lighter/40 border border-primary-light rounded-[2.5rem] backdrop-blur-md flex flex-col md:flex-row items-center gap-10 shadow-sm relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform">
                <span className="text-9xl">🛡️</span>
            </div>
            <div className="relative z-10 flex-1">
                <h2 className="text-2xl font-bold text-primary-dark mb-4">👋 The Most Important Thing to Know</h2>
                <p className="text-primary-dark/80 text-lg leading-relaxed max-w-2xl">
                    Insurance is tied to <strong>YOU</strong>, not just the car. This is why international students often pay more at first due to having no U.S. driving or credit history.
                </p>
                <div className="mt-6 flex flex-wrap gap-4">
                    <span className="px-4 py-2 bg-white rounded-full text-xs font-bold text-primary shadow-sm border border-primary-light">No Credit History Check</span>
                    <span className="px-4 py-2 bg-white rounded-full text-xs font-bold text-primary shadow-sm border border-primary-light">International Driver Rates</span>
                </div>
            </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content Area: Step-by-Step Types */}
          <div className="lg:col-span-2 space-y-8 relative">
            <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-border/50 hidden md:block" />

            {[
              { 
                step: "1", 
                title: "Liability Insurance", 
                highlight: "(REQUIRED)",
                desc: "Covers damage you cause to others and their medical bills. ⚠️ Warning: This does not cover your own car.",
                icon: "🚗",
                color: "bg-blue-50/50"
              },
              { 
                step: "2", 
                title: "Collision Coverage", 
                highlight: "(OPTIONAL)",
                desc: "Covers damage to your car if you crash. Essential if your car is valuable or you can't afford sudden major repairs.",
                icon: "💥",
                color: "bg-orange-50/50"
              },
              { 
                step: "3", 
                title: "Comprehensive Coverage", 
                highlight: "(OPTIONAL)",
                desc: "Covers theft, vandalism, fire, and weather damage. Highly recommended if you live in high-risk areas or park outside.",
                icon: "🌪️",
                color: "bg-emerald-50/50"
              }
            ].map((s, idx) => (
              <motion.div key={idx} variants={itemVars} className="relative pl-0 md:pl-16 group">
                <div className="absolute left-3.5 md:left-3 top-0 w-6 h-6 rounded-full bg-background border-2 border-primary z-10 flex items-center justify-center text-[10px] font-bold text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                    {s.step}
                </div>
                <div className={`p-8 ${s.color} backdrop-blur-sm rounded-[2.2rem] border border-border group-hover:border-primary/30 transition-all hover:shadow-lg`}>
                  <div className="flex items-start gap-4">
                    <span className="text-3xl">{s.icon}</span>
                    <div>
                      <h3 className="text-xl font-bold mb-2">{s.title} <span className="text-primary text-sm font-black">{s.highlight}</span></h3>
                      <p className="text-muted-foreground leading-relaxed text-sm">{s.desc}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Smart Tips Grid */}
            <motion.div variants={itemVars} className="bg-primary text-primary-foreground rounded-[2.5rem] p-10 shadow-xl mt-12 relative overflow-hidden">
                <div className="absolute bottom-0 right-0 p-4 opacity-20 transform rotate-12">
                    <span className="text-9xl font-black">🧠</span>
                </div>
                <h3 className="text-2xl font-bold mb-6 italic underline decoration-primary-lighter/40 underline-offset-4">Smart Tips to Lower Costs</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10 text-sm">
                    <div className="bg-white/10 p-4 rounded-2xl border border-white/10">
                        <h4 className="font-bold mb-2">Choose Right Car</h4>
                        <p className="opacity-90 leading-relaxed">Sedans are cheaper than sports cars. Choose reliable, older models to significantly lower premiums.</p>
                    </div>
                    <div className="bg-white/10 p-4 rounded-2xl border border-white/10">
                        <h4 className="font-bold mb-2">Quote Secrets</h4>
                        <p className="opacity-90 leading-relaxed">Never accept the first quote. Comparing companies like Geico, Progressive, or local insurers can save hundreds.</p>
                    </div>
                </div>
            </motion.div>
          </div>

          {/* Sidebar Area: Mistakes & Checklist */}
          <div className="space-y-8">
            {/* Common Mistakes Sidebar - UI Inspired by image_5c4ea2 */}
            <motion.div variants={itemVars} className="bg-destructive/5 border border-destructive/10 rounded-[2.5rem] p-8">
              <h3 className="text-lg font-bold text-destructive mb-6 flex items-center gap-2 italic">
                ⚠️ Common Insurance Mistakes
              </h3>
              <div className="space-y-4">
                {[
                  "Buying insurance after registering",
                  "Assuming IDP gives cheap rates",
                  "Over-insuring a cheap car",
                  "Not reading deductible amount",
                  "Missing monthly payments"
                ].map((m) => (
                  <div key={m} className="flex items-center gap-3 text-sm font-medium text-destructive/80">
                    <span className="w-5 h-5 flex-shrink-0 bg-destructive/10 rounded-full flex items-center justify-center text-[10px]">✕</span>
                    {m}
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Insurance Checklist Sidebar */}
            <motion.div variants={itemVars} className="bg-card border border-border rounded-[2.5rem] p-8 shadow-xl shadow-primary/5 sticky top-24">
              <h3 className="text-lg font-bold mb-6 flex items-center gap-2 uppercase tracking-widest text-primary text-center justify-center">
                ✅ Insurance Checklist
              </h3>
              <div className="space-y-4 mb-8">
                {[
                  "Insurance purchased",
                  "Coverage meets state minimum",
                  "Proof downloaded / printed",
                  "Monthly cost affordable",
                  "Deductible understood"
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3 p-4 bg-muted rounded-2xl border border-transparent hover:border-primary/20 transition-all">
                    <input type="checkbox" className="h-5 w-5 rounded-full border-primary text-primary focus:ring-primary cursor-pointer" />
                    <span className="text-sm font-semibold">{item}</span>
                  </div>
                ))}
              </div>
              <button className="w-full py-4 bg-primary text-white rounded-2xl font-bold shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all">
                Download Checklist
              </button>
            </motion.div>
          </div>
        </div>

        {/* Realistic Numbers / Terms Section */}
        <motion.section variants={itemVars} className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-[2.5rem] p-10 border border-border shadow-sm">
                <h3 className="text-xl font-bold mb-6">💰 Realistic Costs for Beginners</h3>
                <div className="space-y-4 text-sm">
                    <div className="flex justify-between p-4 bg-muted rounded-2xl">
                        <span className="font-bold">International Student</span>
                        <span className="text-primary font-black">$150 – $350 / mo</span>
                    </div>
                    <p className="text-xs text-muted-foreground italic px-2">
                        *Note: Prices often drop significantly after 6–12 months of U.S. history.
                    </p>
                </div>
            </div>
            <div className="bg-muted rounded-[2.5rem] p-10 border border-border">
                <h3 className="text-xl font-bold mb-6">📌 Plain English Terms</h3>
                <div className="grid grid-cols-2 gap-4 text-xs font-bold uppercase tracking-tighter text-muted-foreground">
                    <div className="p-3 bg-white rounded-xl border border-border"><span className="text-primary block text-sm">Premium</span> Monthly Cost</div>
                    <div className="p-3 bg-white rounded-xl border border-border"><span className="text-primary block text-sm">Deductible</span> Your initial pay</div>
                    <div className="p-3 bg-white rounded-xl border border-border"><span className="text-primary block text-sm">Policy</span> Your contract</div>
                    <div className="p-3 bg-white rounded-xl border border-border"><span className="text-primary block text-sm">Limit</span> Max insurance pays</div>
                </div>
            </div>
        </motion.section>

        {/* Footer Navigation */}
        <footer className="mt-24 text-center border-t border-border/40 pt-12">
          <p className="text-muted-foreground text-sm mb-6 italic font-medium">Safe travels start with smart choices. Ensure your policy is active before registration.</p>
          <Link 
            href="/car" 
            className="text-xs font-bold tracking-[0.3em] text-muted-foreground hover:text-primary transition-all uppercase px-6 py-3 border border-border rounded-full inline-block"
          >
            ← Return to Car Guide
          </Link>
        </footer>
      </motion.div>
      <Footer />
    </div>
  )
}