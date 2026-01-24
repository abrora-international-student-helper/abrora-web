'use client'

import React from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'

export default function BudgetGuidePage() {
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
    <div className="min-h-screen relative overflow-hidden bg-background text-foreground font-sans selection:bg-primary-light">
      {/* Mesh Backgrounds - Using Blue Theme Variables */}
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
            Financial Planning
          </motion.div>
          
          <motion.h1 variants={itemVars} className="text-5xl md:text-6xl font-light tracking-tight mb-4 leading-tight">
            The <span className="font-semibold text-primary italic text-4xl md:text-6xl">Real Cost</span> of a Car
          </motion.h1>
          
          <motion.p variants={itemVars} className="text-lg text-muted-foreground max-w-2xl leading-relaxed">
            The sticker price is only part of the story. In the U.S., the purchase price is usually only 50–65% of what you’ll spend in your first year.
          </motion.p>
        </header>

        {/* 6 Categories Grid */}
        <motion.section variants={itemVars} className="mb-16">
          <h2 className="text-2xl font-bold mb-8 text-foreground flex items-center gap-2">🧩 The 6 Major Cost Categories</h2>
          <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
            {[
              { n: "1", t: "Purchase Price", i: "🚗", bg: "bg-blue-50/50" },
              { n: "2", t: "Insurance", i: "🛡️", bg: "bg-primary-lighter/50" },
              { n: "3", t: "DMV Fees", i: "🏛️", bg: "bg-secondary-lighter/50" },
              { n: "4", t: "Sales Tax", i: "💸", bg: "bg-blue-50/50" },
              { n: "5", t: "Maintenance", i: "🔧", bg: "bg-primary-lighter/50" },
              { n: "6", t: "Fuel & Daily", i: "⛽", bg: "bg-secondary-lighter/50" },
            ].map((item) => (
              <div key={item.n} className={`p-6 rounded-[2rem] border border-border shadow-sm flex flex-col items-center text-center transition-all hover:shadow-md ${item.bg}`}>
                <span className="text-3xl mb-3">{item.i}</span>
                <p className="text-[10px] font-black text-muted-foreground uppercase mb-1">{item.n}</p>
                <p className="text-xs font-bold text-foreground leading-tight">{item.t}</p>
              </div>
            ))}
          </div>
        </motion.section>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content Area */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Breakdown Table */}
            <motion.section variants={itemVars} className="bg-card rounded-[2.5rem] p-8 border border-border shadow-xl shadow-primary/5 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 text-6xl opacity-5">📊</div>
              <h3 className="text-xl font-bold mb-6">Real Example: $5,000 Car (First Year)</h3>
              <div className="space-y-4">
                {[
                  { label: "Car Purchase Price", val: "$5,000", sub: "One-time payment" },
                  { label: "Insurance (12 months)", val: "$2,400", sub: "$200/mo avg for newcomers" },
                  { label: "Registration & Tax", val: "$500", sub: "DMV fees + state sales tax" },
                  { label: "Maintenance & Repairs", val: "$800", sub: "Oil, tires, emergency fund" },
                  { label: "Fuel & Daily", val: "$1,200", sub: "Gas, tolls, parking" },
                ].map((row, idx) => (
                  <div key={idx} className="flex justify-between items-center border-b border-border/50 pb-3">
                    <div>
                      <p className="text-sm font-bold text-foreground">{row.label}</p>
                      <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-tighter">{row.sub}</p>
                    </div>
                    <p className="text-lg font-bold text-foreground">{row.val}</p>
                  </div>
                ))}
                <div className="flex justify-between items-center pt-4 text-primary font-black">
                  <p className="text-lg uppercase">Total Year 1</p>
                  <p className="text-3xl tracking-tighter">$9,900</p>
                </div>
              </div>
            </motion.section>

            {/* The 10/20 Rule - Highlighting in Primary Blue */}
            <motion.section variants={itemVars} className="bg-primary text-primary-foreground rounded-[2.5rem] p-10 shadow-xl relative overflow-hidden group">
              <div className="absolute bottom-0 right-0 p-4 opacity-20 transform rotate-12 group-hover:scale-110 transition-transform">
                <span className="text-9xl font-black">🧠</span>
              </div>
              <h3 className="text-2xl font-bold mb-4 tracking-tight">The 10 / 20 Rule</h3>
              <p className="text-primary-foreground/80 text-sm leading-relaxed mb-6">A safe budgeting cushion for first-time owners in the USA:</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white/10 p-4 rounded-2xl border border-white/10 backdrop-blur-md">
                      <p className="text-xs font-bold uppercase mb-1">Repairs</p>
                      <p className="text-sm italic font-medium">Save 10% of car price in a buffer fund for immediate fixes.</p>
                  </div>
                  <div className="bg-white/10 p-4 rounded-2xl border border-white/10 backdrop-blur-md">
                      <p className="text-xs font-bold uppercase mb-1">Fees</p>
                      <p className="text-sm italic font-medium">Expect 20% for insurance, tax, and DMV registration.</p>
                  </div>
              </div>
            </motion.section>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Budget Checklist */}
            <motion.div variants={itemVars} className="bg-card border border-border rounded-[2.5rem] p-8 shadow-sm">
              <h3 className="text-lg font-bold mb-6 text-center text-foreground uppercase tracking-widest text-sm">Abrora Checklist</h3>
              <div className="space-y-4">
                {[
                  "I can afford insurance monthly",
                  "I have money for registration & tax",
                  "I have a repair emergency fund",
                  "I can afford gas & upkeep",
                  "I won’t be left with $0 after"
                ].map((check, i) => (
                  <div key={i} className="flex items-center gap-4 p-4 bg-muted rounded-2xl border border-transparent hover:border-primary/20 transition-all">
                    <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-[10px] font-bold">✓</div>
                    <p className="text-xs font-semibold text-foreground">{check}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Warning Box */}
            <motion.div variants={itemVars} className="bg-destructive/5 border border-destructive/10 rounded-[2.5rem] p-8">
                <h4 className="text-destructive font-bold text-sm mb-2 flex items-center gap-2 italic">
                    ❌ Avoid This Mistake
                </h4>
                <p className="text-xs text-destructive/80 leading-relaxed font-medium">
                    Spending your last dollar on the car purchase. A $3,000 car with $0 left in the bank is riskier than a $2,000 car with a $1,000 repair fund.
                </p>
            </motion.div>
          </div>
        </div>

        {/* Footer Navigation */}
        <footer className="mt-24 text-center border-t border-border/40 pt-12">
          <div className="flex flex-col md:flex-row justify-center gap-4">
            <Link 
              href="/car" 
              className="text-xs font-bold tracking-[0.3em] text-muted-foreground hover:text-primary transition-all uppercase px-8 py-3 border border-border rounded-full"
            >
              ← Back to Guides
            </Link>
            <Link 
              href="/car/buying" 
              className="text-xs font-bold tracking-[0.3em] bg-primary text-primary-foreground hover:bg-primary-dark transition-all uppercase px-8 py-3 rounded-full shadow-lg shadow-primary/20"
            >
              Next: Buying Tips →
            </Link>
          </div>
        </footer>
      </motion.div>
    </div>
  )
}