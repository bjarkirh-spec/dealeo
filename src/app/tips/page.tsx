"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { useLang } from "@/context/LanguageContext";

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export default function SubmitTipPage() {
  const { lang } = useLang();
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  const [venueName, setVenueName] = useState("");
  const [venueCity, setVenueCity] = useState("Benidorm");
  const [dealDescription, setDealDescription] = useState("");
  const [selectedDays, setSelectedDays] = useState<string[]>([]);
  const [dealTime, setDealTime] = useState("");
  const [notes, setNotes] = useState("");

  function toggleDay(day: string) {
    setSelectedDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!venueName.trim() || !dealDescription.trim()) return;
    setSubmitting(true);

    // Get user if logged in, otherwise submit anonymously
    const { data: { session } } = await supabase.auth.getSession();

    await supabase.from("deal_tips").insert({
      ...(session ? { user_id: session.user.id } : {}),
      venue_name: venueName.trim(),
      venue_city: venueCity,
      deal_description: dealDescription.trim(),
      deal_days: selectedDays.length > 0 ? selectedDays.join(", ") : null,
      deal_time: dealTime.trim() || null,
      notes: notes.trim() || null,
      status: "pending",
    });

    setSubmitting(false);
    setDone(true);
  }

  const es = lang === "es";

  if (done) return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-6 text-center">
      <div className="text-5xl mb-4">🙌</div>
      <h2 className="font-black text-gray-900 text-2xl mb-2">
        {es ? "¡Gracias!" : "Thanks!"}
      </h2>
      <p className="text-gray-500 text-sm mb-6">
        {es
          ? "Revisaremos tu tip y lo publicaremos pronto."
          : "We'll review your tip and post it soon."}
      </p>
      <Link href="/" className="bg-orange-500 text-white font-bold px-6 py-3 rounded-2xl">
        {es ? "Volver a ofertas" : "Back to deals"}
      </Link>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* Header */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-10">
        <div className="max-w-lg mx-auto px-4 h-14 flex items-center gap-3">
          <button onClick={() => router.back()} className="text-gray-400 hover:text-gray-600">
            ←
          </button>
          <h1 className="font-black text-gray-900 text-lg">
            {es ? "Enviar un tip" : "Submit a deal tip"}
          </h1>
        </div>
      </header>

      <div className="max-w-lg mx-auto px-4 py-6">
        {/* Info banner */}
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 mb-6">
          <p className="text-amber-800 text-sm font-medium">
            💡 {es
              ? "¿Conoces una oferta en un bar o restaurante de Alicante o Benidorm? ¡Compártela y ayuda a otros a ahorrar!"
              : "Know about a deal at a bar or restaurant in Alicante or Benidorm? Share it and help others save!"}
          </p>
          <p className="text-amber-600 text-xs mt-1">
            {es
              ? "Los tips se muestran con la etiqueta 'Tip' hasta que el local los confirme."
              : "Tips are shown with a 'Tip' badge until the venue confirms them."}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          {/* Venue name */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1.5">
              {es ? "Nombre del local *" : "Venue name *"}
            </label>
            <input
              type="text"
              value={venueName}
              onChange={(e) => setVenueName(e.target.value)}
              placeholder={es ? "Ej. Mr Majo's, Lit Hot Pot..." : "e.g. Mr Majo's, Sol Beach Bar..."}
              required
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>

          {/* City */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1.5">
              {es ? "Ciudad *" : "City *"}
            </label>
            <div className="flex gap-2">
              {["Alicante", "Benidorm"].map((city) => (
                <button
                  key={city}
                  type="button"
                  onClick={() => setVenueCity(city)}
                  className={`flex-1 py-3 rounded-xl text-sm font-bold border transition-colors ${
                    venueCity === city
                      ? "bg-orange-500 text-white border-orange-500"
                      : "bg-white text-gray-600 border-gray-200"
                  }`}
                >
                  {city}
                </button>
              ))}
            </div>
          </div>

          {/* Deal description */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1.5">
              {es ? "Descripción de la oferta *" : "Deal description *"}
            </label>
            <textarea
              value={dealDescription}
              onChange={(e) => setDealDescription(e.target.value)}
              placeholder={es ? "Ej. 2x1 en hamburguesas y cervezas los jueves" : "e.g. 2-for-1 burgers and beers on Thursdays"}
              required
              rows={3}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 resize-none"
            />
          </div>

          {/* Days */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1.5">
              {es ? "¿Qué días?" : "Which days?"} <span className="text-gray-400 font-normal">{es ? "(opcional)" : "(optional)"}</span>
            </label>
            <div className="flex flex-wrap gap-2">
              {DAYS.map((day) => (
                <button
                  key={day}
                  type="button"
                  onClick={() => toggleDay(day)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-colors ${
                    selectedDays.includes(day)
                      ? "bg-teal-600 text-white border-teal-600"
                      : "bg-white text-gray-600 border-gray-200"
                  }`}
                >
                  {day}
                </button>
              ))}
            </div>
          </div>

          {/* Time */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1.5">
              {es ? "Horario" : "Time"} <span className="text-gray-400 font-normal">{es ? "(opcional)" : "(optional)"}</span>
            </label>
            <input
              type="text"
              value={dealTime}
              onChange={(e) => setDealTime(e.target.value)}
              placeholder={es ? "Ej. 17:00 – 20:00" : "e.g. 5pm – 8pm"}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>

          {/* Notes */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1.5">
              {es ? "Notas adicionales" : "Extra notes"} <span className="text-gray-400 font-normal">{es ? "(opcional)" : "(optional)"}</span>
            </label>
            <input
              type="text"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder={es ? "Ej. Solo en terraza, necesita reserva..." : "e.g. Terrace only, needs booking..."}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>

          <button
            type="submit"
            disabled={submitting || !venueName.trim() || !dealDescription.trim()}
            className="w-full bg-orange-500 hover:bg-orange-600 disabled:bg-orange-300 text-white font-black py-4 rounded-2xl text-base transition-colors mt-2"
          >
            {submitting
              ? (es ? "Enviando..." : "Submitting...")
              : (es ? "Enviar tip" : "Submit tip")}
          </button>
        </form>
      </div>
    </div>
  );
}
