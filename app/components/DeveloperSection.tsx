"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useReducedMotion } from "../lib/use-reduced-motion";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowRight01Icon, Copy01Icon, Tick02Icon, CodeIcon, Message01Icon, Mail01Icon } from "@hugeicons/core-free-icons";
import { siteLinks } from "../lib/site-links";

const examples = {
  SMS: {
    endpoint: "POST /api/v1/sms/dispatch",
    code: `const response = await fetch(
  \`\${baseUrl}/api/v1/sms/dispatch\`,
  {
    method: "POST",
    headers: {
      Authorization: \`Bearer \${accessToken}\`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      senderId: "YOURBRAND",
      recipients: ["2348000000000"],
      messageBody: "Your order is ready!",
      transactional: true
    })
  }
);

const result = await response.json();`,
    note: "A 202 Accepted response means the request is queued, not that the message has been delivered.",
  },
  Email: {
    endpoint: "POST /api/v1/campaign",
    code: `const response = await fetch(
  \`\${baseUrl}/api/v1/campaign\`,
  {
    method: "POST",
    headers: {
      Authorization: \`Bearer \${accessToken}\`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      name: "Customer welcome",
      templateId: savedTemplateId,
      subject: "Welcome aboard!",
      recipientRequests: [{
        email: "ada@example.com",
        name: "Ada"
      }]
    })
  }
);`,
    note: "This creates a campaign. After setup, use the campaign processing endpoint to begin sending.",
  },
};

export default function DeveloperSection() {
  const reduceMotion = useReducedMotion();
  const [channel, setChannel] = useState<keyof typeof examples>("SMS");
  const [copyState, setCopyState] = useState<"idle" | "copied" | "error">("idle");
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => () => { if (timer.current) clearTimeout(timer.current); }, []);
  async function copyCode() {
    try {
      await navigator.clipboard.writeText(examples[channel].code);
      setCopyState("copied");
    } catch { setCopyState("error"); }
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setCopyState("idle"), 2500);
  }

  return (
    <section id="developers" aria-labelledby="developers-heading" className="bg-surface px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
      <div className="mx-auto grid max-w-[1180px] items-center gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        <div data-reveal>
          <div className="developer-mark mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-accent/[0.06] text-accent"><HugeiconsIcon icon={CodeIcon} size={30} aria-hidden="true" /></div>
          <p className="mb-5 text-sm font-semibold uppercase tracking-[0.12em] text-accent">For developers</p>
          <h2 id="developers-heading" className="text-4xl font-semibold leading-[1.1] tracking-[-0.05em] text-foreground sm:text-5xl">You build the product.<br />We bring the ping.</h2>
          <p className="mt-6 text-lg leading-relaxed text-muted">Connect your application to the moments your customers need to hear about. Start with an SMS, or bring your email templates into the flow.</p>
          <ul className="mt-7 space-y-4 text-sm font-medium text-muted">
            {["HTTP requests that fit your existing stack", "SMS dispatch and template-based email campaigns", "Account access kept on your server"].map((text) => <li key={text} className="flex items-start gap-3"><HugeiconsIcon icon={Tick02Icon} size={20} className="shrink-0 text-accent" aria-hidden="true" />{text}</li>)}
          </ul>
          <a href="#api-notes" className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-accent">Explore the integration<HugeiconsIcon icon={ArrowRight01Icon} size={18} aria-hidden="true" /></a>
        </div>
        <div data-reveal data-reveal-delay="100" className="developer-panel min-w-0 overflow-hidden rounded-3xl border border-accent/15 bg-inset">
          <div className="developer-toolbar flex flex-wrap items-center justify-between gap-3 border-b border-accent/10 bg-surface p-4 sm:px-6">
            <div role="group" aria-label="Code example channel" className="developer-tabs flex gap-1 rounded-xl bg-inset p-1">
              {(["SMS", "Email"] as const).map((item) => <button key={item} type="button" aria-pressed={channel === item} aria-controls="api-code" onClick={() => {setChannel(item); setCopyState("idle");}} className={`inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold transition-colors ${channel === item ? "bg-[#004aad] text-white" : "text-muted hover:text-accent"}`}><HugeiconsIcon icon={item === "SMS" ? Message01Icon : Mail01Icon} size={17} aria-hidden="true" />{item}</button>)}
            </div>
            <button type="button" onClick={copyCode} className="developer-copy inline-flex items-center gap-2 rounded-lg border border-line px-3 py-2 text-xs font-semibold text-accent hover:bg-inset"><HugeiconsIcon icon={copyState === "copied" ? Tick02Icon : Copy01Icon} size={16} aria-hidden="true" />{copyState === "copied" ? "Copied" : "Copy code"}</button>
          </div>
          <p className="developer-endpoint border-b border-accent/10 px-6 py-4 font-mono text-xs font-medium text-accent">{examples[channel].endpoint}</p>
          <motion.pre key={channel} initial={false} animate={{ opacity: [reduceMotion ? 1 : 0, 1] }} transition={{ duration: reduceMotion ? 0 : 0.25 }} id="api-code" tabIndex={0} aria-label={`${channel} JavaScript request example`} className="overflow-x-auto p-5 text-[12px] leading-7 text-code sm:p-6 sm:text-[13px]"><code>{examples[channel].code}</code></motion.pre>
          {channel === "SMS" && <div className="developer-response mx-5 mb-5 rounded-xl border border-accent/10 bg-surface p-4 sm:mx-6"><p className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-accent">Example response · 202 Accepted</p><pre tabIndex={0} aria-label="Example SMS response" className="overflow-x-auto text-xs leading-6 text-muted"><code>{JSON.stringify({status: "ACCEPTED", message: "Bulk SMS transmission has been queued successfully in the background.", totalRecipients: 1}, null, 2)}</code></pre></div>}
          <p aria-live="polite" className="sr-only">{copyState === "copied" ? "Code copied to clipboard" : copyState === "error" ? "Copy unavailable. Select and copy the code manually." : ""}</p>
          {copyState === "error" && <p className="px-6 pb-3 text-sm text-muted">Select and copy the code manually; clipboard access is unavailable.</p>}
          <p className="developer-note border-t border-accent/10 bg-surface px-6 py-4 text-xs leading-relaxed text-muted">{examples[channel].note}</p>
        </div>
        <details id="api-notes" className="rounded-2xl border border-line px-6 py-5 lg:col-span-2">
          <summary className="cursor-pointer text-sm font-semibold text-accent">Before your first request</summary>
          <div className="mt-4 grid gap-5 text-sm leading-relaxed text-muted sm:grid-cols-3">
            <p><strong className="text-foreground">01. Configure access.</strong><br />Set your API base URL and authorised access token on your server. Never expose credentials in a public frontend.</p>
            <p><strong className="text-foreground">02. Prepare your sender.</strong><br />Use an approved SMS sender ID. For email, configure your sender and save a template before creating a campaign.</p>
            <p><strong className="text-foreground">03. Check the outcome.</strong><br />For email, process a created campaign with PUT /api/v1/campaign/&#123;campaignId&#125;/process. Request acceptance and final delivery are separate states.</p>
          </div>
          <a href={siteLinks.contact} className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-accent">Ask an integration question<HugeiconsIcon icon={ArrowRight01Icon} size={17} aria-hidden="true" /></a>
        </details>
      </div>
    </section>
  );
}
