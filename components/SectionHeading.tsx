export default function SectionHeading({
  eyebrow,
  title,
  desc,
  light = false,
  center = false,
}: {
  eyebrow?: string;
  title: string;
  desc?: string;
  light?: boolean;
  center?: boolean;
}) {
  return (
    <div className={center ? "text-center" : ""}>
      {eyebrow && (
        <p
          className={`mb-2 text-xs font-semibold tracking-[0.3em] ${
            light ? "text-gold-light" : "text-gold-dark"
          }`}
        >
          {eyebrow}
        </p>
      )}
      <h2
        className={`font-serif text-2xl font-bold sm:text-3xl ${
          light ? "text-paper" : "text-night"
        }`}
      >
        {title}
      </h2>
      {desc && (
        <p
          className={`mt-3 max-w-2xl text-sm leading-relaxed sm:text-base ${
            center ? "mx-auto" : ""
          } ${light ? "text-paper/70" : "text-ink-600"}`}
        >
          {desc}
        </p>
      )}
    </div>
  );
}
