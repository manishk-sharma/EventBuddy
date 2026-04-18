import StaticPageShell from "../components/StaticPageShell";

export default function BlogPage() {
  return (
    <StaticPageShell
      eyebrow="Company"
      title="Blog"
      description="We will use this space for product updates, local discovery notes, and city guides."
      sections={[
        { title: "Planned Topics", items: ["Best cafes for work sessions.", "Hidden gems in NCR.", "How we rank trending spots."] },
        { title: "Coming Soon", items: ["Editorial posts.", "City collections.", "Monthly recommendations."] },
      ]}
    />
  );
}