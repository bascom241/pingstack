"use client";

import Link from "next/link";
import { HugeiconsIcon } from "@hugeicons/react";
import { Menu01Icon, Cancel01Icon } from "@hugeicons/core-free-icons";
import { siteLinks } from "../lib/site-links";
import BrandMark from "./BrandMark";
import ThemeSwitcher from "./ThemeSwitcher";

const navigation = [
  ["SMS & Email", "#products"], ["Use cases", "#use-cases"],
  ["Company", "#about"], ["Developers", "#developers"], ["Pricing", "#pricing"],
];

export default function Navbar() {
  return (
    <header id="top" data-reveal className="site-header relative z-50 w-full border-b border-line bg-surface px-4 py-4 sm:px-6 lg:px-12">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
        <Link href="/" className="site-wordmark flex shrink-0 items-center gap-2 text-xl font-bold tracking-tight text-foreground"><BrandMark size={34} /><span>PingStack</span></Link>
        <nav aria-label="Main navigation" className="hidden items-center gap-6 text-sm font-medium text-foreground xl:flex">{navigation.map(([label, href]) => <a key={href} href={href} className="transition-colors hover:text-accent">{label}</a>)}</nav>
        <div className="flex items-center gap-2 sm:gap-3">
          <ThemeSwitcher />
          <a href={siteLinks.hasAppUrl ? siteLinks.login : siteLinks.contact} className="header-secondary hidden rounded-lg border border-line px-4 py-2 text-sm font-semibold text-foreground transition-colors hover:border-accent md:block">{siteLinks.hasAppUrl ? "Log in" : "Contact us"}</a>
          <a href={siteLinks.getStarted} className="header-primary hidden rounded-lg bg-[#004aad] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#003b8a] sm:inline-flex">Get started</a>
          <details className="group xl:hidden" onKeyDown={(event) => { if (event.key === "Escape") { event.currentTarget.removeAttribute("open"); event.currentTarget.querySelector("summary")?.focus(); } }}>
            <summary aria-label="Toggle navigation menu" className="flex cursor-pointer list-none items-center justify-center rounded-lg border border-line p-2 text-accent [&::-webkit-details-marker]:hidden"><HugeiconsIcon icon={Menu01Icon} size={22} className="group-open:hidden" aria-hidden="true" /><HugeiconsIcon icon={Cancel01Icon} size={22} className="hidden group-open:block" aria-hidden="true" /></summary>
            <nav onClick={(event) => { if ((event.target as HTMLElement).closest("a")) event.currentTarget.parentElement?.removeAttribute("open"); }} aria-label="Mobile navigation" className="absolute top-full right-0 left-0 border-b border-line bg-surface p-5 shadow-lg"><div className="mx-auto grid max-w-7xl gap-1">{navigation.map(([label, href]) => <a key={href} href={href} className="rounded-xl px-4 py-3 text-sm font-medium text-foreground hover:bg-inset hover:text-accent">{label}</a>)}<a href={siteLinks.getStarted} className="rounded-xl px-4 py-3 text-sm font-semibold text-accent">Get started</a><a href={siteLinks.contact} className="rounded-xl px-4 py-3 text-sm font-medium text-accent">Contact support</a></div></nav>
          </details>
        </div>
      </div>
    </header>
  );
}
