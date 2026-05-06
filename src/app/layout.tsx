import "./globals.css";
import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, Newsreader } from "next/font/google";
import { CursorGlow } from "@/components/cursor-glow";

// UI / display font, DeskWolf house style.
const sans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-sans",
  display: "swap",
});

// Wordmark-only serif. Used to render the V-press's classic V; not used
// elsewhere on the site. The original V-press logo (v6 W1 spec) was a
// fancy serif V with the barbell plates sitting on the tips.
const serif = Newsreader({
  subsets: ["latin"],
  axes: ["opsz"],
  variable: "--font-wordmark",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://devotion.fitness"),
  title: {
    default: "Devotion — A daily practice of strength",
    template: "%s · Devotion",
  },
  description:
    "Strength training as a daily practice. Programmed for you, captured set by set, reviewed weekly with the calm of an old craft. No streaks. No badges. No noise.",
  keywords: [
    "strength training app",
    "programmed lifting",
    "workout programming",
    "daily lifting practice",
    "no streaks fitness app",
    "powerlifting app",
    "hypertrophy programming",
  ],
  authors: [{ name: "Devotion" }],
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: "https://devotion.fitness",
    siteName: "Devotion",
    title: "Devotion — A daily practice of strength",
    description:
      "Strength training as a daily practice. Programmed for you, captured set by set, reviewed weekly with the calm of an old craft.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Devotion — A daily practice of strength",
    description:
      "Strength training as a daily practice. Programmed, captured, reviewed.",
  },
  alternates: {
    canonical: "https://devotion.fitness",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f5f2fb" },
    { media: "(prefers-color-scheme: dark)", color: "#0d0818" },
  ],
};

// Runs before React hydrates; prevents the "flash of wrong theme."
// Default is DARK. Only switches to light if the user has explicitly
// chosen light via the toggle (which writes to localStorage).
const themeBoot = `
(function () {
  try {
    var stored = localStorage.getItem('devotion:theme');
    var theme = stored === 'light' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', theme);
  } catch (_) {
    document.documentElement.setAttribute('data-theme', 'dark');
  }
})();
`.trim();

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${sans.variable} ${serif.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeBoot }} />
      </head>
      <body>
        <CursorGlow />
        {children}
      </body>
    </html>
  );
}
