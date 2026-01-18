"use client"

import React from 'react';
import { motion } from 'framer-motion';
import { UserPlus, CloudUpload, Zap, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function HowItWorksPage() {
  // Animation settings
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  const steps = [
    {
      step: "01",
      title: "Create your profile",
      desc: "Tell us your university, major, and visa status. We'll customize your entire dashboard to your specific journey.",
      icon: <UserPlus className="h-6 w-6" />,
      tag: "Fast Setup"
    },
    {
      step: "02",
      title: "Secure your documents",
      desc: "Upload your I-20, Passport, and Visa to your encrypted vault. Access them instantly anywhere in the world.",
      icon: <CloudUpload className="h-6 w-6" />,
      tag: "Bank-Level Security"
    },
    {
      step: "03",
      title: "Master your milestones",
      desc: "Get automated alerts for OPT deadlines, travel signatures, and visa renewals so you never miss a beat.",
      icon: <Zap className="h-6 w-6" />,
      tag: "Smart Alerts"
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Header for the page */}
      <section className="bg-gray-50 py-20 border-b border-gray-100">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1 text-sm font-semibold text-blue-600 mb-6"
          >
            <CheckCircle2 className="h-4 w-4" />
            <span>Simple 3-step process</span>
          </motion.div>
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 md:text-6xl">
            How <span className="text-blue-600">Abrora</span> Works
          </h1>
          <p className="mt-6 text-xl text-gray-600 leading-relaxed">
            We’ve simplified the complex international student journey into a 
            single, easy-to-use digital companion.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="relative py-24">
        <div className="mx-auto max-w-6xl px-4">
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 gap-12 md:grid-cols-3"
          >
            {steps.map((s) => (
              <motion.div key={s.step} variants={itemVariants} className="group">
                <div className="relative flex flex-col h-full rounded-[2.5rem] border border-gray-100 bg-white p-10 transition-all duration-500 hover:-translate-y-4 hover:shadow-[0_40px_80px_-15px_rgba(0,0,0,0.1)]">
                  
                  {/* Step Badge */}
                  <div className="absolute -top-6 left-10 flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-600 text-white font-bold shadow-xl shadow-blue-200 group-hover:rotate-12 transition-transform">
                    {s.step}
                  </div>

                  <div className="mt-4">
                    <span className="text-xs font-bold uppercase tracking-widest text-blue-500">{s.tag}</span>
                    <div className="my-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gray-50 text-gray-700 transition-colors group-hover:bg-blue-50 group-hover:text-blue-600">
                      {s.icon}
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900">{s.title}</h2>
                    <p className="mt-4 text-gray-600 leading-relaxed">
                      {s.desc}
                    </p>
                  </div>

                  <div className="mt-auto pt-8">
                    <button className="flex items-center gap-2 text-sm font-bold text-gray-400 group-hover:text-blue-600 transition-colors">
                      Learn More <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Bottom Call to Action */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-24 rounded-[3rem] bg-gray-900 p-12 text-center text-white"
          >
            <h3 className="text-3xl font-bold">Ready to start your journey?</h3>
            <p className="mt-4 text-gray-400">Join 1,000+ students navigating the US with confidence.</p>
            <button className="mt-8 rounded-full bg-blue-600 px-8 py-4 font-bold text-white transition-transform hover:scale-105 active:scale-95 shadow-lg shadow-blue-500/20">
              Create Your Free Account
            </button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}