"use client"

import React from 'react';
import Link from 'next/link';
import { Twitter, Github, Linkedin, Mail, ShieldCheck } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    product: [
      { name: 'Vault', href: '#' },
      { name: 'Checklist', href: '#' },
      { name: 'How it works', href: '#how' },
      { name: 'Testimonials', href: '#' },
    ],
    support: [
      { name: 'Help Center', href: '#' },
      { name: 'Scam Alerts', href: '#' },
      { name: 'Visa Guide', href: '#' },
      { name: 'Contact', href: '#' },
    ],
    legal: [
      { name: 'Privacy Policy', href: '#' },
      { name: 'Terms of Service', href: '#' },
      { name: 'Data Security', href: '#' },
    ],
  };

  return (
    <footer className="bg-white border-t border-gray-100">
      <div className="mx-auto max-w-6xl px-4 py-16">
        <div className="grid grid-cols-2 gap-12 md:grid-cols-4 lg:grid-cols-5">
          
          {/* Brand Column */}
          <div className="col-span-2 lg:col-span-2">
            <Link href="/" className="flex items-center gap-2">
              <span className="grid h-8 w-8 place-items-center rounded-lg bg-blue-600 text-white font-bold shadow-lg shadow-blue-500/20">
                A
              </span>
              <span className="text-xl font-bold tracking-tight text-gray-900">ABRORA</span>
            </Link>
            <p className="mt-6 max-w-xs text-sm leading-relaxed text-gray-500">
              The all-in-one companion for international students in the USA. 
              Organize your documents, track your visa, and thrive in your new home.
            </p>
            <div className="mt-8 flex items-center gap-4">
              <SocialIcon icon={<Twitter className="h-5 w-5" />} href="#" />
              <SocialIcon icon={<Linkedin className="h-5 w-5" />} href="#" />
              <SocialIcon icon={<Github className="h-5 w-5" />} href="#" />
              <SocialIcon icon={<Mail className="h-5 w-5" />} href="#" />
            </div>
          </div>

          {/* Links Columns */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-gray-900">Product</h4>
            <ul className="mt-6 space-y-4">
              {footerLinks.product.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-sm text-gray-500 hover:text-blue-600 transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-gray-900">Resources</h4>
            <ul className="mt-6 space-y-4">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-sm text-gray-500 hover:text-blue-600 transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-gray-900">Legal</h4>
            <ul className="mt-6 space-y-4">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-sm text-gray-500 hover:text-blue-600 transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 border-t border-gray-50 pt-8 flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-xs text-gray-400">
            © {currentYear} Abrora Technologies Inc. All rights reserved.
          </p>
          <div className="flex items-center gap-2 rounded-full bg-gray-50 px-4 py-1.5 text-[10px] font-bold text-gray-500 ring-1 ring-gray-100">
            <ShieldCheck className="h-3 w-3 text-emerald-500" />
            SECURE 256-BIT ENCRYPTION
          </div>
        </div>
      </div>
    </footer>
  );
};

// Social Icon Sub-component
const SocialIcon = ({ icon, href }: { icon: React.ReactNode; href: string }) => (
  <Link 
    href={href} 
    className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-100 bg-white text-gray-400 shadow-sm transition-all hover:border-blue-100 hover:bg-blue-50 hover:text-blue-600"
  >
    {icon}
  </Link>
);

export default Footer;