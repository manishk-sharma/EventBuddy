import StaticPageShell from "../components/StaticPageShell";

export default function PrivacyPage() {
  return (
    <StaticPageShell
      eyebrow="Legal"
      title="Privacy Policy"
      description="This page explains how EventBuddy handles data. Fill in the final legal policy before launch."
      sections={[
        { title: "Data We Use", items: ["Account details from Clerk.", "Basic usage data to improve the app.", "Saved places and preferences."] },
        { title: "Note", items: ["This is a placeholder privacy page.", "Replace it with your final policy text."] },
      ]}
    />
  );
}