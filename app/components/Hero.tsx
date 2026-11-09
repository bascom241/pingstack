import Link from "next/link";
import { siteLinks } from "../lib/site-links";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowRight01Icon, Notification03Icon } from "@hugeicons/core-free-icons";

const Hero = () => {

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
          <div data-reveal data-reveal-delay="80" className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-white/10 backdrop-blur-md rounded-full text-xs font-medium text-white border border-white/20">
            <HugeiconsIcon icon={Notification03Icon} size={14} aria-hidden="true" />
            SMS &amp; Email for Your Business
          </div>

          {/* Headline */}
          <h1 data-reveal data-reveal-delay="140" className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-[1.1]">
            Connect with Customers. <br />
            <span>Grow with Every Ping.</span>
          </h1>

          {/* Visionary Description */}
          <p data-reveal data-reveal-delay="200" className="text-lg sm:text-xl text-white/90 font-normal leading-relaxed max-w-2xl mx-auto">
            Send SMS and email for OTPs, alerts, reminders, and customer updates. Start with business messaging, with more tools to manage your everyday operations to follow.
          </p>

          {/* Action Buttons */}
          <div data-reveal data-reveal-delay="260" className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Link
              href={siteLinks.getStarted}
              className="px-8 py-4 text-sm font-bold text-brand bg-white rounded-xl hover:bg-gray-100 transition-all shadow-lg"
            >
              Get Started
            </Link>
            <Link
              href="#developers"
              className="inline-flex items-center gap-2 px-8 py-4 text-sm font-semibold text-white bg-transparent border border-white rounded-xl hover:bg-white/10 transition-all"
            >
              Explore the API <HugeiconsIcon icon={ArrowRight01Icon} size={18} aria-hidden="true" />
            </Link>
          </div>

          {/* Key Metrics Bar */}
          <div data-reveal data-reveal-delay="320" className="grid grid-cols-3 gap-6 pt-6 max-w-lg mx-auto border-t border-white/20 mt-8">
            <div>
              <p className="text-2xl lg:text-3xl font-extrabold text-white">SMS</p>
              <p className="text-xs text-white/80 font-medium">Text notifications</p>
            </div>
            <div>
              <p className="text-2xl lg:text-3xl font-extrabold text-white">Email</p>
              <p className="text-xs text-white/80 font-medium">Customer updates</p>
            </div>
            <div>
              <p className="text-2xl lg:text-3xl font-extrabold text-white">API</p>
              <p className="text-xs text-white/80 font-medium">App integrations</p>
            </div>
          </div>

        </div>

        {/* Bottom Showcase: Massive Clean Image Slider */}
       
      </div>
    </section>
  );
};

export default Hero;