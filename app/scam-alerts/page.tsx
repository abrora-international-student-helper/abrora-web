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

        {/* Educational Insight Section */}
        <div className="mb-24">
          <h3 className="text-sm font-bold text-center uppercase tracking-[0.3em] text-slate-400 mb-10">How Phishing Works</h3>
          <div className="bg-white/30 backdrop-blur-md rounded-[4rem] p-10 border border-white/40 shadow-inner flex flex-col items-center">
            
            <p className="text-gray-500 text-sm italic mt-8 text-center max-w-md leading-relaxed">
              Cyber-criminals often use "Spoofing" to make an email address look official. Always hover over links before clicking.
            </p>
          </div>
        </div>

        {/* Action Protocol (Interactive Response) */}
        <section className="bg-slate-900 text-white rounded-[4rem] p-12 md:p-20 shadow-2xl relative overflow-hidden">
          <div className="grid lg:grid-cols-2 gap-16 relative z-10">
            <div>
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

            <div className="flex flex-col justify-center items-center text-center p-10 bg-white/5 backdrop-blur-lg rounded-[3.5rem] border border-white/10 shadow-inner">
              <div className="w-20 h-20 bg-blue-500 rounded-full flex items-center justify-center text-4xl mb-6 shadow-lg shadow-blue-500/30">
                🛡️
              </div>
              <h3 className="text-2xl font-bold mb-4">Official Help Desk</h3>
              <p className="text-slate-400 text-sm mb-10 leading-relaxed max-w-xs">
                Need to file an official government report? Our portal connects you directly to the national cybercrime unit.
              </p>
              <button className="w-full py-5 bg-white text-slate-900 rounded-full font-bold text-sm hover:bg-blue-400 hover:text-white transition-all transform active:scale-95 shadow-xl">
                Open Reporting Portal
              </button>
            </div>
          </div>
          
          {/* Background Decorative Bloom */}
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