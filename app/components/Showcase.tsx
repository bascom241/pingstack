"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

const ProductShowcase = () => {
  const products = [
    {
      id: 1,
      category: "Financial Data",
      title: "Connect",
      heading: "Securely link to customer financial accounts",
      description:
        "Connect lets your users securely share their financial data with you and use it to reduce fraud, make smarter decisions, and build better financial products.",
      image: "/login.jpg",
      iconColor: "#ff7655",
      ringColor: "#ffb89f",
      reverse: false,
    },
    {
      id: 2,
      category: "Identity Verification",
      title: "Lookup",
      heading: "Reliably verify customer identities",
      description:
        "Verify customer information instantly and confidently. Reduce fraud and make sure every customer interaction is backed by reliable identity data.",
      image: "/trans.PNG",
      iconColor: "#23a847",
      ringColor: "#8bd8bd",
      reverse: true,
    },
    {
      id: 3,
      category: "Messaging Infrastructure",
      title: "Deliver",
      heading: "Make every message count",
      description:
        "Send reliable transactional messages, OTPs and notifications through a powerful messaging infrastructure built for scale.",
      image: "/login.jpg",
      iconColor: "#0057b8",
      ringColor: "#9cc7f5",
      reverse: false,
    },
  ];

  return (
    <section className="relative bg-[#f5f5f5] px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[1180px]">

        {products.map((product, index) => (
          <div
            key={product.id}
            className={`
              sticky
              top-8
              min-h-[600px]
              overflow-hidden
              rounded-[24px]
              border
              border-black/[0.06]
              bg-[#fafafa]
              shadow-[0_12px_50px_rgba(0,0,0,0.10)]
              ${index !== 0 ? "-mt-24" : ""}
            `}
            style={{
              zIndex: index + 1,
            }}
          >
            <div
              className={`
                grid
                min-h-[600px]
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
                  px-8
                  py-16
                  sm:px-12
                  lg:px-14
                  xl:px-16
                  ${product.reverse ? "lg:order-2" : "lg:order-1"}
                `}
              >

                {/* CATEGORY */}

                <div className="mb-6 flex items-center gap-3">

                  <div className="flex h-5 w-5 items-center justify-center">
                    <span
                      className="block h-3 w-3 rotate-45 rounded-[2px]"
                      style={{
                        backgroundColor: product.iconColor,
                      }}
                    />
                  </div>

                  <span className="text-[14px] font-medium text-[#151515]">
                    {product.category}
                  </span>

                </div>

                {/* BLUE TITLE */}

                <span className="mb-5 text-[28px] font-semibold tracking-[-0.04em] text-[#0057b8]">
                  {product.title}
                </span>

                {/* HEADING */}

                <h2 className="max-w-[510px] text-[42px] font-semibold leading-[1.07] tracking-[-0.055em] text-black sm:text-[48px] lg:text-[52px]">
                  {product.heading}
                </h2>

                {/* DESCRIPTION */}

                <p className="mt-6 max-w-[510px] text-[18px] leading-[1.55] tracking-[-0.02em] text-[#777] sm:text-[20px]">
                  {product.description}
                </p>

                {/* LINK */}

                <Link
                  href="/docs"
                  className="group mt-8 inline-flex w-fit items-center gap-2 text-[15px] font-semibold text-[#0057b8]"
                >
                  Learn more

                  <span className="transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </Link>

              </div>

              {/* =========================
                  IMAGE
              ========================== */}

              <div
                className={`
                  relative
                  min-h-[450px]
                  overflow-hidden
                  lg:min-h-[600px]
                  ${product.reverse ? "lg:order-1" : "lg:order-2"}
                `}
              >

                {/* DECORATIVE RINGS */}

                <div
                  className="pointer-events-none absolute left-1/2 top-1/2 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full border"
                  style={{
                    borderColor: product.ringColor,
                  }}
                />

                <div
                  className="pointer-events-none absolute left-1/2 top-1/2 h-[430px] w-[430px] -translate-x-1/2 -translate-y-1/2 rounded-full border"
                  style={{
                    borderColor: product.ringColor,
                  }}
                />

                <div
                  className="pointer-events-none absolute left-1/2 top-1/2 h-[340px] w-[340px] -translate-x-1/2 -translate-y-1/2 rounded-full border"
                  style={{
                    borderColor: product.ringColor,
                  }}
                />

                {/* PHONE / PRODUCT IMAGE */}

                <div className="absolute left-1/2 top-1/2 h-[620px] w-[410px] -translate-x-1/2 -translate-y-1/2">
                  <Image
                    src={product.image}
                    alt={product.heading}
                    fill
                    className="object-contain"
                  />
                </div>

                {/* FLOATING ICON */}

                <div
                  className="absolute left-[10%] top-[68%] flex h-10 w-10 items-center justify-center rounded-full shadow-lg"
                  style={{
                    backgroundColor: product.iconColor,
                  }}
                >
                  <span className="text-lg text-white">↗</span>
                </div>

                <div className="absolute right-[10%] top-[38%] flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-md">
                  <span className="text-lg text-[#999]">↗</span>
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