import React from "react";
import Link from "next/link";

const Navbar = () => {
  return (
    <header className="w-full bg-white border-b border-gray-100 py-4 px-6 md:px-12">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Left: Logo */}
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2 text-black font-extrabold text-2xl tracking-tight">
            {/* Custom SVG icon matching the jagged lines */}
            <svg className="w-7 h-7 text-black" viewBox="0 0 24 24" fill="currentColor">
              <path d="M3 16L7 10L11 16L15 10L19 16V8H21V18H17L13 12L9 18L5 12H3V16Z" />
            </svg>
            <span className="font-bold tracking-normal text-xl">mono</span>
          </Link>
        </div>

        {/* Center: Nav Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-800">
          <Link href="/products" className="hover:text-black transition-colors">Products</Link>
          <Link href="/use-cases" className="hover:text-black transition-colors">Use cases</Link>
          <Link href="/company" className="hover:text-black transition-colors">Company</Link>
          <Link href="/developers" className="hover:text-black transition-colors">Developers</Link>
          <Link href="/pricing" className="hover:text-black transition-colors">Pricing</Link>
        </nav>

        {/* Right: Actions (Flag, Log in, Sign up) */}
        <div className="flex items-center gap-4">
          {/* Country Flag (Nigeria) */}
          <div className="hidden sm:flex items-center justify-center w-7 h-5 rounded overflow-hidden border border-gray-200 shadow-sm">
            <span className="text-lg leading-none" role="img" aria-label="Nigeria">
              🇳🇬
            </span>
          </div>

          {/* Log In Button */}
          <Link
            href="/login"
            className="px-5 py-2 text-sm font-semibold text-gray-800 border border-gray-200 rounded-lg hover:border-gray-400 transition-colors"
          >
            Log in
          </Link>

          {/* Sign Up Button */}
          <Link
            href="/signup"
            className="px-5 py-2 text-sm font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 shadow-sm transition-colors"
          >
            Sign up
          </Link>
        </div>

      </div>
    </header>
  );
};

export default Navbar;