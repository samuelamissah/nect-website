"use client";

import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import AnimatedSection from "@/app/components/AnimatedSection";
import { Loader2, Image as ImageIcon, Video, PlayCircle, XCircle } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { supabase } from "@/app/lib/supabase";

/* eslint-disable @typescript-eslint/no-explicit-any */

export default function GalleryPage() {
  const [mediaItems, setMediaItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMedia, setSelectedMedia] = useState<any | null>(null);

  useEffect(() => {
    async function fetchGallery() {
      const { data } = await supabase
        .from("gallery")
        .select("*")
        .order("created_at", { ascending: false });
      
      if (data) setMediaItems(data);
      setLoading(false);
    }
    fetchGallery();
  }, []);

  return (
    <main className="min-h-screen bg-slate-50 flex flex-col">
      <Header />
      
      <AnimatedSection direction="down">
        <section className="bg-slate-900 border-b border-slate-800 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
          <div className="relative z-10 mx-auto max-w-7xl px-5 py-16 lg:px-10 lg:py-24">
            <div className="max-w-2xl">
              <span className="mb-4 inline-flex items-center rounded-sm bg-white/10 px-4 py-1.5 text-sm font-bold uppercase tracking-wider text-white border border-white/20">
                Media Center
              </span>
              <h1 className="text-4xl font-extrabold tracking-tight text-white md:text-5xl lg:text-6xl">
                Operational Gallery
              </h1>
              <p className="mt-6 text-lg leading-relaxed text-slate-300">
                Explore visual documentation of NECT's field operations, site inspections, and infrastructure interventions across the nation.
              </p>
            </div>
          </div>
        </section>
      </AnimatedSection>

      <section className="mx-auto max-w-7xl px-5 py-16 lg:px-10 lg:py-24 w-full flex-1">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-32">
            <Loader2 className="h-12 w-12 animate-spin text-brand-primary mb-4" />
            <p className="text-slate-500 font-bold tracking-wide uppercase">Loading Media...</p>
          </div>
        ) : mediaItems.length === 0 ? (
          <AnimatedSection>
            <div className="text-center py-32 border-2 border-dashed border-slate-300 rounded-2xl bg-white">
              <ImageIcon className="h-16 w-16 text-slate-300 mx-auto mb-4" />
              <p className="text-slate-500 text-lg font-medium">No media has been uploaded to the gallery yet.</p>
            </div>
          </AnimatedSection>
        ) : (
          <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
            {mediaItems.map((item, i) => (
              <AnimatedSection key={item.id} delay={i * 0.1} direction="up">
                <div className="break-inside-avoid rounded-2xl border border-slate-200 bg-white shadow-md overflow-hidden group hover:shadow-xl hover:border-brand-primary/40 transition-all duration-300">
                  <div className="relative w-full overflow-hidden bg-slate-100">
                    {item.media_type === 'video' ? (
                      <div className="relative cursor-pointer group" onClick={() => setSelectedMedia(item)}>
                        <video src={item.media_url} className="w-full h-auto object-cover max-h-[500px]" />
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center">
                          <PlayCircle className="h-16 w-16 text-white/90 drop-shadow-lg group-hover:scale-110 transition-transform" />
                        </div>
                        <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md text-white p-2 rounded-full shadow-lg z-10 pointer-events-none">
                          <Video className="h-4 w-4" />
                        </div>
                      </div>
                    ) : (
                      <div className="relative w-full aspect-[4/3] sm:aspect-auto sm:min-h-[300px] cursor-pointer" onClick={() => setSelectedMedia(item)}>
                        <Image 
                          src={item.media_url} 
                          alt={item.title} 
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-105" 
                        />
                        <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md text-white p-2 rounded-full shadow-lg z-10">
                          <ImageIcon className="h-4 w-4" />
                        </div>
                        <div className="absolute inset-0 bg-brand-primary/0 group-hover:bg-brand-primary/10 transition-colors duration-300 flex items-center justify-center">
                          <span className="opacity-0 group-hover:opacity-100 bg-white/90 backdrop-blur text-brand-primary font-bold px-4 py-2 rounded-full shadow-lg transition-opacity duration-300 transform translate-y-4 group-hover:translate-y-0">View Full Image</span>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-slate-900 mb-2 leading-tight group-hover:text-brand-primary transition-colors">{item.title}</h3>
                    {item.description && (
                      <p className="text-slate-600 mb-4 text-sm leading-relaxed">{item.description}</p>
                    )}
                    <div className="flex items-center text-xs font-bold text-slate-400 uppercase tracking-wider">
                      {new Date(item.created_at).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        )}
      </section>

      {/* Lightbox Modal */}
      {selectedMedia && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4 md:p-10" onClick={() => setSelectedMedia(null)}>
          <button className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors" onClick={() => setSelectedMedia(null)}>
            <XCircle className="h-10 w-10" />
          </button>
          <div className="relative max-w-5xl w-full max-h-full flex flex-col items-center" onClick={(e) => e.stopPropagation()}>
            {selectedMedia.media_type === 'image' ? (
              <img src={selectedMedia.media_url} alt={selectedMedia.title} className="max-w-full max-h-[80vh] object-contain rounded-lg shadow-2xl" />
            ) : (
              <video src={selectedMedia.media_url} controls autoPlay className="max-w-full max-h-[80vh] object-contain rounded-lg shadow-2xl bg-black w-full" />
            )}
            <div className="mt-6 text-center text-white max-w-2xl">
              <h2 className="text-2xl font-bold mb-2">{selectedMedia.title}</h2>
              {selectedMedia.description && <p className="text-white/70">{selectedMedia.description}</p>}
            </div>
          </div>
        </div>
      )}

      <Footer />
    </main>
  );
}