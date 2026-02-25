"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";

type StepKey =
  | "before"
  | "choose"
  | "documents"
  | "apply"
  | "after"
  | "dont";

const STEPS: {
  key: StepKey;
  title: string;
  emoji: string;
  summary: string;
}[] = [
  {
    key: "before",
    title: "Before you apply",
    emoji: "🧠",
    summary: "Get your basics ready so you don’t get rejected.",
  },
  {
    key: "choose",
    title: "Pick the right first card",
    emoji: "🪪",
    summary: "Student or Secured. Simple decision.",
  },
  {
    key: "documents",
    title: "What you need (documents)",
    emoji: "📄",
    summary: "The common items banks ask for.",
  },
  {
    key: "apply",
    title: "Apply (step-by-step)",
    emoji: "✅",
    summary: "Fill the form cleanly and confidently.",
  },
  {
    key: "after",
    title: "After approval",
    emoji: "📬",
    summary: "Activate, set autopay, and build credit safely.",
  },
  {
    key: "dont",
    title: "Mistakes to avoid",
    emoji: "🚫",
    summary: "Avoid the few things that cause pain later.",
  },
];

function classNames(...parts: Array<string | false | undefined | null>) {
  return parts.filter(Boolean).join(" ");
}

export default function ApplyCreditCardPage() {
  const [open, setOpen] = useState<StepKey>("before");

  const active = useMemo(
    () => STEPS.find((s) => s.key === open) ?? STEPS[0],
    [open]
  );

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* HERO */}
      <section className="relative overflow-hidden pt-14 pb-10">
        {/* soft glow */}
        <div className="pointer-events-none absolute -top-44 left-1/2 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-blue-100/50 blur-2xl" />
        <div className="pointer-events-none absolute -bottom-44 right-0 h-[380px] w-[380px] rounded-full bg-emerald-100/40 blur-2xl" />

        <div className="relative mx-auto max-w-6xl px-4">
          {/* breadcrumb */}
          <div className="flex flex-wrap items-center gap-2 text-sm text-gray-500">
            <Link href="/credit-card" className="hover:text-gray-900">
              Credit Cards
            </Link>
            <span>→</span>
            <span className="font-bold text-gray-700">Apply</span>
          </div>

          <h1 className="mt-4 text-4xl font-extrabold tracking-tight md:text-6xl">
            Apply for your first credit card —{" "}
            <span className="text-blue-600">simple, safe, step-by-step.</span>
          </h1>

          <p className="mt-4 max-w-2xl text-lg text-gray-600">
            Clear instructions for international students. No jargon. No stress.
            Just the safest way to get approved and build credit.
          </p>

          <div className="mt-7 flex flex-col items-start gap-3 sm:flex-row sm:items-center">
            <a
              href="#steps"
              className="rounded-2xl bg-blue-600 px-6 py-3 text-sm font-extrabold text-white shadow-sm transition hover:bg-blue-700"
            >
              Start the application guide
            </a>
            <Link
              href="/credit-card/manage"
              className="rounded-2xl border border-gray-300 bg-white px-6 py-3 text-sm font-extrabold text-gray-900 shadow-sm transition hover:bg-gray-50"
            >
              I already have a card → Manage it
            </Link>
          </div>

          {/* quick rules */}
          <div className="mt-10 grid gap-3 sm:grid-cols-3">
            <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
              <p className="text-xs font-extrabold text-gray-500">BEST PRACTICE</p>
              <p className="mt-1 text-sm text-gray-800">
                Apply for <b>1 card only</b> to start.
              </p>
            </div>
            <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
              <p className="text-xs font-extrabold text-gray-500">KEEP IT EASY</p>
              <p className="mt-1 text-sm text-gray-800">
                Use it a little. Pay it off <b>every month</b>.
              </p>
            </div>
            <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
              <p className="text-xs font-extrabold text-gray-500">NO MISSES</p>
              <p className="mt-1 text-sm text-gray-800">
                Turn on <b>autopay</b> on Day 1.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* MAIN */}
      <section id="steps" className="mx-auto max-w-6xl px-4 pb-20">
        <div className="grid gap-6 lg:grid-cols-12">
          {/* LEFT NAV */}
          <aside className="lg:col-span-5">
            <div className="rounded-3xl border border-gray-100 bg-white p-5 shadow-sm">
              <p className="text-xs font-extrabold text-gray-500">THE SAFE PATH</p>
              <h2 className="mt-1 text-2xl font-extrabold">Follow these steps</h2>
              <p className="mt-2 text-sm text-gray-600">
                Click a step to open it. Finish it. Move on.
              </p>

              <div className="mt-5 space-y-3">
                {STEPS.map((s, idx) => {
                  const isActive = s.key === open;
                  return (
                    <button
                      key={s.key}
                      type="button"
                      onClick={() => setOpen(s.key)}
                      className={classNames(
                        "w-full text-left rounded-3xl border p-4 transition",
                        "focus:outline-none focus:ring-2 focus:ring-blue-200",
                        isActive
                          ? "border-blue-200 bg-blue-50"
                          : "border-gray-100 bg-white hover:bg-gray-50"
                      )}
                    >
                      <div className="flex items-start gap-3">
                        <div
                          className={classNames(
                            "mt-0.5 flex h-10 w-10 items-center justify-center rounded-2xl shadow-sm",
                            isActive ? "bg-white" : "bg-gray-50"
                          )}
                        >
                          <span className="text-xl">{s.emoji}</span>
                        </div>

                        <div className="flex-1">
                          <div className="flex items-center justify-between gap-3">
                            <p className="text-sm font-extrabold text-gray-900">
                              {idx + 1}. {s.title}
                            </p>
                            <span
                              className={classNames(
                                "text-xs font-extrabold",
                                isActive ? "text-blue-700" : "text-gray-400"
                              )}
                            >
                              {isActive ? "OPEN" : "VIEW"}
                            </span>
                          </div>
                          <p className="mt-1 text-sm text-gray-600">
                            {s.summary}
                          </p>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>

              <div className="mt-6 rounded-2xl bg-gray-50 p-4 text-sm text-gray-700">
                <p className="font-extrabold">Quick meaning:</p>
                <p className="mt-1">
                  Applying for a credit card is asking a bank:{" "}
                  <b>“Can I borrow a little money each month and pay it back?”</b>{" "}
                  They say yes if your info looks consistent and you seem able to pay.
                </p>
              </div>
            </div>

            {/* Mini checklist */}
            <div className="mt-6 rounded-3xl border border-gray-100 bg-white p-5 shadow-sm">
              <p className="text-xs font-extrabold text-gray-500">FAST CHECK</p>
              <h3 className="mt-1 text-lg font-extrabold">Ready to apply today?</h3>
              <div className="mt-4 space-y-2 text-sm text-gray-700">
                <div className="rounded-2xl bg-gray-50 p-3">✅ Stable U.S. address</div>
                <div className="rounded-2xl bg-gray-50 p-3">✅ Phone + email you control</div>
                <div className="rounded-2xl bg-gray-50 p-3">✅ Plan to pay every month (autopay)</div>
                <div className="rounded-2xl bg-gray-50 p-3">✅ Applying for only 1 card</div>
              </div>
            </div>
          </aside>

          {/* RIGHT CONTENT */}
          <main className="lg:col-span-7">
            <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm md:p-8">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-extrabold text-gray-500">CURRENT STEP</p>
                  <h3 className="mt-1 text-2xl font-extrabold">
                    {active.emoji} {active.title}
                  </h3>
                  <p className="mt-2 text-sm text-gray-600">{active.summary}</p>
                </div>
                <Link
                  href="/credit-card"
                  className="hidden rounded-2xl border border-gray-300 bg-white px-4 py-2 text-sm font-extrabold text-gray-900 shadow-sm transition hover:bg-gray-50 md:inline-flex"
                >
                  ← Back
                </Link>
              </div>

              <div className="mt-6 space-y-6 text-gray-800">
                {open === "before" && (
                  <div className="space-y-5">
                    <div className="rounded-3xl bg-gray-50 p-5">
                      <p className="text-sm font-extrabold">
                        Goal: make your application easy to approve
                      </p>
                      <p className="mt-2 text-sm text-gray-700">
                        Banks reject people for small issues: missing info, unstable address,
                        or applying for too many cards. Fix the basics first.
                      </p>
                    </div>

                    <div>
                      <h4 className="text-lg font-extrabold">Checklist</h4>
                      <ul className="mt-3 space-y-2 text-sm text-gray-700">
                        <li className="rounded-2xl border border-gray-100 bg-white p-3">
                          ✅ Use a <b>stable address</b> where you can receive mail.
                        </li>
                        <li className="rounded-2xl border border-gray-100 bg-white p-3">
                          ✅ Make sure your <b>name matches your ID</b> exactly.
                        </li>
                        <li className="rounded-2xl border border-gray-100 bg-white p-3">
                          ✅ Have a simple plan: use small amounts and <b>pay monthly</b>.
                        </li>
                        <li className="rounded-2xl border border-gray-100 bg-white p-3">
                          ✅ Apply for <b>one</b> card only.
                        </li>
                      </ul>
                    </div>

                    <div className="rounded-3xl border border-amber-200 bg-amber-50 p-5">
                      <p className="font-extrabold text-amber-900">
                        Pause if you’re not ready to pay monthly
                      </p>
                      <p className="mt-2 text-sm text-amber-900">
                        A credit card is useful only when you can pay on time. If money is
                        unstable right now, build a small buffer first.
                      </p>
                    </div>
                  </div>
                )}

                {open === "choose" && (
                  <div className="space-y-5">
                    <div className="rounded-3xl bg-gray-50 p-5">
                      <p className="text-sm font-extrabold">Simple decision</p>
                      <p className="mt-2 text-sm text-gray-700">
                        For your first card, choose <b>Student</b> or <b>Secured</b>.
                        Rewards can wait.
                      </p>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="rounded-3xl border border-gray-100 bg-white p-5 shadow-sm">
                        <p className="text-lg font-extrabold">🎓 Student card</p>
                        <p className="mt-2 text-sm text-gray-600">
                          Best if you qualify. No deposit.
                        </p>
                        <ul className="mt-3 space-y-2 text-sm text-gray-700">
                          <li>• Usually easier approvals for students</li>
                          <li>• Lower limits (safer)</li>
                          <li>• Good starter option</li>
                        </ul>
                      </div>

                      <div className="rounded-3xl border border-gray-100 bg-white p-5 shadow-sm">
                        <p className="text-lg font-extrabold">🧱 Secured card</p>
                        <p className="mt-2 text-sm text-gray-600">
                          A deposit becomes your limit.
                        </p>
                        <ul className="mt-3 space-y-2 text-sm text-gray-700">
                          <li>• Often easiest approval path</li>
                          <li>• Deposit is not a fee</li>
                          <li>• Great for building credit from zero</li>
                        </ul>
                      </div>
                    </div>

                    <div className="rounded-3xl border border-rose-200 bg-rose-50 p-5">
                      <p className="font-exbold text-rose-800">
                        Avoid these for your first card
                      </p>
                      <ul className="mt-2 space-y-1 text-sm text-rose-900">
                        <li>• Big annual fees</li>
                        <li>• “Luxury” reward cards</li>
                        <li>• Complicated promo offers</li>
                      </ul>
                    </div>
                  </div>
                )}

                {open === "documents" && (
                  <div className="space-y-5">
                    <div className="rounded-3xl bg-gray-50 p-5">
                      <p className="text-sm font-extrabold">What banks want</p>
                      <p className="mt-2 text-sm text-gray-700">
                        They want to verify <b>who you are</b> and <b>how you pay</b>.
                        This is normal.
                      </p>
                    </div>

                    <div>
                      <h4 className="text-lg font-extrabold">Common items</h4>
                      <div className="mt-3 grid gap-3 sm:grid-cols-2">
                        <div className="rounded-2xl border border-gray-100 bg-white p-4">
                          <p className="font-extrabold">🪪 ID</p>
                          <p className="mt-1 text-sm text-gray-600">
                            Passport (and U.S. ID if you have one).
                          </p>
                        </div>
                        <div className="rounded-2xl border border-gray-100 bg-white p-4">
                          <p className="font-extrabold">🏠 Address</p>
                          <p className="mt-1 text-sm text-gray-600">
                            U.S. residential/mailing address.
                          </p>
                        </div>
                        <div className="rounded-2xl border border-gray-100 bg-white p-4">
                          <p className="font-extrabold">☎️ Phone + email</p>
                          <p className="mt-1 text-sm text-gray-600">
                            Keep them stable and accessible.
                          </p>
                        </div>
                        <div className="rounded-2xl border border-gray-100 bg-white p-4">
                          <p className="font-extrabold">💵 Income info</p>
                          <p className="mt-1 text-sm text-gray-600">
                            Job, assistantship, stipend, or other repayable income.
                          </p>
                        </div>
                      </div>

                      <div className="mt-4 rounded-3xl border border-blue-200 bg-blue-50 p-5">
                        <p className="font-extrabold text-blue-900">About SSN / ITIN</p>
                        <p className="mt-2 text-sm text-blue-900">
                          Some cards require an SSN. Some accept an ITIN. If the form asks
                          for SSN and you don’t have one, don’t guess—choose a card that
                          fits your situation.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {open === "apply" && (
                  <div className="space-y-5">
                    <div className="rounded-3xl bg-gray-50 p-5">
                      <p className="text-sm font-extrabold">Step-by-step application</p>
                      <p className="mt-2 text-sm text-gray-700">
                        Go slow. One typo can cause “can’t verify identity.”
                      </p>
                    </div>

                    <ol className="space-y-3 text-sm text-gray-700">
                      <li className="rounded-2xl border border-gray-100 bg-white p-4">
                        <b>1) Choose one card.</b> Don’t apply for multiple cards
                        on the same day.
                      </li>
                      <li className="rounded-2xl border border-gray-100 bg-white p-4">
                        <b>2) Apply on the official bank website</b> (avoid random links).
                      </li>
                      <li className="rounded-2xl border border-gray-100 bg-white p-4">
                        <b>3) Name:</b> match your ID exactly.
                      </li>
                      <li className="rounded-2xl border border-gray-100 bg-white p-4">
                        <b>4) Address:</b> use your stable U.S. address and double-check it.
                      </li>
                      <li className="rounded-2xl border border-gray-100 bg-white p-4">
                        <b>5) Income:</b> enter honest income you can use to repay.
                      </li>
                      <li className="rounded-2xl border border-gray-100 bg-white p-4">
                        <b>6) Rent:</b> if it’s $0 (dorm/sponsor), it’s okay to enter $0.
                      </li>
                      <li className="rounded-2xl border border-gray-100 bg-white p-4">
                        <b>7) Submit once.</b> Save screenshots or confirmation number.
                      </li>
                    </ol>

                    <div className="rounded-3xl border border-emerald-200 bg-emerald-50 p-5">
                      <p className="font-extrabold text-emerald-900">If your status is “Pending”</p>
                      <p className="mt-2 text-sm text-emerald-900">
                        Pending is common. It often means identity verification. Follow the
                        bank’s steps and use official phone numbers.
                      </p>
                    </div>
                  </div>
                )}

                {open === "after" && (
                  <div className="space-y-5">
                    <div className="rounded-3xl bg-gray-50 p-5">
                      <p className="text-sm font-extrabold">Now build credit safely</p>
                      <p className="mt-2 text-sm text-gray-700">
                        Approval is step one. Your habits build the score.
                      </p>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="rounded-3xl border border-gray-100 bg-white p-5 shadow-sm">
                        <p className="text-lg font-extrabold">📬 Activate</p>
                        <p className="mt-2 text-sm text-gray-600">
                          Activate in the bank app when it arrives.
                        </p>
                      </div>
                      <div className="rounded-3xl border border-gray-100 bg-white p-5 shadow-sm">
                        <p className="text-lg font-extrabold">🤖 Autopay</p>
                        <p className="mt-2 text-sm text-gray-600">
                          Turn on autopay for <b>minimum</b> (best: full statement balance).
                        </p>
                      </div>
                      <div className="rounded-3xl border border-gray-100 bg-white p-5 shadow-sm">
                        <p className="text-lg font-extrabold">🧾 Pay the statement</p>
                        <p className="mt-2 text-sm text-gray-600">
                          Pay the statement balance by the due date.
                        </p>
                      </div>
                      <div className="rounded-3xl border border-gray-100 bg-white p-5 shadow-sm">
                        <p className="text-lg font-extrabold">📉 Keep usage low</p>
                        <p className="mt-2 text-sm text-gray-600">
                          Aim under <b>30%</b> utilization (under 10% is great).
                        </p>
                      </div>
                    </div>

                    <div className="rounded-3xl border border-blue-200 bg-blue-50 p-5">
                      <p className="font-extrabold text-blue-900">Simple example</p>
                      <p className="mt-2 text-sm text-blue-900">
                        Limit = $300. Spend $20–$60/month. Pay the full statement.
                        Repeat monthly. This builds credit smoothly.
                      </p>
                    </div>

                    <div className="mt-2 flex flex-wrap gap-3">
                      <Link
                        href="/credit-card/manage"
                        className="rounded-2xl bg-blue-600 px-6 py-3 text-sm font-extrabold text-white shadow-sm transition hover:bg-blue-700"
                      >
                        Learn to manage your card →
                      </Link>
                      <Link
                        href="/credit-card/security"
                        className="rounded-2xl border border-gray-300 bg-white px-6 py-3 text-sm font-extrabold text-gray-900 shadow-sm transition hover:bg-gray-50"
                      >
                        Avoid scams →
                      </Link>
                    </div>
                  </div>
                )}

                {open === "dont" && (
                  <div className="space-y-5">
                    <div className="rounded-3xl border border-rose-200 bg-rose-50 p-5">
                      <p className="font-extrabold text-rose-800">Mistakes to avoid</p>
                      <p className="mt-2 text-sm text-rose-900">
                        These are the fastest ways to cause fees, stress, or score damage.
                      </p>
                    </div>

                    <div className="space-y-3 text-sm text-gray-700">
                      <div className="rounded-2xl border border-gray-100 bg-white p-4">
                        🚫 <b>Don’t apply for multiple cards</b> in the same week.
                      </div>
                      <div className="rounded-2xl border border-gray-100 bg-white p-4">
                        🚫 <b>Don’t carry a balance</b> to “build credit.” It just costs interest.
                      </div>
                      <div className="rounded-2xl border border-gray-100 bg-white p-4">
                        🚫 <b>Don’t miss payments.</b> This is the biggest score killer.
                      </div>
                      <div className="rounded-2xl border border-gray-100 bg-white p-4">
                        🚫 <b>Don’t max out your limit.</b> Keep utilization low.
                      </div>
                      <div className="rounded-2xl border border-gray-100 bg-white p-4">
                        🚫 <b>Don’t share OTP codes</b> or passwords with anyone.
                      </div>
                    </div>

                    <div className="rounded-3xl border border-emerald-200 bg-emerald-50 p-5">
                      <p className="font-extrabold text-emerald-900">One sentence to remember</p>
                      <p className="mt-2 text-sm text-emerald-900">
                        Use the card lightly, and pay on time every month.
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* FOOTER NAV */}
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex flex-wrap gap-2">
                  <Link
                    href="/credit-card"
                    className="rounded-2xl border border-gray-300 bg-white px-4 py-2 text-sm font-extrabold text-gray-900 shadow-sm transition hover:bg-gray-50"
                  >
                    ← Credit Cards Home
                  </Link>
                  <Link
                    href="/credit-card/security"
                    className="rounded-2xl border border-gray-300 bg-white px-4 py-2 text-sm font-extrabold text-gray-900 shadow-sm transition hover:bg-gray-50"
                  >
                    Scam Shield
                  </Link>
                </div>

                <a
                  href="#steps"
                  className="rounded-2xl bg-gray-900 px-5 py-2.5 text-sm font-extrabold text-white shadow-sm transition hover:bg-gray-800"
                >
                  Back to steps ↑
                </a>
              </div>
            </div>

            {/* FAQ */}
            <div className="mt-6 rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-extrabold">Quick FAQ</h3>

              <div className="mt-4 grid gap-4 md:grid-cols-2">
                <div className="rounded-2xl bg-gray-50 p-4">
                  <p className="text-sm font-extrabold">Will applying hurt my score?</p>
                  <p className="mt-1 text-sm text-gray-700">
                    A small “hard inquiry” may happen. That’s why you apply for{" "}
                    <b>one</b> card, not many.
                  </p>
                </div>

                <div className="rounded-2xl bg-gray-50 p-4">
                  <p className="text-sm font-extrabold">Do I need to spend a lot?</p>
                  <p className="mt-1 text-sm text-gray-700">
                    No. Small spending + on-time payments works great.
                  </p>
                </div>

                <div className="rounded-2xl bg-gray-50 p-4">
                  <p className="text-sm font-extrabold">What if I get denied?</p>
                  <p className="mt-1 text-sm text-gray-700">
                    Don’t panic. Try a secured card later and check for typos in your info.
                  </p>
                </div>

                <div className="rounded-2xl bg-gray-50 p-4">
                  <p className="text-sm font-extrabold">How fast will my score grow?</p>
                  <p className="mt-1 text-sm text-gray-700">
                    Think months, not days. Consistency is what matters.
                  </p>
                </div>
              </div>
            </div>

            {/* Safety note */}
            <div className="mt-6 rounded-3xl border border-gray-100 bg-gray-50 p-6 text-sm text-gray-700">
              <b>Safety reminder:</b> Never share card numbers, passwords, or one-time
              codes with callers or texts. If unsure, hang up and call the official number
              from the bank website or the back of your card.
            </div>
          </main>
        </div>
      </section>
    </div>
  );
}