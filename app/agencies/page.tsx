"use client";

import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import { Building2, Droplets, Zap, Wifi, Landmark, ShieldAlert, FileText } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";

const agencies = [
  {
    category: "Roads & Highways",
    icon: Building2,
    color: "text-slate-700 bg-slate-100",
    members: [
      { name: "Ministry of Roads and Highways (MRH)", role: "Policy & Oversight" },
      { name: "Ghana Highway Authority (GHA)", role: "Trunk Roads" },
      { name: "Department of Urban Roads (DUR)", role: "City Networks" },
      { name: "Department of Feeder Roads (DFR)", role: "Rural Networks" },
    ]
  },
  {
    category: "Utility Providers",
    icon: Zap,
    color: "text-amber-600 bg-amber-100",
    members: [
      { name: "Electricity Company of Ghana (ECG)", role: "Power Distribution" },
      { name: "Ghana Grid Company (GRIDCo)", role: "Power Transmission" },
      { name: "Ghana Water Company Limited (GWCL)", role: "Water Distribution" },
      { name: "Telecommunication Chamber", role: "Fibre Infrastructure" },
    ]
  },
  {
    category: "Local Government",
    icon: Landmark,
    color: "text-emerald-600 bg-emerald-100",
    members: [
      { name: "Ministry of Local Government", role: "Decentralization" },
      { name: "Accra Metropolitan Assembly (AMA)", role: "City Authority" },
      { name: "Kumasi Metropolitan Assembly (KMA)", role: "City Authority" },
      { name: "All 261 MMDAs", role: "Local Enforcement" },
    ]
  },
  {
    category: "Regulatory & Security",
    icon: ShieldAlert,
    color: "text-brand-primary bg-brand-primary/10",
    members: [
      { name: "Environmental Protection Agency (EPA)", role: "Environmental Compliance" },
      { name: "Land Use and Spatial Planning Authority", role: "Spatial Planning" },
      { name: "Ghana Police Service (MTTD)", role: "Traffic & Security" },
      { name: "National Road Safety Authority", role: "Safety Standards" },
    ]
  }
];

export default function AgenciesPage() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  return (
    <main className="min-h-screen bg-slate-50 flex flex-col">
      <Header />
      
      <section className="bg-white border-b border-slate-200">
        <div className="mx-auto max-w-7xl px-5 py-16 lg:px-10 lg:py-24">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl"
          >
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.4 }}
              className="inline-flex items-center gap-2 rounded-full bg-brand-primary/10 px-3 py-1 text-xs font-semibold text-brand-primary mb-4"
            >
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-brand-primary"></span>
              </span>
              NECT PARTNER NETWORK
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="text-4xl font-extrabold tracking-tight text-slate-900 md:text-5xl"
            >
              Partner Agencies & Stakeholders
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="mt-6 text-lg leading-relaxed text-slate-600"
            >
              NECT operates as an inter-ministerial task force. Our success relies on the active participation and strict compliance of over 37 state institutions, utility companies, and regulatory bodies.
            </motion.p>
          </motion.div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16 lg:px-10 lg:py-24 w-full">
        <div className="grid gap-8 md:grid-cols-2">
          {agencies.map((group, idx) => (
            <motion.div 
              key={group.category}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              whileHover={{ y: -4, boxShadow: "0 20px 25px -5px rgba(0,0,0,0.05), 0 10px 10px -5px rgba(0,0,0,0.02)" }}
              className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm transition-all"
            >
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 + 0.1 }}
                className="flex items-center gap-4 mb-8 border-b border-slate-100 pb-6"
              >
                <motion.div 
                  whileHover={{ rotate: 10, scale: 1.1 }}
                  className={`flex h-14 w-14 items-center justify-center rounded-xl ${group.color}`}
                >
                  <group.icon className="h-7 w-7" />
                </motion.div>
                <h2 className="text-2xl font-bold text-slate-900">{group.category}</h2>
              </motion.div>
              
              <ul className="space-y-6">
                {group.members.map((member, memberIdx) => (
                  <motion.li 
                    key={member.name} 
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 + memberIdx * 0.1 + 0.2 }}
                    whileHover={{ x: 4 }}
                    className="flex justify-between items-start gap-4"
                  >
                    <span className="font-semibold text-slate-800">{member.name}</span>
                    <span className="inline-flex shrink-0 items-center rounded-sm bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600">
                      {member.role}
                    </span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.5 }}
          whileHover={{ scale: 1.01 }}
          className="mt-16 rounded-2xl bg-slate-900 p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8"
        >
          <div className="max-w-2xl">
            <h3 className="text-2xl font-bold text-white mb-3">Download the Operational Guidelines</h3>
            <p className="text-slate-300">
              Access the official NECT framework document detailing the coordination protocols, right-of-way sharing agreements, and conflict resolution mechanisms for all partner agencies.
            </p>
          </div>
          <motion.button 
            whileHover={{ scale: 1.05, backgroundColor: "#fbbf24" }}
            whileTap={{ scale: 0.95 }}
            className="shrink-0 inline-flex items-center justify-center gap-2 rounded-sm bg-amber-400 px-6 py-4 text-sm font-bold text-slate-900 transition-colors hover:bg-amber-400"
          >
            <FileText className="h-5 w-5" />
            Download PDF (4.2 MB)
          </motion.button>
        </motion.div>
      </section>

      <Footer />
    </main>
  );
}