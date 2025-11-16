"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import Pulse from "@/public/pulse.png";

const Nav = () => {
  return (
    <div>
      <nav className="w-full bg-white border-2 border-gray-200 shadow-2xl py-5 fixed top-0 left-0 z-50">
        <div className="px-6 sm:px-10 lg:px-32">
          <div className="flex items-center justify-between">
            {/* Logo Section */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center">
                <Image
                  src={Pulse}
                  alt="DiabetesPredict logo"
                  width={30}
                  height={30}
                />
              </div>

              <div className="flex flex-col space-y-2">
                <div className="text-xl font-bold text-blue-800">
                  DiabetesPredict
                </div>
                <div className="text-sm text-gray-500 -mt-1">
                  AI-Powered Risk Assessment
                </div>
              </div>
            </div>

            <div className="hidden md:flex items-center gap-6">
              <Link
                href="/healthy"
                className="text-gray-700 hover:text-blue-800 transition"
              >
                Healthy Lifestyle
              </Link>
              <Link
                href="/how-it-works"
                className="text-gray-700 hover:text-blue-800 transition"
              >
                How it Works
              </Link>
              <Link
                href="/auth"
                className="px-4 py-2 rounded-xl border border-blue-200 text-blue-800 hover:bg-blue-50 transition"
              >
                Login / Register
              </Link>
            </div>

            {/* Mobile: simple link group */}
            <div className="md:hidden">
              <details className="relative">
                <summary className="list-none cursor-pointer px-3 py-2 rounded-lg border border-gray-200 text-gray-700">
                  Menu
                </summary>
                <div className="absolute right-0 mt-2 w-56 rounded-xl border bg-white shadow-xl p-3 space-y-2">
                  <Link
                    href="/healthy-lifestyle"
                    className="block px-3 py-2 rounded-lg hover:bg-gray-50"
                  >
                    Healthy Lifestyle
                  </Link>
                  <Link
                    href="/how-it-works"
                    className="block px-3 py-2 rounded-lg hover:bg-gray-50"
                  >
                    How it Works
                  </Link>
                  <Link
                    href="/auth"
                    className="block px-3 py-2 rounded-lg hover:bg-gray-50"
                  >
                    Login / Register
                  </Link>
                </div>
              </details>
            </div>
          </div>
        </div>
      </nav>

      {/* Spacer for fixed nav */}
      <div className="h-20"></div>
    </div>
  );
};

export default Nav;
