"use client";

import React from "react";
import HeroSection from "./components/Homepage/hero";
import FeaturesSection from "./components/Homepage/features";
import VideoDemoSection from "./components/Homepage/video-demo";
import ContributorsPage from "./components/Homepage/contributers";
import TestimonialsPage from "./components/Homepage/testimonials";
import Footer from "./components/common/footer";
import Navbar from "./components/Nav";

export default function HomePage() {
  return (
    <div className="h-screen overflow-y-auto scroll-smooth snap-y snap-mandatory bg-white text-gray-900">
      {/* Hero Section */}
      <div className="relative overflow-hidden snap-start min-h-screen">
        {/* soft blobs */}
        <div className="pointer-events-none absolute -top-24 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-primary-muted/40 blur-3xl" />
        <div className="pointer-events-none absolute -top-10 -left-24 h-[380px] w-[380px] rounded-full bg-secondary-muted/40 blur-3xl" />
        <div className="pointer-events-none absolute top-40 -right-24 h-[420px] w-[420px] rounded-full bg-cyan-200/40 blur-3xl" />

        <Navbar />
        <HeroSection />
      </div>

      {/* Features */}
      <div className="snap-start min-h-screen">
        <FeaturesSection />
      </div>

      {/* Video Demo */}
      <div className="snap-start min-h-screen">
        <VideoDemoSection />
      </div>

      {/* Contributers page */}
      <div className="snap-start min-h-screen">
        <ContributorsPage />
      </div>

      {/* Testimonials */}
      <div className="snap-start min-h-screen">
        <TestimonialsPage />
      </div>

      {/* Footer */}
      <div className="snap-start">
        <Footer />
      </div>
    </div>
  );
}
