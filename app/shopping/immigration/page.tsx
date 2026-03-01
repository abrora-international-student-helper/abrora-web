'use client'

import React from 'react'
import Link from 'next/link'

export default function ImmigrationDetailPage() {
  const interviewQuestions = [
    { topic: "School", question: "Which university are you attending?", icon: "🏫" },
    { topic: "Program", question: "What is your major?", icon: "📚" },
    { topic: "Duration", question: "How long will you stay?", icon: "⏳" },
    { topic: "Accommodation", question: "Where will you live?", icon: "🏠" },
    { topic: "Funding", question: "Who is paying for your tuition?", icon: "💰" },
    { topic: "Travel Plans", question: "Have you been to the U.S. before?", icon: "✈️" },
  ];

  return (
    <div className="min-h-screen relative overflow-hidden bg-[#F4F7FA] text-[#2D312E] py-16 px-6 lg:px-24 font-sans">
      
      {/* Aesthetic Background */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white via-[#EAF2FA] to-[#F4F7FA] -z-10" />
      <div className="absolute top-[-5%] right-[-5%] w-[600px] h-[600px] bg-blue-200/30 rounded-full blur-[120px] -z-10" />

      <div className="max-w-5xl mx-auto relative z-10">
        
        {/* Navigation */}
        <Link href="/shopping" className="group inline-flex items-center gap-2 mb-12 text-[10px] font-bold uppercase tracking-[0.2em] text-blue-500 hover:text-blue-800 transition-all bg-white/80 px-5 py-2.5 rounded-full border border-blue-100 shadow-sm">
          <span className="group-hover:-translate-x-1 transition-transform">←</span> Back to Hub
        </Link>

        {/* Hero Header */}
        <header className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">🛂</span>
            <span className="text-[10px] font-bold uppercase tracking-widest text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-100">Protocol 04</span>
          </div>
          <h1 className="text-6xl md:text-8xl font-bold tracking-tighter mb-8 leading-none bg-gradient-to-r from-slate-900 via-blue-900 to-blue-800 bg-clip-text text-transparent">
            Landing & <br /> Immigration.
          </h1>
          <p className="text-xl text-slate-500 max-w-2xl leading-relaxed font-medium italic border-l-4 border-blue-400 pl-6">
            "The final hurdle. This guide explains exactly what happens from the moment you land until you exit the airport."
          </p>
        </header>

        {/* --- STEP 1: DEPARTURE --- */}
        <section className="mb-12 bg-white/80 backdrop-blur-md p-10 rounded-[3rem] border border-white shadow-sm">
          <h3 className="text-sm font-black text-blue-600 uppercase tracking-widest mb-6 italic">1. Departure Airport</h3>
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="flex-1">
              <p className="font-bold text-slate-800 mb-2 underline decoration-blue-200 underline-offset-4 text-lg">Arrive 3 Hours Early</p>
              <p className="text-sm text-slate-500 leading-relaxed italic">International flights close check-in 45–60 mins before departure. Arriving early covers security, document verification, and long lines.</p>
            </div>
            <div className="bg-blue-50 px-8 py-4 rounded-2xl border border-blue-100 text-[10px] font-bold text-blue-700 uppercase">
              Tip: Reduce Stress — Arrive Early
            </div>
          </div>
        </section>

        {/* --- STEP 2 & 3: THE ARRIVAL --- */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="p-10 bg-slate-900 text-white rounded-[3.5rem] shadow-xl">
            <h3 className="text-xl font-bold mb-6 italic">✈️ 2. Arrival in the U.S.</h3>
            <p className="text-sm text-slate-400 mb-6 leading-relaxed">Proceed immediately to U.S. Customs and Border Protection (CBP) for entry checks. Fingerprints and photos are standard for all travelers.</p>
            <div className="p-5 bg-white/5 rounded-2xl border border-white/10 text-[10px] font-bold text-blue-400 uppercase tracking-widest">
              Standard: Digital Fingerprints & Identification Photo
            </div>
          </div>

          <div className="p-10 bg-white rounded-[3.5rem] border border-blue-50 shadow-sm">
            <h3 className="text-xl font-bold mb-6 text-slate-800">📄 3. Document Check</h3>
            <p className="text-xs text-slate-500 mb-6 font-medium italic">Keep these in your carry-on folder. Officers verify your academic purpose and student status.</p>
            <ul className="text-[10px] font-bold text-slate-600 uppercase tracking-tight space-y-2">
              <li>✔ Passport & F-1/J-1 Visa</li>
              <li>✔ Signed I-20 or DS-2019</li>
              <li>✔ SEVIS Receipt & Admission Letter</li>
              <li>✔ Financial Proof & Housing Address</li>
            </ul>
          </div>
        </div>

        {/* --- STEP 4: INTERVIEW QUESTIONS --- */}
        <section className="mb-12">
          <div className="bg-white p-10 md:p-14 rounded-[4rem] border border-blue-50 shadow-sm">
            <h3 className="text-2xl font-bold mb-10 text-center text-slate-900 italic">❓ 4. Common CBP Questions</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {interviewQuestions.map((item, idx) => (
                <div key={idx} className="p-6 bg-slate-50 rounded-3xl border border-slate-100 transition-all hover:border-blue-200 group">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-xl grayscale group-hover:grayscale-0 transition-all">{item.icon}</span>
                    <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest">{item.topic}</span>
                  </div>
                  <p className="text-xs font-bold text-slate-700 italic">"{item.question}"</p>
                </div>
              ))}
            </div>
            <div className="mt-10 flex flex-wrap justify-center gap-4 text-[9px] font-bold text-slate-400 uppercase tracking-widest">
              <span>Answer Truthfully</span>
              <span>•</span>
              <span>Speak Calmly</span>
              <span>•</span>
              <span>Be Concise</span>
            </div>
          </div>
        </section>

        {/* --- STEP 6: SECONDARY INSPECTION --- */}
        <section className="mb-12 relative overflow-hidden">
          <div className="bg-white p-10 md:p-14 rounded-[4rem] border-2 border-slate-100">
             <div className="flex flex-col md:flex-row gap-12 items-start relative z-10">
                <div className="flex-1">
                  <h3 className="text-2xl font-bold mb-6 text-slate-900 underline decoration-red-200 underline-offset-8">⚠️ 6. Secondary Inspection</h3>
                  <p className="text-sm text-slate-500 mb-6 leading-relaxed">It is <span className="font-bold">routine</span> and does not mean denial. Usually occurs if documents need extra verification or name info is inconsistent.</p>
                  <div className="space-y-3">
                    <p className="text-xs font-bold text-slate-800 uppercase tracking-widest">Action Plan:</p>
                    <ul className="text-xs text-slate-500 space-y-2 italic">
                      <li>• Stay calm and polite — Do not panic</li>
                      <li>• Provide extra proof (SEVIS, Financials)</li>
                      <li>• Answer all questions truthfully</li>
                    </ul>
                  </div>
                </div>
                <div className="md:w-1/3 bg-red-50 p-8 rounded-[2.5rem] border border-red-100 text-center flex flex-col justify-center">
                   <p className="text-[10px] font-black text-red-600 uppercase mb-2 tracking-[0.2em]">Rule #1</p>
                   <p className="text-xs text-red-800 font-bold leading-relaxed italic">"Secondary inspection is a verification process, not a denial. Most students clear this quickly."</p>
                </div>
             </div>
          </div>
        </section>

        {/* --- STEP 7, 8, 9: FINAL STEPS --- */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="p-8 bg-white/60 rounded-[3rem] border border-white">
            <h5 className="font-bold text-sm mb-4">🧳 7. Baggage</h5>
            <p className="text-[11px] text-slate-500 italic">Collect checked luggage. Report delays immediately at airport claims office.</p>
          </div>
          <div className="p-8 bg-white/60 rounded-[3rem] border border-white">
            <h5 className="font-bold text-sm mb-4">🛃 8. Customs</h5>
            <p className="text-[11px] text-slate-500 italic">Declare food or cash over $10,000. If nothing to declare, proceed to exit.</p>
          </div>
          <div className="p-8 bg-blue-600 text-white rounded-[3rem] shadow-lg shadow-blue-100">
            <h5 className="font-bold text-sm mb-4">🚗 9. Departure</h5>
            <p className="text-[11px] text-blue-100 italic font-medium">Have housing address ready. Meet university shuttle or booked transport.</p>
          </div>
        </div>

        {/* Smooth Landing Tips */}
        <div className="bg-white/40 backdrop-blur-md p-12 rounded-[4rem] border border-white mb-16">
          <h3 className="text-sm font-black text-blue-600 uppercase text-center mb-10 tracking-[0.4em]">Expert Tips for Landing</h3>
          <div className="grid md:grid-cols-2 gap-x-12 gap-y-6 text-[11px] font-bold text-slate-600 uppercase tracking-tight">
            <div className="flex items-center gap-3">
              <span className="text-blue-500">✔</span> Dress neatly and professionally
            </div>
            <div className="flex items-center gap-3">
              <span className="text-blue-500">✔</span> Keep all documents in one folder
            </div>
            <div className="flex items-center gap-3">
              <span className="text-blue-500">✔</span> Answer ONLY what is asked
            </div>
            <div className="flex items-center gap-3">
              <span className="text-blue-500">✔</span> Know your housing address by heart
            </div>
            <div className="flex items-center gap-3">
              <span className="text-blue-500">✔</span> Keep a pen ready for forms
            </div>
            <div className="flex items-center gap-3">
              <span className="text-blue-500">✔</span> Maintain a calm, ready attitude
            </div>
          </div>
        </div>

        {/* Summary Checklist */}
        <div className="p-12 bg-white rounded-[4rem] border border-blue-50 shadow-xl text-center">
          <h3 className="text-2xl font-bold mb-10 text-slate-900">✅ Departure Checklist</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4 max-w-5xl mx-auto">
            {['Passport', 'Visa', 'I-20', 'SEVIS', 'Letter', 'Funds', 'Address', 'Calmness'].map((item, idx) => (
              <div key={idx} className="flex flex-col items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-[10px] font-bold">✔</div>
                <span className="text-[9px] font-black text-slate-400 uppercase tracking-tighter text-center">{item}</span>
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