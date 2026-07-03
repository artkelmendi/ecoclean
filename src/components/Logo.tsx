// Exact vector geometry extracted from the official Eco Clean brand PDF (eco1.pdf).
// The mark is two rotational "swirl" halves forming a lowercase e.

export const MARK_VIEWBOX = "0 0 192.4 200.7";

// Bottom-left half of the swirl
export const MARK_PATH_A =
  "M100.1,200.6 C135.5,200.6 166.6,182.2 184.4,154.4 C173.2,164.4 158.5,170.4 142.4,170.4 C107.4,170.4 79,142 79,107 C79,97.1 81.3,87.8 85.3,79.4 L8,79.4 L2.2,79.4 C0.7,86.2 0,93.3 0,100.5 C0,155.8 44.8,200.6 100.1,200.6 Z";

// Top-right half of the swirl
export const MARK_PATH_B =
  "M100.7,0 C100.4,0 100,0 99.5,0 C98.6,0 97.7,0.1 96.7,0.1 C96.1,0.1 95.4,0.2 94.7,0.2 C93.8,0.3 92.9,0.3 92,0.4 C91.6,0.4 91.2,0.5 90.9,0.5 C56.8,3.8 27.7,24 11.9,52.5 C14.7,49.9 17.9,47.5 21.2,45.4 C28.1,41.1 35.9,38.2 44.3,37 C47,36.6 49.7,36.4 52.5,36.4 C72.9,36.4 90.9,46.8 101.6,62.5 C105.6,68.5 108.6,75.3 110.3,82.5 C111.2,86.8 111.7,91.1 111.7,95.7 C111.7,105.4 109.4,114.6 105.2,122.7 L186.8,122.7 C190.3,112.9 192.3,102.4 192.3,91.4 C192.3,41 151.3,0.1 100.7,0 Z";

export function LogoMark({
  className = "",
  color = "#297BF5",
}: {
  className?: string;
  color?: string;
}) {
  return (
    <svg
      viewBox={MARK_VIEWBOX}
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path d={MARK_PATH_A} fill={color} />
      <path d={MARK_PATH_B} fill={color} />
    </svg>
  );
}

export function LogoFull({
  className = "",
  markColor = "#297BF5",
  textColor = "#0B1526",
}: {
  className?: string;
  markColor?: string;
  textColor?: string;
}) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <LogoMark className="h-9 w-auto shrink-0" color={markColor} />
      <span
        className="font-display leading-none tracking-tight"
        style={{ color: textColor }}
      >
        <span className="block text-[1.15rem] font-semibold lowercase leading-[1.05]">
          eco clean
        </span>
        <span className="block text-[0.55rem] font-medium uppercase tracking-[0.35em] opacity-60">
          with us
        </span>
      </span>
    </span>
  );
}
