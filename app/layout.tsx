import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "NECT | National Engineering Coordinating Team",
  description:
    "Coordinating Ghana's infrastructure, protecting road reservations, and preventing utility damage.",
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