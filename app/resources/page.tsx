"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/app/lib/supabase";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import { Search, FileText, Download, Loader2, Filter } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 }
  }
};

/* eslint-disable @typescript-eslint/no-explicit-any */

export default function ResourceCentrePage() {
  const [resources, setResources] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [downloading, setDownloading] = useState<string | null>(null);

  const categories = [
    "All",
    "Guidelines",
    "Policies",
    "Technical Documents",
    "Circulars",
    "Reports",
    "Publications",
  ];

  useEffect(() => {
    async function fetchResources() {
      setLoading(true);
      const { data } = await supabase
        .from("resources")
        .select("*")
        .order("created_at", { ascending: false });

      if (data) {
        setResources(data);
      }
      setLoading(false);
    }
    fetchResources();
  }, []);

  const filteredResources = resources.filter((resource) => {
    const matchesSearch =
      resource.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.description?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      activeCategory === "All" || resource.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const handleDownload = async (resource: any) => {
    try {
      setDownloading(resource.id);
      
      let fileUrl = '';
      const fileName = resource.title || 'document';
      
      // Get the file extension from file_type or file_url
      const fileExt = resource.file_type || resource.file_url?.split('.').pop() || 'pdf';
      const fullFileName = `${fileName}.${fileExt}`;

      if (resource.file_url) {
        fileUrl = resource.file_url;
      } else if (resource.file_path) {
        const { data } = supabase.storage
          .from('resources')
          .getPublicUrl(resource.file_path);
        
        if (data?.publicUrl) {
          fileUrl = data.publicUrl;
        }
      }

      if (!fileUrl) {
        console.error('No file URL found');
        return;
      }

      const response = await fetch(fileUrl);
      if (!response.ok) throw new Error('Download failed');
      
      const blob = await response.blob();
      
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = fullFileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      setTimeout(() => URL.revokeObjectURL(link.href), 1000);
      
    } catch (error) {
      console.error('Download error:', error);
      if (resource.file_url) {
        window.open(resource.file_url, '_blank');
      }
    } finally {
      setDownloading(null);
    }
  };

  return (
    <main className="min-h-screen bg-slate-50">
      <Header />
      
      {/* Hero Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-20 px-6 text-center"
      >
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay"></div>
        <div className="absolute top-0 right-0 -mr-20 -mt-20 h-96 w-96 rounded-full bg-brand-primary/20 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 h-96 w-96 rounded-full bg-blue-500/10 blur-3xl"></div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="mx-auto max-w-4xl relative z-10"
        >
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.4 }}
            className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-semibold text-white border border-white/20 mb-6"
          >
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-400"></span>
            </span>
            NECT RESOURCE CENTRE
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="text-4xl font-extrabold tracking-tight text-white md:text-5xl mb-6"
          >
            Resource Centre
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="text-lg text-slate-300 max-w-2xl mx-auto"
          >
            Access official guidelines, policies, technical documents, and reports 
            issued by the National Engineering Coordinating Team.
          </motion.p>
        </motion.div>
      </motion.section>

      {/* Main Content */}
      <section className="py-16 px-6 lg:px-12 max-w-7xl mx-auto">
        
        {/* Search & Filter Bar */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="flex flex-col md:flex-row gap-4 mb-10 items-center justify-between bg-white p-4 rounded-2xl shadow-sm border border-slate-200"
        >
          <div className="relative w-full md:max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search resources..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-xl border-none bg-slate-50 focus:ring-2 focus:ring-brand-primary outline-none transition-all"
            />
          </div>
          
          <div className="flex gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 hide-scrollbar">
            <div className="flex items-center gap-2 px-2">
              <Filter className="h-4 w-4 text-slate-400 shrink-0" />
            </div>
            {categories.map((category) => (
              <motion.button
                key={category}
                onClick={() => setActiveCategory(category)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`whitespace-nowrap px-4 py-2 rounded-lg text-sm font-bold transition-all ${
                  activeCategory === category
                    ? "bg-brand-primary text-white shadow-md"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {category}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Resources Grid */}
        {loading ? (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-center items-center py-20"
          >
            <Loader2 className="h-10 w-10 animate-spin text-brand-primary" />
          </motion.div>
        ) : filteredResources.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="text-center py-20 bg-white rounded-3xl border border-slate-200"
          >
            <FileText className="h-12 w-12 text-slate-300 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-slate-900 mb-2">No resources found</h3>
            <p className="text-slate-500">
              Try adjusting your search query or selected category.
            </p>
          </motion.div>
        ) : (
          <>
            <motion.div 
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
            >
              {filteredResources.map((resource) => (
                <motion.div
                  key={resource.id}
                  variants={fadeInUp}
                  whileHover={{ 
                    y: -8,
                    boxShadow: "0 20px 25px -5px rgba(0,0,0,0.08), 0 10px 10px -5px rgba(0,0,0,0.02)"
                  }}
                  className="group flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:border-brand-primary/30 transition-all"
                >
                  <div>
                    <div className="flex justify-between items-start mb-4">
                      <motion.span 
                        whileHover={{ scale: 1.05 }}
                        className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-700 uppercase tracking-wider"
                      >
                        {resource.category || 'General'}
                      </motion.span>
                      <span className="text-xs font-bold text-slate-400 bg-slate-50 px-2 py-1 rounded">
                        {resource.file_type || 'PDF'}
                      </span>
                    </div>
                    
                    <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-brand-primary transition-colors line-clamp-2">
                      {resource.title || 'Untitled'}
                    </h3>
                    <p className="text-slate-600 text-sm line-clamp-3 mb-4">
                      {resource.description || 'No description available'}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                    <div className="text-xs text-slate-500">
                      <span className="font-semibold">{resource.file_size || '2.4 MB'}</span>
                      <span className="mx-2">•</span>
                      <span>{resource.created_at ? new Date(resource.created_at).toLocaleDateString() : 'N/A'}</span>
                    </div>
                    <motion.button
                      onClick={() => handleDownload(resource)}
                      disabled={downloading === resource.id}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="flex items-center justify-center h-10 w-10 rounded-full bg-slate-100 text-brand-primary hover:bg-brand-primary hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      title={`Download ${resource.title || 'document'}`}
                    >
                      {downloading === resource.id ? (
                        <Loader2 className="h-5 w-5 animate-spin" />
                      ) : (
                        <Download className="h-5 w-5" />
                      )}
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Stats Footer */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-12 text-center text-sm text-slate-400"
            >
              Showing {filteredResources.length} of {resources.length} resources
            </motion.div>
          </>
        )}
      </section>
      
      <Footer />
    </main>
  );
}