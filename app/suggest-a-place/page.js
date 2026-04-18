import StaticPageShell from "../components/StaticPageShell";

export default function SuggestAPlacePage() {
  return (
    <StaticPageShell
      eyebrow="Platform"
      title="Suggest a Place"
      description="Share cafes, events, coworking spaces, or hidden spots you think belong on EventBuddy."
      sections={[
        { title: "Send a Suggestion", items: ["Place name and neighborhood.", "Category: cafe, event, food, music, art, or workspace.", "Why it fits the EventBuddy vibe."] },
        { title: "Best format", items: ["A short description.", "Opening hours if you know them.", "Any social link or website."] },
      ]}
    />
  );
}