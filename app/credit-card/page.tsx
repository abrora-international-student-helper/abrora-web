"use client";

import React from "react";
import Link from "next/link";

const paths = [
  {
    title: "Apply for Your First Card",
    desc: "No panic. Learn the safest starter cards, what you need, and what to avoid.",
    href: "/credit/apply",
    icon: "🪪",
    highlights: ["Student vs Secured", "No-SSN options", "Best first steps"],
  },
  {
    title: "Manage Your Card",
    desc: "Build credit without debt. Learn statements, due dates, and utilization in simple terms.",
    href: "/credit/manage",
    icon: "📅",
    highlights: ["Statement vs due date", "Utilization rule", "Autopay setup"],
  },
  {
    title: "Security & Scam Shield",
    desc: "Protect your money and identity. Learn the scams that target international students.",
    href: "/credit/security",
    icon: "🛡️",
    highlights: ["Fake IRS/SSN calls", "Phishing texts", "Safe habits"],
  },
];

export default function CreditPage() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* HERO */}
      <section className="relative overflow-hidden pt-16 pb-12 text-center">
        {/* soft accent only */}
        <div className="pointer-events-none absolute -top-40 left-1/2 h-[360px] w-[360px] -translate-x-1/2 rounded-full bg-blue-100/30 blur-2xl" />

        <div className="relative mx-auto max-w-6xl px-4">
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 md:text-6xl">
            Credit Cards in the U.S. —{" "}
            <span className="text-blue-600">explained from zero.</span>
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-700">
            If you’re an international student and credit feels confusing, you’re normal.
            This page teaches the basics and gives you the safest next steps.
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="#start"
              className="rounded-2xl bg-blue-600 px-6 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-blue-700"
            >
              Start the Beginner Guide
            </Link>
            <Link
              href="/credit/glossary"
              className="rounded-2xl border border-gray-300 bg-white px-6 py-3 text-sm font-bold text-gray-900 shadow-sm transition hover:bg-gray-50"
            >
              See the Simple Glossary
            </Link>
          </div>

          <div className="mx-auto mt-10 grid max-w-4xl grid-cols-1 gap-3 sm:grid-cols-3">
            <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
              <p className="text-xs font-bold text-gray-500">WHAT A CARD IS</p>
              <p className="mt-1 text-sm text-gray-800">
                A short-term loan you can use daily — then repay monthly.
              </p>
            </div>
            <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
              <p className="text-xs font-bold text-gray-500">WHY IT MATTERS</p>
              <p className="mt-1 text-sm text-gray-800">
                It builds a trust score used for apartments, cars, and more.
              </p>
            </div>
            <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
              <p className="text-xs font-bold text-gray-500">THE GOLDEN RULE</p>
              <p className="mt-1 text-sm text-gray-800">
                Pay on time — always. That’s 80% of winning.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CHOOSE YOUR PATH */}
      <section id="start" className="mx-auto max-w-6xl px-4 py-12">
        <div className="flex items-end justify-between gap-6">
          <div>
            <h2 className="text-2xl font-bold">Choose your path</h2>
            <p className="mt-2 text-gray-600">
              Pick the section you need right now. You can come back anytime.
            </p>
          </div>
          <Link
            href="/credit/checklist"
            className="hidden rounded-2xl border border-gray-300 bg-white px-4 py-2 text-sm font-bold text-gray-900 shadow-sm transition hover:border-gray-400 sm:inline-flex"
          >
            ✅ Printable checklist
          </Link>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {paths.map((p) => (
            <Link
              key={p.title}
              href={p.href}
              className="group relative rounded-3xl border border-gray-100 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-lg hover:border-emerald-200"
            >
              {/* blue-green glow */}
              <div className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-gradient-to-br from-emerald-50 via-sky-50 to-white" />

              <div className="relative flex items-start justify-between gap-4">
                <div className="text-4xl">{p.icon}</div>
                <span className="text-xs font-bold text-gray-400 group-hover:text-gray-600">
                  OPEN →
                </span>
              </div>

              <h3 className="relative mt-4 text-xl font-bold">{p.title}</h3>
              <p className="relative mt-2 text-sm text-gray-600">{p.desc}</p>

              <div className="relative mt-5 space-y-2">
                {p.highlights.map((h) => (
                  <div key={h} className="flex items-center gap-2 text-sm text-gray-700">
                    <span className="text-emerald-500">•</span>
                    <span>{h}</span>
                  </div>
                ))}
              </div>

              <div className="relative mt-6 inline-flex items-center gap-2 rounded-2xl bg-gray-50 px-4 py-2 text-xs font-bold text-gray-700 transition group-hover:bg-emerald-50 group-hover:text-emerald-700">
                Start here
                <span className="transition group-hover:translate-x-0.5">→</span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
