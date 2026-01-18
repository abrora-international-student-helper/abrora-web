"use client";

import React from "react";
import Link from "next/link";

const HeroSection = () => {
  return (
    <section className="relative h-full flex items-center pt-8 md:pt-12">
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 px-4 pb-8 md:grid-cols-2">
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
            ABRORA keeps your visa deadlines, essential documents, and
            arrival checklist in one clean place— so you can focus on
            classes, friends, and your life in the U.S.
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
        </div>

        {/* Hero card */}
        <div className="relative">
          <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-primary/20 to-secondary/20 blur" />
          <div className="relative rounded-3xl bg-white/80 p-6 shadow-sm ring-1 ring-gray-200 backdrop-blur">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-sm font-semibold text-gray-900">Today</p>
                <p className="text-xs text-gray-600">
                  Your next actions, auto-sorted
                </p>
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
                  <p className="text-sm font-semibold">
                    Visa / I-20 deadline
                  </p>
                  <p className="text-xs text-gray-600">
                    Reminder 14 days before
                  </p>
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
                  <p className="text-xs text-gray-600">
                    Passport • I-20 • I-94 stored
                  </p>
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
                  <p className="text-sm font-semibold">
                    Onboarding checklist
                  </p>
                  <p className="text-xs text-gray-600">
                    Bank • SIM • Campus ID • Health
                  </p>
                </div>
                <span className="rounded-full bg-secondary-lighter px-2.5 py-1 text-xs font-semibold text-secondary-dark ring-1 ring-secondary-light">
                  In progress
                </span>
              </div>
            </div>

            <div className="mt-6 rounded-2xl bg-gradient-to-r from-primary to-secondary p-4 text-white">
              <p className="text-sm font-semibold">Pro tip</p>
              <p className="text-xs opacity-90">
                Upload documents once—ABRORA keeps them ready for travel,
                jobs, and school forms.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
