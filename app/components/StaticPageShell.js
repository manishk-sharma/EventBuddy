import Link from "next/link";

export default function StaticPageShell({ eyebrow, title, description, sections = [], ctaHref = "/", ctaLabel = "Back to Home" }) {
  return (
    <main
      className="page-content"
      style={{
        minHeight: "72vh",
        padding: "56px 20px 72px",
        display: "grid",
        placeItems: "center",
      }}
    >
      <section
        style={{
          width: "100%",
          maxWidth: "960px",
          background: "linear-gradient(180deg, rgba(26,26,26,0.96), rgba(16,16,16,0.98))",
          border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: "28px",
          padding: "36px",
          boxShadow: "0 24px 80px rgba(0,0,0,0.28)",
        }}
      >
        <p style={{ color: "var(--accent-amber)", letterSpacing: "0.18em", textTransform: "uppercase", fontSize: "0.75rem", fontWeight: 700, marginBottom: "12px" }}>
          {eyebrow}
        </p>
        <h1 style={{ fontSize: "clamp(2.2rem, 4vw, 3.8rem)", lineHeight: 1.05, margin: 0, color: "var(--text-primary)" }}>
          {title}
        </h1>
        <p style={{ marginTop: "18px", maxWidth: "760px", color: "var(--text-secondary)", fontSize: "1.05rem", lineHeight: 1.7 }}>
          {description}
        </p>

        {sections.length > 0 && (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: "16px",
              marginTop: "28px",
            }}
          >
            {sections.map((section) => (
              <article
                key={section.title}
                style={{
                  padding: "18px",
                  borderRadius: "20px",
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.06)",
                }}
              >
                <h2 style={{ margin: 0, fontSize: "1rem", color: "var(--text-primary)" }}>{section.title}</h2>
                <ul style={{ margin: "14px 0 0", paddingLeft: "18px", color: "var(--text-secondary)", lineHeight: 1.7 }}>
                  {section.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        )}

        <div style={{ marginTop: "32px", display: "flex", flexWrap: "wrap", gap: "12px" }}>
          <Link
            href={ctaHref}
            style={{
              background: "var(--accent-amber)",
              color: "#111",
              padding: "12px 20px",
              borderRadius: "999px",
              fontWeight: 700,
              textDecoration: "none",
            }}
          >
            {ctaLabel}
          </Link>
          <Link
            href="/coming-soon"
            style={{
              border: "1px solid rgba(255,255,255,0.12)",
              color: "var(--text-primary)",
              padding: "12px 20px",
              borderRadius: "999px",
              fontWeight: 600,
              textDecoration: "none",
            }}
          >
            View coming soon page
          </Link>
        </div>
      </section>
    </main>
  );
}