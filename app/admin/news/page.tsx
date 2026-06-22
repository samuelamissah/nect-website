"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/app/lib/supabase";
import { Plus, Image as ImageIcon, Trash2, Edit, XCircle, Loader2 } from "lucide-react";
import { slugify } from "@/app/lib/slugify";
import Image from "next/image";
import toast from "react-hot-toast";
import TiptapEditor from "@/app/components/TipTapEditor";

/* eslint-disable @typescript-eslint/no-explicit-any */

export default function AdminNews() {
  const [articles, setArticles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [editingArticle, setEditingArticle] = useState<any | null>(null);

  async function fetchArticles() {
    setLoading(true);
    const { data } = await supabase
      .from("news")
      .select("*")
      .order("created_at", { ascending: false });
    
    if (data) setArticles(data);
    setLoading(false);
  }

  useEffect(() => {
    // Wrap fetch call in async IIFE to prevent setState from being called synchronously in effect
    (async () => {
      await fetchArticles();
    })();
  }, []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSaving(true);
    const form = new FormData(e.currentTarget);
    
    let image_url = editingArticle ? editingArticle.image_url : null;
    if (selectedFile) {
      const fileExt = selectedFile.name.split('.').pop();
      const fileName = `${crypto.randomUUID()}.${fileExt}`;
      const filePath = `news/${fileName}`;
      
      const { error: uploadError } = await supabase.storage
        .from('nect-media')
        .upload(filePath, selectedFile);
        
      if (!uploadError) {
        const { data: publicUrlData } = supabase.storage
          .from('nect-media')
          .getPublicUrl(filePath);
        image_url = publicUrlData.publicUrl;
      } else {
        toast.error("Error uploading image");
        setSaving(false);
        return;
      }
    }
    
    const titleStr = String(form.get("title") || "");
    const excerpt = String(form.get("excerpt") || "");
    const category = String(form.get("category") || "News");
    const articleData = {
      title: titleStr,
      category,
      excerpt,
      content: contentValue,
      featured: form.get("featured") === "on",
      image_url: image_url,
      slug: slugify(titleStr),
    };

   


    let error;
    
    if (editingArticle) {
      const { error: updateError } = await supabase
        .from("news")
        .update(articleData)
        .eq("id", editingArticle.id);
      error = updateError;
    } else {
      const { error: insertError } = await supabase
        .from("news")
        .insert(articleData);
      error = insertError;
    }

    setSaving(false);
    if (!error) {
      toast.success(editingArticle ? "Article updated successfully!" : "Article published successfully!");
      setIsModalOpen(false);
      setEditingArticle(null);
      setSelectedFile(null);
      setContentValue("");
      fetchArticles(); 
    } else {
      toast.error("Error saving news article: " + error.message);
    }
  }

const [contentValue, setContentValue] = useState("");

  async function deleteArticle(id: string) {
    if (confirm("Are you sure you want to delete this article?")) {
      await supabase.from("news").delete().eq("id", id);
      toast.success("Article deleted!");
      fetchArticles();
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-bold text-slate-900">News & Media Management</h1>
        <button 
          onClick={() => {
  setEditingArticle(null);
  setContentValue("");
  setSelectedFile(null);
  setIsModalOpen(true);
}}
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
                  <Image src={article.image_url} alt="" fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" className="object-cover" />
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
                  <button 
                    title="Edit" 
                   onClick={() => {
  setEditingArticle(article);
  setContentValue(article.content || "");
  setIsModalOpen(true);
}}
                    className="p-2 text-slate-400 hover:text-brand-primary rounded-md hover:bg-brand-primary/10 transition-colors"
                  >
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
              <h2 className="text-xl font-bold text-slate-900">
                {editingArticle ? "Edit Article" : "Publish New Article"}
              </h2>
              <button title="Close" onClick={() => { setIsModalOpen(false); setEditingArticle(null); }} className="text-slate-400 hover:text-slate-600">
                <XCircle className="h-6 w-6" />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Article Title</label>
                  <input title="js" name="title" required defaultValue={editingArticle?.title || ""} className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:border-brand-primary focus:ring-1 focus:ring-brand-primary outline-none" />
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Category</label>
                    <select title="js" name="category" required defaultValue={editingArticle?.category || "Operations"} className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:border-brand-primary outline-none bg-white">
                      <option value="Operations">Operations</option>
                      <option value="Policy">Policy</option>
                      <option value="Enforcement">Enforcement</option>
                      <option value="Reports">Reports</option>
                    </select>
                  </div>
                  <div className="flex items-center mt-6">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" name="featured" defaultChecked={editingArticle?.featured || false} className="w-4 h-4 rounded border-slate-300 text-brand-primary focus:ring-brand-primary" />
                      <span className="text-sm font-medium text-slate-700">Set as Featured Article</span>
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Short Excerpt</label>
                  <textarea title="js" name="excerpt" required rows={2} defaultValue={editingArticle?.excerpt || ""} className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:border-brand-primary outline-none resize-none"></textarea>
                </div>

   

 <div>
  <label className="block text-sm font-medium text-slate-700 mb-1">
    Full Content
  </label>

  <TiptapEditor
    value={contentValue}
    onChange={setContentValue}
  />
</div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Media Upload</label>
                  <div className="flex gap-4">
                    <label className="flex-1 cursor-pointer flex flex-col items-center justify-center p-6 border-2 border-dashed border-slate-300 rounded-xl hover:bg-slate-50 transition-colors">
                      <ImageIcon className="h-6 w-6 text-slate-400 mb-2" />
                      <span className="text-sm font-medium text-slate-600">
                        {selectedFile ? selectedFile.name : "Upload Image"}
                      </span>
                      <input 
                        type="file" 
                        accept="image/*" 
                        className="hidden" 
                        onChange={(e) => {
                          if (e.target.files && e.target.files.length > 0) {
                            setSelectedFile(e.target.files[0]);
                          }
                        }}
                      />
                    </label>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-200 flex justify-end gap-3">
                <button type="button" onClick={() => { setIsModalOpen(false); setEditingArticle(null); }} className="px-6 py-2 rounded-lg border border-slate-300 text-slate-700 font-medium hover:bg-slate-50">
                  Cancel
                </button>
                <button type="submit" disabled={saving} className="flex items-center gap-2 px-6 py-2 rounded-lg bg-brand-primary text-white font-bold hover:bg-brand-primary/90 disabled:opacity-70">
                  {saving && <Loader2 className="h-4 w-4 animate-spin" />}
                  {saving ? (editingArticle ? "Updating..." : "Publishing...") : (editingArticle ? "Update Article" : "Publish Article")}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}