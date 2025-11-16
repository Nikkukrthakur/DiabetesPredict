"use client";

import React, { useMemo } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";
import Link from "next/link";
import { Button } from "@heroui/button";

type ClinicalKeys =
  | "glucose"
  | "bloodPressure"
  | "skinThickness"
  | "insulin"
  | "bmi"
  | "diabetesPedigreeFunction";

type Prediction = {
  prediction: "Diabetic" | "Non-Diabetic" | "Low" | "High" | string;
  probability: number;
  message?: string;
};

type ClinicalData = Partial<Record<ClinicalKeys, number>>;

const recommendedValues: Record<ClinicalKeys, number> = {
  glucose: 100,
  bloodPressure: 80,
  skinThickness: 20,
  insulin: 85,
  bmi: 25,
  diabetesPedigreeFunction: 0.5,
};

const units: Record<ClinicalKeys, string> = {
  glucose: "mg/dL",
  bloodPressure: "mm Hg",
  bmi: "kg/m²",
  skinThickness: "mm",
  insulin: "μU/mL",
  diabetesPedigreeFunction: "",
};

const formatLabel = (key: string) =>
  key.replace(/([A-Z])/g, " $1").replace(/^./, (s) => s.toUpperCase());

function safeParseJSON<T>(raw: string | null): T | null {
  if (!raw) return null;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}

export default function ResultPage() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const prediction = safeParseJSON<Prediction>(searchParams.get("prediction"));
  const clinicalData = safeParseJSON<ClinicalData>(
    searchParams.get("clinicalData")
  );

  const chartData = useMemo(
    () =>
      (Object.keys(recommendedValues) as ClinicalKeys[]).map((key) => ({
        name: key,
        actual: (clinicalData?.[key] ?? 0) as number,
        recommended: recommendedValues[key],
      })),
    [clinicalData]
  );

  if (!prediction || !clinicalData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-700">
            No prediction data found.
          </h2>
          <button
            className="mt-4 inline-flex items-center justify-center rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
            onClick={() => router.push("/quiz")}
          >
            Take Assessment
          </button>
        </div>
      </div>
    );
  }

  const isHighRisk =
    prediction.prediction.toLowerCase().includes("diab") ||
    prediction.prediction.toLowerCase().includes("high");

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <div className="relative mx-4 mt-6 rounded-3xl border border-gray-200 bg-gradient-to-r from-blue-100 to-orange-100 py-4 px-6 text-[#003366]">
        <div className="flex items-center justify-between">
          <div className="flex gap-9 font-semibold text-lg"></div>

          <h2 className="absolute left-1/2 -translate-x-1/2 text-xl font-bold bg-gradient-to-r from-blue-700 to-purple-800 bg-clip-text text-transparent">
            Your Health Overview
          </h2>
        </div>
      </div>

      <main className="flex-grow px-4 py-8 max-w-5xl mx-auto w-full">
        {/* Assessment Result */}
        <div
          className={`p-6 mb-8 rounded-xl shadow-md border-l-4 ${
            isHighRisk
              ? "bg-red-50 border-red-500"
              : "bg-green-50 border-green-500"
          }`}
        >
          <div className="flex justify-between items-start gap-4">
            <div>
              <h2 className="text-xl font-semibold text-gray-800">
                Your Assessment Result
              </h2>
              <p className="mt-2 mb-3 text-3xl font-bold text-gray-900">
                {isHighRisk ? "High Risk" : "Low Risk"}
              </p>
              <p className="text-gray-700">{prediction.message}</p>
              <div className="mt-4 flex flex-wrap gap-3">
                <button
                  onClick={() => router.push("/quiz")}
                  className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                >
                  New Assessment
                </button>
                <button
                  onClick={() => router.push("/recommendation")}
                  className="inline-flex items-center justify-center rounded-lg bg-green-600 px-4 py-2 text-white hover:bg-green-700"
                >
                  Get Recommendations
                </button>
              </div>
            </div>

            <div
              className={`h-20 w-20 shrink-0 rounded-full text-white flex items-center justify-center text-2xl font-bold ${
                isHighRisk ? "bg-red-500" : "bg-green-500"
              }`}
            >
              {Math.round((prediction.probability ?? 0) * 100)}%
            </div>
          </div>
        </div>

        {/* Chart */}
        <div className="bg-white rounded-xl shadow p-6">
          <h3 className="text-lg font-bold mb-4">
            Actual vs Recommended Clinical Features
          </h3>
          <p className="text-sm text-gray-600 mb-3">
            Blue bars show your predicted clinical metrics. Green bars are
            healthy recommended ranges.
          </p>

          <div className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                layout="vertical"
                data={chartData}
                margin={{ top: 10, right: 30, left: 50, bottom: 10 }}
              >
                <XAxis type="number" domain={[0, "auto"]} />
                <YAxis
                  type="category"
                  dataKey="name"
                  width={180}
                  tickFormatter={formatLabel}
                />
                <Tooltip
                  formatter={(
                    val: any,
                    _name: any,
                    item: any,
                    _index: number
                  ) => {
                    const metric = (item?.payload?.name ?? "") as ClinicalKeys;
                    const u = units[metric] ?? "";
                    const v = Number(val);
                    return [
                      `${isFinite(v) ? v.toFixed(1) : v} ${u}`,
                      formatLabel(metric),
                    ];
                  }}
                />
                <Legend />
                <Bar
                  dataKey="actual"
                  fill="#3182ce"
                  name="Actual"
                  label={{ position: "right" }}
                />
                <Bar dataKey="recommended" fill="#82ca9d" name="Recommended" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Interpretation Table */}
        <div className="mt-8 rounded-xl shadow bg-gradient-to-r from-green-300 via-green-100 to-gray-100 p-6">
          <h4 className="text-md font-semibold mb-3">Interpretation Table</h4>
          <div className="overflow-hidden rounded-xl border border-gray-300 bg-white">
            <table className="min-w-full table-auto text-sm text-left">
              <thead className="bg-gray-50">
                <tr>
                  <th className="p-2 border">Metric</th>
                  <th className="p-2 border">Your Value</th>
                  <th className="p-2 border">Recommended</th>
                  <th className="p-2 border">Units</th>
                </tr>
              </thead>
              <tbody>
                {chartData.map((item) => (
                  <tr key={item.name} className="odd:bg-white even:bg-gray-50">
                    <td className="p-2 border">{formatLabel(item.name)}</td>
                    <td className="p-2 border">
                      {Number(item.actual).toFixed(1)}
                    </td>
                    <td className="p-2 border">{item.recommended}</td>
                    <td className="p-2 border">
                      {units[item.name as ClinicalKeys]}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Start New Assessment Button */}

        <div className="mt-10 mb-8 flex flex-col items-center">
          <Link href={"/question"}>
            <Button className="inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-3 text-white text-lg font-semibold shadow-xl hover:from-blue-700 hover:to-indigo-700 transition">
              🔁 Start New Assessment
            </Button>
          </Link>
          <p className="mt-3 text-sm text-gray-600 max-w-xl text-center">
            Begin a fresh assessment to check your health status again with
            updated data.
          </p>
        </div>
        {/* </Link> */}
      </main>
    </div>
  );
}
