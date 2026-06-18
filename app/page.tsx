import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import HeroScene from "@/app/components/HeroScene";
import Link from "next/link";
import {
  Cable,
  Construction,
  MapPinned,
  ShieldCheck,
  UsersRound,
  ArrowRight,
  BarChart3,
  Search,
} from "lucide-react";

const mandate = [
  {
    icon: ShieldCheck,
    title: "Protect Road Reservations",
    text: "Prevent encroachment and unauthorized development within road corridors to ensure safety and future expansion.",
    color: "bg-blue-50 text-blue-600",
  },
  {
    icon: Cable,
    title: "Prevent Utility Damage",
    text: "Reduce fibre cuts, burst water pipes, damaged power cables and service disruption across the nation.",
    color: "bg-amber-50 text-amber-600",
  },
  {
    icon: UsersRound,
    title: "Coordinate Stakeholders",
    text: "Bring ministries, road agencies, utility providers, contractors and assemblies together on one platform.",
    color: "bg-purple-50 text-purple-600",
  },
  {
    icon: Construction,
    title: "Support Safe Construction",
    text: "Ensure contractors engage utility agencies before excavation and road works begin to save costs.",
    color: "bg-emerald-50 text-emerald-600",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50 selection:bg-brand-secondary selection:text-white">
      <Header />

      {/* Hero Section */}
      <section className="relative overflow-hidden px-5 py-12 lg:px-10 lg:py-20">
        <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-slate-100 via-slate-50 to-slate-50"></div>
        <div className="absolute right-0 top-0 -mr-40 -mt-40 h-96 w-96 rounded-full bg-brand-secondary/5 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 -ml-40 -mb-40 h-96 w-96 rounded-full bg-brand-accent/5 blur-3xl"></div>

        <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-16 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="max-w-3xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm">
              <span className="flex h-2 w-2 rounded-full bg-brand-accent"></span>
              National Engineering Coordinating Team
            </div>

            <h1 className="text-5xl font-extrabold leading-[1.05] tracking-tight text-slate-900 sm:text-6xl lg:text-7xl">
              Engineering coordination for Ghana’s <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-brand-secondary">critical infrastructure.</span>
            </h1>

            <p className="mt-8 text-lg leading-relaxed text-slate-600 sm:text-xl">
              NECT coordinates road agencies, utilities, contractors, government
              institutions and local authorities to protect road reservations,
              prevent utility damage and reduce costly project conflicts.
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
              <Link
                href="/report"
                className="btn-primary group"
              >
                Report an Issue
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>

              <Link
                href="/track"
                className="btn-outline group"
              >
                Track Status
                <Search className="ml-2 h-4 w-4 text-slate-400 transition-colors group-hover:text-slate-600" />
              </Link>
            </div>
            
            <div className="mt-12 flex items-center gap-6 text-sm font-medium text-slate-500">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className={`h-8 w-8 rounded-full border-2 border-white bg-slate-${i * 200}`}></div>
                ))}
              </div>
              <p>Trusted by 37+ national institutions</p>
            </div>
          </div>

          <div className="relative aspect-square w-full rounded-sm bg-slate-900 p-2 shadow-2xl overflow-hidden border-2 border-slate-900">
             <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
             <HeroScene />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="border-y border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-5 py-12 lg:px-10">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4 divide-x divide-slate-100">
            {[
              ["37+", "Member Institutions"],
              ["16", "Regional Focus"],
              ["9+", "Ministries Involved"],
              ["24/7", "Public Reporting"],
            ].map(([number, label], i) => (
              <div key={label} className={`flex flex-col items-center justify-center text-center ${i !== 0 ? 'pl-8' : ''}`}>
                <p className="text-4xl font-black text-slate-900 lg:text-5xl">{number}</p>
                <p className="mt-2 text-sm font-medium uppercase tracking-wider text-slate-500">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mandate Section */}
      <section id="mandate" className="mx-auto max-w-7xl px-5 py-24 lg:px-10">
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-4 text-sm font-black uppercase tracking-[0.2em] text-brand-secondary">
            Core Mandate
          </p>
          <h2 className="text-4xl font-extrabold tracking-tight text-slate-900 md:text-5xl">
            A national coordination body for roads, utilities and development.
          </h2>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {mandate.map((item) => (
            <div
              key={item.title}
              className="group relative overflow-hidden rounded-sm border border-slate-200 bg-white p-8 transition-all hover:-translate-y-1 hover:border-brand-primary hover:shadow-xl hover:shadow-slate-200/50"
            >
              <div className="absolute top-0 right-0 h-16 w-16 bg-slate-50 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-150"></div>
              <div className={`relative mb-6 inline-flex h-14 w-14 items-center justify-center rounded-sm ${item.color} transition-transform group-hover:scale-110`}>
                <item.icon className="h-7 w-7" />
              </div>
              <h3 className="relative mb-3 text-xl font-bold text-slate-900">{item.title}</h3>
              <p className="relative text-base leading-relaxed text-slate-600">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Coordination Section */}
      <section id="coordination" className="bg-slate-900 px-5 py-24 text-white lg:px-10 border-y border-slate-800">
        <div className="mx-auto grid max-w-7xl gap-16 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="mb-4 text-sm font-black uppercase tracking-[0.2em] text-brand-accent">
              Coordination Before Excavation
            </p>
            <h2 className="text-4xl font-extrabold tracking-tight md:text-5xl lg:text-6xl lg:leading-[1.1]">
              One road project can affect water, power, fibre and public safety.
            </h2>
            <div className="mt-8 space-y-6 text-lg leading-relaxed text-slate-300">
              <p>
                NECT exists because infrastructure projects are connected. A road
                contractor digging without proper coordination can cut fibre,
                damage pipelines, expose electrical cables and create expensive
                delays.
              </p>
              <p>
                The platform helps stakeholders report, verify, coordinate and
                track issues before they become national infrastructure problems.
              </p>
            </div>
            
            <div className="mt-10">
               <div className="inline-flex items-center gap-4 rounded-sm bg-white/5 px-6 py-5 border border-white/10">
                  <div className="flex h-12 w-12 items-center justify-center rounded-sm bg-brand-accent/20">
                    <BarChart3 className="h-6 w-6 text-brand-accent" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-400 uppercase tracking-wider">Estimated Annual Savings</p>
                    <p className="text-2xl font-bold text-white mt-1">GHS 50M+</p>
                  </div>
               </div>
            </div>
          </div>

          <div className="relative aspect-square w-full rounded-sm overflow-hidden bg-slate-800 border border-slate-700">
            {/* Structural/Architectural visual representation of coordination */}
            <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
            <div className="absolute inset-0 flex items-center justify-center p-12">
               <div className="relative h-full w-full">
                 
                 {/* Decorative structural elements representing infrastructure layers */}
                 <div className="absolute inset-0 flex flex-col justify-center gap-12">
                   <div className="relative h-3 w-full bg-slate-900 border border-slate-700">
                     <div className="absolute left-0 top-0 h-full w-2/3 bg-[#FCD116]"></div>
                     <span className="absolute -top-6 left-0 text-xs font-mono text-slate-400 uppercase">Power Lines (ECG)</span>
                   </div>
                   <div className="relative h-3 w-full bg-slate-900 border border-slate-700">
                     <div className="absolute left-0 top-0 h-full w-1/2 bg-[#CE1126]"></div>
                     <span className="absolute -top-6 left-0 text-xs font-mono text-slate-400 uppercase">Fibre Optic (Telcos)</span>
                   </div>
                   <div className="relative h-3 w-full bg-slate-900 border border-slate-700">
                     <div className="absolute left-0 top-0 h-full w-4/5 bg-[#006B3F]"></div>
                     <span className="absolute -top-6 left-0 text-xs font-mono text-slate-400 uppercase">Water Mains (GWCL)</span>
                   </div>
                 </div>
                 
                 {/* Intersection marker */}
                 <div className="absolute left-1/2 top-1/4 bottom-1/4 w-px bg-white border-l border-dashed border-white/50">
                    <div className="absolute top-1/2 -left-3 h-6 w-6 rounded-sm border-2 border-white bg-slate-900 flex items-center justify-center">
                       <div className="h-2 w-2 bg-brand-accent"></div>
                    </div>
                 </div>
                 
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Portal Section */}
      <section id="portal" className="mx-auto max-w-7xl px-5 py-24 lg:px-10">
        <div className="relative overflow-hidden rounded-sm bg-slate-900 border border-slate-800 p-8 shadow-2xl md:p-16 lg:p-20">
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
          <div className="absolute right-0 top-0 h-full w-1/3 bg-gradient-to-l from-brand-primary/20 to-transparent"></div>
          
          <div className="relative z-10 grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <div className="mb-8 inline-flex h-16 w-16 items-center justify-center rounded-sm bg-brand-accent text-slate-900 shadow-lg">
              <MapPinned className="h-8 w-8" />
            </div>
              <h2 className="text-4xl font-extrabold tracking-tight text-white md:text-5xl">
                Citizen Infrastructure Reporting Portal.
              </h2>
            </div>

            <div className="flex flex-col items-start lg:pl-10">
              <p className="text-lg leading-relaxed text-slate-300">
                Citizens can report road reservation encroachment, illegal
                structures, exposed cables, burst pipes, unauthorized excavation
                and other infrastructure concerns. Reports may be submitted
                anonymously or with contact details.
              </p>

              <Link
                href="/report"
                className="mt-10 btn-accent group"
              >
                Open Reporting Portal
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}