import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "./usecase-scene.css";
import "./workspace.css";
import "./closing.css";
import "./mobile.css";
import Navbar from "./components/Navbar";
import { themeInitializationScript } from "./lib/theme-script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PingStack | SMS & Email for Your Business",
  description: "Connect with customers through SMS and email. Explore PingStack messaging tools, API integration, and business communication workflows.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head><script id="theme-initialization" dangerouslySetInnerHTML={{ __html: themeInitializationScript }} /></head>
      <body className="min-h-full flex flex-col">
        {/* Navbar is now properly nested inside the body */}
        <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[100] focus:rounded-lg focus:bg-surface focus:px-5 focus:py-3 focus:text-accent">Skip to content</a>
        <Navbar />
        {children}
      </body>
    </html>
  );
}