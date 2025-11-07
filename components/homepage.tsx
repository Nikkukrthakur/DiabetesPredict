"use client";
import React from "react";
import Riskcard from "@/components/lower";
import { motion } from "framer-motion";

export default function Homepage() {
  return (
    <div className="bg-gray-200">
      {/* Hero Section with Tailwind background image */}
      <section className="relative bg-[url('/backj.png')] bg-cover bg-center bg-no-repeat bg-fixed">
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-white/90 via-white/70 to-transparent" />

        {/* Hero content */}
        <div className="relative  max-w-7xl px-6 py-28 flex">
          <div className="px-0 md:px-12">
            <div className="inline-flex rounded-full bg-blue-50/80 ring-1 ring-blue-200 px-4 py-2 text-sm font-medium text-blue-700 shadow-sm">
              Early Detection Saves Lives
            </div>

            <h1 className="mt-6 text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-slate-900">
              Predict Your Diabetes Risk
            </h1>

            <p className="mt-5 max-w-3xl text-lg sm:text-xl leading-8 text-slate-600">
              Use our advanced AI model to assess your diabetes risk based on
              key health metrics. Get personalized recommendations for a
              healthier future.
            </p>

            <div className="py-10 md:py-14">
              <div className="flex flex-wrap gap-x-10 gap-y-3 text-slate-800">
                <div>📈 Instant Analysis</div>
                <div>🛡️ Private &amp; Secure</div>
                <div>💙 Personalized Care</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Floating CTA with extra gap above & below */}
      <div className="flex justify-center mt-20 mb-16">
        <motion.div
          initial={{ y: 0 }}
          animate={{ y: [-5, 5, -5] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="relative"
        >
          {/* Glow */}
          <motion.span
            className="absolute inset-0 rounded-full blur-xl"
            animate={{ opacity: [0.4, 0.8, 0.4], scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            style={{
              // allowed: this is just a gradient color, not layout
              background:
                "radial-gradient(circle, rgba(59,130,246,0.6), rgba(59,130,246,0.1), transparent)",
            }}
          />
          <motion.button
            whileHover={{ scale: 1.1, rotate: "2deg" }}
            whileTap={{ scale: 0.95 }}
            className="relative px-8 py-6 bg-blue-600 text-white rounded-full text-lg font-medium shadow-lg hover:shadow-2xl"
          >
            🔍 Predict Diabetes Risk
          </motion.button>
        </motion.div>
      </div>

      {/* Risk cards */}
      <section>
        <Riskcard />
      </section>
    </div>
  );
}
