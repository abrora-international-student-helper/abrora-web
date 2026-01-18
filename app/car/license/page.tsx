'use client'

import React from 'react'
import { motion } from 'framer-motion'
import Navbar from "../../components/Nav";
import Footer from "../../components/common/footer";

export default function LicenseGuidePage() {
  const containerVars = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVars = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-[#F9F9F7] text-[#2D312E] font-sans">
      <Navbar />
      
      {/* Mesh Background */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-0">
        <div className="absolute top-[-10%] right-[-5%] w-[50%] h-[40%] bg-[#E8F0EE] rounded-full blur-[120px] opacity-60" />
        <div className="absolute bottom-[10%] left-[-5%] w-[40%] h-[50%] bg-[#E3E9F2] rounded-full blur-[100px] opacity-50" />
      </div>

      <motion.div 
        initial="hidden"
        animate="visible"
        variants={containerVars}
        className="max-w-4xl mx-auto relative z-10 py-16 px-6"
      >
        {/* Header Section */}
        <header className="mb-16 text-center">
          <motion.div variants={itemVars} className="inline-block px-4 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-xs font-bold uppercase tracking-widest mb-6">
            Beginner Guide
          </motion.div>
          <motion.h1 variants={itemVars} className="text-4xl md:text-6xl font-light tracking-tight mb-6">
            Mastering the <span className="font-semibold text-blue-900 italic">U.S. License</span>
          </motion.h1>
          <motion.p variants={itemVars} className="text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed">
            In the USA, a license is more than permission to drive—it is your primary ID, 
            a requirement for insurance, and the key to car ownership.
          </motion.p>
        </header>

        {/* State Flow Section */}
        <motion.section variants={itemVars} className="mb-16 bg-white/60 backdrop-blur-md rounded-[2.5rem] p-10 border border-white shadow-sm">
          <h2 className="text-2xl font-bold mb-8 text-gray-800 flex items-center gap-3">
            <span className="text-blue-500">🧩</span> The System Flow
          </h2>
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {['Permit', 'Practice', 'Road Test', 'Full License'].map((step, i) => (
              <React.Fragment key={step}>
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full bg-blue-900 text-white flex items-center justify-center font-bold mb-2 shadow-lg">
                    {i + 1}
                  </div>
                  <span className="text-sm font-bold text-gray-600 tracking-tight">{step}</span>
                </div>
                {i < 3 && <div className="hidden md:block h-px w-12 bg-gray-200" />}
              </React.Fragment>
            ))}
          </div>
        </motion.section>

        {/* Detailed Steps */}
        <div className="space-y-12">
          
          {/* Step 1: Permit */}
          <motion.section variants={itemVars} className="group relative pl-12 border-l-2 border-blue-100">
            <div className="absolute left-[-13px] top-0 w-6 h-6 rounded-full bg-white border-4 border-blue-500" />
            <h3 className="text-2xl font-bold mb-6">Step 1: Get Your Learner’s Permit</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-50">
                <h4 className="font-bold text-blue-900 mb-4 flex items-center gap-2">
                  📄 Required Documents
                </h4>
                <ul className="space-y-3 text-sm text-gray-600">
                  <li className="flex gap-2">✅ Passport & Visa</li>
                  <li className="flex gap-2">✅ I-94 Record</li>
                  <li className="flex gap-2">✅ Proof of Address</li>
                  <li className="flex gap-2 font-semibold text-orange-600">⚠️ SSN or SSA Ineligibility Letter</li>
                </ul>
              </div>
              <div className="bg-blue-900 text-white rounded-3xl p-6 shadow-xl">
                <h4 className="font-bold mb-4">The Written Test</h4>
                <p className="text-sm text-blue-100 leading-relaxed mb-4">
                  Computer-based multiple choice. Focus on:
                </p>
                <div className="flex flex-wrap gap-2">
                  {['Road Signs', 'Right-of-Way', 'Speed Limits'].map(t => (
                    <span key={t} className="px-3 py-1 bg-white/10 rounded-full text-[10px] uppercase font-bold tracking-widest">{t}</span>
                  ))}
                </div>
              </div>
            </div>
          </motion.section>

          {/* Step 2: Practice */}
          <motion.section variants={itemVars} className="group relative pl-12 border-l-2 border-blue-100">
            <div className="absolute left-[-13px] top-0 w-6 h-6 rounded-full bg-white border-4 border-orange-400" />
            <h3 className="text-2xl font-bold mb-6">Step 2: Practice Driving</h3>
            <div className="p-8 bg-orange-50/50 rounded-[2.5rem] border border-orange-100">
              <p className="text-sm text-orange-900 leading-relaxed italic mb-6">
                &quot;You cannot drive alone on a permit.&quot; You must have a licensed adult (usually 21+) in the car.
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="bg-white px-6 py-4 rounded-2xl shadow-sm border border-orange-100 flex-1 min-w-[200px]">
                  <p className="text-xs font-bold text-orange-600 uppercase mb-1">Recommendation</p>
                  <p className="text-sm font-medium">Use a Professional Driving School if you are a nervous beginner.</p>
                </div>
              </div>
            </div>
          </motion.section>

          {/* Step 3: Road Test */}
          <motion.section variants={itemVars} className="group relative pl-12 border-l-2 border-blue-100">
            <div className="absolute left-[-13px] top-0 w-6 h-6 rounded-full bg-white border-4 border-emerald-500" />
            <h3 className="text-2xl font-bold mb-6">Step 3: The Road Test</h3>
            <div className="bg-white rounded-[2.5rem] p-8 border border-gray-100 shadow-sm overflow-hidden relative">
              <div className="absolute top-0 right-0 p-6 text-6xl opacity-10">🛣️</div>
              <h4 className="font-bold text-gray-800 mb-4">Examiner Checklist:</h4>
              <div className="grid grid-cols-2 gap-4 text-sm text-gray-500">
                <p>● Starting & Stopping</p>
                <p>● Lane Changes</p>
                <p>● Signal Usage</p>
                <p>● Safe Parking</p>
              </div>
              <div className="mt-8 p-4 bg-emerald-50 rounded-2xl border border-emerald-100">
                <p className="text-xs font-bold text-emerald-800 mb-1">Car Requirements:</p>
                <p className="text-xs text-emerald-700">Valid registration, active insurance, and working lights/signals.</p>
              </div>
            </div>
          </motion.section>

        </div>

        {/* Beginner Mistakes Sidebar Style */}
        <motion.div variants={itemVars} className="mt-16 bg-red-50 rounded-[2.5rem] p-10 border border-red-100">
          <h4 className="text-red-900 font-bold mb-6 flex items-center gap-2">
            ⚠️ Beginner Mistakes to Avoid
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-red-800/80">
            <p>❌ Assuming IDP = U.S. license</p>
            <p>❌ Buying a car before insurance</p>
            <p>❌ Driving alone on a permit</p>
            <p>❌ Not studying road signs</p>
          </div>
        </motion.div>

        {/* FAQ Style Section */}
        <motion.div variants={itemVars} className="mt-12 text-center">
          <h4 className="text-xl font-bold mb-8 italic text-blue-900 leading-tight">
            &quot;Technically you can buy a car without a license, but practically, registration 
            and insurance are nearly impossible.&quot;
          </h4>
          <button 
            onClick={() => window.location.href = '/car'}
            className="text-xs font-bold tracking-[0.3em] text-gray-400 hover:text-blue-900 transition-all uppercase"
          >
            ← Back to Car Guide
          </button>
        </motion.div>

      </motion.div>
      <Footer />
    </div>
  )
}