import Link from "next/link";
import Image from "next/image";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/80 backdrop-blur-md transition-all duration-300">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-10">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative flex h-12 items-center justify-center transition-transform group-hover:scale-105">
            <Image src="/NECT.jpeg" alt="NECT Logo" width={100} height={50} className="h-full w-auto object-contain mix-blend-multiply" />
          </div>
        </Link>

        <nav className="hidden items-center gap-8 text-sm font-semibold text-slate-600 md:flex">
          <Link href="/about" className="transition-colors hover:text-slate-900">About NECT</Link>
          <Link href="/agencies" className="transition-colors hover:text-slate-900">Agencies</Link>
          <Link href="/news" className="transition-colors hover:text-slate-900">News & Press</Link>
          <Link href="/gallery" className="transition-colors hover:text-slate-900">Gallery</Link>
          <Link href="/videos" className="transition-colors hover:text-slate-900">Videos</Link>
          <Link href="/#portal" className="transition-colors hover:text-slate-900">Citizen Portal</Link>
          <Link href="/track" className="transition-colors hover:text-slate-900">Track Report</Link>
        </nav>

        <div className="flex items-center gap-4">
          <Link
            href="/report"
            className="hidden sm:inline-flex items-center justify-center rounded-sm bg-[#CE1126] px-6 py-2.5 text-sm font-bold text-white transition-all hover:bg-[#a80e1f] hover:shadow-md md:px-6"
          >
            Report Issue
          </Link>
        </div>
      </div>
    </header>
  );
}