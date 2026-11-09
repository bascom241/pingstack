"use client";

import { HugeiconsIcon } from "@hugeicons/react";
import { ComputerIcon, Sun03Icon, Moon02Icon, ArrowDown01Icon } from "@hugeicons/core-free-icons";
import { useTheme, type ThemePreference } from "../lib/theme";

export default function ThemeSwitcher() {
  const { preference, setPreference } = useTheme();
  return (
    <div className="theme-switcher relative flex shrink-0 items-center rounded-lg border border-line bg-surface text-accent">
      <HugeiconsIcon icon={preference === "system" ? ComputerIcon : preference === "dark" ? Moon02Icon : Sun03Icon} size={17} aria-hidden="true" className="pointer-events-none absolute left-2.5" />
      <label htmlFor="color-theme" className="sr-only">Color theme</label>
      <select id="color-theme" value={preference} onChange={(event) => setPreference(event.target.value as ThemePreference)} className="min-h-10 w-[106px] cursor-pointer appearance-none rounded-lg bg-transparent py-2 pr-7 pl-8 text-xs font-semibold text-foreground">
        <option value="system">System</option><option value="light">Light</option><option value="dark">Dark</option>
      </select>
      <HugeiconsIcon icon={ArrowDown01Icon} size={13} aria-hidden="true" className="pointer-events-none absolute right-2" />
    </div>
  );
}
