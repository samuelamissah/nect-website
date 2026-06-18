import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import { BookOpen, FileText, Download, ShieldCheck, HardHat, AlertTriangle, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function GuidelinesPage() {
  const guidelines = [
    {
      title: "Excavation and Trenching Operations",
      description: "Standard operating procedures for road cuttings, trenching, and backfilling to ensure structural integrity of the road corridor.",
      icon: HardHat,
      size: "2.4 MB"
    },
    {
      title: "Utility Relocation Protocols",
      description: "Guidelines for the safe relocation of water, electricity, and telecommunication lines during major infrastructure projects.",
      icon: AlertTriangle,
      size: "1.8 MB"
    },
    {
      title: "Right-of-Way (RoW) Management",
      description: "Rules regarding the protection of national road reservations from encroachment and unauthorized permanent structures.",
      icon: ShieldCheck,
      size: "3.1 MB"
    },
    {
      title: "Emergency Response Procedures",
      description: "Immediate action protocols for utility strikes, burst mains, and high-voltage cable exposures.",
      icon: BookOpen,
      size: "1.2 MB"
    }
  ];

  return (
    <main className="min-h-screen bg-slate-50 flex flex-col">
      <Header />
      
      <section className="bg-slate-900 border-b border-slate-800">
        <div className="mx-auto max-w-7xl px-5 py-16 lg:px-10 lg:py-24">
          <div className="max-w-2xl">
            <span className="mb-4 inline-flex items-center rounded-sm bg-brand-primary/20 px-4 py-1.5 text-sm font-bold uppercase tracking-wider text-brand-primary border border-brand-primary/30">
              Official Documentation
            </span>
            <h1 className="text-4xl font-extrabold tracking-tight text-white md:text-5xl">
              Operational Guidelines
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-slate-300">
              Access the official NECT regulatory frameworks, technical specifications, and procedural manuals for infrastructure coordination in Ghana.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16 lg:px-10 lg:py-24 w-full flex-1">
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Core Frameworks</h2>
          <p className="text-slate-600 max-w-3xl">
            All contractors, partner agencies, and utility providers must adhere to these national guidelines to prevent service disruptions and protect public investments.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {guidelines.map((doc, idx) => (
            <div key={idx} className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm hover:shadow-md transition-shadow group flex flex-col">
              <div className="flex items-start gap-5 mb-6">
                <div className="h-12 w-12 rounded-xl bg-slate-100 flex items-center justify-center shrink-0 group-hover:bg-brand-primary/10 transition-colors">
                  <doc.icon className="h-6 w-6 text-slate-600 group-hover:text-brand-primary transition-colors" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">{doc.title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{doc.description}</p>
                </div>
              </div>
              
              <div className="mt-auto pt-6 border-t border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-wider">
                  <FileText className="h-4 w-4" />
                  PDF Document • {doc.size}
                </div>
                <button className="flex items-center gap-2 text-sm font-bold text-brand-primary hover:text-brand-primary/80 transition-colors">
                  <Download className="h-4 w-4" />
                  Download
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-brand-primary/5 rounded-3xl border border-brand-primary/20 p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h3 className="text-2xl font-bold text-slate-900 mb-3">Looking for Contractor Permits?</h3>
            <p className="text-slate-600 max-w-xl">
              If you are a registered contractor looking to submit a wayleave application or excavation permit, please visit the Contractor Portal.
            </p>
          </div>
          <Link href="/contractors" className="shrink-0 flex items-center gap-2 px-8 py-4 bg-brand-primary text-white rounded-xl font-bold hover:bg-brand-primary/90 transition-colors shadow-lg shadow-brand-primary/20">
            Contractor Portal <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}