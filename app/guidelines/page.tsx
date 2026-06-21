"use client";

import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import { BookOpen, FileText, Download, ShieldCheck, HardHat, AlertTriangle, ArrowRight } from "lucide-react";
import Link from "next/link";
import { motion, Variants } from "framer-motion";

// Animation variants
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
};

const fadeInDown: Variants = {
  hidden: { opacity: 0, y: -30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const scaleUp: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.4, ease: "easeOut" } }
};

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
        
        <div className="relative z-10 mx-auto max-w-7xl px-5 py-16 lg:px-10 lg:py-24">
          <motion.div 
            variants={fadeInDown}
            className="max-w-2xl"
          >
            <motion.div 
              variants={fadeInUp}
              className="mb-4 inline-flex items-center gap-2 rounded-full bg-brand-primary/20 px-4 py-1.5 text-sm font-bold uppercase tracking-wider text-brand-primary border border-brand-primary/30"
            >
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-brand-primary"></span>
              </span>
              Official Documentation
            </motion.div>
            
            <motion.h1 
              variants={fadeInUp}
              className="text-4xl font-extrabold tracking-tight text-white md:text-5xl"
            >
              Operational Guidelines
            </motion.h1>
            
            <motion.p 
              variants={fadeInUp}
              className="mt-6 text-lg leading-relaxed text-slate-300"
            >
              Access the official NECT regulatory frameworks, technical specifications, and procedural manuals for infrastructure coordination in Ghana.
            </motion.p>
          </motion.div>
        </div>
      </motion.section>

      {/* Main Content */}
      <section className="mx-auto max-w-7xl px-5 py-16 lg:px-10 lg:py-24 w-full flex-1">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeInUp}
          className="mb-12"
        >
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Core Frameworks</h2>
          <p className="text-slate-600 max-w-3xl">
            All contractors, partner agencies, and utility providers must adhere to these national guidelines to prevent service disruptions and protect public investments.
          </p>
        </motion.div>

        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid gap-6 md:grid-cols-2"
        >
          {guidelines.map((doc, idx) => (
            <motion.div 
              key={idx} 
              variants={fadeInUp}
              whileHover={{ 
                y: -6,
                boxShadow: "0 20px 25px -5px rgba(0,0,0,0.08), 0 10px 10px -5px rgba(0,0,0,0.02)"
              }}
              className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm transition-all hover:border-brand-primary/30 group flex flex-col"
            >
              <div className="flex items-start gap-5 mb-6">
                <motion.div 
                  whileHover={{ rotate: 10, scale: 1.1 }}
                  className="h-12 w-12 rounded-xl bg-slate-100 flex items-center justify-center shrink-0 group-hover:bg-brand-primary/10 transition-colors"
                >
                  <doc.icon className="h-6 w-6 text-slate-600 group-hover:text-brand-primary transition-colors" />
                </motion.div>
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
                <motion.button 
                  whileHover={{ scale: 1.05, x: 4 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 text-sm font-bold text-brand-primary hover:text-brand-primary/80 transition-colors"
                >
                  <Download className="h-4 w-4" />
                  Download
                </motion.button>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.5 }}
          whileHover={{ scale: 1.01 }}
          className="mt-16 bg-brand-primary/5 rounded-3xl border border-brand-primary/20 p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8"
        >
          <div>
            <h3 className="text-2xl font-bold text-slate-900 mb-3">Looking for Contractor Permits?</h3>
            <p className="text-slate-600 max-w-xl">
              If you are a registered contractor looking to submit a wayleave application or excavation permit, please visit the Contractor Portal.
            </p>
          </div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link href="/contractors" className="shrink-0 flex items-center gap-2 px-8 py-4 bg-brand-primary text-white rounded-xl font-bold hover:bg-brand-primary/90 transition-colors shadow-lg shadow-brand-primary/20">
              Contractor Portal <ArrowRight className="h-5 w-5" />
            </Link>
          </motion.div>
        </motion.div>
      </section>

      <Footer />
    </main>
  );
}