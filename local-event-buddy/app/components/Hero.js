"use client";
import styles from "./Hero.module.css";

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return { text: "Good morning", emoji: "☀️" };
  if (hour < 17) return { text: "Good afternoon", emoji: "🌤️" };
  if (hour < 21) return { text: "Good evening", emoji: "🌆" };
  return { text: "Night owl mode", emoji: "🌙" };
}

export default function Hero() {
  const { text, emoji } = getGreeting();

  return (
    <section className={styles.hero} id="hero-section">
      <div className={styles.meshBg}>
        <div className={styles.meshOrb} />
        <div className={styles.meshOrb} />
        <div className={styles.meshOrb} />
      </div>

      <div className={styles.content}>
        <p className={styles.greeting}>
          <span className={styles.greetingEmoji}>{emoji}</span>
          {text}! What are we exploring today?
        </p>
        <h1 className={styles.title}>
          Your <span className="gradient-text">Local Event Buddy</span>
        </h1>
        <p className={styles.subtitle}>
          Discover the best meetups, cafes, coding spots &amp; weekend plans across Delhi &amp; Noida
        </p>
      </div>
    </section>
  );
}
