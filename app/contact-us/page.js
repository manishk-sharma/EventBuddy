import StaticPageShell from "../components/StaticPageShell";

export default function ContactUsPage() {
  return (
    <StaticPageShell
      eyebrow="Support"
      title="Contact Us"
      description="Send feedback, report an issue, or ask about a place listing. We usually reply within one business day."
      sections={[
        { title: "Email", items: ["support@eventbuddy.in", "partnerships@eventbuddy.in"] },
        { title: "What to include", items: ["Your city and the place name.", "A screenshot if something looks wrong.", "The page URL you were on."] },
      ]}
    />
  );
}