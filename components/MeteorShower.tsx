"use client";

type Meteor = { top: string; left: string; length: number; delay: string; duration: string };

/* Kept along the far left margin so the falling trail never crosses the
   hero text/character artwork, which almost always sits center-right. */
const METEORS: Meteor[] = [
  { top: "3%", left: "1%", length: 50, delay: "0s", duration: "7s" },
  { top: "18%", left: "2%", length: 55, delay: "2.6s", duration: "8s" },
  { top: "34%", left: "1%", length: 45, delay: "5.1s", duration: "7.5s" },
  { top: "52%", left: "2%", length: 50, delay: "1.4s", duration: "8.5s" },
  { top: "70%", left: "1%", length: 45, delay: "4.2s", duration: "7.8s" },
  { top: "86%", left: "2%", length: 50, delay: "6.4s", duration: "7.2s" },
];

export default function MeteorShower() {
  return (
    <div
      aria-hidden="true"
      className="night-only-decor pointer-events-none fixed left-1/2 top-0 z-20 h-full w-full max-w-[430px] -translate-x-1/2 overflow-hidden"
    >
      {METEORS.map((m, i) => (
        <span
          key={i}
          className="animate-meteor absolute h-px rounded-full bg-gradient-to-r from-transparent via-white/40 to-white/70"
          style={{
            top: m.top,
            left: m.left,
            width: `${m.length}px`,
            animationDelay: m.delay,
            animationDuration: m.duration,
          }}
        />
      ))}
    </div>
  );
}
