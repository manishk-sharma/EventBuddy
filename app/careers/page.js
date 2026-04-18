import StaticPageShell from "../components/StaticPageShell";

export default function CareersPage() {
  return (
    <StaticPageShell
      eyebrow="Company"
      title="Careers"
      description="We are not hiring for many roles right now, but we are always open to thoughtful outreach from builders and designers."
      sections={[
        { title: "Open To", items: ["Frontend engineering.", "Content curation.", "Community partnerships."] },
        { title: "Reach Out", items: ["Send a short intro and portfolio.", "Tell us what kind of work you want to do.", "Include your preferred city or remote availability."] },
      ]}
    />
  );
}