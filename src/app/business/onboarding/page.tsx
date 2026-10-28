"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const STEPS = [
  {
    emoji: "✅",
    title: "You're in!",
    body: "Your venue is set up on Dealeo. Customers in Alicante can already find you. Here's a quick tour of what you can do.",
    tip: null,
  },
  {
    emoji: "📋",
    title: "Set up a standing deal",
    body: "Create a happy hour or fixed offer with start and end times. It appears automatically in the app every day — no daily work needed.",
    tip: "e.g. Happy Hour · Mon–Fri · 17:00–19:00 · customers see it all day",
  },
  {
    emoji: "🔴",
    title: "Go live anytime",
    body: "Got empty tables right now? Tap 'Go Live Now' on any deal. Nearby customers get a push notification instantly and the deal appears at the top of the app.",
    tip: "Choose how long: 30 min, 1h, 2h, or no limit",
  },
  {
    emoji: "🎟️",
    title: "Redeemable vs Informational",
    body: "Redeemable deals require a QR scan — great for tracking exactly how many customers used the offer. Informational deals display your offer and customers just walk in and ask.",
    tip: "You can use both types — mix and match",
  },
];

export default function BusinessOnboarding() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const isLast = step === STEPS.length - 1;
  const s = STEPS[step];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="bg-white border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-4 h-14 flex items-center justify-between">
          <Link href="/" className="text-2xl font-black">
            <span className="text-orange-500">Deal</span><span className="text-teal-600">eo</span>
          </Link>
          <button
            onClick={() => router.push("/business/dashboard")}
            className="text-sm text-gray-400 hover:text-gray-600"
          >
            Skip →
          </button>
        </div>
      </header>

      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 w-full max-w-md text-center">

          {/* Progress bar */}
          <div className="flex gap-1.5 justify-center mb-8">
            {STEPS.map((_, i) => (
              <div
                key={i}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === step ? "bg-orange-500 w-8" : i < step ? "bg-orange-200 w-4" : "bg-gray-200 w-4"
                }`}
              />
            ))}
          </div>

          <div className="text-6xl mb-4">{s.emoji}</div>
          <h2 className="text-xl font-black text-gray-900 mb-2">{s.title}</h2>
          <p className="text-gray-500 text-sm leading-relaxed mb-4">{s.body}</p>

          {s.tip && (
            <p className="text-xs bg-orange-50 text-orange-600 font-medium px-4 py-2.5 rounded-xl inline-block mb-2">
              💡 {s.tip}
            </p>
          )}

          <div className="mt-6 flex flex-col gap-2">
            <button
              onClick={isLast ? () => router.push("/business/dashboard/new-deal") : () => setStep(step + 1)}
              className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3.5 rounded-2xl transition-colors"
            >
              {isLast ? "Create your first deal →" : "Next →"}
            </button>
            {!isLast && (
              <button
                onClick={() => router.push("/business/dashboard")}
                className="text-sm text-gray-400 hover:text-gray-600 py-1"
              >
                Skip to dashboard
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
