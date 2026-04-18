"use client";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@clerk/nextjs";
import { MapPin, Heart, Compass, Search, X, User, ChevronDown } from "lucide-react";
import { useFavorites } from "./FavoritesContext";
import styles from "./Navbar.module.css";

const PLATFORM_LINKS = [
  { label: "Find Events", href: "/filter?category=Meetups" },
  { label: "Discover Cafes", href: "/filter?category=Cafes" },
  { label: "Coding Spots", href: "/filter?category=Coding%20Spots" },
  { label: "Weekend Plans", href: "/filter?category=Weekend%20Plans" },
];

const LOCATIONS = [
  { id: "Both", label: "Delhi & Noida", region: "NCR" },
  { id: "Delhi", label: "Delhi", region: "New Delhi" },
  { id: "Noida", label: "Noida", region: "Uttar Pradesh" },
];

export default function Navbar({
  search = "",
  onSearchChange,
  location = "Both",
  onLocationChange,
  activeCategory = "all",
  onCategoryChange,
}) {
  const pathname = usePathname();
  const { favorites } = useFavorites();
  const { isSignedIn } = useAuth();
  const [locOpen, setLocOpen] = useState(false);
  const locRef = useRef(null);

  // Close location dropdown when clicking outside
  useEffect(() => {
    function handleClick(e) {
      if (locRef.current && !locRef.current.contains(e.target)) {
        setLocOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const currentLoc = LOCATIONS.find((l) => l.id === location) || LOCATIONS[0];

  return (
    <nav className={styles.nav} id="main-nav">
      {/* ===== Row 1 ===== */}
      <div className={styles.topRow}>
        {/* Logo */}
        <Link href="/" className={styles.logo}>
          <span className={styles.logoIcon}>
            <Compass size={18} color="#fff" />
          </span>
          <span className={styles.logoText}>EventBuddy</span>
        </Link>

        {/* Actions (Saved, Profile) */}
        <div className={styles.actions}>
          <Link
            href="/favorites"
            className={`${styles.actionLink} ${pathname === "/favorites" ? styles.actionLinkActive : ""}`}
            id="nav-favorites"
          >
            <Heart size={16} />
            <span>Saved</span>
            {favorites.length > 0 && (
              <span className={styles.favBadge}>{favorites.length}</span>
            )}
          </Link>
          {isSignedIn ? (
            <Link href="/dashboard" className={styles.profileBtn} id="nav-dashboard" title="Dashboard">
              <User size={18} color="#fff" />
            </Link>
          ) : (
            <Link href="/login" className={styles.profileBtn} id="nav-login" title="Login">
              <User size={18} color="#fff" />
            </Link>
          )}
        </div>

        {/* Location Pill */}
        <div className={styles.locationPill} ref={locRef} onClick={() => setLocOpen((v) => !v)} id="location-picker">
          <MapPin size={16} className={styles.locationPinIcon} />
          <span className={styles.locationCity}>{currentLoc.label}</span>
          <span className={styles.locationRegion}>{currentLoc.region}</span>
          <ChevronDown size={14} style={{ color: "var(--text-muted)", transition: "transform 0.2s", transform: locOpen ? "rotate(180deg)" : "none" }} />

          {locOpen && (
            <div className={styles.locationDropdown}>
              {LOCATIONS.map((loc) => (
                <button
                  key={loc.id}
                  className={`${styles.locationOption} ${location === loc.id ? styles.locationOptionActive : ""}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    onLocationChange?.(loc.id);
                    setLocOpen(false);
                  }}
                  id={`loc-${loc.id.toLowerCase()}`}
                >
                  <span className={styles.locationOptionDot} />
                  {loc.label}
                </button>
              ))}
            </div>
          )}
        </div>

        <span className={styles.divider} />

        {/* Platform Links */}
        <div className={styles.platformLinks}>
          <span className={styles.platformTitle}>PLATFORM</span>
          {PLATFORM_LINKS.map((link) => (
            <Link key={link.label} href={link.href} className={styles.platformLink}>
              {link.label}
            </Link>
          ))}
        </div>


      </div>

      {/* ===== Row 2: Search ===== */}
      <div className={styles.searchRow}>
        <div className={styles.searchBox}>
          <Search size={18} className={styles.searchIcon} />
          <input
            type="text"
            className={styles.searchInput}
            placeholder="Search for events, cafes, and spots..."
            value={search}
            onChange={(e) => onSearchChange?.(e.target.value)}
            id="search-input"
          />
          {search && (
            <button className={styles.clearBtn} onClick={() => onSearchChange?.("")} id="search-clear">
              <X size={14} />
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
