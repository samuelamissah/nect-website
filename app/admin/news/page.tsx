"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/app/lib/supabase";
import { Plus, Image as ImageIcon, Video, Trash2, Edit, XCircle } from "lucide-react";
import Image from "next/image";

/* eslint-disable @typescript-eslint/no-explicit-any */

export default function AdminNews() {
  const [articles, setArticles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    async function fetchArticles() {
      setLoading(true);
      const { data } = await supabase
        .from("news")
        .select("*")
        .order("created_at", { ascending: false });
      
      if (data) setArticles(data);
      setLoading(false);
    }
    fetchArticles();
  }, []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    
    // In a real app, handle file uploads to Supabase storage here similar to ReportForm
    // For now, we'll just save the text data
    
    const { error } = await supabase.from("news").insert({
      title: form.get("title"),
      category: form.get("category"),
      excerpt: form.get("excerpt"),
      content: form.get("content"),
      featured: form.get("featured") === "on",
    });

    if (!error) {
      setIsModalOpen(false);
      window.location.reload(); // Simple refresh to fetch new data since fetchArticles is in useEffect
    } else {
      alert("Error saving news article.");
    }
  }

  async function deleteArticle(id: string) {
    if (confirm("Are you sure you want to delete this article?")) {
      await supabase.from("news").delete().eq("id", id);
      window.location.reload();
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-bold text-slate-900">News & Media Management</h1>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-brand-primary text-white text-sm font-bold hover:bg-brand-primary/90 transition-colors"
        >
          <Plus className="h-4 w-4" />
          Publish Article
        </button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {loading ? (
           <div className="col-span-full py-12 text-center text-slate-500">Loading articles...</div>
        ) : articles.length === 0 ? (
           <div className="col-span-full py-12 text-center border-2 border-dashed border-slate-200 rounded-xl text-slate-500 bg-white">
             No articles published yet. Click &quot;Publish Article&quot; to start.
           </div>
        ) : (
          articles.map((article) => (
            <div key={article.id} className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm flex flex-col">
              <div className="h-40 bg-slate-100 relative group flex items-center justify-center">
                {article.image_url ? (
                  <Image src={article.image_url} alt="" fill className="object-cover" />
                ) : (
                  <ImageIcon className="h-8 w-8 text-slate-300" />
                )}
                {article.featured && (
                  <span className="absolute top-3 left-3 bg-brand-accent text-slate-900 text-xs font-bold px-2 py-1 rounded-sm uppercase">Featured</span>
                )}
              </div>
              <div className="p-5 flex-1 flex flex-col">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-brand-primary">{article.category}</span>
                  <span className="text-xs text-slate-500">• {new Date(article.created_at).toLocaleDateString()}</span>
                </div>
                <h3 className="font-bold text-slate-900 mb-2 line-clamp-2">{article.title}</h3>
                <p className="text-sm text-slate-600 line-clamp-2 mb-4 flex-1">{article.excerpt}</p>
                
                <div className="flex items-center justify-end gap-2 pt-4 border-t border-slate-100">
                  <button title="Edit" onClick={() => setIsModalOpen(true)} className="p-2 text-slate-400 hover:text-brand-primary rounded-md hover:bg-brand-primary/10 transition-colors">
                    <Edit className="h-4 w-4" />
                  </button>
                  <button 
                    title="Delete" 
                    onClick={() => deleteArticle(article.id)} 
                    className="p-2 text-slate-400 hover:text-red-600 rounded-md hover:bg-red-50 transition-colors"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Modal for New Article */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between z-10">
              <h2 className="text-xl font-bold text-slate-900">Publish New Article</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <XCircle className="h-6 w-6" />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Article Title</label>
                  <input name="title" required className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:border-brand-primary focus:ring-1 focus:ring-brand-primary outline-none" />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Category</label>
                    <select name="category" required className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:border-brand-primary outline-none bg-white">
                      <option value="Operations">Operations</option>
                      <option value="Policy">Policy</option>
                      <option value="Enforcement">Enforcement</option>
                      <option value="Reports">Reports</option>
                    </select>
                  </div>
                  <div className="flex items-center mt-6">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" name="featured" className="w-4 h-4 rounded border-slate-300 text-brand-primary focus:ring-brand-primary" />
                      <span className="text-sm font-medium text-slate-700">Set as Featured Article</span>
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Short Excerpt</label>
                  <textarea name="excerpt" required rows={2} className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:border-brand-primary outline-none resize-none"></textarea>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Full Content</label>
                  <div className="border border-slate-300 rounded-lg overflow-hidden">
                    <div className="bg-slate-50 border-b border-slate-300 p-2 flex items-center gap-1 flex-wrap">
                      {/* Rich Text Toolbar Mock */}
                      <button type="button" className="p-1.5 hover:bg-slate-200 rounded text-slate-600 font-bold">B</button>
                      <button type="button" className="p-1.5 hover:bg-slate-200 rounded text-slate-600 italic font-serif">I</button>
                      <button type="button" className="p-1.5 hover:bg-slate-200 rounded text-slate-600 underline decoration-solid">U</button>
                      <div className="w-px h-5 bg-slate-300 mx-1"></div>
                      <button type="button" className="p-1.5 hover:bg-slate-200 rounded text-slate-600 font-bold text-xs">H1</button>
                      <button type="button" className="p-1.5 hover:bg-slate-200 rounded text-slate-600 font-bold text-xs">H2</button>
                      <div className="w-px h-5 bg-slate-300 mx-1"></div>
                      <button type="button" className="p-1.5 hover:bg-slate-200 rounded text-slate-600 text-xs">List</button>
                      <button type="button" className="p-1.5 hover:bg-slate-200 rounded text-slate-600 text-xs">Link</button>
                    </div>
                    <textarea name="content" required rows={12} placeholder="Write the article content here..." className="w-full px-4 py-3 outline-none resize-y"></textarea>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Media Upload</label>
                  <div className="flex gap-4">
                    <label className="flex-1 cursor-pointer flex flex-col items-center justify-center p-6 border-2 border-dashed border-slate-300 rounded-xl hover:bg-slate-50 transition-colors">
                      <ImageIcon className="h-6 w-6 text-slate-400 mb-2" />
                      <span className="text-sm font-medium text-slate-600">Upload Image</span>
                      <input type="file" accept="image/*" className="hidden" />
                    </label>
                    <label className="flex-1 cursor-pointer flex flex-col items-center justify-center p-6 border-2 border-dashed border-slate-300 rounded-xl hover:bg-slate-50 transition-colors">
                      <Video className="h-6 w-6 text-slate-400 mb-2" />
                      <span className="text-sm font-medium text-slate-600">Upload Video</span>
                      <input type="file" accept="video/*" className="hidden" />
                    </label>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-200 flex justify-end gap-3">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-6 py-2 rounded-lg border border-slate-300 text-slate-700 font-medium hover:bg-slate-50">
                  Cancel
                </button>
                <button type="submit" className="px-6 py-2 rounded-lg bg-brand-primary text-white font-bold hover:bg-brand-primary/90">
                  Publish Article
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}