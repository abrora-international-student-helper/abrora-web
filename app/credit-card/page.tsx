"use client"

import React, { useState } from "react"
import Link from "next/link"
import Navbar from "../components/Nav"

export default function CreditCardsHelpPage() {
  const [open, setOpen] = useState<null | "what" | "why" | "rules" | "terms">(null)

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Background */}
      <div className="relative overflow-hidden">
        <div className="pointer-events-none absolute -top-24 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-primary-muted/40 blur-3xl" />
        <div className="pointer-events-none absolute -top-10 -left-24 h-[380px] w-[380px] rounded-full bg-secondary-muted/40 blur-3xl" />
        <div className="pointer-events-none absolute top-40 -right-24 h-[420px] w-[420px] rounded-full bg-cyan-200/40 blur-3xl" />

        <Navbar />

        {/* HERO */}
        <section className="relative">
          <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 px-4 pb-14 pt-10 md:grid-cols-2 md:pt-14">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-white/70 px-3 py-1 text-xs font-semibold text-gray-700 ring-1 ring-gray-200 backdrop-blur">
                <span className="h-2 w-2 rounded-full bg-green-500" />
                Calm credit-card help for international students
              </div>

              <h1 className="mt-5 text-4xl font-extrabold tracking-tight md:text-6xl">
                New to credit cards?
                <span className="block bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  You’re not alone.
                </span>
              </h1>

              <p className="mt-4 max-w-xl text-base leading-relaxed text-gray-700 md:text-lg">
                The U.S. credit system can feel scary—especially if you’re new here.
                ABRORA will explain it slowly, in simple words, with no judgment.
              </p>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <a
                  href="#start"
                  className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-primary to-secondary px-6 py-3 font-semibold text-white shadow-sm hover:opacity-95"
                >
                  Start from zero
                </a>
                <a
                  href="#scams"
                  className="inline-flex items-center justify-center rounded-xl bg-white px-6 py-3 font-semibold text-gray-900 ring-1 ring-gray-200 hover:bg-gray-50"
                >
                  I’m worried about scams
                </a>
              </div>

              <div className="mt-8 grid max-w-md grid-cols-3 gap-3">
                <MiniStat title="Simple" desc="no confusing terms" />
                <MiniStat title="Safe" desc="avoid common traps" />
                <MiniStat title="Step-by-step" desc="you choose the pace" />
              </div>
            </div>

            {/* Right calm card */}
            <div className="relative">
              <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-primary/20 to-secondary/20 blur" />
              <div className="relative rounded-3xl bg-white/80 p-6 shadow-sm ring-1 ring-gray-200 backdrop-blur">
                <p className="text-sm font-semibold text-gray-900">Quick comfort</p>
                <p className="mt-1 text-sm text-gray-700">
                  If you only remember one thing:
                </p>

                <div className="mt-4 rounded-2xl bg-gray-50 p-5 ring-1 ring-gray-100">
                  <p className="text-sm font-bold text-gray-900">A credit card is borrowed money.</p>
                  <p className="mt-2 text-sm text-gray-700">
                    If you spend $100 and pay back $100 on time, you’re good.
                    If you don’t, you pay extra (interest).
                  </p>
                </div>

                <div className="mt-5 rounded-2xl bg-gradient-to-r from-primary to-secondary p-4 text-white">
                  <p className="text-sm font-semibold">You don’t have to be perfect.</p>
                  <p className="text-xs opacity-90">
                    Just learn one small step today. ABRORA will guide the rest.
                  </p>
                </div>

                <div className="mt-5 grid grid-cols-2 gap-3">
                  <QuickButton
                    title="What is a credit card?"
                    onClick={() => setOpen(open === "what" ? null : "what")}
                  />
                  <QuickButton
                    title="Golden rules"
                    onClick={() => setOpen(open === "rules" ? null : "rules")}
                  />
                </div>

                {open === "what" && (
                  <div className="mt-4 rounded-2xl bg-white p-4 ring-1 ring-gray-200">
                    <p className="text-sm font-bold">In one sentence:</p>
                    <p className="mt-1 text-sm text-gray-700">
                      A credit card lets you borrow money for purchases, and you repay it later.
                    </p>
                  </div>
                )}

                {open === "rules" && (
                  <div className="mt-4 rounded-2xl bg-white p-4 ring-1 ring-gray-200">
                    <p className="text-sm font-bold">Golden rules:</p>
                    <ul className="mt-2 space-y-1 text-sm text-gray-700">
                      <li>• Pay your statement balance in full if possible</li>
                      <li>• Set autopay so you don’t forget</li>
                      <li>• Never share personal info from random calls/texts</li>
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* START FROM ZERO */}
      <section id="start" className="mx-auto max-w-6xl px-4 py-16">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div>
            <h2 className="text-3xl font-extrabold tracking-tight md:text-4xl">Start from zero</h2>
            <p className="mt-2 max-w-2xl text-gray-700">
              If you’re anxious, start here. Small steps, simple language.
            </p>
          </div>
          <Link
            href="/signup"
            className="inline-flex items-center justify-center rounded-xl bg-gray-900 px-5 py-3 text-sm font-semibold text-white hover:bg-black"
          >
            Save progress in ABRORA
          </Link>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
          <StepCard
            step="01"
            icon="🧠"
            title="What it is"
            desc="A credit card is borrowed money. You must pay it back. If you pay late, you pay extra."
          />
          <StepCard
            step="02"
            icon="🧾"
            title="How you get charged"
            desc="You receive a statement (your bill). Pay by the due date. Paying in full avoids interest."
          />
          <StepCard
            step="03"
            icon="✅"
            title="How to win"
            desc="Use it for small purchases, pay in full, and stay consistent. That builds trust (credit history)."
          />
        </div>

        {/* Big calm choices */}
        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
          <ChoiceTile
            icon="🌱"
            title="I don’t have a card yet"
            desc="We’ll explain the safest first card types (student or secured) in the next page."
            href="#types"
          />
          <ChoiceTile
            icon="🔵"
            title="I already have a card"
            desc="Learn how to pay correctly and avoid interest. (Statement vs due date, autopay, utilization.)"
            href="#use"
          />
          <ChoiceTile
            icon="🛡️"
            title="I’m worried about scams"
            desc="See the most common scam patterns targeting international students."
            href="#scams"
          />
        </div>
      </section>

      {/* TYPES YOU'LL HEAR ABOUT (NOT A MARKETPLACE) */}
      <section id="types" className="bg-gray-50">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <h2 className="text-3xl font-extrabold tracking-tight md:text-4xl">Words you’ll hear (don’t panic)</h2>
          <p className="mt-2 max-w-2xl text-gray-700">
            This is not a shopping list. It’s just to help you recognize common terms.
          </p>

          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
            <InfoCard
              title="Student card"
              icon="🎓"
              desc="A beginner-friendly card designed for students. Often no annual fee."
              tip="Good first step if you qualify."
            />
            <InfoCard
              title="Secured card"
              icon="🔒"
              desc="A card where you put down a refundable deposit. Easier approval when you have no credit."
              tip="Avoid secured cards with extra monthly fees."
            />
            <InfoCard
              title="Cashback card"
              icon="💵"
              desc="Gives you small rewards on spending. Best after you’re stable and paying in full."
              tip="Rewards are useless if you pay interest."
            />
          </div>

          <div className="mt-10 rounded-3xl bg-white p-6 ring-1 ring-gray-200">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-sm font-semibold text-gray-900">Next page we’ll build:</p>
                <p className="text-sm text-gray-700">
                  A “First Card Finder” that recommends the safest type for your situation (no credit / new to U.S. / already have a bank).
                </p>
              </div>
              <a
                href="#use"
                className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-primary to-secondary px-5 py-3 text-sm font-semibold text-white hover:opacity-95"
              >
                Learn how to use it →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* HOW TO USE (SUPER BEGINNER FRIENDLY) */}
      <section id="use" className="mx-auto max-w-6xl px-4 py-16">
        <h2 className="text-3xl font-extrabold tracking-tight md:text-4xl">How to use a credit card safely</h2>
        <p className="mt-2 max-w-2xl text-gray-700">
          Most people get hurt by forgetting how billing works. Here is the simple version.
        </p>

        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
          <RuleCard
            icon="📆"
            title="Statement vs due date"
            desc="Your statement closes first (bill is created). Then you pay by the due date."
          />
          <RuleCard
            icon="⚡"
            title="Autopay"
            desc="Turn on autopay for the full statement balance if possible. This prevents missed payments."
          />
          <RuleCard
            icon="📉"
            title="Keep spending small"
            desc="Start with small monthly purchases. Don’t treat your limit like free money."
          />
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="rounded-3xl bg-gray-50 p-6 ring-1 ring-gray-200">
            <p className="text-sm font-semibold text-gray-900">Beginner myth (very common)</p>
            <p className="mt-2 text-sm text-gray-700">
              <span className="font-bold">Myth:</span> “Carry a balance to build credit.”
            </p>
            <p className="mt-2 text-sm text-gray-700">
              <span className="font-bold">Truth:</span> You can build credit by using the card and paying on time.
              Carrying a balance just makes you pay interest.
            </p>
          </div>

          <div className="rounded-3xl bg-gradient-to-r from-primary to-secondary p-6 text-white">
            <p className="text-sm font-semibold">If you feel anxious, do this:</p>
            <ul className="mt-3 space-y-2 text-sm text-white/90">
              <li>• Use the card only for 1 small thing (ex: phone bill)</li>
              <li>• Turn on autopay</li>
              <li>• Check once a week (not every hour)</li>
            </ul>
            <div className="mt-5 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/signup"
                className="inline-flex items-center justify-center rounded-xl bg-white px-6 py-3 font-semibold text-gray-900 hover:bg-gray-50"
              >
                Track this in ABRORA
              </Link>
              <a
                href="#scams"
                className="inline-flex items-center justify-center rounded-xl bg-transparent px-6 py-3 font-semibold text-white ring-1 ring-white/40 hover:bg-white/10"
              >
                Scam safety →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* SCAMS */}
      <section id="scams" className="bg-gray-50">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <h2 className="text-3xl font-extrabold tracking-tight md:text-4xl">Scams & traps (international students get targeted)</h2>
          <p className="mt-2 max-w-2xl text-gray-700">
            If something feels urgent, scary, or “too good”—pause. Most scams use pressure.
          </p>

          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
            <ScamCard
              icon="🚨"
              title="“You must pay now” calls"
              desc="Scammers pretend to be bank/IRS/police. Real institutions don’t threaten you on the phone."
              action="Hang up. Call back using the official website/app number."
            />
            <ScamCard
              icon="📲"
              title="DM approvals / WhatsApp agents"
              desc="If someone promises approval or asks for your SSN/photos, it’s a red flag."
              action="Never send documents to random people online."
            />
            <ScamCard
              icon="💸"
              title="Bad secured card fees"
              desc="A deposit is normal. Extra monthly fees are often a trap."
              action="Avoid secured cards with monthly/hidden fees."
            />
            <ScamCard
              icon="🧾"
              title="Fake “credit repair” services"
              desc="No one can magically fix your score overnight. Be careful with subscriptions."
              action="Build credit with time + on-time payments."
            />
            <ScamCard
              icon="🎁"
              title="Too-good rewards"
              desc="If the rewards sound unreal, it’s usually marketing or a trap."
              action="Focus on basics first, rewards later."
            />
            <ScamCard
              icon="🔐"
              title="Sharing personal info"
              desc="SSN/ITIN/bank logins should never be shared because someone asked."
              action="Only share info inside official bank portals you opened yourself."
            />
          </div>

          <div className="mt-10 rounded-3xl bg-white p-6 ring-1 ring-gray-200">
            <p className="text-sm font-semibold text-gray-900">One safety rule:</p>
            <p className="mt-2 text-sm text-gray-700">
              Never give personal info unless <span className="font-semibold">you initiated</span> the contact through an official website/app.
            </p>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="border-t border-gray-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <div className="rounded-3xl bg-gradient-to-r from-primary to-secondary p-8 text-white md:p-12">
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div>
                <h2 className="text-3xl font-extrabold tracking-tight md:text-4xl">
                  You’re doing great.
                </h2>
                <p className="mt-2 max-w-xl text-white/90">
                  You don’t have to learn everything today. Start small, pay on time, and you will be okay.
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
              <a href="#" className="hover:text-gray-900">Privacy</a>
              <a href="#" className="hover:text-gray-900">Terms</a>
              <a href="#" className="hover:text-gray-900">Contact</a>
            </div>
          </footer>
        </div>
      </section>
    </div>
  )
}

/* ---------- small UI helpers (still one file) ---------- */

function MiniStat({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="rounded-xl bg-white/70 p-3 ring-1 ring-gray-200 backdrop-blur">
      <p className="text-lg font-bold">{title}</p>
      <p className="text-xs text-gray-600">{desc}</p>
    </div>
  )
}

function QuickButton({ title, onClick }: { title: string; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="rounded-2xl bg-gray-50 px-4 py-3 text-left text-sm font-semibold text-gray-900 ring-1 ring-gray-200 hover:bg-gray-100/60"
    >
      {title}
    </button>
  )
}

function StepCard({ step, icon, title, desc }: { step: string; icon: string; title: string; desc: string }) {
  return (
    <div className="rounded-3xl bg-white p-6 ring-1 ring-gray-200">
      <div className="flex items-center justify-between">
        <p className="text-xs font-bold text-gray-500">STEP {step}</p>
        <div className="text-2xl">{icon}</div>
      </div>
      <h3 className="mt-3 text-lg font-extrabold">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-gray-700">{desc}</p>
    </div>
  )
}

function ChoiceTile({
  icon,
  title,
  desc,
  href,
}: {
  icon: string
  title: string
  desc: string
  href: string
}) {
  return (
    <a
      href={href}
      className="group rounded-3xl bg-white p-6 shadow-sm ring-1 ring-gray-200 hover:bg-gray-50"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="text-2xl">{icon}</div>
        <span className="rounded-full bg-gray-50 px-3 py-1 text-xs font-semibold text-gray-700 ring-1 ring-gray-200">
          Open →
        </span>
      </div>
      <h3 className="mt-3 text-lg font-extrabold group-hover:text-primary">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-gray-700">{desc}</p>
    </a>
  )
}

function InfoCard({ title, icon, desc, tip }: { title: string; icon: string; desc: string; tip: string }) {
  return (
    <div className="rounded-3xl bg-white p-6 ring-1 ring-gray-200">
      <div className="text-2xl">{icon}</div>
      <h3 className="mt-3 text-lg font-extrabold">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-gray-700">{desc}</p>
      <div className="mt-4 rounded-2xl bg-gray-50 p-4 text-sm text-gray-700 ring-1 ring-gray-100">
        <span className="font-semibold">Tip:</span> {tip}
      </div>
    </div>
  )
}

function RuleCard({ icon, title, desc }: { icon: string; title: string; desc: string }) {
  return (
    <div className="rounded-3xl bg-white p-6 ring-1 ring-gray-200">
      <div className="text-2xl">{icon}</div>
      <h3 className="mt-3 text-lg font-extrabold">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-gray-700">{desc}</p>
    </div>
  )
}

function ScamCard({
  icon,
  title,
  desc,
  action,
}: {
  icon: string
  title: string
  desc: string
  action: string
}) {
  return (
    <div className="rounded-3xl bg-white p-6 ring-1 ring-gray-200">
      <div className="text-2xl">{icon}</div>
      <h3 className="mt-3 text-lg font-extrabold">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-gray-700">{desc}</p>
      <div className="mt-4 rounded-2xl bg-gray-50 p-4 text-sm text-gray-700 ring-1 ring-gray-100">
        <span className="font-semibold">Do this:</span> {action}
      </div>
    </div>
  )
}
