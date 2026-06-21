"use client";

import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import { AlertTriangle, Bell, BellRing, CheckCircle2, Clock, MapPin, XCircle, ExternalLink, ArrowRight, Calendar, AlertCircle } from "lucide-react";
import { motion, Variants } from "framer-motion";

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 }
  }
};

export default function AlertsPage() {
  const alerts = [
    {
      id: 1,
      type: "warning",
      title: "N6 Highway Excavation Advisory",
      description: "All contractors undertaking excavation works along the N6 highway corridor must coordinate with GWCL and ECG before commencement to prevent service disruption.",
      location: "N6 Highway, Greater Accra Region",
      date: "2024-01-15",
      status: "Active",
      icon: AlertTriangle,
      color: "text-amber-600",
      bg: "bg-amber-50",
      border: "border-amber-200"
    },
    {
      id: 2,
      type: "critical",
      title: "Emergency: Water Pipeline Damage",
      description: "A major water pipeline has been damaged during road construction in the Tema area. All operations along the Tema-Accra highway are suspended until further notice.",
      location: "Tema-Accra Highway, Greater Accra Region",
      date: "2024-01-14",
      status: "Critical",
      icon: XCircle,
      color: "text-red-600",
      bg: "bg-red-50",
      border: "border-red-200"
    },
    {
      id: 3,
      type: "info",
      title: "Regional Coordination Meeting",
      description: "The Ashanti Regional Engineering Coordinating Team will hold a stakeholder meeting on January 20, 2024, to review infrastructure projects for Q1.",
      location: "Kumasi, Ashanti Region",
      date: "2024-01-20",
      status: "Upcoming",
      icon: Bell,
      color: "text-blue-600",
      bg: "bg-blue-50",
      border: "border-blue-200"
    },
    {
      id: 4,
      type: "resolved",
      title: "Accra Utility Conflict Resolved",
      description: "The utility conflict between ECG and GWCL along the Liberation Road has been successfully resolved. All services have been restored.",
      location: "Liberation Road, Accra",
      date: "2024-01-12",
      status: "Resolved",
      icon: CheckCircle2,
      color: "text-emerald-600",
      bg: "bg-emerald-50",
      border: "border-emerald-200"
    },
    {
      id: 5,
      type: "info",
      title: "New Guidelines for Utility Mapping",
      description: "NECT has released updated guidelines for utility mapping and coordination. All agencies are required to adopt these standards by February 2024.",
      location: "National",
      date: "2024-01-10",
      status: "Published",
      icon: BellRing,
      color: "text-purple-600",
      bg: "bg-purple-50",
      border: "border-purple-200"
    }
  ];

  const stats = {
    active: alerts.filter(a => a.status === "Active" || a.status === "Critical").length,
    resolved: alerts.filter(a => a.status === "Resolved").length,
    total: alerts.length
  };

  return (
    <main className="min-h-screen bg-slate-50 flex flex-col overflow-x-hidden">
      <Header />
      
      {/* Hero Section */}
      <motion.section 
        initial="hidden"
        animate="visible"
        className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-16 lg:py-24"
      >
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay"></div>
        <div className="absolute top-0 right-0 -mr-20 -mt-20 h-96 w-96 rounded-full bg-brand-primary/20 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 h-96 w-96 rounded-full bg-amber-500/10 blur-3xl"></div>
        
        <div className="relative z-10 mx-auto max-w-7xl px-5">
          <motion.div 
            variants={fadeInUp}
            className="max-w-3xl"
          >
            <motion.div 
              variants={fadeInUp}
              className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-sm font-bold uppercase tracking-wider text-white border border-white/20"
            >
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-amber-400"></span>
              </span>
              Infrastructure Alerts
            </motion.div>
            
            <motion.h1 
              variants={fadeInUp}
              className="text-4xl font-extrabold tracking-tight text-white md:text-5xl lg:text-6xl"
            >
              Infrastructure Alerts
            </motion.h1>
            
            <motion.p 
              variants={fadeInUp}
              className="mt-6 text-lg leading-relaxed text-slate-300"
            >
              Stay informed about critical infrastructure updates, emergency notices, and coordination advisories across Ghana.
            </motion.p>
          </motion.div>
        </div>
      </motion.section>

      {/* Stats Bar */}
      <motion.div 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mx-auto max-w-7xl px-5 -mt-8 relative z-20"
      >
        <div className="grid grid-cols-3 gap-4 bg-white rounded-2xl shadow-lg border border-slate-200 p-6">
          <div className="text-center">
            <p className="text-2xl font-bold text-amber-600">{stats.active}</p>
            <p className="text-xs font-bold uppercase tracking-wider text-slate-500">Active Alerts</p>
          </div>
          <div className="text-center border-x border-slate-200">
            <p className="text-2xl font-bold text-emerald-600">{stats.resolved}</p>
            <p className="text-xs font-bold uppercase tracking-wider text-slate-500">Resolved</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-brand-primary">{stats.total}</p>
            <p className="text-xs font-bold uppercase tracking-wider text-slate-500">Total Alerts</p>
          </div>
        </div>
      </motion.div>

      {/* Alerts List */}
      <section className="mx-auto max-w-7xl px-5 py-16 lg:py-24 w-full flex-1">
        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="space-y-4"
        >
          {alerts.map((alert) => (
            <motion.div
              key={alert.id}
              variants={fadeInUp}
              whileHover={{ x: 4 }}
              className={`rounded-2xl border ${alert.border} ${alert.bg} p-6 shadow-sm transition-all hover:shadow-md`}
            >
              <div className="flex flex-col md:flex-row md:items-start gap-4">
                <div className="flex-shrink-0">
                  <div className={`h-12 w-12 rounded-full ${alert.bg} border ${alert.border} flex items-center justify-center`}>
                    <alert.icon className={`h-6 w-6 ${alert.color}`} />
                  </div>
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-2">
                    <h3 className="text-xl font-bold text-slate-900">
                      {alert.title}
                    </h3>
                    <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider ${
                      alert.status === "Critical" ? "bg-red-100 text-red-700" :
                      alert.status === "Active" ? "bg-amber-100 text-amber-700" :
                      alert.status === "Resolved" ? "bg-emerald-100 text-emerald-700" :
                      alert.status === "Upcoming" ? "bg-blue-100 text-blue-700" :
                      "bg-purple-100 text-purple-700"
                    }`}>
                      {alert.status}
                    </span>
                  </div>
                  
                  <p className="text-slate-600 leading-relaxed mb-3">
                    {alert.description}
                  </p>
                  
                  <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-slate-500">
                    <span className="flex items-center gap-1.5">
                      <MapPin className="h-4 w-4" />
                      {alert.location}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Calendar className="h-4 w-4" />
                      {new Date(alert.date).toLocaleDateString(undefined, { 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </span>
                  </div>
                </div>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="shrink-0 inline-flex items-center gap-2 text-sm font-bold text-brand-primary hover:text-brand-primary/80 transition-colors self-start"
                >
                  View Details
                  <ArrowRight className="h-4 w-4" />
                </motion.button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Contact Section */}
      <section className="bg-white border-t border-slate-200 py-16">
        <div className="mx-auto max-w-7xl px-5 text-center">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Report an Infrastructure Issue</h2>
          <p className="text-slate-600 max-w-2xl mx-auto mb-8">
            If you notice any infrastructure damage or utility conflict, report it immediately to the National Engineering Coordinating Team.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <motion.a
              href="/report"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 rounded-lg bg-brand-primary px-6 py-3 text-sm font-bold text-white hover:bg-brand-primary/90 transition-colors"
            >
              Report Now
              <ExternalLink className="h-4 w-4" />
            </motion.a>
            <motion.a
              href="/contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-6 py-3 text-sm font-bold text-slate-700 hover:bg-slate-50 transition-colors"
            >
              Contact NECT
            </motion.a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}