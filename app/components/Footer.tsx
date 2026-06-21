import Link from "next/link";
import { Mail, Phone, MapPin, ArrowUpRight } from "lucide-react";
import Image from "next/image";

// Social media icons as SVG components
const TwitterIcon = () => (
  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

const LinkedInIcon = () => (
  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

const FacebookIcon = () => (
  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);

const YoutubeIcon = () => (
  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
  </svg>
);

export default function Footer() {
  return (
    <footer id="contact" className="border-t border-slate-200 bg-white">
      <div className="mx-auto max-w-7xl px-5 py-16 lg:px-10 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-5 lg:gap-8">
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-3 group inline-flex">
              <div className="relative flex h-12 items-center justify-center transition-transform group-hover:scale-105 mb-2">
                <Image src="/NECT.jpeg" alt="NECT Logo" width={120} height={60} className="h-full w-auto object-contain mix-blend-multiply" />
              </div>
            </Link>
            <p className="mt-6 max-w-sm text-base leading-relaxed text-slate-500">
              National Engineering Coordinating Team — Coordinating infrastructure,
              protecting road reservations and reducing service disruption across Ghana.
            </p>
            
            <div className="mt-8 flex items-center gap-3">
              <a 
                href="/twitter" 
                className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-600 transition-colors hover:bg-[#1DA1F2] hover:text-white"
                aria-label="Twitter"
              >
                <TwitterIcon />
              </a>
              <a 
                href="/linkedin" 
                className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-600 transition-colors hover:bg-[#0A66C2] hover:text-white"
                aria-label="LinkedIn"
              >
                <LinkedInIcon />
              </a>
              <a 
                href="/facebook" 
                className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-600 transition-colors hover:bg-[#1877F2] hover:text-white"
                aria-label="Facebook"
              >
                <FacebookIcon />
              </a>
              <a 
                href="/youtube" 
                className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-600 transition-colors hover:bg-[#FF0000] hover:text-white"
                aria-label="YouTube"
              >
                <YoutubeIcon />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900">Platform</h3>
            <ul className="mt-6 space-y-4 text-sm text-slate-500">
              <li><Link href="/about" className="transition-colors hover:text-slate-900">About NECT</Link></li>
              <li><Link href="/agencies" className="transition-colors hover:text-slate-900">Partner Agencies</Link></li>
              <li><Link href="/gallery" className="transition-colors hover:text-slate-900">Gallery</Link></li>
              <li><Link href="/videos" className="transition-colors hover:text-slate-900">Video Resources</Link></li>
              <li><Link href="/report" className="transition-colors hover:text-slate-900">Report Issue</Link></li>
              <li><Link href="/track" className="transition-colors hover:text-slate-900">Track Status</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900">Resources</h3>
            <ul className="mt-6 space-y-4 text-sm text-slate-500">
              <li><Link href="/resources" className="transition-colors hover:text-slate-900">Resource Centre</Link></li>
              <li><Link href="/guidelines" className="inline-flex items-center gap-1 transition-colors hover:text-slate-900">Guidelines <ArrowUpRight className="h-3 w-3" /></Link></li>
              <li><Link href="/contractors" className="inline-flex items-center gap-1 transition-colors hover:text-slate-900">Contractor Portal <ArrowUpRight className="h-3 w-3" /></Link></li>
              <li><Link href="/news" className="transition-colors hover:text-slate-900">News & Updates</Link></li>
              <li><Link href="/faq" className="transition-colors hover:text-slate-900">FAQ</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900">Contact</h3>
            <ul className="mt-6 space-y-4 text-sm text-slate-500">
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-slate-400" />
                <span>Ministries, Accra<br/>Ghana</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 shrink-0 text-slate-400" />
                <span>+233 (0) 30 200 0000</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-4 w-4 shrink-0 text-slate-400" />
                <span>info@nect.gov.gh</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 border-t border-slate-100 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-slate-500">
          <p>© {new Date().getFullYear()} National Engineering Coordinating Team. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-slate-900">Privacy Policy</a>
            <a href="#" className="hover:text-slate-900">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}