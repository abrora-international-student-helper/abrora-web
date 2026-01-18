"use client"

import React from 'react';
import { motion } from 'framer-motion';

const universities = [
  { initials: "ASU", name: "Arizona State", color: "bg-red-700" },
  { initials: "B", name: "Brown University", color: "bg-amber-900" },
  { initials: "CMU", name: "Carnegie Mellon", color: "bg-red-600" },
  { initials: "MIT", name: "MIT", color: "bg-gray-800" },
  { initials: "H", name: "Harvard", color: "bg-red-900" },
  { initials: "S", name: "Stanford", color: "bg-red-800" },
  { initials: "P", name: "Purdue", color: "bg-black" },
  { initials: "NYU", name: "NYU", color: "bg-purple-900" },
  { initials: "GT", name: "Georgia Tech", color: "bg-yellow-600" },
  { initials: "B", name: "Brockport", color: "bg-green-800" },
  { initials: "D", name: "UT Dallas", color: "bg-orange-700" },
  { initials: "UCLA", name: "UCLA", color: "bg-blue-600" },
];

export default function ContributorsPage() {
  return (
    <section className="h-full flex flex-col justify-center bg-white py-12 px-6">
      <div className="mx-auto max-w-7xl">
        
        {/* Header Section */}
        <div className="text-center mb-12 md:mb-16">
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-[11px] font-bold uppercase tracking-[0.3em] text-blue-600 mb-6"
          >
            OUR CONTRIBUTORS
          </motion.p>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-extrabold tracking-tight text-gray-900 md:text-6xl max-w-4xl mx-auto leading-[1.1]"
          >
            Experts and students from <span className="text-gray-400">top-tier institutions</span>
          </motion.h2>
        </div>

        {/* The Monogram Cloud */}
        <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-16 md:gap-x-20 md:gap-y-24 max-w-5xl mx-auto">
          {universities.map((uni, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ y: -10 }}
              className="group relative flex flex-col items-center cursor-default"
            >
              {/* The "Logo" Initial */}
              <div className="relative flex items-center justify-center">
                <span className="text-5xl md:text-7xl font-serif font-black tracking-tighter text-gray-200 group-hover:text-gray-900 transition-colors duration-500">
                  {uni.initials}
                </span>
                
                {/* Subtle underline that glows on hover */}
                <div className={`absolute -bottom-2 h-1 w-0 ${uni.color} transition-all duration-500 group-hover:w-full`} />
              </div>

              {/* University Name Subtext */}
              <span className="mt-4 text-[10px] font-bold uppercase tracking-widest text-gray-400 opacity-0 group-hover:opacity-100 transition-all duration-300">
                {uni.name}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Decorative Background Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 h-[600px] w-[600px] bg-blue-50/30 rounded-full blur-3xl" />
      </div>
    </section>
  );
}