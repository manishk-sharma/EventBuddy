"use client";
import { useMemo } from "react";
import { FavoritesProvider, useFavorites } from "../components/FavoritesContext";
import Navbar from "../components/Navbar";
import SectionHeader from "../components/SectionHeader";
import { PlaceGrid } from "../components/PlaceCard";
import placesData from "../../data/places.json";

function FavoritesContent() {
  const { favorites, loaded } = useFavorites();

  const savedPlaces = useMemo(() => {
    return placesData.filter((p) => favorites.includes(p.id));
  }, [favorites]);

  if (!loaded) return null;

  return (
    <>
      <Navbar />
      <main className="page-content">
        <div style={{ padding: "60px 0 20px", textAlign: "center" }}>
          <h1
            style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: "clamp(1.8rem, 4vw, 2.5rem)",
              fontWeight: 800,
              letterSpacing: "-0.03em",
              marginBottom: 8,
            }}
          >
            Your <span className="gradient-text">Saved Spots</span>
          </h1>
          <p
            style={{
              color: "var(--text-secondary)",
              fontSize: "1rem",
              maxWidth: 400,
              margin: "0 auto",
            }}
          >
            {savedPlaces.length > 0
              ? `You've saved ${savedPlaces.length} spot${savedPlaces.length > 1 ? "s" : ""} — nice taste! ✨`
              : "Save spots you love and find them here later"}
          </p>
        </div>

        {savedPlaces.length > 0 ? (
          <section style={{ marginTop: 20 }}>
            <SectionHeader
              icon="❤️"
              title="Saved Spots"
              count={savedPlaces.length}
              bgColor="rgba(255, 107, 107, 0.12)"
            />
            <PlaceGrid places={savedPlaces} />
          </section>
        ) : (
          <div
            style={{
              textAlign: "center",
              padding: "80px 20px",
            }}
          >
            <div style={{ fontSize: "4rem", marginBottom: 20 }}>💫</div>
            <h2
              style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: "1.3rem",
                fontWeight: 600,
                color: "var(--text-secondary)",
                marginBottom: 8,
              }}
            >
              No saved spots yet
            </h2>
            <p style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>
              Explore and tap the heart icon to save your favorite spots
            </p>
          </div>
        )}

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

export default function FavoritesPage() {
  return (
    <FavoritesProvider>
      <FavoritesContent />
    </FavoritesProvider>
  );
}
