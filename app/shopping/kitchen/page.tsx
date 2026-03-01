'use client'

import React from 'react'
import Link from 'next/link'

export default function KitchenEssentialsPage() {
  const supplies = [
    {
      title: "The Basic Set",
      icon: "🍽️",
      items: [
        { name: "Plates & Bowls", desc: "Start with a single durable set to save space." },
        { name: "Utensils", desc: "A set of forks, knives, and spoons for your daily meals." },
        { name: "Cups & Mugs", desc: "Essential for morning coffee or evening study sessions." }
      ]
    },
    {
      title: "Cooking Core",
      icon: "🍳",
      items: [
        { name: "Small Pot & Pan", desc: "A small saucepan or pot is enough for most quick meals." },
        { name: "Spatula & Ladle", desc: "The basic tools needed for simple shared-kitchen cooking." },
        { name: "Reusable Water Bottle", desc: "Stay hydrated on campus and reduce plastic waste." }
      ]
    }
  ];

  return (
    <div className="min-h-screen relative overflow-hidden bg-[#F4F7FA] text-[#2D312E] py-16 px-6 lg:px-24 font-sans">
      
      {/* Aesthetic Background */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white via-[#EAF2FA] to-[#F4F7FA] -z-10" />
      <div className="absolute top-[-5%] right-[-5%] w-[600px] h-[600px] bg-blue-200/40 rounded-full blur-[120px] -z-10" />

      <div className="max-w-5xl mx-auto relative z-10">
        
        {/* Navigation */}
        <Link href="/shopping" className="group inline-flex items-center gap-2 mb-12 text-[10px] font-bold uppercase tracking-[0.2em] text-blue-500 hover:text-blue-800 transition-all bg-white/80 px-5 py-2.5 rounded-full border border-blue-100 shadow-sm">
          <span className="group-hover:-translate-x-1 transition-transform">←</span> Back to Shopping Hub
        </Link>

        {/* Hero Header */}
        <header className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">🥘</span>
            <span className="text-[10px] font-bold uppercase tracking-widest text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-100">Setup 02</span>
          </div>
          <h1 className="text-6xl md:text-8xl font-bold tracking-tighter mb-8 leading-none bg-gradient-to-r from-slate-900 via-blue-900 to-blue-800 bg-clip-text text-transparent">
            Kitchen & <br /> Food Items.
          </h1>
          <p className="text-xl text-slate-500 max-w-2xl leading-relaxed font-medium italic border-l-4 border-blue-400 pl-6">
            "Don't stock a full pantry on Day 1. Focus on easy-to-prepare meals and basic tools for the first few nights."
          </p>
        </header>

        {/* --- KITCHEN GRID --- */}
        <div className="space-y-10 mb-16">
          {supplies.map((section, idx) => (
            <div key={idx} className="bg-white/80 backdrop-blur-md p-10 rounded-[3rem] border border-white shadow-sm">
              <h3 className="text-2xl font-bold mb-8 flex items-center gap-3 text-slate-800">
                <span className="text-2xl">{section.icon}</span> {section.title}
              </h3>
              <div className="grid md:grid-cols-3 gap-8">
                {section.items.map((item, i) => (
                  <div key={i} className="space-y-2">
                    <p className="font-bold text-blue-600 text-sm">{item.name}</p>
                    <p className="text-xs text-slate-500 leading-relaxed italic">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* Quick Meals & Snacks */}
          <div className="grid md:grid-cols-2 gap-8">
            <div className="p-10 bg-slate-900 text-white rounded-[3.5rem] shadow-xl">
              <h4 className="text-xl font-bold mb-4 italic">🍫 Quick Meals & Snacks</h4>
              <p className="text-sm text-slate-400 mb-6 font-medium">Keep these on hand for late arrivals or when you're too busy with orientation to cook.</p>
              <ul className="text-xs space-y-3 text-blue-400 font-bold uppercase tracking-widest">
                <li>• Instant Noodles / Ramen</li>
                <li>• Granola Bars & Nuts</li>
                <li>• Dried Fruit & Crackers</li>
                <li>• Ready-to-eat microwave meals</li>
              </ul>
            </div>
            <div className="p-10 bg-blue-600 text-white rounded-[3.5rem] shadow-xl shadow-blue-100">
              <h4 className="text-xl font-bold mb-4 italic">🧠 Cooking Tips</h4>
              <ul className="text-sm space-y-3 text-blue-100 font-medium">
                <li>✔ Buy small amounts — stock up once you know the local stores.</li>
                <li>✔ Focus on one-pot meals to save time and energy.</li>
                <li>✔ Check the University Store for student-friendly meal kits.</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Checklist Summary */}
        <div className="p-12 bg-white rounded-[4rem] border border-blue-50 shadow-xl text-center">
          <h3 className="text-2xl font-bold mb-10 text-slate-900">✅ Kitchen Starter Kit</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {['Plate/Bowl', 'Utensils', 'Water Bottle', 'Instant Coffee', 'Snack Bars', 'Small Pan', 'Spatula', 'Dish Soap'].map((item, idx) => (
              <div key={idx} className="flex flex-col items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-[10px] font-bold">✔</div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tight text-center">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-24 pt-12 border-t border-blue-100 text-center">
          <p className="text-[10px] font-bold text-blue-300 uppercase tracking-[0.6em]">YoursTruely Setup Protocol • 2026</p>
        </footer>
      </div>
    </div>
  )
}