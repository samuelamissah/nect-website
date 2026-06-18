"use client";

import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import { Calendar, ArrowLeft, Loader2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState, use } from "react";
import { supabase } from "@/app/lib/supabase";

/* eslint-disable @typescript-eslint/no-explicit-any */

export default function ArticlePage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const [article, setArticle] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchArticle() {
      const { data } = await supabase
        .from("news")
        .select("*")
        .eq("id", resolvedParams.id)
        .single();
      
      if (data) setArticle(data);
      setLoading(false);
    }
    fetchArticle();
  }, [resolvedParams.id]);

  if (loading) {
    return (
      <main className="min-h-screen bg-slate-50 flex flex-col">
        <Header />
        <div className="flex-1 flex flex-col items-center justify-center py-20">
          <Loader2 className="h-10 w-10 animate-spin text-brand-primary mb-4" />
          <p className="text-slate-500 font-medium">Loading article...</p>
        </div>
        <Footer />
      </main>
    );
  }

  if (!article) {
    return (
      <main className="min-h-screen bg-slate-50 flex flex-col">
        <Header />
        <div className="flex-1 flex flex-col items-center justify-center py-20">
          <h1 className="text-2xl font-bold text-slate-900 mb-4">Article Not Found</h1>
          <Link href="/news" className="text-brand-primary hover:underline">
            &larr; Back to News
          </Link>
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 flex flex-col">
      <Header />
      
      <article className="flex-1 py-12 lg:py-20">
        <div className="mx-auto max-w-4xl px-5">
          <Link href="/news" className="inline-flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-brand-primary transition-colors mb-10">
            <ArrowLeft className="h-4 w-4" /> Back to News Room
          </Link>
          
          <header className="mb-10">
            <div className="flex items-center gap-4 mb-6">
              <span className="inline-flex items-center rounded-sm bg-brand-primary/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-brand-primary">
                {article.category || 'Update'}
              </span>
              <span className="flex items-center gap-1.5 text-sm font-medium text-slate-500">
                <Calendar className="h-4 w-4" />
                {new Date(article.created_at).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
              </span>
            </div>
            
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-slate-900 leading-tight mb-6">
              {article.title}
            </h1>
            
            <p className="text-xl text-slate-600 leading-relaxed font-medium">
              {article.excerpt}
            </p>
          </header>
          
          {article.image_url && (
            <div className="relative w-full aspect-[16/9] mb-12 rounded-2xl overflow-hidden shadow-lg border border-slate-200">
              <Image src={article.image_url} alt={article.title} fill className="object-cover" />
            </div>
          )}
          
          <div className="prose prose-lg prose-slate max-w-none bg-white p-8 md:p-12 rounded-2xl border border-slate-200 shadow-sm whitespace-pre-wrap">
            {article.content}
          </div>
          
          <div className="mt-12 pt-8 border-t border-slate-200 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-brand-primary text-white flex items-center justify-center font-bold">
                {article.author ? article.author.charAt(0) : 'A'}
              </div>
              <div>
                <p className="text-sm font-bold text-slate-900">Published by {article.author || 'Admin'}</p>
                <p className="text-xs text-slate-500">National Engineering Coordinating Team</p>
              </div>
            </div>
          </div>
        </div>
      </article>

      <Footer />
    </main>
  );
}