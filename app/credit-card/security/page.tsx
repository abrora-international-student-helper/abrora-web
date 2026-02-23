"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";

type StepKey =
  | "rules"
  | "phone"
  | "texts"
  | "email"
  | "bank"
  | "card"
  | "identity"
  | "whatToDo";

const STEPS: { key: StepKey; title: string; emoji: string; summary: string }[] = [
  {
    key: "rules",
    title: "The 5 safety rules",
    emoji: "🛡️",
    summary: "Simple rules that stop most scams.",
  },
  {
    key: "phone",
    title: "Phone call scams",
    emoji: "📞",
    summary: "Fake IRS, fake bank, urgent threats.",
  },
  {
    key: "texts",
    title: "Text scams (smishing)",
    emoji: "💬",
    summary: "Links, delivery texts, “verify now.”",
  },
  {
    key: "email",
    title: "Email scams (phishing)",
    emoji: "📧",
    summary: "Lookalike emails and fake logins.",
  },
  {
    key: "bank",
    title: "Safe banking habits",
    emoji: "🏦",
    summary: "What to do in apps and accounts.",
  },
  {
    key: "card",
    title: "Card safety basics",
    emoji: "💳",
    summary: "Protect your card and payments.",
  },
  {
    key: "identity",
    title: "Protect your identity",
    emoji: "🪪",
    summary: "SSN/ITIN safety, documents, and accounts.",
  },
  {
    key: "whatToDo",
    title: "If you think you got scammed",
    emoji: "🧯",
    summary: "Fast steps that limit damage.",
  },
];

function classNames(...parts: Array<string | false | undefined | null>) {
  return parts.filter(Boolean).join(" ");
}

export default function SecurityPage() {
  const [open, setOpen] = useState<StepKey>("rules");
  const active = useMemo(() => STEPS.find((s) => s.key === open) ?? STEPS[0], [open]);

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* HERO */}
      <section className="relative overflow-hidden pt-14 pb-10">
        <div className="pointer-events-none absolute -top-44 left-1/2 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-blue-100/50 blur-2xl" />
        <div className="pointer-events-none absolute -bottom-44 right-0 h-[380px] w-[380px] rounded-full bg-rose-100/40 blur-2xl" />

        <div className="relative mx-auto max-w-6xl px-4">
          <div className="flex flex-wrap items-center gap-2 text-sm text-gray-500">
            <Link href="/credit-card" className="hover:text-gray-900">
              Credit Cards
            </Link>
            <span>→</span>
            <span className="font-bold text-gray-700">Security</span>
          </div>

          <h1 className="mt-4 text-4xl font-extrabold tracking-tight md:text-6xl">
            Scam Shield — <span className="text-blue-600">protect your money.</span>
          </h1>

          <p className="mt-4 max-w-2xl text-lg text-gray-600">
            International students are targeted a lot. This page teaches you the patterns scams use
            and the safe actions to take.
          </p>

          <div className="mt-7 flex flex-col items-start gap-3 sm:flex-row sm:items-center">
            <a
              href="#steps"
              className="rounded-2xl bg-blue-600 px-6 py-3 text-sm font-extrabold text-white shadow-sm transition hover:bg-blue-700"
            >
              Learn the safety rules
            </a>
            <Link
              href="/credit-card/manage"
              className="rounded-2xl border border-gray-300 bg-white px-6 py-3 text-sm font-extrabold text-gray-900 shadow-sm transition hover:bg-gray-50"
            >
              Back to managing your card
            </Link>
          </div>

          <div className="mt-10 grid gap-3 sm:grid-cols-3">
            <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
              <p className="text-xs font-extrabold text-gray-500">RULE</p>
              <p className="mt-1 text-sm text-gray-800">
                No real bank/IRS asks for <b>gift cards</b> or <b>crypto</b>.
              </p>
            </div>
            <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
              <p className="text-xs font-extrabold text-gray-500">RULE</p>
              <p className="mt-1 text-sm text-gray-800">
                Never share <b>OTP codes</b> or passwords.
              </p>
            </div>
            <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
              <p className="text-xs font-extrabold text-gray-500">RULE</p>
              <p className="mt-1 text-sm text-gray-800">
                If it’s urgent and scary, <b>pause</b> and verify.
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
              <p className="text-xs font-extrabold text-gray-500">SECURITY TOPICS</p>
              <h2 className="mt-1 text-2xl font-extrabold">Tap a topic</h2>
              <p className="mt-2 text-sm text-gray-600">
                You’ll learn patterns and the safe response.
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
                <p className="font-extrabold">Fast verification method</p>
                <p className="mt-1">
                  Don’t click links in texts/emails. Open your bank app directly or type the official website yourself.
                </p>
              </div>
            </div>

            <div className="mt-6 rounded-3xl border border-gray-100 bg-white p-5 shadow-sm">
              <p className="text-xs font-extrabold text-gray-500">RED FLAGS</p>
              <h3 className="mt-1 text-lg font-extrabold">If you see these, stop</h3>
              <div className="mt-4 space-y-2 text-sm text-gray-700">
                <div className="rounded-2xl bg-gray-50 p-3">🚩 Urgent threats (“police coming”, “deportation”)</div>
                <div className="rounded-2xl bg-gray-50 p-3">🚩 Gift cards / crypto / wire transfers</div>
                <div className="rounded-2xl bg-gray-50 p-3">🚩 Asking for OTP codes or passwords</div>
                <div className="rounded-2xl bg-gray-50 p-3">🚩 “Verify now” links in messages</div>
              </div>
            </div>
          </aside>

          {/* RIGHT CONTENT */}
          <main className="lg:col-span-7">
            <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm md:p-8">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-extrabold text-gray-500">CURRENT TOPIC</p>
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
                {open === "rules" && (
                  <div className="space-y-5">
                    <div className="rounded-3xl bg-gray-50 p-5">
                      <p className="text-sm font-extrabold">The 5 rules</p>
                      <ol className="mt-3 space-y-2 text-sm text-gray-700">
                        <li className="rounded-2xl bg-white p-3 border border-gray-100">
                          <b>1) Pause.</b> Scams use urgency to stop you from thinking.
                        </li>
                        <li className="rounded-2xl bg-white p-3 border border-gray-100">
                          <b>2) Verify using official sources.</b> Bank app, official website, back of card.
                        </li>
                        <li className="rounded-2xl bg-white p-3 border border-gray-100">
                          <b>3) Never share OTP codes or passwords.</b>
                        </li>
                        <li className="rounded-2xl bg-white p-3 border border-gray-100">
                          <b>4) Never pay with gift cards/crypto for “fees”.</b>
                        </li>
                        <li className="rounded-2xl bg-white p-3 border border-gray-100">
                          <b>5) Use locks:</b> lock/freeze your card if anything feels off.
                        </li>
                      </ol>
                    </div>

                    <div className="rounded-3xl border border-emerald-200 bg-emerald-50 p-5">
                      <p className="font-extrabold text-emerald-900">Safe default response</p>
                      <p className="mt-2 text-sm text-emerald-900">
                        “Thanks. I’ll call back using the official number from my bank app.”
                      </p>
                    </div>
                  </div>
                )}

                {open === "phone" && (
                  <div className="space-y-5">
                    <div className="rounded-3xl bg-gray-50 p-5">
                      <p className="text-sm font-extrabold">Phone call scams</p>
                      <p className="mt-2 text-sm text-gray-700">
                        Scammers pretend to be IRS, immigration, police, or your bank. They use fear and urgency.
                      </p>
                    </div>

                    <div className="rounded-3xl border border-rose-200 bg-rose-50 p-5">
                      <p className="font-extrabold text-rose-800">Common script</p>
                      <p className="mt-2 text-sm text-rose-900">
                        “Your SSN is involved. Pay now to avoid trouble.”
                        They may demand gift cards, crypto, or wire transfer.
                      </p>
                    </div>

                    <div className="rounded-3xl border border-blue-200 bg-blue-50 p-5">
                      <p className="font-extrabold text-blue-900">What to do</p>
                      <ul className="mt-2 space-y-2 text-sm text-blue-900">
                        <li>• Hang up.</li>
                        <li>• Call the official number (bank app / back of card / official website).</li>
                        <li>• Do not keep talking “to be polite.”</li>
                      </ul>
                    </div>
                  </div>
                )}

                {open === "texts" && (
                  <div className="space-y-5">
                    <div className="rounded-3xl bg-gray-50 p-5">
                      <p className="text-sm font-extrabold">Text scams (smishing)</p>
                      <p className="mt-2 text-sm text-gray-700">
                        Fake delivery updates, bank alerts, “verify your account”, or “your package is stuck”.
                      </p>
                    </div>

                    <div className="rounded-3xl border border-amber-200 bg-amber-50 p-5">
                      <p className="font-extrabold text-amber-900">Golden rule</p>
                      <p className="mt-2 text-sm text-amber-900">
                        Do not tap the link. Open the official app or website yourself.
                      </p>
                    </div>

                    <div className="rounded-3xl border border-gray-100 bg-white p-5 shadow-sm">
                      <p className="font-extrabold">Safe actions</p>
                      <ul className="mt-2 space-y-2 text-sm text-gray-700">
                        <li>• Delete the message.</li>
                        <li>• If worried, open your bank app directly and check alerts.</li>
                        <li>• If it’s “delivery”, go to the shipping company site by typing it yourself.</li>
                      </ul>
                    </div>
                  </div>
                )}

                {open === "email" && (
                  <div className="space-y-5">
                    <div className="rounded-3xl bg-gray-50 p-5">
                      <p className="text-sm font-extrabold">Email scams (phishing)</p>
                      <p className="mt-2 text-sm text-gray-700">
                        Emails that look real but take you to a fake login page.
                      </p>
                    </div>

                    <div className="rounded-3xl border border-gray-100 bg-white p-5 shadow-sm">
                      <p className="font-extrabold">Quick checks</p>
                      <ul className="mt-2 space-y-2 text-sm text-gray-700">
                        <li>• Check sender address carefully (lookalikes are common).</li>
                        <li>• Don’t log in from email links.</li>
                        <li>• When in doubt, open the bank app directly.</li>
                      </ul>
                    </div>

                    <div className="rounded-3xl border border-rose-200 bg-rose-50 p-5">
                      <p className="font-extrabold text-rose-800">Never send documents by email</p>
                      <p className="mt-2 text-sm text-rose-900">
                        If someone asks for passport/SSN by email, treat it as suspicious and verify first.
                      </p>
                    </div>
                  </div>
                )}

                {open === "bank" && (
                  <div className="space-y-5">
                    <div className="rounded-3xl bg-gray-50 p-5">
                      <p className="text-sm font-extrabold">Safe banking habits</p>
                      <p className="mt-2 text-sm text-gray-700">
                        Small settings in your bank app can block most damage.
                      </p>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="rounded-3xl border border-gray-100 bg-white p-5 shadow-sm">
                        <p className="font-extrabold">🔔 Alerts</p>
                        <p className="mt-2 text-sm text-gray-600">
                          Turn on alerts for purchases, large transactions, and password changes.
                        </p>
                      </div>
                      <div className="rounded-3xl border border-gray-100 bg-white p-5 shadow-sm">
                        <p className="font-extrabold">🔒 Lock card</p>
                        <p className="mt-2 text-sm text-gray-600">
                          If anything feels off, lock/freeze the card immediately.
                        </p>
                      </div>
                      <div className="rounded-3xl border border-gray-100 bg-white p-5 shadow-sm">
                        <p className="font-extrabold">🧩 Strong passwords</p>
                        <p className="mt-2 text-sm text-gray-600">
                          Use a unique password for banking. Don’t reuse.
                        </p>
                      </div>
                      <div className="rounded-3xl border border-gray-100 bg-white p-5 shadow-sm">
                        <p className="font-extrabold">✅ 2FA</p>
                        <p className="mt-2 text-sm text-gray-600">
                          Enable two-factor authentication if available.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {open === "card" && (
                  <div className="space-y-5">
                    <div className="rounded-3xl bg-gray-50 p-5">
                      <p className="text-sm font-extrabold">Card safety basics</p>
                      <p className="mt-2 text-sm text-gray-700">
                        Most fraud happens when someone gets your card details or tricks you into sharing a code.
                      </p>
                    </div>

                    <div className="rounded-3xl border border-gray-100 bg-white p-5 shadow-sm">
                      <p className="font-extrabold">Do</p>
                      <ul className="mt-2 space-y-2 text-sm text-gray-700">
                        <li>• Use tap-to-pay when possible.</li>
                        <li>• Keep card with you (don’t hand it away for long).</li>
                        <li>• Review transactions weekly in the app.</li>
                      </ul>
                    </div>

                    <div className="rounded-3xl border border-rose-200 bg-rose-50 p-5">
                      <p className="font-extrabold text-rose-800">Don’t</p>
                      <ul className="mt-2 space-y-2 text-sm text-rose-900">
                        <li>• Don’t share photos of your card.</li>
                        <li>• Don’t type card info into random websites.</li>
                        <li>• Don’t share OTP codes.</li>
                      </ul>
                    </div>
                  </div>
                )}

                {open === "identity" && (
                  <div className="space-y-5">
                    <div className="rounded-3xl bg-gray-50 p-5">
                      <p className="text-sm font-extrabold">Protect your identity</p>
                      <p className="mt-2 text-sm text-gray-700">
                        Your identity info is valuable. Keep documents and accounts secure.
                      </p>
                    </div>

                    <div className="rounded-3xl border border-gray-100 bg-white p-5 shadow-sm">
                      <p className="font-extrabold">Good habits</p>
                      <ul className="mt-2 space-y-2 text-sm text-gray-700">
                        <li>• Don’t carry your passport/SSN card daily unless needed.</li>
                        <li>• Use secure storage for documents.</li>
                        <li>• Be careful with “job offers” asking for SSN early.</li>
                      </ul>
                    </div>

                    <div className="rounded-3xl border border-blue-200 bg-blue-50 p-5">
                      <p className="font-extrabold text-blue-900">When to share sensitive info</p>
                      <p className="mt-2 text-sm text-blue-900">
                        Only share through official, verified channels (bank portal, official employer onboarding).
                        Never through random links or DMs.
                      </p>
                    </div>
                  </div>
                )}

                {open === "whatToDo" && (
                  <div className="space-y-5">
                    <div className="rounded-3xl bg-gray-50 p-5">
                      <p className="text-sm font-extrabold">If you think you got scammed</p>
                      <p className="mt-2 text-sm text-gray-700">
                        Fast steps can limit damage. Do these in order.
                      </p>
                    </div>

                    <ol className="space-y-2 text-sm text-gray-700">
                      <li className="rounded-2xl border border-gray-100 bg-white p-4">
                        <b>1)</b> Lock/freeze the card in your bank app.
                      </li>
                      <li className="rounded-2xl border border-gray-100 bg-white p-4">
                        <b>2)</b> Change bank password + email password.
                      </li>
                      <li className="rounded-2xl border border-gray-100 bg-white p-4">
                        <b>3)</b> Call your bank using the number on the back of the card/app.
                      </li>
                      <li className="rounded-2xl border border-gray-100 bg-white p-4">
                        <b>4)</b> Dispute unauthorized transactions in the app/bank.
                      </li>
                      <li className="rounded-2xl border border-gray-100 bg-white p-4">
                        <b>5)</b> Watch accounts daily for a while.
                      </li>
                    </ol>

                    <div className="rounded-3xl border border-emerald-200 bg-emerald-50 p-5">
                      <p className="font-extrabold text-emerald-900">Remember</p>
                      <p className="mt-2 text-sm text-emerald-900">
                        Being scammed is not a “stupid person” problem. It’s a scammer problem.
                        The best thing is to act fast and protect accounts.
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
                    href="/credit-card/apply/"
                    className="rounded-2xl border border-gray-300 bg-white px-4 py-2 text-sm font-extrabold text-gray-900 shadow-sm transition hover:bg-gray-50"
                  >
                    Apply guide
                  </Link>
                </div>

                <a
                  href="#steps"
                  className="rounded-2xl bg-gray-900 px-5 py-2.5 text-sm font-extrabold text-white shadow-sm transition hover:bg-gray-800"
                >
                  Back to topics ↑
                </a>
              </div>
            </div>

            {/* FAQ */}
            <div className="mt-6 rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-extrabold">Quick FAQ</h3>
              <div className="mt-4 grid gap-4 md:grid-cols-2">
                <div className="rounded-2xl bg-gray-50 p-4">
                  <p className="text-sm font-extrabold">What’s the safest default?</p>
                  <p className="mt-1 text-sm text-gray-700">
                    Don’t click links. Use official apps/sites. Never share OTP or passwords.
                  </p>
                </div>
                <div className="rounded-2xl bg-gray-50 p-4">
                  <p className="text-sm font-extrabold">What if the caller ID looks real?</p>
                  <p className="mt-1 text-sm text-gray-700">
                    Caller ID can be faked. Hang up and call back via official numbers.
                  </p>
                </div>
                <div className="rounded-2xl bg-gray-50 p-4">
                  <p className="text-sm font-extrabold">Is it safe to use public Wi-Fi?</p>
                  <p className="mt-1 text-sm text-gray-700">
                    Avoid banking on public Wi-Fi when possible. Use cellular or a trusted network.
                  </p>
                </div>
                <div className="rounded-2xl bg-gray-50 p-4">
                  <p className="text-sm font-extrabold">Should I save my card on websites?</p>
                  <p className="mt-1 text-sm text-gray-700">
                    Only on trusted sites you use often. If unsure, don’t save it.
                  </p>
                </div>
              </div>
            </div>

            {/* Safety note */}
            <div className="mt-6 rounded-3xl border border-gray-100 bg-gray-50 p-6 text-sm text-gray-700">
              <b>Safety reminder:</b> No real bank/IRS asks for gift cards, crypto, or urgent payments by phone.
              If someone sounds scary and rushed, pause and verify.
            </div>
          </main>
        </div>
      </section>
    </div>
  );
}