"use client";

import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import HeroScene from "@/app/components/HeroScene";
import Link from "next/link";
import { supabase } from "@/app/lib/supabase";
import { motion, Variants } from "framer-motion";
import {
  ShieldCheck,
  ArrowRight,
  Search,
  AlertTriangle,
  FileText,
  Mail,
  Activity,
  BellRing,
  Newspaper
} from "lucide-react";
import Image from "next/image";
import { slugify } from "@/app/lib/slugify";
import { useEffect, useState } from "react";

// Define types for news articles
interface NewsArticle {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  created_at: string;
  image_url?: string;
}

// Animation variants with proper types
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      duration: 0.6, 
      ease: "easeOut" 
    } 
  }
};

const fadeInLeft: Variants = {
  hidden: { opacity: 0, x: -40 },
  visible: { 
    opacity: 1, 
    x: 0, 
    transition: { 
      duration: 0.6, 
      ease: "easeOut" 
    } 
  }
};

const fadeInRight: Variants = {
  hidden: { opacity: 0, x: 40 },
  visible: { 
    opacity: 1, 
    x: 0, 
    transition: { 
      duration: 0.6, 
      ease: "easeOut" 
    } 
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
    transition: { 
      duration: 0.5, 
      ease: "easeOut" 
    } 
  }
};

export default function HomePage() {
  const [newsArticles, setNewsArticles] = useState<NewsArticle[]>([]);
  const [contentMap, setContentMap] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        // Fetch latest news
        const { data: newsData } = await supabase
          .from("news")
          .select("*")
          .order("created_at", { ascending: false })
          .limit(3);

        // Fetch homepage content
        const { data: contentData } = await supabase
          .from("homepage_content")
          .select("*");
          
        const map: Record<string, string> = {};
        if (contentData) {
          contentData.forEach((item) => {
            map[item.id] = item.value;
          });
        }

        setNewsArticles((newsData as NewsArticle[]) || []);
        setContentMap(map);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  // Default values fallback
  const heroTitle = contentMap.hero_title || "Protecting Ghana's Infrastructure Through Engineering Coordination.";
  const heroSubtitle = contentMap.hero_subtitle || "NECT brings together road agencies, utility providers, contractors, local authorities, engineers and government institutions to protect road reservations, prevent utility damage and support sustainable national development.";
  
  const statsAgencies = contentMap.stats_agencies || "37+";
  const statsRegions = contentMap.stats_regions || "16";
  const statsMinistries = contentMap.stats_ministries || "9+";
  const statsProjects = contentMap.stats_projects || "1,200+";
  const statsReports = contentMap.stats_reports || "4,500+";
  const statsResolution = contentMap.stats_resolution || "98%";

  const alertActive = contentMap.alert_active === "true";
  const alertTitle = contentMap.alert_title || "National Infrastructure Advisory";
  const alertDescription = contentMap.alert_description || "All contractors undertaking excavation works along the N6 highway corridor must coordinate with GWCL and ECG before commencement to prevent service disruption.";
  const alertLink = contentMap.alert_link || "/news";

  const quickActions = [
    { title: "Report Encroachment", icon: ShieldCheck, href: "/report?type=encroachment", color: "text-brand-primary", bg: "bg-brand-primary/10" },
    { title: "Report Utility Damage", icon: AlertTriangle, href: "/report?type=damage", color: "text-amber-600", bg: "bg-amber-100" },
    { title: "Track Existing Report", icon: Search, href: "/track", color: "text-emerald-600", bg: "bg-emerald-100" },
    { title: "Download Guidelines", icon: FileText, href: "/guidelines", color: "text-blue-600", bg: "bg-blue-100" },
    { title: "Latest Notices", icon: BellRing, href: "/alerts", color: "text-purple-600", bg: "bg-purple-100" },
    { title: "Contact NECT", icon: Mail, href: "/contact", color: "text-slate-600", bg: "bg-slate-200" },
  ];

  const stats = [
    { number: statsAgencies, label: "Member Institutions" },
    { number: statsRegions, label: "Regional Teams" },
    { number: statsMinistries, label: "Government Ministries" },
    { number: statsProjects, label: "Projects Coordinated" },
    { number: statsReports, label: "Reports Received" },
    { number: statsResolution, label: "Resolution Rate" },
  ];

  const stakeholders = [
    { label: "Road Agencies", top: "20%", left: "15%" },
    { label: "Utility Providers (ECG, GWCL)", top: "20%", left: "85%" },
    { label: "Telecom Operators", top: "50%", left: "10%" },
    { label: "Local Assemblies (MMDAs)", top: "50%", left: "90%" },
    { label: "Contractors", top: "85%", left: "25%" },
    { label: "Govt Ministries", top: "85%", left: "75%" },
  ];

  return (
    <main className="min-h-screen bg-slate-50 selection:bg-brand-secondary selection:text-white overflow-x-hidden">
      <Header />

      {/* Hero Section */}
      <section className="relative overflow-hidden px-5 py-12 lg:px-10 lg:py-20 border-b border-slate-200">
        <div className="absolute inset-0 z-0 bg-slate-50"></div>
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'linear-gradient(#1e3a8a 1px, transparent 1px), linear-gradient(90deg, #1e3a8a 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>

        <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-16 lg:grid-cols-[1.1fr_0.9fr]">
          <motion.div 
            variants={fadeInLeft}
            className="max-w-3xl"
          >
            <motion.div 
              variants={fadeInUp}
              className="mb-6 inline-flex items-center gap-2 rounded-sm border border-brand-primary/20 bg-brand-primary/5 px-4 py-2 text-sm font-bold text-brand-primary uppercase tracking-wider"
            >
              <motion.span 
                animate={{ scale: [1, 1.5, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="flex h-2 w-2 rounded-full bg-brand-primary"
              ></motion.span>
              National Infrastructure Command
            </motion.div>

            <motion.h1 
              variants={fadeInUp}
              className="text-4xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-5xl lg:text-6xl"
            >
              {heroTitle}
            </motion.h1>

            <motion.p 
              variants={fadeInUp}
              className="mt-8 text-lg leading-relaxed text-slate-600 sm:text-xl font-medium whitespace-pre-line"
            >
              {heroSubtitle}
            </motion.p>

            <motion.div 
              variants={fadeInUp}
              className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center"
            >
              <Link
                href="/report"
                className="inline-flex items-center justify-center rounded-sm bg-[#CE1126] px-8 py-4 text-sm font-bold text-white transition-all hover:bg-[#a80e1f] hover:shadow-lg hover:-translate-y-0.5 group"
              >
                Report Infrastructure Issue
                <motion.span
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <ArrowRight className="ml-2 h-4 w-4" />
                </motion.span>
              </Link>

              <Link
                href="/about"
                className="inline-flex items-center justify-center rounded-sm border-2 border-slate-900 bg-transparent px-8 py-4 text-sm font-bold text-slate-900 transition-all hover:bg-slate-900 hover:text-white hover:shadow-lg hover:-translate-y-0.5"
              >
                Learn About NECT
              </Link>
            </motion.div>
          </motion.div>

          <div className="relative h-[420px] lg:h-[560px] w-full rounded-sm bg-slate-900 p-2 shadow-2xl overflow-hidden border border-slate-800">
            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
            <HeroScene />
            
            {/* Overlay UI elements */}
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="absolute top-4 left-4 right-4 flex justify-between pointer-events-none"
            >
              <div className="bg-slate-900/80 backdrop-blur border border-slate-700 text-xs font-mono text-emerald-400 px-3 py-1 rounded-sm flex items-center gap-2">
                <motion.div 
                  animate={{ scale: [1, 1.5, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="h-1.5 w-1.5 rounded-full bg-emerald-500"
                ></motion.div>
                SYSTEM ACTIVE
              </div>
              <div className="bg-slate-900/80 backdrop-blur border border-slate-700 text-xs font-mono text-slate-300 px-3 py-1 rounded-sm">
                COORD_NODE: ACCRA_01
              </div>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="absolute bottom-4 left-4 right-4 pointer-events-none flex gap-2"
            >
              <div className="h-1 flex-1 bg-brand-secondary/30 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: "66%" }}
                  transition={{ duration: 1.5, delay: 1 }}
                  className="h-full bg-brand-secondary"
                ></motion.div>
              </div>
              <div className="h-1 flex-1 bg-amber-500/30 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: "33%" }}
                  transition={{ duration: 1.5, delay: 1.2 }}
                  className="h-full bg-amber-500"
                ></motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Quick Actions Section */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeInUp}
        className="bg-slate-100 border-b border-slate-200 py-16 px-5 lg:px-10"
      >
        <div className="mx-auto max-w-7xl">
          <motion.h2 
            variants={fadeInUp}
            className="text-2xl font-bold text-slate-900 mb-8 flex items-center gap-3"
          >
            <Activity className="h-6 w-6 text-brand-primary" />
            What Would You Like To Do?
          </motion.h2>
          
          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4"
          >
            {quickActions.map((action, i) => (
              <motion.div
                key={i}
                variants={scaleUp}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
              >
                <Link
                  href={action.href}
                  className="group bg-white border border-slate-200 rounded-sm p-5 hover:border-brand-primary hover:shadow-md transition-all flex flex-col items-center text-center gap-3"
                >
                  <div className={`h-12 w-12 rounded-full ${action.bg} flex items-center justify-center transition-transform group-hover:scale-110`}>
                    <action.icon className={`h-6 w-6 ${action.color}`} />
                  </div>
                  <span className="text-sm font-bold text-slate-700 group-hover:text-brand-primary">{action.title}</span>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Infrastructure Alerts */}
      {alertActive && (
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeInUp}
          className="mx-auto max-w-7xl px-5 py-12 lg:px-10"
        >
          <motion.div 
            variants={fadeInUp}
            className="bg-[#CE1126]/5 border border-[#CE1126]/20 rounded-sm p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
          >
            <div className="flex items-start gap-4">
              <motion.div 
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="h-10 w-10 shrink-0 bg-[#CE1126] text-white flex items-center justify-center rounded-sm"
              >
                <AlertTriangle className="h-6 w-6" />
              </motion.div>
              <div>
                <h3 className="text-lg font-bold text-slate-900">{alertTitle}</h3>
                <p className="text-slate-700 mt-1">{alertDescription}</p>
              </div>
            </div>
            <Link href={alertLink} className="shrink-0 text-sm font-bold text-[#CE1126] hover:underline whitespace-nowrap">
              View Details &rarr;
            </Link>
          </motion.div>
        </motion.section>
      )}

      {/* National Impact Section */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="mx-auto max-w-7xl px-5 py-16 lg:px-10"
      >
        <motion.div variants={fadeInUp} className="mb-12">
          <p className="mb-2 text-sm font-black uppercase tracking-[0.1em] text-slate-500">National Impact</p>
          <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 md:text-4xl">
            Coordinating at a National Scale.
          </h2>
        </motion.div>

        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4"
        >
          {stats.map((stat, i) => (
            <motion.div 
              key={i} 
              variants={scaleUp}
              whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
              className="bg-slate-900 border border-slate-800 rounded-sm p-6 text-center"
            >
              <motion.p 
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 * i, duration: 0.5 }}
                className="text-3xl font-black text-white"
              >
                {stat.number}
              </motion.p>
              <p className="mt-2 text-xs font-bold uppercase tracking-wider text-slate-400">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.section>

      {/* Stakeholder Ecosystem */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeInUp}
        className="bg-slate-100 border-y border-slate-200 px-5 py-24 lg:px-10 overflow-hidden"
      >
        <div className="mx-auto max-w-7xl">
          <motion.div variants={fadeInUp} className="text-center mb-16 max-w-3xl mx-auto">
            <p className="mb-2 text-sm font-black uppercase tracking-[0.1em] text-brand-primary">Stakeholder Ecosystem</p>
            <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 md:text-4xl">
              Bringing the nation&apos;s infrastructure operators together.
            </h2>
          </motion.div>
          
          <div className="relative max-w-4xl mx-auto aspect-[16/9] md:aspect-[21/9]">
            {/* Center Node */}
            <motion.div 
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center"
            >
              <div className="h-24 w-24 bg-white border-4 border-brand-primary rounded-full shadow-2xl flex items-center justify-center p-2 z-20">
                <Image src="/NECT.jpeg" alt="NECT" width={60} height={30} className="object-contain" />
              </div>
              <motion.div 
                animate={{ scale: [1, 1.5, 1] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute h-32 w-32 bg-brand-primary/10 rounded-full -z-10"
              ></motion.div>
            </motion.div>

            {/* Connecting lines SVG */}
            <svg className="absolute inset-0 h-full w-full" style={{ zIndex: 0 }}>
              {stakeholders.map((_, i) => (
                <motion.line
                  key={`line-${i}`}
                  initial={{ opacity: 0, pathLength: 0 }}
                  whileInView={{ opacity: 1, pathLength: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.1, duration: 0.8 }}
                  x1="50%" 
                  y1="50%" 
                  x2={_.left} 
                  y2={_.top}
                  stroke="#cbd5e1" 
                  strokeWidth="2" 
                  strokeDasharray="5,5"
                />
              ))}
            </svg>

            {/* Surrounding Nodes */}
            {stakeholders.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 + i * 0.1, type: "spring", stiffness: 200 }}
                whileHover={{ scale: 1.1 }}
                className="absolute -translate-x-1/2 -translate-y-1/2 bg-white border border-slate-200 px-4 py-2 rounded-sm shadow-sm font-bold text-sm text-slate-700 z-10"
                style={{ top: item.top, left: item.left }}
              >
                {item.label}
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* News & Media Centre */}
      <motion.section
        initial={false}
        animate="visible"
        variants={fadeInUp}
        className="mx-auto max-w-7xl px-5 py-24 lg:px-10"
      >
        <motion.div variants={fadeInUp} className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <p className="mb-2 text-sm font-black uppercase tracking-[0.1em] text-slate-500">News & Media Centre</p>
            <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 md:text-4xl">
              Latest Updates & Press Releases.
            </h2>
          </div>
          <Link href="/news" className="text-sm font-bold text-brand-primary hover:underline">
            View All News &rarr;
          </Link>
        </motion.div>

        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="grid gap-8 md:grid-cols-3"
        >
          {newsArticles && newsArticles.length > 0 ? (
            newsArticles.map((article) => (
              <motion.div
                key={article.id}
                variants={fadeInUp}
                whileHover={{ y: -8, transition: { duration: 0.2 } }}
              >
                  <Link href={`/news/${article.id}-${encodeURIComponent(slugify(article.title))}`} className="group flex flex-col bg-white border border-slate-200 rounded-sm overflow-hidden hover:border-brand-primary hover:shadow-lg transition-all">
                  {article.image_url ? (
                    <div className="h-48 relative overflow-hidden bg-slate-100">
                      <Image 
                        src={article.image_url} 
                        alt={article.title}
                        fill 
                        sizes="(max-width: 768px) 100vw, 33vw" 
                        className="object-cover transition-transform duration-500 group-hover:scale-105" 
                      />
                    </div>
                  ) : (
                    <div className="h-48 bg-slate-100 flex items-center justify-center">
                      <Newspaper className="h-8 w-8 text-slate-300" />
                    </div>
                  )}
                  <div className="p-6 flex-1 flex flex-col">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-xs font-bold uppercase tracking-wider text-brand-primary">{article.category}</span>
                      <span className="text-xs text-slate-500">• {new Date(article.created_at).toLocaleDateString()}</span>
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-brand-primary transition-colors">{article.title}</h3>
                    <p className="text-slate-600 text-sm line-clamp-3 mb-4 flex-1">{article.excerpt}</p>
                    <motion.span 
                      whileHover={{ x: 4 }}
                      className="text-sm font-bold text-brand-primary mt-auto"
                    >
                      Read more &rarr;
                    </motion.span>
                  </div>
                </Link>
              </motion.div>
            ))
          ) : (
            <div className="col-span-3 text-center py-12 border border-dashed border-slate-300 rounded-sm">
              <p className="text-slate-500">No recent news available.</p>
            </div>
          )}
        </motion.div>
      </motion.section>

      <Footer />
    </main>
  );
}