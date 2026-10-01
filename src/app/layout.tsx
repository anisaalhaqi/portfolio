import type { Metadata, Viewport } from "next";
import { Outfit, Playfair_Display } from "next/font/google";
import Navbar from "@/components/Navbar/Navbar";
import Cursor from "@/components/Cursor/Cursor";
import BackToTop from "@/components/BackToTop/BackToTop";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Anisa Aulia | UI/UX Designer & Researcher",
  description: "Portfolio of Anisa Aulia, a UI/UX Designer & Researcher based in Bandung.",
};

// Tints the mobile browser bar to match the blue navbar at the top of every page
export const viewport: Viewport = {
  themeColor: "#4875C8",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${outfit.variable} ${playfair.variable}`}>
      <body style={{ fontFamily: "var(--font-outfit), sans-serif" }}>
        <Navbar />
        {children}
        <BackToTop />
        <Cursor />
      </body>
    </html>
  );
}
