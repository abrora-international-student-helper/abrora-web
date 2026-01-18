"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, BarChart3, Layers, Zap, CheckCircle2 } from "lucide-react";

const FeatureRow = ({ title, description, badge, color, imageSide = "left", children }: any) => {
  const isLeft = imageSide === "left";

  return (
    <div className={`flex flex-col ${isLeft ? "md:flex-row" : "md:flex-row-reverse"} items-center gap-12 md:gap-24 py-16 md:py-24`}>
      {/* Visual Content */}
      <motion.div 
        initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full md:w-1/2 flex justify-center"
      >
        <div className={`relative w-full max-w-md aspect-square rounded-[2.5rem] ${color} p-8 flex items-center justify-center shadow-2xl shadow-gray-200`}>
          {children}
          {/* Subtle floating element for depth */}
          <motion.div
            animate={{ y: [0, -15, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-4 -right-4 bg-white p-4 rounded-2xl shadow-xl"
          >
             <CheckCircle2 className="w-6 h-6 text-green-500" />
          </motion.div>
        </div>
      </motion.div>

      {/* Text Content */}
      <motion.div 
        initial={{ opacity: 0, x: isLeft ? 50 : -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full md:w-1/2"
      >
        <div className="flex flex-col items-start">
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 mb-4 px-3 py-1 border border-gray-200 rounded-full">
            {badge}
          </span>
          <h3 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 tracking-tight leading-tight">
            {title}
          </h3>
          <p className="text-lg text-gray-500 mb-8 leading-relaxed max-w-lg">
            {description}
          </p>
          <button className="group flex items-center gap-2 bg-gray-900 text-white px-6 py-3 rounded-full font-semibold transition-all hover:pr-8 active:scale-95">
            Learn more
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </motion.div>
    </div>
  );
};

const FeaturesSection = () => {
  return (
    <section id="features" className="bg-white py-20 px-6 overflow-hidden h-full flex flex-col justify-center">
      <div className="max-w-7xl mx-auto">
        
        {/* Feature 1 - AI Analytics (Orange/Yellow) */}
        <FeatureRow
          badge="AI Analytics"
          title="See exactly what your students need"
          description="Real-time insights reveal learning gaps instantly. Our AI models analyze performance data to tell you where to focus your attention next."
          color="bg-[#FFB443]"
          imageSide="left"
        >
          {/* Mockup Card */}
          <div className="bg-white/90 backdrop-blur shadow-lg rounded-2xl p-6 w-full max-w-[320px] transform -rotate-3 transition-transform hover:rotate-0">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-10 h-10 rounded-lg bg-orange-100 flex items-center justify-center">
                <BarChart3 className="text-orange-600 w-5 h-5" />
              </div>
              <div className="space-y-1 flex-1">
                <div className="h-2 w-24 bg-gray-200 rounded-full" />
                <div className="h-2 w-16 bg-gray-100 rounded-full" />
              </div>
            </div>
            <div className="space-y-3 mt-4">
              <div className="h-2 w-full bg-gray-50 rounded-full" />
              <div className="h-2 w-full bg-gray-50 rounded-full" />
              <div className="h-2 w-3/4 bg-gray-50 rounded-full" />
            </div>
          </div>
        </FeatureRow>

        {/* Feature 2 - Test Creation (Light Blue) */}
        <FeatureRow
          badge="Test Creation"
          title="Generate assessments in seconds, not hours"
          description="Focus on teaching, not formatting. Our smart engine builds curriculum-aligned tests and quizzes with just a few clicks."
          color="bg-[#A0D4FF]"
          imageSide="right"
        >
          {/* Mockup Card */}
          <div className="bg-white/90 backdrop-blur shadow-lg rounded-2xl p-6 w-full max-w-[320px] transform rotate-2 transition-transform hover:rotate-0">
            <div className="flex items-center gap-2 mb-6">
               <div className="w-full h-3 bg-gray-900 rounded-full" />
               <Layers className="text-blue-500 w-5 h-5" />
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 rounded border-2 border-gray-200" />
                <div className="h-2 w-full bg-gray-100 rounded-full" />
              </div>
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 rounded border-2 border-gray-200" />
                <div className="h-2 w-full bg-gray-100 rounded-full" />
              </div>
            </div>
          </div>
        </FeatureRow>

        {/* Feature 3 - Fast Sync (Violet) */}
        <FeatureRow
          badge="Fast Sync"
          title="Stay synchronized across every device"
          description="Whether you're on your laptop in the classroom or checking progress on your phone, everything stays in perfect harmony."
          color="bg-[#E2D1FF]"
          imageSide="left"
        >
          <Zap className="w-24 h-24 text-violet-600" />
        </FeatureRow>

      </div>
    </section>
  );
};

export default FeaturesSection;