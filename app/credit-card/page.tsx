"use client"

import React, { useState } from 'react';
import Link from "next/link";
import Navbar from "../components/Nav";

export default function CreditMasterPage() {
  // --- CALCULATOR STATE ---
  const [limit, setLimit] = useState(1000);
  const [balance, setBalance] = useState(250);
  const [statementDate, setStatementDate] = useState("15th");
  const [dueDate, setDueDate] = useState("10th");
  const [activeStep, setActiveStep] = useState<number | null>(null);

  const utilization = limit > 0 ? Math.round((balance / limit) * 100) : 0;

  const steps = [
    {
      id: 1,
      tag: "ENTRY",
      title: "The Identity Check",
      summary: "No SSN? No problem. Use your Passport or apply for an ITIN.",
      details: {
        problem: "Banks use the Social Security Number (SSN) to find your credit file.",
        solution: "International students can use an ITIN or find 'Passport-only' banks like Deserve.",
        action: ["Get an SSN via campus job", "Or apply for an ITIN via IRS Form W-7", "Apply for 'No-SSN-Required' starter cards"],
        rookieTip: "An SSN is for taxes; your Credit Score is for trust. You can start building trust without the number."
      }
    },
    {
      id: 2,
      tag: "GROWTH",
      title: "The Starter Card",
      summary: "Apply for a 'Secured' or 'Student' card to start your history.",
      details: {
        problem: "Premium cards (Gold/Platinum) will reject you if you have 0 history.",
        solution: "Secured cards use a deposit (e.g. $200) as collateral to guarantee you won't default.",
        action: ["Deposit $200-$500 with a bank", "Receive a card with that exact limit", "Use it for 6 months to prove you are responsible"],
        rookieTip: "Think of a Secured Card as 'Credit Training Wheels.' It counts exactly like a normal card."
      }
    },
    {
      id: 3,
      tag: "SUCCESS",
      title: "The 6-Month Mark",
      summary: "Your first FICO score is born. Now you unlock the real rewards.",
      details: {
        problem: "It takes 6 months of data for the FICO algorithm to generate a score.",
        solution: "After 180 days, you graduate from 'No Score' to 'Good Score' (usually 700+).",
        action: ["Check your score for free on Credit Karma", "Apply for a 'Unsecured' card with cashback", "Ask for a limit increase on your first card"],
        rookieTip: "NEVER close your first card. Its age is the foundation of your entire financial future."
      }
    }
  ];

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Navbar />

      {/* HERO SECTION */}
      <section className="relative pt-16 pb-12 overflow-hidden text-center">
        <div className="pointer-events-none absolute -top-24 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-blue-50/50 blur-3xl" />
        <div className="mx-auto max-w-6xl px-4">
          <h1 className="text-4xl font-extrabold tracking-tight md:text-6xl">
            Master Your <span className="text-blue-600">US Credit.</span>
          </h1>
          <p className="mt-4 mx-auto max-w-2xl text-lg text-gray-600">
            A rookie-proof guide to building your financial reputation in America. 
            No SSN? No history? No problem.
          </p>
        </div>
      </section>

      {/* INTERACTIVE ROADMAP */}
      <section className="mx-auto max-w-6xl px-4 py-12">
        <h2 className="text-2xl font-bold mb-8">The Rookie Roadmap (Click to Expand)</h2>
        <div className="grid gap-6 md:grid-cols-3">
          {steps.map((step) => (
            <div key={step.id}>
              <button
                onClick={() => setActiveStep(activeStep === step.id ? null : step.id)}
                className={`w-full text-left p-8 rounded-3xl border transition-all ${activeStep === step.id ? 'border-blue-500 bg-blue-50/20 shadow-lg' : 'border-gray-100 bg-white hover:border-blue-200'}`}
              >
                <span className="text-xs font-bold text-blue-500 uppercase">{step.tag}</span>
                <h3 className="text-xl font-bold mt-2">{step.title}</h3>
                <p className="mt-2 text-sm text-gray-600">{step.summary}</p>
                <div className="mt-4 text-xs font-bold text-blue-600 underline">
                  {activeStep === step.id ? "CLOSE GUIDE" : "SEE HOW TO DO IT"}
                </div>
              </button>
              {activeStep === step.id && (
                <div className="mt-4 p-6 bg-blue-50 rounded-2xl border border-blue-100 animate-in slide-in-from-top-2">
                  <p className="text-sm mb-4"><strong>The Problem:</strong> {step.details.problem}</p>
                  <p className="text-sm mb-4"><strong>The Solution:</strong> {step.details.solution}</p>
                  <ul className="space-y-2 mb-4">
                    {step.details.action.map((a, i) => (
                      <li key={i} className="text-xs flex gap-2"><span className="text-blue-500">→</span> {a}</li>
                    ))}
                  </ul>
                  <div className="p-3 bg-white rounded-xl border border-blue-200 text-xs italic">
                    💡 <strong>Rookie Tip:</strong> {step.details.rookieTip}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* SCIENCE & CALCULATOR SECTION */}
      <section className="bg-gray-900 py-20 text-white">
        <div className="mx-auto max-w-6xl px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            
            {/* Left: Logic and Dates */}
            <div className="space-y-10">
              <div>
                <h2 className="text-4xl font-bold">The Science of the Score</h2>
                <p className="mt-4 text-gray-400">Knowing the "reporting" dates is how you cheat the system legally.</p>
              </div>

              <div className="rounded-2xl bg-white/5 p-6 border border-white/10">
                <h3 className="text-lg font-bold text-amber-400 mb-4 italic underline">Step 1: Understand Your Dates</h3>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="text-[10px] font-bold text-gray-500 uppercase">Statement Date (Reporting)</label>
                    <input 
                      type="text" value={statementDate} 
                      onChange={(e) => setStatementDate(e.target.value)}
                      className="w-full bg-gray-800 border border-gray-700 rounded-lg p-2 mt-1 text-sm outline-none focus:border-blue-500"
                    />
                    <p className="text-[10px] mt-2 text-gray-500">The day the bank takes a "photo" of your balance and tells the credit bureaus.</p>
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-gray-500 uppercase">Due Date (Penalty)</label>
                    <input 
                      type="text" value={dueDate} 
                      onChange={(e) => setDueDate(e.target.value)}
                      className="w-full bg-gray-800 border border-gray-700 rounded-lg p-2 mt-1 text-sm outline-none focus:border-blue-500"
                    />
                    <p className="text-[10px] mt-2 text-gray-500">The day you must pay to avoid fees. Usually 20-25 days after the statement.</p>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-2xl">
                <p className="text-sm">
                  <span className="font-bold text-blue-400">The Rookie Secret:</span> If you pay your bill <strong>3 days before</strong> the <span className="text-white italic">Statement Date</span>, the bank reports 0% usage, which makes your score jump much faster!
                </p>
              </div>
            </div>

            {/* Right: The Calculator */}
            <div className="rounded-3xl bg-white/5 p-8 border border-white/10 backdrop-blur-xl">
              <h3 className="text-2xl font-bold mb-8">Utilization Calculator</h3>
              <div className="space-y-6">
                <div>
                  <label className="text-xs text-gray-400 uppercase font-bold">Your Total Credit Limit ($)</label>
                  <input 
                    type="number" value={limit} 
                    onChange={(e) => setLimit(Number(e.target.value))}
                    className="w-full bg-gray-800 border border-gray-700 rounded-xl p-4 mt-2 text-xl font-mono"
                  />
                </div>
                <div>
                  <label className="text-xs text-gray-400 uppercase font-bold">Your Current Balance ($)</label>
                  <input 
                    type="number" value={balance} 
                    onChange={(e) => setBalance(Number(e.target.value))}
                    className="w-full bg-gray-800 border border-gray-700 rounded-xl p-4 mt-2 text-xl font-mono"
                  />
                </div>

                <div className="pt-8 border-t border-white/10 text-center">
                  <p className="text-xs text-gray-500 uppercase tracking-widest">Calculated Usage</p>
                  <p className={`text-7xl font-black mt-2 ${utilization > 30 ? 'text-red-500' : 'text-green-400'}`}>
                    {utilization}%
                  </p>
                  
                  <div className="mt-8">
                    {utilization > 30 ? (
                      <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-2xl text-red-200 text-sm">
                        🚨 <strong>Too High!</strong> This will lower your score. Try to keep it below <strong>${Math.round(limit * 0.3)}</strong>.
                      </div>
                    ) : (
                      <div className="bg-green-500/10 border border-green-500/30 p-4 rounded-2xl text-green-200 text-sm">
                        💎 <strong>Perfect!</strong> Banks love this ratio. You are building credit fast.
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* FINAL ROOKIE SCAM PROTECTION */}
      <section className="mx-auto max-w-6xl px-4 py-20">
        <div className="rounded-3xl bg-red-50 p-10 border border-red-100 flex flex-col md:flex-row gap-10 items-center">
          <div className="text-5xl">🛡️</div>
          <div>
            <h2 className="text-2xl font-bold text-red-900">The "Rookie" Scam Filter</h2>
            <p className="text-red-800 mt-2">If you see these, run away immediately:</p>
            <ul className="mt-4 grid md:grid-cols-2 gap-4 text-sm text-red-700">
              <li>• Anyone asking for money to "fix" your credit score.</li>
              <li>• Phone calls from "The Social Security Office" asking for card numbers.</li>
              <li>• Banks charging "Application Fees" (Real starter cards are free).</li>
              <li>• Links in text messages saying your "Account is Locked."</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}