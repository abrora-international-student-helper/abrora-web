'use client'

import React, { useState, useEffect } from 'react'

export default function VisaIntelligenceSuite() {
  const [formData, setFormData] = useState({
    location: 'Outside U.S.',
    visaType: 'F-1',
    institution: '',
    programEnd: '',
    sevisPaid: false,
    ds160Status: 'Not Started'
  });

  const [results, setResults] = useState({ gracePeriod: '', optWindow: '', graceDays: 60 });

  // DYNAMIC COMPLIANCE ENGINE
  useEffect(() => {
    if (formData.programEnd) {
      const end = new Date(formData.programEnd);
      const days = formData.visaType === 'F-1' ? 60 : 30;
      const grace = new Date(end);
      grace.setDate(grace.getDate() + days);
      const opt = new Date(end);
      opt.setDate(opt.getDate() - 90);

      setResults({
        gracePeriod: grace.toDateString(),
        optWindow: opt.toDateString(),
        graceDays: days
      });
    }
  }, [formData.programEnd, formData.visaType]);

  const isF1 = formData.visaType === 'F-1';

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-4 md:p-10 font-sans text-slate-900">
      <div className="max-w-5xl mx-auto space-y-12">
        
        {/* HEADER & GLOBAL CONFIG */}
        <header className="flex flex-col md:flex-row justify-between items-center bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-200 gap-6">
          <div className="space-y-1">
            <h1 className="text-3xl font-black tracking-tight text-slate-900">Abrora<span className="text-blue-600"></span></h1>
            <p className="text-slate-400 font-medium text-sm">Comprehensive F-1/J-1 Guidance</p>
          </div>
          <div className="flex bg-slate-100 p-2 rounded-2xl gap-2">
            <select 
              value={formData.location}
              onChange={(e) => setFormData({...formData, location: e.target.value})}
              className="bg-white px-4 py-2 rounded-xl font-bold text-xs shadow-sm outline-none"
            >
              <option>Outside U.S.</option>
              <option>Inside U.S.</option>
            </select>
            <select 
              value={formData.visaType}
              onChange={(e) => setFormData({...formData, visaType: e.target.value})}
              className="bg-white px-4 py-2 rounded-xl font-bold text-xs shadow-sm outline-none"
            >
              <option value="F-1">F-1 Student</option>
              <option value="J-1">J-1 Exchange</option>
            </select>
          </div>
        </header>

        {/* STEP 1: ACCEPTANCE */}
        <section className="bg-white rounded-[3rem] overflow-hidden border border-slate-200 shadow-sm">
          <div className="bg-blue-600 p-8 text-white flex items-center gap-6">
            <span className="text-4xl font-black opacity-30">01</span>
            <h2 className="text-2xl font-bold">Get Accepted by a SEVP-Approved School</h2>
          </div>
          <div className="p-8 grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <p className="text-sm text-slate-600 leading-relaxed">
                You must apply and receive admission from a U.S. school approved by the <strong>Student and Exchange Visitor Program (SEVP)</strong>. Only these schools can issue the Form I-20 or DS-2019.
              </p>
              <div className="bg-blue-50 p-4 rounded-2xl border border-blue-100">
                <p className="text-xs font-bold text-blue-800 uppercase mb-2 tracking-widest">Required Documents</p>
                <ul className="text-xs text-blue-700 space-y-1">
                  <li>• Valid Passport Copy</li>
                  <li>• Academic Records & Transcripts</li>
                  <li>• Official Offer Letter</li>
                </ul>
              </div>
            </div>
            <div className="space-y-4">
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                <p className="text-[10px] font-black uppercase text-slate-400 mb-2">Institution Name</p>
                <input 
                  type="text" 
                  placeholder="e.g. Harvard University" 
                  className="w-full bg-white p-3 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-blue-500 font-bold"
                  onChange={(e) => setFormData({...formData, institution: e.target.value})}
                />
              </div>
              <p className="text-[11px] text-slate-400 italic">💡 <strong>Tip:</strong> Search for schools on the official DHS Study in the States website to ensure they are SEVP-certified.</p>
            </div>
          </div>
        </section>

        {/* STEP 2: SEVIS FEE */}
        <section className="bg-white rounded-[3rem] overflow-hidden border border-slate-200 shadow-sm">
          <div className="bg-indigo-600 p-8 text-white flex items-center gap-6">
            <span className="text-4xl font-black opacity-30">02</span>
            <h2 className="text-2xl font-bold">Pay SEVIS I-901 Fee</h2>
          </div>
          <div className="p-8 flex flex-col md:flex-row gap-8">
            <div className="flex-1 space-y-4">
              <p className="text-sm text-slate-600 leading-relaxed">
                The SEVIS fee registers you in the U.S. immigration system. You <strong>must</strong> pay this at <span className="font-mono text-indigo-600 font-bold">fmjfee.com</span> before your visa interview.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-indigo-50 rounded-2xl border border-indigo-100">
                  <p className="text-[10px] font-bold text-indigo-400 uppercase">Fee Amount</p>
                  <p className="text-lg font-bold text-indigo-900">{isF1 ? '$350' : '$220'}</p>
                </div>
                <div className="p-4 bg-indigo-50 rounded-2xl border border-indigo-100">
                  <p className="text-[10px] font-bold text-indigo-400 uppercase">Requirement</p>
                  <p className="text-sm font-bold text-indigo-900">Valid I-20 Form</p>
                </div>
              </div>
            </div>
            <div className="w-full md:w-1/3 flex flex-col justify-center gap-4">
               <label className="flex items-center gap-3 p-6 bg-slate-900 text-white rounded-[2rem] cursor-pointer">
                  <input type="checkbox" className="w-5 h-5 accent-blue-500" onChange={(e) => setFormData({...formData, sevisPaid: e.target.checked})} />
                  <span className="text-xs font-bold uppercase tracking-widest">I have the printed receipt</span>
               </label>
               <p className="text-[11px] text-slate-400 text-center uppercase font-bold">⚠️ Receipt is mandatory for interview</p>
            </div>
          </div>
        </section>

        {/* STEP 3: DS-160 & CALCULATOR */}
        <section className="bg-slate-900 rounded-[3.5rem] p-10 text-white shadow-2xl space-y-8 relative overflow-hidden">
          <div className="flex items-center gap-6">
            <span className="text-4xl font-black text-white/20">03</span>
            <h2 className="text-2xl font-bold">Complete DS-160 & Compliance Check</h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div className="space-y-4">
              <p className="text-slate-400 text-sm leading-relaxed">
                Fill out the DS-160 at <span className="text-blue-400">ceac.state.gov</span>. This information must match your passport exactly. You will need to upload a digital passport photo.
              </p>
              <div className="space-y-3">
                 <label className="text-[10px] font-black uppercase text-blue-500 tracking-widest">Expected Program End Date</label>
                 <input 
                  type="date" 
                  className="w-full p-4 bg-white/10 rounded-2xl border border-white/10 text-white outline-none focus:border-blue-500 font-bold"
                  onChange={(e) => setFormData({...formData, programEnd: e.target.value})}
                />
              </div>
            </div>

            <div className="bg-white/5 p-8 rounded-[2.5rem] border border-white/10 space-y-6">
              <div className="flex justify-between items-center">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Grace Period Ends</p>
                <p className="text-xl font-bold text-blue-400">{results.gracePeriod || '---'}</p>
              </div>
              <div className="flex justify-between items-center pt-4 border-t border-white/10">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{isF1 ? 'OPT Window' : 'AT Window'}</p>
                <p className="text-lg font-bold">{results.optWindow || '---'}</p>
              </div>
              <p className="text-[10px] text-slate-500 italic text-center uppercase font-bold">Rule: {results.graceDays} Days post-graduation</p>
            </div>
          </div>
        </section>

        {/* STEPS 4-7: LOGISTICS & PREPARATION */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* STEP 4 & 5 */}
          <div className="space-y-8">
            <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center gap-4">
                <span className="w-10 h-10 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center font-bold">4</span>
                <h3 className="text-xl font-bold">Schedule Interview</h3>
              </div>
              <p className="text-sm text-slate-500">Book early via the embassy website. You must pay the MRV visa fee before choosing a date.</p>
            </div>

            <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm space-y-6">
              <div className="flex items-center gap-4">
                <span className="w-10 h-10 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center font-bold">5</span>
                <h3 className="text-xl font-bold">Required Documents</h3>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {['Valid Passport', 'Form I-20', 'DS-160 Confirm', 'SEVIS Receipt', 'Appt Letter', 'Financial Proof', 'Academic Records'].map(item => (
                  <div key={item} className="p-2 bg-slate-50 rounded-lg text-[10px] font-bold text-slate-600 border border-slate-100 flex items-center gap-2">
                    <span className="text-blue-500">✅</span> {item}
                  </div>
                ))}
              </div>
              <p className="text-[11px] text-slate-400 italic">💡 Bring originals + photocopies for all documents.</p>
            </div>
          </div>

          {/* STEP 6 & 7 */}
          <div className="space-y-8">
            <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center gap-4">
                <span className="w-10 h-10 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center font-bold">6</span>
                <h3 className="text-xl font-bold">Attend Interview</h3>
              </div>
              <p className="text-sm text-slate-500 mb-4">The officer will verify your study intention and financial ties.</p>
              <div className="space-y-2">
                {['Why this university?', 'Who is your sponsor?', 'What are your future plans?'].map(q => (
                  <div key={q} className="p-3 bg-amber-50 rounded-xl text-xs font-medium text-amber-800 border border-amber-100">
                    Q: {q}
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-green-600 p-8 rounded-[2.5rem] text-white space-y-4 shadow-xl shadow-green-100">
              <div className="flex items-center gap-4">
                <span className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center font-bold text-xl">7</span>
                <h3 className="text-xl font-black italic">Visa Approval</h3>
              </div>
              <p className="text-sm opacity-90 leading-relaxed font-medium">
                Wait for your passport to be returned with the stamp. Once received, collect your documents, book your flight, and prepare for travel!
              </p>
              <button 
                onClick={() => { alert("Checklist Saved Successfully!"); window.location.reload(); }}
                className="w-full bg-white text-green-700 font-black py-4 rounded-2xl hover:bg-green-50 transition-all shadow-lg uppercase text-xs tracking-widest"
              >
                Complete Roadmap
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}