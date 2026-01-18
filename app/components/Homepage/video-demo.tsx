"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Play, Pause, Volume2, VolumeX, Maximize, Clock, Shield, Sparkles } from "lucide-react";

const VideoDemoSection = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  const highlights = [
    {
      icon: <Clock className="h-5 w-5" />,
      title: "2 min walkthrough",
      desc: "Quick overview of all features",
    },
    {
      icon: <Shield className="h-5 w-5" />,
      title: "See security in action",
      desc: "How we protect your documents",
    },
    {
      icon: <Sparkles className="h-5 w-5" />,
      title: "Smart automation",
      desc: "Deadline reminders & more",
    },
  ];

  return (
    <section className="relative overflow-hidden min-h-full flex flex-col justify-center py-16 px-4 bg-gradient-to-b from-white to-gray-50">
      {/* Background decoration */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[800px] w-[800px] rounded-full bg-primary-muted/20 blur-3xl" />

      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-blue-50 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-blue-600">
            <Play className="h-3 w-3" />
            Platform Demo
          </div>
          <h2 className="text-4xl font-black tracking-tight text-gray-900 md:text-5xl">
            See ABRORA in action
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Watch how international students use ABRORA to stay organized, compliant, and stress-free throughout their journey in the U.S.
          </p>
        </motion.div>

        {/* Video Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative"
        >
          {/* Video wrapper with gradient border */}
          <div className="absolute -inset-1 rounded-[2rem] bg-gradient-to-r from-primary via-secondary to-primary opacity-20 blur-sm" />

          <div className="relative rounded-[2rem] bg-gray-900 overflow-hidden shadow-2xl shadow-gray-900/20 ring-1 ring-gray-800">
            {/* Video placeholder - Replace src with actual video */}
            <div className="relative aspect-video bg-gradient-to-br from-gray-800 to-gray-900">
              {/* Placeholder content - shows when video not playing */}
              {!isPlaying && (
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  {/* Decorative elements */}
                  <div className="absolute inset-0 opacity-30">
                    <div className="absolute top-1/4 left-1/4 h-32 w-32 rounded-full bg-primary/40 blur-3xl" />
                    <div className="absolute bottom-1/4 right-1/4 h-40 w-40 rounded-full bg-secondary/40 blur-3xl" />
                  </div>

                  {/* ABRORA Logo/Text */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-8 text-center"
                  >
                    <h3 className="text-3xl font-black text-white tracking-tight">
                      ABRORA
                    </h3>
                    <p className="text-gray-400 text-sm mt-1">Platform Walkthrough</p>
                  </motion.div>

                  {/* Play button */}
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsPlaying(true)}
                    className="group relative flex h-20 w-20 items-center justify-center rounded-full bg-white shadow-xl shadow-white/20 transition-all hover:shadow-2xl hover:shadow-white/30"
                  >
                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary to-secondary opacity-0 transition-opacity group-hover:opacity-100" />
                    <Play className="relative h-8 w-8 text-gray-900 group-hover:text-white transition-colors ml-1" fill="currentColor" />
                  </motion.button>

                  <p className="mt-6 text-gray-400 text-sm">Click to play demo</p>
                </div>
              )}

              {/* Actual video element - uncomment and add your video source */}
              {isPlaying && (
                <video
                  className="h-full w-full object-cover"
                  autoPlay
                  muted={isMuted}
                  loop
                  playsInline
                  onClick={() => setIsPlaying(false)}
                >
                  <source src="https://cdn.pixabay.com/video/2026/01/02/325502_large.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              )}

              {/* Video controls overlay */}
              {isPlaying && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <button
                        onClick={() => setIsPlaying(false)}
                        className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-sm transition-colors hover:bg-white/30"
                      >
                        <Pause className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => setIsMuted(!isMuted)}
                        className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-sm transition-colors hover:bg-white/30"
                      >
                        {isMuted ? (
                          <VolumeX className="h-5 w-5" />
                        ) : (
                          <Volume2 className="h-5 w-5" />
                        )}
                      </button>
                    </div>
                    <button className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-sm transition-colors hover:bg-white/30">
                      <Maximize className="h-5 w-5" />
                    </button>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </motion.div>

        {/* Feature highlights below video */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3"
        >
          {highlights.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
              className="group flex items-start gap-4 rounded-2xl bg-white p-5 ring-1 ring-gray-100 transition-all hover:shadow-lg hover:shadow-blue-500/5 hover:ring-blue-100"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gray-50 text-gray-600 transition-colors group-hover:bg-blue-600 group-hover:text-white">
                {item.icon}
              </div>
              <div>
                <h4 className="font-bold text-gray-900">{item.title}</h4>
                <p className="mt-1 text-sm text-gray-600">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default VideoDemoSection;
