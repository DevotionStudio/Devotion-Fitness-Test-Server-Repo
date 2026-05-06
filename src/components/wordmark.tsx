import * as React from "react";

type Size = "sm" | "md" | "lg" | "xl";

const sizePx: Record<Size, number> = {
  sm: 22,
  md: 30,
  lg: 44,
  xl: 64,
};

// HTML+CSS layout (no fixed SVG coords) so swapping fonts doesn't break alignment.
// The barbell SVG is anchored above the V via absolute positioning at 50%
// of the V's intrinsic letter width.
export function Wordmark({
  size = "md",
  italic = false,
  expandable = false,
  plateAccent = false,
  className = "",
  ariaLabel = "Devotion",
}: {
  size?: Size;
  italic?: boolean;
  expandable?: boolean;
  plateAccent?: boolean;
  className?: string;
  ariaLabel?: string;
}) {
  const px = sizePx[size];

  return (
    <span
      role="img"
      aria-label={ariaLabel}
      className={[
        "wm",
        expandable ? "wm-expandable" : "",
        italic ? "wm-italic" : "",
        plateAccent ? "wm-accent" : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      style={{ fontSize: px, lineHeight: 1 }}
    >
      <span className="wm-side wm-de" aria-hidden={expandable}>De</span>
      <span className="wm-v">
        V
        <span className="wm-barbell" aria-hidden="true">
          {/* tight viewBox: bar+plates fill the entire SVG box.
              barbell aspect 100:26 — width 1.05em → height 0.273em.
              the bar runs through y=13 (vertical centre) and plates touch
              top (y=0) and bottom (y=26) of the SVG box. */}
          <svg viewBox="0 0 100 26" preserveAspectRatio="xMidYMid meet">
            <line
              x1="20"
              y1="13"
              x2="80"
              y2="13"
              stroke="currentColor"
              strokeWidth="5"
              strokeLinecap="round"
            />
            <circle cx="13" cy="13" r="13" className="wm-plate" />
            <circle cx="87" cy="13" r="13" className="wm-plate" />
          </svg>
        </span>
      </span>
      <span className="wm-side wm-otion" aria-hidden={expandable}>otion</span>
    </span>
  );
}

export function VPressSymbol({
  size = 32,
  italic = false,
  className = "",
}: {
  size?: number;
  italic?: boolean;
  className?: string;
}) {
  return (
    <svg
      role="img"
      aria-label="Devotion"
      viewBox="0 0 100 100"
      width={size}
      height={size}
      className={className}
    >
      <text
        x="50"
        y="92"
        textAnchor="middle"
        fontFamily="var(--font-serif), Newsreader, Georgia, serif"
        fontWeight={500}
        fontStyle={italic ? "italic" : "normal"}
        fontSize={100}
        fill="currentColor"
      >
        V
      </text>
      <line x1="27" y1="22" x2="73" y2="22" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      <circle cx="20" cy="22" r="7" fill="var(--oxblood)" />
      <circle cx="80" cy="22" r="7" fill="var(--oxblood)" />
    </svg>
  );
}
