"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Calendar,
  Shield,
  ClipboardCheck,
  CheckCircle2,
  Bell,
  FileText,
  Lock,
  Plane,
} from "lucide-react";

const FeatureRow = ({
  title,
  description,
  badge,
  color,
  imageSide = "left",
  children,
}: any) => {
  const isLeft = imageSide === "left";

  return (
    <div
      className={`flex flex-col ${isLeft ? "md:flex-row" : "md:flex-row-reverse"} items-center gap-12 md:gap-20 py-16 md:py-24`}
    >
      {/* Visual Content */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 30 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: [0.215, 0.61, 0.355, 1] }}
        className="w-full md:w-1/2 flex justify-center"
      >
        <div
          className={`relative w-full max-w-sm aspect-square rounded-[3rem] ${color} p-8 flex items-center justify-center shadow-2xl`}
        >
          {children}

          {/* Floating Accessory */}
          <motion.div
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-3 -right-3 bg-white p-3 rounded-xl shadow-lg z-10"
          >
            <CheckCircle2 className="w-5 h-5 text-green-500" />
          </motion.div>
        </div>
      </motion.div>

      {/* Text Content */}
      <motion.div
        initial={{ opacity: 0, x: isLeft ? 30 : -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, delay: 0.15 }}
        className="w-full md:w-1/2"
      >
        <div className="flex flex-col items-start">
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 mb-4 px-3 py-1 border border-gray-200 rounded-full bg-gray-50">
            {badge}
          </span>
          <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 tracking-tight leading-tight">
            {title}
          </h3>
          <p className="text-base md:text-lg text-gray-500 mb-8 leading-relaxed max-w-md">
            {description}
          </p>
          <motion.button
            whileHover={{ x: 4 }}
            whileTap={{ scale: 0.98 }}
            className="group flex items-center gap-2 bg-gray-900 text-white px-6 py-3 rounded-full font-semibold transition-all shadow-lg shadow-gray-200 hover:shadow-xl"
          >
            Learn more
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

const FeaturesSection = () => {
  return (
    <section id="features" className="bg-gradient-to-b from-white to-gray-50 px-6 py-16">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary mb-3 inline-block">
            Features
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Everything you need to thrive
          </h2>
        </motion.div>

        {/* Feature 1 - Visa Tracking */}
        <FeatureRow
          badge="Visa Tracking"
          title="Never miss a deadline again"
          description="Stay ahead of OPT, CPT, and I-20 deadlines with smart reminders. We'll notify you 30, 14, and 7 days before important dates."
          color="bg-gradient-to-br from-blue-400 to-blue-600"
          imageSide="left"
        >
          <div className="bg-white/95 backdrop-blur-xl shadow-xl rounded-2xl p-6 w-full max-w-[280px] transform -rotate-3">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center">
                <Calendar className="text-blue-600 w-5 h-5" />
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900">I-20 Expiry</p>
                <p className="text-xs text-gray-500">14 days remaining</p>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2 p-2 bg-amber-50 rounded-lg">
                <Bell className="w-4 h-4 text-amber-600" />
                <span className="text-xs text-amber-700 font-medium">Reminder set</span>
              </div>
              <div className="flex items-center gap-2 p-2 bg-green-50 rounded-lg">
                <CheckCircle2 className="w-4 h-4 text-green-600" />
                <span className="text-xs text-green-700 font-medium">Documents ready</span>
              </div>
            </div>
          </div>
        </FeatureRow>

        {/* Feature 2 - Document Vault */}
        <FeatureRow
          badge="Document Vault"
          title="Your documents, always secure"
          description="Store your Passport, I-20, I-94, and SSN with military-grade encryption. Access them instantly from any device, anywhere."
          color="bg-gradient-to-br from-emerald-400 to-teal-600"
          imageSide="right"
        >
          <div className="bg-white/95 backdrop-blur-xl shadow-xl rounded-2xl p-6 w-full max-w-[280px] transform rotate-3">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Shield className="text-emerald-600 w-5 h-5" />
                <span className="text-sm font-semibold text-gray-900">Vault</span>
              </div>
              <div className="flex items-center gap-1 text-xs text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">
                <Lock className="w-3 h-3" />
                <span>Encrypted</span>
              </div>
            </div>
            <div className="space-y-2">
              {["Passport", "I-20", "Visa", "I-94"].map((doc, i) => (
                <div key={doc} className="flex items-center gap-3 p-2 bg-gray-50 rounded-lg">
                  <FileText className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-700">{doc}</span>
                  <CheckCircle2 className="w-4 h-4 text-green-500 ml-auto" />
                </div>
              ))}
            </div>
          </div>
        </FeatureRow>

        {/* Feature 3 - Onboarding Checklist */}
        <FeatureRow
          badge="Onboarding"
          title="Your arrival roadmap"
          description="From landing at the airport to opening a bank account — we guide you through every step of settling into life in the U.S."
          color="bg-gradient-to-br from-orange-400 to-rose-500"
          imageSide="left"
        >
          <div className="bg-white/95 backdrop-blur-xl shadow-xl rounded-2xl p-6 w-full max-w-[280px] transform -rotate-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center">
                <Plane className="text-orange-600 w-5 h-5" />
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900">Arrival Checklist</p>
                <p className="text-xs text-gray-500">4 of 8 completed</p>
              </div>
            </div>
            <div className="space-y-2">
              {[
                { task: "Get SIM card", done: true },
                { task: "Open bank account", done: true },
                { task: "Campus ID", done: false },
                { task: "Health insurance", done: false },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center ${item.done ? "bg-green-500" : "border-2 border-gray-200"}`}>
                    {item.done && (
                      <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                  <span className={`text-sm ${item.done ? "text-gray-400 line-through" : "text-gray-700"}`}>
                    {item.task}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </FeatureRow>
      </div>
    </section>
  );
};

export default FeaturesSection;
