import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import { CheckCircle2, History, Target, Users } from "lucide-react";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-slate-50 flex flex-col">
      <Header />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-slate-900 py-20 lg:py-32">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay"></div>
        <div className="absolute top-0 right-0 -mr-20 -mt-20 h-96 w-96 rounded-full bg-brand-primary/20 blur-3xl"></div>
        
        <div className="relative z-10 mx-auto max-w-7xl px-5 lg:px-10">
          <div className="max-w-3xl">
            <p className="mb-4 inline-flex items-center rounded-sm bg-white/10 px-4 py-1.5 text-sm font-bold uppercase tracking-wider text-white border border-white/20">
              About NECT
            </p>
            <h1 className="text-4xl font-extrabold tracking-tight text-white md:text-5xl lg:text-6xl">
              Coordinating Ghana&apos;s Critical Infrastructure.
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-slate-300">
              The National Engineering Coordinating Team (NECT) is the central body responsible for ensuring that infrastructure projects across Ghana are executed harmoniously, preventing utility damage, and protecting national road corridors.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="mx-auto max-w-7xl px-5 py-16 lg:px-10 lg:py-24">
        <div className="grid gap-16 lg:grid-cols-[1fr_300px]">
          
          <div className="space-y-12">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <Target className="h-8 w-8 text-brand-primary" />
                <h2 className="text-3xl font-bold text-slate-900">Our Mission</h2>
              </div>
              <p className="text-lg leading-relaxed text-slate-600">
                To establish a unified framework for the planning, execution, and maintenance of public infrastructure in Ghana. We bring together road agencies, utility providers, and local assemblies to eliminate the siloed approach to development, thereby saving the nation millions of Cedis annually in preventable damages.
              </p>
            </div>

            <div>
              <div className="flex items-center gap-3 mb-6">
                <History className="h-8 w-8 text-brand-primary" />
                <h2 className="text-3xl font-bold text-slate-900">History & Context</h2>
              </div>
              <p className="text-lg leading-relaxed text-slate-600 mb-4">
                Historically, infrastructure development in Ghana suffered from a lack of coordination. It was common for a newly constructed road to be excavated months later by a utility company laying pipes or fibre optic cables. 
              </p>
              <p className="text-lg leading-relaxed text-slate-600">
                Recognizing the unsustainable nature of these practices, the government established NECT. Our mandate is backed by national policy to enforce strict coordination protocols before any major excavation or civil works commence within public right-of-ways.
              </p>
            </div>

            <div>
              <div className="flex items-center gap-3 mb-6">
                <CheckCircle2 className="h-8 w-8 text-brand-primary" />
                <h2 className="text-3xl font-bold text-slate-900">Core Objectives</h2>
              </div>
              <ul className="space-y-4">
                {[
                  "Protect road reservations from unauthorized encroachment.",
                  "Mandate joint-planning sessions for all intersecting infrastructure projects.",
                  "Maintain a national database of utility corridors (water, power, telecommunications).",
                  "Enforce penalties for unauthorized excavations and damage to state property.",
                  "Provide a citizen reporting portal to crowdsource infrastructure monitoring."
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                    <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-primary/10 text-brand-primary mt-0.5">
                      <span className="text-sm font-bold">{i + 1}</span>
                    </div>
                    <span className="text-slate-700 font-medium leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            <div className="rounded-2xl bg-slate-900 p-6 text-white shadow-lg">
              <h3 className="text-lg font-bold mb-2">Join the Network</h3>
              <p className="text-sm text-white/80 mb-6">
                Are you a licensed contractor or utility provider? Register on our portal to submit your project schedules.
              </p>
              <button className="w-full rounded-sm bg-brand-primary px-4 py-3 text-sm font-bold text-white transition-colors hover:bg-brand-primary/90">
                Contractor Registration
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* Leadership Section */}
      <section className="bg-white py-20 lg:py-24 border-t border-slate-200">
        <div className="mx-auto max-w-7xl px-5 lg:px-10">
          <div className="mb-16 text-center">
            <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 md:text-4xl">
              Our Leadership
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600">
              Guided by experienced engineering professionals and public administrators committed to national development.
            </p>
          </div>

          <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
            {/* Chairman */}
            <div className="flex flex-col items-center text-center group">
              <div className="mb-6 h-40 w-40 overflow-hidden rounded-full border-4 border-slate-50 bg-slate-200 shadow-xl transition-transform duration-300 group-hover:scale-105 group-hover:border-brand-primary/20">
                <div className="h-full w-full bg-[url('https://i.pravatar.cc/300?img=11')] bg-cover bg-center"></div>
              </div>
              <h3 className="text-xl font-bold text-slate-900">Ing. Dr. Kwame Mensah</h3>
              <p className="mt-1 font-semibold text-brand-primary">Chairman</p>
              <p className="mt-3 text-sm text-slate-500">Former Minister of Roads and Highways with over 30 years of civil engineering experience.</p>
            </div>

            {/* Secretariat */}
            <div className="flex flex-col items-center text-center group">
              <div className="mb-6 h-40 w-40 overflow-hidden rounded-full border-4 border-slate-50 bg-slate-200 shadow-xl transition-transform duration-300 group-hover:scale-105 group-hover:border-brand-primary/20">
                <div className="h-full w-full bg-[url('https://i.pravatar.cc/300?img=5')] bg-cover bg-center"></div>
              </div>
              <h3 className="text-xl font-bold text-slate-900">Surv. Akosua Osei</h3>
              <p className="mt-1 font-semibold text-brand-primary">Head of Secretariat</p>
              <p className="mt-3 text-sm text-slate-500">Expert in public administration and infrastructure policy implementation.</p>
            </div>

            {/* Executive Team */}
            <div className="flex flex-col items-center text-center group">
              <div className="mb-6 h-40 w-40 overflow-hidden rounded-full border-4 border-slate-50 bg-slate-200 shadow-xl transition-transform duration-300 group-hover:scale-105 group-hover:border-brand-primary/20">
                <div className="h-full w-full bg-[url('https://i.pravatar.cc/300?img=8')] bg-cover bg-center"></div>
              </div>
              <h3 className="text-xl font-bold text-slate-900">Ing. Samuel Addo</h3>
              <p className="mt-1 font-semibold text-brand-primary">Executive Director, Technical</p>
              <p className="mt-3 text-sm text-slate-500">Specializes in utility coordination and structural integrity assessment.</p>
            </div>

            {/* Key Coordinators */}
            <div className="flex flex-col items-center text-center group">
              <div className="mb-6 h-40 w-40 overflow-hidden rounded-full border-4 border-slate-50 bg-slate-200 shadow-xl transition-transform duration-300 group-hover:scale-105 group-hover:border-brand-primary/20">
                <div className="h-full w-full bg-[url('https://i.pravatar.cc/300?img=47')] bg-cover bg-center"></div>
              </div>
              <h3 className="text-xl font-bold text-slate-900">Dr. Grace Anim</h3>
              <p className="mt-1 font-semibold text-brand-primary">Chief Coordinator</p>
              <p className="mt-3 text-sm text-slate-500">Leads inter-agency collaboration between MMDAs and utility providers.</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}