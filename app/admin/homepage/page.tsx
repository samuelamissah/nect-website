"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/app/lib/supabase";
import { Save, Home, Loader2, LayoutTemplate } from "lucide-react";

/* eslint-disable @typescript-eslint/no-explicit-any */

export default function AdminHomepage() {
  const [content, setContent] = useState<Record<string, string>>({
    hero_title: "Coordinating Ghana's Critical Infrastructure.",
    hero_subtitle: "The National Engineering Coordinating Team (NECT) exists because infrastructure projects are connected.",
    stats_agencies: "37+",
    stats_regions: "16",
    stats_ministries: "9+",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchContent();
  }, []);

  async function fetchContent() {
    setLoading(true);
    const { data } = await supabase.from("homepage_content").select("*");
    
    if (data && data.length > 0) {
      const contentMap: Record<string, string> = {};
      data.forEach(item => {
        contentMap[item.id] = item.value;
      });
      // Merge with defaults
      setContent(prev => ({ ...prev, ...contentMap }));
    }
    setLoading(false);
  }

  const handleChange = (key: string, value: string) => {
    setContent(prev => ({ ...prev, [key]: value }));
  };

  async function handleSave() {
    setSaving(true);
    
    const updates = Object.keys(content).map(key => ({
      id: key,
      value: content[key],
      updated_at: new Date().toISOString()
    }));

    const { error } = await supabase.from("homepage_content").upsert(updates);
    
    setSaving(false);
    
    if (error) {
      alert("Error saving homepage content. Did you run the SQL setup script?");
    } else {
      alert("Homepage content updated successfully! It is now live.");
    }
  }

  if (loading) {
    return <div className="py-20 flex flex-col items-center justify-center text-slate-500"><Loader2 className="h-8 w-8 animate-spin mb-4 text-brand-primary" /> Loading configuration...</div>;
  }

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2"><LayoutTemplate className="h-6 w-6 text-brand-primary" /> Homepage Content</h1>
          <p className="text-sm text-slate-500 mt-1">Edit the text that appears on the main public landing page.</p>
        </div>
        <button 
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 px-6 py-2.5 rounded-lg bg-slate-900 text-white text-sm font-bold hover:bg-slate-800 transition-colors shadow-md disabled:opacity-70"
        >
          {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
          {saving ? "Publishing..." : "Publish Changes"}
        </button>
      </div>

      <div className="space-y-8">
        {/* Hero Section */}
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
          <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
            <Home className="h-5 w-5 text-slate-400" /> Hero Section
          </h2>
          
          <div className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Main Headline</label>
              <textarea 
                value={content.hero_title}
                onChange={(e) => handleChange("hero_title", e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-brand-primary outline-none font-bold text-lg resize-none"
                rows={2}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Subheadline</label>
              <textarea 
                value={content.hero_subtitle}
                onChange={(e) => handleChange("hero_subtitle", e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-brand-primary outline-none resize-none"
                rows={3}
              />
            </div>
          </div>
        </div>

        {/* Statistics Section */}
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
          <h2 className="text-lg font-bold text-slate-900 mb-4">Statistics Bar</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Member Institutions</label>
              <input 
                type="text"
                value={content.stats_agencies}
                onChange={(e) => handleChange("stats_agencies", e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:border-brand-primary outline-none font-bold"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Regional Focus</label>
              <input 
                type="text"
                value={content.stats_regions}
                onChange={(e) => handleChange("stats_regions", e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:border-brand-primary outline-none font-bold"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Ministries Involved</label>
              <input 
                type="text"
                value={content.stats_ministries}
                onChange={(e) => handleChange("stats_ministries", e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:border-brand-primary outline-none font-bold"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}