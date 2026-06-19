"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/80 backdrop-blur-md transition-all duration-300">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-10">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative flex h-10 sm:h-12 items-center justify-center transition-transform group-hover:scale-105">
            <Image src="/NECT.jpeg" alt="NECT Logo" width={100} height={50} className="h-full w-auto object-contain mix-blend-multiply" />
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-8 text-sm font-semibold text-slate-600 lg:flex">
          <Link href="/about" className="transition-colors hover:text-slate-900">About NECT</Link>
          <Link href="/agencies" className="transition-colors hover:text-slate-900">Agencies</Link>
          <Link href="/resources" className="transition-colors hover:text-slate-900">Resources</Link>
          <Link href="/news" className="transition-colors hover:text-slate-900">News & Press</Link>
          <Link href="/gallery" className="transition-colors hover:text-slate-900">Gallery</Link>
          <Link href="/videos" className="transition-colors hover:text-slate-900">Videos</Link>
          <Link href="/#portal" className="transition-colors hover:text-slate-900">Citizen Portal</Link>
          <Link href="/track" className="transition-colors hover:text-slate-900">Track Report</Link>
        </nav>

        <div className="flex items-center gap-3 sm:gap-4">
          <Link
            href="/report"
            className="hidden sm:inline-flex items-center justify-center rounded-sm bg-[#CE1126] px-5 sm:px-6 py-2 sm:py-2.5 text-xs sm:text-sm font-bold text-white transition-all hover:bg-[#a80e1f] hover:shadow-md"
          >
            Report Issue
          </Link>
          <button 
            className="lg:hidden p-2 text-slate-600"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Nav Drawer */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-5 py-4 absolute w-full shadow-lg">
          <nav className="flex flex-col gap-4 text-sm font-semibold text-slate-600">
            <Link href="/about" onClick={() => setIsMobileMenuOpen(false)} className="py-2 hover:text-slate-900">About NECT</Link>
            <Link href="/agencies" onClick={() => setIsMobileMenuOpen(false)} className="py-2 hover:text-slate-900">Agencies</Link>
            <Link href="/resources" onClick={() => setIsMobileMenuOpen(false)} className="py-2 hover:text-slate-900">Resources</Link>
            <Link href="/news" onClick={() => setIsMobileMenuOpen(false)} className="py-2 hover:text-slate-900">News & Press</Link>
            <Link href="/gallery" onClick={() => setIsMobileMenuOpen(false)} className="py-2 hover:text-slate-900">Gallery</Link>
            <Link href="/videos" onClick={() => setIsMobileMenuOpen(false)} className="py-2 hover:text-slate-900">Videos</Link>
            <Link href="/#portal" onClick={() => setIsMobileMenuOpen(false)} className="py-2 hover:text-slate-900">Citizen Portal</Link>
            <Link href="/track" onClick={() => setIsMobileMenuOpen(false)} className="py-2 hover:text-slate-900">Track Report</Link>
            <Link href="/report" onClick={() => setIsMobileMenuOpen(false)} className="sm:hidden mt-2 rounded-sm bg-[#CE1126] px-4 py-3 text-center text-white font-bold">
              Report Issue
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}