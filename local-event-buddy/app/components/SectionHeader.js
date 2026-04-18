import styles from "./SectionHeader.module.css";

export default function SectionHeader({ icon, title, count, bgColor }) {
  return (
    <div className={styles.header}>
      <div className={styles.left}>
        <div className={styles.iconWrap} style={{ background: bgColor || "var(--bg-glass)" }}>
          {icon}
        </div>
        <h2 className={styles.title}>
          {title}
          {count !== undefined && <span className={styles.count}>({count})</span>}
        </h2>
      </div>
    </div>
  );
}
