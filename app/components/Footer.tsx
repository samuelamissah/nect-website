import Link from "next/link";
import { Mail, Phone, MapPin, ArrowUpRight } from "lucide-react";
import Image from "next/image";

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
            
            <div className="mt-8 flex items-center gap-4">
               {/* Social placeholders */}
               {['Twitter', 'LinkedIn', 'Facebook'].map((social) => (
                 <a key={social} href="#" className="flex h-10 w-10 items-center justify-center rounded-sm bg-slate-100 text-slate-600 transition-colors hover:bg-slate-900 hover:text-white">
                   <span className="sr-only">{social}</span>
                   <div className="h-4 w-4 bg-current rounded-sm opacity-80"></div>
                 </a>
               ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900">Platform</h3>
            <ul className="mt-6 space-y-4 text-sm text-slate-500">
              <li><Link href="/about" className="transition-colors hover:text-slate-900">About NECT</Link></li>
              <li><Link href="/agencies" className="transition-colors hover:text-slate-900">Partner Agencies</Link></li>
              <li><Link href="/report" className="transition-colors hover:text-slate-900">Report Issue</Link></li>
              <li><Link href="/track" className="transition-colors hover:text-slate-900">Track Status</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900">Resources</h3>
            <ul className="mt-6 space-y-4 text-sm text-slate-500">
              <li><a href="#" className="inline-flex items-center gap-1 transition-colors hover:text-slate-900">Guidelines <ArrowUpRight className="h-3 w-3" /></a></li>
              <li><a href="#" className="inline-flex items-center gap-1 transition-colors hover:text-slate-900">Contractor Portal <ArrowUpRight className="h-3 w-3" /></a></li>
              <li><Link href="/news" className="transition-colors hover:text-slate-900">News & Updates</Link></li>
              <li><a href="#" className="transition-colors hover:text-slate-900">FAQ</a></li>
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