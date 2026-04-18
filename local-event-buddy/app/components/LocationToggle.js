"use client";
import styles from "./LocationToggle.module.css";

const locations = ["Delhi", "Noida", "Both"];

export default function LocationToggle({ value, onChange }) {
  return (
    <div className={styles.wrapper} id="location-toggle">
      <div className={styles.toggle}>
        {locations.map((loc) => (
          <button
            key={loc}
            className={`${styles.option} ${value === loc ? styles.optionActive : ""}`}
            onClick={() => onChange(loc)}
            id={`loc-${loc.toLowerCase()}`}
          >
            <span className={styles.dot} />
            {loc}
          </button>
        ))}
      </div>
    </div>
  );
}
