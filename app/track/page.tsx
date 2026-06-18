"use client";

import { useState } from "react";
import { supabase } from "@/app/lib/supabase";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import { Search, Loader2, FileText, MapPin, Info } from "lucide-react";

/* eslint-disable @typescript-eslint/no-explicit-any */

export default function TrackPage() {
  const [reference, setReference] = useState("");
  const [report, setReport] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function searchReport() {
    if (!reference.trim()) return;
    setLoading(true);
    setError("");
    setReport(null);

    const { data, error: fetchError } = await supabase
      .from("reports")
      .select("*")
      .eq("reference", reference)
      .single();

    if (fetchError || !data) {
      setError("No report found with this reference number.");
    } else {
      setReport(data);
    }
    setLoading(false);
  }

  return (
    <main className="min-h-screen bg-slate-50 flex flex-col">
      <Header />
      <div className="flex-1 mx-auto w-full max-w-3xl px-6 py-16 lg:px-12 lg:py-24">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 md:text-5xl">
            Track your report
          </h1>
          <p className="mt-4 text-lg text-slate-600">
            Enter your NECT reference number to check the status of your reported issue.
          </p>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/40 md:p-8">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
              <input
                value={reference}
                onChange={(e) => setReference(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && searchReport()}
                placeholder="e.g. NECT-2026-123456"
                className="input pl-12"
              />
            </div>

            <button
              onClick={searchReport}
              disabled={loading || !reference.trim()}
              className="btn-primary min-w-[120px] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : "Track"}
            </button>
          </div>

          {error && (
            <div className="mt-6 rounded-2xl bg-red-50 p-4 text-sm font-medium text-red-600 border border-red-100 flex items-center gap-3">
              <Info className="h-5 w-5 shrink-0" />
              {error}
            </div>
          )}

          {report && (
            <div className="mt-8 rounded-2xl border border-slate-100 bg-slate-50 p-6 md:p-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="flex items-center justify-between border-b border-slate-200 pb-6 mb-6">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-wider text-slate-500">Current Status</p>
                  <div className="mt-2 inline-flex items-center rounded-full bg-brand-primary/10 px-4 py-1.5 text-sm font-bold text-brand-primary border border-brand-primary/20">
                    {report.status || "Under Review"}
                  </div>
                </div>
                <div className="text-right hidden sm:block">
                  <p className="text-sm font-semibold uppercase tracking-wider text-slate-500">Reference</p>
                  <p className="mt-2 font-mono font-bold text-slate-900">{report.reference}</p>
                </div>
              </div>

              <div className="grid gap-6 sm:grid-cols-2">
                <div className="flex items-start gap-3">
                  <FileText className="mt-0.5 h-5 w-5 text-slate-400" />
                  <div>
                    <p className="text-sm font-medium text-slate-500">Report Type</p>
                    <p className="mt-1 font-semibold text-slate-900">{report.report_type}</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <MapPin className="mt-0.5 h-5 w-5 text-slate-400" />
                  <div>
                    <p className="text-sm font-medium text-slate-500">Location</p>
                    <p className="mt-1 font-semibold text-slate-900">{report.location}</p>
                  </div>
                </div>

                <div className="sm:col-span-2 flex items-start gap-3">
                  <Info className="mt-0.5 h-5 w-5 text-slate-400" />
                  <div>
                    <p className="text-sm font-medium text-slate-500">Description</p>
                    <p className="mt-1 text-slate-700 leading-relaxed">{report.description}</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </main>
  );
}