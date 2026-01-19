'use client'

import React from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Navbar from "../../components/Nav"
import Footer from "../../components/common/footer"

export default function BuyingTipsPage() {
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
    <div className="min-h-screen relative overflow-hidden bg-background text-foreground font-sans">
      <Navbar />
      
      {/* Mesh Backgrounds - Matching Theme */}
      <motion.div 
        animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        className="absolute top-[-5%] left-[-10%] w-[60%] h-[40%] bg-primary-light rounded-full blur-[120px] pointer-events-none" 
      />
      <motion.div 
        animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-[5%] right-[-5%] w-[45%] h-[50%] bg-secondary-light rounded-full blur-[100px] pointer-events-none" 
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
            Buying Guide
          </motion.div>
          
          <motion.h1 variants={itemVars} className="text-5xl md:text-6xl font-light tracking-tight mb-4 leading-tight">
            Smart moves for <br />
            <span className="font-semibold text-primary italic text-4xl md:text-6xl">choosing your first car.</span>
          </motion.h1>
          
          <motion.p variants={itemVars} className="text-lg text-muted-foreground max-w-2xl leading-relaxed">
            In the U.S., there are millions of cars for sale. Rushing is the #1 reason beginners lose money. Let&apos;s navigate this safely.
          </motion.p>
        </header>

        {/* The Golden Rule Banner - Inspiration from top section of image */}
        <motion.div variants={itemVars} className="mb-16 p-10 bg-primary-lighter/40 border border-primary-light rounded-[2.5rem] backdrop-blur-md flex flex-col md:flex-row items-center gap-10 shadow-sm relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform">
                <span className="text-9xl">🏆</span>
            </div>
            <div className="relative z-10 flex-1">
                <h2 className="text-2xl font-bold text-primary-dark mb-2">👋 The Golden Rule: Never Rush.</h2>
                <p className="text-primary-dark/70 text-lg italic max-w-xl">
                    &quot;If one deal doesn’t work out, another will. Don&apos;t let excitement cost you thousands.&quot;
                </p>
                <div className="mt-6 flex gap-4">
                    <span className="px-4 py-2 bg-white rounded-full text-xs font-bold text-primary shadow-sm border border-primary-light">Reliability First</span>
                    <span className="px-4 py-2 bg-white rounded-full text-xs font-bold text-primary shadow-sm border border-primary-light">No Emotional Buys</span>
                </div>
            </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content Area: Step-by-Step Flow */}
          <div className="lg:col-span-2 space-y-8 relative">
            <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-border/50 hidden md:block" />

            {[
              { 
                step: "1", 
                title: "Decide What You Need", 
                desc: "Sedan for commuting? AWD for snow? Compact for city parking? Buy for your daily needs, not your dream looks.",
                icon: "🧠",
                color: "bg-blue-50/50"
              },
              { 
                step: "2", 
                title: "Choose Reliable Brands", 
                desc: "Stick to Toyota, Honda, Mazda, or Hyundai. Avoid salvage titles or luxury brands for your first year.",
                icon: "✅",
                color: "bg-emerald-50/50"
              },
              { 
                step: "3", 
                title: "Where to Look", 
                desc: "Dealerships (safest), Facebook Marketplace (cheap but risky), or Craigslist. Bring a friend if meeting private sellers.",
                icon: "🔍",
                color: "bg-orange-50/50"
              },
              { 
                step: "4", 
                title: "The VIN Check", 
                desc: "Every car has a VIN. Check for accidents, title issues, and flood damage. If they won't share it, walk away.",
                icon: "📄",
                color: "bg-indigo-50/50"
              },
              { 
                step: "5", 
                title: "Test Drive properly", 
                desc: "Check brakes, AC/Heater, steering, and weird noises. Drive on both city streets and the highway.",
                icon: "🚘",
                color: "bg-rose-50/50"
              },
              { 
                step: "6", 
                title: "Pre-Purchase Inspection", 
                desc: "Spend $100 on a mechanic. They will reveal hidden issues the seller won't tell you about.",
                icon: "🔧",
                color: "bg-amber-50/50"
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
                      <h3 className="text-xl font-bold mb-2">Step {s.step}: {s.title}</h3>
                      <p className="text-muted-foreground leading-relaxed">{s.desc}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Negotiation & Paperwork Highlight */}
            <motion.div variants={itemVars} className="bg-primary text-primary-foreground rounded-[2.5rem] p-10 shadow-xl mt-12 relative overflow-hidden">
                <div className="absolute bottom-0 right-0 p-4 opacity-20 transform rotate-12">
                    <span className="text-9xl font-black">✍️</span>
                </div>
                <h3 className="text-2xl font-bold mb-6">Finalizing: Step 7 & 8</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                        <h4 className="font-bold text-lg mb-2 underline decoration-primary-lighter/40 underline-offset-4">Smart Negotiation</h4>
                        <p className="text-sm opacity-90">Be polite, point out issues found in inspection, and always be ready to walk away. Even $300 off covers your tax!</p>
                    </div>
                    <div>
                        <h4 className="font-bold text-lg mb-2 underline decoration-primary-lighter/40 underline-offset-4">Paperwork Checklist</h4>
                        <ul className="text-sm space-y-1 opacity-90">
                            <li>• Title must be in seller&apos;s name</li>
                            <li>• VIN on Title matches the car</li>
                            <li>• Bill of Sale is prepared</li>
                            <li>• Insurance is active</li>
                        </ul>
                    </div>
                </div>
            </motion.div>
          </div>

          {/* Sidebar Section: Mistakes & Checklist */}
          <div className="space-y-8">
            {/* Common Mistakes - Inspiration from orange box in image */}
            <motion.div variants={itemVars} className="bg-destructive/5 border border-destructive/10 rounded-[2.5rem] p-8">
              <h3 className="text-lg font-bold text-destructive mb-6 flex items-center gap-2 italic">
                ❌ Don&apos;t Make These Mistakes
              </h3>
              <div className="space-y-4">
                {[
                  "Buying emotionally",
                  "Skipping inspection",
                  "Trusting 'friend of a friend'",
                  "Paying before title transfer",
                  "Assuming dealership = no risk"
                ].map((m) => (
                  <div key={m} className="flex items-center gap-3 text-sm font-medium text-destructive/80">
                    <span className="w-5 h-5 flex-shrink-0 bg-destructive/10 rounded-full flex items-center justify-center text-[10px]">✕</span>
                    {m}
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Abrora Checklist - Vertical Card from Image */}
            <motion.div variants={itemVars} className="bg-card border border-border rounded-[2.5rem] p-8 shadow-xl shadow-primary/5 sticky top-24">
              <h3 className="text-lg font-bold mb-6 flex items-center gap-2 uppercase tracking-widest text-primary text-center justify-center">
                ✅ Buying Checklist
              </h3>
              <div className="space-y-4 mb-8">
                {[
                  "Budget confirmed",
                  "Insurance quote checked",
                  "VIN verified",
                  "Test drive done",
                  "Inspection completed",
                  "Title verified"
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3 p-4 bg-muted/30 rounded-2xl border border-transparent hover:border-primary/20 transition-colors">
                    <input type="checkbox" className="h-5 w-5 rounded-full border-primary text-primary focus:ring-primary cursor-pointer" />
                    <span className="text-sm font-semibold">{item}</span>
                  </div>
                ))}
              </div>
              <button className="w-full py-4 bg-primary text-white rounded-2xl font-bold shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all">
                Download Buying Guide
              </button>
            </motion.div>
          </div>
        </div>

        {/* Footer Navigation */}
        <footer className="mt-24 text-center border-t border-border/40 pt-12">
          <p className="text-muted-foreground text-sm mb-6 italic font-medium">Safe travels start with smart choices. Check your history before you buy.</p>
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