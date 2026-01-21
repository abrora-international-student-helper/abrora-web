'use client'

import React, { useState, useEffect } from 'react'

export default function VisaSetupPage() {
  const [step, setStep] = useState(1);
  const [isCalculated, setIsCalculated] = useState(false);
  
  const initialFormState = {
    visaType: 'F-1',
    location: 'Inside U.S.', // Branching Logic Trigger
    citizenship: '',
    institution: '',
    startDate: '',
    endDate: '',
    sevisId: '',
    visaStampExpiry: '',
    // Outside U.S. Specifics
    ds160Status: 'Not Started',
    sevisFeePaid: false,
    interviewDate: '',
    consulateLocation: '',
  };

  const [formData, setFormData] = useState(initialFormState);
  const [results, setResults] = useState({ gracePeriod: '', optWindow: '', checklist: [] });

  // Calculation Engine for F-1, J-1, and H-1B
  useEffect(() => {
    if (formData.endDate) {
      const end = new Date(formData.endDate);
      let graceDays = 60; 
      let optText = "N/A";

      if (formData.visaType === 'F-1') {
        graceDays = 60;
        const optOpen = new Date(end);
        optOpen.setDate(optOpen.getDate() - 90);
        optText = optOpen.toDateString();
      } else if (formData.visaType === 'J-1') {
        graceDays = 30;
        optText = "Academic Training (See DSO)";
      } else if (formData.visaType === 'H-1B') {
        graceDays = 60;
        optText = "Employment Based";
      }

      const grace = new Date(end);
      grace.setDate(grace.getDate() + graceDays);

      setResults(prev => ({
        ...prev,
        gracePeriod: grace.toDateString(),
        optWindow: optText
      }));
    }
  }, [formData.endDate, formData.visaType]);

  const handleSave = () => {
    alert("Profile Synchronized! Data entry cleared for next record.");
    setFormData(initialFormState);
    setStep(1);
  };

  return (
    <div className="min-h-screen bg-[#F1F5F9] flex items-center justify-center p-4 font-sans">
      <div className="w-full max-w-6xl bg-white rounded-[3rem] shadow-2xl flex flex-col md:flex-row overflow-hidden border border-white">
        
        {/* LEFT PANEL: Blue Grading & Summary */}
        <div className="md:w-1/3 bg-gradient-to-br from-[#1E40AF] via-[#1E3A8A] to-[#172554] p-12 text-white flex flex-col">
          <div className="mb-10">
            <h2 className="text-2xl font-black tracking-tighter italic">Abrora</h2>
            <p className="text-blue-300 text-[10px] uppercase font-bold tracking-widest mt-1">Visa Intelligence</p>
          </div>

          <div className="space-y-6 flex-grow">
            <h3 className="text-xs font-bold text-blue-200 uppercase tracking-widest">Live Engine</h3>
            
            {/* Conditional Summary Display */}
            <div className="p-6 rounded-[2rem] bg-white/10 border border-white/10 backdrop-blur-md">
              <p className="text-[10px] uppercase font-bold text-blue-300 mb-1">
                {formData.location === 'Inside U.S.' ? 'Grace Period End' : 'Target Entry Date'}
              </p>
              <p className="text-xl font-bold">{formData.endDate ? results.gracePeriod : 'Pending Input'}</p>
            </div>

            {formData.visaType === 'F-1' && (
              <div className="p-6 rounded-[2rem] bg-white/10 border border-white/10 backdrop-blur-md">
                <p className="text-[10px] uppercase font-bold text-blue-300 mb-1">OPT Filing Window Opens</p>
                <p className="text-xl font-bold">{results.optWindow}</p>
              </div>
            )}
          </div>

          <div className="mt-auto pt-6 border-t border-white/10">
            <p className="text-[10px] text-blue-200/50 uppercase font-bold">Automatic Regulation Updates for 2026</p>
          </div>
        </div>

        {/* RIGHT PANEL: Dynamic Form */}
        <div className="md:w-2/3 p-12 bg-white flex flex-col">
          <div className="flex justify-between items-center mb-10">
            <div>
              <h1 className="text-3xl font-bold text-slate-800">Visa Setup</h1>
              <p className="text-slate-400 text-sm">Targeting: <span className="text-blue-600 font-bold">{formData.location}</span></p>
            </div>
            <div className="flex gap-2">
              {[1, 2, 3].map(i => (
                <div key={i} className={`h-1.5 w-10 rounded-full transition-all ${step >= i ? 'bg-blue-600' : 'bg-slate-100'}`} />
              ))}
            </div>
          </div>

          <div className="flex-grow">
            {step === 1 && (
              <div className="space-y-8 animate-in fade-in slide-in-from-right-4">
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 uppercase ml-1">Visa Type</label>
                    <select 
                      value={formData.visaType}
                      onChange={(e) => setFormData({...formData, visaType: e.target.value})}
                      className="w-full bg-slate-50 border-none rounded-2xl p-4 font-bold text-slate-700 outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="F-1">F-1 (Student)</option>
                      <option value="J-1">J-1 (Exchange)</option>
                      <option value="H-1B">H-1B (Work)</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 uppercase ml-1">Current Location</label>
                    <div className="flex bg-slate-100 p-1 rounded-2xl">
                      {['Inside U.S.', 'Outside U.S.'].map(loc => (
                        <button 
                          key={loc}
                          onClick={() => setFormData({...formData, location: loc})}
                          className={`flex-1 py-3 text-xs font-bold rounded-xl transition-all ${formData.location === loc ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500'}`}
                        >
                          {loc}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase ml-1">Institution / Employer Name</label>
                  <input 
                    type="text"
                    value={formData.institution}
                    onChange={(e) => setFormData({...formData, institution: e.target.value})}
                    placeholder="e.g. Harvard University or Google"
                    className="w-full bg-slate-50 border-none rounded-2xl p-4 outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            )}

            {/* Step 2 Branching Logic */}
            {step === 2 && (
              <div className="space-y-8 animate-in fade-in slide-in-from-right-4">
                {formData.location === 'Inside U.S.' ? (
                  /* INSIDE USA PATH */
                  <div className="space-y-6">
                    <h3 className="text-sm font-bold text-blue-600 uppercase tracking-widest">Compliance Timeline</h3>
                    <div className="grid grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-400 uppercase">Program Start</label>
                        <input type="date" className="w-full bg-slate-50 rounded-2xl p-4 border-none outline-none" value={formData.startDate} onChange={(e) => setFormData({...formData, startDate: e.target.value})} />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-400 uppercase">Program End</label>
                        <input type="date" className="w-full bg-slate-50 rounded-2xl p-4 border-none outline-none ring-2 ring-blue-100" value={formData.endDate} onChange={(e) => setFormData({...formData, endDate: e.target.value})} />
                      </div>
                    </div>
                  </div>
                ) : (
                  /* OUTSIDE USA PATH: DS-160 & SEVIS FEE */
                  <div className="space-y-6">
                    <h3 className="text-sm font-bold text-blue-600 uppercase tracking-widest">Embassy Processing</h3>
                    <div className="grid grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-400 uppercase">DS-160 Status</label>
                        <select className="w-full bg-slate-50 rounded-2xl p-4 border-none outline-none">
                          <option>Not Started</option>
                          <option>In Progress</option>
                          <option>Submitted</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-400 uppercase">Interview Date</label>
                        <input type="date" className="w-full bg-slate-50 rounded-2xl p-4 border-none outline-none" />
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-6 bg-slate-50 rounded-3xl border border-slate-100">
                      <div>
                        <p className="font-bold text-slate-700">I-901 SEVIS Fee</p>
                        <p className="text-[11px] text-slate-500">Required before your visa interview</p>
                      </div>
                      <input type="checkbox" className="w-6 h-6 rounded-lg accent-blue-600" />
                    </div>
                  </div>
                )}
              </div>
            )}

            {step === 3 && (
              <div className="space-y-8 animate-in fade-in slide-in-from-right-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase ml-1">SEVIS ID Number</label>
                  <input 
                    type="text"
                    value={formData.sevisId}
                    onChange={(e) => setFormData({...formData, sevisId: e.target.value})}
                    placeholder="N00XXXXXXXX"
                    className="w-full bg-slate-50 border-none rounded-2xl p-4 outline-none focus:ring-2 focus:ring-blue-500 font-mono"
                  />
                </div>
                <div className="bg-amber-50 p-6 rounded-[2rem] border border-amber-100 flex items-start gap-4">
                  <span className="text-xl">⚠️</span>
                  <p className="text-[11px] text-amber-800 leading-relaxed uppercase font-bold">
                    {formData.location === 'Outside U.S.' 
                      ? "Do not book travel until you have your physical passport with the visa stamp in hand."
                      : "Ensure your travel signature is less than 6 months old for re-entry."}
                  </p>
                </div>
              </div>
            )}
          </div>

          <div className="mt-12 pt-8 border-t border-slate-100 flex justify-between">
            <button onClick={() => setStep(s => s - 1)} disabled={step === 1} className={`font-bold text-sm ${step === 1 ? 'opacity-0' : 'text-slate-400 hover:text-slate-600'}`}>Back</button>
            <button 
              onClick={step === 3 ? handleSave : () => setStep(s => s + 1)} 
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-12 rounded-2xl shadow-xl transition-all"
            >
              {step === 3 ? 'Finish & Sync' : 'Next Step'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}