"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";

type StepKey =
  | "basics"
  | "statement"
  | "autopay"
  | "utilization"
  | "interest"
  | "routine"
  | "emergency";

const STEPS: { key: StepKey; title: string; emoji: string; summary: string }[] = [
  {
    key: "basics",
    title: "The only 3 rules that matter",
    emoji: "⭐",
    summary: "Pay on time. Keep usage low. Don’t panic.",
  },
  {
    key: "statement",
    title: "Statement vs due date",
    emoji: "📄",
    summary: "Know what you owe and when you owe it.",
  },
  {
    key: "autopay",
    title: "Autopay setup",
    emoji: "🤖",
    summary: "Set it once, avoid late payments forever.",
  },
  {
    key: "utilization",
    title: "Utilization (the simple version)",
    emoji: "📉",
    summary: "Keep your balance small compared to your limit.",
  },
  {
    key: "interest",
    title: "Avoid interest",
    emoji: "💸",
    summary: "Pay statement balance in full if you can.",
  },
  {
    key: "routine",
    title: "Monthly routine (5 minutes)",
    emoji: "🗓️",
    summary: "A tiny checklist that builds credit over time.",
  },
  {
    key: "emergency",
    title: "If something goes wrong",
    emoji: "🧯",
    summary: "Late payment, overlimit, lost card—what to do.",
  },
];

function classNames(...parts: Array<string | false | undefined | null>) {
  return parts.filter(Boolean).join(" ");
}

export default function ManageCreditCardPage() {
  const [open, setOpen] = useState<StepKey>("basics");
  const active = useMemo(() => STEPS.find((s) => s.key === open) ?? STEPS[0], [open]);

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* HERO */}
      <section className="relative overflow-hidden pt-14 pb-10">
        <div className="pointer-events-none absolute -top-44 left-1/2 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-blue-100/50 blur-2xl" />
        <div className="pointer-events-none absolute -bottom-44 right-0 h-[380px] w-[380px] rounded-full bg-emerald-100/40 blur-2xl" />

        <div className="relative mx-auto max-w-6xl px-4">
          <div className="flex flex-wrap items-center gap-2 text-sm text-gray-500">
            <Link href="/credit-card" className="hover:text-gray-900">
              Credit Cards
            </Link>
            <span>→</span>
            <span className="font-bold text-gray-700">Manage</span>
          </div>

          <h1 className="mt-4 text-4xl font-extrabold tracking-tight md:text-6xl">
            Manage your card — <span className="text-blue-600">without debt.</span>
          </h1>

          <p className="mt-4 max-w-2xl text-lg text-gray-600">
            Credit is simple when you understand the statement, due date, and autopay.
            Follow these steps and you’ll build credit safely.
          </p>

          <div className="mt-7 flex flex-col items-start gap-3 sm:flex-row sm:items-center">
            <a
              href="#steps"
              className="rounded-2xl bg-blue-600 px-6 py-3 text-sm font-extrabold text-white shadow-sm transition hover:bg-blue-700"
            >
              Start the management guide
            </a>
            <Link
              href="/credit-card/apply/"
              className="rounded-2xl border border-gray-300 bg-white px-6 py-3 text-sm font-extrabold text-gray-900 shadow-sm transition hover:bg-gray-50"
            >
              Still applying? → Apply guide
            </Link>
          </div>

          <div className="mt-10 grid gap-3 sm:grid-cols-3">
            <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
              <p className="text-xs font-extrabold text-gray-500">#1</p>
              <p className="mt-1 text-sm text-gray-800">
                Pay on time. Every time. <b>No exceptions.</b>
              </p>
            </div>
            <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
              <p className="text-xs font-extrabold text-gray-500">#2</p>
              <p className="mt-1 text-sm text-gray-800">
                Keep utilization under <b>30%</b> (under 10% is great).
              </p>
            </div>
            <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
              <p className="text-xs font-extrabold text-gray-500">#3</p>
              <p className="mt-1 text-sm text-gray-800">
                Pay the <b>statement balance</b> to avoid interest.
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
              <p className="text-xs font-extrabold text-gray-500">MANAGEMENT STEPS</p>
              <h2 className="mt-1 text-2xl font-extrabold">Tap and learn</h2>
              <p className="mt-2 text-sm text-gray-600">
                One topic at a time. Simple explanations.
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
                          <p className="mt-1 text-sm text-gray-600">{s.summary}</p>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>

              <div className="mt-6 rounded-2xl bg-gray-50 p-4 text-sm text-gray-700">
                <p className="font-extrabold">The most common confusion:</p>
                <p className="mt-1">
                  <b>“Current balance”</b> is what you owe right now.
                  <br />
                  <b>“Statement balance”</b> is what you must pay by the due date to avoid interest.
                </p>
              </div>
            </div>

            {/* Quick cheat sheet */}
            <div className="mt-6 rounded-3xl border border-gray-100 bg-white p-5 shadow-sm">
              <p className="text-xs font-extrabold text-gray-500">CHEAT SHEET</p>
              <h3 className="mt-1 text-lg font-extrabold">If you remember only this</h3>
              <div className="mt-4 space-y-2 text-sm text-gray-700">
                <div className="rounded-2xl bg-gray-50 p-3">
                  ✅ Pay <b>statement balance</b> in full (best)
                </div>
                <div className="rounded-2xl bg-gray-50 p-3">
                  ✅ Autopay at least the <b>minimum</b>
                </div>
                <div className="rounded-2xl bg-gray-50 p-3">
                  ✅ Keep spending small relative to your limit
                </div>
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
                {open === "basics" && (
                  <div className="space-y-5">
                    <div className="rounded-3xl bg-gray-50 p-5">
                      <p className="text-sm font-extrabold">The 3 rules</p>
                      <ol className="mt-3 space-y-2 text-sm text-gray-700">
                        <li className="rounded-2xl bg-white p-3 border border-gray-100">
                          <b>1) Pay on time</b> (autopay helps).
                        </li>
                        <li className="rounded-2xl bg-white p-3 border border-gray-100">
                          <b>2) Keep utilization low</b> (don’t max it out).
                        </li>
                        <li className="rounded-2xl bg-white p-3 border border-gray-100">
                          <b>3) Pay statement balance</b> to avoid interest.
                        </li>
                      </ol>
                    </div>

                    <div className="rounded-3xl border border-emerald-200 bg-emerald-50 p-5">
                      <p className="font-extrabold text-emerald-900">If you want “easy mode”</p>
                      <p className="mt-2 text-sm text-emerald-900">
                        Use the card for 1–2 small purchases per month, then autopay the full statement.
                      </p>
                    </div>
                  </div>
                )}

                {open === "statement" && (
                  <div className="space-y-5">
                    <div className="rounded-3xl bg-gray-50 p-5">
                      <p className="text-sm font-extrabold">Statement vs due date</p>
                      <p className="mt-2 text-sm text-gray-700">
                        Each month, the bank “prints” a statement. That statement includes a balance.
                        You have until the due date to pay it.
                      </p>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="rounded-3xl border border-gray-100 bg-white p-5 shadow-sm">
                        <p className="font-extrabold">📄 Statement date</p>
                        <p className="mt-2 text-sm text-gray-600">
                          The day your monthly bill is created.
                        </p>
                      </div>
                      <div className="rounded-3xl border border-gray-100 bg-white p-5 shadow-sm">
                        <p className="font-extrabold">⏰ Due date</p>
                        <p className="mt-2 text-sm text-gray-600">
                          The last day to pay without being late.
                        </p>
                      </div>
                    </div>

                    <div className="rounded-3xl border border-blue-200 bg-blue-50 p-5">
                      <p className="font-extrabold text-blue-900">Example</p>
                      <p className="mt-2 text-sm text-blue-900">
                        Statement closes on the 5th. Due date is the 30th.
                        Pay the statement balance by the 30th.
                      </p>
                    </div>
                  </div>
                )}

                {open === "autopay" && (
                  <div className="space-y-5">
                    <div className="rounded-3xl bg-gray-50 p-5">
                      <p className="text-sm font-extrabold">Autopay setup (recommended)</p>
                      <p className="mt-2 text-sm text-gray-700">
                        Autopay prevents late payments, which are the biggest credit score damage.
                      </p>
                    </div>

                    <div className="rounded-3xl border border-gray-100 bg-white p-5 shadow-sm">
                      <p className="font-extrabold">Choose your autopay option</p>
                      <ul className="mt-3 space-y-2 text-sm text-gray-700">
                        <li className="rounded-2xl bg-gray-50 p-3">
                          ✅ <b>Full statement balance</b> (best if you can afford it)
                        </li>
                        <li className="rounded-2xl bg-gray-50 p-3">
                          ✅ <b>Minimum payment</b> (still protects your score)
                        </li>
                      </ul>
                      <p className="mt-3 text-xs text-gray-500">
                        Tip: If you choose minimum payment, make an extra manual payment to avoid interest.
                      </p>
                    </div>

                    <div className="rounded-3xl border border-amber-200 bg-amber-50 p-5">
                      <p className="font-extrabold text-amber-900">Always keep money in the bank account</p>
                      <p className="mt-2 text-sm text-amber-900">
                        If autopay fails because your account is empty, you can still get late fees.
                      </p>
                    </div>
                  </div>
                )}

                {open === "utilization" && (
                  <div className="space-y-5">
                    <div className="rounded-3xl bg-gray-50 p-5">
                      <p className="text-sm font-extrabold">Utilization (simple)</p>
                      <p className="mt-2 text-sm text-gray-700">
                        Utilization = how much of your limit you’re using.
                        Lower is better (especially when the statement closes).
                      </p>
                    </div>

                    <div className="grid gap-4 md:grid-cols-3">
                      <div className="rounded-3xl border border-gray-100 bg-white p-5 shadow-sm">
                        <p className="text-xs font-extrabold text-gray-500">LIMIT</p>
                        <p className="mt-1 text-lg font-extrabold">$300</p>
                      </div>
                      <div className="rounded-3xl border border-gray-100 bg-white p-5 shadow-sm">
                        <p className="text-xs font-extrabold text-gray-500">GOOD BALANCE</p>
                        <p className="mt-1 text-lg font-extrabold">$0–$30</p>
                        <p className="mt-1 text-xs text-gray-500">(0–10%)</p>
                      </div>
                      <div className="rounded-3xl border border-gray-100 bg-white p-5 shadow-sm">
                        <p className="text-xs font-extrabold text-gray-500">OK BALANCE</p>
                        <p className="mt-1 text-lg font-extrabold">$0–$90</p>
                        <p className="mt-1 text-xs text-gray-500">(0–30%)</p>
                      </div>
                    </div>

                    <div className="rounded-3xl border border-blue-200 bg-blue-50 p-5">
                      <p className="font-extrabold text-blue-900">Easy trick</p>
                      <p className="mt-2 text-sm text-blue-900">
                        If your balance is high mid-month, make a small payment before your statement closes.
                        This can keep your reported utilization lower.
                      </p>
                    </div>
                  </div>
                )}

                {open === "interest" && (
                  <div className="space-y-5">
                    <div className="rounded-3xl bg-gray-50 p-5">
                      <p className="text-sm font-extrabold">Avoid interest</p>
                      <p className="mt-2 text-sm text-gray-700">
                        Interest usually happens when you don’t pay the statement balance in full.
                      </p>
                    </div>

                    <div className="rounded-3xl border border-gray-100 bg-white p-5 shadow-sm">
                      <p className="font-extrabold">Best practice</p>
                      <p className="mt-2 text-sm text-gray-700">
                        Pay the <b>statement balance</b> by the due date. That’s the cleanest way to use a credit card.
                      </p>
                    </div>

                    <div className="rounded-3xl border border-rose-200 bg-rose-50 p-5">
                      <p className="font-extrabold text-rose-800">Avoid this mistake</p>
                      <p className="mt-2 text-sm text-rose-900">
                        Paying only the minimum keeps you “not late,” but you may pay interest on the remaining balance.
                      </p>
                    </div>
                  </div>
                )}

                {open === "routine" && (
                  <div className="space-y-5">
                    <div className="rounded-3xl bg-gray-50 p-5">
                      <p className="text-sm font-extrabold">Monthly routine (5 minutes)</p>
                      <p className="mt-2 text-sm text-gray-700">
                        Do these small checks once per month. This builds credit without stress.
                      </p>
                    </div>

                    <ol className="space-y-2 text-sm text-gray-700">
                      <li className="rounded-2xl border border-gray-100 bg-white p-4">
                        <b>1)</b> Open your app. Confirm autopay is ON.
                      </li>
                      <li className="rounded-2xl border border-gray-100 bg-white p-4">
                        <b>2)</b> Check statement close date + due date.
                      </li>
                      <li className="rounded-2xl border border-gray-100 bg-white p-4">
                        <b>3)</b> Keep balance under 30% of the limit (lower is better).
                      </li>
                      <li className="rounded-2xl border border-gray-100 bg-white p-4">
                        <b>4)</b> Pay statement balance in full (when possible).
                      </li>
                      <li className="rounded-2xl border border-gray-100 bg-white p-4">
                        <b>5)</b> Freeze card if lost; lock it in the app if unsure.
                      </li>
                    </ol>

                    <div className="rounded-3xl border border-emerald-200 bg-emerald-50 p-5">
                      <p className="font-extrabold text-emerald-900">Consistency wins</p>
                      <p className="mt-2 text-sm text-emerald-900">
                        You don’t need big spending. You need clean, on-time history.
                      </p>
                    </div>
                  </div>
                )}

                {open === "emergency" && (
                  <div className="space-y-5">
                    <div className="rounded-3xl bg-gray-50 p-5">
                      <p className="text-sm font-extrabold">If something goes wrong</p>
                      <p className="mt-2 text-sm text-gray-700">
                        Here’s the simple “what to do” list.
                      </p>
                    </div>

                    <div className="space-y-3 text-sm text-gray-700">
                      <div className="rounded-2xl border border-gray-100 bg-white p-4">
                        <b>Late payment risk:</b> pay immediately. Turn on autopay. Call the bank politely
                        and ask if they can waive a first late fee (sometimes they do).
                      </div>
                      <div className="rounded-2xl border border-gray-100 bg-white p-4">
                        <b>Card lost:</b> lock the card in the app. Then report it lost and request replacement.
                      </div>
                      <div className="rounded-2xl border border-gray-100 bg-white p-4">
                        <b>Fraud charge:</b> freeze/lock card, dispute the charge in the app, and change passwords.
                      </div>
                      <div className="rounded-2xl border border-gray-100 bg-white p-4">
                        <b>Balance too high:</b> make a payment now. Then reduce spending until it’s back under control.
                      </div>
                    </div>

                    <div className="rounded-3xl border border-blue-200 bg-blue-50 p-5">
                      <p className="font-extrabold text-blue-900">Important</p>
                      <p className="mt-2 text-sm text-blue-900">
                        Never share one-time passcodes (OTP) or passwords with anyone claiming to be “support.”
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
                  <p className="text-sm font-extrabold">Should I pay weekly?</p>
                  <p className="mt-1 text-sm text-gray-700">
                    You can. It helps keep balances low. But the key is: pay on time by the due date.
                  </p>
                </div>
                <div className="rounded-2xl bg-gray-50 p-4">
                  <p className="text-sm font-extrabold">Is carrying a balance good?</p>
                  <p className="mt-1 text-sm text-gray-700">
                    No. Paying interest doesn’t “build credit faster.” Paying on time does.
                  </p>
                </div>
                <div className="rounded-2xl bg-gray-50 p-4">
                  <p className="text-sm font-extrabold">What if I can’t pay in full?</p>
                  <p className="mt-1 text-sm text-gray-700">
                    Pay at least the minimum (to avoid being late), then pay extra as soon as you can.
                  </p>
                </div>
                <div className="rounded-2xl bg-gray-50 p-4">
                  <p className="text-sm font-extrabold">When does utilization matter?</p>
                  <p className="mt-1 text-sm text-gray-700">
                    Most of the time, it matters most around statement closing.
                  </p>
                </div>
              </div>
            </div>

            {/* Safety note */}
            <div className="mt-6 rounded-3xl border border-gray-100 bg-gray-50 p-6 text-sm text-gray-700">
              <b>Safety reminder:</b> If someone calls and asks for your card number or one-time code,
              hang up. Use the official number from the bank app or the back of the card.
            </div>
          </main>
        </div>
      </section>
    </div>
  );
}