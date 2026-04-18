import StaticPageShell from "../components/StaticPageShell";

export default function HelpCenterPage() {
  return (
    <StaticPageShell
      eyebrow="Support"
      title="Help Center"
      description="Find quick answers about using EventBuddy, exploring places, saving favorites, and managing your account."
      sections={[
        { title: "Getting Started", items: ["Search by location, interest, or vibe.", "Use Saved to keep track of places you like.", "Sign in to sync your profile across devices."] },
        { title: "Account", items: ["Use Clerk login for secure access.", "If you cannot sign in, try signing out and back in.", "Need help? Contact support and we will follow up."] },
      ]}
    />
  );
}