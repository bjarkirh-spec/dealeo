"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { getSession, getRestaurantByUser, updateRestaurant } from "@/lib/auth";
import { geocodeAddress } from "@/lib/geocode";
import { supabase } from "@/lib/supabase";
import type { DbRestaurant } from "@/lib/types";

const STOCK_PHOTOS = [
  { url: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=800&auto=format&fit=crop&q=80", label: "Bar interior" },
  { url: "https://images.unsplash.com/photo-1572116469696-31de0f17cc34?w=800&auto=format&fit=crop&q=80", label: "Cocktails" },
  { url: "https://images.unsplash.com/photo-1566633806327-68e152aaf26d?w=800&auto=format&fit=crop&q=80", label: "Beer taps" },
  { url: "https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=800&auto=format&fit=crop&q=80", label: "Bar counter" },
  { url: "https://images.unsplash.com/photo-1528823872057-9c018a7a7553?w=800&auto=format&fit=crop&q=80", label: "Drinks & friends" },
  { url: "https://images.unsplash.com/photo-1571997799737-de83b5a5e7da?w=800&auto=format&fit=crop&q=80", label: "Terrace evening" },
  { url: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&auto=format&fit=crop&q=80", label: "Restaurant interior" },
  { url: "https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=800&auto=format&fit=crop&q=80", label: "Outdoor terrace" },
  { url: "https://images.unsplash.com/photo-1559329007-40df8a9345d8?w=800&auto=format&fit=crop&q=80", label: "Wine & tapas" },
  { url: "https://images.unsplash.com/photo-1544148103-0773bf10d330?w=800&auto=format&fit=crop&q=80", label: "Beachfront bar" },
  { url: "https://images.unsplash.com/photo-1537047902294-62a40c20a6ae?w=800&auto=format&fit=crop&q=80", label: "Spanish tapas" },
  { url: "https://images.unsplash.com/photo-1551024601-bec78aea704b?w=800&auto=format&fit=crop&q=80", label: "Cocktail bar" },
  { url: "https://images.unsplash.com/photo-1600891964092-4316c288032e?w=800&auto=format&fit=crop&q=80", label: "Grill & steak" },
  { url: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&auto=format&fit=crop&q=80", label: "Pizza" },
  { url: "https://images.unsplash.com/photo-1561047029-3000c68339ca?w=800&auto=format&fit=crop&q=80", label: "Night bar" },
  { url: "https://images.unsplash.com/photo-1453614512568-c4024d13c247?w=800&auto=format&fit=crop&q=80", label: "Rooftop" },
];

const EMOJI_OPTIONS = [
  "🍕","🍔","🍣","🌮","🍜","🥩","🍷","🍺","🍹","🥂","🍸","🥃",
  "🍦","🧁","🎂","🥐","🥗","🍛","🦞","🦑","🍤","🌯","🥙","🫕",
  "🍝","🥘","🫔","🍗","🌽","🫖","☕","🧋","🍵","🧃","🥤",
];

export default function EditProfile() {
  const router = useRouter();
  const [restaurant, setRestaurant] = useState<DbRestaurant | null>(null);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [photoTab, setPhotoTab] = useState<"stock" | "upload" | "url">("stock");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [neighborhood, setNeighborhood] = useState("");
  const [phone, setPhone] = useState("");
  const [website, setWebsite] = useState("");
  const [emoji, setEmoji] = useState("🍽️");
  const [imageUrl, setImageUrl] = useState("");
  const [description, setDescription] = useState("");
  const [descriptionEs, setDescriptionEs] = useState("");
  const [sunTags, setSunTags] = useState<string[]>([]);
  const [sunNote, setSunNote] = useState("");
  const [amenities, setAmenities] = useState<string[]>([]);

  const SUN_TAG_OPTIONS = [
    { value: "morning_sun", label: "☀️ Morning Sun" },
    { value: "afternoon_sun", label: "☀️ Afternoon Sun" },
    { value: "sunset_spot", label: "🌅 Sunset Spot" },
    { value: "sunny_terrace", label: "🪑 Sunny Terrace" },
    { value: "rooftop", label: "🌇 Rooftop" },
    { value: "beachfront", label: "🌴 Beachfront" },
    { value: "outdoor_seating", label: "🪑 Outdoor Seating" },
    { value: "mostly_shaded", label: "🌿 Mostly Shaded" },
  ];

  useEffect(() => {
    async function load() {
      const session = await getSession();
      if (!session) { router.push("/business/login"); return; }

      const { data: rest } = await getRestaurantByUser(session.user.id);
      if (!rest) { router.push("/business/dashboard"); return; }

      setRestaurant(rest);
      setName(rest.name || "");
      setAddress(rest.address || "");
      setNeighborhood(rest.neighborhood || "");
      setPhone(rest.phone || "");
      setWebsite(rest.website || "");
      setEmoji(rest.image_emoji || "🍽️");
      setImageUrl(rest.image_url || "");
      setDescription(rest.description || "");
      setDescriptionEs(rest.description_es || "");
      setSunTags(rest.sun_tags || []);
      setSunNote(rest.sun_note || "");
      setAmenities(rest.amenities || []);
      setFetching(false);
    }
    load();
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!restaurant) return;
    setLoading(true);
    setError("");

    // Re-geocode if address changed
    let lat = restaurant.latitude;
    let lng = restaurant.longitude;
    if (address !== restaurant.address) {
      const coords = await geocodeAddress(address);
      if (coords) { lat = coords.lat; lng = coords.lng; }
    }

    const { error } = await updateRestaurant(restaurant.id, {
      name,
      address,
      neighborhood,
      phone,
      website,
      image_emoji: emoji,
      image_url: imageUrl || null,
      description,
      description_es: descriptionEs,
      latitude: lat,
      longitude: lng,
      sun_tags: sunTags,
      sun_note: sunNote || null,
      amenities: amenities.length > 0 ? amenities : null,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      setSuccess(true);
      setTimeout(() => router.push("/business/dashboard"), 1200);
    }
  };

  const handleUpload = async (file: File) => {
    if (!restaurant) return;
    setUploading(true);
    setError("");
    const ext = file.name.split(".").pop();
    const path = `${restaurant.id}/${Date.now()}.${ext}`;
    const { error: upErr } = await supabase.storage.from("venue-images").upload(path, file, { upsert: true });
    if (upErr) { setError("Upload failed: " + upErr.message); setUploading(false); return; }
    const { data } = supabase.storage.from("venue-images").getPublicUrl(path);
    setImageUrl(data.publicUrl);
    setUploading(false);
  };

  if (fetching) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-orange-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-2xl mx-auto px-4 h-14 flex items-center justify-between">
          <Link href="/business/dashboard" className="text-sm text-gray-500 hover:text-gray-700">
            ← Dashboard
          </Link>
          <span className="text-2xl font-black"><span className="text-orange-500">Deal</span><span className="text-teal-600">eo</span></span>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-6 pb-12">
        <h1 className="text-2xl font-black text-gray-900 mb-6">Edit Profile</h1>

        {success && (
          <div className="bg-green-50 border border-green-200 text-green-700 font-semibold text-sm px-4 py-3 rounded-xl mb-4">
            ✅ Profile saved! Redirecting...
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">

          {/* Emoji picker */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
            <label className="block text-sm font-bold text-gray-700 mb-3">
              Venue Icon
            </label>
            <div className="flex items-center gap-3 mb-3">
              <div className="text-5xl">{emoji}</div>
              <p className="text-sm text-gray-400">This appears on your listing and map marker</p>
            </div>
            <div className="flex flex-wrap gap-2">
              {EMOJI_OPTIONS.map((e) => (
                <button
                  key={e}
                  type="button"
                  onClick={() => setEmoji(e)}
                  className={`text-2xl p-2 rounded-xl transition-all ${
                    emoji === e ? "bg-orange-100 ring-2 ring-orange-400" : "hover:bg-gray-100"
                  }`}
                >
                  {e}
                </button>
              ))}
            </div>
          </div>

          {/* Cover photo picker */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
            <label className="block text-sm font-bold text-gray-700 mb-3">Cover Photo</label>

            {/* Preview */}
            {imageUrl && (
              <div className="relative mb-3">
                <img src={imageUrl} alt="Cover preview" className="w-full h-40 object-cover rounded-xl" />
                <button
                  type="button"
                  onClick={() => setImageUrl("")}
                  className="absolute top-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded-lg hover:bg-black/80"
                >
                  Remove
                </button>
              </div>
            )}

            {/* Tabs */}
            <div className="flex gap-1 bg-gray-100 p-1 rounded-xl mb-4">
              {(["stock", "upload", "url"] as const).map((tab) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setPhotoTab(tab)}
                  className={`flex-1 text-xs font-semibold py-1.5 rounded-lg transition-all ${photoTab === tab ? "bg-white shadow text-gray-900" : "text-gray-500"}`}
                >
                  {tab === "stock" ? "📷 Stock" : tab === "upload" ? "⬆️ Upload" : "🔗 URL"}
                </button>
              ))}
            </div>

            {/* Stock photos */}
            {photoTab === "stock" && (
              <div className="grid grid-cols-3 gap-2">
                {STOCK_PHOTOS.map((photo) => (
                  <button
                    key={photo.url}
                    type="button"
                    onClick={() => setImageUrl(photo.url)}
                    className={`relative rounded-xl overflow-hidden aspect-video border-2 transition-all ${imageUrl === photo.url ? "border-orange-500 scale-95" : "border-transparent hover:border-orange-300"}`}
                  >
                    <img src={photo.url.replace("w=800", "w=200")} alt={photo.label} className="w-full h-full object-cover" />
                    {imageUrl === photo.url && (
                      <div className="absolute inset-0 bg-orange-500/20 flex items-center justify-center">
                        <span className="text-white text-lg">✓</span>
                      </div>
                    )}
                  </button>
                ))}
              </div>
            )}

            {/* Upload */}
            {photoTab === "upload" && (
              <div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => { const f = e.target.files?.[0]; if (f) handleUpload(f); }}
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={uploading}
                  className="w-full border-2 border-dashed border-gray-200 rounded-xl py-8 text-center hover:border-orange-300 transition-colors disabled:opacity-50"
                >
                  {uploading ? (
                    <div className="flex flex-col items-center gap-2">
                      <div className="w-6 h-6 border-2 border-orange-500 border-t-transparent rounded-full animate-spin" />
                      <p className="text-sm text-gray-500">Uploading...</p>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center gap-2">
                      <span className="text-3xl">📸</span>
                      <p className="text-sm font-semibold text-gray-700">Tap to upload a photo</p>
                      <p className="text-xs text-gray-400">JPG, PNG or WEBP</p>
                    </div>
                  )}
                </button>
              </div>
            )}

            {/* URL */}
            {photoTab === "url" && (
              <div>
                <input
                  type="url"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  placeholder="https://example.com/your-photo.jpg"
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
                />
                <p className="text-xs text-gray-400 mt-1.5">Paste a direct link to a photo.</p>
              </div>
            )}
          </div>

          {/* Name */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
            <label className="block text-sm font-bold text-gray-700 mb-1">
              Venue Name *
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
              required
            />
          </div>

          {/* Address + Neighborhood */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 flex flex-col gap-3">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Address</label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="e.g. Calle Mayor 12"
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Neighbourhood</label>
              <input
                type="text"
                value={neighborhood}
                onChange={(e) => setNeighborhood(e.target.value)}
                placeholder="e.g. El Barrio, Centro"
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
              />
            </div>
          </div>

          {/* Phone + Website */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 flex flex-col gap-3">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Phone</label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="e.g. +34 965 000 000"
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Website</label>
              <input
                type="url"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
                placeholder="e.g. https://yourrestaurant.com"
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
              />
            </div>
          </div>

          {/* Description EN */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
            <div className="flex items-center justify-between mb-1">
              <label className="block text-sm font-bold text-gray-700">
                About your venue (English)
              </label>
              <span className={`text-xs ${description.length > 270 ? "text-red-400" : "text-gray-400"}`}>
                {description.length}/300
              </span>
            </div>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              maxLength={300}
              placeholder="Tell customers about your place, cuisine, atmosphere..."
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 resize-none"
            />
          </div>

          {/* Description ES */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
            <div className="flex items-center justify-between mb-1">
              <label className="block text-sm font-bold text-gray-700">
                Sobre tu local (Español)
              </label>
              <span className={`text-xs ${descriptionEs.length > 270 ? "text-red-400" : "text-gray-400"}`}>
                {descriptionEs.length}/300
              </span>
            </div>
            <textarea
              value={descriptionEs}
              onChange={(e) => setDescriptionEs(e.target.value)}
              rows={3}
              maxLength={300}
              placeholder="Cuéntales a los clientes sobre tu local, cocina, ambiente..."
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 resize-none"
            />
          </div>

          {/* Sun / Terrace Tags */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
            <label className="block text-sm font-bold text-gray-700 mb-1">
              ☀️ Sun & Outdoor Attributes
            </label>
            <p className="text-xs text-gray-400 mb-3">Help customers find you when looking for sunny terraces or outdoor spots. Select all that apply.</p>
            <div className="flex flex-wrap gap-2 mb-3">
              {SUN_TAG_OPTIONS.map((tag) => {
                const selected = sunTags.includes(tag.value);
                return (
                  <button
                    key={tag.value}
                    type="button"
                    onClick={() => setSunTags(selected ? sunTags.filter((t) => t !== tag.value) : [...sunTags, tag.value])}
                    className={`text-sm px-3 py-1.5 rounded-full border font-medium transition-all ${
                      selected
                        ? "bg-orange-500 text-white border-orange-500"
                        : "bg-white text-gray-600 border-gray-200 hover:border-orange-300"
                    }`}
                  >
                    {tag.label}
                  </button>
                );
              })}
            </div>
            <input
              type="text"
              value={sunNote}
              onChange={(e) => setSunNote(e.target.value)}
              placeholder='Optional note, e.g. "Sunny terrace until 19:00, then shade"'
              maxLength={120}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
            />
          </div>

          {/* Activities & Amenities */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
            <label className="block text-sm font-bold text-gray-700 mb-1">
              🎯 Activities & Amenities
            </label>
            <p className="text-xs text-gray-400 mb-3">Help customers find you when looking for something specific to do. Select all that apply.</p>
            <div className="flex flex-wrap gap-2">
              {[
                { value: "darts", label: "🎯 Darts" },
                { value: "pool", label: "🎱 Pool Table" },
                { value: "karaoke", label: "🎤 Karaoke" },
                { value: "live_music", label: "🎵 Live Music" },
                { value: "sports_tv", label: "📺 Sports TV" },
                { value: "board_games", label: "🎲 Board Games" },
                { value: "terrace", label: "🌿 Terrace" },
                { value: "beer_garden", label: "🍺 Beer Garden" },
                { value: "quiz_night", label: "🧠 Quiz Night" },
                { value: "dance_floor", label: "💃 Dance Floor" },
                { value: "arcade", label: "🕹️ Arcade" },
                { value: "ping_pong", label: "🏓 Ping Pong" },
              ].map((a) => {
                const selected = amenities.includes(a.value);
                return (
                  <button
                    key={a.value}
                    type="button"
                    onClick={() => setAmenities(selected ? amenities.filter((x) => x !== a.value) : [...amenities, a.value])}
                    className={`text-sm px-3 py-1.5 rounded-full border font-medium transition-all ${
                      selected
                        ? "bg-teal-600 text-white border-teal-600"
                        : "bg-white text-gray-600 border-gray-200 hover:border-teal-300"
                    }`}
                  >
                    {a.label}
                  </button>
                );
              })}
            </div>
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
            {loading ? "Saving..." : "Save Profile →"}
          </button>
        </form>
      </main>
    </div>
  );
}
