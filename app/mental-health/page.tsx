'use client'

import React, { useState } from 'react'

export default function MentalHealthPage() {
  const [mood, setMood] = useState<string | null>(null);

  const challenges = [
    {
      title: 'The Reality of Culture Shock',
      icon: '🌏',
      desc: 'Moving to a new country requires your brain to process thousands of new data points daily—from accents and social etiquette to different grocery systems. If you feel irritable, deeply exhausted, or overwhelmed by simple tasks, it is not a sign of failure. It is a biological sign that your cognitive "processor" is working overtime to adapt to your new environment. This friction is a necessary stage of growth.',
      tag: 'Cognitive Load'
    },
    {
      title: 'Navigating Homesickness',
      icon: '🏠',
      desc: 'Homesickness is often misunderstood as a sign that you aren’t enjoying your new life. In reality, it is a healthy expression of your values and the strength of your roots. It is medically normal to experience a sense of grief for the familiar while simultaneously feeling excited about your future. Acknowledging this duality allows you to honor your past without letting it hinder your present progress.',
      tag: 'Emotional Health'
    },
    {
      title: 'Managing Social Transition',
      icon: '🤝',
      desc: 'Building a genuine community in a foreign country is a slow, iterative process that cannot be rushed. Many students feel isolated because they compare their "internal loneliness" with the "external highlights" of others. Understand that deep belonging is built through micro-connections—a brief conversation after a lecture or a shared meal. These small moments are the essential foundations of your future support network.',
      tag: 'Social Belonging'
    }
  ];

  return (
    <div className="min-h-screen relative overflow-hidden bg-[#F8FAFC] text-[#1E293B] py-20 px-8 lg:px-24 font-sans">
      
      {/* --- Enhanced Professional Blue Color Grading --- */}
      <div className="absolute top-[-15%] left-[-10%] w-[70%] h-[60%] bg-[#E0F2FE] rounded-full blur-[160px] opacity-70" />
      <div className="absolute bottom-[-10%] right-[-5%] w-[55%] h-[65%] bg-[#DBEAFE] rounded-full blur-[140px] opacity-60" />
      <div className="absolute top-[20%] right-[10%] w-[30%] h-[30%] bg-[#F0FDFA] rounded-full blur-[100px] opacity-50" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header: Executive Editorial Style */}
        <header className="mb-24">
          <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-[#0F172A] text-white text-[11px] font-bold uppercase tracking-[0.25em] mb-10 shadow-2xl">
            <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
            Strategic Wellness Protocol
          </div>
          <h1 className="text-7xl md:text-9xl font-light tracking-tighter mb-8 leading-[0.85] text-slate-900">
            Global <br />
            <span className="font-bold text-blue-900 italic">Resilience.</span>
          </h1>
          <p className="text-2xl text-slate-500 max-w-3xl leading-relaxed font-light">
            Transitioning across borders is a profound psychological milestone. YoursTruely provides the professional scaffolding and clinical insights needed to navigate your international journey with clarity and strength.
          </p>
        </header>

        {/* --- The Validation Tier: In-Depth Descriptions --- */}
        <section className="mb-32">
          <div className="flex items-center gap-6 mb-16">
            <h3 className="text-[11px] font-black text-blue-900/40 uppercase tracking-[0.4em] whitespace-nowrap">The Psychology of Transition</h3>
            <div className="h-[1px] w-full bg-blue-100" />
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {challenges.map((item, idx) => (
              <div key={idx} className="group bg-white/60 backdrop-blur-2xl border border-white p-12 rounded-[4rem] hover:bg-white hover:shadow-[0_32px_64px_-12px_rgba(15,23,42,0.1)] transition-all duration-700">
                <div className="flex justify-between items-start mb-12">
                  <div className="text-6xl grayscale group-hover:grayscale-0 transition-all duration-500">{item.icon}</div>
                  <span className="text-[10px] font-black text-blue-600 bg-blue-50 px-4 py-1.5 rounded-full border border-blue-100 uppercase tracking-widest">
                    {item.tag}
                  </span>
                </div>
                <h4 className="text-3xl font-bold mb-6 text-slate-900 tracking-tight">{item.title}</h4>
                <p className="text-[15px] text-slate-600 leading-[1.8] font-medium opacity-90">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* --- Coping Strategies: Deep Explanations --- */}
        <section className="mb-32 grid lg:grid-cols-2 gap-20 items-start">
          <div>
            <h3 className="text-[11px] font-black text-blue-900/40 uppercase tracking-[0.4em] mb-8">Adaptive Strategies</h3>
            <h2 className="text-5xl font-bold mb-10 tracking-tight text-slate-900">How to Navigate Change</h2>
            
            <div className="space-y-10">
              <div className="relative pl-12 border-l-2 border-blue-100">
                <div className="absolute left-[-9px] top-0 w-4 h-4 rounded-full bg-blue-600 shadow-[0_0_15px_rgba(37,99,235,0.4)]" />
                <h4 className="text-xl font-bold text-slate-900 mb-3">Develop "Anchor Routines"</h4>
                <p className="text-slate-500 leading-relaxed text-sm">
                  In a world where everything feels new, your brain craves predictability to lower cortisol levels. Establish a non-negotiable "anchor"—like visiting the same park every Sunday or a specific morning coffee ritual. These small repetitions send a biological signal to your nervous system that you are safe and in control.
                </p>
              </div>

              <div className="relative pl-12 border-l-2 border-blue-100">
                <div className="absolute left-[-9px] top-0 w-4 h-4 rounded-full bg-blue-300" />
                <h4 className="text-xl font-bold text-slate-900 mb-3">Curate Your Digital Environment</h4>
                <p className="text-slate-500 leading-relaxed text-sm">
                  Constant exposure to social media from your home country can create "split-presence," where you aren't fully in your new home nor back in your old one. Try to limit passive scrolling and replace it with intentional, high-quality video calls. This prevents the feeling of missing out and helps you focus on the growth happening right where you are.
                </p>
              </div>

              <div className="relative pl-12 border-l-2 border-blue-100">
                <div className="absolute left-[-9px] top-0 w-4 h-4 rounded-full bg-blue-100" />
                <h4 className="text-xl font-bold text-slate-900 mb-3">Prioritize Somatic Regulation</h4>
                <p className="text-slate-500 leading-relaxed text-sm">
                  Stress isn't just in your mind; it’s in your body. Physical movement—especially in nature—is one of the fastest ways to clear the "brain fog" associated with culture shock. A simple 20-minute walk helps your body process the adrenaline that comes with navigating a new city, leaving you calmer and more focused.
                </p>
              </div>
            </div>
          </div>

          {/* Institutional Support: Refined Slate Card */}
          <div className="sticky top-10 bg-[#0F172A] rounded-[4rem] p-16 text-white shadow-2xl overflow-hidden group">
             <div className="relative z-10">
                <h3 className="text-blue-400 text-[11px] font-black uppercase tracking-[0.3em] mb-8">Institutional Resources</h3>
                <h2 className="text-4xl font-bold mb-8">Free Clinical Counseling</h2>
                <p className="text-slate-400 leading-relaxed mb-12">
                  Most international student tuition includes a "Student Wellness Fee." This means professional, high-quality counseling services are already available to you at no additional cost. Utilizing these services is a sign of high emotional intelligence and a strategic step toward ensuring your academic and personal success.
                </p>
                
                <div className="space-y-8">
                  <div className="flex gap-5">
                    <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center shrink-0 border border-white/10 group-hover:bg-blue-600 transition-all duration-500">🛡️</div>
                    <div>
                      <h5 className="font-bold text-lg mb-1">Absolute Confidentiality</h5>
                      <p className="text-sm text-slate-500">Your privacy is legally protected. Records are never shared with your professors, family, or the immigration office (DSO).</p>
                    </div>
                  </div>
                  <div className="flex gap-5">
                    <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center shrink-0 border border-white/10 group-hover:bg-blue-600 transition-all duration-500">🎓</div>
                    <div>
                      <h5 className="font-bold text-lg mb-1">Cultural Expertise</h5>
                      <p className="text-sm text-slate-500">University therapists are specifically trained to support students through the unique pressures of F1/J1 visa regulations and cultural adjustment.</p>
                    </div>
                  </div>
                </div>

                <div className="mt-16 p-8 bg-white/5 rounded-3xl border border-white/10 text-center">
                   <p className="text-xs text-slate-400 mb-4">Search your university website for:</p>
                   <p className="text-xl font-mono font-bold text-blue-400">"CAPS" or "Student Health"</p>
                </div>
             </div>
             {/* Abstract Background Element */}
             <div className="absolute top-[-20%] right-[-20%] w-96 h-96 bg-blue-600 rounded-full blur-[160px] opacity-20 group-hover:opacity-40 transition-opacity duration-700" />
          </div>
        </section>

        {/* --- Neurological Reset Tools --- */}
        <section className="bg-white/40 backdrop-blur-2xl border border-white p-16 rounded-[5rem] shadow-sm mb-32">
          <h3 className="text-2xl font-bold mb-12 text-slate-900">Professional Coping Mechanisms</h3>
          <div className="grid md:grid-cols-2 gap-10">
            <div className="p-10 bg-slate-50 rounded-[3rem] border border-slate-100 hover:bg-white hover:shadow-2xl transition-all duration-500 group">
              <span className="inline-block px-4 py-1.5 rounded-full bg-blue-100 text-blue-700 text-[10px] font-black uppercase tracking-widest mb-6">Technique: 4-7-8</span>
              <h4 className="text-2xl font-bold mb-4">Vagus Nerve Reset</h4>
              <p className="text-slate-500 text-sm leading-relaxed">
                By extending your exhale longer than your inhale, you activate the "vagus nerve," which signals your brain to exit "fight-or-flight" mode. This is the fastest biological way to stop an anxiety spike.
              </p>
            </div>
            <div className="p-10 bg-slate-50 rounded-[3rem] border border-slate-100 hover:bg-white hover:shadow-2xl transition-all duration-500 group">
              <span className="inline-block px-4 py-1.5 rounded-full bg-emerald-100 text-emerald-700 text-[10px] font-black uppercase tracking-widest mb-6">Technique: Grounding</span>
              <h4 className="text-2xl font-bold mb-4">Cognitive Re-Anchoring</h4>
              <p className="text-slate-500 text-sm leading-relaxed">
                The 5-4-3-2-1 method forces your brain to switch from "internal worrying" to "external observation." By identifying things you can see and feel, you pull your mind back into the present safety of your environment.
              </p>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-32 pt-16 border-t border-slate-200/60 flex flex-col md:flex-row justify-between items-center gap-12">
          <p className="text-slate-400 text-[10px] font-black tracking-[0.5em] uppercase">YoursTruely Strategic Health • 2026</p>
          <button 
            onClick={() => window.location.href = '/dashboard'}
            className="group flex items-center gap-4 text-xs font-black tracking-[0.2em] text-slate-500 hover:text-blue-900 transition-all uppercase"
          >
            <span className="group-hover:-translate-x-2 transition-transform duration-500 text-lg">←</span> Return to Dashboard
          </button>
        </footer>
      </div>
    </div>
  )
}