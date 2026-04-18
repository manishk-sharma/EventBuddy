"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { SlidersHorizontal } from "lucide-react";
import { FavoritesProvider } from "../components/FavoritesContext";
import placesData from "../../data/places.json";

const FILTERS = [
  { id: "all", label: "All events" },
  { id: "today", label: "Today" },
  { id: "tomorrow", label: "Tomorrow" },
  { id: "distance", label: "Under 10 km" },
  { id: "music", label: "Music" },
  { id: "tv", label: "TV Screenings" },
];

function matchesFilter(place, filterId) {
  if (filterId === "all") return true;
  if (filterId === "today") return place.isOpen || place.trending;
  if (filterId === "tomorrow") return place.weekendSpecial || place.trending;
  if (filterId === "distance") return true;
  if (filterId === "music") return place.vibe.includes("Music") || place.interests.includes("Music");
  if (filterId === "tv") return place.category === "Weekend Plans";
  return true;
}

function EventCard({ place }) {
  return (
    <article
      style={{
        border: "1px solid #e5e7eb",
        borderRadius: 18,
        background: "#fff",
        overflow: "hidden",
        boxShadow: "0 10px 30px rgba(15, 23, 42, 0.04)",
      }}
    >
      <div
        style={{
          aspectRatio: "16 / 9",
          backgroundImage: `linear-gradient(180deg, rgba(255,255,255,0.08), rgba(15,23,42,0.18)), url(${place.image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <div style={{ padding: 16 }}>
        <div style={{ display: "flex", justifyContent: "space-between", gap: 12, alignItems: "start" }}>
          <div>
            <p style={{ margin: 0, color: "#6b7280", fontSize: 12, textTransform: "uppercase", letterSpacing: "0.12em" }}>
              {place.category}
            </p>
            <h3 style={{ margin: "6px 0 0", fontSize: 18, lineHeight: 1.2, color: "#0f172a" }}>{place.name}</h3>
          </div>
          <span style={{ color: "#0f172a", fontWeight: 700, fontSize: 14 }}>★ {place.rating}</span>
        </div>
        <p style={{ margin: "10px 0 0", color: "#475569", fontSize: 14, lineHeight: 1.6 }}>
          {place.area} · {place.location}
        </p>
      </div>
    </article>
  );
}

function FilterPageBody({ searchParams }) {
  const initialFilter = searchParams?.filter && FILTERS.some((item) => item.id === searchParams.filter)
    ? searchParams.filter
    : "all";
  const [selectedFilter, setSelectedFilter] = useState(initialFilter);

  const filteredPlaces = useMemo(
    () => placesData.filter((place) => matchesFilter(place, selectedFilter)),
    [selectedFilter],
  );

  return (
    <main style={{ minHeight: "100vh", background: "#ffffff", color: "#0f172a" }}>
      <section style={{ maxWidth: 1200, margin: "0 auto", padding: "18px 24px 32px" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, flexWrap: "wrap" }}>
          <h1 style={{ margin: 0, fontSize: "clamp(2.2rem, 4vw, 3.2rem)", lineHeight: 1.05, letterSpacing: "-0.04em" }}>
            All events
          </h1>

          <Link
            href="/"
            style={{
              color: "#0f172a",
              textDecoration: "none",
              fontWeight: 600,
              fontSize: 14,
              border: "1px solid #e5e7eb",
              borderRadius: 14,
              padding: "10px 14px",
              background: "#fff",
            }}
          >
            Back home
          </Link>
        </div>

        <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginTop: 34, alignItems: "center" }}>
          <button
            type="button"
            onClick={() => setSelectedFilter("all")}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              height: 44,
              padding: "0 16px",
              borderRadius: 10,
              border: "1px solid #d1d5db",
              background: "#fff",
              color: "#0f172a",
              fontSize: 15,
              fontWeight: 600,
            }}
          >
            <SlidersHorizontal size={16} />
            Filters
            <span style={{ fontSize: 12, color: "#334155" }}>▾</span>
          </button>

          {FILTERS.slice(1).map((filter) => {
            const active = selectedFilter === filter.id;
            return (
              <button
                key={filter.id}
                type="button"
                onClick={() => setSelectedFilter(filter.id)}
                style={{
                  height: 44,
                  padding: "0 18px",
                  borderRadius: 10,
                  border: `1px solid ${active ? "#111827" : "#d1d5db"}`,
                  background: active ? "#111827" : "#fff",
                  color: active ? "#fff" : "#111827",
                  fontSize: 15,
                  fontWeight: 600,
                }}
              >
                {filter.label}
              </button>
            );
          })}
        </div>

        <div style={{ marginTop: 28, display: "grid", gap: 18, gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))" }}>
          {filteredPlaces.slice(0, 8).map((place) => (
            <EventCard key={place.id} place={place} />
          ))}
        </div>
      </section>
    </main>
  );
}

export default function FilterPageClientNew({ searchParams }) {
  return (
    <FavoritesProvider>
      <FilterPageBody searchParams={searchParams || {}} />
    </FavoritesProvider>
  );
}
