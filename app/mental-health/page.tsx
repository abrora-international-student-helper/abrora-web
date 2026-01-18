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
        
        {/* Hero & Positive Messaging */}
        <header className="mb-12 text-center md:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100/50 border border-emerald-200 text-emerald-800 text-xs font-bold uppercase tracking-widest mb-6 backdrop-blur-md">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            You are not alone
          </div>
          <h1 className="text-5xl md:text-6xl font-light tracking-tight mb-4 leading-tight">
            Wellness designed for <br />
            <span className="font-semibold text-emerald-900 italic text-4xl md:text-6xl">your global journey.</span>
          </h1>
          <p className="text-lg text-gray-500 max-w-2xl leading-relaxed">
            Transitioning countries is a brave step. Whether you're feeling homesick or navigating academic pressure, YoursTruely is your companion.
          </p>
        </header>

        {/* 1. Quick Support & Emergency Help */}
        <div className="mb-12 p-8 bg-red-50/40 border border-red-100 rounded-[2.5rem] backdrop-blur-md flex flex-col md:flex-row items-center justify-between gap-8 shadow-sm">
          <div>
            <h2 className="text-xl font-bold text-red-800 flex items-center gap-2 mb-2">
              🚨 In crisis right now?
            </h2>
            <p className="text-red-700/70 text-sm max-w-md italic">Immediate support is available 24/7. Your safety and well-being are the absolute priority.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <button className="bg-red-600 text-white px-8 py-3.5 rounded-full font-bold hover:bg-red-700 transition-all shadow-lg shadow-red-200/50">
              Get Help Now
            </button>
            <button className="bg-white border border-red-200 text-red-600 px-8 py-3.5 rounded-full font-medium hover:bg-red-50 transition-all">
              Crisis Helplines
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Content Area */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* 3. Quick Coping Tools */}
            <section className="bg-white/60 backdrop-blur-xl border border-white/80 rounded-[2.5rem] p-8 shadow-sm">
              <h3 className="text-2xl font-semibold mb-6 flex items-center gap-2">
                ⚡ Fast Relief Tools
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button className="p-6 bg-[#F0F4F2] rounded-2xl text-left hover:bg-[#E2EAE6] transition-all group">
                  <span className="block text-3xl mb-3">🫁</span>
                  <p className="font-bold text-gray-800">4-7-8 Breathing</p>
                  <p className="text-xs text-gray-500 mt-1">1–3 minutes to reset your nervous system.</p>
                </button>
                <button className="p-6 bg-[#F0F4F2] rounded-2xl text-left hover:bg-[#E2EAE6] transition-all group">
                  <span className="block text-3xl mb-3">🧘</span>
                  <p className="font-bold text-gray-800">5-4-3-2-1 Grounding</p>
                  <p className="text-xs text-gray-500 mt-1">Quickly reconnect with the present moment.</p>
                </button>
              </div>
            </section>

            {/* 2 & 6. Common Challenges & Social Adjustment */}
            <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-emerald-900 text-white rounded-[2.5rem] p-8 shadow-xl">
                <h3 className="text-xl font-bold mb-6 tracking-tight">Normalizing the Move</h3>
                <ul className="space-y-4 text-emerald-100/80 text-sm">
                  <li className="flex items-start gap-3">
                    <span className="text-emerald-400">●</span>
                    <p><strong>Culture Shock:</strong> Feeling frustrated or tired is a sign you are adapting.</p>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-emerald-400">●</span>
                    <p><strong>Homesickness:</strong> It's okay to miss home; it shows you value your roots.</p>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-emerald-400">●</span>
                    <p><strong>Social Isolation:</strong> Building a new tribe takes time. Celebrate small connections.</p>
                  </li>
                </ul>
              </div>

              {/* 5. Managing Academic Stress */}
              <div className="bg-white rounded-[2.5rem] p-8 border border-gray-100 shadow-sm flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-bold mb-2 text-gray-800">Academic Pressure</h3>
                  <p className="text-sm text-gray-500 mb-6 leading-relaxed">Exams and deadlines shouldn't cost you your peace.</p>
                </div>
                <div className="space-y-4">
                  <div className="p-4 bg-blue-50 rounded-2xl border border-blue-100">
                    <p className="text-xs font-bold text-blue-700 uppercase tracking-widest mb-1">Study-Break Balance</p>
                    <p className="text-sm text-blue-900">Try the 50/10 Rule: 50 min study, 10 min movement.</p>
                  </div>
                  <button className="w-full py-3 bg-gray-50 hover:bg-gray-100 rounded-xl text-xs font-bold text-gray-600 transition-all uppercase tracking-widest">
                    Exam Anxiety Tips
                  </button>
                </div>
              </div>
            </section>

            {/* 7. Seeking Professional Help */}
            <section className="bg-[#E7EBE8] rounded-[3rem] p-10 flex flex-col md:flex-row gap-10 items-center border border-white/50">
              <div className="flex-1">
                <h3 className="text-2xl font-bold mb-4 text-gray-900">Demystifying Counseling</h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-6 italic">
                  "Counseling isn't for the broken; it's for the brave." Most campus services are <strong>confidential, free,</strong> and culturally sensitive.
                </p>
                <div className="flex flex-wrap gap-4">
                  <button className="text-emerald-900 font-bold border-b-2 border-emerald-900 pb-1 hover:text-emerald-700 transition-all text-sm">
                    How to book on campus
                  </button>
                  <button className="text-gray-500 font-bold border-b-2 border-gray-300 pb-1 hover:text-gray-700 transition-all text-sm">
                    Online therapy options
                  </button>
                </div>
              </div>
              <div className="hidden md:flex w-40 h-40 bg-white/40 backdrop-blur-md rounded-full items-center justify-center text-5xl shadow-inner">
                🌿
              </div>
            </section>
          </div>

          {/* Sidebar Area */}
          <div className="space-y-8">
            
            {/* 8. Self-Assessment & Mood Check-in */}
            <div className="bg-white rounded-[2.5rem] p-8 border border-gray-100 shadow-xl shadow-gray-200/50">
              <h3 className="text-lg font-bold mb-6 text-center text-gray-800">Daily Mood Check-in</h3>
              <div className="flex justify-between gap-2 px-2">
                {['😔', '😐', '😊', '🤩'].map((emoji) => (
                  <button 
                    key={emoji}
                    onClick={() => setMood(emoji)}
                    className={`text-3xl p-3 rounded-2xl transition-all duration-300 ${mood === emoji ? 'bg-emerald-100 scale-110 shadow-sm' : 'hover:bg-gray-50 opacity-60 hover:opacity-100'}`}
                  >
                    {emoji}
                  </button>
                ))}
              </div>
              {mood && (
                <div className="mt-6 p-4 bg-emerald-50 rounded-2xl border border-emerald-100 animate-in fade-in slide-in-from-top-2">
                  <p className="text-center text-xs text-emerald-800 font-medium">
                    Every feeling is a visitor. Thanks for acknowledging yourself today.
                  </p>
                </div>
              )}
            </div>

            {/* 4. Daily Wellness Habits */}
            <div className="bg-[#F4F4F9] rounded-[3rem] p-8 border border-white shadow-sm">
              <h3 className="font-bold text-gray-800 mb-6 flex items-center gap-2 px-2">
                <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                Daily Wellness
              </h3>
              <ul className="space-y-4">
                <li className="group flex gap-4 items-center bg-white p-4 rounded-[1.5rem] shadow-sm hover:shadow-md transition-all cursor-pointer">
                  <span className="text-2xl transform group-hover:rotate-12 transition-transform">😴</span>
                  <div>
                    <p className="text-sm font-bold text-gray-800">Sleep Routine</p>
                    <p className="text-[10px] text-gray-400 font-medium tracking-tight">Tips for deep rest.</p>
                  </div>
                </li>
                <li className="group flex gap-4 items-center bg-white p-4 rounded-[1.5rem] shadow-sm hover:shadow-md transition-all cursor-pointer">
                  <span className="text-2xl transform group-hover:rotate-12 transition-transform">🚶</span>
                  <div>
                    <p className="text-sm font-bold text-gray-800">Movement</p>
                    <p className="text-[10px] text-gray-400 font-medium tracking-tight">Small walks, big impact.</p>
                  </div>
                </li>
                <li className="group flex gap-4 items-center bg-white p-4 rounded-[1.5rem] shadow-sm hover:shadow-md transition-all cursor-pointer">
                  <span className="text-2xl transform group-hover:rotate-12 transition-transform">📓</span>
                  <div>
                    <p className="text-sm font-bold text-gray-800">Journaling</p>
                    <p className="text-[10px] text-gray-400 font-medium tracking-tight">Prompts for clarity.</p>
                  </div>
                </li>
              </ul>
            </div>

            {/* Assessment Tool Teaser */}
            <div className="p-8 bg-gradient-to-br from-indigo-50 to-blue-50 rounded-[2.5rem] border border-blue-100/50">
              <h4 className="text-sm font-bold text-indigo-900 mb-2 uppercase tracking-tighter">Wellness Quiz</h4>
              <p className="text-xs text-indigo-700/70 mb-4 leading-relaxed">Unsure if you should talk to someone? Try our quick screening tool.</p>
              <button className="w-full py-3 bg-indigo-900 text-white rounded-xl text-xs font-bold hover:bg-black transition-all">
                Take Assessment
              </button>
            </div>

          </div>
        </div>

        {/* 10. Hope-Focused Footer */}
        <footer className="mt-24 text-center border-t border-gray-200/40 pt-12">
          <p className="text-gray-400 text-sm mb-6 italic font-medium">Small wins are still wins. You're exactly where you need to be.</p>
          <button 
            onClick={() => window.location.href = '/dashboard'}
            className="text-xs font-bold tracking-[0.3em] text-gray-400 hover:text-emerald-900 transition-all uppercase px-4 py-2"
          >
            ← Return to YoursTruely Dashboard
          </button>
        </footer>
      </div>
    </div>
  )
}