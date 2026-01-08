"use client";

import React, { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

type QuizOption = string;

type QuestionBase = {
  id:
    | "smoking"
    | "alcohol"
    | "exercise"
    | "diet"
    | "water"
    | "sleep"
    | "meals"
    | "sugarIntake"
    | "stress"
    | "screenTime"
    | "fruitVeg"
    | "familyHistory"
    | "gender"
    | "pregnancies"
    | "age";
  question: string;
};

type ChoiceQuestion = QuestionBase & {
  options: QuizOption[];
  inputType?: never;
  condition?: (answers: Record<string, any>) => boolean;
};

type InputQuestion = QuestionBase & {
  inputType: "number";
  options?: never;
  condition?: (answers: Record<string, any>) => boolean;
};

type Question = ChoiceQuestion | InputQuestion;

export const quizQuestions: Question[] = [
  { id: "gender", question: "Gender", options: ["Male", "Female", "Other"] },
  {
    id: "smoking",
    question: "Cigarettes per day",
    options: ["None", "1-3", "4-7", "8-10", "10+"],
  },
  {
    id: "alcohol",
    question: "Alcohol consumption",
    options: [
      "Never",
      "Occasionally (1–2/week)",
      "Regularly (3–5/week)",
      "Daily",
    ],
  },
  {
    id: "exercise",
    question: "Morning exercise duration",
    options: ["None", "<15 mins", "15-30 mins", "30-60 mins", "1+ hour"],
  },
  {
    id: "diet",
    question: "Daily diet quality",
    options: ["Healthy", "Average", "High sugar/junk food"],
  },
  {
    id: "water",
    question: "Water intake per day",
    options: ["<1L", "1-2L", "2-3L", "3+L"],
  },
  {
    id: "sleep",
    question: "Sleep quality",
    options: ["<4 hrs", "4-6 hrs", "6-8 hrs", "8+ hrs"],
  },
  {
    id: "meals",
    question: "Regular meal timing",
    options: ["Always", "Mostly", "Rarely", "Never"],
  },
  {
    id: "sugarIntake",
    question: "Sugary snacks/desserts",
    options: ["Rarely", "1–2/week", "3–5/week", "Daily"],
  },
  {
    id: "stress",
    question: "Daily stress level",
    options: ["Low", "Moderate", "High", "Very High"],
  },
  {
    id: "screenTime",
    question: "Daily screen time",
    options: ["<1 hr", "1–3 hrs", "3–5 hrs", "5+ hrs"],
  },
  {
    id: "fruitVeg",
    question: "Fruits & veggies frequency",
    options: ["Daily", "Few times/week", "Rarely", "Never"],
  },
  {
    id: "familyHistory",
    question: "Family history of diabetes",
    options: ["No", "One parent", "Both parents"],
  },
  {
    id: "pregnancies",
    question: "Number of pregnancies",
    options: ["0", "1", "2", "3", "4+"],
    condition: (answers) =>
      answers.gender === "Female" || answers.gender === "Other",
  },
  { id: "age", question: "Age (years)", inputType: "number" },
];

type Answers = Record<string, string | number>;

export default function QuizPage() {
  const router = useRouter();
  const [answers, setAnswers] = useState<Answers>({});
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const ageOptions = useMemo(
    () => Array.from({ length: 91 }, (_, i) => `${i + 10}`),
    []
  );

  const visibleQuestions = useMemo(() => {
    return quizQuestions.filter((q) => {
      if ("condition" in q && typeof q.condition === "function")
        return q.condition(answers);
      return true;
    });
  }, [answers]);

  const handleSelect = (id: QuestionBase["id"], value: string) => {
    setAnswers((prev) => {
      if (id === "gender" && value === "Male") {
        const { pregnancies, ...rest } = prev;
        return { ...rest, [id]: value };
      }
      return { ...prev, [id]: value };
    });
    setErrors((e) => ({ ...e, [id]: "" }));
  };

  const validate = () => {
    const nextErrors: Record<string, string> = {};
    visibleQuestions.forEach((q) => {
      const val = answers[q.id];
      if (!val && val !== 0) nextErrors[q.id] = "Please select an option.";
    });
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const mockPredict = (data: Answers) => {
    const risky = ["High sugar/junk food", "Daily", "8-10", "10+"];
    const riskScore =
      (data.diet === risky[0] ? 1 : 0) +
      (data.alcohol === risky[1] ? 1 : 0) +
      (data.smoking === risky[2] || data.smoking === risky[3] ? 1 : 0) +
      ((data.exercise as string) === "None" ? 1 : 0);
    const prob = Math.min(0.2 + riskScore * 0.2, 0.95);
    const out = {
      prediction: prob > 0.5 ? "High" : "Low",
      probability: prob,
      message:
        prob > 0.5
          ? "Your lifestyle indicators suggest higher risk."
          : "Your lifestyle indicators suggest lower risk.",
      clinicalData: {
        glucose: 90 + Math.round(prob * 40),
        bloodPressure: 70 + Math.round(prob * 20),
        skinThickness: 15 + Math.round(prob * 10),
        insulin: 60 + Math.round(prob * 70),
        bmi: 20 + Math.round(prob * 10),
        diabetesPedigreeFunction: Number((0.3 + prob * 0.7).toFixed(2)),
      },
    };
    return out;
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      setLoading(true);

      let data: {
        prediction: string;
        probability: number;
        message?: string;
        clinicalData: Record<string, number>;
      };

      if (process.env.NEXT_PUBLIC_API_BASE) {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/predict`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(answers),
        });
        if (!res.ok) {
          const err = await res.json().catch(() => ({}));
          throw new Error(err?.detail || "Prediction failed");
        }
        data = await res.json();
      } else {
        data = mockPredict(answers);
      }

      setSubmitted(true);

      const predictionParam = encodeURIComponent(
        JSON.stringify({
          prediction: data.prediction,
          probability: data.probability,
          message: data.message,
        })
      );
      const clinicalParam = encodeURIComponent(
        JSON.stringify(data.clinicalData)
      );

      // IMPORTANT: your result page is /result
      router.push(
        `/result?prediction=${predictionParam}&clinicalData=${clinicalParam}`
      );
    } catch (err: any) {
      alert(err?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-5xl px-4 py-10">
        <header className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">
            Lifestyle & Health Quiz
          </h1>
          <p className="mt-2 text-gray-600">
            Select the best option for each field.
          </p>
        </header>

        <form
          onSubmit={onSubmit}
          className="space-y-8 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-200"
        >
          <div className="grid grid-cols-1 gap-y-6 md:grid-cols-2 gap-x-32">
            {visibleQuestions.map((q) => {
              const isAge = q.id === "age";
              const opts =
                "options" in q && q.options
                  ? q.options
                  : isAge
                    ? ageOptions
                    : [];
              return (
                <div key={q.id}>
                  <label className="mb-2 block text-sm font-bold text-gray-900">
                    {q.question} <span className="text-rose-500">*</span>
                  </label>

                  <select
                    value={(answers[q.id] as string) ?? ""}
                    onChange={(e) => handleSelect(q.id, e.target.value)}
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-gray-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                  >
                    <option value="" disabled>
                      {isAge ? "Select age" : "Select option"}
                    </option>
                    {opts.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>

                  {errors[q.id] && (
                    <p className="mt-2 text-sm text-rose-600">{errors[q.id]}</p>
                  )}
                </div>
              );
            })}
          </div>

          <div className="flex flex-col items-center justify-center space-y-2">
            <button
              type="submit"
              disabled={loading}
              className="rounded-xl bg-blue-600 px-5 py-2.5 font-semibold text-white shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300 disabled:opacity-70"
            >
              {loading ? "Analyzing..." : "Submit"}
            </button>
          </div>
        </form>

        {submitted && (
          <div className="mt-8 rounded-2xl bg-green-50 p-5 ring-1 ring-green-200">
            <h2 className="mb-2 text-xl font-semibold text-green-900">
              Submitted!
            </h2>
            <p className="text-gray-700">Redirecting to your results…</p>
          </div>
        )}
      </div>
    </main>
  );
}
