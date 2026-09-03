"use client";

type Meteor = { top: string; left: string; length: number; delay: string; duration: string };

const METEORS: Meteor[] = [
  { top: "6%", left: "18%", length: 90, delay: "0s", duration: "7s" },
  { top: "14%", left: "62%", length: 110, delay: "2.4s", duration: "8.5s" },
  { top: "32%", left: "8%", length: 80, delay: "5.1s", duration: "7.8s" },
  { top: "48%", left: "75%", length: 100, delay: "1.3s", duration: "9s" },
  { top: "65%", left: "30%", length: 90, delay: "3.6s", duration: "8s" },
  { top: "78%", left: "55%", length: 70, delay: "6.4s", duration: "7.2s" },
];

export default function MeteorShower() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed left-1/2 top-0 -z-10 h-full w-full max-w-[430px] -translate-x-1/2 overflow-hidden"
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
