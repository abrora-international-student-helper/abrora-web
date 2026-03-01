'use client'

import React from 'react'
import Link from 'next/link'

export default function HealthSafetyPage() {
  const healthItems = [
    {
      title: "First Aid & Meds",
      icon: "💊",
      items: [
        { name: "Pain Relievers", desc: "Ibuprofen or Acetaminophen for headaches or travel fatigue." },
        { name: "Cold & Flu", desc: "Multi-symptom relief for the 'Orientation Cold' common in new crowds." },
        { name: "Band-Aids", desc: "Various sizes for blisters from walking across large campuses." }
      ]
    },
    {
      title: "Sanitation & PPE",
      icon: "🧼",
      items: [
        { name: "Hand Sanitizer", desc: "Portable bottles for travel and public transit." },
        { name: "Disinfecting Wipes", desc: "Great for cleaning dorm desks and shared surfaces on Day 1." },
        { name: "Face Masks", desc: "Optional but highly recommended for crowded lecture halls or flights." }
      ]
    }
  ];

  return (
    <div className="min-h-screen relative overflow-hidden bg-[#F4F7FA] text-[#2D312E] py-16 px-6 lg:px-24 font-sans">
      
      {/* Aesthetic Background */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white via-[#F0FDF4] to-[#F4F7FA] -z-10" />
      <div className="absolute top-[-5%] right-[-5%] w-[600px] h-[600px] bg-green-100/40 rounded-full blur-[120px] -z-10" />

      <div className="max-w-5xl mx-auto relative z-10">
        
        {/* Navigation */}
        <Link href="/shopping" className="group inline-flex items-center gap-2 mb-12 text-[10px] font-bold uppercase tracking-[0.2em] text-green-600 hover:text-green-800 transition-all bg-white/80 px-5 py-2.5 rounded-full border border-green-100 shadow-sm">
          <span className="group-hover:-translate-x-1 transition-transform">←</span> Back to Shopping Hub
        </Link>

        {/* Hero Header */}
        <header className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">🛡️</span>
            <span className="text-[10px] font-bold uppercase tracking-widest text-green-600 bg-green-50 px-3 py-1 rounded-full border border-green-100">Setup 05</span>
          </div>
          <h1 className="text-6xl md:text-8xl font-bold tracking-tighter mb-8 leading-none bg-gradient-to-r from-slate-900 via-green-900 to-green-800 bg-clip-text text-transparent">
            Health & <br /> Safety.
          </h1>
          <p className="text-xl text-slate-500 max-w-2xl leading-relaxed font-medium italic border-l-4 border-green-400 pl-6">
            "Your well-being is the foundation of your success. Pack your core medications and maintain a clean environment from Day 1."
          </p>
        </header>

        {/* --- GRID --- */}
        <div className="space-y-10 mb-16">
          {healthItems.map((section, idx) => (
            <div key={idx} className="bg-white/80 backdrop-blur-md p-10 rounded-[3rem] border border-white shadow-sm">
              <h3 className="text-2xl font-bold mb-8 flex items-center gap-3 text-slate-800">
                <span className="text-2xl">{section.icon}</span> {section.title}
              </h3>
              <div className="grid md:grid-cols-3 gap-8">
                {section.items.map((item, i) => (
                  <div key={i} className="space-y-2">
                    <p className="font-bold text-green-600 text-sm">{item.name}</p>
                    <p className="text-xs text-slate-500 leading-relaxed italic">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* Prescription & Insurance Section */}
          <div className="grid md:grid-cols-2 gap-8">
            <div className="p-10 bg-slate-900 text-white rounded-[3.5rem] shadow-xl">
              <h4 className="text-xl font-bold mb-4 italic">💊 Prescription Safety</h4>
              <p className="text-sm text-slate-400 mb-6 font-medium">Critical rules for bringing medication into the U.S.</p>
              <ul className="text-xs space-y-3 text-green-400 font-bold uppercase tracking-widest">
                <li>• Keep in original packaging</li>
                <li>• Carry a copy of the prescription</li>
                <li>• Pack in carry-on (never checked)</li>
                <li>• 90-day supply maximum (usually)</li>
              </ul>
            </div>
            <div className="p-10 bg-green-600 text-white rounded-[3.5rem] shadow-xl shadow-green-100">
              <h4 className="text-xl font-bold mb-4 italic">🏥 Safety Tips</h4>
              <ul className="text-sm space-y-3 text-green-100 font-medium">
                <li>✔ Locate the nearest CVS or Walgreens to your dorm immediately.</li>
                <li>✔ Save the University Health Services number in your phone.</li>
                <li>✔ Keep your health insurance card (or digital copy) ready at all times.</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Checklist Summary */}
        <div className="p-12 bg-white rounded-[4rem] border border-green-50 shadow-xl text-center">
          <h3 className="text-2xl font-bold mb-10 text-slate-900">✅ Medical Survival Kit</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {['Thermometer', 'Pain Relievers', 'Band-Aids', 'Hand Sanitizer', 'Wipes', 'Masks', 'Prescriptions', 'Insurance Info'].map((item, idx) => (
              <div key={idx} className="flex flex-col items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-[10px] font-bold">✔</div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tight text-center">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-24 pt-12 border-t border-green-100 text-center">
          <p className="text-[10px] font-bold text-green-300 uppercase tracking-[0.6em]">YoursTruely Wellness Protocol • 2026</p>
        </footer>
      </div>
    </div>
  )
}