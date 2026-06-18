"use client";

import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import { FileSignature, ShieldCheck, Map, ClipboardCheck, ArrowRight, Building2, Lock } from "lucide-react";

export default function ContractorPortalPage() {
  return (
    <main className="min-h-screen bg-slate-50 flex flex-col">
      <Header />
      
      <section className="bg-slate-900 border-b border-slate-800 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
        <div className="mx-auto max-w-7xl px-5 py-16 lg:px-10 lg:py-24 relative z-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
            <div className="max-w-2xl">
              <span className="mb-4 inline-flex items-center rounded-sm bg-brand-accent/20 px-4 py-1.5 text-sm font-bold uppercase tracking-wider text-brand-accent border border-brand-accent/30">
                Secure Portal
              </span>
              <h1 className="text-4xl font-extrabold tracking-tight text-white md:text-5xl">
                Contractor E-Services
              </h1>
              <p className="mt-6 text-lg leading-relaxed text-slate-300">
                Apply for excavation permits, submit utility relocation plans, and track your compliance status with the National Engineering Coordinating Team.
              </p>
            </div>

            <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 border border-slate-200 shrink-0">
              <div className="flex items-center gap-3 mb-6">
                <div className="h-10 w-10 bg-brand-primary/10 rounded-full flex items-center justify-center">
                  <Lock className="h-5 w-5 text-brand-primary" />
                </div>
                <h2 className="text-xl font-bold text-slate-900">Portal Login</h2>
              </div>
              <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">TIN / Registration Number</label>
                  <input type="text" placeholder="e.g. C0001234567" className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-brand-primary outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">Password</label>
                  <input type="password" placeholder="••••••••" className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-brand-primary outline-none" />
                </div>
                <div className="flex items-center justify-between mt-2">
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="rounded border-slate-300 text-brand-primary focus:ring-brand-primary" />
                    <span className="text-sm text-slate-600">Remember me</span>
                  </label>
                  <a href="#" className="text-sm font-bold text-brand-primary hover:underline">Forgot Password?</a>
                </div>
                <button type="submit" className="w-full bg-slate-900 text-white font-bold py-3.5 rounded-lg hover:bg-slate-800 transition-colors shadow-lg shadow-slate-900/20 mt-4">
                  Secure Login
                </button>
              </form>
              <div className="mt-6 text-center text-sm text-slate-500">
                Not registered? <a href="#" className="font-bold text-brand-primary hover:underline">Apply for Contractor ID</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16 lg:px-10 lg:py-24 w-full flex-1">
        <div className="mb-12 text-center max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Portal Services</h2>
          <p className="text-slate-600">
            Our digital services are designed to streamline the approval process, ensuring all infrastructural works meet national standards before commencement.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {[
            {
              title: "Wayleave Permits",
              desc: "Apply for right-of-way access for new installations.",
              icon: FileSignature
            },
            {
              title: "Site Clearances",
              desc: "Request NECT inspection and clearance for completed works.",
              icon: ShieldCheck
            },
            {
              title: "Utility Mapping",
              desc: "Submit GIS data for newly laid underground utilities.",
              icon: Map
            },
            {
              title: "Compliance Audit",
              desc: "Check your agency's compliance rating and active violations.",
              icon: ClipboardCheck
            }
          ].map((service, idx) => (
            <div key={idx} className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:border-brand-primary/40 hover:shadow-md transition-all">
              <div className="h-12 w-12 rounded-xl bg-brand-primary/10 flex items-center justify-center mb-6">
                <service.icon className="h-6 w-6 text-brand-primary" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">{service.title}</h3>
              <p className="text-sm text-slate-600 mb-6">{service.desc}</p>
              <a href="#" className="inline-flex items-center gap-2 text-sm font-bold text-brand-primary hover:gap-3 transition-all">
                Learn more <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}