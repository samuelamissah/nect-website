"use client";

import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import { Loader2, PlayCircle, Calendar } from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "@/app/lib/supabase";

/* eslint-disable @typescript-eslint/no-explicit-any */

export default function VideosPage() {
  const [videos, setVideos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchVideos() {
      const { data } = await supabase
        .from("videos")
        .select("*")
        .order("created_at", { ascending: false });
      
      if (data) setVideos(data);
      setLoading(false);
    }
    fetchVideos();
  }, []);

  // Helper to extract YouTube ID and embed URL
  const getEmbedUrl = (url: string) => {
    if (!url) return "";
    let videoId = "";
    if (url.includes("youtube.com/watch?v=")) {
      videoId = url.split("v=")[1].split("&")[0];
    } else if (url.includes("youtu.be/")) {
      videoId = url.split("youtu.be/")[1].split("?")[0];
    }
    return videoId ? `https://www.youtube.com/embed/${videoId}` : url;
  };

  return (
    <main className="min-h-screen bg-slate-50 flex flex-col">
      <Header />
      
      <section className="bg-slate-900 border-b border-slate-800">
        <div className="mx-auto max-w-7xl px-5 py-16 lg:px-10 lg:py-24">
          <div className="max-w-2xl">
            <span className="mb-4 inline-flex items-center rounded-sm bg-brand-primary/20 px-4 py-1.5 text-sm font-bold uppercase tracking-wider text-brand-primary border border-brand-primary/30">
              Media Center
            </span>
            <h1 className="text-4xl font-extrabold tracking-tight text-white md:text-5xl">
              Video Resources
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-slate-300">
              Watch official broadcasts, operational documentaries, and public service announcements from NECT.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16 lg:px-10 lg:py-24 w-full flex-1">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="h-10 w-10 animate-spin text-brand-primary mb-4" />
            <p className="text-slate-500 font-medium">Loading videos...</p>
          </div>
        ) : videos.length === 0 ? (
          <div className="text-center py-20 border-2 border-dashed border-slate-300 rounded-2xl bg-white">
            <PlayCircle className="h-16 w-16 text-slate-300 mx-auto mb-4" />
            <p className="text-slate-500 text-lg">No videos have been published yet.</p>
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {videos.map((video) => (
              <div key={video.id} className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
                <div className="aspect-video w-full bg-slate-100 relative">
                  <iframe 
                    src={getEmbedUrl(video.video_url)} 
                    title={video.title}
                    className="w-full h-full absolute inset-0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowFullScreen
                  ></iframe>
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="inline-flex items-center rounded-sm bg-slate-100 px-2.5 py-1 text-xs font-bold uppercase tracking-wider text-slate-600">
                      {video.category || 'Broadcast'}
                    </span>
                    <span className="flex items-center gap-1.5 text-xs font-medium text-slate-500">
                      <Calendar className="h-3 w-3" />
                      {new Date(video.created_at).toLocaleDateString()}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">{video.title}</h3>
                  <p className="text-slate-600 text-sm flex-1">{video.description}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <Footer />
    </main>
  );
}