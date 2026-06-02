import type { Metadata } from "next";
import { Outfit, Playfair_Display } from "next/font/google";
import Navbar from "@/components/Navbar/Navbar";
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
      </body>
    </html>
  );
}
