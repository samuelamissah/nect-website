import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import { Calendar, ArrowLeft, Bookmark } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { notFound, redirect } from "next/navigation";
import { supabaseAdmin } from "@/app/lib/supabaseAdmin";
import { slugify } from "@/app/lib/slugify";
import ShareArticle from "@/app/components/ShareArticle";

function resolveArticleId(rawId: string) {
  const uuidMatch = String(rawId || "").match(
    /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}/
  );

  if (uuidMatch) return uuidMatch[0];
  if (rawId && rawId.includes("-")) return rawId.split("-")[0];
  return rawId;
}

export async function generateMetadata({ params }: { params: { id: string } }) {
  const id = resolveArticleId(params.id);

  const { data: article } = await supabaseAdmin
    .from("news")
    .select("*")
    .eq("id", id)
    .single();

  if (!article) {
    return {
      title: "News | NECT",
      description: "News from NECT",
    };
  }

  const canonicalSlug = article.slug || slugify(article.title || "");
  const canonicalPath = `/news/${id}-${encodeURIComponent(canonicalSlug)}`;

  const pageUrl = new URL(
    canonicalPath,
    process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"
  ).toString();

  const ogImageUrl =
    article.og_image_url ||
    article.image_url ||
    new URL(`/news/${id}/opengraph-image`, process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000").toString();

  return {
    title: `${article.title} | NECT`,
    description: article.excerpt || "News from NECT",
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      type: "article",
      title: article.title,
      description: article.excerpt || "",
      url: pageUrl,
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: article.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.excerpt || "",
      images: [ogImageUrl],
    },
  };
}

export default async function ArticlePage({ params }: { params: { id: string } }) {
  const rawId = params.id;
  const id = resolveArticleId(rawId);

  const { data: article, error: articleError } = await supabaseAdmin
    .from("news")
    .select("*")
    .eq("id", id)
    .single();

  if (articleError || !article) {
    return notFound();
  }

  const canonicalSlug = article.slug || slugify(article.title || "");
  const canonicalPath = `/news/${id}-${encodeURIComponent(canonicalSlug)}`;

  if (rawId !== `${id}-${encodeURIComponent(canonicalSlug)}`) {
    redirect(canonicalPath);
  }

  const { data: popularNews = [] } = await supabaseAdmin
    .from("news")
    .select("id, title, created_at, category, image_url")
    .neq("id", id)
    .order("created_at", { ascending: false })
    .limit(8);

  const pageUrl = new URL(
    canonicalPath,
    process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"
  ).toString();

  return (
    <main className="min-h-screen bg-slate-50 flex flex-col overflow-x-hidden">
      <Header />

      

      <Footer />
    </main>
  );
}