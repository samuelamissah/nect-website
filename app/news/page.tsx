"use client";

import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import { Calendar, ArrowRight, Rss, Loader2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { supabase } from "@/app/lib/supabase";
import { motion, Variants } from "framer-motion";

/* eslint-disable @typescript-eslint/no-explicit-any */

// Animation variants
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
};

const fadeInLeft: Variants = {
  hidden: { opacity: 0, x: -40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const fadeInRight: Variants = {
  hidden: { opacity: 0, x: 40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } }
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

export default function NewsPage() {
  const [news, setNews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchNews() {
      const { data } = await supabase
        .from("news")
        .select("*")
        .order("created_at", { ascending: false });
      
      if (data) setNews(data);
      setLoading(false);
    }
    fetchNews();
  }, []);

  const featuredPost = news.find(n => n.featured) || news[0];
  const regularPosts = news.filter(n => n.id !== featuredPost?.id);

  return (
    <main className="min-h-screen bg-slate-50 flex flex-col overflow-x-hidden">
      <Header />
      
      <motion.section 
        initial="hidden"
        animate="visible"
        className="bg-white border-b border-slate-200"
      >
        <div className="mx-auto max-w-7xl px-5 py-16 lg:px-10 lg:py-24">
          <motion.div 
            variants={fadeInLeft}
            className="flex flex-col md:flex-row md:items-end justify-between gap-8"
          >
            <div className="max-w-2xl">
              <motion.div 
                variants={fadeInUp}
                className="inline-flex items-center gap-2 rounded-full bg-brand-primary/10 px-3 py-1 text-xs font-semibold text-brand-primary mb-4"
              >
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-brand-primary"></span>
                </span>
                NECT NEWSROOM
              </motion.div>
              
              <motion.h1 
                variants={fadeInUp}
                className="text-4xl font-extrabold tracking-tight text-slate-900 md:text-5xl"
              >
                News & Press Releases
              </motion.h1>
              
              <motion.p 
                variants={fadeInUp}
                className="mt-6 text-lg leading-relaxed text-slate-600"
              >
                Stay updated with the latest operational interventions, policy guidelines, and infrastructure protection exercises coordinated by NECT.
              </motion.p>
            </div>
            
            <motion.button 
              variants={fadeInRight}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 text-brand-primary font-bold hover:text-brand-primary/80 transition-colors"
            >
              <Rss className="h-5 w-5" />
              Subscribe to RSS
            </motion.button>
          </motion.div>
        </div>
      </motion.section>

      <section className="mx-auto max-w-7xl px-5 py-16 lg:px-10 lg:py-24 w-full flex-1">
        {loading ? (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-20"
          >
            <Loader2 className="h-10 w-10 animate-spin text-brand-primary mb-4" />
            <p className="text-slate-500 font-medium">Loading latest news...</p>
          </motion.div>
        ) : news.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-20 border-2 border-dashed border-slate-200 rounded-2xl bg-white"
          >
            <p className="text-slate-500 text-lg">No news articles published yet.</p>
          </motion.div>
        ) : (
          <>
            {featuredPost && (
              <motion.div 
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                whileHover={{ y: -4 }}
                className="mb-16 rounded-[2rem] overflow-hidden border border-slate-200 bg-white shadow-xl shadow-slate-200/50 flex flex-col lg:flex-row"
              >
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 }}
                  className="lg:w-1/2 bg-slate-100 relative min-h-[300px]"
                >
                  {featuredPost.image_url ? (
                    <Image src={featuredPost.image_url} alt="" fill className="object-cover" />
                  ) : (
                    <div className="absolute inset-0 bg-slate-800 flex items-center justify-center">
                      <div className="text-slate-600 font-mono text-sm uppercase tracking-widest border border-slate-700 p-4 rounded-sm">Featured Image Placeholder</div>
                    </div>
                  )}
                </motion.div>
                
                <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                  className="lg:w-1/2 p-8 md:p-12 lg:p-16 flex flex-col justify-center"
                >
                  <div className="flex items-center gap-4 mb-6">
                    <span className="inline-flex items-center rounded-sm bg-[#CE1126]/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-[#CE1126]">
                      {featuredPost.category || 'Update'}
                    </span>
                    <span className="flex items-center gap-1.5 text-sm font-medium text-slate-500">
                      <Calendar className="h-4 w-4" />
                      {new Date(featuredPost.created_at).toLocaleDateString()}
                    </span>
                  </div>
                  
                  <h2 className="text-3xl font-bold text-slate-900 mb-6 leading-tight">
                    {featuredPost.title}
                  </h2>
                  
                  <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                    {featuredPost.excerpt}
                  </p>
                  
                  <motion.div whileHover={{ x: 4 }}>
                    <Link href={`/news/${featuredPost.id}`} className="inline-flex items-center gap-2 text-brand-primary font-bold hover:gap-3 transition-all">
                      Read Full Release <ArrowRight className="h-4 w-4" />
                    </Link>
                  </motion.div>
                </motion.div>
              </motion.div>
            )}

            {regularPosts.length > 0 && (
              <motion.div 
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
                className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
              >
                {regularPosts.map((post) => (
                  <motion.div 
                    key={post.id} 
                    variants={fadeInUp}
                    whileHover={{ 
                      y: -8,
                      boxShadow: "0 20px 25px -5px rgba(0,0,0,0.08), 0 10px 10px -5px rgba(0,0,0,0.02)"
                    }}
                    className="group flex flex-col rounded-2xl border border-slate-200 bg-white shadow-sm transition-all hover:border-brand-primary/30 hover:shadow-lg overflow-hidden relative"
                  >
                    {post.image_url && (
                      <motion.div 
                        whileHover={{ scale: 1.03 }}
                        className="relative w-full h-48 bg-slate-100 overflow-hidden"
                      >
                        <Image src={post.image_url} alt="" fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
                      </motion.div>
                    )}
                    
                    <div className="p-8 flex flex-col flex-1">
                      <div className="flex items-center gap-3 mb-6">
                        <span className="inline-flex items-center rounded-sm bg-slate-100 px-2.5 py-1 text-xs font-bold uppercase tracking-wider text-slate-600">
                          {post.category || 'Update'}
                        </span>
                        <span className="flex items-center gap-1.5 text-xs font-medium text-slate-500">
                          <Calendar className="h-3 w-3" />
                          {new Date(post.created_at).toLocaleDateString()}
                        </span>
                      </div>
                      
                      <h3 className="text-xl font-bold text-slate-900 mb-4 group-hover:text-brand-primary transition-colors">
                        <Link href={`/news/${post.id}`} className="focus:outline-none">
                          <span className="absolute inset-0" aria-hidden="true" />
                          {post.title}
                        </Link>
                      </h3>
                      
                      <p className="text-slate-600 mb-8 flex-1 line-clamp-3 relative z-10">
                        {post.excerpt}
                      </p>
                      
                      <motion.div 
                        whileHover={{ x: 4 }}
                        className="mt-auto flex items-center gap-2 text-sm font-bold text-brand-primary relative z-10"
                      >
                        Read more <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </motion.div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
            
            {regularPosts.length > 0 && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mt-16 flex justify-center"
              >
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="rounded-sm border-2 border-slate-200 bg-white px-8 py-3 text-sm font-bold text-slate-900 transition-colors hover:border-slate-300 hover:bg-slate-50"
                >
                  Load Older Press Releases
                </motion.button>
              </motion.div>
            )}
          </>
        )}
      </section>

      <Footer />
    </main>
  );
}