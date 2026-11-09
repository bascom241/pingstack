"use client";

import dynamic from "next/dynamic";
import { useCallback, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { useReducedMotion } from "../lib/use-reduced-motion";
import { HugeiconsIcon } from "@hugeicons/react";
import { Globe02Icon, ArrowRight01Icon, PauseIcon, PlayIcon, Message01Icon, Mail01Icon } from "@hugeicons/core-free-icons";

const GlobeCanvas = dynamic(() => import("./GlobeCanvas"), { ssr: false });

export default function GlobeSection() {
  const host = useRef<HTMLDivElement>(null);
  const nearViewport = useInView(host, { margin: "200px", once: true });
  const reducedMotion = useReducedMotion();
  const [paused, setPaused] = useState(false);
  const [status, setStatus] = useState<"loading" | "ready" | "fallback">("loading");
  const updateStatus = useCallback((next: "ready" | "fallback") => setStatus(next), []);

  return (
    <section id="connections" aria-labelledby="connections-heading" className="bg-canvas-muted px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
      <div className="mx-auto grid max-w-[1180px] items-center gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        <div data-reveal>
          <p className="mb-5 text-sm font-semibold uppercase tracking-[0.12em] text-accent">Built around connection</p>
          <h2 id="connections-heading" className="text-4xl font-semibold leading-[1.1] tracking-[-0.05em] text-foreground sm:text-5xl lg:text-[56px]">Every connection<br />starts with a ping.</h2>
          <p className="mt-6 max-w-lg text-lg leading-relaxed text-muted">An account verified. A customer updated. A conversation started. Bring SMS and email into the moments that keep your business moving.</p>
          <div className="mt-7 flex flex-wrap gap-3">{[[Message01Icon, "SMS messaging"], [Mail01Icon, "Email sending"]].map(([icon, label]) => <span key={String(label)} className="globe-channel inline-flex items-center gap-2 rounded-full border border-accent/15 bg-surface px-4 py-2.5 text-sm font-medium text-accent"><HugeiconsIcon icon={icon as typeof Message01Icon} size={18} aria-hidden="true" />{String(label)}</span>)}</div>
          <a href="#developers" className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-accent">Build your next connection<HugeiconsIcon icon={ArrowRight01Icon} size={18} aria-hidden="true" /></a>
        </div>
        <div data-reveal data-reveal-delay="100" className="globe-panel overflow-hidden rounded-3xl border border-accent/10 bg-surface">
          <div ref={host} className="relative aspect-square max-h-[580px] w-full overflow-hidden" data-globe-status={status}>
            <div aria-hidden="true" className={`absolute inset-0 flex items-center justify-center ${status === "ready" ? "invisible" : "visible"}`}><div className="absolute h-4/5 w-4/5 rounded-full border border-accent/10" /><div className="absolute h-3/5 w-3/5 rounded-full border border-accent/10" /><HugeiconsIcon icon={Globe02Icon} size={230} strokeWidth={0.8} className="h-3/5 w-3/5 text-accent" /></div>
            {nearViewport && <GlobeCanvas paused={paused || reducedMotion !== false} onStatus={updateStatus} />}
            <span className="globe-badge pointer-events-none absolute top-5 left-5 z-20 rounded-full border border-accent/10 bg-surface/95 px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.12em] text-accent sm:top-6 sm:left-6">A world of conversations</span>
          </div>
          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-line px-5 py-4 text-xs text-muted">
            <p>{status === "ready" ? "Drag to explore · Arrow keys to rotate" : "Earth illustration"}</p>
            {status === "ready" && !reducedMotion && <button type="button" onClick={() => setPaused((value) => !value)} aria-pressed={paused} aria-label={paused ? "Resume globe rotation" : "Pause globe rotation"} className="inline-flex items-center gap-2 rounded-lg px-2 py-1.5 font-semibold text-accent hover:bg-accent/5"><HugeiconsIcon icon={paused ? PlayIcon : PauseIcon} size={16} aria-hidden="true" />{paused ? "Resume" : "Pause"}</button>}
          </div>
          <p className="px-5 pb-4 text-[10px] leading-relaxed text-muted">Connection paths are illustrative, not a coverage map. Earth imagery: NASA Blue Marble.</p>
        </div>
      </div>
    </section>
  );
}
