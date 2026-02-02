"use client";

import React, { useState } from 'react';
import { 
  HeartPulse, 
  ShieldCheck, 
  Stethoscope, 
  Wallet, 
  FileWarning, 
  Activity, 
  Pill, 
  PhoneCall,
  HelpCircle,
  BrainCircuit,
  CalendarCheck,
  ArrowRight,
  Info
} from 'lucide-react';

const HealthcarePage = () => {
  const [activeSection, setActiveSection] = useState(0);

  const sections = [
    {
      id: 1,
      title: "The Big Picture",
      subtitle: "Why U.S. Healthcare is different",
      icon: <Activity size={20} />,
      color: "bg-red-50 text-red-600",
      content: [
        { label: "Not Free", text: "Unlike some countries, healthcare in the USA is private and extremely expensive. A simple ER visit can cost $3,000+ without insurance." },
        { label: "Mandatory", text: "Insurance is not a choice; it is a requirement for enrollment and visa compliance. You cannot register for classes without it." }
      ]
    },
    {
      id: 2,
      title: "Insurance Types",
      subtitle: "University vs Private Plans",
      icon: <ShieldCheck size={20} />,
      color: "bg-blue-50 text-blue-600",
      content: [
        { label: "University Plan", text: "The most common option. It's pre-approved, covers on-campus clinics, and fulfills all legal requirements automatically." },
        { label: "Private Waiver", text: "You can buy external insurance if it meets the university's strict minimum standards. This requires a 'Waiver' approval before the deadline." }
      ]
    },
    {
      id: 3,
      title: "Financial Terms",
      subtitle: "Understanding your bill",
      icon: <Wallet size={20} />,
      color: "bg-emerald-50 text-emerald-600",
      content: [
        { label: "Premium", text: "The fixed amount you pay every semester to keep the insurance active." },
        { label: "Deductible", text: "The amount you pay out of pocket before the insurance company starts covering costs." },
        { label: "Copay / Coinsurance", text: "Your share of the cost for a specific visit (e.g., $20 for a doctor or 20% of a bill)." },
        { label: "Out-of-Pocket Max", text: "The absolute limit you will pay in a year; after this, insurance pays 100%." }
      ]
    },
    {
      id: 4,
      title: "Medical Prep",
      subtitle: "Requirements for Nepali Students",
      icon: <Stethoscope size={20} />,
      color: "bg-indigo-50 text-indigo-600",
      content: [
        { label: "Vaccinations", text: "Mandatory proof of MMR, Hepatitis B, Varicella, and Meningitis is usually required." },
        { label: "TB Screening", text: "Students from Nepal must undergo a TB blood test (IGRA) or a chest X-ray to clear university health blocks." },
        { label: "Records", text: "Upload your translated medical history to the university portal at least 4 weeks before arrival." }
      ]
    },
    {
      id: 5,
      title: "Mental Health",
      subtitle: "Counseling & Support",
      icon: <BrainCircuit size={20} />,
      color: "bg-purple-50 text-purple-600",
      content: [
        { label: "Support is Normal", text: "Homesickness and academic stress are common. Universities provide free or low-cost confidential counseling." },
        { label: "Confidentiality", text: "Your mental health records are private and are never shared with professors, family, or immigration." }
      ]
    },
    {
      id: 6,
      title: "Emergencies",
      subtitle: "What to do in a crisis",
      icon: <PhoneCall size={20} />,
      color: "bg-orange-50 text-orange-600",
      content: [
        { label: "Dial 911", text: "For life-threatening emergencies only. Ambulances are expensive but life-saving." },
        { label: "Urgent Care", text: "For non-life-threatening issues (flu, minor cuts), use 'Urgent Care' centers—they are much cheaper than the Emergency Room (ER)." }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-[#f8fafc] p-6 md:p-12 font-sans antialiased">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-3">
              <span className="bg-blue-600 h-1.5 w-10 rounded-full" />
              <span className="text-[11px] font-black text-blue-600 uppercase tracking-[0.3em]">Healthcare Protocol</span>
            </div>
            <h1 className="text-4xl font-black text-slate-900 mb-4 tracking-tight">
              International Student <br />
              <span className="text-blue-600 underline decoration-blue-200 underline-offset-8">Insurance Guide</span>
            </h1>
            <p className="text-slate-500 font-medium leading-relaxed">
              Medical care in the U.S. is complex and costly. This guide ensures you are protected from financial hardship and stay compliant with university regulations.
            </p>
          </div>
          
          <div className="bg-white border border-slate-200 p-4 rounded-3xl shadow-sm flex items-center gap-4">
            <div className="p-3 bg-red-50 text-red-600 rounded-2xl">
              <FileWarning size={24} />
            </div>
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none mb-1">Warning</p>
              <p className="text-sm font-bold text-slate-800 italic">Never travel without insurance.</p>
            </div>
          </div>
        </div>

        {/* Grid System */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Navigation */}
          <div className="lg:col-span-4 space-y-3">
            {sections.map((section, index) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(index)}
                className={`w-full flex items-center gap-4 p-5 rounded-[2rem] transition-all duration-300 border-2 ${
                  activeSection === index 
                  ? 'bg-white border-blue-600 shadow-xl shadow-blue-100' 
                  : 'bg-transparent border-transparent text-slate-500 hover:bg-slate-100'
                }`}
              >
                <div className={`p-3 rounded-2xl transition-all ${activeSection === index ? section.color : 'bg-slate-200 text-slate-400'}`}>
                  {section.icon}
                </div>
                <div className="text-left">
                  <h3 className={`font-bold text-sm ${activeSection === index ? 'text-slate-900' : 'text-slate-500'}`}>
                    {section.title}
                  </h3>
                  <p className="text-[10px] uppercase font-bold tracking-widest opacity-60">Phase 0{section.id}</p>
                </div>
              </button>
            ))}
          </div>

          {/* Right Content Area */}
          <div className="lg:col-span-8">
            <div className="bg-white rounded-[3rem] border border-slate-200 shadow-sm p-8 md:p-12 min-h-[500px] relative overflow-hidden">
              {/* Subtle Watermark Icon */}
              <div className="absolute -top-10 -right-10 text-slate-50 opacity-[0.03] rotate-12">
                {React.cloneElement(sections[activeSection].icon, { size: 300 })}
              </div>

              <div className="relative z-10">
                <div className="mb-10">
                  <h2 className="text-2xl font-black text-slate-800 mb-2">{sections[activeSection].subtitle}</h2>
                  <div className="h-1 w-20 bg-blue-600 rounded-full" />
                </div>

                <div className="grid gap-8">
                  {sections[activeSection].content.map((item, idx) => (
                    <div key={idx} className="group">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-6 h-6 rounded-full bg-blue-50 flex items-center justify-center">
                          <div className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                        </div>
                        <h4 className="font-bold text-[11px] text-blue-600 uppercase tracking-[0.2em]">{item.label}</h4>
                      </div>
                      <p className="text-slate-600 leading-relaxed font-medium pl-9 text-[15px]">
                        {item.text}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Integration Note */}
                <div className="mt-12 p-6 bg-slate-50 rounded-[2rem] flex items-start gap-4 border border-slate-100">
                  <Info className="text-blue-500 shrink-0" size={20} />
                  <p className="text-xs text-slate-500 leading-relaxed">
                    <strong>Note:</strong> Universities in the USA strictly follow HIPAA laws, meaning your medical information is private. Not even your sponsors or family can access your records without your written consent.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Quick Tips */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-indigo-600 rounded-[2rem] p-8 text-white">
            <div className="flex items-center gap-2 mb-4">
              <CalendarCheck size={20} className="text-indigo-200" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-indigo-200">Pre-Departure</span>
            </div>
            <h3 className="font-bold text-lg mb-2">Check the Waiver Deadline</h3>
            <p className="text-indigo-100 text-sm leading-relaxed opacity-80">
              If you plan to use private insurance from Nepal, submit your waiver forms at least 30 days before classes begin.
            </p>
          </div>

          <div className="bg-white border border-slate-200 rounded-[2rem] p-8">
             <div className="flex items-center gap-2 mb-4">
              <Pill size={20} className="text-blue-600" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Prescriptions</span>
            </div>
            <h3 className="font-bold text-lg text-slate-800 mb-2">Carry Your Records</h3>
            <p className="text-slate-500 text-sm leading-relaxed">
              If you take regular medication, bring a 3-month supply and a signed doctor's prescription translated into English.
            </p>
          </div>

          <div className="bg-slate-900 rounded-[2rem] p-8 text-white flex flex-col justify-between">
            <h3 className="font-bold text-lg leading-tight">Ready to move to the next phase?</h3>
            <button className="mt-6 flex items-center justify-between bg-blue-600 hover:bg-blue-700 p-4 rounded-2xl transition-all group">
              <span className="font-bold text-sm">View Housing Guide</span>
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default HealthcarePage;