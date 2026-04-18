"use client";
import { useState, useMemo } from "react";
import { FavoritesProvider } from "./components/FavoritesContext";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import LocationToggle from "./components/LocationToggle";
import InterestPills from "./components/InterestPills";
import SearchBar from "./components/SearchBar";
import SectionHeader from "./components/SectionHeader";
import { PlaceGrid } from "./components/PlaceCard";
import placesData from "../data/places.json";

function HomePage() {
  const [location, setLocation] = useState("Both");
  const [interests, setInterests] = useState([]);
  const [search, setSearch] = useState("");

  const toggleInterest = (id) => {
    setInterests((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  // Filter by location
  const locationFiltered = useMemo(() => {
    if (location === "Both") return placesData;
    return placesData.filter((p) => p.location === location);
  }, [location]);

  // Combined Filter: Search & Interests
  const filteredMatches = useMemo(() => {
    let result = locationFiltered;

    if (interests.length > 0) {
      result = result.filter((p) =>
        p.interests.some((i) => interests.includes(i))
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
    if (interests.length > 0) {
      result = [...result].sort((a, b) => {
        const aScore = a.interests.filter((i) => interests.includes(i)).length;
        const bScore = b.interests.filter((i) => interests.includes(i)).length;
        return bScore - aScore || b.rating - a.rating;
      });
    } else {
      result = [...result].sort((a, b) => b.rating - a.rating);
    }

    return result;
  }, [locationFiltered, search, interests]);

  // Only calculate these if we are in default state (no search, no interests)
  const isDefaultState = interests.length === 0 && !search.trim();

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
      <Navbar />
      <main className="page-content">
        <Hero />
        <LocationToggle value={location} onChange={setLocation} />
        <InterestPills selected={interests} onToggle={toggleInterest} />
        <SearchBar value={search} onChange={setSearch} />

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
          /* Search or Vibe Match Results */
          <section id="section-results" style={{ marginBottom: 8 }}>
            <SectionHeader
              icon="✨"
              title={interests.length > 0 ? "Based on Your Vibe" : "Search Results"}
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

        {/* Footer */}
        <footer
          style={{
            textAlign: "center",
            padding: "40px 20px 32px",
            color: "var(--text-muted)",
            fontSize: "0.8rem",
          }}
        >
          <p>
            Made with ❤️ for Delhi & Noida explorers •{" "}
            <span className="gradient-text" style={{ fontWeight: 600 }}>
              EventBuddy
            </span>
          </p>
        </footer>
      </main>
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
