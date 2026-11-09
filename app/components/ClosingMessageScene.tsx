"use client";

import dynamic from "next/dynamic";
import { useCallback, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { HugeiconsIcon } from "@hugeicons/react";
import { BubbleChatIcon, Mail01Icon } from "@hugeicons/core-free-icons";
import BrandMark from "./BrandMark";
import { useReducedMotion } from "../lib/use-reduced-motion";

const ClosingMessageCanvas = dynamic(() => import("./ClosingMessageCanvas"), { ssr: false });

export default function ClosingMessageScene() {
  const host = useRef<HTMLDivElement>(null);
  const nearViewport = useInView(host, { margin: "150px", once: true });
  const reduced = useReducedMotion();
  const [ready, setReady] = useState(false);
  const updateStatus = useCallback((value: boolean) => setReady(value), []);
  return (
    <div ref={host} className="closing-message-scene" aria-hidden="true" data-renderer={ready ? "three" : "fallback"}>
      <div className="closing-scene-fallback" hidden={ready}>
        <HugeiconsIcon icon={BubbleChatIcon} size={48} strokeWidth={1.3} />
        <BrandMark size={62} />
        <HugeiconsIcon icon={Mail01Icon} size={48} strokeWidth={1.3} />
      </div>
      {nearViewport && <ClosingMessageCanvas reduced={reduced} onStatus={updateStatus} />}
      <span className="closing-scene-caption">Two channels. One connection.</span>
    </div>
  );
}
