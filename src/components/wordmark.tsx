import * as React from "react";

type Size = "sm" | "md" | "lg" | "xl";

const wordmarkWidthPx: Record<Size, number> = {
  sm: 112,
  md: 152,
  lg: 220,
  xl: 320,
};

const markSizePx: Record<Size, number> = {
  sm: 28,
  md: 36,
  lg: 52,
  xl: 72,
};

export function BrandWordmark({
  size = "md",
  className = "",
  ariaLabel = "Devotion",
}: {
  size?: Size;
  className?: string;
  ariaLabel?: string;
}) {
  const width = wordmarkWidthPx[size];

  return (
    <img
      className={["brand-wordmark", className].filter(Boolean).join(" ")}
      src="/brand/a6-wordmark-animated.svg"
      alt={ariaLabel}
      width={width}
      height={Math.round(width / (1320 / 420))}
      decoding="async"
    />
  );
}

export function BrandMark({
  size = "md",
  className = "",
  ariaLabel = "Devotion",
}: {
  size?: Size;
  className?: string;
  ariaLabel?: string;
}) {
  const px = markSizePx[size];

  return (
    <img
      className={["brand-mark", className].filter(Boolean).join(" ")}
      src="/brand/a6-mark-animated.svg"
      alt={ariaLabel}
      width={px}
      height={px}
      decoding="async"
    />
  );
}

export function BrandName({ className = "" }: { className?: string }) {
  return <BrandWordmark size="sm" className={["brand-wordmark--inline", className].filter(Boolean).join(" ")} />;
}

export function Wordmark(props: React.ComponentProps<typeof BrandWordmark>) {
  return <BrandWordmark {...props} />;
}

export function VPressSymbol({
  size = 32,
  className = "",
}: {
  size?: number;
  className?: string;
}) {
  return (
    <img
      className={["brand-mark", className].filter(Boolean).join(" ")}
      src="/brand/a6-mark-animated.svg"
      alt="Devotion"
      width={size}
      height={size}
      decoding="async"
    />
  );
}
