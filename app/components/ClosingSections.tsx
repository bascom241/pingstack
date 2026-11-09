import { HugeiconsIcon } from "@hugeicons/react";
import { Message01Icon, Mail01Icon, ArrowRight01Icon, Tick02Icon, Add01Icon, Wallet01Icon, ArrowUpRight01Icon } from "@hugeicons/core-free-icons";
import BrandMark from "./BrandMark";
import ClosingMessageScene from "./ClosingMessageScene";
import { siteLinks } from "../lib/site-links";

const questions = [
  ["What can I use PingStack for?", "Start with SMS and email for verification codes, account alerts, order updates, reminders, and welcome messages. Choose the channel that fits your customer and the purpose of your message."],
  ["Do I need to be a developer?", "No. The dashboard gives you tools to compose SMS, manage contacts, and organise email templates. Developers can also connect messaging to an application through the API."],
  ["How does pricing work?", "SMS uses a service-credit balance. Message type, route, and length can affect the cost. Contact us for current SMS and email rates, volume requirements, and billing details before you start."],
  ["What do I need before sending?", "Create your account and complete the applicable setup. SMS requires an approved sender ID; email needs a configured sender and template. Contact and verification requirements depend on your use case."],
  ["Can I send marketing messages to any contact?", "Send promotional messages only to eligible contacts with the required consent. Respect communication preferences and opt-outs. Having a phone number or email address does not by itself give permission to send marketing."],
  ["Does an accepted request mean my message was delivered?", "No. An accepted or queued request means processing has started. Provider acceptance and final delivery are different stages. Check the available message status and investigate failed messages before retrying."],
  ["Are invoices, inventory, and other business tools available?", "SMS and email are the starting point. Customer records, invoices, payment tracking, and wider business tools are part of the planned direction. They are not being presented here as available messaging features."],
];

export function PricingSection() {
  return (
    <section id="pricing" aria-labelledby="pricing-heading" className="bg-canvas-muted px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
      <div className="mx-auto max-w-[1180px]">
        <div data-reveal className="mx-auto mb-12 max-w-2xl text-center">
          <p className="mb-5 text-sm font-semibold uppercase tracking-[0.12em] text-accent">Messaging that fits</p>
          <h2 id="pricing-heading" className="text-4xl font-semibold leading-[1.1] tracking-[-0.05em] text-foreground sm:text-5xl lg:text-[56px]">Start with what you need.<br />Grow from there.</h2>
          <p className="mt-6 text-lg leading-relaxed text-muted">A few important updates or a growing product. Find the right setup for your messages and your business.</p>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {[
            { icon: Message01Icon, label: "SMS", title: "Everyday messages. Clear usage.", description: "Use service credits for the SMS your business sends.", features: ["OTPs, alerts, and customer updates", "Dashboard and API sending", "A visible service-credit balance"], subject: "PingStack SMS rates" },
            { icon: Mail01Icon, label: "Email", title: "More space for your message.", description: "Set up email around your sending needs and volume.", features: ["Template-based email campaigns", "Welcome and transactional messages", "Sender configuration and contact lists"], subject: "PingStack email rates" },
          ].map((plan, index) => <article key={plan.label} data-reveal data-reveal-delay={index * 100} className="pricing-card flex flex-col rounded-3xl border border-line bg-surface p-7 sm:p-10">
            <div className="mb-7 flex items-center gap-3 text-accent"><HugeiconsIcon icon={plan.icon} size={28} aria-hidden="true" /><span className="text-lg font-semibold">{plan.label}</span></div>
            <h3 className="text-[28px] font-semibold leading-tight tracking-tight text-foreground">{plan.title}</h3>
            <p className="mt-4 leading-relaxed text-muted">{plan.description}</p>
            <p className="mt-7 border-y border-line py-5 text-xl font-semibold text-accent">Talk to us for current rates</p>
            <ul className="my-7 space-y-4 text-sm text-muted">{plan.features.map((feature) => <li key={feature} className="flex items-start gap-3"><HugeiconsIcon icon={Tick02Icon} size={19} className="shrink-0 text-accent" aria-hidden="true" />{feature}</li>)}</ul>
            <a href={`${siteLinks.contact}?subject=${encodeURIComponent(plan.subject)}`} className="mt-auto inline-flex items-center justify-center gap-2 rounded-xl bg-[#004aad] px-6 py-4 text-sm font-semibold text-white transition-colors hover:bg-[#003b8a]">Ask about {plan.label} pricing<HugeiconsIcon icon={ArrowRight01Icon} size={18} aria-hidden="true" /></a>
          </article>)}
        </div>
        <div data-reveal className="mt-6 flex items-start gap-4 rounded-2xl border border-accent/10 bg-surface px-6 py-5 text-sm leading-relaxed text-muted"><HugeiconsIcon icon={Wallet01Icon} size={24} className="shrink-0 text-accent" aria-hidden="true" /><p><strong className="font-semibold text-foreground">Your wallet powers your messaging.</strong> Service credits cover PingStack usage. SMS and email rates, charging rules, and any volume arrangements are confirmed for your setup.</p></div>
      </div>
    </section>
  );
}

export function FAQSection() {
  return (
    <section id="faq" aria-labelledby="faq-heading" className="bg-surface px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
      <div className="mx-auto grid max-w-[1180px] gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <div data-reveal><p className="mb-5 text-sm font-semibold uppercase tracking-[0.12em] text-accent">A little clarity</p><h2 id="faq-heading" className="text-4xl font-semibold leading-[1.1] tracking-[-0.05em] text-foreground sm:text-5xl">Good questions.<br />Clear answers.</h2><p className="mt-6 text-lg leading-relaxed text-muted">A few things to know before your first ping.</p><a href={siteLinks.contact} className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-accent">Still have a question?<HugeiconsIcon icon={ArrowRight01Icon} size={18} aria-hidden="true" /></a></div>
        <div>{questions.map(([question, answer], index) => <details key={question} data-reveal data-reveal-delay={(index % 2) * 60} className="group border-b border-line first:border-t">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-5 py-6 text-base font-semibold leading-relaxed text-foreground [&::-webkit-details-marker]:hidden">{question}<HugeiconsIcon icon={Add01Icon} size={21} className="shrink-0 text-accent motion-safe:transition-transform group-open:rotate-45" aria-hidden="true" /></summary>
          <p className="pb-6 pr-8 text-sm leading-7 text-muted">{answer}</p>
        </details>)}</div>
      </div>
    </section>
  );
}

export function FinalCTA() {
  return (
    <section id="get-started" aria-labelledby="get-started-heading" className="closing-section">
      <div className="closing-inner">
        <div data-reveal className="closing-kicker"><span>ONE MORE THING</span><span>SMS / EMAIL / API</span></div>
        <div className="closing-layout">
          <div data-reveal><h2 id="get-started-heading">Your next message<br /><span>starts here.</span></h2><p className="closing-description">An order update. A timely reminder. A welcome email.<br className="hidden sm:block" /> Put PingStack to work for your business.</p></div>
          <div data-reveal data-reveal-delay="100" className="closing-action-column">
            <ClosingMessageScene />
            <a href={siteLinks.getStarted} className="closing-primary"><span>Start sending</span><HugeiconsIcon icon={ArrowUpRight01Icon} size={44} strokeWidth={1.4} aria-hidden="true" /></a>
            <div className="closing-secondary"><a href="#developers">Explore the API<HugeiconsIcon icon={ArrowRight01Icon} size={16} aria-hidden="true" /></a><a href={`${siteLinks.contact}?subject=Getting%20started%20with%20PingStack`}>Talk through your setup</a></div>
          </div>
        </div>
        <div data-reveal className="closing-footnote"><span>Built for the messages your customers need.</span><span>Every ping counts.</span></div>
      </div>
    </section>
  );
}

const footerGroups = [
  { label: "Product", links: [["Explore the workspace", "#how-it-works"], ["SMS & email", "#products"], ["Messaging use cases", "#use-cases"], ["Pricing", "#pricing"]] },
  { label: "Developers", links: [["API examples", "#developers"], ["Integration setup", "#api-notes"], ["Technical questions", `${siteLinks.contact}?subject=PingStack%20integration%20question`]] },
  { label: "Help & enquiries", links: [["Common questions", "#faq"], ["Contact the team", siteLinks.contact], ["Privacy enquiries", `${siteLinks.contact}?subject=PingStack%20privacy%20enquiry`]] },
];

export function Footer() {
  return (
    <footer id="about" className="site-footer" aria-label="PingStack footer">
      <div className="footer-inner">
        <div className="footer-top">
          <div data-reveal className="footer-brand-column">
            <a href="#top" className="footer-brand" aria-label="PingStack home"><BrandMark size={36} /><span>PingStack</span></a>
            <p>Business messaging today.<br />More ways to run your business tomorrow.</p>
            <a className="footer-contact" href={siteLinks.contact}><span>Talk to the team</span><span>support@pingstack.com<HugeiconsIcon icon={ArrowUpRight01Icon} size={16} aria-hidden="true" /></span></a>
          </div>
          <div className="footer-navigation">
            {footerGroups.map((group, index) => <nav key={group.label} aria-label={`Footer ${group.label}`} data-reveal data-reveal-delay={index * 70}><h3><span>0{index + 1}</span>{group.label}</h3><ul>{group.links.map(([label, href]) => <li key={label}><a href={href}>{label}</a></li>)}</ul></nav>)}
          </div>
        </div>
        <div data-reveal className="footer-signature" aria-hidden="true"><div className="footer-wordmark-crop"><span>PingStack<span className="footer-brand-period">.</span></span></div><p>Make the<br />connection.</p></div>
        <div className="footer-bottom"><p>© {new Date().getFullYear()} PingStack. All rights reserved.</p><p className="footer-market">Built with Nigerian businesses in mind.</p><a href="#top" className="footer-top-link">Back to top<HugeiconsIcon icon={ArrowRight01Icon} size={17} className="-rotate-90" aria-hidden="true" /></a></div>
      </div>
    </footer>
  );
}
