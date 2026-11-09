"use client";

import dynamic from "next/dynamic";
import { useCallback, useRef, useState, type KeyboardEvent } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowRight01Icon, ArrowLeft01Icon, Message01Icon, Mail01Icon, Invoice01Icon, ChartLineData01Icon } from "@hugeicons/core-free-icons";
import { useReducedMotion } from "../lib/use-reduced-motion";
import { workspaceFeatures } from "../lib/workspace-data";
import { siteLinks } from "../lib/site-links";

const WorkspaceScene = dynamic(() => import("./WorkspaceScene"), { ssr: false });
const icons = [Message01Icon, Mail01Icon, Invoice01Icon, ChartLineData01Icon];

export default function MessagingWorkflow() {
  const [selected, setSelected] = useState(0);
  const [status, setStatus] = useState<"loading" | "ready" | "fallback">("loading");
  const host = useRef<HTMLDivElement>(null);
  const tabs = useRef<HTMLDivElement>(null);
  const nearViewport = useInView(host, { margin: "200px", once: true });
  const reduceMotion = useReducedMotion();
  const preview = workspaceFeatures[selected];
  const show3D = nearViewport && !reduceMotion && status !== "fallback";
  const ready = show3D && status === "ready";
  const updateStatus = useCallback((next: "ready" | "fallback") => setStatus(next), []);
  function handleTabKeys(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    let next = index;
    if (event.key === "ArrowRight") next = (index + 1) % workspaceFeatures.length;
    else if (event.key === "ArrowLeft") next = (index + workspaceFeatures.length - 1) % workspaceFeatures.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = workspaceFeatures.length - 1;
    else return;
    event.preventDefault(); setSelected(next); tabs.current?.querySelectorAll<HTMLButtonElement>("button")[next].focus();
  }

  return (
    <section id="how-it-works" aria-labelledby="workflow-heading" className="workspace-section bg-surface px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
      <div className="mx-auto max-w-[1180px]">
        <div data-reveal className="workspace-intro">
          <div><p className="mb-5 text-sm font-semibold uppercase tracking-[0.12em] text-muted">Inside PingStack</p><h2 id="workflow-heading" className="text-4xl font-semibold leading-[1.12] tracking-[-0.035em] text-foreground sm:text-5xl">Your messages.<br />One place to manage them.</h2></div>
          <p className="max-w-sm text-base leading-relaxed text-muted">Explore the workspace. Choose a feature and follow the highlight to see how the pieces fit together.</p>
        </div>

        <div ref={host} className="workspace-stage" data-workspace-status={reduceMotion ? "static" : status} data-workspace-feature={preview.key}>
          <div className={`workspace-flat ${ready ? "invisible" : ""}`}>
            <div className="workspace-flat-bar"><span>PINGSTACK</span><span>Workspace preview</span><span>{preview.label}</span></div>
            <div className="relative"><Image src={preview.image} alt={preview.alt} width={preview.width} height={preview.height} sizes="(max-width: 768px) 100vw, 1120px" className="h-auto w-full" /><div aria-hidden="true" className="workspace-focus" style={{ left: `${preview.focus.x * 100}%`, top: `${preview.focus.y * 100}%`, width: `${preview.focus.w * 100}%`, height: `${preview.focus.h * 100}%` }} /></div>
          </div>
          {show3D && <WorkspaceScene selected={selected} onStatus={updateStatus} />}
          <div className="workspace-stage-label"><span>Product preview</span><span>Choose a feature to explore</span></div>
        </div>

        <div ref={tabs} role="tablist" aria-label="Explore workspace features" className="workspace-tabs">
          {workspaceFeatures.map((feature, index) => <button key={feature.key} id={`workspace-tab-${feature.key}`} role="tab" aria-selected={selected === index} aria-controls="workspace-feature-panel" tabIndex={selected === index ? 0 : -1} onClick={() => setSelected(index)} onKeyDown={(event) => handleTabKeys(event, index)}><span className="workspace-tab-number">0{index + 1}</span><HugeiconsIcon icon={icons[index]} size={18} aria-hidden="true" /><span>{feature.label}</span></button>)}
        </div>
        <div className="workspace-feature-row">
          <motion.div key={preview.key} initial={false} animate={{ opacity: [reduceMotion ? 1 : 0, 1], y: [reduceMotion ? 0 : 8, 0] }} transition={{ duration: reduceMotion ? 0 : 0.3 }} id="workspace-feature-panel" role="tabpanel" aria-labelledby={`workspace-tab-${preview.key}`} tabIndex={0} className="workspace-feature-copy">
            <h3>{preview.heading}</h3><p>{preview.description}</p>
          </motion.div>
          <div className="workspace-step-controls"><button type="button" aria-label="Previous workspace feature" onClick={() => setSelected((value) => (value + 3) % 4)}><HugeiconsIcon icon={ArrowLeft01Icon} size={20} aria-hidden="true" /></button><span aria-live="polite">0{selected + 1} / 04</span><button type="button" aria-label="Next workspace feature" onClick={() => setSelected((value) => (value + 1) % 4)}><HugeiconsIcon icon={ArrowRight01Icon} size={20} aria-hidden="true" /></button></div>
        </div>
        <div className="workspace-actions"><a href={siteLinks.getStarted}>Get started<HugeiconsIcon icon={ArrowRight01Icon} size={17} aria-hidden="true" /></a></div>

        <div className="mt-16 grid gap-6 md:grid-cols-2">
          <article data-reveal className="audience-card overflow-hidden rounded-3xl border border-line bg-surface"><div className="relative aspect-[16/9] overflow-hidden"><Image src="/images/retail-business.jpg" alt="Clothing on a rack in a tailoring and retail business" fill sizes="(max-width: 768px) 100vw, 570px" className="object-cover" /></div><div className="p-7 sm:p-9"><p className="text-sm font-semibold text-accent">For your business</p><h3 className="mt-3 text-2xl font-semibold tracking-tight text-foreground">Keep customers in the loop.</h3><p className="mt-4 leading-relaxed text-muted">An order confirmation. A collection reminder. A service update. Make customer communication part of your daily routine.</p></div></article>
          <article data-reveal className="audience-card overflow-hidden rounded-3xl border border-line bg-surface"><div className="relative aspect-[16/9] overflow-hidden"><Image src="/images/developer-at-work.jpg" alt="A person working on a laptop outdoors" fill sizes="(max-width: 768px) 100vw, 570px" className="object-cover" /></div><div className="p-7 sm:p-9"><p className="text-sm font-semibold text-accent">For your product</p><h3 className="mt-3 text-2xl font-semibold tracking-tight text-foreground">Connect messaging to what you build.</h3><p className="mt-4 leading-relaxed text-muted">Bring OTPs, account alerts, and notifications into your application with the PingStack API.</p></div></article>
        </div>
      </div>
    </section>
  );
}
