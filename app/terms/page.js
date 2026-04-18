import StaticPageShell from "../components/StaticPageShell";

export default function TermsPage() {
  return (
    <StaticPageShell
      eyebrow="Legal"
      title="Terms of Service"
      description="These terms outline how people may use EventBuddy. Replace this placeholder with your final terms before launch."
      sections={[
        { title: "Usage", items: ["Do not abuse the platform.", "Do not submit harmful or misleading listings.", "Respect venue and community guidelines."] },
        { title: "Note", items: ["This is a placeholder terms page.", "Replace it with your final legal text."] },
      ]}
    />
  );
}