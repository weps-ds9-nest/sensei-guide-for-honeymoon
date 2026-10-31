// Inline Fuji icons, one per verdict (blueprint: fuji.md). Decorative: the text verdict next to it carries the meaning.
// Colours come from theme tokens (--fuji-*, --maple) so they follow light and dark mode.
import type { Verdict } from "@/lib/fuji";

const MOUNTAIN = "M1 23 Q9 17 13.2 8 L18.8 8 Q23 17 31 23 Z";
const SNOW = "M13.2 8 L18.8 8 Q19.6 9.6 20.15 10.6 L18.8 10.1 L17.4 11.4 L16 10.3 L14.6 11.4 L13.2 10.1 L11.85 10.6 Q12.4 9.6 13.2 8 Z";
// Cloud in a 14 × 7 box, flat base at y = 7.
const CLOUD = "M2 7 A2 2 0 0 1 2 3 A3.5 3.5 0 0 1 8.5 2 A2.8 2.8 0 0 1 12 3.8 A1.6 1.6 0 0 1 12 7 Z";

function Cloud({ x, y, s }: { x: number; y: number; s: number }) {
  return (
    <path
      d={CLOUD}
      transform={`translate(${x} ${y}) scale(${s})`}
      fill="var(--fuji-cloud)"
      stroke="var(--fuji-cloud-edge)"
      strokeWidth={1}
      vectorEffect="non-scaling-stroke"
      strokeLinejoin="round"
    />
  );
}

export function FujiIcon({ verdict, className = "" }: { verdict: Verdict; className?: string }) {
  return (
    <svg viewBox="0 0 32 24" className={className} aria-hidden="true" focusable="false">
      {verdict !== "Unlikely" && <circle cx={26} cy={6} r={3.5} fill="var(--maple)" />}
      <path d={MOUNTAIN} fill="var(--fuji-mountain)" />
      <path d={SNOW} fill="var(--fuji-snow)" />
      {verdict === "Maybe" && <Cloud x={20.5} y={4.6} s={0.85} />}
      {verdict === "Unlikely" && (
        <>
          <Cloud x={5} y={4} s={1.55} />
          <Cloud x={16} y={12.5} s={1.05} />
        </>
      )}
    </svg>
  );
}
