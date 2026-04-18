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

  // Filter by search
  const searchFiltered = useMemo(() => {
    if (!search.trim()) return locationFiltered;
    const q = search.toLowerCase();
    return locationFiltered.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.area.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.vibe.some((v) => v.toLowerCase().includes(q)) ||
        p.description.toLowerCase().includes(q)
    );
  }, [locationFiltered, search]);

  // Trending: top-rated + trending flag
  const trending = useMemo(() => {
    return searchFiltered
      .filter((p) => p.trending)
      .sort((a, b) => b.rating - a.rating);
  }, [searchFiltered]);

  // Based on vibe: matched by interests
  const vibeMatched = useMemo(() => {
    if (interests.length === 0) return [];
    return searchFiltered
      .filter((p) => p.interests.some((i) => interests.includes(i)))
      .sort((a, b) => {
        const aScore = a.interests.filter((i) => interests.includes(i)).length;
        const bScore = b.interests.filter((i) => interests.includes(i)).length;
        return bScore - aScore || b.rating - a.rating;
      });
  }, [searchFiltered, interests]);

  // Weekend Specials
  const weekendSpecials = useMemo(() => {
    return searchFiltered.filter((p) => p.weekendSpecial);
  }, [searchFiltered]);

  // Hidden Gems
  const hiddenGems = useMemo(() => {
    return searchFiltered.filter((p) => p.hiddenGem);
  }, [searchFiltered]);

  // If no interests selected and no search, show all
  const showAll = interests.length === 0 && !search.trim();

  return (
    <>
      <Navbar />
      <main className="page-content">
        <Hero />
        <LocationToggle value={location} onChange={setLocation} />
        <InterestPills selected={interests} onToggle={toggleInterest} />
        <SearchBar value={search} onChange={setSearch} />

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

        {/* Based on Vibe — only when interests are selected */}
        {vibeMatched.length > 0 && (
          <section id="section-vibe" style={{ marginBottom: 8 }}>
            <SectionHeader
              icon="✨"
              title="Based on Your Vibe"
              count={vibeMatched.length}
              bgColor="rgba(245, 166, 35, 0.12)"
            />
            <PlaceGrid places={vibeMatched} />
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

        {/* Edge case: no results at all */}
        {trending.length === 0 &&
          vibeMatched.length === 0 &&
          weekendSpecials.length === 0 &&
          hiddenGems.length === 0 && (
            <PlaceGrid places={[]} />
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
