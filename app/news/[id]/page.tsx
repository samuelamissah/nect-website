"use client";

import { useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";
import { motion, Variants } from "framer-motion";
import { supabase } from "@/app/lib/supabase";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import { Calendar, ArrowLeft, Bookmark, Loader2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { notFound, redirect } from "next/navigation";
import { slugify } from "@/app/lib/slugify";
import Head from "next/head";
import ShareArticle from '@/app/components/ShareArticle';

/* eslint-disable @typescript-eslint/no-explicit-any */

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const fadeInLeft: Variants = {
  hidden: { opacity: 0, x: -30 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export default function ArticlePage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);

  // params.id may be either the raw id (UUID) or id+slug ("<uuid>-some-title").
  const rawId = resolvedParams.id;
  let id = rawId;
  // If the param contains more than a UUID (UUIDs contain hyphens), try to extract a leading UUID.
  const uuidMatch = String(rawId || '').match(/^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}/);
  if (uuidMatch) {
    id = uuidMatch[0];
  } else if (rawId && rawId.includes('-')) {
    // Fallback for numeric ids or other formats: take prefix before first hyphen
    id = rawId.split('-')[0];
  }

  const [article, setArticle] = useState<any | null>(null);
  const [popularNews, setPopularNews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchArticle() {
      setLoading(true);

      const { data: articleData } = await supabase
        .from("news")
        .select("*")
        .eq("id", id)
        .single();

      if (articleData) setArticle(articleData);

      const { data: popularData } = await supabase
        .from("news")
        .select("id, title, created_at, category, image_url")
        .neq("id", id)
        .order("created_at", { ascending: false })
        .limit(8);

      setPopularNews(popularData || []);
      setLoading(false);
    }

    fetchArticle();
  }, [resolvedParams.id]);

  const router = useRouter();

  // Redirect to canonical URL (id + slug) if the slug part doesn't match the article.slug
  useEffect(() => {
    if (!loading && article && article.slug) {
      const param = String(resolvedParams.id || '');
      let slugPart = '';
      if (param.startsWith(id + '-')) {
        slugPart = param.slice(id.length + 1);
      } else if (param.includes('-')) {
        // fallback: everything after the first hyphen(s)
        const parts = param.split('-');
        parts.shift();
        slugPart = parts.join('-');
      }
      try { slugPart = decodeURIComponent(slugPart); } catch (e) {}

      if (article.slug && slugPart !== article.slug) {
        router.replace(`/news/${id}-${encodeURIComponent(article.slug)}`);
      }
    }
  }, [loading, article, id, resolvedParams.id, router]);

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
    <main className="min-h-screen bg-slate-50 flex flex-col overflow-x-hidden">
      <Head>
        <title>{article?.title ? `${article.title} | NECT` : 'News | NECT'}</title>
        <meta name="description" content={article?.excerpt || 'News from NECT'} />
        <link rel="canonical" href={`/news/${id}-${encodeURIComponent(article?.slug || '')}`} />

        {/* Open Graph */}
        <meta property="og:type" content="article" />
        <meta property="og:title" content={article?.title || 'NECT News'} />
        <meta property="og:description" content={article?.excerpt || ''} />
        {(article?.og_image_url || article?.image_url) && (
          <meta property="og:image" content={article.og_image_url || article.image_url} />
        )}

        {/* JSON-LD structured data for article */}
        {article && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "NewsArticle",
              "headline": article.title,
              "image": article.og_image_url || article.image_url ? [article.og_image_url || article.image_url] : undefined,
              "datePublished": article.created_at,
              "author": {
                "@type": "Organization",
                "name": "National Engineering Coordinating Team"
              },
              "description": article.excerpt
            }) }}
          />
        )}
      </Head>
      <Header />

      <motion.article initial="hidden" animate="visible" className="flex-1 py-8 lg:py-12">
        <div className="mx-auto max-w-7xl px-4 lg:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-8">
            
            <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
              <div className="p-6 md:p-10">
                <motion.div variants={fadeInLeft}>
                  <Link
                    href="/news"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-brand-primary mb-6"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    Back to News
                  </Link>
                </motion.div>

                <motion.div variants={fadeInUp} className="flex flex-wrap items-center gap-3 mb-5">
                  <span className="rounded bg-brand-primary/10 px-3 py-1 text-xs font-bold uppercase text-brand-primary">
                    {article.category || "Update"}
                  </span>

                  <span className="flex items-center gap-1.5 text-sm text-slate-500">
                    <Calendar className="h-4 w-4" />
                    {new Date(article.created_at).toLocaleDateString(undefined, {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                </motion.div>

                <motion.h1
                  variants={fadeInUp}
                  className="text-3xl md:text-5xl font-extrabold text-slate-950 leading-tight mb-5"
                >
                  {article.title}
                </motion.h1>

                {article.excerpt && (
                  <motion.p variants={fadeInUp} className="text-lg md:text-xl text-slate-600 leading-relaxed mb-6">
                    {article.excerpt}
                  </motion.p>
                )}

                <div className="flex items-center justify-between border-y border-slate-200 py-4 mb-8">
                  <div>
                    <p className="text-sm font-bold text-slate-900">
                      By {article.author || "Admin"}
                    </p>
                    <p className="text-xs text-slate-500">
                      National Engineering Coordinating Team
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="hidden md:block">
                      <ShareArticle url={typeof window !== 'undefined' ? window.location.href : `/news/${id}-${encodeURIComponent(article.slug)}`} title={article.title} />
                    </div>
                    <button title="Bookmark" className="h-9 w-9 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center">
                      <Bookmark className="h-4 w-4 text-slate-600" />
                    </button>
                  </div>
                </div>

                {article.image_url && (
                  <div className="relative w-full aspect-[16/9] mb-8 rounded-lg overflow-hidden border border-slate-200">
                    <Image
                      src={article.image_url}
                      alt={article.title}
                      fill
                      className="object-cover"
                      priority
                    />
                  </div>
                )}

                <div className="prose prose-lg prose-slate max-w-none whitespace-pre-wrap leading-8"
                  dangerouslySetInnerHTML={{ __html: article.content }}
                />
              </div>
            </div>

            <aside className="space-y-6">
              <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-5 sticky top-24">
                <h3 className="text-lg font-extrabold text-slate-900 border-l-4 border-brand-primary pl-3 mb-4">
                  Most Popular
                </h3>

                {popularNews.length > 0 ? (
                  <div className="space-y-4">
                    {popularNews.map((item) => (
                      <Link
                          key={item.id}
                          href={`/news/${item.id}-${encodeURIComponent(slugify(item.title))}`}
                          className="block border-b border-slate-100 pb-4 last:border-b-0 last:pb-0 group"
                        >
                        <p className="text-sm font-bold text-slate-800 group-hover:text-brand-primary leading-snug line-clamp-2">
                          {item.title}
                        </p>

                        <div className="mt-2 flex items-center gap-2 text-xs text-slate-500">
                          <Calendar className="h-3 w-3" />
                          {new Date(item.created_at).toLocaleDateString(undefined, {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })}
                        </div>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-slate-500">No other news available.</p>
                )}
              </div>

              <div className="bg-brand-primary text-white rounded-xl p-6 shadow-sm">
                <h3 className="text-lg font-extrabold mb-2">Stay Updated</h3>
                <p className="text-sm text-white/80 mb-4">
                  Get the latest news and updates from our newsroom.
                </p>
                <Link
                  href="/news"
                  className="inline-flex rounded-md bg-white px-4 py-2 text-sm font-bold text-brand-primary"
                >
                  View More News
                </Link>
              </div>
            </aside>

          </div>
        </div>
      </motion.article>

      <Footer />
    </main>
  );
}