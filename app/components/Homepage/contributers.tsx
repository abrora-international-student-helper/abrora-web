"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const universities = Array(8).fill({ 
  name: "SUNY Brockport", 
  logo: "/school/brockport.svg" 
});

export default function ContributorsPage() {
  return (
    <section className="bg-white py-12 px-6 overflow-hidden h-full flex flex-col justify-center">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="flex flex-col items-center text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#00533e] mb-6 px-4 py-1.5 border border-[#00533e]/20 rounded-full bg-[#f6faf8]"
          >
            Institutional Partners
          </motion.span>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-bold tracking-tight text-slate-900 leading-[1.1] max-w-4xl"
          >
            Insights from the <br />
            Brockport community
          </motion.h2>
        </div>

        {/* Logo Cloud Section */}
        <div className="relative">
          {/* Subtle background glow to make the bright logos pop */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[300px] bg-gradient-to-r from-[#00533e]/5 via-[#ccac00]/5 to-[#00533e]/5 blur-[100px] -z-10" />

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 sm:grid-cols-4 gap-8 md:gap-16"
          >
            {universities.map((uni, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ 
                  scale: 1.1,
                  y: -5
                }}
                className="relative w-full h-16 flex items-center justify-center cursor-pointer"
              >
                <Image
                  src={uni.logo}
                  alt={uni.name}
                  width={160}
                  height={60}
                  className="object-contain"
                  priority={index < 4}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Footer Subtext */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-20"
        >
          <p className="text-sm font-semibold text-slate-500 tracking-wide">
            Official Contributors • Class of 2026
          </p>
        </motion.div>
      </div>
    </section>
  );
}