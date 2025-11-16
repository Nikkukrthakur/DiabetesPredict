"use client";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@heroui/button";

const HealthyLifestyle = () => {
  return (
    <div className="bg-gray-200">
      {/* Hero Section */}
      <section className="relative bg-[url('/image.png')] bg-cover bg-center bg-no-repeat bg-fixed">
        <div className="absolute inset-0 bg-gradient-to-r from-white/90 via-white/70 to-transparent pointer-events-none" />
        <div className="relative max-w-7xl px-6 py-24">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold text-slate-900">
            Live a Healthy Lifestyle
          </h1>
          <p className="mt-5 max-w-3xl text-lg sm:text-xl text-slate-600">
            Simple and effective changes in your diet, exercise, and daily
            habits can significantly reduce the risk of diabetes.
          </p>
        </div>
      </section>

      {/* Key Pillars Section */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-slate-800 text-center mb-12">
          Key Pillars of a Healthy Lifestyle
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* 1. Diet */}
          <motion.div
            whileHover={{ scale: 1.03 }}
            className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition"
          >
            <h3 className="text-xl font-semibold text-green-600">
              🥗 Healthy Diet
            </h3>
            <ul className="mt-4 text-slate-700 space-y-2 list-disc list-outside pl-4">
              <li>Include whole grains, leafy vegetables, and proteins.</li>
              <li>Avoid sugary drinks and processed foods.</li>
              <li>Eat smaller meals at regular intervals.</li>
            </ul>
          </motion.div>

          {/* 2. Exercise */}
          <motion.div
            whileHover={{ scale: 1.03 }}
            className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition"
          >
            <h3 className="text-xl font-semibold text-orange-600">
              🏃‍♂️ Exercise Daily
            </h3>
            <ul className="mt-4 text-slate-700 space-y-2 list-disc list-outside pl-4">
              <li>Walk or exercise at least 30 minutes every day.</li>
              <li>Try yoga, stretching, or light jogging.</li>
              <li>Take small breaks if sitting for long hours.</li>
            </ul>
          </motion.div>

          {/* 3. Daily Habits */}
          <motion.div
            whileHover={{ scale: 1.03 }}
            className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition"
          >
            <h3 className="text-xl font-semibold text-blue-600">
              🛌 Healthy Daily Habits
            </h3>
            <ul className="mt-4 text-slate-700 space-y-2 list-disc list-outside pl-4">
              <li>Sleep 7–8 hours every night.</li>
              <li>Drink 2–3 liters of water daily.</li>
              <li>Practice meditation or deep breathing.</li>
            </ul>
          </motion.div>

          {/* 4. Stress Management */}
          <motion.div
            whileHover={{ scale: 1.03 }}
            className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition"
          >
            <h3 className="text-xl font-semibold text-purple-600">
              🧘 Stress Management
            </h3>
            <ul className="mt-4 text-slate-700 space-y-2 list-disc list-outside pl-4">
              <li>Meditate or practice yoga daily.</li>
              <li>Listen to calming music or read.</li>
              <li>Stay connected with positive people.</li>
            </ul>
          </motion.div>

          {/* 5. Hydration */}
          <motion.div
            whileHover={{ scale: 1.03 }}
            className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition"
          >
            <h3 className="text-xl font-semibold text-cyan-600">
              💧 Stay Hydrated
            </h3>
            <ul className="mt-4 text-slate-700 space-y-2 list-disc list-outside pl-4">
              <li>Drink 2–3 liters of water per day.</li>
              <li>Prefer water, coconut water, or lemon water.</li>
              <li>Avoid sugary drinks and sodas.</li>
            </ul>
          </motion.div>

          {/* 6. Regular Checkups */}
          <motion.div
            whileHover={{ scale: 1.03 }}
            className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition"
          >
            <h3 className="text-xl font-semibold text-red-600">
              🩺 Regular Checkups
            </h3>
            <ul className="mt-4 text-slate-700 space-y-2 list-disc list-outside pl-4">
              <li>Monitor blood sugar levels regularly.</li>
              <li>Check blood pressure and cholesterol.</li>
              <li>Visit your doctor every 6–12 months.</li>
            </ul>
          </motion.div>
        </div>

        {/* CTA Button (HeroUI + Motion + Link) */}
        <div className="text-center mt-16">
          <Link href="/question">
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block"
            >
              <Button
                color="primary"
                radius="full"
                size="lg"
                className="px-8 py-6 text-white font-medium shadow-lg hover:shadow-2xl"
              >
                🔍 Check Your Diabetes Risk
              </Button>
            </motion.div>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HealthyLifestyle;
