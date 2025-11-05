export default function Home() {
  const riskFactors = [
    {
      icon: "❤️",
      title: "Family History",
      description:
        "Having a parent or sibling with diabetes increases your risk.",
      color: "text-red-500",
    },
    {
      icon: "📉",
      title: "Physical Inactivity",
      description: "Less active lifestyle contributes to diabetes risk.",
      color: "text-blue-500",
    },
    {
      icon: "🍏",
      title: "Poor Diet",
      description:
        "High consumption of processed foods and sugars increases risk.",
      color: "text-green-500",
    },
    {
      icon: "📈",
      title: "High BMI",
      description:
        "Being overweight is a primary risk factor for type 2 diabetes.",
      color: "text-purple-500",
    },
  ];

  return (
    <main className="min-h-screen bg-gray-200 px-6 py-12 flex flex-col items-center">
      {/* Heading */}
      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 text-center">
        Understanding Diabetes Risk Factors
      </h1>
      <p className="text-gray-600 text-center max-w-2xl mt-4 mb-10">
        Diabetes is a chronic condition that affects how your body processes
        blood sugar. Understanding risk factors can help you take preventive
        measures.
      </p>

      {/* Cards */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 max-w-6xl">
        {riskFactors.map((factor, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-sm border p-6 hover:shadow-md transition"
          >
            <div className={`text-3xl mb-3 ${factor.color}`}>{factor.icon}</div>
            <h3 className="text-lg font-semibold text-gray-900">
              {factor.title}
            </h3>
            <p className="text-gray-600 text-sm mt-2">{factor.description}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
