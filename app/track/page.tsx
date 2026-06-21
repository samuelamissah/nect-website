"use client";

import { useState } from "react";
import { supabase } from "@/app/lib/supabase";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import { Search, Loader2, FileText, MapPin, Info, CheckCircle, AlertCircle } from "lucide-react";
import { motion, AnimatePresence, Variants } from "framer-motion";

/* eslint-disable @typescript-eslint/no-explicit-any */

// Animation variants
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
};

const fadeInDown: Variants = {
  hidden: { opacity: 0, y: -30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
};

const scaleUp: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.4, ease: "easeOut" } }
};

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
    <main className="min-h-screen bg-slate-50 flex flex-col overflow-x-hidden">
      <Header />
      
      {/* Hero Section */}
      <motion.section 
        initial="hidden"
        animate="visible"
        className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border-b border-slate-800"
      >
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay"></div>
        <div className="absolute top-0 right-0 -mr-20 -mt-20 h-96 w-96 rounded-full bg-brand-primary/20 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 h-96 w-96 rounded-full bg-blue-500/10 blur-3xl"></div>
        
        <div className="relative z-10 mx-auto max-w-3xl px-5 py-16 lg:px-10 lg:py-24 text-center">
          <motion.div 
            variants={fadeInDown}
            className="inline-flex items-center gap-2 rounded-full bg-brand-primary/20 px-4 py-1.5 text-sm font-bold uppercase tracking-wider text-brand-primary border border-brand-primary/30 mb-6"
          >
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-brand-primary"></span>
            </span>
            Track Your Report
          </motion.div>
          
          <motion.h1 
            variants={fadeInUp}
            className="text-4xl font-extrabold tracking-tight text-white md:text-5xl"
          >
            Track Your Report
          </motion.h1>
          
          <motion.p 
            variants={fadeInUp}
            className="mt-4 text-lg text-slate-300"
          >
            Enter your NECT reference number to check the status of your reported issue.
          </motion.p>
        </div>
      </motion.section>

      {/* Main Content */}
      <div className="flex-1 mx-auto w-full max-w-3xl px-5 py-16 lg:px-10 lg:py-24">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeInUp}
          className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/40 md:p-8"
        >
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
              <input
                value={reference}
                onChange={(e) => setReference(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && searchReport()}
                placeholder="e.g. NECT-2026-123456"
                className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:ring-2 focus:ring-brand-primary focus:border-transparent outline-none transition-all"
              />
            </div>

            <motion.button
              onClick={searchReport}
              disabled={loading || !reference.trim()}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="btn-primary min-w-[120px] disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center justify-center gap-2 rounded-xl bg-brand-primary px-6 py-3 text-sm font-bold text-white hover:bg-brand-primary/90 transition-colors shadow-lg shadow-brand-primary/20"
            >
              {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : "Track"}
            </motion.button>
          </div>

          {/* Error Message */}
          <AnimatePresence>
            {error && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mt-6 rounded-2xl bg-red-50 p-4 text-sm font-medium text-red-600 border border-red-100 flex items-center gap-3"
              >
                <AlertCircle className="h-5 w-5 shrink-0" />
                {error}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Report Details */}
          <AnimatePresence>
            {report && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="mt-8 rounded-2xl border border-slate-100 bg-slate-50 p-6 md:p-8"
              >
                <div className="flex items-center justify-between border-b border-slate-200 pb-6 mb-6">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-wider text-slate-500">Current Status</p>
                    <motion.div 
                      initial={{ scale: 0.8 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 300 }}
                      className="mt-2 inline-flex items-center rounded-full px-4 py-1.5 text-sm font-bold border border-brand-primary/20"
                      style={{
                        backgroundColor: report.status === 'Resolved' || report.status === 'Closed' 
                          ? 'rgba(16, 185, 129, 0.1)' 
                          : report.status === 'In Progress' || report.status === 'Site Inspection' 
                            ? 'rgba(59, 130, 246, 0.1)' 
                            : 'rgba(245, 158, 11, 0.1)',
                        color: report.status === 'Resolved' || report.status === 'Closed' 
                          ? '#059669' 
                          : report.status === 'In Progress' || report.status === 'Site Inspection' 
                            ? '#2563EB' 
                            : '#D97706'
                      }}
                    >
                      {report.status || "Under Review"}
                    </motion.div>
                  </div>
                  <div className="text-right hidden sm:block">
                    <p className="text-sm font-semibold uppercase tracking-wider text-slate-500">Reference</p>
                    <p className="mt-2 font-mono font-bold text-slate-900">{report.reference}</p>
                  </div>
                </div>

                <div className="grid gap-6 sm:grid-cols-2">
                  <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                    className="flex items-start gap-3"
                  >
                    <FileText className="mt-0.5 h-5 w-5 text-slate-400" />
                    <div>
                      <p className="text-sm font-medium text-slate-500">Report Type</p>
                      <p className="mt-1 font-semibold text-slate-900">{report.report_type}</p>
                    </div>
                  </motion.div>
                  
                  <motion.div 
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.15 }}
                    className="flex items-start gap-3"
                  >
                    <MapPin className="mt-0.5 h-5 w-5 text-slate-400" />
                    <div>
                      <p className="text-sm font-medium text-slate-500">Location</p>
                      <p className="mt-1 font-semibold text-slate-900">{report.location}</p>
                    </div>
                  </motion.div>

                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="sm:col-span-2 flex items-start gap-3"
                  >
                    <Info className="mt-0.5 h-5 w-5 text-slate-400" />
                    <div>
                      <p className="text-sm font-medium text-slate-500">Description</p>
                      <p className="mt-1 text-slate-700 leading-relaxed">{report.description}</p>
                    </div>
                  </motion.div>
                </div>

                {report.internal_notes && (
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.25 }}
                    className="mt-8 border-t border-slate-100 pt-8"
                  >
                    <p className="text-sm font-bold uppercase tracking-wider text-brand-primary mb-2 flex items-center gap-2">
                      <CheckCircle className="h-4 w-4" />
                      Official Update / Action Taken
                    </p>
                    <p className="text-slate-700 leading-relaxed bg-brand-primary/5 p-5 rounded-xl border border-brand-primary/20 whitespace-pre-wrap">
                      {report.internal_notes}
                    </p>
                  </motion.div>
                )}

                {/* Submission Date */}
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="mt-6 pt-4 border-t border-slate-100 text-xs text-slate-400"
                >
                  Submitted on {new Date(report.created_at).toLocaleDateString(undefined, { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Help Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-8 text-center text-sm text-slate-500"
        >
          <p>
            Lost your reference number?{" "}
            <a href="/contact" className="font-bold text-brand-primary hover:underline">
              Contact support
            </a>
          </p>
        </motion.div>
      </div>

      <Footer />
    </main>
  );
}