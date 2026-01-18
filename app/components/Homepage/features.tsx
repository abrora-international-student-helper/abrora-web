"use client"

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Calendar, Shield, ClipboardCheck, ArrowRight, Sparkles } from 'lucide-react';

const FeaturesSection = () => {
  // Container animation logic
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  // Individual card animation
  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.215, 0.61, 0.355, 1] },
    },
  };

  const features = [
    {
      icon: <Calendar className="h-6 w-6" />,
      title: "Visa Tracking",
      desc: "Stay ahead of OPT, CPT, and I-20 deadlines with smart reminders that keep you compliant.",
      tag: "Compliance",
      color: "blue",
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Document Vault",
      desc: "Military-grade encryption for your Passport, I-94, and SSN. Access your essentials instantly.",
      tag: "Secure",
      color: "indigo",
    },
    {
      icon: <ClipboardCheck className="h-6 w-6" />,
      title: "Onboarding Checklist",
      desc: "A personalized roadmap from arrival to life setup: bank accounts, SIM cards, and health insurance.",
      tag: "Guided",
      color: "emerald",
    },
  ];

  return (
    <section id="features" className="relative overflow-hidden py-24 px-4 bg-white">
      {/* Subtle Mesh Gradient Background */}
      <div className="absolute top-0 left-1/2 -z-10 h-[600px] w-full -translate-x-1/2 opacity-20 blur-[120px] bg-[radial-gradient(circle_at_center,#3b82f6_0%,transparent_70%)]" />

      <div className="mx-auto max-w-6xl">
        {/* Header Section */}
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl"
          >
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1 text-xs font-bold uppercase tracking-wider text-blue-600">
              <Sparkles className="h-3 w-3" />
              Premium Features
            </div>
            <h2 className="text-4xl font-black tracking-tight text-gray-900 md:text-5xl">
              Everything you need, <br />
              <span className="text-gray-400 font-medium italic">nothing you don’t.</span>
            </h2>
            <p className="mt-6 text-lg text-gray-600 leading-relaxed">
              ABRORA is built to feel calm, fast, and secure. We’ve automated the complexity so you can focus on your studies.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <Link
              href="/signup"
              className="group inline-flex items-center justify-center gap-2 rounded-2xl bg-gray-900 px-8 py-4 text-base font-bold text-white transition-all hover:bg-blue-600 hover:shadow-xl hover:shadow-blue-500/20 active:scale-95"
            >
              Start now
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </div>

        {/* Features Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="mt-20 grid grid-cols-1 gap-8 md:grid-cols-3"
        >
          {features.map((f) => (
            <motion.div
              key={f.title}
              variants={cardVariants}
              whileHover={{ y: -8 }}
              className="group relative flex flex-col rounded-[2.5rem] bg-white p-8 ring-1 ring-gray-100 transition-all hover:shadow-2xl hover:shadow-blue-500/5 hover:ring-blue-100"
            >
              <div className="relative z-10">
                <div className="flex items-center justify-between">
                  <div className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-gray-50 text-gray-600 transition-colors group-hover:bg-blue-600 group-hover:text-white`}>
                    {f.icon}
                  </div>
                  <span className="rounded-full bg-gray-50 px-4 py-1 text-[10px] font-black uppercase tracking-widest text-gray-500 ring-1 ring-gray-200 group-hover:bg-blue-50 group-hover:text-blue-600 group-hover:ring-blue-100 transition-colors">
                    {f.tag}
                  </span>
                </div>
                
                <h3 className="mt-8 text-2xl font-bold text-gray-900">{f.title}</h3>
                <p className="mt-4 text-sm leading-relaxed text-gray-600">
                  {f.desc}
                </p>

                <div className="mt-8 inline-flex items-center gap-2 text-sm font-bold text-blue-600">
                  Learn more <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-2" />
                </div>
              </div>

              {/* Decorative Subtle Corner Glow */}
              <div className="absolute top-0 right-0 -z-10 h-32 w-32 rounded-bl-full bg-blue-50/50 opacity-0 transition-opacity group-hover:opacity-100" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesSection;