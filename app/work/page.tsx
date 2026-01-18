'use client'

import React from 'react'

export default function WorkAuthorizationPage() {
  return (
    <div className="min-h-screen relative overflow-hidden bg-[#F9F9F7] text-[#2D312E] py-12 px-6 lg:px-24">
      
      {/* Mesh Gradient Background Elements (ABRORA & Hers inspiration) */}
      <div className="absolute top-[-5%] right-[-10%] w-[60%] h-[40%] bg-[#E3E9F2] rounded-full blur-[120px] opacity-70" />
      <div className="absolute bottom-[5%] left-[-5%] w-[45%] h-[50%] bg-[#E8F0EE] rounded-full blur-[100px] opacity-60" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header Section */}
        <header className="mb-12 text-center md:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100/50 border border-blue-200 text-blue-800 text-xs font-bold uppercase tracking-widest mb-6 backdrop-blur-md">
            Career & Compliance
          </div>
          <h1 className="text-5xl md:text-6xl font-light tracking-tight mb-4 leading-tight">
            Building your future <br />
            <span className="font-semibold text-blue-900 italic text-4xl md:text-6xl">within regulation.</span>
          </h1>
          <p className="text-lg text-gray-500 max-w-2xl leading-relaxed">
            Navigating U.S. work authorization is critical for your F-1 status. Stay compliant while pursuing your professional goals.
          </p>
        </header>

        {/* 1. On-Campus Work (Immediate Access) */}
        <div className="mb-12 p-8 bg-blue-50/40 border border-blue-100 rounded-[2.5rem] backdrop-blur-md flex flex-col md:flex-row items-center justify-between gap-8 shadow-sm">
          <div>
            <h2 className="text-xl font-bold text-blue-800 flex items-center gap-2 mb-2">
              📍 On-Campus Employment
            </h2>
            <p className="text-blue-700/70 text-sm max-w-xl italic">
              Available immediately for F-1 students. Includes library, cafeteria, or lab assistant roles. No USCIS approval needed.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4 w-full md:w-auto text-center">
            <div className="bg-white p-5 rounded-3xl border border-blue-100 shadow-sm min-w-[120px]">
              <p className="text-3xl font-bold text-blue-900">20h</p>
              <p className="text-[10px] uppercase font-bold text-gray-400 tracking-tighter">During Semester</p>
            </div>
            <div className="bg-white p-5 rounded-3xl border border-blue-100 shadow-sm min-w-[120px]">
              <p className="text-3xl font-bold text-blue-900">40h</p>
              <p className="text-[10px] uppercase font-bold text-gray-400 tracking-tighter">Breaks & Holidays</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Content Area */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* 2. CPT & OPT Section */}
            <section className="bg-white/60 backdrop-blur-xl border border-white/80 rounded-[2.5rem] p-8 shadow-sm">
              <h3 className="text-2xl font-semibold mb-8 flex items-center gap-2">
                💼 Off-Campus Authorization
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* CPT */}
                <div className="p-6 bg-[#F0F4F2] rounded-3xl border border-emerald-100">
                  <span className="inline-block px-3 py-1 bg-emerald-100 text-emerald-800 text-[10px] font-bold rounded-full mb-4">DSO APPROVED</span>
                  <h4 className="text-lg font-bold mb-2">CPT (Curricular)</h4>
                  <p className="text-xs text-gray-500 mb-4 leading-relaxed">Internships related to your major. Must be part of your degree curriculum.</p>
                  <ul className="text-xs space-y-2 font-medium text-gray-700">
                    <li>• Must finish 1 academic year first</li>
                    <li>• Full-time CPT {'>'} 12 months cancels OPT</li>
                  </ul>
                </div>

                {/* OPT */}
                <div className="p-6 bg-[#F4F4F9] rounded-3xl border border-blue-100">
                  <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 text-[10px] font-bold rounded-full mb-4">USCIS APPROVED</span>
                  <h4 className="text-lg font-bold mb-2">OPT (Optional)</h4>
                  <p className="text-xs text-gray-500 mb-4 leading-relaxed">Post-graduation work in your field. Requires an EAD card from USCIS.</p>
                  <ul className="text-xs space-y-2 font-medium text-gray-700">
                    <li>• Standard: 12 Months</li>
                    <li>• STEM Extension: +24 Months</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* 3. Post-Graduation: H-1B & Work Visas */}
            <section className="bg-emerald-900 text-white rounded-[3rem] p-10 relative overflow-hidden">
              <div className="relative z-10">
                <h3 className="text-2xl font-bold mb-4">The H-1B Pathway</h3>
                <p className="text-emerald-100/80 text-sm leading-relaxed mb-8 max-w-md">
                  A specialty occupation visa sponsored by employers. Selection is based on an annual random lottery.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20">
                    <p className="text-xs uppercase font-bold text-emerald-300 mb-1">Duration</p>
                    <p className="text-sm">3 Years (Extendable to 6)</p>
                  </div>
                  <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20">
                    <p className="text-xs uppercase font-bold text-emerald-300 mb-1">Cap-Gap</p>
                    <p className="text-sm">Stay legal while lottery is pending</p>
                  </div>
                  <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20">
                    <p className="text-xs uppercase font-bold text-emerald-300 mb-1">Requirement</p>
                    <p className="text-sm">Bachelor's Degree or higher</p>
                  </div>
                </div>
              </div>
              <div className="absolute right-[-20px] bottom-[-20px] text-9xl opacity-10">🏢</div>
            </section>

            {/* 4. Severe Economic Hardship */}
            <section className="bg-white rounded-[2.5rem] p-8 border border-gray-100 shadow-sm">
              <h3 className="text-xl font-bold mb-4">Severe Economic Hardship</h3>
              <p className="text-sm text-gray-500 leading-relaxed italic">
                Authorized if you lose financial support due to unforeseen circumstances like currency collapse or medical bills. Requires USCIS approval.
              </p>
            </section>
          </div>

          {/* Sidebar Area */}
          <div className="space-y-8">
            
            {/* 5. Reporting & Compliance */}
            <div className="bg-white rounded-[2.5rem] p-8 border border-gray-100 shadow-xl shadow-gray-200/50">
              <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                ⚠️ Critical Deadlines
              </h3>
              <ul className="space-y-6">
                <li className="flex gap-4">
                  <div className="h-2 w-2 rounded-full bg-red-500 mt-1.5 shrink-0" />
                  <div>
                    <p className="text-sm font-bold">Unemployment Limit</p>
                    <p className="text-xs text-gray-400">90 days for standard OPT.</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <div className="h-2 w-2 rounded-full bg-orange-500 mt-1.5 shrink-0" />
                  <div>
                    <p className="text-sm font-bold">Address Change</p>
                    <p className="text-xs text-gray-400">Must report to DSO within 10 days.</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <div className="h-2 w-2 rounded-full bg-blue-500 mt-1.5 shrink-0" />
                  <div>
                    <p className="text-sm font-bold">Employment Change</p>
                    <p className="text-xs text-gray-400">Report via SEVP portal immediately.</p>
                  </div>
                </li>
              </ul>
            </div>

            {/* 6. Avoid Illegal Work */}
            <div className="bg-red-50/50 rounded-[2.5rem] p-8 border border-red-100">
              <h4 className="text-sm font-bold text-red-800 uppercase tracking-widest mb-4">Warning Zone</h4>
              <p className="text-xs text-red-700/80 leading-relaxed mb-4">
                Working off-campus without authorization or exceeding 20 hours is a <strong>visa violation</strong> and can lead to deportation.
              </p>
              <div className="p-3 bg-white rounded-xl text-[10px] font-bold text-red-600 border border-red-100 text-center">
                NEVER WORK UNLESS AUTHORIZED
              </div>
            </div>

            {/* 7. Pro Tips & Tools */}
            <div className="bg-gray-50 rounded-[3rem] p-8 border border-white shadow-sm">
              <h3 className="font-bold text-gray-800 mb-6 flex items-center gap-2">
                💡 Compliance Tips
              </h3>
              <div className="space-y-4">
                <div className="p-4 bg-white rounded-2xl shadow-sm">
                  <p className="text-xs font-bold mb-1">Talk to your DSO</p>
                  <p className="text-[10px] text-gray-400">The International Student Office is your primary resource.</p>
                </div>
                <div className="p-4 bg-white rounded-2xl shadow-sm">
                  <p className="text-xs font-bold mb-1">Save Everything</p>
                  <p className="text-[10px] text-gray-400">Keep copies of I-20s, EAD cards, and offer letters.</p>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Footer */}
        <footer className="mt-24 text-center border-t border-gray-200/40 pt-12">
          <p className="text-gray-400 text-sm mb-6 italic font-medium">Immigration rules change often. Always confirm with your school's DSO.</p>
          <button 
            onClick={() => window.location.href = '/dashboard'}
            className="text-xs font-bold tracking-[0.3em] text-gray-400 hover:text-blue-900 transition-all uppercase px-4 py-2"
          >
            ← Return to YoursTruely Dashboard
          </button>
        </footer>
      </div>
    </div>
  )
}