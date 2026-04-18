"use client";
import { useState } from "react";
import { Heart, ChevronDown, ChevronUp, MapPin, Clock, ExternalLink, Share2 } from "lucide-react";
import { useFavorites } from "./FavoritesContext";
import styles from "./PlaceCard.module.css";

const categoryImage = {
  Meetups: "/images/meetup.png",
  Cafes: "/images/cafe.png",
  "Coding Spots": "/images/coworking.png",
  "Weekend Plans": "/images/weekend.png",
};

const categoryBadgeClass = {
  Meetups: styles.badgeMeetups,
  Cafes: styles.badgeCafes,
  "Coding Spots": styles.badgeCoding,
  "Weekend Plans": styles.badgeWeekend,
};

function PriceIndicator({ price }) {
  const rupees = [];
  for (let i = 0; i < 3; i++) {
    rupees.push(
      <span key={i} className={i >= price ? styles.priceInactive : ""}>
        ₹
      </span>
    );
  }
  return <span className={styles.price}>{price === 0 ? "Free" : rupees}</span>;
}

export default function PlaceCard({ place, index }) {
  const [expanded, setExpanded] = useState(false);
  const { toggleFavorite, isFavorite } = useFavorites();
  const fav = isFavorite(place.id);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: place.name,
          text: `Check out ${place.name} in ${place.area}, ${place.location}!`,
          url: place.mapLink,
        });
      } catch {}
    } else {
      navigator.clipboard?.writeText(
        `${place.name} — ${place.area}, ${place.location}\n${place.mapLink}`
      );
    }
  };

  return (
    <article
      className={styles.card}
      style={{ animationDelay: `${0.05 * (index % 12)}s` }}
      id={`place-card-${place.id}`}
    >
      {/* Image Area */}
      <div className={styles.imageWrap}>
        <img
          src={categoryImage[place.category] || "/images/cafe.png"}
          alt={place.name}
          className={styles.cardImage}
          loading="lazy"
        />
        <div className={styles.imageOverlay} />

        <span className={`${styles.categoryBadge} ${categoryBadgeClass[place.category] || ""}`}>
          {place.category}
        </span>

        <span className={`${styles.statusDot} ${place.isOpen ? styles.statusOpen : styles.statusClosed}`}>
          <span className={styles.statusIndicator} />
          {place.isOpen ? "Open" : "Closed"}
        </span>
      </div>

      {/* Body */}
      <div className={styles.body}>
        <h3 className={styles.name}>{place.name}</h3>

        <div className={styles.locationRow}>
          <MapPin size={12} />
          {place.area}, {place.location}
        </div>

        <div className={styles.meta}>
          <span className={styles.rating}>
            <span className={styles.ratingStar}>★</span>
            {place.rating}
          </span>
          <PriceIndicator price={place.price} />
        </div>

        <div className={styles.vibes}>
          {place.vibe.slice(0, 3).map((v) => (
            <span key={v} className={styles.vibe}>{v}</span>
          ))}
        </div>

        {/* Actions */}
        <div className={styles.actions}>
          <button
            className={`${styles.favBtn} ${fav ? styles.favBtnActive : ""}`}
            onClick={() => toggleFavorite(place.id)}
            id={`fav-btn-${place.id}`}
            aria-label={fav ? "Remove from favorites" : "Add to favorites"}
          >
            <Heart size={14} fill={fav ? "currentColor" : "none"} />
            {fav ? "Saved" : "Save"}
          </button>

          <button className={styles.actionBtn} onClick={handleShare} aria-label="Share">
            <Share2 size={14} />
            Share
          </button>

          <button
            className={styles.expandBtn}
            onClick={() => setExpanded(!expanded)}
            id={`expand-btn-${place.id}`}
            aria-label={expanded ? "Show less" : "Show more"}
          >
            {expanded ? "Less" : "More"}
            {expanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
          </button>
        </div>
      </div>

      {/* Expandable Details */}
      {expanded && (
        <div className={styles.details}>
          <p className={styles.description}>{place.description}</p>
          <div className={styles.timings}>
            <Clock size={12} />
            {place.timings}
          </div>
          <a
            href={place.mapLink}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.mapLink}
          >
            <ExternalLink size={12} />
            Open in Google Maps
          </a>
        </div>
      )}
    </article>
  );
}

export function PlaceGrid({ places }) {
  if (!places || places.length === 0) {
    return (
      <div className={styles.grid}>
        <div className={styles.emptyState}>
          <div className={styles.emptyIcon}>🔍</div>
          <h3 className={styles.emptyTitle}>No spots found</h3>
          <p className={styles.emptyText}>Try changing your filters or search query</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.grid}>
      {places.map((place, i) => (
        <PlaceCard key={place.id} place={place} index={i} />
      ))}
    </div>
  );
}
