"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/app/lib/supabase";
import { Plus, Video, Trash2, Edit, XCircle, PlayCircle, Loader2 } from "lucide-react";
import Image from "next/image";

/* eslint-disable @typescript-eslint/no-explicit-any */

export default function AdminVideos() {
  const [videos, setVideos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchVideos();
  }, []);

  async function fetchVideos() {
    setLoading(true);
    const { data } = await supabase
      .from("videos")
      .select("*")
      .order("created_at", { ascending: false });
    
    if (data) setVideos(data);
    setLoading(false);
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    
    // Auto-generate thumbnail for YouTube if possible, or leave blank for manual
    let videoUrl = form.get("video_url") as string;
    let thumbnailUrl = form.get("thumbnail_url") as string;
    
    // Very basic youtube thumbnail extractor
    if (!thumbnailUrl && videoUrl.includes("youtube.com/watch?v=")) {
       const videoId = videoUrl.split("v=")[1].split("&")[0];
       thumbnailUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
    }
    
    const { error } = await supabase.from("videos").insert({
      title: form.get("title"),
      description: form.get("description"),
      category: form.get("category"),
      video_url: videoUrl,
      thumbnail_url: thumbnailUrl,
    });

    if (!error) {
      setIsModalOpen(false);
      fetchVideos();
    } else {
      alert("Error saving video. Please ensure the videos table exists by running the setup SQL.");
    }
  }

  async function deleteVideo(id: string) {
    if (confirm("Are you sure you want to delete this video?")) {
      await supabase.from("videos").delete().eq("id", id);
      fetchVideos();
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Video Embed Management</h1>
          <p className="text-sm text-slate-500 mt-1">Publish YouTube or Vimeo videos to the portal.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-brand-primary text-white text-sm font-bold hover:bg-brand-primary/90 transition-colors shadow-md"
        >
          <Plus className="h-4 w-4" />
          Embed Video
        </button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {loading ? (
           <div className="col-span-full py-12 text-center text-slate-500 flex flex-col items-center">
             <Loader2 className="h-8 w-8 animate-spin mb-4 text-brand-primary" />
             Loading videos...
           </div>
        ) : videos.length === 0 ? (
           <div className="col-span-full py-12 text-center border-2 border-dashed border-slate-200 rounded-xl text-slate-500 bg-white">
             No videos published yet. Click "Embed Video" to start.
           </div>
        ) : (
          videos.map((video) => (
            <div key={video.id} className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm flex flex-col group">
              <div className="h-48 bg-slate-900 relative group flex items-center justify-center overflow-hidden">
                {video.thumbnail_url ? (
                  <img src={video.thumbnail_url} alt="" className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-500" />
                ) : (
                  <Video className="h-12 w-12 text-slate-700" />
                )}
                <div className="absolute inset-0 flex items-center justify-center">
                   <div className="h-12 w-12 rounded-full bg-brand-primary text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                      <PlayCircle className="h-6 w-6" />
                   </div>
                </div>
              </div>
              <div className="p-5 flex-1 flex flex-col">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-500">{video.category || 'General'}</span>
                  <span className="text-xs text-slate-400">• {new Date(video.created_at).toLocaleDateString()}</span>
                </div>
                <h3 className="font-bold text-slate-900 mb-2 line-clamp-2">{video.title}</h3>
                <p className="text-sm text-slate-600 line-clamp-2 mb-4 flex-1">{video.description}</p>
                
                <div className="flex items-center justify-end gap-2 pt-4 border-t border-slate-100">
                  <a href={video.video_url} target="_blank" rel="noreferrer" className="p-2 text-slate-400 hover:text-blue-600 rounded-md hover:bg-blue-50 transition-colors" title="Watch on source">
                    <PlayCircle className="h-4 w-4" />
                  </a>
                  <button onClick={() => deleteVideo(video.id)} className="p-2 text-slate-400 hover:text-red-600 rounded-md hover:bg-red-50 transition-colors" title="Delete Video">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Modal for New Video */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl">
            <div className="border-b border-slate-200 px-6 py-4 flex items-center justify-between">
              <h2 className="text-xl font-bold text-slate-900">Embed External Video</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600 transition-colors">
                <XCircle className="h-6 w-6" />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-5">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Video Title</label>
                <input name="title" required className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:border-brand-primary outline-none" />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Category</label>
                  <select name="category" required className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:border-brand-primary outline-none bg-white">
                    <option value="Operations">Operations</option>
                    <option value="Training">Training</option>
                    <option value="Press Briefing">Press Briefing</option>
                    <option value="Documentary">Documentary</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Video URL (YouTube or Vimeo)</label>
                <input name="video_url" required placeholder="https://www.youtube.com/watch?v=..." type="url" className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:border-brand-primary outline-none" />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Custom Thumbnail URL (Optional)</label>
                <input name="thumbnail_url" placeholder="Leave blank to auto-fetch from YouTube" type="url" className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:border-brand-primary outline-none" />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Description</label>
                <textarea name="description" required rows={3} className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:border-brand-primary outline-none resize-none"></textarea>
              </div>

              <div className="pt-4 border-t border-slate-200 flex justify-end gap-3">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-6 py-2 rounded-lg border border-slate-300 text-slate-700 font-medium hover:bg-slate-50">
                  Cancel
                </button>
                <button type="submit" className="px-6 py-2 rounded-lg bg-brand-primary text-white font-bold hover:bg-brand-primary/90">
                  Embed Video
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}