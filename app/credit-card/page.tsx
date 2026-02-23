"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";

type BandKey = "poor" | "fair" | "good" | "verygood" | "excellent";

const BANDS: {
  key: BandKey;
  label: string;
  range: string;
  tip: string;
  start: number; // inclusive
  end: number; // inclusive
  // tailwind classes
  bg: string;
  border: string;
  text: string;
}[] = [
  {
    key: "poor",
    label: "Poor",
    range: "300–579",
    tip: "Start with 1 card, autopay minimum, and never miss payments.",
    start: 300,
    end: 579,
    bg: "bg-rose-50",
    border: "border-rose-200",
    text: "text-rose-800",
  },
  {
    key: "fair",
    label: "Needs Work",
    range: "580–669",
    tip: "Pay on time every month and keep utilization under 30%.",
    start: 580,
    end: 669,
    bg: "bg-amber-50",
    border: "border-amber-200",
    text: "text-amber-900",
  },
  {
    key: "good",
    label: "Good",
    range: "670–739",
    tip: "Good range. Stay consistent and avoid high balances.",
    start: 670,
    end: 739,
    bg: "bg-sky-50",
    border: "border-sky-200",
    text: "text-sky-900",
  },
  {
    key: "verygood",
    label: "Very Good",
    range: "740–799",
    tip: "Strong range. Keep credit age growing and pay in full.",
    start: 740,
    end: 799,
    bg: "bg-emerald-50",
    border: "border-emerald-200",
    text: "text-emerald-900",
  },
  {
    key: "excellent",
    label: "Excellent",
    range: "800–850",
    tip: "Top range. Maintain habits: on-time + low utilization.",
    start: 800,
    end: 850,
    bg: "bg-emerald-50",
    border: "border-emerald-200",
    text: "text-emerald-900",
  },
];

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

function bandForScore(score: number) {
  const s = clamp(score, 300, 850);
  return (
    BANDS.find((b) => s >= b.start && s <= b.end) ??
    BANDS[BANDS.length - 1]
  );
}

function pctFromScore(score: number) {
  const s = clamp(score, 300, 850);
  return ((s - 300) / 550) * 100;
}

export default function CreditPage() {
  const [score, setScore] = useState(680);

  const currentBand = useMemo(() => bandForScore(score), [score]);
  const percent = useMemo(() => pctFromScore(score), [score]);

  // For the hover legend (independent from slider)
  const [hoverBand, setHoverBand] = useState<BandKey | null>(null);
  const bandShown = useMemo(() => {
    if (!hoverBand) return currentBand;
    return BANDS.find((b) => b.key === hoverBand) ?? currentBand;
  }, [hoverBand, currentBand]);

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* HERO */}
      <section className="pt-16 pb-10 text-center">
        <h1 className="text-4xl font-extrabold md:text-6xl">
          Credit Cards — <span className="text-blue-600">Made Simple</span>
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">
          A simple guide for international students in the U.S.
        </p>
      </section>

      {/* METER */}
      <section className="mx-auto max-w-4xl px-4 pb-10">
        <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm md:p-8">
          <p className="text-xs font-extrabold text-gray-500">CREDIT SCORE METER</p>
          <h2 className="mt-1 text-2xl font-extrabold">Where are you?</h2>

          {/* Color bands (hover here) */}
          <div className="mt-6">
            <div className="flex h-5 overflow-hidden rounded-full">
              {/* Poor */}
              <div
                className="group relative flex-1 bg-rose-500/70"
                onMouseEnter={() => setHoverBand("poor")}
                onMouseLeave={() => setHoverBand(null)}
              />
              {/* Needs work */}
              <div
                className="group relative flex-1 bg-amber-500/70"
                onMouseEnter={() => setHoverBand("fair")}
                onMouseLeave={() => setHoverBand(null)}
              />
              {/* Good */}
              <div
                className="group relative flex-1 bg-sky-500/70"
                onMouseEnter={() => setHoverBand("good")}
                onMouseLeave={() => setHoverBand(null)}
              />
              {/* Very good */}
              <div
                className="group relative flex-1 bg-emerald-500/70"
                onMouseEnter={() => setHoverBand("verygood")}
                onMouseLeave={() => setHoverBand(null)}
              />
              {/* Excellent */}
              <div
                className="group relative flex-1 bg-emerald-700/70"
                onMouseEnter={() => setHoverBand("excellent")}
                onMouseLeave={() => setHoverBand(null)}
              />
            </div>

            {/* little tick labels */}
            <div className="mt-3 flex items-center justify-between text-xs font-bold text-gray-500">
              <span>300</span>
              <span>580</span>
              <span>670</span>
              <span>740</span>
              <span>800</span>
              <span>850</span>
            </div>
          </div>

          {/* Slider + blue progress like your screenshot */}
          <div className="mt-6">
            <div className="h-3 w-full overflow-hidden rounded-full bg-gray-100">
              <div
                className="h-full rounded-full bg-blue-600 transition-all"
                style={{ width: `${percent}%` }}
              />
            </div>

            <div className="mt-4 flex items-center justify-between">
              <span className="text-sm font-extrabold text-gray-500">300</span>

              {/* Badge + hover tooltip */}
              <div className="group relative">
                <span
                  className={`inline-flex items-center rounded-full border px-4 py-1.5 text-sm font-extrabold ${bandShown.bg} ${bandShown.border} ${bandShown.text}`}
                >
                  {bandShown.label}
                </span>

                <div className="pointer-events-none absolute left-1/2 top-full z-10 mt-2 w-[280px] -translate-x-1/2 rounded-2xl border border-gray-200 bg-white p-3 text-xs text-gray-700 opacity-0 shadow-lg transition-opacity group-hover:opacity-100">
                  <p className="font-extrabold">
                    {bandShown.label} <span className="text-gray-400">({bandShown.range})</span>
                  </p>
                  <p className="mt-1">{bandShown.tip}</p>
                </div>
              </div>

              <span className="text-sm font-extrabold text-gray-500">850</span>
            </div>

            <div className="mt-4">
              <input
                type="range"
                min={300}
                max={850}
                value={score}
                onChange={(e) => setScore(Number(e.target.value))}
                className="w-full accent-blue-600"
              />
            </div>

            <p className="mt-3 text-sm text-gray-600">
              Hover the colored bar to see <b>Poor / Needs Work / Good / Very Good / Excellent</b>.
              Slide to test different scores.
            </p>

            <div className="mt-4 rounded-2xl bg-gray-50 p-4 text-sm text-gray-700">
              Your demo score: <b>{score}</b> → <b>{currentBand.label}</b>.{" "}
              <span className="text-gray-500">(Real scores come from credit bureaus.)</span>
            </div>
          </div>
        </div>
      </section>

      {/* 3 SIMPLE GUIDES */}
      <section className="mx-auto max-w-6xl px-4 pb-16">
        <div className="rounded-[40px] border border-gray-100 bg-gray-50 p-10 shadow-sm">
          <h2 className="mb-8 flex items-center gap-2 text-2xl font-bold">
            ⚡ Step-by-Step Guides
          </h2>

          <div className="grid gap-6 md:grid-cols-3">
            <Link
              href="/credit-card/apply/"
              className="rounded-3xl bg-sky-50 p-8 text-center transition hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-white shadow">
                🪪
              </div>
              <h3 className="text-xl font-bold">Apply</h3>
              <p className="mt-2 text-sm text-gray-600">
                Safest way to get your first card.
              </p>
            </Link>

            <Link
              href="/credit-card/manage"
              className="rounded-3xl bg-amber-50 p-8 text-center transition hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-white shadow">
                📅
              </div>
              <h3 className="text-xl font-bold">Manage</h3>
              <p className="mt-2 text-sm text-gray-600">
                Dates, utilization, autopay — simple.
              </p>
            </Link>

            <Link
              href="/credit-card/security"
              className="rounded-3xl bg-emerald-50 p-8 text-center transition hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-white shadow">
                🛡️
              </div>
              <h3 className="text-xl font-bold">Security</h3>
              <p className="mt-2 text-sm text-gray-600">
                Avoid scams and protect your money.
              </p>
            </Link>
          </div>
        </div>
      </section>

      {/* BANKS + CREDIT BUREAUS + POPULAR CARD TYPES */}
      <section className="mx-auto max-w-6xl px-4 pb-20">
        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
            <h3 className="text-lg font-extrabold">Popular banks</h3>
            <p className="mt-2 text-sm text-gray-600">
              Common choices for students (good apps + many locations).
            </p>
            <ul className="mt-4 space-y-2 text-sm text-gray-700">
              <li className="rounded-2xl bg-gray-50 p-3"><b>Chase</b></li>
              <li className="rounded-2xl bg-gray-50 p-3"><b>Bank of America</b></li>
              <li className="rounded-2xl bg-gray-50 p-3"><b>Capital One</b></li>
              <li className="rounded-2xl bg-gray-50 p-3"><b>Discover</b></li>
              <li className="rounded-2xl bg-gray-50 p-3"><b>Citi</b></li>
            </ul>
          </div>

          <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
            <h3 className="text-lg font-extrabold">Credit bureaus</h3>
            <p className="mt-2 text-sm text-gray-600">
              These companies hold your credit report in the U.S.
            </p>
            <ul className="mt-4 space-y-2 text-sm text-gray-700">
              <li className="rounded-2xl bg-gray-50 p-3"><b>Equifax</b></li>
              <li className="rounded-2xl bg-gray-50 p-3"><b>Experian</b></li>
              <li className="rounded-2xl bg-gray-50 p-3"><b>TransUnion</b></li>
            </ul>
            <p className="mt-4 text-xs text-gray-500">
              Your score can differ across bureaus — that’s normal.
            </p>
          </div>

          <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
            <h3 className="text-lg font-extrabold">Starter card types</h3>
            <p className="mt-2 text-sm text-gray-600">
              Keep it safe first. Rewards later.
            </p>
            <div className="mt-4 space-y-3 text-sm text-gray-700">
              <div className="rounded-2xl bg-gray-50 p-4">
                <p className="font-extrabold">Student card</p>
                <p className="mt-1 text-gray-600">Good first option if you qualify.</p>
              </div>
              <div className="rounded-2xl bg-gray-50 p-4">
                <p className="font-extrabold">Secured card</p>
                <p className="mt-1 text-gray-600">Deposit → limit. Best “yes” path for beginners.</p>
              </div>
              <div className="rounded-2xl bg-emerald-50 p-4">
                <p className="font-extrabold text-emerald-900">Golden rule</p>
                <p className="mt-1 text-emerald-900">
                  Pay on time + pay statement balance in full.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 rounded-3xl border border-gray-100 bg-gray-50 p-6 text-sm text-gray-700">
          <b>Quick safety tip:</b> No real bank/IRS asks for gift cards, crypto, or “urgent payments” by phone.
          If it sounds scary and rushed — pause and verify using official numbers.
        </div>
      </section>
    </div>
  );
}