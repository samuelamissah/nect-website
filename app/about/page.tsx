"use client";

import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import { CheckCircle2, History, Target, Users, Award, BookOpen, MapPin, Phone, Mail, Calendar, Building2, Shield, Clock, Sparkles } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { motion, Variants } from "framer-motion";

// Animation variants
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.6, ease: "easeOut" } 
  }
};

const fadeInLeft: Variants = {
  hidden: { opacity: 0, x: -40 },
  visible: { 
    opacity: 1, 
    x: 0, 
    transition: { duration: 0.6, ease: "easeOut" } 
  }
};

const fadeInRight: Variants = {
  hidden: { opacity: 0, x: 40 },
  visible: { 
    opacity: 1, 
    x: 0, 
    transition: { duration: 0.6, ease: "easeOut" } 
  }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const scaleUp: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { 
    opacity: 1, 
    scale: 1, 
    transition: { duration: 0.5, ease: "easeOut" } 
  }
};

export default function AboutPage() {
  const objectives = [
    "Protect road reservations from unauthorized encroachment and damage.",
    "Mandate joint-planning sessions for all intersecting infrastructure projects.",
    "Maintain a national database of utility corridors (water, power, telecommunications).",
    "Enforce penalties for unauthorized excavations and damage to state property.",
    "Provide a citizen reporting portal to crowdsource infrastructure monitoring.",
    "Coordinate with Regional Engineering Coordinating Teams across all 16 regions."
  ];

  const leadership = [
    {
      name: "Ing. Yaa Obenewaa Okudzeto",
      role: "Chairman",
      image: "/Yaa.jpeg",
      bio: "Electrical Engineer, Fellow of the Ghana Institution of Engineering (GhIE), and Executive Representative for Professional Engineers on the GhIE Council and Executive Committee. She is a leading advocate for infrastructure coordination, engineering standards, long-term national development planning, and effective implementation of public infrastructure projects across Ghana.",
      credentials: ""
    },
    {
      name: "Pln. Percy Anaab Bukari",
      role: "Vice Chairman",
      image: "/Percy.jpeg",
      bio: "President of the Ghana Institute of Planning (GIP), National Development Planning Commission (NDPC) Commissioner, and seasoned Monitoring & Evaluation Specialist. He is widely recognized for his contributions to urban development, spatial planning, local governance, and sustainable city management across Ghana and West Africa.",
      credentials: "FGIP, MCAP"
    },
    {
      name: "David Aryeetey",
      role: "Organiser",
      image: "/David.jpeg",
      bio: "Communications professional and Assistant Communications Manager at the Ghana Chamber of Telecommunications. He has extensive experience in stakeholder engagement, public relations, policy advocacy, media relations, and communications surrounding Ghana's digital and telecommunications ecosystem.",
      credentials: "Communications Specialist"
    }
  ];

  return (
    <main className="min-h-screen bg-slate-50 flex flex-col overflow-x-hidden">
      <Header />
      
      {/* Hero Section */}
      <motion.section 
        initial="hidden"
        animate="visible"
        className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-24 lg:py-32"
      >
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay"></div>
        <div className="absolute top-0 right-0 -mr-20 -mt-20 h-96 w-96 rounded-full bg-brand-primary/20 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 h-96 w-96 rounded-full bg-blue-500/10 blur-3xl"></div>
        
        <div className="relative z-10 mx-auto max-w-7xl px-5 lg:px-10">
          <motion.div 
            variants={fadeInLeft}
            className="max-w-4xl"
          >
            <motion.div 
              variants={fadeInUp}
              className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-white border border-white/20 mb-6"
            >
              <motion.span 
                animate={{ scale: [1, 1.5, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="relative flex h-2 w-2"
              >
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400"></span>
              </motion.span>
              About NECT
            </motion.div>
            
            <motion.h1 
              variants={fadeInUp}
              className="text-4xl font-extrabold tracking-tight text-white md:text-5xl lg:text-6xl leading-tight"
            >
              Coordinating Ghana&apos;s
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-blue-400 block mt-2">
                Critical Infrastructure
              </span>
            </motion.h1>
            
            <motion.p 
              variants={fadeInUp}
              className="mt-6 text-lg leading-relaxed text-slate-300 max-w-2xl"
            >
              The National Engineering Coordinating Team (NECT) is the central body responsible for ensuring that infrastructure projects across Ghana are executed harmoniously, preventing utility damage, and protecting national road corridors.
            </motion.p>

            <motion.div 
              variants={staggerContainer}
              className="mt-8 flex flex-wrap gap-4"
            >
              {[
                { icon: Calendar, label: "Est. 1996" },
                { icon: Users, label: "16 Regional Teams" },
                { icon: Award, label: "National Mandate" },
                { icon: Clock, label: "28+ Years of Service" }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  variants={scaleUp}
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center gap-2 text-white/80 bg-white/5 px-4 py-2 rounded-full"
                >
                  <item.icon className="h-5 w-5 text-brand-primary" />
                  <span className="text-sm">{item.label}</span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Main Content */}
      <section className="mx-auto max-w-7xl px-5 py-16 lg:px-10 lg:py-24">
        <div className="grid gap-16 lg:grid-cols-[1fr_350px]">
          
          {/* Left Column */}
          <div className="space-y-16">
            {/* Mission */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={fadeInUp}
            >
              <div className="flex items-center gap-4 mb-6">
                <motion.div 
                  whileHover={{ rotate: 10, scale: 1.1 }}
                  className="p-3 rounded-xl bg-brand-primary/10 text-brand-primary"
                >
                  <Target className="h-8 w-8" />
                </motion.div>
                <div>
                  <h2 className="text-3xl font-bold text-slate-900">Our Mission</h2>
                  <div className="h-1 w-16 bg-brand-primary rounded-full mt-1"></div>
                </div>
              </div>
              <p className="text-lg leading-relaxed text-slate-600 pl-2">
                To establish a unified framework for the planning, execution, and maintenance of public infrastructure in Ghana. We bring together road agencies, utility providers, and local assemblies to eliminate the siloed approach to development, thereby saving the nation millions of Cedis annually in preventable damages.
              </p>
            </motion.div>

            {/* History */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={fadeInUp}
            >
              <div className="flex items-center gap-4 mb-6">
                <motion.div 
                  whileHover={{ rotate: 10, scale: 1.1 }}
                  className="p-3 rounded-xl bg-brand-primary/10 text-brand-primary"
                >
                  <History className="h-8 w-8" />
                </motion.div>
                <div>
                  <h2 className="text-3xl font-bold text-slate-900">Our History</h2>
                  <div className="h-1 w-16 bg-brand-primary rounded-full mt-1"></div>
                </div>
              </div>
              
              <div className="space-y-4 text-lg leading-relaxed text-slate-600 pl-2">
                <motion.div 
                  whileHover={{ scale: 1.01 }}
                  className="bg-brand-primary/5 p-6 rounded-xl border border-brand-primary/10"
                >
                  <p className="text-slate-800 font-semibold">
                    <span className="text-brand-primary text-2xl font-bold mr-2">1996</span>
                    — The National Engineering Coordinating Team (NECT) was established
                  </p>
                </motion.div>
                
                <p>
                  NECT was set up as a multi-agency body to resolve the growing conflicts between rapid road expansions and the rapid rollout of underground utility infrastructure—including fiber optic cables, water pipelines, and power lines. The increasing instances of newly constructed roads being excavated by utility companies highlighted the urgent need for a coordinated approach.
                </p>

                <motion.div 
                  whileHover={{ scale: 1.01 }}
                  className="p-6 bg-white rounded-xl border border-slate-200 shadow-sm"
                >
                  <p className="text-slate-700 font-medium mb-3">
                    <Building2 className="inline-block h-5 w-5 text-brand-primary mr-2" />
                    Why NECT was created:
                  </p>
                  <ul className="space-y-3 text-sm text-slate-600">
                    {[
                      "Prevent waste of public funds on repeated road construction and repairs",
                      "Minimize traffic disruptions and inconvenience to citizens",
                      "Protect vital utility infrastructure from damage",
                      "Ensure coordinated planning between all infrastructure stakeholders"
                    ].map((item, i) => (
                      <motion.li 
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="flex items-start gap-3"
                      >
                        <span className="h-1.5 w-1.5 rounded-full bg-red-500 mt-2 shrink-0"></span>
                        <span>{item}</span>
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>

                <p className="mt-4">
                  Today, NECT operates with a national mandate, backed by government policy to enforce strict coordination protocols before any major excavation or civil works commence within public right-of-ways. Our reach extends across all 16 regions of Ghana through Regional Engineering Coordinating Teams.
                </p>
              </div>
            </motion.div>

            {/* Objectives */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={fadeInUp}
            >
              <div className="flex items-center gap-4 mb-6">
                <motion.div 
                  whileHover={{ rotate: 10, scale: 1.1 }}
                  className="p-3 rounded-xl bg-brand-primary/10 text-brand-primary"
                >
                  <CheckCircle2 className="h-8 w-8" />
                </motion.div>
                <div>
                  <h2 className="text-3xl font-bold text-slate-900">Core Objectives</h2>
                  <div className="h-1 w-16 bg-brand-primary rounded-full mt-1"></div>
                </div>
              </div>
              
              <motion.ul 
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
                className="space-y-4 pl-2"
              >
                {objectives.map((item, i) => (
                  <motion.li 
                    key={i}
                    variants={fadeInUp}
                    whileHover={{ scale: 1.01, boxShadow: "0 10px 25px -5px rgba(0,0,0,0.1)" }}
                    className="flex items-start gap-4 bg-white p-5 rounded-xl border border-slate-200 shadow-sm transition-shadow duration-200"
                  >
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-primary/10 text-brand-primary">
                      <span className="text-sm font-bold">{i + 1}</span>
                    </div>
                    <span className="text-slate-700 font-medium leading-relaxed">{item}</span>
                  </motion.li>
                ))}
              </motion.ul>
            </motion.div>

            {/* Stats Section */}
            <motion.div 
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm"
            >
              {[
                { number: "1996", label: "Year Established" },
                { number: "16", label: "Regional Teams" },
                { number: "50+", label: "Partner Agencies" },
                { number: "28+", label: "Years of Service" }
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  variants={scaleUp}
                  whileHover={{ scale: 1.05 }}
                  className="text-center"
                >
                  <motion.p 
                    initial={{ opacity: 0, scale: 0.5 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.1 }}
                    className="text-3xl font-bold text-brand-primary"
                  >
                    {stat.number}
                  </motion.p>
                  <p className="text-xs text-slate-500 mt-1">{stat.label}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={fadeInRight}
              whileHover={{ scale: 1.02 }}
              className="rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 p-8 text-white shadow-xl"
            >
              <h3 className="text-xl font-bold mb-3">Join the Network</h3>
              <p className="text-sm text-white/80 leading-relaxed mb-6">
                Are you a licensed contractor or utility provider? Register on our portal to submit your project schedules and ensure coordinated infrastructure development.
              </p>
              <Link
                href="/register"
                className="block w-full rounded-lg bg-brand-primary px-6 py-3.5 text-center text-sm font-semibold text-white transition-all duration-200 hover:bg-brand-primary/90 hover:shadow-lg hover:scale-[1.02]"
              >
                Contractor Registration
              </Link>
              <div className="mt-4 pt-4 border-t border-white/10">
                <p className="text-xs text-white/60">Already registered?</p>
                <Link href="/login" className="text-sm text-brand-primary hover:text-brand-primary/80 font-medium">
                  Sign in →
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={fadeInRight}
              transition={{ delay: 0.1 }}
              className="rounded-2xl bg-white p-6 border border-slate-200 shadow-sm"
            >
              <h4 className="font-semibold text-slate-900 mb-4">Contact NECT</h4>
              <div className="space-y-3">
                <div className="flex items-start gap-3 text-sm">
                  <MapPin className="h-5 w-5 text-brand-primary shrink-0 mt-0.5" />
                  <span className="text-slate-600">Ministry of Roads and Highways, Accra, Ghana</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Phone className="h-5 w-5 text-brand-primary shrink-0" />
                  <span className="text-slate-600">+233 30 212 3456</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Mail className="h-5 w-5 text-brand-primary shrink-0" />
                  <span className="text-slate-600">info@nect.gov.gh</span>
                </div>
                <div className="pt-3 mt-3 border-t border-slate-200">
                  <p className="text-xs text-slate-400">Regional Coordinating Teams available in all 16 regions</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={fadeInRight}
              transition={{ delay: 0.2 }}
              whileHover={{ scale: 1.02 }}
              className="rounded-2xl bg-brand-primary/5 p-6 border border-brand-primary/10"
            >
              <div className="flex items-center gap-3 mb-2">
                <Shield className="h-5 w-5 text-brand-primary" />
                <h4 className="font-semibold text-slate-900">Regional Presence</h4>
              </div>
              <p className="text-sm text-slate-600 leading-relaxed">
                NECT operates through Regional Engineering Coordinating Teams across all 16 regions of Ghana, ensuring localized coordination and rapid response.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Leadership Section */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        className="bg-white py-20 lg:py-24 border-t border-slate-200"
      >
        <div className="mx-auto max-w-7xl px-5 lg:px-10">
          <motion.div variants={fadeInUp} className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-primary/10 text-brand-primary text-sm font-semibold mb-4">
              <Users className="h-4 w-4" />
              Leadership Team
            </div>
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Meet Our Leadership</h2>
            <p className="text-slate-600">
              Dedicated professionals committed to coordinating Ghana&apos;s infrastructure development
            </p>
            <div className="w-24 h-1 bg-brand-primary mx-auto rounded-full mt-4"></div>
          </motion.div>

          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
          >
            {leadership.map((member, index) => (
              <motion.div 
                key={index}
                variants={fadeInUp}
                whileHover={{ 
                  y: -8,
                  scale: 1.02,
                  transition: { duration: 0.2 }
                }}
                className="group bg-slate-50 rounded-2xl p-8 text-center border border-slate-200 hover:border-brand-primary/30 transition-all duration-300 hover:shadow-xl"
              >
                <motion.div 
                  whileHover={{ scale: 1.05 }}
                  className="relative mb-6 mx-auto h-40 w-40"
                >
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-brand-primary/20 to-transparent group-hover:scale-110 transition-transform duration-300"></div>
                  <div className="relative h-40 w-40 overflow-hidden rounded-full border-4 border-white shadow-lg group-hover:border-brand-primary/30 transition-all duration-300">
                    <Image
                      src={member.image}
                      alt={member.name}
                      width={160}
                      height={160}
                      className="h-full w-full object-cover"
                    />
                  </div>
                </motion.div>

                <h3 className="text-xl font-bold text-slate-900 leading-tight">
                  {member.name}
                </h3>

                <p className="mt-1 text-sm font-semibold text-brand-primary">
                  {member.role}
                </p>

                {member.credentials && (
                  <p className="text-xs text-slate-400 mt-1">{member.credentials}</p>
                )}

                <div className="mt-4 h-px bg-slate-200"></div>

                <p className="mt-4 text-sm text-slate-600 leading-relaxed">
                  {member.bio}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Call to Action */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeInUp}
        className="relative overflow-hidden bg-gradient-to-br from-slate-900 to-slate-800 py-20 lg:py-24"
      >
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay"></div>
        <div className="absolute top-0 left-0 -ml-20 -mt-20 h-96 w-96 rounded-full bg-brand-primary/10 blur-3xl"></div>
        <div className="absolute bottom-0 right-0 -mr-20 -mb-20 h-96 w-96 rounded-full bg-blue-500/10 blur-3xl"></div>
        
        <div className="relative z-10 mx-auto max-w-7xl px-5 lg:px-10 text-center">
          <motion.div 
            variants={fadeInUp}
            className="max-w-3xl mx-auto"
          >
            <motion.div
              animate={{ 
                scale: [1, 1.1, 1],
                rotate: [0, 5, -5, 0]
              }}
              transition={{ duration: 3, repeat: Infinity }}
              className="flex justify-center mb-6"
            >
            </motion.div>
            
            <h2 className="text-3xl font-bold text-white lg:text-4xl mb-4">
              Ready to Coordinate Your Infrastructure Project?
            </h2>
            <p className="text-slate-300 max-w-2xl mx-auto mb-8 leading-relaxed">
              Join NECT in building a better Ghana through coordinated infrastructure development. 
              Contact your Regional Engineering Coordinating Team to get started.
            </p>
            <motion.div 
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="flex flex-wrap justify-center gap-4"
            >
              <motion.div variants={scaleUp} whileHover={{ scale: 1.05 }}>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-lg bg-brand-primary px-8 py-3.5 text-sm font-semibold text-white transition-all duration-200 hover:bg-brand-primary/90 hover:shadow-lg"
                >
                  Contact Us
                </Link>
              </motion.div>
              <motion.div variants={scaleUp} whileHover={{ scale: 1.05 }}>
                <Link
                  href="/regions"
                  className="inline-flex items-center gap-2 rounded-lg bg-white/10 backdrop-blur-sm px-8 py-3.5 text-sm font-semibold text-white transition-all duration-200 hover:bg-white/20 border border-white/20"
                >
                  <MapPin className="h-4 w-4" />
                  Find Your Regional Team
                </Link>
              </motion.div>
              <motion.div variants={scaleUp} whileHover={{ scale: 1.05 }}>
                <Link
                  href="/resources"
                  className="inline-flex items-center gap-2 rounded-lg bg-white/10 backdrop-blur-sm px-8 py-3.5 text-sm font-semibold text-white transition-all duration-200 hover:bg-white/20 border border-white/20"
                >
                  <BookOpen className="h-4 w-4" />
                  View Resources
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      <Footer />
    </main>
  );
}