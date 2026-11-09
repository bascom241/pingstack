"use client";

import dynamic from "next/dynamic";
import { useCallback, useEffect, useRef, useState } from "react";
import { useInView, useMotionValueEvent, useScroll } from "framer-motion";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowRight01Icon } from "@hugeicons/core-free-icons";
import { useReducedMotion } from "../lib/use-reduced-motion";
import { useCaseStories } from "../lib/use-case-data";
import { siteLinks } from "../lib/site-links";

const UseCaseScene = dynamic(() => import("./UseCaseScene"), { ssr: false });

export default function UseCases() {
  const [active, setActive] = useState(0);
  const [status, setStatus] = useState<"loading" | "ready" | "fallback">("loading");
  const stageRef = useRef<HTMLDivElement>(null);
  const storiesRef = useRef<HTMLDivElement>(null);
  const nearViewport = useInView(stageRef, { margin: "200px", once: true });
  const reducedMotion = useReducedMotion();
  const { scrollY } = useScroll();
  const updateFromScroll = useCallback(() => {
    if (!window.matchMedia("(min-width: 1024px)").matches || !storiesRef.current) return;
    const stories = Array.from(storiesRef.current.querySelectorAll<HTMLElement>("[data-usecase-story]"));
    let closest = 0, distance = Infinity;
    stories.forEach((story, index) => { const rect = story.getBoundingClientRect(); const next = Math.abs(rect.top + rect.height * 0.4 - window.innerHeight * 0.5); if (next < distance) { distance = next; closest = index; } });
    setActive(closest);
  }, []);
  useMotionValueEvent(scrollY, "change", updateFromScroll);
  useEffect(() => { updateFromScroll(); window.addEventListener("resize", updateFromScroll); return () => window.removeEventListener("resize", updateFromScroll); }, [updateFromScroll]);
  const updateStatus = useCallback((next: "ready" | "fallback") => setStatus(next), []);
  const story = useCaseStories[active];

  return (
    <section id="use-cases" aria-labelledby="use-cases-heading" className="usecase-section bg-canvas-muted px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
      <div className="mx-auto max-w-[1180px]">
        <div data-reveal className="usecase-intro">
          <p className="mb-5 text-sm font-semibold uppercase tracking-[0.12em] text-muted">The customer side of a ping</p>
          <h2 id="use-cases-heading" className="text-4xl font-semibold leading-[1.12] tracking-[-0.035em] text-foreground sm:text-5xl">Verify. Update.<br />Remind. Welcome.</h2>
          <p className="mt-5 max-w-lg text-lg leading-relaxed text-muted">Four everyday conversations. See what your next message can do.</p>
        </div>
        <div className="usecase-layout">
          <div className="usecase-stage-column">
            <div ref={stageRef} className="usecase-stage" data-scene-status={status} data-active-usecase={active}>
              <div aria-hidden="true" className={`usecase-static ${status === "ready" ? "invisible" : ""}`}>
                <div className="uc-fallback-phone"><div className="uc-screen"><div className="uc-status"><span>9:41</span><span className="uc-island" /><span>•••</span></div><div className="uc-contact"><span className="uc-avatar" /><span>{story.sender}</span><small>{story.channel === "EMAIL" ? "Email preview" : "Text message"}</small></div><div className="uc-conversation"><span className="uc-time">Now</span><div className="uc-message">{story.message}</div>{story.code && <div className="uc-code">{story.code}</div>}<span className="uc-delivered">Message example</span></div><div className="uc-input">{story.channel === "EMAIL" ? "Your inbox" : "Text message"}<span>↑</span></div></div></div>
              </div>
              {nearViewport && <UseCaseScene active={active} reducedMotion={reducedMotion} onStatus={updateStatus} />}
              <span className="usecase-scene-caption" aria-hidden="true">0{active + 1} / 04 <span>{story.channel} · Illustrative preview</span></span>
            </div>
            <div role="group" aria-label="Choose a messaging use case" className="usecase-mobile-nav">
              {useCaseStories.map((item, index) => <button key={item.label} type="button" aria-pressed={active === index} aria-controls={`usecase-story-${index}`} onClick={() => setActive(index)}><span>0{index + 1}</span>{item.label}</button>)}
            </div>
            <p aria-live="polite" aria-atomic="true" className="sr-only">{story.channel} example: {story.message}</p>
          </div>
          <div ref={storiesRef} className="usecase-stories">
            {useCaseStories.map((item, index) => <article id={`usecase-story-${index}`} key={item.label} data-usecase-story data-active={active === index} className="usecase-story">
              <p className="usecase-story-index"><span>0{index + 1}</span>{item.label}</p>
              <h3>{item.title}</h3><p className="usecase-story-description">{item.description}</p><p className="usecase-story-detail">{item.detail}</p>
              <p className="sr-only">Example message: {item.message}</p>
            </article>)}
          </div>
        </div>
        <div data-reveal className="usecase-outro"><p>Start with a message.<br /><span>Build the conversation from there.</span></p><a href={siteLinks.getStarted} className="inline-flex items-center gap-2 rounded-lg bg-brand px-6 py-3.5 text-sm font-semibold text-white hover:bg-[#003b8a]">Get started<HugeiconsIcon icon={ArrowRight01Icon} size={18} aria-hidden="true" /></a></div>
      </div>
    </section>
  );
}
