"use client"

import Link from "next/link"
import React, { useState } from 'react';
// Assuming you are using Lucide icons, but I have provided the SVG paths below for compatibility
import Navbar from "./components/Nav";
export default function HomePage() {
  const [vaultOpen, setVaultOpen] = useState(false);
  const [infoOpen, setInfoOpen] = useState(false);
  const [checklistOpen, setChecklistOpen] = useState(false);
  const [newsOpen, setNewsOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Background */}
      <div className="relative overflow-hidden">
        {/* soft blobs */}
        <div className="pointer-events-none absolute -top-24 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-primary-muted/40 blur-3xl" />
        <div className="pointer-events-none absolute -top-10 -left-24 h-[380px] w-[380px] rounded-full bg-secondary-muted/40 blur-3xl" />
        <div className="pointer-events-none absolute top-40 -right-24 h-[420px] w-[420px] rounded-full bg-cyan-200/40 blur-3xl" />

     
        <Navbar/>

        {/* Hero */}
        <section className="relative">
          <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 px-4 pb-16 pt-10 md:grid-cols-2 md:pt-14">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-white/70 px-3 py-1 text-xs font-semibold text-gray-700 ring-1 ring-gray-200 backdrop-blur">
                <span className="h-2 w-2 rounded-full bg-green-500" />
                Built for international students in the U.S.
              </div>

              <h1 className="mt-5 text-4xl font-extrabold tracking-tight md:text-6xl">
                Stay compliant.
                <span className="block bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  Stay organized.
                </span>
                Stress less.
              </h1>

              <p className="mt-4 max-w-xl text-base leading-relaxed text-gray-700 md:text-lg">
                ABRORA keeps your visa deadlines, essential documents, and arrival checklist in one clean place—
                so you can focus on classes, friends, and your life in the U.S.
              </p>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/signup"
                  className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-primary to-secondary px-6 py-3 font-semibold text-white shadow-sm hover:opacity-95"
                >
                  Create free account
                </Link>
                <Link
                  href="/login"
                  className="inline-flex items-center justify-center rounded-xl bg-white px-6 py-3 font-semibold text-gray-900 ring-1 ring-gray-200 hover:bg-gray-50"
                >
                  Sign in
                </Link>
              </div>

              {/* Social proof */}
              <div className="mt-8 grid grid-cols-3 gap-3 max-w-md">
                <div className="rounded-xl bg-white/70 p-3 ring-1 ring-gray-200 backdrop-blur">
                  <p className="text-lg font-bold">1 place</p>
                  <p className="text-xs text-gray-600">for deadlines + docs</p>
                </div>
                <div className="rounded-xl bg-white/70 p-3 ring-1 ring-gray-200 backdrop-blur">
                  <p className="text-lg font-bold">0 chaos</p>
                  <p className="text-xs text-gray-600">simple, calm workflow</p>
                </div>
                <div className="rounded-xl bg-white/70 p-3 ring-1 ring-gray-200 backdrop-blur">
                  <p className="text-lg font-bold">24/7</p>
                  <p className="text-xs text-gray-600">access from anywhere</p>
                </div>
              </div>
            </div>

            {/* Hero card */}
            <div className="relative">
              <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-primary/20 to-secondary/20 blur" />
              <div className="relative rounded-3xl bg-white/80 p-6 shadow-sm ring-1 ring-gray-200 backdrop-blur">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold text-gray-900">Today</p>
                    <p className="text-xs text-gray-600">Your next actions, auto-sorted</p>
                  </div>
                  <span className="rounded-full bg-primary-lighter px-3 py-1 text-xs font-semibold text-primary-dark ring-1 ring-primary-light">
                    Smart reminders
                  </span>
                </div>

                <div className="mt-5 space-y-3">
                  <div className="flex items-center gap-3 rounded-2xl bg-gray-50 p-4 ring-1 ring-gray-100">
                    <div className="grid h-10 w-10 place-items-center rounded-xl bg-white ring-1 ring-gray-200">
                      📋
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold">Visa / I-20 deadline</p>
                      <p className="text-xs text-gray-600">Reminder 14 days before</p>
                    </div>
                    <span className="rounded-full bg-amber-50 px-2.5 py-1 text-xs font-semibold text-amber-700 ring-1 ring-amber-100">
                      Upcoming
                    </span>
                  </div>

                  <div className="flex items-center gap-3 rounded-2xl bg-gray-50 p-4 ring-1 ring-gray-100">
                    <div className="grid h-10 w-10 place-items-center rounded-xl bg-white ring-1 ring-gray-200">
                      📁
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold">Documents</p>
                      <p className="text-xs text-gray-600">Passport • I-20 • I-94 stored</p>
                    </div>
                    <span className="rounded-full bg-green-50 px-2.5 py-1 text-xs font-semibold text-green-700 ring-1 ring-green-100">
                      Synced
                    </span>
                  </div>

                  <div className="flex items-center gap-3 rounded-2xl bg-gray-50 p-4 ring-1 ring-gray-100">
                    <div className="grid h-10 w-10 place-items-center rounded-xl bg-white ring-1 ring-gray-200">
                      ✅
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold">Onboarding checklist</p>
                      <p className="text-xs text-gray-600">Bank • SIM • Campus ID • Health</p>
                    </div>
                    <span className="rounded-full bg-secondary-lighter px-2.5 py-1 text-xs font-semibold text-secondary-dark ring-1 ring-secondary-light">
                      In progress
                    </span>
                  </div>
                </div>

                <div className="mt-6 rounded-2xl bg-gradient-to-r from-primary to-secondary p-4 text-white">
                  <p className="text-sm font-semibold">Pro tip</p>
                  <p className="text-xs opacity-90">
                    Upload documents once—ABRORA keeps them ready for travel, jobs, and school forms.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Features */}
      <section id="features" className="mx-auto max-w-6xl px-4 py-16">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div>
            <h2 className="text-3xl font-extrabold tracking-tight md:text-4xl">Everything you need, nothing you don’t.</h2>
            <p className="mt-2 max-w-2xl text-gray-700">
              ABRORA is designed to feel calm and fast—like a premium product, not a complicated portal.
            </p>
          </div>
          <Link
            href="/signup"
            className="inline-flex items-center justify-center rounded-xl bg-gray-900 px-5 py-3 text-sm font-semibold text-white hover:bg-black"
          >
            Start now
          </Link>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
          {[
            {
              icon: "📋",
              title: "Visa Tracking",
              desc: "Deadlines, status, and reminders—so you don’t miss the important stuff.",
              tag: "Compliance",
            },
            {
              icon: "📁",
              title: "Document Vault",
              desc: "Keep passport, I-20, I-94, SSN letters, and receipts neatly organized.",
              tag: "Secure",
            },
            {
              icon: "✅",
              title: "Onboarding Checklist",
              desc: "Step-by-step setup from arrival to stable life: banking, phone, campus, health.",
              tag: "Guided",
            },
          ].map((f) => (
            <div key={f.title} className="group relative rounded-3xl bg-white p-6 shadow-sm ring-1 ring-gray-200">
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary-lighter to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
              <div className="relative">
                <div className="flex items-center justify-between">
                  <div className="text-3xl">{f.icon}</div>
                  <span className="rounded-full bg-gray-50 px-3 py-1 text-xs font-semibold text-gray-700 ring-1 ring-gray-200">
                    {f.tag}
                  </span>
                </div>
                <h3 className="mt-4 text-lg font-bold">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-700">{f.desc}</p>

                <div className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary-dark">
                  Learn more <span aria-hidden>→</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="bg-gray-50">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <h2 className="text-3xl font-extrabold tracking-tight md:text-4xl">Set up in minutes.</h2>
          <p className="mt-2 max-w-2xl text-gray-700">
            A simple flow that feels like a modern app—not paperwork.
          </p>

          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
            {[
              {
                step: "01",
                title: "Create your profile",
                desc: "Add your school, visa type, and key dates (ABRORA helps you find them).",
              },
              {
                step: "02",
                title: "Upload essentials",
                desc: "Store documents in one vault so they’re always available when needed.",
              },
              {
                step: "03",
                title: "Get guided actions",
                desc: "See what to do next—reminders, checklist steps, and progress tracking.",
              },
            ].map((s) => (
              <div key={s.step} className="rounded-3xl bg-white p-6 ring-1 ring-gray-200">
                <p className="text-xs font-bold text-gray-500">STEP {s.step}</p>
                <h3 className="mt-3 text-lg font-bold">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-700">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Security / Trust */}
      <section id="security" className="mx-auto max-w-6xl px-4 py-16">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:items-center">
          <div>
            <h2 className="text-3xl font-extrabold tracking-tight md:text-4xl">Privacy-first by design.</h2>
            <p className="mt-2 text-gray-700">
              Your documents are sensitive. ABRORA is built to treat them that way.
            </p>

            <div className="mt-6 space-y-3">
              {[
                { title: "Encrypted storage", desc: "Protect documents at rest and in transit." },
                { title: "Fine-grained access", desc: "Only you control what’s uploaded and visible." },
                { title: "Clear data policy", desc: "Simple terms—no confusing surprises." },
              ].map((x) => (
                <div key={x.title} className="flex gap-3 rounded-2xl bg-gray-50 p-4 ring-1 ring-gray-100">
                  <div className="grid h-10 w-10 place-items-center rounded-xl bg-white ring-1 ring-gray-200">
                    🔒
                  </div>
                  <div>
                    <p className="text-sm font-bold">{x.title}</p>
                    <p className="text-sm text-gray-700">{x.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-primary/15 to-secondary/15 blur" />
            <div className="relative rounded-3xl bg-white p-6 ring-1 ring-gray-200">
              <p className="text-sm font-semibold text-gray-900">What students say</p>
              <div className="mt-4 rounded-2xl bg-gray-50 p-5 ring-1 ring-gray-100">
                <p className="text-sm leading-relaxed text-gray-800">
                  “I used to keep everything in random folders. ABRORA made my first semester feel organized.
                  The checklist + reminders are a lifesaver.”
                </p>
                <div className="mt-4 flex items-center justify-between">
                  <p className="text-sm font-bold">— International Student</p>
                  <div className="text-sm" aria-label="rating">
                    ⭐⭐⭐⭐⭐
                  </div>
                </div>
              </div>

              <div className="mt-5 grid grid-cols-2 gap-3">
                <div className="rounded-2xl bg-gray-50 p-4 ring-1 ring-gray-100">
                  <p className="text-lg font-extrabold">Less stress</p>
                  <p className="text-xs text-gray-600">clear next steps</p>
                </div>
                <div className="rounded-2xl bg-gray-50 p-4 ring-1 ring-gray-100">
                  <p className="text-lg font-extrabold">More control</p>
                  <p className="text-xs text-gray-600">docs in one vault</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="border-t border-gray-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <div className="rounded-3xl bg-gradient-to-r from-primary to-secondary p-8 text-white md:p-12">
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div>
                <h2 className="text-3xl font-extrabold tracking-tight md:text-4xl">Ready to feel organized?</h2>
                <p className="mt-2 max-w-xl text-white/90">
                  Create your ABRORA account and set up your profile in minutes.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/signup"
                  className="inline-flex items-center justify-center rounded-xl bg-white px-6 py-3 font-semibold text-gray-900 hover:bg-gray-50"
                >
                  Get Started
                </Link>
                <Link
                  href="/login"
                  className="inline-flex items-center justify-center rounded-xl bg-transparent px-6 py-3 font-semibold text-white ring-1 ring-white/40 hover:bg-white/10"
                >
                  Sign In
                </Link>
              </div>
            </div>
          </div>

          <footer className="mt-10 flex flex-col items-center justify-between gap-4 text-sm text-gray-600 md:flex-row">
            <p>© {new Date().getFullYear()} ABRORA. Built for international students.</p>
            <div className="flex gap-4">
              <a href="#" className="hover:text-gray-900">
                Privacy
              </a>
              <a href="#" className="hover:text-gray-900">
                Terms
              </a>
              <a href="#" className="hover:text-gray-900">
                Contact
              </a>
            </div>
          </footer>
        </div>
      </section>
    </div>
  )
}

/**
 * Dropdown item component for navigation menus (incident.io style with 3D icons)
 */
function DropdownItem({ title, desc, href = "#", color = "primary" }: { title: string; desc: string; href?: string; color?: "primary" | "secondary" | "orange" }) {
  const colorClasses = {
    primary: "bg-gradient-to-br from-primary to-primary-dark shadow-lg shadow-primary/30",
    secondary: "bg-gradient-to-br from-secondary to-secondary-dark shadow-lg shadow-secondary/30",
    orange: "bg-gradient-to-br from-orange-400 to-orange-600 shadow-lg shadow-orange-500/30",
  };

  return (
    <Link href={href} className="group flex items-start gap-3">
      <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${colorClasses[color]} transition-transform group-hover:scale-105`}>
        <svg className="h-5 w-5 text-white drop-shadow-sm" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
        </svg>
      </div>
      <div className="min-w-0">
        <p className="text-sm font-semibold text-gray-900 group-hover:text-primary transition-colors">{title}</p>
        <p className="text-[13px] text-gray-500">{desc}</p>
      </div>
    </Link>
  )
}