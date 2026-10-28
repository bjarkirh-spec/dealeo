"use client";

import { DealCategory } from "@/lib/types";
import { useLang } from "@/context/LanguageContext";

interface CategoryFilterProps {
  selected: DealCategory;
  onChange: (cat: DealCategory) => void;
}

const CATEGORIES: { key: DealCategory; icon: string }[] = [
  { key: "all", icon: "🍽️" },
  { key: "live", icon: "🔴" },
  { key: "twoForOne", icon: "2️⃣" },
  { key: "happyHour", icon: "🍻" },
  { key: "drinks", icon: "🥂" },
  { key: "food", icon: "🥘" },
  { key: "nightlife", icon: "🌙" },
];

export default function CategoryFilter({ selected, onChange }: CategoryFilterProps) {
  const { tr } = useLang();

  return (
    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
      {CATEGORIES.map(({ key, icon }) => (
        <button
          key={key}
          onClick={() => onChange(key)}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all flex-shrink-0 ${
            selected === key
              ? "bg-teal-700 text-white shadow-sm"
              : "bg-teal-600 text-white opacity-70 hover:opacity-100"
          }`}
        >
          <span>{icon}</span>
          <span>{tr.categories[key]}</span>
        </button>
      ))}
    </div>
  );
}
