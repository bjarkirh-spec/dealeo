"use client";

import { useEffect, useMemo, useRef } from "react";
import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";
import "leaflet.markercluster";
import type { DbRestaurantWithDeals } from "@/lib/types";

// Fix leaflet default marker icons
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

const CATEGORY_COLORS: Record<string, string> = {
  live: "#ef4444",
  twoForOne: "#f97316",
  happyHour: "#0d9488",
  drinks: "#3b82f6",
  food: "#22c55e",
  experiences: "#a855f7",
  default: "#f97316",
};

function getMarkerColor(restaurant: DbRestaurantWithDeals): string {
  const deals = restaurant.deals?.filter((d) => d.is_active) ?? [];
  if (deals.some((d) => d.is_live)) return CATEGORY_COLORS.live;
  const primary = deals[0]?.category;
  return CATEGORY_COLORS[primary] ?? CATEGORY_COLORS.default;
}

// Inject the pulse keyframe once into the document head
if (typeof document !== "undefined" && !document.getElementById("map-pulse-style")) {
  const s = document.createElement("style");
  s.id = "map-pulse-style";
  s.textContent = "@keyframes map-pulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:0.6;transform:scale(1.3)}}";
  document.head.appendChild(s);
}

// Cache icons by key to avoid recreating L.divIcon on every render
const iconCache = new Map<string, L.DivIcon>();

function createEmojiIcon(emoji: string, color: string, hasLive: boolean) {
  const key = `${emoji}|${color}|${hasLive}`;
  if (iconCache.has(key)) return iconCache.get(key)!;
  const icon = L.divIcon({
    className: "",
    html: `
      <div style="position:relative;width:38px;height:38px;">
        <div style="
          background:${color};
          border:2.5px solid rgba(255,255,255,0.9);
          border-radius:50%;
          width:38px;height:38px;
          display:flex;align-items:center;justify-content:center;
          box-shadow:0 3px 10px rgba(0,0,0,0.45);
          font-size:17px;
        ">${emoji}</div>
        ${hasLive ? `<div style="
          position:absolute;top:-2px;right:-2px;
          width:11px;height:11px;
          background:#ef4444;border:2px solid white;
          border-radius:50%;
          animation:map-pulse 1.5s ease-in-out infinite;
        "></div>` : ""}
      </div>
    `,
    iconSize: [38, 38],
    iconAnchor: [19, 19],
    popupAnchor: [0, -22],
  });
  iconCache.set(key, icon);
  return icon;
}

function createUserIcon() {
  return L.divIcon({
    className: "",
    html: `
      <div style="
        background: #3b82f6;
        border: 3px solid white;
        border-radius: 50%;
        width: 20px;
        height: 20px;
        box-shadow: 0 0 0 4px rgba(59,130,246,0.3);
      "></div>
    `,
    iconSize: [20, 20],
    iconAnchor: [10, 10],
  });
}

function DisableTapHandler() {
  const map = useMap();
  useEffect(() => {
    // Leaflet's touch "tap" emulation can swallow the first tap on elements
    // overlaid on the map (e.g. the "See deals" bottom card), requiring a
    // second tap to register. Disabling it lets taps pass through normally.
    (map as unknown as { tap?: { disable: () => void } }).tap?.disable();
  }, [map]);
  return null;
}

function RecenterMap({ lat, lng, onCentered }: { lat: number; lng: number; onCentered?: () => void }) {
  const map = useMap();
  useEffect(() => {
    map.setView([lat, lng], 15);
    onCentered?.();
  }, [lat, lng, map]);
  return null;
}

interface MapViewProps {
  restaurants: DbRestaurantWithDeals[];
  onSelect: (r: DbRestaurantWithDeals) => void;
  lang: string;
  userLocation?: { lat: number; lng: number } | null;
  centerOnUser?: boolean;
  onCentered?: () => void;
}

function ClusterLayer({ restaurants, onSelect }: { restaurants: DbRestaurantWithDeals[]; onSelect: (r: DbRestaurantWithDeals) => void }) {
  const map = useMap();
  const clusterRef = useRef<L.MarkerClusterGroup | null>(null);

  useEffect(() => {
    if (clusterRef.current) {
      map.removeLayer(clusterRef.current);
    }
    const cluster = (L as any).markerClusterGroup({
      maxClusterRadius: 50,
      showCoverageOnHover: false,
      iconCreateFunction: (c: any) => L.divIcon({
        className: "",
        html: `<div style="
          background:#f97316;color:#fff;font-weight:900;font-size:13px;
          border-radius:50%;width:36px;height:36px;
          display:flex;align-items:center;justify-content:center;
          border:2.5px solid rgba(255,255,255,0.9);
          box-shadow:0 3px 10px rgba(0,0,0,0.45);
        ">${c.getChildCount()}</div>`,
        iconSize: [36, 36],
        iconAnchor: [18, 18],
      }),
    });
    restaurants
      .filter((r) => r.latitude && r.longitude)
      .forEach((r) => {
        const hasLive = !!r.deals?.some((d) => d.is_live && d.is_active);
        const color = getMarkerColor(r);
        const marker = L.marker([r.latitude!, r.longitude!], {
          icon: createEmojiIcon(r.image_emoji, color, hasLive),
        });
        marker.on("click", () => onSelect(r));
        cluster.addLayer(marker);
      });
    map.addLayer(cluster);
    clusterRef.current = cluster;
    return () => { map.removeLayer(cluster); };
  }, [restaurants, map, onSelect]);

  return null;
}

export default function MapView({ restaurants, onSelect, lang, userLocation, centerOnUser, onCentered }: MapViewProps) {
  const defaultCenter: [number, number] = userLocation
    ? [userLocation.lat, userLocation.lng]
    : [38.3452, -0.4835];

  return (
    <MapContainer
      center={defaultCenter}
      zoom={15}
      style={{ height: "100%", width: "100%" }}
      zoomControl={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://stadiamaps.com/">Stadia Maps</a> &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png"
        subdomains="abcd"
        maxZoom={19}
      />
      <DisableTapHandler />

      {centerOnUser && userLocation && (
        <RecenterMap lat={userLocation.lat} lng={userLocation.lng} onCentered={onCentered} />
      )}

      {userLocation && (
        <Marker
          position={[userLocation.lat, userLocation.lng]}
          icon={createUserIcon()}
        />
      )}

      <ClusterLayer restaurants={restaurants} onSelect={onSelect} />
    </MapContainer>
  );
}
