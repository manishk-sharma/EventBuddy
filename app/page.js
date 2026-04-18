"use client";
import { useEffect, useMemo, useState } from "react";
import { FavoritesProvider } from "./components/FavoritesContext";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import SectionHeader from "./components/SectionHeader";
import { PlaceGrid } from "./components/PlaceCard";
import Footer from "./components/Footer";
import placesData from "../data/places.json";

function HomePage() {
  const [location, setLocation] = useState("Both");
  const [category, setCategory] = useState("all");
  const [search, setSearch] = useState("");
  const [showLoginToast, setShowLoginToast] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("login") !== "success") return;

    setShowLoginToast(true);
    params.delete("login");
    const nextQuery = params.toString();
    const nextUrl = `${window.location.pathname}${nextQuery ? `?${nextQuery}` : ""}${window.location.hash}`;
    window.history.replaceState({}, "", nextUrl);

    const timeout = setTimeout(() => {
      setShowLoginToast(false);
    }, 2800);

    return () => clearTimeout(timeout);
  }, []);

  // Filter by location
  const locationFiltered = useMemo(() => {
    if (location === "Both") return placesData;
    return placesData.filter((p) => p.location === location);
  }, [location]);

  // Combined Filter: Search & Category
  const filteredMatches = useMemo(() => {
    let result = locationFiltered;

    if (category !== "all") {
      result = result.filter((p) =>
        p.interests.includes(category)
      );
    }

    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.area.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.vibe.some((v) => v.toLowerCase().includes(q)) ||
          p.description.toLowerCase().includes(q)
      );
    }

    // Sorting
    if (category !== "all") {
      result = [...result].sort((a, b) => {
        const aScore = a.interests.filter((i) => i === category).length;
        const bScore = b.interests.filter((i) => i === category).length;
        return bScore - aScore || b.rating - a.rating;
      });
    } else {
      result = [...result].sort((a, b) => b.rating - a.rating);
    }

    return result;
  }, [locationFiltered, search, category]);

  // Only calculate these if we are in default state (no search, no category filter)
  const isDefaultState = category === "all" && !search.trim();

  const trending = useMemo(() => {
    if (!isDefaultState) return [];
    return locationFiltered
      .filter((p) => p.trending)
      .sort((a, b) => b.rating - a.rating);
  }, [locationFiltered, isDefaultState]);

  const weekendSpecials = useMemo(() => {
    if (!isDefaultState) return [];
    return locationFiltered.filter((p) => p.weekendSpecial);
  }, [locationFiltered, isDefaultState]);

  const hiddenGems = useMemo(() => {
    if (!isDefaultState) return [];
    return locationFiltered.filter((p) => p.hiddenGem);
  }, [locationFiltered, isDefaultState]);

  return (
    <>
      {showLoginToast && (
        <div
          role="status"
          aria-live="polite"
          style={{
            position: "fixed",
            top: 18,
            right: 18,
            zIndex: 1000,
            background: "#0f766e",
            color: "#ffffff",
            padding: "12px 16px",
            borderRadius: 12,
            boxShadow: "0 14px 32px rgba(0, 0, 0, 0.2)",
            fontWeight: 600,
            letterSpacing: "0.1px",
            animation: "fadeInOut 2.8s ease forwards",
          }}
        >
          You are logged in successfully
        </div>
      )}

      <Navbar
        search={search}
        onSearchChange={setSearch}
        location={location}
        onLocationChange={setLocation}
        activeCategory={category}
        onCategoryChange={setCategory}
      />
      <main className="page-content">
        <Hero />

        {isDefaultState ? (
          <>
            {/* Trending Section */}
            {trending.length > 0 && (
              <section id="section-trending" style={{ marginBottom: 8 }}>
                <SectionHeader
                  icon="🔥"
                  title="Trending Near You"
                  count={trending.length}
                  bgColor="rgba(255, 107, 107, 0.12)"
                />
                <PlaceGrid places={trending} />
              </section>
            )}

            {/* Weekend Specials */}
            {weekendSpecials.length > 0 && (
              <section id="section-weekend" style={{ marginBottom: 8 }}>
                <SectionHeader
                  icon="🌅"
                  title="Weekend Specials"
                  count={weekendSpecials.length}
                  bgColor="rgba(16, 185, 129, 0.12)"
                />
                <PlaceGrid places={weekendSpecials} />
              </section>
            )}

            {/* Hidden Gems */}
            {hiddenGems.length > 0 && (
              <section id="section-hidden" style={{ marginBottom: 8 }}>
                <SectionHeader
                  icon="💎"
                  title="Hidden Gems"
                  count={hiddenGems.length}
                  bgColor="rgba(59, 130, 246, 0.12)"
                />
                <PlaceGrid places={hiddenGems} />
              </section>
            )}
          </>
        ) : (
          /* Category or Search Results */
          <section id="section-results" style={{ marginBottom: 8 }}>
            <SectionHeader
              icon="✨"
              title={category !== "all" ? `${category} Spots` : "Search Results"}
              count={filteredMatches.length}
              bgColor="rgba(245, 166, 35, 0.12)"
            />
            {filteredMatches.length > 0 ? (
              <PlaceGrid places={filteredMatches} />
            ) : (
              <div style={{ textAlign: "center", padding: "40px", color: "var(--text-muted)" }}>
                No places found matching your vibe or search.
              </div>
            )}
          </section>
        )}

      </main>
      <Footer />
    </>
  );
}

export default function WrappedHomePage() {
  return (
    <FavoritesProvider>
      <HomePage />
    </FavoritesProvider>
  );
}
