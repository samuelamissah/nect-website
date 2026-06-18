import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "NECT | National Engineering Coordinating Team",
  description:
    "Official website of the National Engineering Coordinating Team (NECT), Ghana. Coordinating infrastructure development, protecting road reservations, preventing utility disruptions, managing stakeholder collaboration, and providing a citizen reporting platform for infrastructure concerns.",
  keywords: [
    "NECT Ghana",
    "National Engineering Coordinating Team",
    "Road reservations Ghana",
    "Infrastructure coordination",
    "Utility protection",
    "Telecommunications infrastructure",
    "Road construction Ghana",
    "Citizen reporting",
    "Engineering coordination",
    "Infrastructure management Ghana",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth" data-scroll-behavior="smooth">
      <body className={`${plusJakarta.className} antialiased text-slate-900 bg-slate-50`}>
        {children}
      </body>
    </html>
  );
}