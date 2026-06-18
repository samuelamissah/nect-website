"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/app/lib/supabase";
import { Search, Filter, Eye, CheckCircle } from "lucide-react";

/* eslint-disable @typescript-eslint/no-explicit-any */

export default function AdminReports() {
  const [reports, setReports] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchReports() {
      setLoading(true);
      const { data } = await supabase
        .from("reports")
        .select("*")
        .order("created_at", { ascending: false });
      
      if (data) setReports(data);
      setLoading(false);
    }
    fetchReports();
  }, []);

  async function updateStatus(id: string, status: string) {
    await supabase.from("reports").update({ status }).eq("id", id);
    window.location.reload(); // Simple refresh to show updated status
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-bold text-slate-900">Issue Reports</h1>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input 
              placeholder="Search reference..." 
              className="pl-9 pr-4 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:border-brand-primary"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-slate-200 bg-white text-sm font-medium text-slate-700 hover:bg-slate-50">
            <Filter className="h-4 w-4" />
            Filter
          </button>
        </div>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-6 py-4 font-semibold text-slate-900">Reference</th>
                <th className="px-6 py-4 font-semibold text-slate-900">Type</th>
                <th className="px-6 py-4 font-semibold text-slate-900">Location</th>
                <th className="px-6 py-4 font-semibold text-slate-900">Date</th>
                <th className="px-6 py-4 font-semibold text-slate-900">Status</th>
                <th className="px-6 py-4 font-semibold text-slate-900 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr><td colSpan={6} className="px-6 py-8 text-center text-slate-500">Loading reports...</td></tr>
              ) : reports.length === 0 ? (
                <tr><td colSpan={6} className="px-6 py-8 text-center text-slate-500">No reports found.</td></tr>
              ) : (
                reports.map((report) => (
                  <tr key={report.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 font-mono font-medium text-brand-primary">{report.reference}</td>
                    <td className="px-6 py-4 text-slate-700">{report.report_type}</td>
                    <td className="px-6 py-4 text-slate-700 max-w-[200px] truncate">{report.location}</td>
                    <td className="px-6 py-4 text-slate-500">
                      {new Date(report.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${
                        report.status === 'Resolved' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                        report.status === 'In Progress' ? 'bg-amber-50 text-amber-700 border-amber-200' :
                        'bg-slate-100 text-slate-700 border-slate-200'
                      }`}>
                        {report.status || 'Pending'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button className="p-1.5 text-slate-400 hover:text-brand-primary rounded-md hover:bg-brand-primary/10 transition-colors" title="View Details">
                          <Eye className="h-4 w-4" />
                        </button>
                        <button 
                          onClick={() => updateStatus(report.id, 'In Progress')}
                          className="p-1.5 text-slate-400 hover:text-amber-600 rounded-md hover:bg-amber-50 transition-colors" title="Mark In Progress">
                          <CheckCircle className="h-4 w-4" />
                        </button>
                        <button 
                          onClick={() => updateStatus(report.id, 'Resolved')}
                          className="p-1.5 text-slate-400 hover:text-emerald-600 rounded-md hover:bg-emerald-50 transition-colors" title="Mark Resolved">
                          <CheckCircle className="h-4 w-4" />
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
    </div>
  );
}