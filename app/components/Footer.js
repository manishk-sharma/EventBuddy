import Link from "next/link";
import styles from "./Footer.module.css";

/* ---- Inline SVG social icons ---- */
const InstagramIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const TwitterIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const FacebookIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);

const LinkedInIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const YouTubeIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814z" />
    <polygon fill="#1a1a1a" points="9.545,15.568 15.818,12 9.545,8.432" />
  </svg>
);

const PLATFORM_LINKS = [
  { label: "Find Events", href: "/filter?category=Meetups" },
  { label: "Discover Cafes", href: "/filter?category=Cafes" },
  { label: "Coding Spots", href: "/filter?category=Coding%20Spots" },
  { label: "Weekend Plans", href: "/filter?category=Weekend%20Plans" },
];

const SUPPORT_LINKS = [
  { label: "Help Center", href: "/help-center" },
  { label: "Contact Us", href: "/contact-us" },
  { label: "Suggest a Place", href: "/suggest-a-place" },
  { label: "Trust & Safety", href: "/trust-safety" },
];

const COMPANY_LINKS = [
  { label: "About Us", href: "/about-us" },
  { label: "Careers", href: "/careers" },
  { label: "Blog", href: "/blog" },
];

const SOCIAL_ICONS = [
  { Icon: InstagramIcon, label: "Instagram" },
  { Icon: TwitterIcon, label: "X / Twitter" },
  { Icon: FacebookIcon, label: "Facebook" },
  { Icon: LinkedInIcon, label: "LinkedIn" },
  { Icon: YouTubeIcon, label: "YouTube" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer} id="site-footer">
      {/* ---- Main Grid ---- */}
      <div className={styles.footerMain}>
        {/* Brand */}
        <div className={styles.brandCol}>
          <h2 className={styles.brandName}>
            Event<span className={styles.brandAccent}>Buddy</span>
          </h2>
          <p className={styles.brandTagline}>
            Delhi & Noida&rsquo;s go-to guide for meetups, cafes, coding spots, and weekend vibes —
            all on one platform.
          </p>
          <div className={styles.socials}>
            {SOCIAL_ICONS.map(({ Icon, label }) => (
              <a
                key={label}
                href="#"
                className={styles.socialIcon}
                aria-label={label}
                title={label}
              >
                <Icon />
              </a>
            ))}
          </div>
        </div>

        {/* Platform */}
        <div className={styles.linkCol}>
          <h3 className={styles.colTitle}>Platform</h3>
          <div className={styles.colLinks}>
            {PLATFORM_LINKS.map(({ label, href }) => (
              <Link key={label} href={href} className={styles.colLink}>
                {label}
              </Link>
            ))}
          </div>
        </div>

        {/* Support */}
        <div className={styles.linkCol}>
          <h3 className={styles.colTitle}>Support</h3>
          <div className={styles.colLinks}>
            {SUPPORT_LINKS.map(({ label, href }) => (
              <Link key={label} href={href} className={styles.colLink}>
                {label}
              </Link>
            ))}
          </div>
        </div>

        {/* Company */}
        <div className={styles.linkCol}>
          <h3 className={styles.colTitle}>Company</h3>
          <div className={styles.colLinks}>
            {COMPANY_LINKS.map(({ label, href }) => (
              <Link key={label} href={href} className={styles.colLink}>
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* ---- Serving Banner ---- */}
      <div className={styles.servingBanner}>
        <div className={styles.servingPill}>
          <span className={styles.servingDot} />
          Currently serving&nbsp;
          <span className={styles.servingCity}>Delhi</span>
          <span className={styles.servingSep}>·</span>
          <span className={styles.servingCity}>Noida</span>
          <span className={styles.servingSep}>·</span>
          <span className={styles.servingCity}>NCR</span>
          &nbsp;—&nbsp;
          <span className={styles.servingExpand}>expanding soon</span>
        </div>
      </div>

      {/* ---- Bottom Bar ---- */}
      <div className={styles.bottomBar}>
        <div className={styles.bottomInner}>
          <span>© {year} EventBuddy. All rights reserved. · eventbuddy.in</span>
          <div className={styles.bottomLinks}>
            <Link href="/privacy" className={styles.bottomLink}>Privacy Policy</Link>
            <Link href="/terms" className={styles.bottomLink}>Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
