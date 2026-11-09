"use client";

import { useEffect, useRef } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import { Message01Icon, Mail01Icon, Invoice01Icon, ArrowRight01Icon, ArrowUpRight01Icon } from "@hugeicons/core-free-icons";
import Link from "next/link";

const ProductShowcase = () => {
  const stackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const stack = stackRef.current;
    if (!stack) return;
    const cards = Array.from(stack.querySelectorAll<HTMLElement>("[data-showcase-card]"));
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;

    const paint = () => {
      frame = 0;
      cards.forEach((card, index) => {
        const next = cards[index + 1];
        const top = Number(card.dataset.pinTop || 0);
        const travel = Math.min(card.offsetHeight, window.innerHeight - top);
        const progress = next ? Math.max(0, Math.min(1, 1 - (next.getBoundingClientRect().top - top) / travel)) : 0;
        card.style.setProperty("--stack-scale", String(motion.matches ? 1 : 1 - progress * 0.035));
      });
    };
    const requestPaint = () => {
      if (!frame) frame = window.requestAnimationFrame(paint);
    };
    const measure = () => {
      cards.forEach((card) => {
        // Tall cards scroll fully into view before pinning at their bottom edge.
        const top = Math.min(24, window.innerHeight - card.offsetHeight - 24);
        card.dataset.pinTop = String(top);
        card.style.setProperty("--stack-top", `${top}px`);
      });
      requestPaint();
    };
    measure();
    const observer = typeof ResizeObserver !== "undefined" ? new ResizeObserver(measure) : null;
    cards.forEach((card) => observer?.observe(card));
    window.addEventListener("resize", measure);
    window.addEventListener("scroll", requestPaint, { passive: true });
    motion.addEventListener("change", requestPaint);
    return () => {
      observer?.disconnect();
      window.cancelAnimationFrame(frame);
      window.removeEventListener("resize", measure);
      window.removeEventListener("scroll", requestPaint);
      motion.removeEventListener("change", requestPaint);
    };
  }, []);

  const products = [
    {
      id: 1,
      category: "SMS Messaging",
      title: "Every message matters.",
      heading: "Keep customers in the loop with SMS",
      description:
        "Send OTPs, transaction alerts, reminders, and order updates through SMS. Connect messaging to your app with an API and make customer communication part of your everyday workflow.",
      icon: Message01Icon,
      iconColor: "var(--showcase-blue)",
      reverse: false,
    },
    {
      id: 2,
      category: "Email Sending",
      title: "More room to connect.",
      heading: "Send the emails your customers need",
      description:
        "From account verification to receipts and service updates, bring email into your product. Use PingStack to send the messages that help customers take the next step.",
      icon: Mail01Icon,
      iconColor: "var(--showcase-orange)",
      reverse: true,
    },
    {
      id: 3,
      category: "Business Tools · Coming Next",
      title: "Built to grow with you.",
      heading: "From customer messages to daily operations",
      description:
        "Messaging is the starting point. Customer records, invoices, payment tracking, and business insights are planned next, bringing more of your daily work into one place as PingStack grows.",
      icon: Invoice01Icon,
      iconColor: "var(--showcase-green)",
      reverse: false,
    },
  ];

  return (
    <section id="products" className="relative bg-canvas-muted px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
      <div ref={stackRef} className="showcase-stack mx-auto flex max-w-[1180px] flex-col gap-[clamp(5rem,18vh,11rem)] pb-8">

        {products.map((product, index) => (
          <div
            key={product.id}
            data-showcase-card
            className={`
              showcase-card
              min-h-0
              overflow-hidden
              rounded-[24px]
              border
              border-line
              bg-surface
              shadow-[0_12px_50px_rgba(0,0,0,0.10)]
            `}
            style={{
              zIndex: index + 1,
            }}
          >
            <div
              className={`
                grid
                lg:min-h-[560px]
                grid-cols-1
                lg:grid-cols-2
                ${product.reverse ? "lg:[&>*:first-child]:order-2" : ""}
              `}
            >

              {/* =========================
                  TEXT
              ========================== */}

              <div
                className={`
                  relative
                  z-20
                  flex
                  flex-col
                  justify-center
                  px-6
                  pt-8
                  pb-6
                  sm:px-10
                  sm:py-10
                  lg:px-12
                  lg:py-12
                  ${product.reverse ? "lg:order-2" : "lg:order-1"}
                `}
              >

                {/* CATEGORY */}

                <div className="mb-5 flex items-center gap-3">

                  <div className="flex h-5 w-5 items-center justify-center">
                    <HugeiconsIcon icon={product.icon} size={20} color={product.iconColor} aria-hidden="true" />
                  </div>

                  <span className="text-[14px] font-medium text-foreground">
                    {product.category}
                  </span>

                </div>

                {/* BLUE TITLE */}

                <span className="showcase-title mb-4 text-[22px] sm:text-[24px] font-semibold tracking-[-0.04em] text-accent">
                  {product.title}
                </span>

                {/* HEADING */}

                <h2 className="max-w-[510px] text-[32px] font-semibold leading-[1.07] tracking-[-0.055em] text-foreground sm:text-[40px] lg:text-[46px]">
                  {product.heading}
                </h2>

                {/* DESCRIPTION */}

                <p className="mt-5 max-w-[510px] text-[16px] leading-[1.55] tracking-[-0.02em] text-muted sm:text-[17px]">
                  {product.description}
                </p>

                {/* LINK */}

                {product.id === 3 ? (
                  <p className="mt-6 text-[15px] font-semibold text-accent">Coming next</p>
                ) : (<Link
                  href="#developers"
                  className="group mt-6 inline-flex w-fit items-center gap-2 text-[15px] font-semibold text-accent"
                >
                  Explore the API

                  <span className="transition-transform duration-300 group-hover:translate-x-1">
                    <HugeiconsIcon icon={ArrowRight01Icon} size={18} aria-hidden="true" />
                  </span>
                </Link>)}

              </div>

              {/* =========================
                  IMAGE
              ========================== */}

              <div
                className={`
                  relative
                  min-h-[240px] sm:min-h-[300px]
                  overflow-hidden
                  lg:min-h-[560px]
                  ${product.reverse ? "lg:order-1" : "lg:order-2"}
                `}
              >

                {/* DECORATIVE RINGS */}

                <div
                  className="showcase-ring pointer-events-none absolute left-1/2 top-1/2 h-[360px] w-[360px] lg:h-[520px] lg:w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full border"
                  style={{
                    borderColor: `color-mix(in srgb, ${product.iconColor} 20%, transparent)`,
                  }}
                />

                <div
                  className="showcase-ring pointer-events-none absolute left-1/2 top-1/2 h-[290px] w-[290px] lg:h-[430px] lg:w-[430px] -translate-x-1/2 -translate-y-1/2 rounded-full border"
                  style={{
                    borderColor: `color-mix(in srgb, ${product.iconColor} 20%, transparent)`,
                  }}
                />

                <div
                  className="showcase-ring pointer-events-none absolute left-1/2 top-1/2 h-[230px] w-[230px] lg:h-[340px] lg:w-[340px] -translate-x-1/2 -translate-y-1/2 rounded-full border"
                  style={{
                    borderColor: `color-mix(in srgb, ${product.iconColor} 20%, transparent)`,
                  }}
                />

                {/* Large product icon inside the existing decorative rings */}
                <div aria-hidden="true" style={{ color: product.iconColor, borderColor: `color-mix(in srgb, ${product.iconColor} 15%, transparent)` }} className="showcase-icon-disc absolute left-1/2 top-1/2 flex h-[180px] w-[180px] lg:h-[260px] lg:w-[260px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border bg-surface sm:h-[220px] sm:w-[220px] lg:h-[280px] lg:w-[280px]">
                  <HugeiconsIcon
                    icon={product.icon}
                    size={180}
                    strokeWidth={1.2}
                    className="h-28 w-28 sm:h-36 sm:w-36 lg:h-[170px] lg:w-[170px]"
                  />
                </div>

                {/* FLOATING ICON */}

                <div
                  className="showcase-float absolute left-[10%] top-[68%] flex h-10 w-10 items-center justify-center rounded-full shadow-lg"
                  style={{
                    backgroundColor: product.iconColor,
                  }}
                >
                  <HugeiconsIcon icon={ArrowUpRight01Icon} size={20} color="white" aria-hidden="true" />
                </div>

                <div className="showcase-float absolute right-[10%] top-[38%] flex h-10 w-10 items-center justify-center rounded-full bg-surface shadow-md">
                  <HugeiconsIcon icon={ArrowUpRight01Icon} size={20} color={product.iconColor} aria-hidden="true" />
                </div>

              </div>

            </div>
          </div>
        ))}

      </div>
    </section>
  );
};

export default ProductShowcase;