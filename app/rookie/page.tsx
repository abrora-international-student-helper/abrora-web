"use client";

import React, { useState } from 'react';
import { 
  GraduationCap, FileText, Landmark, ShieldCheck, 
  Stethoscope, Briefcase, ChevronRight, Info, 
  CheckCircle2, Globe, ArrowRight, AlertTriangle
} from 'lucide-react';

const RookieDashboard = () => {
  const [activeTab, setActiveTab] = useState(0);

  const steps = [
    {
      id: 1,
      title: "Academic Requirements",
      description: "University standards & entrance exams",
      icon: <GraduationCap size={20} />,
      details: [
        {
          label: "GPA & Academic Records",
          text: "Your high school or +2 grades are the foundation. U.S. universities convert NEB grades into a 4.0 GPA scale. A strong GPA is your primary tool for securing merit-based scholarships and establishing academic credibility for your visa interview."
        },
        {
          label: "Standardized Tests (SAT/ACT)",
          text: "While many schools are now 'test-optional,' high SAT (Math/Reading) or ACT scores significantly boost admission chances at top-tier universities and often unlock higher-tier scholarship funding. Not typically required for Graduate students."
        },
        {
          label: "English Proficiency",
          text: "Mandatory for Nepali students. IELTS (Target: 6.5+), TOEFL iBT (Target: 80+), or Duolingo English Test (Target: 110+). Ensure the school accepts your chosen test before booking the exam."
        }
      ]
    },
    {
      id: 2,
      title: "Financials & I-20",
      description: "Funding and official enrollment",
      icon: <Landmark size={20} />,
      details: [
        {
          label: "Proof of Funding",
          text: "You must demonstrate the ability to cover tuition and living expenses for at least one year. Documentation includes Bank Balance Certificates, formal Sponsor Letters, and Proof of Income sources (property rental, business, or salary)."
        },
        {
          label: "The I-20 Certificate",
          text: "Once your financials are verified, the university issues the I-20. This is a legal document confirming your F-1 eligibility, program duration, and estimated costs. It is required to pay the SEVIS fee."
        }
      ]
    },
    {
      id: 3,
      title: "Visa & Legal",
      description: "U.S. Embassy & Nepal Gov processes",
      icon: <ShieldCheck size={20} />,
      details: [
        {
          label: "F-1 Student Visa",
          text: "The process involves: 1. Paying the SEVIS I-901 fee. 2. Completing the DS-160 form. 3. Scheduling and attending the interview. Your focus should be on your academic intent and strong ties to Nepal."
        },
        {
          label: "NOC (No Objection Certificate)",
          text: "A mandatory requirement from the Ministry of Education in Nepal. You need this to legally exchange currency at banks and it is frequently checked by immigration officers at TIA airport."
        }
      ]
    },
    {
      id: 4,
      title: "Health & Departure",
      description: "Medical clearances and logistics",
      icon: <Stethoscope size={20} />,
      details: [
        {
          label: "Medical Requirements",
          text: "U.S. campuses are strict about health. Common requirements include MMR (Measles, Mumps, Rubella), Hepatitis B, and Meningitis vaccines. A TB (Tuberculosis) screening or Jaundice history is often required upon arrival."
        },
        {
          label: "Travel & Records",
          text: "Carry a folder with physical copies of your I-20, Passport, Admission Letter, Vaccination records, and Police Report. Tip: Book flights with at least 3 hours of layover for U.S. Customs clearance."
        }
      ]
    },
    {
      id: 5,
      title: "U.S. Immigration & Work",
      description: "Arrival and employment rules",
      icon: <Briefcase size={20} />,
      details: [
        {
          label: "Port of Entry (CBP)",
          text: "Upon landing, you will meet a Customs and Border Protection officer. Present your I-20 and Passport. Be prepared to state your university name and major clearly."
        },
        {
          label: "Employment Regulations",
          text: "On-campus work is limited to 20 hours/week during sessions and 40 hours during breaks. Off-campus work (even remote) is illegal without CPT/OPT authorization. Violating this can lead to immediate deportation."
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-[#f1f5f9] flex items-center justify-center p-4 md:p-10 font-sans antialiased">
      <div className="max-w-6xl w-full bg-white rounded-[2.5rem] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] border border-slate-200 flex flex-col md:flex-row overflow-hidden min-h-[750px]">
        
        {/* Sidebar Navigation */}
        <div className="w-full md:w-[320px] bg-gradient-to-br from-[#1e40af] via-[#1e3a8a] to-[#172554] p-10 text-white flex flex-col">
          <div className="flex items-center gap-4 mb-12">
            <div className="bg-white/10 p-2.5 rounded-2xl backdrop-blur-md border border-white/10">
              <Globe className="text-blue-300" size={28} />
            </div>
            <div>
              <h2 className="font-bold tracking-tight text-xl leading-none">ABRORA</h2>
              <p className="text-blue-300/60 text-[10px] uppercase tracking-[0.2em] mt-1.5 font-bold">Elite Rookie Guide</p>
            </div>
          </div>

          <nav className="space-y-3 flex-1">
            {steps.map((step, index) => (
              <button
                key={step.id}
                onClick={() => setActiveTab(index)}
                className={`w-full flex items-center gap-4 p-4 rounded-2xl transition-all duration-300 group ${
                  activeTab === index 
                  ? 'bg-white text-blue-900 shadow-xl scale-[1.02]' 
                  : 'hover:bg-white/5 text-white/70 hover:text-white'
                }`}
              >
                <div className={`${activeTab === index ? 'text-blue-600' : 'text-blue-300/40 group-hover:text-blue-200'}`}>
                  {step.icon}
                </div>
                <div className="text-left">
                  <p className="text-sm font-bold tracking-tight">{step.title}</p>
                  <p className={`text-[10px] uppercase tracking-wider font-bold mt-0.5 ${activeTab === index ? 'text-blue-500' : 'text-blue-300/30'}`}>Step 0{step.id}</p>
                </div>
              </button>
            ))}
          </nav>

          <div className="mt-10 p-5 bg-white/5 rounded-[2rem] border border-white/5 backdrop-blur-sm">
            <div className="flex items-center gap-2 mb-2 text-blue-300">
              <AlertTriangle size={14} />
              <span className="text-[10px] font-bold uppercase tracking-wider">Reality Check</span>
            </div>
            <p className="text-[11px] text-blue-100/70 leading-relaxed italic">
              Academic success in the US requires extreme discipline and cultural adaptability.
            </p>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 flex flex-col bg-white">
          {/* Header */}
          <div className="p-10 border-b border-slate-100 flex justify-between items-start">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="h-1 w-12 bg-blue-600 rounded-full" />
                <span className="text-[10px] font-black text-blue-600 uppercase tracking-[0.3em]">Direct Roadmap</span>
              </div>
              <h1 className="text-3xl font-black text-slate-900 tracking-tight">
                {steps[activeTab].title}
              </h1>
              <p className="text-slate-500 font-medium mt-1">{steps[activeTab].description}</p>
            </div>
            <div className="hidden lg:block">
               <div className="px-5 py-2.5 bg-slate-50 border border-slate-100 rounded-2xl text-[11px] font-bold text-slate-400">
                 REVISION 2.0.4
               </div>
            </div>
          </div>

          {/* Details Content */}
          <div className="p-10 flex-1 overflow-y-auto">
            <div className="grid gap-10">
              {steps[activeTab].details.map((detail, idx) => (
                <div key={idx} className="group flex gap-6">
                  <div className="flex flex-col items-center">
                    <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 font-bold text-sm border border-blue-100 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                      {idx + 1}
                    </div>
                    {idx !== steps[activeTab].details.length - 1 && (
                      <div className="w-px h-full bg-slate-100 my-2" />
                    )}
                  </div>
                  <div className="flex-1 pt-1">
                    <h3 className="font-black text-slate-800 uppercase text-[11px] tracking-[0.2em] mb-3 flex items-center gap-2">
                      {detail.label}
                      <CheckCircle2 size={14} className="text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </h3>
                    <p className="text-slate-600 leading-relaxed text-[15px] font-medium">
                      {detail.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Footer Action Bar */}
          <div className="p-8 bg-slate-50/50 border-t border-slate-100 flex justify-between items-center">
            <div className="flex items-center gap-3 text-slate-400">
              <Info size={18} className="text-blue-500" />
              <p className="text-[11px] font-bold uppercase tracking-widest">Global Admissions Protocol</p>
            </div>
            <button 
              onClick={() => setActiveTab((prev) => (prev + 1) % steps.length)}
              className="group flex items-center gap-3 bg-[#1e40af] hover:bg-[#1e3a8a] text-white pl-6 pr-5 py-3.5 rounded-2xl font-bold text-sm transition-all shadow-[0_10px_20px_rgba(30,64,175,0.2)] hover:shadow-[0_15px_30px_rgba(30,64,175,0.3)] active:scale-95"
            >
              Progress Journey
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RookieDashboard;