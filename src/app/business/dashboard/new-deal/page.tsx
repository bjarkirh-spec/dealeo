"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { getSession, getRestaurantByUser, createDeal } from "@/lib/auth";
import { supabase } from "@/lib/supabase";
import type { DbRestaurant } from "@/lib/types";

const CATEGORIES = [
  { value: "twoForOne", label: "2-for-1" },
  { value: "happyHour", label: "Happy Hour" },
  { value: "drinks", label: "Drinks" },
  { value: "food", label: "Food" },
  { value: "experiences", label: "🎟️ Experiences" },
  { value: "nightlife", label: "🌙 Nightlife" },
];

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export default function NewDealPage() {
  return <Suspense><NewDeal /></Suspense>;
}

function NewDeal() {
  const router = useRouter();
  const params = useSearchParams();
  const [restaurant, setRestaurant] = useState<DbRestaurant | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [title, setTitle] = useState("");
  const [titleEs, setTitleEs] = useState("");
  const [category, setCategory] = useState("food");
  const [discountLabel, setDiscountLabel] = useState("");
  const [validFrom, setValidFrom] = useState("");
  const [validUntil, setValidUntil] = useState("23:00");
  const [isLive, setIsLive] = useState(false);
  const [liveDuration, setLiveDuration] = useState<number | null>(60);
  const [maxRedemptions, setMaxRedemptions] = useState("");
  const [dealType, setDealType] = useState("redeemable");
  const [validDays, setValidDays] = useState<string[]>([]);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    // Pre-fill from template query params
    if (params.get("title")) setTitle(params.get("title")!);
    if (params.get("title_es")) setTitleEs(params.get("title_es")!);
    if (params.get("category")) setCategory(params.get("category")!);
    if (params.get("discount")) setDiscountLabel(params.get("discount")!);
    if (params.get("from_time")) setValidFrom(params.get("from_time")!);
    if (params.get("until_time")) setValidUntil(params.get("until_time")!);
    if (params.get("days")) setValidDays(params.get("days")!.split(",").filter(Boolean));
    if (params.get("type")) setDealType(params.get("type")!);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    async function load() {
      const session = await getSession();
      if (!session) { router.push("/business/login"); return; }
      const { data: rest } = await getRestaurantByUser(session.user.id);
      if (!rest) { router.push("/business/dashboard"); return; }
      setRestaurant(rest);
    }
    load();
  }, [router]);

  const toggleDay = (day: string) => {
    setValidDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const uploadImage = async (restaurantId: string): Promise<string | null> => {
    if (!imageFile) return null;
    setUploading(true);
    const ext = imageFile.name.split(".").pop();
    const path = `${restaurantId}/${Date.now()}.${ext}`;
    const { error } = await supabase.storage.from("deal-images").upload(path, imageFile, { upsert: true });
    setUploading(false);
    if (error) return null;
    const { data } = supabase.storage.from("deal-images").getPublicUrl(path);
    return data.publicUrl;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!restaurant) return;
    setLoading(true);
    setError("");

    const imageUrl = await uploadImage(restaurant.id);

    const { data: newDeal, error } = await createDeal({
      restaurant_id: restaurant.id,
      title,
      title_es: titleEs,
      category,
      discount_label: discountLabel,
      valid_from: validFrom || null,
      valid_until: validUntil,
      is_live: isLive,
      max_redemptions: maxRedemptions ? parseInt(maxRedemptions) : null,
      deal_type: dealType,
      valid_days: validDays,
      image_url: imageUrl,
      ...(isLive ? { went_live_at: new Date().toISOString(), live_duration_minutes: liveDuration } : {}),
    });

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      // Fire push notifications if created as live
      if (isLive && newDeal) {
        const { data: { session } } = await supabase.auth.getSession();
        fetch("/api/notify-live", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${session?.access_token ?? ""}`,
          },
          body: JSON.stringify({
            restaurantName: restaurant.name,
            restaurantEmoji: restaurant.image_emoji,
            dealTitle: title,
            dealId: newDeal.id,
            restaurantId: restaurant.id,
          }),
        });
      }
      router.push("/business/dashboard");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-2xl mx-auto px-4 h-14 flex items-center justify-between">
          <Link href="/business/dashboard" className="text-sm text-gray-500 hover:text-gray-700">
            ← Dashboard
          </Link>
          <span className="text-2xl font-black"><span className="text-orange-500">Deal</span><span className="text-teal-600">eo</span></span>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-6">
        <h1 className="text-2xl font-black text-gray-900 mb-6">Create New Deal</h1>

        {params.get("from") && (
          <div className="bg-teal-50 border border-teal-200 rounded-2xl px-4 py-3 mb-4 text-sm text-teal-700 font-medium">
            📋 Pre-filled from an existing deal — review and save.
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">

          {/* Deal Type */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
            <label className="block text-sm font-bold text-gray-700 mb-2">
              Deal Type *
            </label>
            <p className="text-xs text-gray-400 mb-3">
              Redeemable deals require a QR scan. Informational deals just display your offer.
            </p>
            <div className="grid grid-cols-2 gap-2">
              {[
                { value: "redeemable", label: "🎟️ Redeemable", sub: "Requires QR scan" },
                { value: "informational", label: "ℹ️ Informational", sub: "Display only" },
              ].map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => setDealType(opt.value)}
                  className={`p-3 rounded-xl border-2 text-left transition-all ${
                    dealType === opt.value
                      ? "border-orange-500 bg-orange-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <p className="font-bold text-sm text-gray-900">{opt.label}</p>
                  <p className="text-xs text-gray-400">{opt.sub}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Title EN */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
            <div className="flex items-center justify-between mb-1">
              <label className="block text-sm font-bold text-gray-700">
                Deal Title (English) *
              </label>
              <span className={`text-xs ${title.length > 90 ? "text-red-400" : "text-gray-400"}`}>
                {title.length}/100
              </span>
            </div>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. 2-for-1 Cocktails"
              maxLength={100}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
              required
            />
          </div>

          {/* Title ES */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
            <div className="flex items-center justify-between mb-1">
              <label className="block text-sm font-bold text-gray-700">
                Deal Title (Spanish)
              </label>
              <span className={`text-xs ${titleEs.length > 90 ? "text-red-400" : "text-gray-400"}`}>
                {titleEs.length}/100
              </span>
            </div>
            <input
              type="text"
              value={titleEs}
              onChange={(e) => setTitleEs(e.target.value)}
              placeholder="e.g. Cócteles 2x1"
              maxLength={100}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
            />
          </div>

          {/* Category */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
            <label className="block text-sm font-bold text-gray-700 mb-2">
              Category *
            </label>
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.value}
                  type="button"
                  onClick={() => setCategory(cat.value)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    category === cat.value
                      ? "bg-orange-500 text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Discount label */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
            <div className="flex items-center justify-between mb-1">
              <label className="block text-sm font-bold text-gray-700">
                Discount Label *
              </label>
              <span className={`text-xs ${discountLabel.length > 25 ? "text-red-400" : "text-gray-400"}`}>
                {discountLabel.length}/30
              </span>
            </div>
            <input
              type="text"
              value={discountLabel}
              onChange={(e) => setDiscountLabel(e.target.value)}
              placeholder="e.g. 2-for-1, 30% off, Happy Hour"
              maxLength={30}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
              required
            />
          </div>

          {/* Deal Photo */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
            <label className="block text-sm font-bold text-gray-700 mb-1">
              Deal Photo (optional)
            </label>
            <p className="text-xs text-gray-400 mb-3">Add a photo of your food or drinks to attract more customers.</p>
            {imagePreview ? (
              <div className="relative mb-3">
                <img src={imagePreview} alt="Preview" className="w-full h-40 object-cover rounded-xl" />
                <button
                  type="button"
                  onClick={() => { setImageFile(null); setImagePreview(null); }}
                  className="absolute top-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded-lg"
                >
                  Remove
                </button>
              </div>
            ) : (
              <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-200 rounded-xl cursor-pointer hover:border-orange-300 hover:bg-orange-50 transition-all">
                <span className="text-3xl mb-1">📷</span>
                <span className="text-sm text-gray-500">Tap to upload photo</span>
                <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
              </label>
            )}
          </div>

          {/* Valid days */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
            <label className="block text-sm font-bold text-gray-700 mb-2">
              Valid Days (leave empty for every day)
            </label>
            <div className="flex flex-wrap gap-2">
              {DAYS.map((day) => (
                <button
                  key={day}
                  type="button"
                  onClick={() => toggleDay(day)}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                    validDays.includes(day)
                      ? "bg-orange-500 text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {day}
                </button>
              ))}
            </div>
          </div>

          {/* Time range */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
            <label className="block text-sm font-bold text-gray-700 mb-1">
              When is this offer available?
            </label>
            <p className="text-xs text-gray-400 mb-1">
              e.g. Happy Hour 17:00 – 19:00. Customers will see it all day so they can plan ahead.
            </p>
            <p className="text-xs text-orange-500 font-medium mb-3">
              💡 Set a start time and this deal will appear automatically every day — no manual activation needed.
            </p>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <p className="text-xs text-gray-500 font-medium mb-1">Starts at</p>
                <input
                  type="time"
                  value={validFrom}
                  onChange={(e) => setValidFrom(e.target.value)}
                  placeholder="Optional"
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
                />
              </div>
              <div>
                <p className="text-xs text-gray-500 font-medium mb-1">Ends at</p>
                <input
                  type="time"
                  value={validUntil}
                  onChange={(e) => setValidUntil(e.target.value)}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
                />
              </div>
            </div>
          </div>

          {/* Max redemptions — only for redeemable */}
          {dealType === "redeemable" && (
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
              <label className="block text-sm font-bold text-gray-700 mb-1">
                Max Redemptions (optional)
              </label>
              <input
                type="number"
                value={maxRedemptions}
                onChange={(e) => setMaxRedemptions(e.target.value)}
                placeholder="Leave empty for unlimited"
                min="1"
                max="9999"
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
              />
            </div>
          )}

          {/* Live deal toggle */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
            <div className="flex items-center justify-between mb-3">
              <div>
                <p className="font-bold text-gray-900 text-sm">🔴 Live Deal</p>
                <p className="text-xs text-gray-400 mt-0.5">
                  Notify nearby users immediately
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsLive(!isLive)}
                className={`w-12 h-7 rounded-full transition-colors relative ${
                  isLive ? "bg-orange-500" : "bg-gray-200"
                }`}
              >
                <span
                  className={`absolute top-1 w-5 h-5 bg-white rounded-full shadow transition-all ${
                    isLive ? "left-6" : "left-1"
                  }`}
                />
              </button>
            </div>
            {isLive && (
              <div>
                <p className="text-xs text-gray-500 font-medium mb-2">How long should this deal run?</p>
                <div className="grid grid-cols-4 gap-2">
                  {[
                    { label: "30m", value: 30 },
                    { label: "1h", value: 60 },
                    { label: "2h", value: 120 },
                    { label: "∞", value: null },
                  ].map(({ label, value }) => (
                    <button
                      key={label}
                      type="button"
                      onClick={() => setLiveDuration(value)}
                      className={`py-2 rounded-xl text-sm font-bold transition-colors ${
                        liveDuration === value
                          ? "bg-orange-500 text-white"
                          : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {error && (
            <div className="bg-red-50 text-red-600 text-sm px-4 py-3 rounded-xl">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="bg-orange-500 hover:bg-orange-600 disabled:bg-orange-300 text-white font-bold py-4 rounded-2xl transition-colors"
          >
            {uploading ? "Uploading photo..." : loading ? "Creating..." : "Create Deal →"}
          </button>
        </form>
      </main>
    </div>
  );
}
