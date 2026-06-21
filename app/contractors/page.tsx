"use client";

import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import { FileSignature, ShieldCheck, Map, ClipboardCheck, ArrowRight, Building2, Lock, CheckCircle, AlertCircle } from "lucide-react";
import { motion, Variants } from "framer-motion";
import { useState } from "react";

// Animation variants
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
};

const fadeInDown: Variants = {
  hidden: { opacity: 0, y: -30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
};

const fadeInLeft: Variants = {
  hidden: { opacity: 0, x: -40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut" } }
};

const fadeInRight: Variants = {
  hidden: { opacity: 0, x: 40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut" } }
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

export default function ContractorPortalPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle login logic here
    console.log("Login attempted with:", { email, password, rememberMe });
  };

  const services = [
    {
      title: "Wayleave Permits",
      desc: "Apply for right-of-way access for new installations.",
      icon: FileSignature,
      color: "text-blue-600 bg-blue-100"
    },
    {
      title: "Site Clearances",
      desc: "Request NECT inspection and clearance for completed works.",
      icon: ShieldCheck,
      color: "text-emerald-600 bg-emerald-100"
    },
    {
      title: "Utility Mapping",
      desc: "Submit GIS data for newly laid underground utilities.",
      icon: Map,
      color: "text-purple-600 bg-purple-100"
    },
    {
      title: "Compliance Audit",
      desc: "Check your agency's compliance rating and active violations.",
      icon: ClipboardCheck,
      color: "text-amber-600 bg-amber-100"
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
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
        <div className="absolute top-0 right-0 -mr-20 -mt-20 h-96 w-96 rounded-full bg-brand-primary/20 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 h-96 w-96 rounded-full bg-blue-500/10 blur-3xl"></div>
        
        <div className="mx-auto max-w-7xl px-5 py-16 lg:px-10 lg:py-24 relative z-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
            <motion.div 
              variants={fadeInLeft}
              className="max-w-2xl"
            >
              <motion.div 
                variants={fadeInUp}
                className="mb-4 inline-flex items-center gap-2 rounded-full bg-amber-400/20 px-4 py-1.5 text-sm font-bold uppercase tracking-wider text-amber-400 border border-amber-400/30"
              >
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-amber-400"></span>
                </span>
                Secure Portal
              </motion.div>
              
              <motion.h1 
                variants={fadeInUp}
                className="text-4xl font-extrabold tracking-tight text-white md:text-5xl"
              >
                Contractor E-Services
              </motion.h1>
              
              <motion.p 
                variants={fadeInUp}
                className="mt-6 text-lg leading-relaxed text-slate-300"
              >
                Apply for excavation permits, submit utility relocation plans, and track your compliance status with the National Engineering Coordinating Team.
              </motion.p>

              <motion.div 
                variants={fadeInUp}
                className="mt-8 flex flex-wrap gap-4"
              >
                <div className="flex items-center gap-2 text-sm text-slate-400">
                  <CheckCircle className="h-4 w-4 text-emerald-400" />
                  <span>Secure & Encrypted</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-400">
                  <CheckCircle className="h-4 w-4 text-emerald-400" />
                  <span>24/7 Access</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-400">
                  <CheckCircle className="h-4 w-4 text-emerald-400" />
                  <span>Real-time Updates</span>
                </div>
              </motion.div>
            </motion.div>

            {/* Login Form */}
            <motion.div 
              variants={fadeInRight}
              whileHover={{ y: -4 }}
              className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 border border-slate-200 shrink-0"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="h-10 w-10 bg-brand-primary/10 rounded-full flex items-center justify-center">
                  <Lock className="h-5 w-5 text-brand-primary" />
                </div>
                <h2 className="text-xl font-bold text-slate-900">Portal Login</h2>
              </div>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">TIN / Registration Number</label>
                  <input 
                    type="text" 
                    placeholder="e.g. C0001234567" 
                    className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 outline-none transition-all" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">Password</label>
                  <input 
                    type="password" 
                    placeholder="••••••••" 
                    className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 outline-none transition-all" 
                  />
                </div>
                <div className="flex items-center justify-between mt-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input 
                      type="checkbox" 
                      className="rounded border-slate-300 text-brand-primary focus:ring-brand-primary" 
                    />
                    <span className="text-sm text-slate-600">Remember me</span>
                  </label>
                  <a href="#" className="text-sm font-bold text-brand-primary hover:underline">Forgot Password?</a>
                </div>
                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit" 
                  className="w-full bg-slate-900 text-white font-bold py-3.5 rounded-lg hover:bg-slate-800 transition-colors shadow-lg shadow-slate-900/20 mt-4"
                >
                  Secure Login
                </motion.button>
              </form>
              <div className="mt-6 text-center text-sm text-slate-500">
                Not registered? <a href="#" className="font-bold text-brand-primary hover:underline">Apply for Contractor ID</a>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Services Section */}
      <section className="mx-auto max-w-7xl px-5 py-16 lg:px-10 lg:py-24 w-full flex-1">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeInUp}
          className="mb-12 text-center max-w-3xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-primary/10 text-brand-primary text-sm font-semibold mb-4">
            <Building2 className="h-4 w-4" />
            Contractor Services
          </div>
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Portal Services</h2>
          <p className="text-slate-600">
            Our digital services are designed to streamline the approval process, ensuring all infrastructural works meet national standards before commencement.
          </p>
        </motion.div>

        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid gap-8 md:grid-cols-2 lg:grid-cols-4"
        >
          {services.map((service, idx) => (
            <motion.div 
              key={idx}
              variants={fadeInUp}
              whileHover={{ 
                y: -6,
                boxShadow: "0 20px 25px -5px rgba(0,0,0,0.08), 0 10px 10px -5px rgba(0,0,0,0.02)"
              }}
              className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:border-brand-primary/40 transition-all"
            >
              <motion.div 
                whileHover={{ rotate: 10, scale: 1.1 }}
                className={`h-12 w-12 rounded-xl ${service.color} flex items-center justify-center mb-6`}
              >
                <service.icon className="h-6 w-6" />
              </motion.div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">{service.title}</h3>
              <p className="text-sm text-slate-600 mb-6">{service.desc}</p>
              <motion.a 
                href="#" 
                whileHover={{ x: 4 }}
                className="inline-flex items-center gap-2 text-sm font-bold text-brand-primary hover:gap-3 transition-all"
              >
                Learn more <ArrowRight className="h-4 w-4" />
              </motion.a>
            </motion.div>
          ))}
        </motion.div>

        {/* Quick Stats */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {[
            { label: "Active Contractors", value: "2,847" },
            { label: "Permits Issued (2024)", value: "1,234" },
            { label: "Pending Applications", value: "89" },
            { label: "Compliance Rate", value: "96%" }
          ].map((stat, idx) => (
            <motion.div 
              key={idx}
              whileHover={{ scale: 1.05 }}
              className="bg-white rounded-2xl border border-slate-200 p-6 text-center shadow-sm"
            >
              <p className="text-3xl font-bold text-brand-primary">{stat.value}</p>
              <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mt-1">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Contractor Registration CTA */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.5 }}
          whileHover={{ scale: 1.01 }}
          className="mt-16 bg-gradient-to-br from-brand-primary to-brand-primary/80 rounded-3xl p-8 md:p-12 text-center text-white"
        >
          <h3 className="text-2xl font-bold mb-3">New to NECT?</h3>
          <p className="text-white/80 max-w-2xl mx-auto mb-8">
            Register your contracting firm today to gain access to all NECT e-services. 
            Complete the online application form and submit your company documents.
          </p>
          <motion.a 
            href="#" 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 px-8 py-3 bg-white text-brand-primary font-bold rounded-lg hover:bg-white/90 transition-colors"
          >
            Register Now <ArrowRight className="h-4 w-4" />
          </motion.a>
        </motion.div>
      </section>

      <Footer />
    </main>
  );
}