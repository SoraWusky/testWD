import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "WildDog Events — Underground. Alive. Unstoppable.",
  description:
    "WildDog Events brings you the most immersive underground events in the scene. Dark. Energetic. Unforgettable.",
  openGraph: {
    title: "WildDog Events",
    description: "Underground. Alive. Unstoppable.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable}`}>
      <body className="noise">{children}</body>
    </html>
  );
}
