export default function SectionHeading({
  eyebrow,
  className = "",
  tone = "light",
}: {
  eyebrow: string;
  className?: string;
  tone?: "light" | "dark";
}) {
  const color = tone === "dark" ? "text-on-dark-muted" : "text-muted";
  return (
    <div className={className}>
      <span className={`mono-label tracking-[0.18em] ${color}`}>{eyebrow}</span>
    </div>
  );
}
