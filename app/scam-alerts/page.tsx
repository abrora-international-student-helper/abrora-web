'use client'

import React, { useState } from 'react'

export default function ScamAlertPage() {
  const [activeStep, setActiveStep] = useState(0);

  const scams = [
    {
      title: 'Digital Credentials',
      icon: '🔐',
      content: 'Never share OTP, PIN, or passwords. No official agency will ever ask for them via phone or text.',
      tag: 'Critical',
      color: 'bg-white/40'
    },
    {
      title: 'Phishing Links',
      icon: '🔗',
      content: 'Unknown links in SMS or WhatsApp can install keyloggers. Always check the sender domain.',
      tag: 'High Risk',
      color: 'bg-white/40'
    },
    {
      title: 'Fake Job Offers',
      icon: '💼',
      content: 'Beware of internships asking for "fees." Verify via official university career portals only.',
      tag: 'Common',
      color: 'bg-white/40'
    },
    {
      title: 'Tech Support',
      icon: '💻',
      content: 'Calls claiming your laptop has a "virus" are fake. They want remote access to your data.',
      tag: 'Scam',
      color: 'bg-white/40'
    },
    {
      title: 'UPI & Payments',
      icon: '💸',
      content: 'Receiving money is automatic. If you enter a PIN, you are AUTHORIZING a payment out.',
      tag: 'Financial',
      color: 'bg-white/40'
    },
    {
      title: 'Impersonation',
      icon: '🎭',
      content: 'Scammers pretend to be professors or embassy staff. Verify via an official directory.',
      tag: 'Social',
      color: 'bg-white/40'
    }
  ]

  const safetyTips = [
    { title: 'The 10-Minute Rule', desc: 'If a caller creates a sense of "extreme urgency," hang up. Wait 10 minutes and call the official organization back using a number from their verified website.' },
    { title: 'Verify the Sender', desc: 'Check for subtle typos in email addresses (e.g., @universlty.edu instead of @university.edu). Scammers rely on you being in a hurry.' },
    { title: 'Use MFA', desc: 'Enable Multi-Factor Authentication on all accounts. Even if a scammer gets your password, they cannot enter without the second physical device code.' },
    { title: 'Screen Your Calls', desc: 'Let unknown numbers go to voicemail. Government agencies like the IRS or USCIS will almost always send official physical mail before calling.' }
  ]

  const reportSteps = [
    { title: 'Freeze Activity', desc: 'Immediately stop all communication and block the sender on all channels.' },
    { title: 'Gather Proof', desc: 'Take clear screenshots of the conversation, links, and the scammer’s profile info.' },
    { title: 'Alert Authority', desc: 'Contact your University DSO and report the incident to the campus security.' },
    { title: 'Cyber Report', desc: 'File a formal complaint on the government’s national cybercrime portal.' }
  ]

  return (
    <div className="min-h-screen relative overflow-hidden bg-[#F9F9F7] text-[#2D312E] py-16 px-6 lg:px-24">
      
      {/* --- Optimized Quad-Mesh Background --- */}
      <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[50%] bg-[#E8F0EE] rounded-full blur-[120px] opacity-80 animate-pulse" />
      <div className="absolute top-[10%] right-[-10%] w-[50%] h-[50%] bg-[#E3E9F2] rounded-full blur-[120px] opacity-70" />
      <div className="absolute bottom-[-10%] left-[20%] w-[40%] h-[40%] bg-[#FDF6F0] rounded-full blur-[100px] opacity-60" />
      <div className="absolute bottom-[10%] right-[10%] w-[35%] h-[45%] bg-[#F3EBF5] rounded-full blur-[110px] opacity-50" />
      
      {/* Subtle Noise Texture Overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header Section */}
        <header className="mb-20 text-center md:text-left">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900 text-white text-[10px] font-bold uppercase tracking-[0.2em] mb-8 shadow-xl">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
            </span>
            Live Security Update
          </div>
          <h1 className="text-6xl md:text-8xl font-light tracking-tighter mb-6 leading-[0.9]">
            Stay safe. <br />
            <span className="font-semibold text-slate-900">Stay smart.</span>
          </h1>
          <p className="text-xl text-gray-500 max-w-2xl leading-relaxed">
            International students are primary targets for digital fraud. Recognize the patterns and protect your digital identity with YoursTruely.
          </p>
        </header>

        {/* Bento Grid: Scam Library */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-24">
          {scams.map((scam, index) => (
            <div 
              key={index}
              className={`${scam.color} backdrop-blur-xl border border-white/60 p-10 rounded-[3rem] hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 group`}
            >
              <div className="flex justify-between items-start mb-10">
                <div className="text-5xl group-hover:rotate-12 transition-transform duration-500">{scam.icon}</div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 bg-white/80 px-3 py-1 rounded-full border border-white">
                  {scam.tag}
                </span>
              </div>
              <h3 className="text-xl font-bold mb-3 text-slate-800 tracking-tight">{scam.title}</h3>
              <p className="text-sm text-slate-600 leading-relaxed font-medium">
                {scam.content}
              </p>
            </div>
          ))}
        </div>

        {/* NEW: Prevention & Safety Section */}
        <div className="mb-24">
          <h3 className="text-sm font-bold uppercase tracking-[0.3em] text-slate-400 mb-10 text-center md:text-left">Preventative Measures</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {safetyTips.map((tip, idx) => (
              <div key={idx} className="flex gap-6 p-8 rounded-[2.5rem] bg-white/20 border border-white/40 shadow-sm transition-all hover:bg-white/40">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">
                  {idx + 1}
                </div>
                <div>
                  <h4 className="font-bold text-slate-800 mb-2">{tip.title}</h4>
                  <p className="text-sm text-slate-500 leading-relaxed">{tip.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Action Protocol (Interactive Response) */}
        <section className="bg-slate-900 text-white rounded-[4rem] p-12 md:p-20 shadow-2xl relative overflow-hidden">
          <div className="max-w-3xl relative z-10">
            <h2 className="text-4xl font-bold mb-8">Incident Protocol</h2>
            <p className="text-slate-400 mb-10 text-lg leading-relaxed">
              If you have shared information or sent money, every second counts. Follow this priority list:
            </p>
            
            <div className="space-y-3">
              {reportSteps.map((step, idx) => (
                <button 
                  key={idx}
                  onClick={() => setActiveStep(idx)}
                  className={`w-full text-left p-6 rounded-[2rem] transition-all duration-500 border ${
                    activeStep === idx 
                    ? 'bg-blue-600 border-blue-400 shadow-xl translate-x-2' 
                    : 'bg-white/5 border-white/10 hover:bg-white/10'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <span className={`text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center ${activeStep === idx ? 'bg-white text-blue-600' : 'bg-slate-800 text-slate-400'}`}>
                      0{idx + 1}
                    </span>
                    <h4 className="font-bold text-sm uppercase tracking-widest">{step.title}</h4>
                  </div>
                  {activeStep === idx && (
                    <p className="mt-4 text-sm text-blue-50 leading-relaxed animate-in fade-in slide-in-from-top-1">
                      {step.desc}
                    </p>
                  )}
                </button>
              ))}
            </div>
          </div>
          
          <div className="absolute top-[-100px] left-[-100px] w-96 h-96 bg-blue-600 rounded-full blur-[150px] opacity-20" />
        </section>

        {/* Footer */}
        <footer className="mt-24 pt-12 border-t border-gray-200/50 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-gray-400 text-[10px] font-bold tracking-[0.4em] uppercase">
            YoursTruely Safety Hub • 2026
          </div>
          <button 
            onClick={() => window.location.href = '/dashboard'}
            className="group flex items-center gap-3 text-xs font-bold tracking-widest text-gray-500 hover:text-slate-900 transition-all uppercase"
          >
            <span className="group-hover:-translate-x-2 transition-transform duration-300">←</span> Dashboard
          </button>
        </footer>
      </div>
    </div>
  )
}