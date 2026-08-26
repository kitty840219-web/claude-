export default function StatBadge({
  icon,
  label,
  light = false,
}: {
  icon: React.ReactNode;
  label: string;
  light?: boolean;
}) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-xs font-semibold tracking-wide ${
        light
          ? "border-paper/25 bg-paper/10 text-paper/90"
          : "border-gold/30 bg-paper text-night shadow-card"
      }`}
    >
      <span className={light ? "text-gold-light" : "text-gold-dark"}>{icon}</span>
      {label}
    </span>
  );
}
