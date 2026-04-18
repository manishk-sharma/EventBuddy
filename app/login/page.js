"use client";
import { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff, Compass } from "lucide-react";
import styles from "./login.module.css";

// SVGs for social logos pulled outside component to prevent re-renders
const GoogleIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18">
    <path
      fill="#4285F4"
      d="M17.64 9.2c0-.63-.06-1.25-.16-1.84H9v3.49h4.84a4.14 4.14 0 0 1-1.8 2.71v2.26h2.91c1.7-1.57 2.69-3.88 2.69-6.62z"
    />
    <path
      fill="#34A853"
      d="M9 18c2.43 0 4.47-.8 5.96-2.18l-2.91-2.26a5.4 5.4 0 0 1-8.09-2.85h-3v2.33A9 9 0 0 0 9 18z"
    />
    <path
      fill="#FBBC05"
      d="M3.96 10.71a5.4 5.4 0 0 1 0-3.42V4.96h-3a9 9 0 0 0 0 8.08l3-2.33z"
    />
    <path
      fill="#EA4335"
      d="M9 3.58c1.32 0 2.5.45 3.44 1.35L15.02 2.3A9 9 0 0 0 1.96 4.96l3 2.33A5.4 5.4 0 0 1 9 3.58z"
    />
  </svg>
);

const GithubIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className={styles.loginContainer}>
      {/* Decorative Side */}
      <div className={styles.decorativeSide}>
        <div className={styles.decorativeLogo} style={{ position: 'absolute', top: '40px', left: '40px' }}>
          <Link href="/" className={styles.logo} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
             <Compass size={24} color="#7f56d9" />
             <span style={{ fontWeight: 800, fontSize: '1.2rem', color: '#7f56d9' }}>EventBuddy</span>
          </Link>
        </div>
      </div>

      {/* Form Side */}
      <div className={styles.formSide}>
        <div className={styles.formWrapper}>
          <div className={styles.header}>
            <h1 className={styles.title}>Welcome back</h1>
            <p className={styles.subtitle}>Please log in to continue.</p>
          </div>

          <div className={styles.socialRow}>
            <button className={styles.socialBtn}>
              <GoogleIcon />
              <span>Google</span>
            </button>
            <button className={styles.socialBtn}>
              <GithubIcon />
              <span>GitHub</span>
            </button>
          </div>

          <div className={styles.divider}>or</div>

          <div className={styles.inputGroup}>
            <div className={styles.inputWrapper}>
              <input
                type="email"
                placeholder="Email"
                className={styles.inputField}
                required
              />
            </div>
            <div className={styles.inputWrapper}>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className={styles.inputField}
                required
              />
              <button
                type="button"
                className={styles.passwordToggle}
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <button className={styles.continueBtn}>Continue</button>

          <div className={styles.footerLinks}>
            <Link href="/forgot-password" className={styles.link}>
              Forgot your password? <span style={{ textDecoration: 'underline' }}>Reset Your Password</span>
            </Link>
            <p className={styles.registerText}>
              Don't have an account? <Link href="/register" className={styles.registerLink}>Register</Link>
            </p>
          </div>

          <p className={styles.termsText}>
            By continuing, you agree to our <Link href="/terms" style={{ textDecoration: 'underline' }}>Terms of Service</Link> and <Link href="/privacy" style={{ textDecoration: 'underline' }}>Privacy Policy</Link>.
          </p>
        </div>
      </div>
    </div>
  );
}
