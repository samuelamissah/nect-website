"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/app/lib/supabase";
import { Plus, FileText, Trash2, XCircle, Download, Loader2 } from "lucide-react";

/* eslint-disable @typescript-eslint/no-explicit-any */

export default function AdminResources() {
  const [resources, setResources] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchResources();
  }, []);

  async function fetchResources() {
    setLoading(true);
    const { data } = await supabase
      .from("resources")
      .select("*")
      .order("created_at", { ascending: false });
    
    if (data) setResources(data);
    setLoading(false);
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setUploading(true);
    const form = new FormData(e.currentTarget);
    const file = form.get("resource_file") as File | null;
    
    if (!file || file.size === 0) {
      alert("Please select a file to upload");
      setUploading(false);
      return;
    }

    // Format size for display (e.g., "2.4 MB")
    const sizeInMB = (file.size / (1024 * 1024)).toFixed(1);
    const fileSizeStr = `${sizeInMB} MB`;
    
    const uploadName = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.]/g, '')}`;

    const { error: uploadError } = await supabase.storage
      .from("nect-resources")
      .upload(uploadName, file);

    if (uploadError) {
      alert("Error uploading file. Make sure you ran the Supabase SQL setup to create 'nect-resources' bucket. " + uploadError.message);
      setUploading(false);
      return;
    }

    const { data } = supabase.storage
      .from("nect-resources")
      .getPublicUrl(uploadName);

    const fileUrl = data.publicUrl;

    const { error } = await supabase.from("resources").insert({
      title: form.get("title"),
      category: form.get("category"),
      description: form.get("description"),
      file_url: fileUrl,
      file_type: file.name.split('.').pop()?.toUpperCase() || 'FILE',
      file_size: fileSizeStr,
    });

    if (!error) {
      setIsModalOpen(false);
      fetchResources();
    } else {
      alert("Error saving resource metadata.");
    }
    setUploading(false);
  }

  async function deleteResource(id: string) {
    if (confirm("Are you sure you want to delete this resource?")) {
      await supabase.from("resources").delete().eq("id", id);
      fetchResources();
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Resource Management</h1>
          <p className="text-sm text-slate-500 mt-1">Upload PDF, DOCX, XLSX documents for public access.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-brand-primary text-white text-sm font-bold hover:bg-brand-primary/90 transition-colors shadow-md"
        >
          <Plus className="h-4 w-4" />
          Upload Document
        </button>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-6 py-4 font-semibold text-slate-900">Document</th>
                <th className="px-6 py-4 font-semibold text-slate-900">Category</th>
                <th className="px-6 py-4 font-semibold text-slate-900">Type & Size</th>
                <th className="px-6 py-4 font-semibold text-slate-900">Date Uploaded</th>
                <th className="px-6 py-4 font-semibold text-slate-900 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr><td colSpan={5} className="px-6 py-12 text-center text-slate-500"><Loader2 className="h-6 w-6 animate-spin mx-auto mb-2 text-brand-primary" /> Loading resources...</td></tr>
              ) : resources.length === 0 ? (
                <tr><td colSpan={5} className="px-6 py-12 text-center text-slate-500">No resources uploaded yet.</td></tr>
              ) : (
                resources.map((resource) => (
                  <tr key={resource.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-start gap-3">
                        <div className="mt-1 flex h-8 w-8 items-center justify-center rounded bg-red-50 text-red-600 shrink-0">
                          <FileText className="h-4 w-4" />
                        </div>
                        <div>
                          <p className="font-bold text-slate-900">{resource.title}</p>
                          <p className="text-slate-500 text-xs mt-0.5 line-clamp-1 max-w-xs">{resource.description}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center rounded-sm bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-700">
                        {resource.category}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="font-bold text-slate-700">{resource.file_type}</span>
                        <span className="text-slate-400 text-xs">{resource.file_size}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-slate-500">
                      {new Date(resource.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <a href={resource.file_url} target="_blank" rel="noreferrer" className="p-1.5 text-slate-400 hover:text-brand-primary rounded-md hover:bg-brand-primary/10 transition-colors" title="Download">
                          <Download className="h-4 w-4" />
                        </a>
                        <button onClick={() => deleteResource(resource.id)} className="p-1.5 text-slate-400 hover:text-red-600 rounded-md hover:bg-red-50 transition-colors" title="Delete">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal for New Resource */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg">
            <div className="border-b border-slate-200 px-6 py-4 flex items-center justify-between">
              <h2 className="text-xl font-bold text-slate-900">Upload Document</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600 transition-colors">
                <XCircle className="h-6 w-6" />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-5">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Document Title</label>
                <input name="title" required className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:border-brand-primary outline-none" />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Category</label>
                <select name="category" required className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:border-brand-primary outline-none bg-white">
                  <option value="Policies">Policies</option>
                  <option value="Guidelines">Guidelines</option>
                  <option value="Reports">Reports</option>
                  <option value="Circulars">Circulars</option>
                  <option value="Publications">Publications</option>
                  <option value="Technical Documents">Technical Documents</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Description</label>
                <textarea name="description" required rows={2} className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:border-brand-primary outline-none resize-none"></textarea>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">File Upload (PDF, DOCX, XLSX, PPTX)</label>
                <input type="file" name="resource_file" accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx" required className="w-full text-sm text-slate-500 file:mr-4 file:py-2.5 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-brand-primary/10 file:text-brand-primary hover:file:bg-brand-primary/20 transition-colors cursor-pointer border border-slate-200 rounded-lg p-1" />
              </div>

              <div className="pt-4 border-t border-slate-200 flex justify-end gap-3">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-6 py-2 rounded-lg border border-slate-300 text-slate-700 font-medium hover:bg-slate-50">
                  Cancel
                </button>
                <button type="submit" disabled={uploading} className="flex items-center gap-2 px-6 py-2 rounded-lg bg-brand-primary text-white font-bold hover:bg-brand-primary/90 disabled:opacity-70">
                  {uploading && <Loader2 className="h-4 w-4 animate-spin" />}
                  {uploading ? "Uploading..." : "Upload Document"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}