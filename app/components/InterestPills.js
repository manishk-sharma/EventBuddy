"use client";
import styles from "./InterestPills.module.css";

const interests = [
  { id: "Tech", icon: "💻", label: "Tech" },
  { id: "Cafes", icon: "☕", label: "Cafes" },
  { id: "Art", icon: "🎨", label: "Art" },
  { id: "Fitness", icon: "💪", label: "Fitness" },
  { id: "Music", icon: "🎵", label: "Music" },
  { id: "Food", icon: "🍕", label: "Food" },
  { id: "Nightlife", icon: "🌃", label: "Nightlife" },
  { id: "Coworking", icon: "🏢", label: "Coworking" },
  { id: "Books", icon: "📚", label: "Books" },
  { id: "Photography", icon: "📷", label: "Photography" },
];

export default function InterestPills({ selected, onToggle }) {
  return (
    <div className={styles.wrapper} id="interest-pills">
      <p className={styles.label}>Pick your vibe</p>
      <div className={styles.pills}>
        {interests.map((interest) => (
          <button
            key={interest.id}
            className={`${styles.pill} ${
              selected.includes(interest.id) ? styles.pillActive : ""
            }`}
            onClick={() => onToggle(interest.id)}
            id={`interest-${interest.id.toLowerCase()}`}
          >
            <span className={styles.pillIcon}>{interest.icon}</span>
            {interest.label}
          </button>
        ))}
      </div>
    </div>
  );
}
