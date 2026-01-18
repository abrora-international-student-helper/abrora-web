import React from "react";
import Link from "next/link";
import Navbar from "../components/Nav";
import Footer from "../components/common/footer";
/**
 * Hims-inspired Light Mode UI
 * Focuses on high-contrast typography, soft backgrounds, and clean card layouts.
 */

export default function CarGuidePage() {
  const categories = [
    { id: "license", title: "Driver's license", icon: "🪪", color: "bg-blue-50", textColor: "text-blue-600" },
    { id: "budget", title: "Budget & Costs", icon: "💸", color: "bg-orange-50", textColor: "text-orange-600" },
    { id: "used", title: "Buying Used", icon: "🚗", color: "bg-indigo-50", textColor: "text-indigo-600" },
    { id: "insurance", title: "Insurance", icon: "🛡️", color: "bg-green-50", textColor: "text-green-600" },
    { id: "registration", title: "Registration", icon: "🏷️", color: "bg-amber-50", textColor: "text-amber-600" },
    { id: "maintenance", title: "Maintenance", icon: "🔧", color: "bg-rose-50", textColor: "text-rose-600" },
  ];

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans">
      {/* Premium Thin Navbar */}
   <Navbar/>

      <main className="mx-auto max-w-6xl px-8 py-16">
        {/* Hero Section - Centered & Bold */}
        <header className="mb-20 text-center">
          <h2 className="text-6xl font-extrabold tracking-tight lg:text-8xl text-gray-900">
            Car buying <br />
            <span className="text-primary italic">made simple.</span>
          </h2>
          <p className="mx-auto mt-8 max-w-2xl text-xl leading-relaxed text-gray-500">
            Expert guidance for international students. Navigate the US car market 
            with confidence—from paperwork to the open road.
          </p>
        </header>

        {/* Feature Grid - Inspired by the Image provided */}
        <section className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((cat) => (
            <a
              key={cat.id}
              href={`#${cat.id}`}
              className="group relative flex flex-col justify-between rounded-[32px] bg-gray-50 p-10 transition-all hover:bg-white hover:shadow-2xl hover:shadow-gray-200/50"
            >
              <div className="flex justify-between items-start">
                <h3 className="text-2xl font-bold leading-tight">{cat.title}</h3>
                <span className="text-gray-300 group-hover:text-primary group-hover:translate-x-1 transition-all">→</span>
              </div>
              <div className="mt-16 flex items-center justify-center">
                <div className={`flex h-24 w-24 items-center justify-center rounded-3xl text-4xl shadow-inner ${cat.color} ${cat.textColor}`}>
                  {cat.icon}
                </div>
              </div>
            </a>
          ))}
        </section>

        <div className="my-24 h-px bg-gray-100 w-full" />

        {/* Content Strategy Section */}
        <div className="grid gap-20 lg:grid-cols-12">
          {/* Main Content Area */}
          <div className="lg:col-span-7 space-y-24">
            
            {/* Step 1: The License */}
            <section id="license" className="scroll-mt-28">
              <div className="flex items-center gap-3 mb-6">
                <span className="h-8 w-8 rounded-full bg-primary-lighter flex items-center justify-center text-primary font-bold text-sm">01</span>
                <span className="text-sm font-bold uppercase tracking-widest text-primary">The Foundation</span>
              </div>
              <h3 className="text-4xl font-extrabold tracking-tight">Master the US License</h3>
              <p className="mt-6 text-lg leading-relaxed text-gray-600">
                Most students assume an International Driving Permit (IDP) is enough. In many states, it's only valid for 30 days once you establish residency. 
              </p>
              
              <div className="mt-10 space-y-8">
                <GuideDetail 
                  title="The SSA No-Letter" 
                  desc="If you aren't eligible for an SSN, you need a 'Letter of Ineligibility' from the Social Security Office before visiting the DMV." 
                />
                <GuideDetail 
                  title="State-Specific Handbooks" 
                  desc="US traffic laws (like turning right on red) vary by state. Always study the local state manual, not just general US rules." 
                />
              </div>
            </section>

            {/* Step 2: Buying Tips */}
            <section id="used" className="scroll-mt-28">
               <div className="flex items-center gap-3 mb-6">
                <span className="h-8 w-8 rounded-full bg-secondary-lighter flex items-center justify-center text-secondary font-bold text-sm">02</span>
                <span className="text-sm font-bold uppercase tracking-widest text-secondary">The Acquisition</span>
              </div>
              <h3 className="text-4xl font-extrabold tracking-tight">Buying Without Regret</h3>
              <div className="mt-8 overflow-hidden rounded-[32px] border border-gray-100 bg-white">
                <div className="p-8 border-b border-gray-50">
                  <h4 className="font-bold text-lg text-primary">The "Lemon" Protection</h4>
                  <p className="mt-2 text-gray-500">Always request a CARFAX. If the seller hides the VIN (Vehicle Identification Number), walk away immediately.</p>
                </div>
                <div className="p-8">
                  <h4 className="font-bold text-lg text-secondary">The Pre-Purchase Inspection (PPI)</h4>
                  <p className="mt-2 text-gray-500">Take the car to a local mechanic (not the seller's) and pay for a full inspection. It costs ~$100 but can save you $3,000 in hidden repairs.</p>
                </div>
              </div>
            </section>
          </div>

          {/* Sticky Checklist Sidebar */}
          <aside className="lg:col-span-5">
            <div className="sticky top-28 rounded-[40px] bg-primary-lighter p-10">
              <h4 className="text-2xl font-black text-primary-dark">Step-by-step</h4>
              <p className="mt-2 text-primary-dark/60 font-medium">Your progress is saved automatically.</p>
              
              <div className="mt-10 space-y-5">
                {[
                  "Check State Residency Requirements",
                  "Get SSA Letter of Ineligibility",
                  "Schedule Vision & Written Test",
                  "Compare Insurance Quotes (VIN required)",
                  "Perform Pre-Purchase Inspection",
                  "Verify Clean Title Transfer",
                  "Complete DMV Registration"
                ].map((step, idx) => (
                  <label key={idx} className="flex cursor-pointer items-start gap-4 group">
                    <div className="relative flex items-center justify-center mt-1">
                      <input type="checkbox" className="peer h-6 w-6 cursor-pointer appearance-none rounded-full border-2 border-primary-muted bg-white checked:bg-primary checked:border-primary transition-all" />
                      <span className="absolute text-white opacity-0 peer-checked:opacity-100 transition-opacity">✓</span>
                    </div>
                    <span className="text-sm font-bold text-primary-dark group-hover:text-primary transition">{step}</span>
                  </label>
                ))}
              </div>

              <div className="mt-12 rounded-2xl bg-white/50 p-6 text-sm text-primary-dark/80 font-medium border border-primary-muted">
                💡 <strong>Pro Tip:</strong> Rates are usually lower if you get your license first, then buy the car 2 weeks later.
              </div>
            </div>
          </aside>
        </div>
      </main>

      <Footer/>
    </div>
  );
}

function GuideDetail({ title, desc }) {
  return (
    <div className="group">
      <h5 className="text-lg font-bold group-hover:text-primary transition">{title}</h5>
      <p className="mt-2 text-gray-500 leading-relaxed">{desc}</p>
    </div>
  );
}