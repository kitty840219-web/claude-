let ctx: AudioContext | null = null;

function getContext(): AudioContext | null {
  if (typeof window === "undefined") return null;
  const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
  if (!AudioContextClass) return null;
  if (!ctx) ctx = new AudioContextClass();
  if (ctx.state === "suspended") ctx.resume().catch(() => {});
  return ctx;
}

// A bright two-note "twinkle" chime, synthesized on the fly (no audio file needed).
export function playTwinkleSound() {
  const audioCtx = getContext();
  if (!audioCtx) return;

  const now = audioCtx.currentTime;
  const notes: { freq: number; start: number; duration: number }[] = [
    { freq: 1318.5, start: 0, duration: 0.16 },
    { freq: 1760, start: 0.07, duration: 0.22 },
  ];

  for (const note of notes) {
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = "sine";
    osc.frequency.value = note.freq;
    gain.gain.setValueAtTime(0, now + note.start);
    gain.gain.linearRampToValueAtTime(0.12, now + note.start + 0.015);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + note.start + note.duration);
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start(now + note.start);
    osc.stop(now + note.start + note.duration + 0.02);
  }
}
