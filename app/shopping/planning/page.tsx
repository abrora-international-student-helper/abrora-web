'use client'

import React from 'react'
import Link from 'next/link'

export default function PlanningDetailPage() {
  return (
    <div className="min-h-screen relative overflow-hidden bg-[#F4F7FA] text-[#2D312E] py-16 px-6 lg:px-24 font-sans">
      
      {/* --- Aesthetic White & Blue Frost Background --- */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white via-[#EAF2FA] to-[#F4F7FA] -z-10" />
      <div className="absolute top-[-5%] right-[-5%] w-[600px] h-[600px] bg-blue-200/40 rounded-full blur-[120px] -z-10" />
      <div className="absolute bottom-[0%] left-[-5%] w-[500px] h-[500px] bg-blue-100/60 rounded-full blur-[100px] -z-10" />

      <div className="max-w-5xl mx-auto relative z-10">
        
        {/* Navigation */}
        <Link href="/shopping" className="group inline-flex items-center gap-2 mb-12 text-[10px] font-bold uppercase tracking-[0.2em] text-blue-500 hover:text-blue-800 transition-all bg-white/80 px-5 py-2.5 rounded-full border border-blue-100 shadow-sm">
          <span className="group-hover:-translate-x-1 transition-transform">←</span> Back to Departure Hub
        </Link>

        {/* Hero Header */}
        <header className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">🧭</span>
            <span className="text-[10px] font-bold uppercase tracking-widest text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-100">Strategy 01</span>
          </div>
          <h1 className="text-6xl md:text-8xl font-bold tracking-tighter mb-8 leading-none bg-gradient-to-r from-slate-900 via-blue-900 to-blue-800 bg-clip-text text-transparent">
            Planning & <br /> Booking.
          </h1>
          <p className="text-xl text-slate-500 max-w-2xl leading-relaxed font-medium italic border-l-4 border-blue-400 pl-6">
            "Everything from months before departure until the moment you land — exactly what to do, when to do it, and why it matters."
          </p>
        </header>

        {/* Action: Google Flights */}
        <div className="mb-20">
          <div className="bg-white/80 backdrop-blur-lg rounded-[3rem] p-10 flex flex-col md:flex-row items-center justify-between gap-8 shadow-[0_20px_50px_rgba(148,163,184,0.1)] border border-white">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-2">Book Your Flight</h2>
              <p className="text-slate-400 text-sm font-medium">Research routes carefully via Google Flights, Kayak, or Skyscanner.</p>
            </div>
            <a href="https://www.google.com/flights" target="_blank" rel="noopener noreferrer" className="px-10 py-5 bg-blue-600 text-white rounded-2xl font-bold text-xs uppercase tracking-[0.2em] hover:bg-blue-700 shadow-lg shadow-blue-200 transition-all active:scale-95">
              Open Google Flights ✈️
            </a>
          </div>
        </div>

        {/* --- MAIN CONTENT SECTIONS --- */}
        <div className="space-y-16">
          
          {/* PART 1: 3-4 Months */}
          <section className="bg-white/60 backdrop-blur-md p-10 rounded-[3.5rem] border border-white shadow-sm">
            <h3 className="text-sm font-black text-blue-600 uppercase tracking-[0.3em] mb-8">Part 1 — 3–4 Months Before Travel</h3>
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <h4 className="text-xl font-bold mb-6 text-slate-800 italic">1️⃣ Confirm Academic Dates</h4>
                <p className="text-sm text-slate-600 leading-relaxed mb-4">Check your I-20 form and university emails for: <br /> <strong>Program Start • Orientation • Move-in Date.</strong></p>
                <div className="p-6 bg-blue-50/50 rounded-3xl border border-blue-100">
                  <h5 className="text-xs font-bold text-blue-700 uppercase mb-2">2️⃣ The F-1 Entry Rule</h5>
                  <p className="text-xs text-blue-900 leading-relaxed">
                    You can enter the U.S. <strong>no earlier than 30 days</strong> before program start. <br />
                    <span className="font-bold">Example:</span> Aug 25 start? Earliest arrival is July 26. Arrival earlier = Denied entry.
                  </p>
                </div>
              </div>
              <div className="bg-slate-900 p-8 rounded-[2.5rem] text-white">
                <h4 className="text-xl font-bold mb-4 italic text-blue-400">3️⃣ The Ideal Window</h4>
                <p className="text-sm text-slate-300 mb-6 font-medium">Best practice: Arrive <strong>7–14 days before orientation.</strong></p>
                <div className="grid grid-cols-1 gap-2 text-[10px] font-bold uppercase tracking-widest text-slate-400">
                  <span>✔ Recover from jet lag</span>
                  <span>✔ Set up housing & bank</span>
                  <span>✔ Adjust emotionally</span>
                </div>
              </div>
            </div>
          </section>

          {/* PART 2: 2-3 Months */}
          <section className="p-10 bg-blue-600 rounded-[3.5rem] text-white shadow-xl shadow-blue-100">
            <h3 className="text-sm font-black text-blue-200 uppercase tracking-[0.3em] mb-8">Part 2 — 2–3 Months Before Travel</h3>
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <h4 className="text-xl font-bold mb-6 italic">4️⃣ Route Research</h4>
                <p className="text-sm text-blue-100 mb-6">Factors to compare: Total travel time, number of layovers, transit visa rules, and baggage allowance.</p>
                <div className="bg-white/10 p-5 rounded-2xl border border-white/20 italic text-xs">
                  💡 Tip: Choose arrival airport based on distance to campus and university pickup availability.
                </div>
              </div>
              <div>
                <h4 className="text-xl font-bold mb-6 italic">6️⃣ Book Early — 8–12 Weeks</h4>
                <p className="text-sm text-blue-100 leading-relaxed">Prices rise quickly and seats sell out. Ensure you have 2 checked bags and flexible date options if possible.</p>
              </div>
            </div>
          </section>

          {/* PART 3 & 4: Logistics & Docs */}
          <div className="grid md:grid-cols-2 gap-8">
            <div className="p-10 bg-white rounded-[3rem] border border-blue-50 shadow-sm">
              <h3 className="text-sm font-black text-blue-600 uppercase mb-6 tracking-widest">Part 3: 1–2 Months</h3>
              <h4 className="text-xl font-bold mb-4 text-slate-900">🚗 Airport Transport</h4>
              <p className="text-xs text-slate-500 mb-6 font-medium italic">Plan BEFORE flying. Register for University Shuttles (BEST) or research Uber/Metro costs.</p>
              <h4 className="text-xl font-bold mb-4 text-slate-900">🏠 Confirm Housing</h4>
              <p className="text-xs text-slate-500 font-medium italic">Verify key pickup, move-in hours, and contact person. Some dorms close at night!</p>
            </div>
            
            <div className="p-10 bg-slate-100 rounded-[3rem]">
              <h3 className="text-sm font-black text-slate-400 uppercase mb-6 tracking-widest">Part 4: 2–3 Weeks</h3>
              <h4 className="text-xl font-bold mb-6 text-slate-900">📄 The Travel Folder</h4>
              <p className="text-xs font-bold text-blue-600 mb-4 uppercase tracking-widest italic">Carry-on Only (Required):</p>
              <ul className="space-y-2 text-xs font-bold text-slate-700 uppercase tracking-tighter">
                <li>• Passport (Valid 6+ Months)</li>
                <li>• F-1 Visa & Signed I-20 Form</li>
                <li>• Admission Letter & SEVIS Receipt</li>
                <li>• Financial Proof & US Cash ($100-$300)</li>
              </ul>
            </div>
          </div>

          {/* PART 5 & 6 & 7: Final Countdown */}
          <div className="bg-white/40 backdrop-blur-md p-12 rounded-[4rem] border border-white">
            <h3 className="text-sm font-black text-blue-600 uppercase text-center mb-12 tracking-widest italic">The Final Countdown</h3>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="space-y-4">
                <h5 className="font-bold text-slate-900">1 Week Before</h5>
                <p className="text-[11px] text-slate-500 leading-relaxed">Pack meds, chargers, and snacks. Screenshot all bookings and weather reports. Check bag weight limits.</p>
              </div>
              <div className="space-y-4">
                <h5 className="font-bold text-slate-900">Travel Day</h5>
                <p className="text-[11px] text-slate-500 leading-relaxed">Arrive 3 hours early. Present passport at check-in. Stay hydrated. Follow security rules.</p>
              </div>
              <div className="space-y-4">
                <h5 className="font-bold text-slate-900">After Landing</h5>
                <p className="text-[11px] text-slate-500 leading-relaxed">Pass through immigration, collect bags, pass customs, and meet your pre-arranged pickup.</p>
              </div>
            </div>
          </div>

          {/* --- COMMON MISTAKES (HIGH VISIBILITY) --- */}
          <section className="py-6">
            <div className="bg-white p-2 rounded-[3.5rem] shadow-[0_0_50px_rgba(239,68,68,0.1)] border border-red-50">
              <div className="bg-red-50/40 p-10 md:p-14 rounded-[3rem] border border-red-100">
                <div className="flex items-center gap-4 mb-8">
                  <span className="text-4xl animate-pulse">⚠️</span>
                  <h3 className="text-3xl font-bold text-red-900 tracking-tighter italic uppercase">Mistakes to Avoid</h3>
                </div>
                <div className="grid md:grid-cols-3 gap-6 text-[11px] font-bold text-red-800 uppercase tracking-tight">
                  <div className="space-y-3">
                    <p>❌ Arriving too early (Visa Violation)</p>
                    <p>❌ Docs in checked baggage</p>
                  </div>
                  <div className="space-y-3">
                    <p>❌ Not planning airport transport</p>
                    <p>❌ Booking flights too late</p>
                  </div>
                  <div className="space-y-3">
                    <p>❌ Ignoring transit visa rules</p>
                    <p>❌ Arriving right before classes</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Master Checklist Summary */}
          <div className="p-12 bg-white rounded-[4rem] border border-blue-50 shadow-xl relative overflow-hidden group">
            <h3 className="text-2xl font-bold mb-10 text-center text-slate-900">✅ Master Readiness Timeline</h3>
            <div className="space-y-2 max-w-xl mx-auto">
              {[
                { time: '3-4 Months', task: 'Confirm dates & entry window' },
                { time: '2-3 Months', task: 'Book flights & routes' },
                { time: '1-2 Months', task: 'Arrange housing & transport' },
                { time: '2-3 Weeks', task: 'Prepare document folder' },
                { time: '1 Week', task: 'Pack & confirm everything' },
                { time: 'Travel Day', task: 'Arrive early & fly' }
              ].map((item, idx) => (
                <div key={idx} className="flex justify-between items-center p-4 border-b border-blue-50 text-[11px] font-bold uppercase">
                  <span className="text-blue-500 tracking-widest">{item.time}</span>
                  <span className="text-slate-700 tracking-tight">{item.task}</span>
                </div>
              ))}
            </div>
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