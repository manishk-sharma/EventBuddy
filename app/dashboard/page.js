"use client";

import { useEffect, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { UserButton, useAuth, useUser } from "@clerk/nextjs";
import { FavoritesProvider, useFavorites } from "../components/FavoritesContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import placesData from "../../data/places.json";

function DashboardContent() {
  const router = useRouter();
  const { isLoaded: authLoaded, isSignedIn } = useAuth();
  const { user, isLoaded: userLoaded } = useUser();
  const { favorites, loaded } = useFavorites();

  const favoritePlaces = useMemo(
    () => placesData.filter((place) => favorites.includes(place.id)),
    [favorites],
  );

  useEffect(() => {
    if (authLoaded && !isSignedIn) {
      router.replace("/login");
    }
  }, [authLoaded, isSignedIn, router]);

  if (!authLoaded || !userLoaded || !loaded) return null;
  if (!isSignedIn) return null;

  const firstName = user?.firstName || user?.username || "Explorer";
  const email = user?.primaryEmailAddress?.emailAddress || "No email available";

  return (
    <>
      <Navbar />
      <main className="page-content" style={{ padding: "24px 0 64px" }}>
        <section
          style={{
            marginTop: 24,
            padding: "32px",
            borderRadius: "28px",
            background: "linear-gradient(180deg, rgba(26,26,26,0.96), rgba(16,16,16,0.98))",
            border: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 20, flexWrap: "wrap" }}>
            <div>
              <p style={{ color: "var(--accent-amber)", letterSpacing: "0.18em", textTransform: "uppercase", fontSize: "0.75rem", fontWeight: 700, marginBottom: 10 }}>
                User Dashboard
              </p>
              <h1 style={{ margin: 0, fontSize: "clamp(2rem, 4vw, 3.4rem)", lineHeight: 1.05 }}>
                Welcome back, {firstName}
              </h1>
              <p style={{ marginTop: 14, color: "var(--text-secondary)", maxWidth: 720, lineHeight: 1.7 }}>
                Your saved places, account details, and quick links live here. Use this space to jump back into discovery fast.
              </p>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <UserButton afterSignOutUrl="/" />
              <Link
                href="/favorites"
                style={{
                  padding: "12px 18px",
                  borderRadius: 999,
                  textDecoration: "none",
                  color: "#111",
                  background: "var(--accent-amber)",
                  fontWeight: 700,
                }}
              >
                View saved spots
              </Link>
            </div>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: 16,
              marginTop: 28,
            }}
          >
            <article style={{ padding: 20, borderRadius: 20, background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
              <p style={{ margin: 0, color: "var(--text-muted)", fontSize: 12, textTransform: "uppercase", letterSpacing: "0.14em" }}>Email</p>
              <h2 style={{ margin: "10px 0 0", fontSize: "1.05rem" }}>{email}</h2>
            </article>
            <article style={{ padding: 20, borderRadius: 20, background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
              <p style={{ margin: 0, color: "var(--text-muted)", fontSize: 12, textTransform: "uppercase", letterSpacing: "0.14em" }}>Saved Places</p>
              <h2 style={{ margin: "10px 0 0", fontSize: "1.05rem" }}>{favoritePlaces.length} saved</h2>
            </article>
            <article style={{ padding: 20, borderRadius: 20, background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
              <p style={{ margin: 0, color: "var(--text-muted)", fontSize: 12, textTransform: "uppercase", letterSpacing: "0.14em" }}>Status</p>
              <h2 style={{ margin: "10px 0 0", fontSize: "1.05rem" }}>Signed in</h2>
            </article>
          </div>

          <div style={{ marginTop: 32 }}>
            <h2 style={{ marginBottom: 14, fontSize: "1.2rem" }}>Quick Actions</h2>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
              <Link href="/" style={{ color: "var(--text-primary)", textDecoration: "none", padding: "11px 16px", borderRadius: 999, border: "1px solid rgba(255,255,255,0.1)" }}>
                Explore places
              </Link>
              <Link href="/favorites" style={{ color: "var(--text-primary)", textDecoration: "none", padding: "11px 16px", borderRadius: 999, border: "1px solid rgba(255,255,255,0.1)" }}>
                Open favorites
              </Link>
              <Link href="/suggest-a-place" style={{ color: "var(--text-primary)", textDecoration: "none", padding: "11px 16px", borderRadius: 999, border: "1px solid rgba(255,255,255,0.1)" }}>
                Suggest a place
              </Link>
            </div>
          </div>

          <div style={{ marginTop: 32 }}>
            <h2 style={{ marginBottom: 14, fontSize: "1.2rem" }}>Favorite Spots</h2>
            {favoritePlaces.length > 0 ? (
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 14 }}>
                {favoritePlaces.slice(0, 6).map((place) => (
                  <article key={place.id} style={{ padding: 18, borderRadius: 18, background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
                    <h3 style={{ margin: 0, fontSize: "1rem" }}>{place.name}</h3>
                    <p style={{ margin: "10px 0 0", color: "var(--text-secondary)", fontSize: "0.92rem", lineHeight: 1.6 }}>
                      {place.area} · {place.category}
                    </p>
                  </article>
                ))}
              </div>
            ) : (
              <div style={{ padding: 24, borderRadius: 18, background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", color: "var(--text-secondary)" }}>
                You have not saved anything yet. Tap the heart on any place to build your list.
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

export default function DashboardPage() {
  return (
    <FavoritesProvider>
      <DashboardContent />
    </FavoritesProvider>
  );
}