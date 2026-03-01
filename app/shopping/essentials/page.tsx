'use client'

import React from 'react'
import Link from 'next/link'

export default function DocumentsDetailPage() {
  return (
    <div className="min-h-screen relative overflow-hidden bg-[#F4F7FA] text-[#2D312E] py-16 px-6 lg:px-24 font-sans">
      
      {/* Aesthetic White & Blue Frost Background */}
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
            <span className="text-3xl">👜</span>
            <span className="text-[10px] font-bold uppercase tracking-widest text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-100">Critical Priority</span>
          </div>
          <h1 className="text-6xl md:text-8xl font-bold tracking-tighter mb-8 leading-none bg-gradient-to-r from-slate-900 via-blue-900 to-blue-800 bg-clip-text text-transparent">
            Hand Bag <br /> Documents.
          </h1>
          <p className="text-xl text-slate-500 max-w-2xl leading-relaxed font-medium italic border-l-4 border-blue-400 pl-6">
            "Documents you MUST carry in your hand luggage and present at immigration. Never put these in checked baggage."
          </p>
        </header>

        {/* --- MAIN DOCUMENT SECTIONS --- */}
        <div className="space-y-8 mb-16">
          
          {/* 1. Passport */}
          <div className="bg-white/80 backdrop-blur-md p-10 rounded-[3rem] border border-white shadow-sm">
            <div className="flex flex-col md:flex-row gap-8">
              <div className="flex-1">
                <h3 className="text-2xl font-bold mb-4 flex items-center gap-3 text-slate-800">
                  <span className="text-2xl">🛂</span> 1. Passport
                </h3>
                <p className="text-xs text-blue-600 font-bold uppercase tracking-widest mb-4">Valid at least 6 months</p>
                <p className="text-sm text-slate-600 leading-relaxed mb-4 font-medium">Your primary international identity. Confirms nationality and must match your Visa and I-20 info exactly.</p>
                <div className="space-y-2 text-[11px] font-bold text-slate-500 uppercase tracking-tight">
                  <p>✔ Name spelling matches school records</p>
                  <p>✔ No damage or missing pages</p>
                  <p>✔ Expiration date is far enough away</p>
                </div>
              </div>
              <div className="md:w-1/3 bg-blue-50 p-6 rounded-3xl border border-blue-100">
                <h5 className="text-[10px] font-black uppercase text-blue-800 mb-2 tracking-widest">Important Rule</h5>
                <p className="text-[11px] text-blue-700 leading-relaxed">Most students must have at least 6 months validity remaining from the date of entry.</p>
              </div>
            </div>
          </div>

          {/* 2. Visa */}
          <div className="bg-white/80 backdrop-blur-md p-10 rounded-[3rem] border border-white shadow-sm">
            <h3 className="text-2xl font-bold mb-4 flex items-center gap-3 text-slate-800">
              <span className="text-2xl">🎓</span> 2. F-1 or J-1 Visa
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed mb-6 font-medium">Placed in your passport by the U.S. embassy. It proves you are approved to travel to the U.S., but admission is decided at the airport.</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 text-[10px] font-bold uppercase text-slate-500">Check Visa Type</div>
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 text-[10px] font-bold uppercase text-slate-500">Check Validity Dates</div>
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 text-[10px] font-bold uppercase text-slate-500">Check Number of Entries</div>
            </div>
          </div>

          {/* 3. I-20 / DS-2019 (DARK THEME FOR EMPHASIS) */}
          <div className="bg-slate-900 text-white p-10 md:p-14 rounded-[4rem] relative overflow-hidden shadow-2xl">
            <div className="relative z-10 flex flex-col md:flex-row gap-12">
              <div className="flex-1">
                <h3 className="text-3xl font-bold mb-6 italic underline decoration-blue-500 underline-offset-8">📄 3. I-20 or DS-2019</h3>
                <p className="text-slate-400 text-sm mb-6 leading-relaxed font-medium">Your official school authorization. Officers strictly verify: Program start date, School name, and signatures from you and the DSO.</p>
                <div className="grid grid-cols-2 gap-4 text-[10px] font-bold uppercase tracking-widest text-blue-400">
                  <span>✔ Program Start/End</span>
                  <span>✔ Funding Info</span>
                  <span>✔ SEVIS ID Number</span>
                  <span>✔ Physical Signatures</span>
                </div>
              </div>
              <div className="md:w-1/4 bg-white/5 p-8 rounded-3xl border border-white/10 text-center flex flex-col justify-center">
                 <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2 italic">Officer Tip:</p>
                 <p className="text-xs text-white font-medium italic">"Without this document, you cannot enter as a student."</p>
              </div>
            </div>
            <div className="absolute top-[-50px] right-[-50px] w-64 h-64 bg-blue-600 rounded-full blur-[100px] opacity-20" />
          </div>

          {/* 4 & 5 Grid */}
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white/80 backdrop-blur-md p-10 rounded-[3rem] border border-white">
              <h4 className="font-bold mb-4 text-slate-800">💳 4. SEVIS Fee Receipt</h4>
              <p className="text-sm text-slate-500 leading-relaxed font-medium">A U.S. government system fee. Officers ask for this to confirm your SEVIS record is active. Bring a printed copy.</p>
            </div>
            <div className="bg-white/80 backdrop-blur-md p-10 rounded-[3rem] border border-white">
              <h4 className="font-bold mb-4 text-slate-800">🏫 5. Admission Letter</h4>
              <p className="text-sm text-slate-500 leading-relaxed font-medium">Confirms your academic purpose. Includes program name, start term, and university contact details.</p>
            </div>
          </div>

          {/* 6 & 7 Grid */}
          <div className="grid md:grid-cols-2 gap-8">
            <div className="p-10 bg-blue-600 text-white rounded-[3.5rem] shadow-xl shadow-blue-100">
              <h4 className="text-2xl font-bold mb-4 italic">💰 6. Financial Support</h4>
              <p className="text-sm text-blue-100 mb-6 leading-relaxed">Proof you can afford tuition/living expenses (Bank statements, Scholarship letters, Loan approval).</p>
              <p className="text-[10px] font-bold uppercase bg-white/10 p-3 rounded-xl border border-white/20">Recommended: Show 1 full year of funding.</p>
            </div>
            <div className="p-10 bg-white rounded-[3.5rem] border border-blue-100">
              <h4 className="text-2xl font-bold mb-4 text-slate-800">🏠 7. U.S. Address</h4>
              <p className="text-sm text-slate-500 mb-4 font-medium italic">Officers must know where you will live. Be ready with written street name, City, State, and ZIP.</p>
              <div className="text-[10px] font-bold text-slate-400 grid grid-cols-2 gap-2">
                <span>• Dorm Address</span>
                <span>• Apartment Lease</span>
                <span>• Hotel Address</span>
                <span>• Host Address</span>
              </div>
            </div>
          </div>
        </div>

        {/* --- COMMON MISTAKES (HIGH VISIBILITY) --- */}
        <section className="py-6 mb-16">
          <div className="bg-white p-2 rounded-[3.5rem] shadow-[0_0_50px_rgba(239,68,68,0.08)] border border-red-50">
            <div className="bg-red-50/40 p-10 md:p-14 rounded-[3rem] border border-red-100">
              <div className="flex items-center gap-4 mb-8">
                <span className="text-4xl animate-pulse">⚠️</span>
                <h3 className="text-3xl font-bold text-red-900 tracking-tighter italic uppercase">Mistakes to Avoid</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-[11px] font-bold text-red-800 uppercase tracking-tight">
                <p>❌ Packing docs in checked baggage</p>
                <p>❌ Forgetting to sign I-20 / DS-2019</p>
                <p>❌ Carrying expired passport</p>
                <p>❌ Not knowing your U.S. address</p>
                <p>❌ Bringing only digital copies</p>
              </div>
            </div>
          </div>
        </section>

        {/* Extra & Organization Section */}
        <div className="bg-slate-50 p-12 rounded-[4rem] border border-slate-100 mb-16">
            <div className="grid md:grid-cols-2 gap-12">
                <div>
                    <h5 className="font-bold text-blue-600 mb-6 uppercase text-xs tracking-widest">⭐ Recommended Extra Docs</h5>
                    <ul className="text-xs font-bold text-slate-500 space-y-3">
                        <li>• University contact phone number</li>
                        <li>• Emergency contact person info</li>
                        <li>• Travel itinerary & Transcripts</li>
                        <li>• Health insurance proof</li>
                    </ul>
                </div>
                <div>
                    <h5 className="font-bold text-blue-600 mb-6 uppercase text-xs tracking-widest">❗ How to Organize</h5>
                    <p className="text-xs text-slate-500 leading-relaxed font-medium mb-4">Use a waterproof folder. Keep originals + photocopies. Store digital copies on phone/cloud. Place folder in easy-access pocket.</p>
                </div>
            </div>
        </div>

        {/* Final Checklist */}
        <div className="p-12 bg-white rounded-[4rem] border border-blue-50 shadow-xl text-center">
          <h3 className="text-2xl font-bold mb-10 text-slate-900">✅ Master Hand-Bag Checklist</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {['Passport', 'F-1 Visa', 'I-20', 'SEVIS Receipt', 'Admission Letter', 'Proof of Funds', 'U.S. Address', 'Waterproof Folder'].map((item, idx) => (
              <div key={idx} className="flex flex-col items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-[10px] font-bold font-sans italic">✔</div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">{item}</span>
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