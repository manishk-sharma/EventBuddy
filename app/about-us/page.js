import StaticPageShell from "../components/StaticPageShell";

export default function AboutUsPage() {
  return (
    <StaticPageShell
      eyebrow="Company"
      title="About Us"
      description="EventBuddy helps people in Delhi NCR find places and plans that fit the mood, not just the map pin."
      sections={[
        { title: "What We Do", items: ["Curate cafes, events, and spaces.", "Organize by vibe, location, and interest.", "Make discovery faster and more personal."] },
        { title: "Why It Exists", items: ["To reduce endless searching.", "To surface places people actually want to visit.", "To help local discovery feel simple."] },
      ]}
    />
  );
}