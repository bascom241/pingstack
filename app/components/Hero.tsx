"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

const Hero = () => {
  const images = ["/login.jpg", "/trans.PNG"];
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-slide every 4 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [images.length]);

  return (
    <section className="relative overflow-hidden bg-[#004aad] text-white pt-16 pb-24 lg:pt-24 lg:pb-32">
      
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0"
      >
        <source src="/astro.mp4" type="video/mp4" />
      </video>

      {/* Optional dark tint overlay to make text pop over video */}
      <div className="absolute inset-0 bg-black/40 z-0" />

      <div className="max-w-6xl mx-auto px-6 relative z-10 text-center">
        
        {/* Top Content: Badge, Headline & Description */}
        <div className="max-w-3xl mx-auto space-y-6">
          
          {/* Live Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-white/10 backdrop-blur-md rounded-full text-xs font-medium text-white border border-white/20">
            <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
            Next-Gen Messaging Infrastructure
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-[1.1]">
            Fast OTP Delivery. <br />
            <span>Every Ping Counts.</span>
          </h1>

          {/* Visionary Description */}
          <p className="text-lg sm:text-xl text-white/90 font-normal leading-relaxed max-w-2xl mx-auto">
            Empower your product with blazing-fast communication APIs. From instant OTPs to high-volume transactional notifications, experience infrastructure engineered for zero lag, elite uptime, and global scale.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Link
              href="/signup"
              className="px-8 py-4 text-sm font-bold text-[#004aad] bg-white rounded-xl hover:bg-gray-100 transition-all shadow-lg"
            >
              Start Building Free
            </Link>
            <Link
              href="/docs"
              className="px-8 py-4 text-sm font-semibold text-white bg-transparent border border-white rounded-xl hover:bg-white/10 transition-all"
            >
              Explore Docs &rarr;
            </Link>
          </div>

          {/* Key Metrics Bar */}
          <div className="grid grid-cols-3 gap-6 pt-6 max-w-lg mx-auto border-t border-white/20 mt-8">
            <div>
              <p className="text-2xl lg:text-3xl font-extrabold text-white">99.99%</p>
              <p className="text-xs text-white/80 font-medium">Uptime SLA</p>
            </div>
            <div>
              <p className="text-2xl lg:text-3xl font-extrabold text-white">&lt; 150ms</p>
              <p className="text-xs text-white/80 font-medium">Global Delivery</p>
            </div>
            <div>
              <p className="text-2xl lg:text-3xl font-extrabold text-white">10M+</p>
              <p className="text-xs text-white/80 font-medium">Daily Pings</p>
            </div>
          </div>

        </div>

        {/* Bottom Showcase: Massive Clean Image Slider */}
       
      </div>
    </section>
  );
};

export default Hero;