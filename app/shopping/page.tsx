'use client'

import React, { useState } from 'react'

export default function DeparturePlannerPage() {
  const [activeStep, setActiveStep] = useState(0);
  const [activeCategory, setActiveCategory] = useState('flights');

  const categories = {
    flights: [
      {
        title: 'Book your flight properly',
        icon: '✈️',
        content: 'Arrive before orientation or classes start. Students with F-1 visa can enter the US up to 30 days before program start date. Plan how you will travel from airport to your accommodation.',
        tag: 'Step 1',
        color: 'bg-white/40'
      },
      {
        title: 'Documents in HAND BAG',
        icon: '👜',
        content: 'Passport (valid 6+ months), Student visa, I-20/DS-2019, SEVIS receipt, Admission letter, Proof of money, and Stay Address. These are required for entry.',
        tag: 'MUST SHOW',
        color: 'bg-white/40'
      },
      {
        title: 'Customs Rules (Important!)',
        icon: '🛂',
        content: 'You must declare what you bring. No fresh food, fruits, meat, plants, weapons, or illegal drugs. If carrying over $10,000, you must declare it.',
        tag: 'Warning',
        color: 'bg-white/40'
      }
    ],
    shopping: [
      {
        title: 'First-week essentials',
        icon: '🛏️',
        content: 'Buy immediately: Bedsheets, pillow, blanket, toiletries (soap, shampoo, toothpaste), laundry detergent, towels, and basic kitchen items (plates, spoon, pan).',
        tag: 'Buy First',
        color: 'bg-white/40'
      },
      {
        title: 'Important setup items',
        icon: '📱',
        content: 'US SIM card or phone plan, Power adapter (Type A/B), and Extension board. Note: The US uses 120V electricity and different plug shapes.',
        tag: 'Utility',
        color: 'bg-white/40'
      },
      {
        title: 'Clothing & Food',
        icon: '🥘',
        content: 'Buy winter jackets, comfortable shoes, and seasonal clothes. For food, get first-week groceries and only bring allowed snacks from home.',
        tag: 'Living',
        color: 'bg-white/40'
      }
    ]
  };

  const detailedGuide = [
    { title: 'What happens when you land', desc: 'Officers from U.S. Customs and Border Protection will check documents, ask basic questions (school, major, stay), and take fingerprints/photo. This takes a few minutes if documents are correct.' },
    { title: 'Pack smart for travel', desc: 'Carry in cabin bag: Documents, medicines with prescription, phone charger, and basic clothes for 1–2 days. Check airline baggage limits before packing.' },
    { title: 'Before leaving home', desc: 'Download offline maps, save university contact number, carry $100–$300 US cash, and arrange airport pickup if possible.' },
    { title: 'Common stores to use', desc: 'Walmart (cheap everyday items), Target (home, clothes, electronics), and Amazon (online shopping) are the primary stores students use.' }
  ];

  const firstWeekTasks = [
    { title: 'University Orientation', desc: 'Attend university orientation—this is critical for your legal status and campus integration.' },
    { title: 'Financial & Identity', desc: 'Open a US bank account and get your physical student ID card as soon as possible.' },
    { title: 'Health & Transport', desc: 'Understand your health insurance coverage and get a local transport card for easier commuting.' },
    { title: 'Digital Organization', desc: 'Keep digital copies of all your documents stored securely for easy access.' }
  ];

  const currentItems = activeCategory === 'flights' ? categories.flights : categories.shopping;

  return (
    <div className="min-h-screen relative overflow-hidden bg-[#F9F9F7] text-[#2D312E] py-16 px-6 lg:px-24">
      
      {/* --- Optimized Quad-Mesh Background --- */}
      <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[50%] bg-[#E8F0EE] rounded-full blur-[120px] opacity-80 animate-pulse" />
      <div className="absolute top-[10%] right-[-10%] w-[50%] h-[50%] bg-[#E3E9F2] rounded-full blur-[120px] opacity-70" />
      <div className="absolute bottom-[-10%] left-[20%] w-[40%] h-[40%] bg-[#FDF6F0] rounded-full blur-[100px] opacity-60" />
      <div className="absolute bottom-[10%] right-[10%] w-[35%] h-[45%] bg-[#F3EBF5] rounded-full blur-[110px] opacity-50" />
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header */}
        <header className="mb-20 text-center md:text-left">
          <div className="inline-flex items-center gap-4 mb-8">
            <div className="px-4 py-1.5 rounded-full bg-slate-900 text-white text-[10px] font-bold uppercase tracking-[0.2em] shadow-xl">
              🇺🇸 First Time Coming to the USA
            </div>
            <div className="flex bg-white/50 backdrop-blur-md p-1 rounded-full border border-white/60">
              <button onClick={() => setActiveCategory('flights')} className={`px-6 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all ${activeCategory === 'flights' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-400'}`}>Part 1: Travel</button>
              <button onClick={() => setActiveCategory('shopping')} className={`px-6 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all ${activeCategory === 'shopping' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-400'}`}>Part 2: Shopping</button>
            </div>
          </div>
          <h1 className="text-6xl md:text-8xl font-light tracking-tighter mb-6 leading-[0.9]">
            Simple Guide. <br />
            <span className="font-semibold text-slate-900">International Students.</span>
          </h1>
        </header>

        {/* Bento Grid: Core Rules */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-24">
          {currentItems.map((item, index) => (
            <div key={index} className={`${item.color} backdrop-blur-xl border border-white/60 p-10 rounded-[3rem] hover:shadow-2xl transition-all duration-500 group`}>
              <div className="flex justify-between items-start mb-10">
                <div className="text-5xl group-hover:rotate-12 transition-transform duration-500">{item.icon}</div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 bg-white/80 px-3 py-1 rounded-full border border-white">{item.tag}</span>
              </div>
              <h3 className="text-xl font-bold mb-3 text-slate-800 tracking-tight">{item.title}</h3>
              <p className="text-sm text-slate-600 leading-relaxed font-medium">{item.content}</p>
            </div>
          ))}
        </div>

        {/* Detailed Breakdown Section */}
        <div className="mb-24">
          <h3 className="text-sm font-bold uppercase tracking-[0.3em] text-slate-400 mb-10">Comprehensive Instructions</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {detailedGuide.map((tip, idx) => (
              <div key={idx} className="flex gap-6 p-8 rounded-[2.5rem] bg-white/20 border border-white/40 shadow-sm transition-all hover:bg-white/40">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">{idx + 1}</div>
                <div>
                  <h4 className="font-bold text-slate-800 mb-2">{tip.title}</h4>
                  <p className="text-sm text-slate-500 leading-relaxed">{tip.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* First Week Tasks Protocol */}
        <section className="bg-slate-900 text-white rounded-[4rem] p-12 md:p-20 shadow-2xl relative overflow-hidden">
          <div className="max-w-3xl relative z-10">
            <h2 className="text-4xl font-bold mb-8">⭐ VERY IMPORTANT — First Week Tasks</h2>
            <p className="text-slate-400 mb-10 text-lg leading-relaxed">Do these immediately after arriving to ensure a smooth transition:</p>
            <div className="space-y-3">
              {firstWeekTasks.map((step, idx) => (
                <button key={idx} onClick={() => setActiveStep(idx)} className={`w-full text-left p-6 rounded-[2rem] transition-all duration-500 border ${activeStep === idx ? 'bg-blue-600 border-blue-400' : 'bg-white/5 border-white/10'}`}>
                  <div className="flex items-center gap-4">
                    <span className={`text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center ${activeStep === idx ? 'bg-white text-blue-600' : 'bg-slate-800 text-slate-400'}`}>✔</span>
                    <h4 className="font-bold text-sm uppercase tracking-widest">{step.title}</h4>
                  </div>
                  {activeStep === idx && <p className="mt-4 text-sm text-blue-50 leading-relaxed animate-in fade-in">{step.desc}</p>}
                </button>
              ))}
            </div>
          </div>
          <div className="absolute top-[-100px] left-[-100px] w-96 h-96 bg-blue-600 rounded-full blur-[150px] opacity-20" />
        </section>

        {/* Quick Summary Section */}
        <div className="mt-24 p-12 bg-white/50 backdrop-blur-xl rounded-[4rem] border border-white/60">
          <h3 className="text-2xl font-bold mb-10 text-center">👍 Quick Summary (Easy to Remember)</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h4 className="font-bold text-blue-600 uppercase tracking-widest text-xs mb-6">Flights Checklist</h4>
              <ul className="space-y-4 text-sm text-slate-600 font-medium">
                <li>• Carry all documents in hand bag</li>
                <li>• Answer immigration questions clearly</li>
                <li>• Follow customs rules</li>
                <li>• Plan airport transport</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-blue-600 uppercase tracking-widest text-xs mb-6">Shopping Checklist</h4>
              <ul className="space-y-4 text-sm text-slate-600 font-medium">
                <li>• Buy bedding, toiletries, SIM, groceries</li>
                <li>• Get winter clothes if needed</li>
                <li>• Set up phone, bank, and student ID</li>
                <li>• Tip: Buy winter clothes in the US (cheaper)</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-24 pt-12 border-t border-gray-200/50 text-center">
          <div className="text-gray-400 text-[10px] font-bold tracking-[0.4em] uppercase">YoursTruely Hub • 2026</div>
        </footer>
      </div>
    </div>
  )
}