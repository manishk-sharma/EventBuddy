import StaticPageShell from "../components/StaticPageShell";

export default function TrustSafetyPage() {
  return (
    <StaticPageShell
      eyebrow="Support"
      title="Trust & Safety"
      description="We aim to keep recommendations useful, current, and safe. If something looks off, tell us and we will review it."
      sections={[
        { title: "Our Approach", items: ["We prefer real venues over spammy listings.", "We remove places that receive repeated abuse reports.", "We avoid sharing private user data."] },
        { title: "Report Issues", items: ["Wrong address or hours.", "Inappropriate content.", "Safety concerns at a venue."] },
      ]}
    />
  );
}