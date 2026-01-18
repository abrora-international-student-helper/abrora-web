import Link from "next/link";

export default function CarPage() {
  const sections = [
    { id: "before", label: "Before you buy" },
    { id: "license", label: "Driver’s license" },
    { id: "budget", label: "Budget & real costs" },
    { id: "used", label: "Buying a used car" },
    { id: "inspection", label: "CarFax & inspection" },
    { id: "insurance", label: "Insurance basics" },
    { id: "registration", label: "Registration & plates" },
    { id: "maintenance", label: "Maintenance basics" },
    { id: "faq", label: "FAQs & mistakes" },
  ];

  const checklist = [
    "Decide if you truly need a car now",
    "Plan your budget (car + insurance + repairs)",
    "Start learner permit process",
    "Practice driving & schedule road test",
    "Check insurance quotes BEFORE buying",
    "Search cars (reliable models first)",
    "Verify title + VIN",
    "Run CarFax / history report",
    "Get a pre-purchase inspection (mechanic)",
    "Negotiate price & complete bill of sale",
    "Buy insurance",
    "Register at DMV & get plates",
    "Set a simple maintenance plan",
  ];

  return (
    <div className="min-h-screen bg-white text-gray-900 dark:bg-gray-950 dark:text-white">
      {/* subtle background */}
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[420px] bg-gradient-to-b from-blue-50 to-white dark:from-blue-950/40 dark:to-gray-950" />

      {/* Top header */}
      <header className="border-b border-gray-200/60 bg-white/70 backdrop-blur dark:border-white/10 dark:bg-gray-950/60">
        <div className="mx-auto max-w-6xl px-4 py-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Abrora • Guides
              </p>
              <h1 className="mt-1 text-3xl font-bold tracking-tight sm:text-4xl">
                Getting a Car
              </h1>
              <p className="mt-2 max-w-2xl text-gray-600 dark:text-gray-300">
                A calm, step-by-step guide for international students—license →
                buying → insurance → registration.
              </p>
            </div>

            <div className="flex flex-col gap-2 sm:flex-row">
              <a
                href="#checklist"
                className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700"
              >
                Start checklist
              </a>
              <Link
                href="/dashboard"
                className="inline-flex items-center justify-center rounded-xl border border-gray-300 bg-white px-5 py-3 text-sm font-semibold text-gray-900 hover:bg-gray-50 dark:border-white/15 dark:bg-white/5 dark:text-white dark:hover:bg-white/10"
              >
                Back to dashboard
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* 3-column layout */}
      <main className="mx-auto max-w-6xl px-4 py-10">
        <div className="grid gap-8 lg:grid-cols-12">
          {/* Left: Topics */}
          <aside className="lg:col-span-3">
            <div className="sticky top-24 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm dark:border-white/10 dark:bg-white/5">
              <p className="text-sm font-semibold text-gray-900 dark:text-white">
                Topics
              </p>
              <nav className="mt-3 space-y-1 text-sm">
                {sections.map((s) => (
                  <a
                    key={s.id}
                    href={`#${s.id}`}
                    className="block rounded-xl px-3 py-2 text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-white/10"
                  >
                    {s.label}
                  </a>
                ))}
              </nav>

              <div className="mt-4 rounded-xl bg-gray-50 p-3 text-xs text-gray-600 dark:bg-white/5 dark:text-gray-300">
                Tip: Read “Insurance basics” before buying—insurance can cost
                more than the car.
              </div>
            </div>
          </aside>

          {/* Middle: Content */}
          <section className="lg:col-span-6">
            <div className="space-y-6">
              <InfoCard
                id="before"
                title="Before you buy"
                subtitle="Make sure a car is the right move right now."
              >
                <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-gray-700 dark:text-gray-200">
                  <li>
                    If you live on campus and work on campus, you may not need a
                    car immediately.
                  </li>
                  <li>
                    A car is worth it if you commute for work, internships, or
                    live off-campus.
                  </li>
                  <li>
                    Always plan for repairs—used cars need maintenance.
                  </li>
                </ul>

                <Callout>
                  <strong>Quick rule:</strong> If you can’t comfortably pay for
                  insurance + gas + repairs monthly, wait.
                </Callout>
              </InfoCard>

              <InfoCard
                id="license"
                title="Driver’s license (U.S.)"
                subtitle="Your first step: permit → practice → road test."
              >
                <ol className="mt-3 space-y-2 text-sm text-gray-700 dark:text-gray-200">
                  <li>
                    <span className="font-semibold">1)</span> Study for permit
                    test (DMV handbook + practice tests).
                  </li>
                  <li>
                    <span className="font-semibold">2)</span> Take permit test +
                    vision test at DMV.
                  </li>
                  <li>
                    <span className="font-semibold">3)</span> Practice driving
                    with a licensed driver.
                  </li>
                  <li>
                    <span className="font-semibold">4)</span> Schedule road test
                    and prepare a car for the test.
                  </li>
                </ol>

                <Callout tone="warn">
                  Don’t buy a car just for the road test. Borrow a friend’s car
                  if possible.
                </Callout>
              </InfoCard>

              <InfoCard
                id="budget"
                title="Budget & real costs"
                subtitle="Most students underestimate monthly costs."
              >
                <div className="mt-3 grid gap-3 sm:grid-cols-2">
                  <MiniStat label="Insurance" value="$150–$400/mo" />
                  <MiniStat label="Gas" value="$80–$250/mo" />
                  <MiniStat label="Maintenance" value="$30–$120/mo" />
                  <MiniStat label="Unexpected repairs" value="$300+ sometimes" />
                </div>

                <Callout>
                  Build an emergency buffer. Even reliable cars can surprise
                  you.
                </Callout>
              </InfoCard>

              <InfoCard
                id="used"
                title="Buying a used car"
                subtitle="Simple strategy: reliability first."
              >
                <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-gray-700 dark:text-gray-200">
                  <li>Shortlist reliable brands/models (avoid impulse buys).</li>
                  <li>Ask for VIN, title status, maintenance history.</li>
                  <li>Test drive: brakes, steering, acceleration, noises.</li>
                  <li>Negotiate respectfully and walk away if it feels shady.</li>
                </ul>

                <Callout tone="warn">
                  If the seller can’t show a clean title or avoids questions,
                  skip.
                </Callout>
              </InfoCard>

              <InfoCard
                id="inspection"
                title="CarFax & inspection"
                subtitle="This is how you avoid expensive mistakes."
              >
                <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-gray-700 dark:text-gray-200">
                  <li>Run a history report (accidents, salvage, mileage).</li>
                  <li>
                    Get a pre-purchase inspection (mechanic checks engine,
                    transmission, suspension).
                  </li>
                  <li>Confirm VIN matches the title and dashboard VIN plate.</li>
                </ul>

                <Callout>
                  A $100–$200 inspection can save you thousands.
                </Callout>
              </InfoCard>

              <InfoCard
                id="insurance"
                title="Insurance basics"
                subtitle="Insurance can be the biggest monthly cost."
              >
                <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-gray-700 dark:text-gray-200">
                  <li>Get quotes before you buy the car (VIN helps).</li>
                  <li>
                    Liability vs full coverage: full coverage costs more but
                    protects the car.
                  </li>
                  <li>
                    Factors: age, driving history, location, car model, credit
                    score.
                  </li>
                </ul>

                <Callout tone="warn">
                  Some cars are cheap to buy but expensive to insure.
                </Callout>
              </InfoCard>

              <InfoCard
                id="registration"
                title="Registration & plates"
                subtitle="After buying: insure → DMV registration."
              >
                <ol className="mt-3 space-y-2 text-sm text-gray-700 dark:text-gray-200">
                  <li>
                    <span className="font-semibold">1)</span> Buy insurance (you
                    need proof).
                  </li>
                  <li>
                    <span className="font-semibold">2)</span> Prepare DMV docs:
                    title, bill of sale, ID, proof of address.
                  </li>
                  <li>
                    <span className="font-semibold">3)</span> Register at DMV,
                    pay taxes/fees, get plates.
                  </li>
                </ol>

                <Callout>
                  Keep copies of everything in your Abrora Document Vault.
                </Callout>
              </InfoCard>

              <InfoCard
                id="maintenance"
                title="Maintenance basics"
                subtitle="A simple routine keeps costs low."
              >
                <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-gray-700 dark:text-gray-200">
                  <li>Oil change every 3k–7k miles (depends on car/oil).</li>
                  <li>Check tire pressure monthly.</li>
                  <li>Brake pads and tires wear out—plan ahead.</li>
                  <li>Don’t ignore warning lights.</li>
                </ul>
              </InfoCard>

              <InfoCard
                id="faq"
                title="FAQs & common mistakes"
                subtitle="Quick answers to avoid confusion."
              >
                <Accordion
                  items={[
                    {
                      q: "Do I need an SSN to buy a car?",
                      a: "Usually not, but financing may require SSN/credit. You can often buy a used car with cash without SSN.",
                    },
                    {
                      q: "Can I drive with an International Driving Permit (IDP)?",
                      a: "It depends on the state and situation. IDP is often temporary. Plan to get a U.S. license if you’ll drive regularly.",
                    },
                    {
                      q: "What’s the #1 mistake students make?",
                      a: "Buying a car without checking insurance cost and without a pre-purchase inspection.",
                    },
                  ]}
                />
              </InfoCard>
            </div>
          </section>

          {/* Right: Checklist */}
          <aside className="lg:col-span-3">
            <div
              id="checklist"
              className="sticky top-24 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-white/5"
            >
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold">Quick checklist</p>
                <span className="rounded-full bg-blue-50 px-2 py-1 text-xs font-semibold text-blue-700 dark:bg-blue-500/10 dark:text-blue-300">
                  Start here
                </span>
              </div>
              <p className="mt-2 text-xs text-gray-600 dark:text-gray-300">
                (UI only) Later you can connect this to your database.
              </p>

              <div className="mt-4 space-y-3">
                {checklist.map((item, idx) => (
                  <label
                    key={idx}
                    className="flex cursor-pointer items-start gap-3 rounded-xl border border-gray-200 p-3 hover:bg-gray-50 dark:border-white/10 dark:hover:bg-white/10"
                  >
                    <input
                      type="checkbox"
                      className="mt-1 h-4 w-4 rounded border-gray-300 text-blue-600"
                    />
                    <span className="text-sm text-gray-700 dark:text-gray-200">
                      {item}
                    </span>
                  </label>
                ))}
              </div>

              <div className="mt-5 rounded-xl bg-gray-50 p-3 text-xs text-gray-600 dark:bg-white/5 dark:text-gray-300">
                Pro tip: Save your title, insurance card, inspection report, and
                DMV receipts in Document Vault.
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}

function InfoCard({ id, title, subtitle, children }) {
  return (
    <div
      id={id}
      className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-white/5"
    >
      <h2 className="text-xl font-bold tracking-tight">{title}</h2>
      <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">{subtitle}</p>
      <div className="mt-4">{children}</div>
    </div>
  );
}

function Callout({ children, tone = "info" }) {
  const styles =
    tone === "warn"
      ? "border-amber-200 bg-amber-50 text-amber-900 dark:border-amber-500/20 dark:bg-amber-500/10 dark:text-amber-200"
      : "border-gray-200 bg-gray-50 text-gray-800 dark:border-white/10 dark:bg-white/5 dark:text-gray-200";

  return (
    <div className={`mt-4 rounded-xl border p-3 text-sm ${styles}`}>
      {children}
    </div>
  );
}

function MiniStat({ label, value }) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4 dark:border-white/10 dark:bg-white/5">
      <p className="text-xs font-semibold text-gray-600 dark:text-gray-300">
        {label}
      </p>
      <p className="mt-1 text-sm font-bold">{value}</p>
    </div>
  );
}

function Accordion({ items }) {
  return (
    <div className="mt-3 space-y-3">
      {items.map((it, i) => (
        <details
          key={i}
          className="group rounded-xl border border-gray-200 bg-white p-4 dark:border-white/10 dark:bg-white/5"
        >
          <summary className="cursor-pointer list-none text-sm font-semibold text-gray-900 dark:text-white">
            <div className="flex items-center justify-between">
              <span>{it.q}</span>
              <span className="ml-3 text-gray-400 group-open:rotate-180 transition">
                ▼
              </span>
            </div>
          </summary>
          <p className="mt-3 text-sm text-gray-600 dark:text-gray-300">{it.a}</p>
        </details>
      ))}
    </div>
  );
}
