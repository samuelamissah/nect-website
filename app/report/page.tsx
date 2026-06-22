import ReportForm from "@/app/components/ReportForm";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import ReportMapWrapper from "@/app/components/ReportMapWrapper";
import QueueProcessorWrapper from "@/app/components/QueueProcessorWrapper";
import { ArrowRight, FileText, Search, ClipboardCheck, Users, Map, ShieldCheck, CheckCircle2 } from "lucide-react";

/* eslint-disable @typescript-eslint/no-explicit-any */

function WorkflowStep({ icon: Icon, title, description, active = false }: any) {
  return (
    <div className={`relative flex flex-col items-center text-center ${active ? 'opacity-100' : 'opacity-60'} transition-opacity`}>
      <div className={`mb-3 flex h-12 w-12 items-center justify-center rounded-full border-2 ${active ? 'border-brand-primary bg-brand-primary/10 text-brand-primary' : 'border-slate-200 bg-white text-slate-400'}`}>
        <Icon className="h-5 w-5" />
      </div>
      <h3 className="mb-1 text-sm font-bold text-slate-900">{title}</h3>
      <p className="text-xs text-slate-500 max-w-[120px]">{description}</p>
    </div>
  );
}

function Workflow() {
  return (
    <div className="mb-16 hidden w-full rounded-3xl border border-slate-200 bg-white p-8 shadow-sm lg:block">
      <h2 className="mb-8 text-center text-sm font-bold uppercase tracking-widest text-slate-400">
        Report Resolution Workflow
      </h2>
      <div className="relative flex justify-between px-4">
        <div className="absolute left-10 right-10 top-6 -z-10 h-0.5 -translate-y-1/2 bg-slate-100"></div>
        <WorkflowStep icon={FileText} title="Submit" description="Citizen submits issue" active={true} />
        <WorkflowStep icon={Search} title="Review" description="NECT verifies details" active={true} />
        <WorkflowStep icon={Users} title="Assignment" description="Sent to agency" active={true} />
        <WorkflowStep icon={Map} title="Inspection" description="On-site assessment" active={true} />
        <WorkflowStep icon={ShieldCheck} title="Action" description="Resolution ongoing" active={true} />
        <WorkflowStep icon={CheckCircle2} title="Closed" description="Issue resolved" active={true} />
      </div>
    </div>
  );
}

export default function ReportPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <Header />
      <div className="mx-auto max-w-5xl px-6 py-16 lg:px-12 lg:py-24">
        <div className="mb-12 text-center">
          <p className="mb-4 inline-flex items-center rounded-full bg-brand-accent/10 px-4 py-1.5 text-sm font-bold uppercase tracking-wider text-brand-accent">
            Citizen Reporting Portal
          </p>

          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 md:text-5xl">
            Protect National Infrastructure.
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-slate-600">
            Submit a report to the National Engineering Coordinating Team. You can track your report&apos;s progress through our resolution workflow.
          </p>
        </div>

        <Workflow />

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/40 md:p-10">
          <div className="grid gap-8 lg:grid-cols-2">
            <div>
              <ReportForm />
            </div>
            <div>
              <h3 className="mb-4 text-sm font-bold text-slate-700">Nearby Reports</h3>
              <ReportMapWrapper />
            </div>
          </div>
        </div>
        <QueueProcessorWrapper />
      </div>
      <Footer />
    </main>
  );
}