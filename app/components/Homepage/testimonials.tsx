"use client"

import React from 'react';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

const row1 = [
  { id: 101, name: "Rahul Sharma", role: "CS Student", content: "Abrora made my visa application stress-free. All documents were organized!" },
  { id: 102, name: "Priya Patel", role: "Graduate", content: "The checklists are amazing! Guided me from pre-departure to US banking." },
  { id: 103, name: "John Peter", role: "MBA Student", content: "Found my part-time job thanks to Abrora's career tips and community." },
  { id: 104, name: "Sarah Chen", role: "PhD Candidate", content: "The document vault is a game changer for international travel." },
];

const row2 = [
  { id: 201, name: "Sutuls Hem", role: "Engineering", content: "Moving abroad was daunting, but this personal guide made it smooth." },
  { id: 202, name: "Rec Hayit", role: "Undergraduate", content: "The scanning alerts saved me from missing a critical I-20 deadline." },
  { id: 203, name: "Arjun Vyas", role: "MS Data Science", content: "The most professional tool I've used for my US transition. 10/10." },
  { id: 204, name: "Li Wei", role: "Art Student", content: "Simplified the complex medical and vaccine requirements perfectly." },
];

const TestimonialCard = ({ name, role, content, id }: any) => (
  <div className="w-[380px] shrink-0 px-4">
    <div className="group h-full rounded-[2.5rem] border border-gray-100 bg-white p-8 shadow-sm transition-all duration-500 hover:shadow-2xl hover:-translate-y-2">
      <div className="flex justify-between items-start mb-6">
        <div className="flex gap-1">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
          ))}
        </div>
        <Quote className="h-8 w-8 text-blue-100 group-hover:text-blue-600 transition-colors" />
      </div>

      <p className="text-gray-600 leading-relaxed italic mb-8 min-h-[80px]">"{content}"</p>
      
      <div className="flex items-center gap-4 border-t border-gray-50 pt-6">
        <img 
          // Using unique IDs ensures each student has a different face
          src={`https://images.unsplash.com/photo-${id % 2 === 0 ? '1539571696357-5a69c17a67c6' : '1507003211169-0a1dd7228f2d'}?auto=format&fit=crop&q=80&w=120&h=120`}
          alt={name}
          className="h-12 w-12 rounded-2xl object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
        />
        <div>
          <h4 className="text-base font-bold text-gray-900 group-hover:text-blue-600 transition-colors">{name}</h4>
          <p className="text-sm font-medium text-gray-400">{role}</p>
        </div>
      </div>
    </div>
  </div>
);

const InfiniteSlider = ({ items, direction = "left" }: { items: any[], direction?: "left" | "right" }) => {
  return (
    <div className="flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
      <motion.div 
        animate={{ x: direction === "left" ? ["0%", "-50%"] : ["-50%", "0%"] }}
        transition={{
          duration: 40,
          repeat: Infinity,
          ease: "linear",
        }}
        className="flex"
      >
        {[...items, ...items].map((item, idx) => (
          <TestimonialCard key={idx} {...item} />
        ))}
      </motion.div>
    </div>
  );
};

export default function TestimonialsPage() {
  return (
    <section className="relative min-h-full flex flex-col justify-center bg-[#FAFAFA] py-20 overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 -z-10 h-[500px] w-[500px] rounded-full bg-blue-50/50 blur-3xl opacity-50" />
      
      <div className="px-4 text-center mb-10 md:mb-14">
        <motion.span 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-blue-600 font-bold tracking-[0.2em] text-xs uppercase"
        >
          Testimonials
        </motion.span>
        <h2 className="mt-4 text-4xl font-black tracking-tight text-gray-900 md:text-6xl">
          Don't just take <br />
          <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">our word for it.</span>
        </h2>
      </div>

      <div className="flex flex-col gap-10">
        <InfiniteSlider items={row1} direction="left" />
        <InfiniteSlider items={row2} direction="right" />
      </div>

      <div className="mt-10 md:mt-14 flex flex-col items-center">
        {/* <div className="flex -space-x-3 mb-6">
          {[1, 2, 3, 4, 5].map((i) => (
            <img 
              key={i}
              className="h-12 w-12 rounded-full border-4 border-white object-cover"
              src={`https://i.pravatar.cc/100?img=${i + 10}`} 
              alt="User"
            />
          ))}
          <div className="flex h-12 w-12 items-center justify-center rounded-full border-4 border-white bg-blue-600 text-xs font-bold text-white">
            +500
          </div>
        </div> */}
        {/* <button className="group flex items-center gap-3 rounded-full bg-gray-900 px-8 py-4 font-bold text-white transition-all hover:bg-blue-600 hover:scale-105 active:scale-95 shadow-xl shadow-gray-200">
          Become part of Abrora
          <Star className="h-4 w-4 group-hover:rotate-12 transition-transform" />
        </button> */}
      </div>
    </section>
  );
}