"use client";

import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import { Calendar, ArrowRight, Rss, Loader2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { supabase } from "@/app/lib/supabase";

/* eslint-disable @typescript-eslint/no-explicit-any */

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
    <main className="min-h-screen bg-slate-50 flex flex-col">
      <Header />
      
      <section className="bg-white border-b border-slate-200">
        <div className="mx-auto max-w-7xl px-5 py-16 lg:px-10 lg:py-24">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="max-w-2xl">
              <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 md:text-5xl">
                News & Press Releases
              </h1>
              <p className="mt-6 text-lg leading-relaxed text-slate-600">
                Stay updated with the latest operational interventions, policy guidelines, and infrastructure protection exercises coordinated by NECT.
              </p>
            </div>
            <button className="inline-flex items-center gap-2 text-brand-primary font-bold hover:text-brand-primary/80 transition-colors">
              <Rss className="h-5 w-5" />
              Subscribe to RSS
            </button>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16 lg:px-10 lg:py-24 w-full flex-1">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="h-10 w-10 animate-spin text-brand-primary mb-4" />
            <p className="text-slate-500 font-medium">Loading latest news...</p>
          </div>
        ) : news.length === 0 ? (
          <div className="text-center py-20 border-2 border-dashed border-slate-200 rounded-2xl bg-white">
            <p className="text-slate-500 text-lg">No news articles published yet.</p>
          </div>
        ) : (
          <>
            {featuredPost && (
              <div className="mb-16 rounded-[2rem] overflow-hidden border border-slate-200 bg-white shadow-xl shadow-slate-200/50 flex flex-col lg:flex-row">
                <div className="lg:w-1/2 bg-slate-100 relative min-h-[300px]">
                   {featuredPost.image_url ? (
                     <Image src={featuredPost.image_url} alt="" fill className="object-cover" />
                   ) : (
                     <div className="absolute inset-0 bg-slate-800 flex items-center justify-center">
                       <div className="text-slate-600 font-mono text-sm uppercase tracking-widest border border-slate-700 p-4 rounded-sm">Featured Image Placeholder</div>
                     </div>
                   )}
                </div>
                <div className="lg:w-1/2 p-8 md:p-12 lg:p-16 flex flex-col justify-center">
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
                  <Link href={`/news/${featuredPost.id}`} className="inline-flex items-center gap-2 text-brand-primary font-bold hover:gap-3 transition-all">
                    Read Full Release <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            )}

            {regularPosts.length > 0 && (
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {regularPosts.map((post) => (
                  <div key={post.id} className="group flex flex-col rounded-2xl border border-slate-200 bg-white shadow-sm transition-all hover:border-brand-primary/30 hover:shadow-lg overflow-hidden relative">
                    {post.image_url && (
                      <div className="relative w-full h-48 bg-slate-100">
                        <Image src={post.image_url} alt="" fill className="object-cover" />
                      </div>
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
                      <div className="mt-auto flex items-center gap-2 text-sm font-bold text-brand-primary relative z-10">
                        Read more <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
            
            {regularPosts.length > 0 && (
              <div className="mt-16 flex justify-center">
                <button className="rounded-sm border-2 border-slate-200 bg-white px-8 py-3 text-sm font-bold text-slate-900 transition-colors hover:border-slate-300 hover:bg-slate-50">
                  Load Older Press Releases
                </button>
              </div>
            )}
          </>
        )}
      </section>

      <Footer />
    </main>
  );
}