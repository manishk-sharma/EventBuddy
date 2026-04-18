import "./globals.css";

export const metadata = {
  title: "Local Event Buddy — Delhi & Noida",
  description:
    "Discover the best meetups, cafes, coding spots, and weekend plans across Delhi & Noida. Personalized recommendations based on your vibe.",
  keywords: ["Delhi events", "Noida cafes", "coding spots", "weekend plans", "meetups Delhi NCR"],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
