"use client";

import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import { Building2, Droplets, Zap, Wifi, Landmark, ShieldAlert, FileText, Users, Briefcase, Globe } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";

const agencies = [
  {
    category: "Transport & Road Agencies",
    icon: Building2,
    color: "text-blue-600 bg-blue-100",
    description: "Managing Ghana's road network and infrastructure",
    members: [
      { name: "Ghana Highway Authority (GHA)", role: "Major Highways & Trunk Roads" },
      { name: "Department of Urban Roads (DUR)", role: "City Roads & NECT Secretariat" },
      { name: "Department of Feeder Roads (DFR)", role: "Rural & Farm-to-Market Roads" },
    ]
  },
  {
    category: "Utility & Power Agencies",
    icon: Zap,
    color: "text-amber-600 bg-amber-100",
    description: "Managing power and water infrastructure",
    members: [
      { name: "Electricity Company of Ghana (ECG)", role: "Power Distribution" },
      { name: "Ghana Grid Company (GRIDCo)", role: "High-Voltage Transmission" },
      { name: "Ghana Water Company Limited (GWCL)", role: "Water Distribution" },
    ]
  },
  {
    category: "Telecommunications Sector",
    icon: Wifi,
    color: "text-purple-600 bg-purple-100",
    description: "Protecting communication infrastructure",
    members: [
      { name: "Ghana Chamber of Telecommunications", role: "Industry Coordination" },
      { name: "National Communications Authority (NCA)", role: "Regulatory Oversight" },
      { name: "Telecom Operators (MTN, Telecel, etc.)", role: "Network Infrastructure" },
    ]
  },
  {
    category: "Local Government & Planning",
    icon: Landmark,
    color: "text-emerald-600 bg-emerald-100",
    description: "Local enforcement and spatial planning",
    members: [
      { name: "Ministry of Local Government", role: "Decentralization & Oversight" },
      { name: "District & Municipal Assemblies", role: "Local Enforcement & Permits" },
      { name: "Land Use and Spatial Planning Authority (LUSPA)", role: "Zoning & Spatial Planning" },
    ]
  },
  {
    category: "Professional Bodies",
    icon: Briefcase,
    color: "text-indigo-600 bg-indigo-100",
    description: "Expert advisory and professional standards",
    members: [
      { name: "Ghana Institution of Engineering (GhIE)", role: "Engineering Standards" },
      { name: "Ghana Institute of Planners", role: "Planning & Mapping" },
      { name: "Ghana Institute of Surveyors", role: "Boundary & Mapping" },
    ]
  },
  {
    category: "Regulatory & Security",
    icon: ShieldAlert,
    color: "text-red-600 bg-red-100",
    description: "Compliance and security enforcement",
    members: [
      { name: "Environmental Protection Agency (EPA)", role: "Environmental Compliance" },
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
              The National Engineering Coordinating Team (NECT) brings together <span className="font-bold text-brand-primary">37 public institutions</span>, 
              private utility companies, and <span className="font-bold text-brand-primary">9 ministries</span> to manage public road reserves 
              and protect underground infrastructure across Ghana.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="mx-auto max-w-7xl px-5 -mt-6 relative z-20">
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6 text-center">
            <p className="text-3xl font-bold text-brand-primary">37+</p>
            <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mt-1">Member Institutions</p>
          </div>
          <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6 text-center">
            <p className="text-3xl font-bold text-brand-primary">9</p>
            <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mt-1">Government Ministries</p>
          </div>
          <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6 text-center">
            <p className="text-3xl font-bold text-brand-primary">16</p>
            <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mt-1">Regional Teams</p>
          </div>
          <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6 text-center">
            <p className="text-3xl font-bold text-brand-primary">261</p>
            <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mt-1">MMDAs Nationwide</p>
          </div>
        </motion.div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16 lg:px-10 lg:py-24 w-full">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {agencies.map((group, idx) => (
            <motion.div 
              key={group.category}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: idx * 0.08, duration: 0.5 }}
              whileHover={{ y: -6, boxShadow: "0 20px 25px -5px rgba(0,0,0,0.08), 0 10px 10px -5px rgba(0,0,0,0.02)" }}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:border-brand-primary/30"
            >
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.08 + 0.1 }}
                className="flex items-center gap-3 mb-4"
              >
                <motion.div 
                  whileHover={{ rotate: 10, scale: 1.1 }}
                  className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${group.color}`}
                >
                  <group.icon className="h-6 w-6" />
                </motion.div>
                <div>
                  <h2 className="text-lg font-bold text-slate-900 leading-tight">{group.category}</h2>
                  <p className="text-xs text-slate-500">{group.description}</p>
                </div>
              </motion.div>
              
              <div className="h-px bg-slate-100 my-4"></div>
              
              <ul className="space-y-4">
                {group.members.map((member, memberIdx) => (
                  <motion.li 
                    key={member.name} 
                    initial={{ opacity: 0, x: -15 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.08 + memberIdx * 0.08 + 0.2 }}
                    whileHover={{ x: 4 }}
                    className="flex justify-between items-start gap-3"
                  >
                    <span className="font-medium text-slate-800 text-sm">{member.name}</span>
                    <span className="inline-flex shrink-0 items-center rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-600 whitespace-nowrap">
                      {member.role}
                    </span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Summary Section */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="mt-16 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 p-8 md:p-12"
        >
          <div className="max-w-4xl mx-auto text-center">
            <Globe className="h-12 w-12 text-brand-primary mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-white mb-4">A Unified Approach to Infrastructure Coordination</h3>
            <p className="text-slate-300 leading-relaxed">
              NECT serves as the central coordinating body, bringing together these diverse agencies to ensure 
              that infrastructure projects are executed harmoniously. By fostering collaboration between road 
              agencies, utility providers, telecom operators, local authorities, and professional bodies, 
              we protect Ghana&apos;s road corridors and underground utility infrastructure from damage and 
              unauthorized encroachment.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-4 text-sm text-slate-400">
              <span className="flex items-center gap-2">
                <Users className="h-4 w-4 text-brand-primary" />
                37+ Member Institutions
              </span>
              <span className="flex items-center gap-2">
                <Building2 className="h-4 w-4 text-brand-primary" />
                9 Government Ministries
              </span>
              <span className="flex items-center gap-2">
                <Landmark className="h-4 w-4 text-brand-primary" />
                261 MMDAs
              </span>
            </div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.5 }}
          whileHover={{ scale: 1.01 }}
          className="mt-8 rounded-2xl bg-brand-primary p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8"
        >
          <div className="max-w-2xl">
            <h3 className="text-2xl font-bold text-white mb-3">Download the Operational Guidelines</h3>
            <p className="text-white/80">
              Access the official NECT framework document detailing the coordination protocols, right-of-way sharing agreements, and conflict resolution mechanisms for all partner agencies.
            </p>
          </div>
          <motion.button 
            whileHover={{ scale: 1.05, backgroundColor: "#fbbf24" }}
            whileTap={{ scale: 0.95 }}
            className="shrink-0 inline-flex items-center justify-center gap-2 rounded-lg bg-amber-400 px-6 py-4 text-sm font-bold text-slate-900 transition-colors hover:bg-amber-300"
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