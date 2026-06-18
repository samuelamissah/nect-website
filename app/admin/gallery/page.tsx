"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/app/lib/supabase";
import { Plus, Image as ImageIcon, Video, Trash2, XCircle, Loader2 } from "lucide-react";
import Image from "next/image";

/* eslint-disable @typescript-eslint/no-explicit-any */

export default function AdminGallery() {
  const [mediaItems, setMediaItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchMedia();
  }, []);

  async function fetchMedia() {
    setLoading(true);
    const { data } = await supabase
      .from("gallery")
      .select("*")
      .order("created_at", { ascending: false });
    
    if (data) setMediaItems(data);
    setLoading(false);
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setUploading(true);
    const form = new FormData(e.currentTarget);
    const file = form.get("media_file") as File | null;
    
    if (!file || file.size === 0) {
      alert("Please select a file to upload");
      setUploading(false);
      return;
    }

    const isVideo = file.type.startsWith("video/");
    const mediaType = isVideo ? "video" : "image";
    const uploadName = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.]/g, '')}`;

    const { error: uploadError } = await supabase.storage
      .from("nect-media")
      .upload(uploadName, file);

    if (uploadError) {
      alert("Error uploading to storage: " + uploadError.message);
      setUploading(false);
      return;
    }

    const { data } = supabase.storage
      .from("nect-media")
      .getPublicUrl(uploadName);

    const mediaUrl = data.publicUrl;

    const { error } = await supabase.from("gallery").insert({
      title: form.get("title"),
      description: form.get("description"),
      media_url: mediaUrl,
      media_type: mediaType,
    });

    if (!error) {
      setIsModalOpen(false);
      fetchMedia();
    } else {
      alert("Error saving gallery entry.");
    }
    setUploading(false);
  }

  async function deleteMedia(id: string) {
    if (confirm("Are you sure you want to delete this media?")) {
      await supabase.from("gallery").delete().eq("id", id);
      fetchMedia();
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Gallery Management</h1>
          <p className="text-sm text-slate-500 mt-1">Upload pictures and videos to the public gallery.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-brand-primary text-white text-sm font-bold hover:bg-brand-primary/90 transition-colors shadow-md"
        >
          <Plus className="h-4 w-4" />
          Upload Media
        </button>
      </div>

      <div className="grid gap-6 md:grid-cols-3 lg:grid-cols-4">
        {loading ? (
           <div className="col-span-full py-12 text-center text-slate-500">Loading gallery...</div>
        ) : mediaItems.length === 0 ? (
           <div className="col-span-full py-12 text-center border-2 border-dashed border-slate-200 rounded-xl text-slate-500 bg-white">
             No media uploaded yet. Click &quot;Upload Media&quot; to add pictures or videos.
           </div>
        ) : (
          mediaItems.map((item) => (
            <div key={item.id} className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm flex flex-col group">
              <div className="h-48 bg-slate-100 relative">
                {item.media_type === 'video' ? (
                  <video src={item.media_url} className="w-full h-full object-cover" controls />
                ) : (
                  <Image src={item.media_url} alt={item.title} fill className="object-cover" />
                )}
                <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-sm text-white text-xs font-bold px-2 py-1 rounded-md capitalize flex items-center gap-1">
                  {item.media_type === 'video' ? <Video className="h-3 w-3" /> : <ImageIcon className="h-3 w-3" />}
                  {item.media_type}
                </div>
                
                <div className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                   <button 
                     onClick={(e) => { e.preventDefault(); deleteMedia(item.id); }} 
                     className="p-3 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors pointer-events-auto shadow-lg"
                     title="Delete Media"
                   >
                     <Trash2 className="h-5 w-5" />
                   </button>
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-slate-900 line-clamp-1">{item.title}</h3>
                {item.description && <p className="text-sm text-slate-500 mt-1 line-clamp-2">{item.description}</p>}
                <p className="text-xs text-slate-400 mt-3">{new Date(item.created_at).toLocaleDateString()}</p>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Modal for New Media */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg">
            <div className="border-b border-slate-200 px-6 py-4 flex items-center justify-between">
              <h2 className="text-xl font-bold text-slate-900">Upload to Gallery</h2>
              <button 
                onClick={() => setIsModalOpen(false)} 
                className="text-slate-400 hover:text-slate-600 transition-colors"
                title="Close Modal"
              >
                <XCircle className="h-6 w-6" />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-5">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Title</label>
                <input name="title" required placeholder="E.g., Demolition exercise at Tema" className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:border-brand-primary outline-none" />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Description (Optional)</label>
                <textarea name="description" rows={3} placeholder="Brief details about the media..." className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:border-brand-primary outline-none resize-none"></textarea>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Media File (Image or Video)</label>
                <input title="ewf" type="file" name="media_file" accept="image/*,video/*" required className="w-full text-sm text-slate-500 file:mr-4 file:py-2.5 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-brand-primary/10 file:text-brand-primary hover:file:bg-brand-primary/20 transition-colors cursor-pointer border border-slate-200 rounded-lg p-1" />
              </div>

              <div className="pt-4 border-t border-slate-200 flex justify-end gap-3">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-6 py-2 rounded-lg border border-slate-300 text-slate-700 font-medium hover:bg-slate-50">
                  Cancel
                </button>
                <button type="submit" disabled={uploading} className="flex items-center gap-2 px-6 py-2 rounded-lg bg-brand-primary text-white font-bold hover:bg-brand-primary/90 disabled:opacity-70">
                  {uploading && <Loader2 className="h-4 w-4 animate-spin" />}
                  {uploading ? "Uploading..." : "Upload Media"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}