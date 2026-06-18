import ReportForm from "@/app/components/ReportForm";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";

export default function ReportPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <Header />
      <div className="mx-auto max-w-4xl px-6 py-16 lg:px-12 lg:py-24">
        <div className="mb-12 text-center">
          <p className="mb-4 inline-flex items-center rounded-full bg-brand-accent/10 px-4 py-1.5 text-sm font-bold uppercase tracking-wider text-brand-accent">
            Citizen Reporting Portal
          </p>

          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 md:text-5xl">
            Report infrastructure issues.
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-slate-600">
            Help us protect Ghana&apos;s infrastructure. You can report anonymously or provide your details if you want NECT to
            contact you for updates.
          </p>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/40 md:p-10">
          <ReportForm />
        </div>
      </div>
      <Footer />
    </main>
  );
}