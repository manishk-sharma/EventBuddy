"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { FavoritesProvider } from "../components/FavoritesContext";
import Navbar from "../components/Navbar";
import SectionHeader from "../components/SectionHeader";
import { PlaceGrid } from "../components/PlaceCard";
import Footer from "../components/Footer";
import placesData from "../../data/places.json";

function FilterPageContent({ searchParams }) {
  const [location, setLocation] = useState(() => searchParams?.location || "Both");
  const [category, setCategory] = useState(() => searchParams?.category || "all");
  const [search, setSearch] = useState(() => searchParams?.q || searchParams?.search || "");

  const locationFiltered = useMemo(() => {
    if (location === "Both") return placesData;
    return placesData.filter((place) => place.location === location);
  }, [location]);

  const filteredMatches = useMemo(() => {
    let result = locationFiltered;

    if (category !== "all") {
      result = result.filter((place) => place.category === category);
    }

    if (search.trim()) {
      const query = search.toLowerCase();
      result = result.filter(
        (place) =>
          place.name.toLowerCase().includes(query) ||
          place.area.toLowerCase().includes(query) ||
          place.category.toLowerCase().includes(query) ||
          place.vibe.some((value) => value.toLowerCase().includes(query)) ||
          place.description.toLowerCase().includes(query),
      );
    }

    return [...result].sort((a, b) => b.rating - a.rating);
  }, [locationFiltered, search, category]);

  const heading = category !== "all" ? `${category} Results` : search.trim() ? "Search Results" : "All Places";
  const activeSummary = [location !== "Both" ? location : null, category !== "all" ? category : null, search.trim() ? `"${search.trim()}"` : null]
    .filter(Boolean)
    .join(" · ");

  return (
    <>
      <Navbar
        search={search}
        onSearchChange={setSearch}
        location={location}
        onLocationChange={setLocation}
        activeCategory={category}
        onCategoryChange={setCategory}
      />
      <main className="page-content" style={{ paddingTop: 24, paddingBottom: 64 }}>
        <section
          style={{
            marginTop: 24,
            marginBottom: 24,
            padding: "28px",
            borderRadius: 28,
            background: "linear-gradient(180deg, rgba(26,26,26,0.96), rgba(16,16,16,0.98))",
            border: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          <p style={{ color: "var(--accent-amber)", letterSpacing: "0.18em", textTransform: "uppercase", fontSize: "0.75rem", fontWeight: 700, marginBottom: 10 }}>
            Filter
          </p>
          <h1 style={{ margin: 0, fontSize: "clamp(2rem, 4vw, 3.2rem)", lineHeight: 1.05 }}>
            Browse filtered places
          </h1>
          <p style={{ marginTop: 14, color: "var(--text-secondary)", maxWidth: 760, lineHeight: 1.7 }}>
            Use search, location, and category controls to narrow the list. Platform links now land here with the right category preselected.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginTop: 18, alignItems: "center" }}>
            {activeSummary ? (
              <span style={{ color: "var(--text-secondary)", fontSize: "0.95rem" }}>{activeSummary}</span>
            ) : null}
            <Link
              href="/"
              style={{
                padding: "10px 16px",
                borderRadius: 999,
                textDecoration: "none",
                color: "#111",
                background: "var(--accent-amber)",
                fontWeight: 700,
              }}
            >
              Back to home
            </Link>
          </div>
        </section>

        <section style={{ marginBottom: 8 }}>
          <SectionHeader icon="✨" title={heading} count={filteredMatches.length} bgColor="rgba(245, 166, 35, 0.12)" />
          {filteredMatches.length > 0 ? (
            <PlaceGrid places={filteredMatches} />
          ) : (
            <div style={{ textAlign: "center", padding: "40px", color: "var(--text-muted)" }}>
              No places found matching your filters. Try a broader search or switch location.
            </div>
          )}
        </section>
      </main>
      <Footer />
    </>
  );
}

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
  if (filterId === "music") {
    return place.category === "Weekend Plans" || place.vibe.includes("Music") || place.interests.includes("Music");
  }
  if (filterId === "tv") {
    return place.category === "Weekend Plans" && place.vibe.some((vibe) => /screen|movie|tv/i.test(vibe));
  }
  return true;
}

function FilterCard({ place }) {
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
          backgroundImage: `linear-gradient(180deg, rgba(255,255,255,0.12), rgba(0,0,0,0.18)), url(${place.image})`,
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
        <p style={{ margin: "10px 0 0", color: "#64748b", fontSize: 14, lineHeight: 1.7 }}>
          {place.description.slice(0, 120)}...
        </p>
      </div>
    </article>
  );
}

function FilterPageContent({ searchParams }) {
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
          <div>
            <h1 style={{ margin: 0, fontSize: "clamp(2.2rem, 4vw, 3.2rem)", lineHeight: 1.05, letterSpacing: "-0.04em" }}>
              All events
            </h1>
          </div>

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
              boxShadow: "0 1px 0 rgba(15, 23, 42, 0.02)",
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
                  boxShadow: active ? "0 10px 20px rgba(17, 24, 39, 0.12)" : "0 1px 0 rgba(15, 23, 42, 0.02)",
                }}
              >
                {filter.label}
              </button>
            );
          })}
        </div>

        <div style={{ marginTop: 28, display: "grid", gap: 18, gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))" }}>
          {filteredPlaces.slice(0, 8).map((place) => (
            <FilterCard key={place.id} place={place} />
          ))}
        </div>
      </section>
    </main>
  );
}

export default function FilterPageClient({ searchParams }) {
  return (
    <FavoritesProvider>
      <FilterPageContent searchParams={searchParams || {}} />
    </FavoritesProvider>
  );
}
export default function FilterPageClient({ searchParams }) {
  return (
    <FavoritesProvider>
      <FilterPageContent searchParams={searchParams || {}} />
    </FavoritesProvider>
  );
}
