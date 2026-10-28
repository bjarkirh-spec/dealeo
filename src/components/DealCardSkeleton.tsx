"use client";

/** Animated shimmer placeholder matching DealCard dimensions */
export default function DealCardSkeleton() {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden animate-pulse">
      <div className="flex">
        {/* Left emoji block */}
        <div className="w-28 bg-gray-100 flex-shrink-0 min-h-[130px]" />

        {/* Right content */}
        <div className="flex-1 p-3 flex flex-col justify-between min-w-0">
          <div>
            {/* Discount label + rating row */}
            <div className="flex items-center justify-between mb-2">
              <div className="h-5 w-20 bg-gray-200 rounded-full" />
              <div className="h-4 w-8 bg-gray-100 rounded" />
            </div>
            {/* Title */}
            <div className="h-4 w-4/5 bg-gray-200 rounded mb-1.5" />
            <div className="h-4 w-3/5 bg-gray-200 rounded mb-3" />
            {/* Meta lines */}
            <div className="h-3 w-2/5 bg-gray-100 rounded mb-1" />
            <div className="h-3 w-1/3 bg-gray-100 rounded" />
          </div>
          {/* Button row */}
          <div className="flex items-center justify-between mt-3">
            <div className="h-3 w-12 bg-gray-100 rounded" />
            <div className="h-9 w-24 bg-gray-200 rounded-xl" />
          </div>
        </div>
      </div>
    </div>
  );
}

/** Animated shimmer placeholder matching the full-width live deal banner */
export function LiveDealCardSkeleton() {
  return (
    <div className="rounded-2xl overflow-hidden shadow-sm animate-pulse">
      {/* Top bar — countdown + redemptions row */}
      <div className="bg-orange-200 px-4 py-3 flex items-center gap-2">
        <div className="h-5 w-16 bg-orange-300 rounded-md" />
        <div className="h-4 w-20 bg-orange-300 rounded ml-1" />
        <div className="ml-auto h-4 w-14 bg-orange-300 rounded" />
      </div>
      {/* Body row — emoji + title + button */}
      <div className="bg-orange-200 px-4 pb-4 flex items-center gap-4">
        <div className="w-14 h-14 bg-orange-300 rounded-full flex-shrink-0" />
        <div className="flex-1 min-w-0">
          <div className="h-5 w-4/5 bg-orange-300 rounded mb-1.5" />
          <div className="h-4 w-2/5 bg-orange-300 rounded" />
        </div>
        <div className="h-9 w-28 bg-orange-300 rounded-xl flex-shrink-0" />
      </div>
    </div>
  );
}

/** Renders N skeleton cards */
export function DealCardSkeletonList({ count = 4 }: { count?: number }) {
  return (
    <div className="grid gap-3">
      {Array.from({ length: count }).map((_, i) => (
        <DealCardSkeleton key={i} />
      ))}
    </div>
  );
}

/** Skeleton for the full restaurant profile page */
export function RestaurantPageSkeleton() {
  return (
    <div className="min-h-screen bg-gray-50 animate-pulse">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 px-4 py-4 flex items-center gap-3">
        <div className="w-6 h-6 bg-gray-200 rounded" />
        <div className="h-5 w-40 bg-gray-200 rounded" />
      </div>

      <div className="max-w-2xl mx-auto px-4 py-6 pb-12">
        {/* Hero card */}
        <div className="bg-orange-100 rounded-3xl p-8 flex flex-col items-center mb-6">
          <div className="w-20 h-20 bg-orange-200 rounded-full mb-4" />
          <div className="h-6 w-40 bg-orange-200 rounded mb-2" />
          <div className="h-4 w-28 bg-orange-200 rounded mb-4" />
          <div className="h-4 w-20 bg-orange-200 rounded" />
        </div>

        {/* Info grid */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm">
              <div className="h-3 w-14 bg-gray-100 rounded mb-2" />
              <div className="h-4 w-24 bg-gray-200 rounded" />
            </div>
          ))}
        </div>

        {/* Directions button */}
        <div className="h-12 bg-white border border-gray-200 rounded-2xl mb-6" />

        {/* Description card */}
        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm mb-6">
          <div className="h-5 w-20 bg-gray-200 rounded mb-3" />
          <div className="h-3 w-full bg-gray-100 rounded mb-2" />
          <div className="h-3 w-4/5 bg-gray-100 rounded mb-2" />
          <div className="h-3 w-3/5 bg-gray-100 rounded" />
        </div>

        {/* Deals section */}
        <div className="h-5 w-28 bg-gray-200 rounded mb-3" />
        <div className="space-y-3">
          {[0, 1].map((i) => (
            <div key={i} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 flex items-center gap-4">
              <div className="w-16 h-10 bg-gray-200 rounded-xl flex-shrink-0" />
              <div className="flex-1">
                <div className="h-4 w-3/4 bg-gray-200 rounded mb-1.5" />
                <div className="h-3 w-1/2 bg-gray-100 rounded" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
