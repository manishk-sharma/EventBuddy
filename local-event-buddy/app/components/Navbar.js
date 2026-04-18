"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MapPin, Heart, Compass } from "lucide-react";
import { useFavorites } from "./FavoritesContext";
import styles from "./Navbar.module.css";

export default function Navbar() {
  const pathname = usePathname();
  const { favorites } = useFavorites();

  return (
    <nav className={styles.nav} id="main-nav">
      <div className={styles.navInner}>
        <Link href="/" className={styles.logo}>
          <span className={styles.logoIcon}>
            <Compass size={20} color="#fff" />
          </span>
          <span className={styles.logoText}>EventBuddy</span>
        </Link>

        <div className={styles.navLinks}>
          <Link
            href="/"
            className={`${styles.navLink} ${pathname === "/" ? styles.navLinkActive : ""}`}
            id="nav-explore"
          >
            <MapPin size={16} />
            <span>Explore</span>
          </Link>
          <Link
            href="/favorites"
            className={`${styles.navLink} ${pathname === "/favorites" ? styles.navLinkActive : ""}`}
            id="nav-favorites"
          >
            <Heart size={16} />
            <span>Saved</span>
            {favorites.length > 0 && (
              <span className={styles.favBadge}>{favorites.length}</span>
            )}
          </Link>
          <Link
            href="/login"
            className={`${styles.navLink} ${pathname === "/login" ? styles.navLinkActive : ""} ${styles.loginBtn}`}
            id="nav-login"
          >
            <span>Login</span>
          </Link>
        </div>
      </div>
    </nav>
  );
}
