"use client";
import { Search, X } from "lucide-react";
import styles from "./SearchBar.module.css";

export default function SearchBar({ value, onChange }) {
  return (
    <div className={styles.wrapper} id="search-bar">
      <div className={styles.searchBox}>
        <Search size={18} className={styles.icon} />
        <input
          type="text"
          placeholder="Search cafes, meetups, coding spots..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={styles.input}
          id="search-input"
        />
        {value && (
          <button className={styles.clearBtn} onClick={() => onChange("")} id="search-clear">
            <X size={16} />
          </button>
        )}
      </div>
    </div>
  );
}
