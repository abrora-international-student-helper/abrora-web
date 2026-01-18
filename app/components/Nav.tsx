"use client"

import React, { useState } from 'react';
import Link from 'next/link';
import {
  FileText, Shield, Landmark, GraduationCap,
  Briefcase, HeartPulse, Plane, CreditCard,
  Car, Brain, AlertTriangle, Trophy,
  Globe, CheckCircle, ArrowRight, Folder,
  Stethoscope, Syringe, ShoppingBag, Newspaper,
  Flag, Bell
} from 'lucide-react';

const Navbar = () => {
  const [vaultOpen, setVaultOpen] = useState(false);
  const [infoOpen, setInfoOpen] = useState(false);
  const [checklistOpen, setChecklistOpen] = useState(false);
  const [newsOpen, setNewsOpen] = useState(false);

  return (
    <header className="relative z-50">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-5">
        {/* Logo */}
        <Link href="/" className="group inline-flex items-center gap-2">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-primary to-secondary text-white shadow-lg shadow-primary/25">
            A
          </span>
          <span className="text-lg font-bold tracking-tight">
            ABRORA
            <span className="ml-2 rounded-full bg-primary-lighter px-2 py-0.5 text-xs font-semibold text-primary-dark ring-1 ring-primary-light">
              Beta
            </span>
          </span>
        </Link>

        {/* Navigation */}
        <nav className="hidden items-center gap-8 md:flex">
          {/* VAULT DROPDOWN */}
          <div
            className="relative"
            onMouseEnter={() => setVaultOpen(true)}
            onMouseLeave={() => setVaultOpen(false)}
          >
            <button className={`text-sm font-semibold py-2 focus:outline-none transition-colors ${vaultOpen ? 'text-primary' : 'text-gray-700 hover:text-gray-900'}`}>
              Vault
            </button>

            {vaultOpen && (
              <div className="absolute left-1/2 top-full w-[720px] -translate-x-1/2 pt-3">
                <div className="overflow-hidden rounded-2xl bg-white shadow-2xl ring-1 ring-black/5">
                  <div className="flex">
                    <div className="flex-1 p-8">
                      <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">Document Vault</p>
                      <div className="mt-6 grid grid-cols-2 gap-x-10 gap-y-6">
                        <DropdownItem icon={<Plane className="h-5 w-5" />} title="Passport & Visa" desc="Citizenship, visa stamps, I-94" color="blue" />
                        <DropdownItem icon={<FileText className="h-5 w-5" />} title="I-20 & SEVIS" desc="Signed I-20, SEVIS payment" color="orange" />
                        <DropdownItem icon={<GraduationCap className="h-5 w-5" />} title="Acceptance Letters" desc="College admission documents" color="purple" />
                        <DropdownItem icon={<Landmark className="h-5 w-5" />} title="Financial Docs" desc="Bank statements, drafts, receipts" color="green" />
                        <DropdownItem icon={<Stethoscope className="h-5 w-5" />} title="Medical Records" desc="Vaccinations, TB test, reports" color="rose" />
                        <DropdownItem icon={<Shield className="h-5 w-5" />} title="DS-160 & Forms" desc="Visa application confirmations" color="indigo" />
                      </div>
                    </div>
                    <FeaturedCard icon={<Folder className="h-6 w-6" />} tag="Security" title="Keep your docs" highlight="travel-ready" desc="Quick access to all your documents." color="primary" />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* INFORMATION FOR DROPDOWN */}
          <div
            className="relative"
            onMouseEnter={() => setInfoOpen(true)}
            onMouseLeave={() => setInfoOpen(false)}
          >
            <button className={`text-sm font-semibold py-2 focus:outline-none transition-colors ${infoOpen ? 'text-primary' : 'text-gray-700 hover:text-gray-900'}`}>
              Information For
            </button>

            {infoOpen && (
              <div className="absolute left-1/2 top-full w-[940px] -translate-x-1/2 pt-3">
                <div className="overflow-hidden rounded-2xl bg-white shadow-2xl ring-1 ring-black/5">
                  <div className="flex">
                    <div className="flex-1 p-8">
                      <div className="grid grid-cols-3 gap-x-12">
                        <div>
                          <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">Rookie</p>
                          <div className="mt-5 space-y-5">
                            <DropdownItem icon={<GraduationCap className="h-5 w-5" />} title="College Application" desc="Research, apply, get accepted" color="blue" />
                            <DropdownItem icon={<Shield className="h-5 w-5" />} title="Visa Process" desc="DS-160, SEVIS, interview" color="orange" />
                            <DropdownItem icon={<Syringe className="h-5 w-5" />} title="Medical & Vaccines" desc="MMR, TB test, records" color="rose" />
                            <DropdownItem icon={<ShoppingBag className="h-5 w-5" />} title="Shopping & Flights" desc="What to pack, cheap flights" color="purple" />
                          </div>
                        </div>
                        <div>
                          <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">Life in USA</p>
                          <div className="mt-5 space-y-5">
                            <DropdownItem icon={<Briefcase className="h-5 w-5" />} title="Work Rules" desc="20 hrs, SSN, CPT/OPT" color="orange" />
                            <DropdownItem icon={<CreditCard className="h-5 w-5" />} title="Banking & Credit" desc="Accounts, credit building" color="green" href='credit-card'/>
                            <DropdownItem icon={<HeartPulse className="h-5 w-5" />} title="Healthcare" desc="Insurance, clinics" color="rose" />
                            <DropdownItem icon={<Car className="h-5 w-5" />} title="Getting a Car" desc="License, insurance, tips" color="blue"  href='/car'/>
                          </div>
                        </div>
                        <div>
                          <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">Safety & Career</p>
                          <div className="mt-5 space-y-5">
                            <DropdownItem icon={<Brain className="h-5 w-5" />} title="Mental Health" desc="Isolation & stress help" color="purple" />
                            <DropdownItem icon={<AlertTriangle className="h-5 w-5" />} title="Scam Alerts" desc="Common student scams" color="orange" />
                            <DropdownItem icon={<Briefcase className="h-5 w-5" />} title="Career & Jobs" desc="Resume, H1B path" color="indigo" />
                          </div>
                        </div>
                      </div>
                    </div>
                    <FeaturedCard icon={<GraduationCap className="h-6 w-6" />} tag="New" title="The complete" highlight="2025 Guide" desc="Your US journey guide." color="secondary" />
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
            <button className={`text-sm font-semibold py-2 focus:outline-none transition-colors ${checklistOpen ? 'text-primary' : 'text-gray-700 hover:text-gray-900'}`}>
              Checklist
            </button>

            {checklistOpen && (
              /* Width increased to 680px to accommodate 'Going Back & Return' text */
              <div className="absolute left-1/2 top-full w-[680px] -translate-x-1/2 pt-3">
                <div className="overflow-hidden rounded-2xl bg-white shadow-2xl ring-1 ring-black/5">
                  <div className="flex">
                    <div className="flex-1 p-8">
                      <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">Step-by-Step Guides</p>
                      <div className="mt-6 grid grid-cols-2 gap-x-12 gap-y-6">
                        <DropdownItem icon={<Plane className="h-5 w-5" />} title="First Time to USA" desc="Pre-arrival to first month" color="blue" />
                        <DropdownItem icon={<Globe className="h-5 w-5" />} title="Going Back & Return" desc="Travel signatures, re-entry" color="orange" />
                        <DropdownItem icon={<Globe className="h-5 w-5" />} title="USA to Overseas" desc="International travel tips" color="purple" />
                        <DropdownItem icon={<CheckCircle className="h-5 w-5" />} title="Graduation & OPT" desc="EAD card, job search" color="green" />
                      </div>
                    </div>
                    <FeaturedCard icon={<CheckCircle className="h-6 w-6" />} tag="Track" title="Track your" highlight="progress" desc="Save completion." color="orange" small />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* NEWS & UPDATES DROPDOWN */}
          <div
            className="relative"
            onMouseEnter={() => setNewsOpen(true)}
            onMouseLeave={() => setNewsOpen(false)}
          >
            <button className={`text-sm font-semibold py-2 focus:outline-none transition-colors ${newsOpen ? 'text-primary' : 'text-gray-700 hover:text-gray-900'}`}>
              News & Updates
            </button>

            {newsOpen && (
              <div className="absolute right-0 top-full w-[680px] pt-3">
                <div className="overflow-hidden rounded-2xl bg-white shadow-2xl ring-1 ring-black/5">
                  <div className="flex">
                    <div className="flex-1 p-8">
                      <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">Stay Informed</p>
                      <div className="mt-6 grid grid-cols-2 gap-x-10 gap-y-6">
                        <DropdownItem icon={<Flag className="h-5 w-5" />} title="Immigration News" desc="Policy & USCIS updates" color="blue" />
                        <DropdownItem icon={<Newspaper className="h-5 w-5" />} title="Nepal Updates" desc="Embassy advisories" color="orange" />
                        <DropdownItem icon={<Bell className="h-5 w-5" />} title="Alerts & Warnings" desc="Safety & scam warnings" color="rose" />
                        <DropdownItem icon={<Trophy className="h-5 w-5" />} title="Student Success" desc="Achievements & wins" color="green" />
                      </div>
                    </div>
                    <FeaturedCard icon={<Newspaper className="h-6 w-6" />} tag="Important" title="OPT Rule" highlight="Changes 2025" desc="New STEM extensions." color="red" />
                  </div>
                </div>
              </div>
            )}
          </div>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <Link href="/login" className="hidden rounded-xl px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-100 transition-colors md:inline-flex">Sign In</Link>
          <Link href="/signup" className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-primary to-secondary px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-all">Get Started</Link>
        </div>
      </div>
    </header>
  );
};

// Dropdown Item Component
interface DropdownItemProps {
  icon: React.ReactNode;
  title: string;
  href?: string; 
  desc: string;
  color?: 'blue' | 'orange' | 'purple' | 'green' | 'rose' | 'indigo';
}

const DropdownItem = ({ icon, title, desc, color = 'blue' ,href='#' }: DropdownItemProps) => {
  const colorStyles = {
    blue: 'bg-blue-50 text-blue-600 group-hover:bg-blue-100',
    orange: 'bg-orange-50 text-orange-600 group-hover:bg-orange-100',
    purple: 'bg-purple-50 text-purple-600 group-hover:bg-purple-100',
    green: 'bg-emerald-50 text-emerald-600 group-hover:bg-emerald-100',
    rose: 'bg-rose-50 text-rose-600 group-hover:bg-rose-100',
    indigo: 'bg-indigo-50 text-indigo-600 group-hover:bg-indigo-100',
  };

  return (
    <Link href={href} className="group flex items-start gap-3.5">
      <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition-colors ${colorStyles[color]}`}>
        {icon}
      </div>
      <div className="pt-0.5">
        <p className="text-sm font-semibold text-gray-900 group-hover:text-primary transition-colors whitespace-nowrap">
            {title}
        </p>
        <p className="text-xs text-gray-500 mt-1 leading-snug">{desc}</p>
      </div>
    </Link>
  );
};

// Featured Card Component
interface FeaturedCardProps {
  icon: React.ReactNode;
  tag: string;
  title: string;
  highlight: string;
  desc: string;
  color?: 'primary' | 'secondary' | 'orange' | 'red';
  small?: boolean;
}

const FeaturedCard = ({ icon, tag, title, highlight, desc, color = 'primary', small }: FeaturedCardProps) => {
  const colorStyles = {
    primary: { bg: 'from-primary/10 to-primary/5', icon: 'bg-primary text-white', tag: 'bg-primary/10 text-primary' },
    secondary: { bg: 'from-secondary/10 to-secondary/5', icon: 'bg-secondary text-white', tag: 'bg-secondary/10 text-secondary' },
    orange: { bg: 'from-orange-100 to-amber-50', icon: 'bg-orange-500 text-white', tag: 'bg-orange-100 text-orange-600' },
    red: { bg: 'from-red-50 to-orange-50', icon: 'bg-red-500 text-white', tag: 'bg-red-100 text-red-600' },
  };
  const styles = colorStyles[color];
  return (
    <div className={`${small ? 'w-[200px]' : 'w-[260px]'} bg-gray-50/80 p-8 border-l border-gray-100`}>
      <span className={`inline-block rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider ${styles.tag}`}>{tag}</span>
      <div className={`mt-5 aspect-[4/3] rounded-xl bg-gradient-to-br ${styles.bg} p-4 flex items-end`}>
        <div className={`h-12 w-12 rounded-xl ${styles.icon} flex items-center justify-center shadow-lg`}>{icon}</div>
      </div>
      <h4 className="mt-5 text-base font-semibold text-gray-900 leading-tight">{title}<br /><span className="text-primary">{highlight}</span></h4>
      <p className="mt-2 text-sm text-gray-500">{desc}</p>
      <Link href="#" className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary hover:gap-2 transition-all">Learn more <ArrowRight className="h-4 w-4" /></Link>
    </div>
  );
};

export default Navbar;