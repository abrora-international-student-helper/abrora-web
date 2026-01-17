"use client"

import { useState } from "react"
import Link from "next/link"

export default function HomePage() {
  const [featuresOpen, setFeaturesOpen] = useState(false);
  const [resourcesOpen, setResourcesOpen] = useState(false);
  const [checklistOpen, setChecklistOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Background */}
      <div className="relative overflow-hidden">
        {/* soft blobs */}
        <div className="pointer-events-none absolute -top-24 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-primary-muted/40 blur-3xl" />
        <div className="pointer-events-none absolute -top-10 -left-24 h-[380px] w-[380px] rounded-full bg-secondary-muted/40 blur-3xl" />
        <div className="pointer-events-none absolute top-40 -right-24 h-[420px] w-[420px] rounded-full bg-cyan-200/40 blur-3xl" />

        {/* Top nav */}
        <header className="relative z-50">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-5">
            <Link href="/" className="group inline-flex items-center gap-2">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-primary to-secondary text-white shadow-sm">
                A
              </span>
              <span className="text-lg font-bold tracking-tight">
                ABRORA
                <span className="ml-2 rounded-full bg-primary-lighter px-2 py-0.5 text-xs font-semibold text-primary-dark ring-1 ring-primary-light">
                  Beta
                </span>
              </span>
            </Link>

            <nav className="hidden items-center gap-1 md:flex">
              {/* FEATURES DROPDOWN */}
              <div
                className="relative"
                onMouseEnter={() => setFeaturesOpen(true)}
                onMouseLeave={() => setFeaturesOpen(false)}
              >
                <button className="flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900 focus:outline-none">
                  Features
                  <svg className={`h-4 w-4 transition-transform duration-200 ${featuresOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {featuresOpen && (
                  <div className="absolute left-1/2 top-full w-[580px] -translate-x-1/2 pt-2">
                    <div className="grid grid-cols-2 overflow-hidden rounded-2xl bg-white p-5 shadow-2xl ring-1 ring-gray-200">
                      {/* Column 1: Core Features */}
                      <div className="space-y-1 border-r border-gray-100 pr-5">
                        <p className="mb-3 text-[10px] font-bold uppercase tracking-widest text-gray-400">Core Tools</p>
                        <DropdownItem
                          icon="📁"
                          title="Document Vault"
                          desc="Store passport, I-20, visa, I-94 securely"
                          href="#vault"
                        />
                        <DropdownItem
                          icon="📋"
                          title="Visa Tracking"
                          desc="Status, deadlines & compliance reminders"
                          href="#tracking"
                        />
                        <DropdownItem
                          icon="🔔"
                          title="Smart Reminders"
                          desc="OPT/CPT deadlines, travel signatures"
                          href="#reminders"
                        />
                        <DropdownItem
                          icon="📰"
                          title="Policy Alerts"
                          desc="Immigration news that affects you"
                          href="#news"
                        />
                      </div>

                      {/* Column 2: Featured Card */}
                      <div className="pl-5">
                        <p className="mb-3 text-[10px] font-bold uppercase tracking-widest text-gray-400">Why ABRORA</p>
                        <div className="rounded-xl bg-gradient-to-br from-primary-lighter to-secondary-lighter p-4">
                          <div className="text-2xl">🛡️</div>
                          <h4 className="mt-2 text-sm font-bold text-gray-900">Stay Compliant, Stay Calm</h4>
                          <p className="mt-1 text-xs leading-relaxed text-gray-600">
                            Never miss a deadline. Keep documents ready. Focus on your studies, not paperwork.
                          </p>
                          <Link href="/signup" className="mt-3 inline-flex items-center text-xs font-bold text-primary hover:underline">
                            Get started free <span className="ml-1">→</span>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* RESOURCES DROPDOWN */}
              <div
                className="relative"
                onMouseEnter={() => setResourcesOpen(true)}
                onMouseLeave={() => setResourcesOpen(false)}
              >
                <button className="flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900 focus:outline-none">
                  Resources
                  <svg className={`h-4 w-4 transition-transform duration-200 ${resourcesOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {resourcesOpen && (
                  <div className="absolute left-1/2 top-full w-[680px] -translate-x-1/2 pt-2">
                    <div className="grid grid-cols-3 overflow-hidden rounded-2xl bg-white p-5 shadow-2xl ring-1 ring-gray-200">
                      {/* Column 1: Rookie Guide */}
                      <div className="space-y-1 border-r border-gray-100 pr-5">
                        <p className="mb-3 text-[10px] font-bold uppercase tracking-widest text-gray-400">Rookie Guide</p>
                        <DropdownItem
                          icon="🎓"
                          title="College Application"
                          desc="Research, apply, get accepted"
                          href="#college"
                        />
                        <DropdownItem
                          icon="🛂"
                          title="Visa Process"
                          desc="DS-160, SEVIS, interview prep"
                          href="#visa"
                        />
                        <DropdownItem
                          icon="💉"
                          title="Medical & Vaccinations"
                          desc="MMR, TB test, health records"
                          href="#medical"
                        />
                        <DropdownItem
                          icon="✈️"
                          title="Flights & Shopping"
                          desc="What to pack, cheap flights"
                          href="#travel"
                        />
                      </div>

                      {/* Column 2: Life in USA */}
                      <div className="space-y-1 border-r border-gray-100 px-5">
                        <p className="mb-3 text-[10px] font-bold uppercase tracking-widest text-gray-400">Life in USA</p>
                        <DropdownItem
                          icon="💼"
                          title="Work Rules"
                          desc="20 hrs on-campus, SSN, CPT/OPT"
                          href="#work"
                        />
                        <DropdownItem
                          icon="💳"
                          title="Credit Building"
                          desc="SSN, first credit card, score"
                          href="#credit"
                        />
                        <DropdownItem
                          icon="🚗"
                          title="Getting a Car"
                          desc="License, insurance, buying tips"
                          href="#car"
                        />
                        <DropdownItem
                          icon="🏦"
                          title="Banking & Finance"
                          desc="Open accounts, send money home"
                          href="#banking"
                        />
                      </div>

                      {/* Column 3: Safety & Wellness */}
                      <div className="space-y-1 pl-5">
                        <p className="mb-3 text-[10px] font-bold uppercase tracking-widest text-gray-400">Safety & Wellness</p>
                        <DropdownItem
                          icon="🧠"
                          title="Mental Health"
                          desc="Dealing with isolation & stress"
                          href="#mental-health"
                        />
                        <DropdownItem
                          icon="⚠️"
                          title="Scam Alerts"
                          desc="Common scams targeting students"
                          href="#scams"
                        />
                        <DropdownItem
                          icon="💼"
                          title="Career & Jobs"
                          desc="Resume, interviews, H1B path"
                          href="#career"
                        />
                        <DropdownItem
                          icon="🏥"
                          title="Healthcare"
                          desc="Insurance, clinics, emergencies"
                          href="#healthcare"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* CHECKLIST DROPDOWN */}
              <div
                className="relative"
                onMouseEnter={() => setChecklistOpen(true)}
                onMouseLeave={() => setChecklistOpen(false)}
              >
                <button className="flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900 focus:outline-none">
                  Checklists
                  <svg className={`h-4 w-4 transition-transform duration-200 ${checklistOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {checklistOpen && (
                  <div className="absolute left-1/2 top-full w-[420px] -translate-x-1/2 pt-2">
                    <div className="overflow-hidden rounded-2xl bg-white p-5 shadow-2xl ring-1 ring-gray-200">
                      <p className="mb-3 text-[10px] font-bold uppercase tracking-widest text-gray-400">Step-by-Step Guides</p>
                      <div className="space-y-1">
                        <DropdownItem
                          icon="🛫"
                          title="First Time to USA"
                          desc="Pre-arrival → First week → First month tasks"
                          href="#first-time"
                        />
                        <DropdownItem
                          icon="🔄"
                          title="Going Back & Returning"
                          desc="Travel signatures, re-entry docs, customs"
                          href="#travel-back"
                        />
                        <DropdownItem
                          icon="🌍"
                          title="USA to Other Countries"
                          desc="Visa requirements, travel tips, re-entry"
                          href="#international"
                        />
                        <DropdownItem
                          icon="🎓"
                          title="Graduation & OPT"
                          desc="Application timeline, EAD card, job search"
                          href="#graduation"
                        />
                      </div>

                      <div className="mt-4 rounded-xl bg-amber-50 p-3 ring-1 ring-amber-100">
                        <div className="flex items-start gap-2">
                          <span className="text-lg">💡</span>
                          <div>
                            <p className="text-xs font-semibold text-amber-900">Pro tip</p>
                            <p className="text-xs text-amber-700">Sign up to save progress and get reminders for each step.</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* NEWS LINK */}
              <a href="#news" className="rounded-lg px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900">
                News & Updates
              </a>
            </nav>

            <div className="flex items-center gap-3">
              <Link
                href="/login"
                className="hidden rounded-xl px-4 py-2 text-sm font-semibold text-gray-800 hover:bg-gray-50 md:inline-flex"
              >
                Sign In
              </Link>
              <Link
                href="/signup"
                className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-primary to-secondary px-4 py-2 text-sm font-semibold text-white shadow-sm hover:opacity-95"
              >
                Get Started
              </Link>
            </div>
          </div>
        </header>

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
 * Dropdown item component for the "Information For" menu
 */
function DropdownItem({ icon, title, desc }: { icon: string, title: string, desc: string }) {
  return (
    <Link href="#" className="group flex gap-3 rounded-lg transition-colors hover:bg-gray-50">
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gray-100 text-sm group-hover:bg-white group-hover:shadow-sm">
        {icon}
      </div>
      <div>
        <p className="text-sm font-bold text-gray-900">{title}</p>
        <p className="text-[11px] leading-tight text-gray-500">{desc}</p>
      </div>
    </Link>
  )
}