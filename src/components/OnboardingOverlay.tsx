"use client";

import { useState, useEffect } from "react";
import { useLang } from "@/context/LanguageContext";

const SLIDES = [
  {
    emoji: "🎉",
    en: { title: "Welcome to Dealeo", body: "Discover the best food & drink deals near you in Alicante — live offers, happy hours, and more." },
    es: { title: "Bienvenido a Dealeo", body: "Descubre las mejores ofertas de comida y bebida cerca de ti en Alicante." },
  },
  {
    emoji: "🔴",
    en: { title: "Live Deals", body: "Bars push time-limited discounts straight to you. Just show up and order — no booking or reservation needed." },
    es: { title: "Ofertas en Vivo", body: "Los bares lanzan descuentos por tiempo limitado. Solo preséntate y pide — sin reserva necesaria." },
  },
  {
    emoji: "⏰",
    en: { title: "Plan Your Evening", body: "See happy hours and standing deals before they start. Know where to go tonight." },
    es: { title: "Planifica Tu Noche", body: "Ve los happy hours y ofertas del día antes de que empiecen. Sabe dónde ir esta noche." },
  },
  {
    emoji: "🚶",
    en: { title: "Just Walk In", body: "The app helps you find deals — no reservations, no printing. Spot a happy hour, head to the bar, and enjoy. Simple as that." },
    es: { title: "Solo Entra", body: "La app te ayuda a encontrar ofertas — sin reservas, sin imprimir nada. Ve el happy hour, ve al bar y disfruta. Así de simple." },
  },
];

export default function OnboardingOverlay() {
  const { lang } = useLang();
  const [visible, setVisible] = useState(false);
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (typeof window !== "undefined" && !localStorage.getItem("dealeo_onboarded")) {
      setVisible(true);
    }
  }, []);

  const dismiss = () => {
    localStorage.setItem("dealeo_onboarded", "1");
    setVisible(false);
  };

  if (!visible) return null;

  const slide = SLIDES[step];
  const content = lang === "es" ? slide.es : slide.en;
  const isLast = step === SLIDES.length - 1;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl w-full max-w-sm p-8 text-center shadow-2xl">
        <div className="text-6xl mb-4">{slide.emoji}</div>
        <h2 className="text-xl font-black text-gray-900 mb-2">{content.title}</h2>
        <p className="text-gray-500 text-sm leading-relaxed mb-6">{content.body}</p>

        {/* Progress dots */}
        <div className="flex justify-center gap-1.5 mb-6">
          {SLIDES.map((_, i) => (
            <div
              key={i}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === step ? "bg-orange-500 w-6" : i < step ? "bg-orange-200 w-2" : "bg-gray-200 w-2"
              }`}
            />
          ))}
        </div>

        <button
          onClick={isLast ? dismiss : () => setStep(step + 1)}
          className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3.5 rounded-2xl transition-colors"
        >
          {isLast
            ? (lang === "es" ? "¡Empezar!" : "Let's go!")
            : (lang === "es" ? "Siguiente →" : "Next →")}
        </button>

        {!isLast && (
          <button onClick={dismiss} className="mt-3 text-xs text-gray-400 hover:text-gray-600 w-full py-1">
            {lang === "es" ? "Saltar" : "Skip"}
          </button>
        )}
      </div>
    </div>
  );
}
