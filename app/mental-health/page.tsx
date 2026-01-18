'use client'

import React, { useState } from 'react'

export default function MentalHealthPage() {
  const [mood, setMood] = useState<string | null>(null);

  return (
    <div className="min-h-screen relative overflow-hidden bg-[#F9F9F7] text-[#2D312E] py-12 px-6 lg:px-24">
      
      {/* Mesh Gradient Background Elements */}
      <div className="absolute top-[-5%] left-[-10%] w-[60%] h-[40%] bg-[#E8F0EE] rounded-full blur-[120px] opacity-70" />
      <div className="absolute bottom-[5%] right-[-5%] w-[45%] h-[50%] bg-[#E3E9F2] rounded-full blur-[100px] opacity-60" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section 1 & 10: Hero & Positive Messaging */}
        <header className="mb-12 text-center md:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100/50 border border-emerald-200 text-emerald-800 text-xs font-bold uppercase tracking-widest mb-6 backdrop-blur-md">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            You are not alone
          </div>
          <h1 className="text-5xl md:text-6xl font-light tracking-tight mb-4">
            Wellness designed for <br />
            <span className="font-semibold text-emerald-900">your global journey.</span>
          </h1>
          <p className="text-lg text-gray-500 max-w-2xl leading-relaxed">
            Transitioning countries is a brave step. Whether you're feeling homesick or just need a breath of fresh air, YoursTruely is your companion.
          </p>
        </header>

        {/* Section 1: Quick Support & Emergency Help (High Visibility) */}
        <div className="mb-12 p-6 bg-red-50/50 border border-red-100 rounded-[2rem] backdrop-blur-md flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="text-xl font-bold text-red-800 flex items-center gap-2">
              🚨 In crisis right now?
            </h2>
            <p className="text-red-700/80 text-sm">Immediate support is available 24/7. Your safety is the priority.</p>
          </div>
          <div className="flex gap-3">
            <button className="bg-red-600 text-white px-6 py-3 rounded-full font-bold hover:bg-red-700 transition-all shadow-lg shadow-red-200">
              Get Help Now
            </button>
            <button className="bg-white border border-red-200 text-red-600 px-6 py-3 rounded-full font-medium hover:bg-red-50 transition-all">
              Emergency Numbers
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column: Tools & Habits */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Section 3: Quick Coping Tools */}
            <section className="bg-white/60 backdrop-blur-xl border border-white/80 rounded-[2.5rem] p-8">
              <h3 className="text-2xl font-semibold mb-6 flex items-center gap-2">
                ⚡ Quick Relief Tools
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button className="p-5 bg-[#F0F4F2] rounded-2xl text-left hover:bg-[#E2EAE6] transition-all">
                  <span className="block text-2xl mb-2">🫁</span>
                  <p className="font-bold">4-7-8 Breathing</p>
                  <p className="text-xs text-gray-500">1–3 minutes to calm the nerves.</p>
                </button>
                <button className="p-5 bg-[#F0F4F2] rounded-2xl text-left hover:bg-[#E2EAE6] transition-all">
                  <span className="block text-2xl mb-2">🧘</span>
                  <p className="font-bold">5-4-3-2-1 Grounding</p>
                  <p className="text-xs text-gray-500">Reconnect with your surroundings.</p>
                </button>
              </div>
            </section>

            {/* Section 2 & 6: Challenges & Adjustment */}
            <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-emerald-900 text-white rounded-[2.5rem] p-8">
                <h3 className="text-xl font-bold mb-4">Navigating Change</h3>
                <ul className="space-y-3 text-emerald-100/80 text-sm">
                  <li className="flex items-start gap-2">✨ <strong>Culture Shock:</strong> It's a phase, not a failure.</li>
                  <li className="flex items-start gap-2">🏠 <strong>Homesickness:</strong> Missing home means you have something worth loving.</li>
                  <li className="flex items-start gap-2">🗣️ <strong>Language Gaps:</strong> Communication is about connection, not perfection.</li>
                </ul>
              </div>
              <div className="bg-white rounded-[2.5rem] p-8 border border-gray-100 shadow-sm">
                <h3 className="text-xl font-bold mb-4 text-gray-800">Academic Balance</h3>
                <p className="text-sm text-gray-500 mb-4">Manage pressure without burning out.</p>
                <div className="space-y-2">
                  <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                    <div className="bg-blue-500 w-[70%] h-full"></div>
                  </div>
                  <p className="text-[10px] uppercase font-bold tracking-widest text-gray-400">Time Management Tip: Pomodoro Technique</p>
                </div>
              </div>
            </section>

            {/* Section 7: Professional Help Info */}
            <section className="bg-[#E7EBE8] rounded-[2.5rem] p-10 flex flex-col md:flex-row gap-8 items-center">
              <div className="flex-1">
                <h3 className="text-2xl font-bold mb-4">Demystifying Counseling</h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-6">
                  Counseling is simply a safe space to talk. It is <strong>100% confidential</strong> and, at most universities, <strong>completely free</strong>. No judgment, just support.
                </p>
                <button className="text-emerald-900 font-bold border-b-2 border-emerald-900 pb-1 hover:text-emerald-700 transition-all">
                  How to book an appointment
                </button>
              </div>
              <div className="w-full md:w-48 h-48 bg-white/50 rounded-full flex items-center justify-center text-5xl">
                🤝
              </div>
            </section>
          </div>

          {/* Right Column: Daily Habits & Trackers */}
          <div className="space-y-8">
            
            {/* Section 8: Mood Check-in */}
            <div className="bg-white rounded-[2.5rem] p-8 border border-gray-100 shadow-xl">
              <h3 className="text-lg font-bold mb-6 text-center">How are you today?</h3>
              <div className="flex justify-between gap-2">
                {['😔', '😐', '😊', '🤩'].map((emoji) => (
                  <button 
                    key={emoji}
                    onClick={() => setMood(emoji)}
                    className={`text-3xl p-3 rounded-2xl transition-all ${mood === emoji ? 'bg-emerald-100 scale-110' : 'hover:bg-gray-50'}`}
                  >
                    {emoji}
                  </button>
                ))}
              </div>
              {mood && <p className="mt-4 text-center text-xs text-emerald-700 font-medium animate-fade-in">Thanks for checking in. Every feeling is valid.</p>}
            </div>

            {/* Section 4 & 5: Daily Habits */}
            <div className="bg-[#F4F4F9] rounded-[2.5rem] p-8">
              <h3 className="font-bold mb-4 flex items-center gap-2">
                📝 Wellness Habits
              </h3>
              <ul className="space-y-4">
                <li className="flex gap-3 items-center bg-white p-3 rounded-xl shadow-sm">
                  <span className="text-xl">😴</span>
                  <span className="text-sm font-medium">Consistent Sleep</span>
                </li>
                <li className="flex gap-3 items-center bg-white p-3 rounded-xl shadow-sm">
                  <span className="text-xl">✍️</span>
                  <span className="text-sm font-medium">1-Min Gratitude Journal</span>
                </li>
                <li className="flex gap-3 items-center bg-white p-3 rounded-xl shadow-sm">
                  <span className="text-xl">🚶</span>
                  <span className="text-sm font-medium">10-Min Campus Walk</span>
                </li>
              </ul>
            </div>

            {/* Section 9: Multilingual Support */}
            <div className="p-6 border border-dashed border-gray-300 rounded-[2rem] text-center">
              <p className="text-xs text-gray-400 font-medium uppercase tracking-widest mb-2">Prefer another language?</p>
              <select className="bg-transparent text-sm font-bold text-gray-700 focus:outline-none cursor-pointer">
                <option>English</option>
                <option>Español</option>
                <option>中文</option>
                <option>हिन्दी</option>
                <option>Français</option>
              </select>
            </div>

          </div>
        </div>

        {/* Closing Messaging */}
        <footer className="mt-20 text-center">
          <p className="text-gray-400 text-sm mb-4 italic">Small wins are still wins. You're doing great.</p>
          <button 
            onClick={() => window.location.href = '/dashboard'}
            className="text-xs font-bold tracking-[0.2em] text-gray-500 hover:text-emerald-900 transition-all uppercase"
          >
            ← Return to Dashboard
          </button>
        </footer>
      </div>
    </div>
  )
}