"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/app/lib/supabase";
import { Search, Filter, Eye, CheckCircle, XCircle, MapPin, Calendar, User, Clock, FileText, AlertTriangle } from "lucide-react";
import toast from "react-hot-toast";

/* eslint-disable @typescript-eslint/no-explicit-any */

export default function AdminReports() {
  const [reports, setReports] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedReport, setSelectedReport] = useState<any | null>(null);
  const [notes, setNotes] = useState("");

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
    const { error } = await supabase.from("reports").update({ status }).eq("id", id);
    if (!error) {
      toast.success("Status updated to " + status);
      
      // Update local state instead of reloading
      setReports(reports.map(r => r.id === id ? { ...r, status } : r));
      if (selectedReport) {
        const updatedReport = { ...selectedReport, status };
        setSelectedReport(updatedReport);
        
        // Trigger email if not anonymous
        if (!updatedReport.anonymous && updatedReport.email) {
          try {
            await fetch('/api/notify', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                type: 'status_update',
                email: updatedReport.email,
                name: updatedReport.full_name,
                reference: updatedReport.reference,
                status: status
              })
            });
            toast.success(`User notified via email`);
          } catch (err) {
            console.error("Failed to notify user", err);
          }
        }
      }
    } else {
      toast.error("Failed to update status");
    }
  }

  async function saveNotes() {
    if (!selectedReport) return;
    try {
      // First try to save assuming internal_notes exists
      const { error } = await supabase.from("reports").update({ internal_notes: notes }).eq("id", selectedReport.id);
      
      if (error && error.message.includes("Could not find the 'internal_notes' column")) {
        toast.error("Database missing 'internal_notes' column. Please ask administrator to run: ALTER TABLE reports ADD COLUMN internal_notes TEXT;");
        return;
      }
      
      if (!error) {
        toast.success("Internal notes saved successfully");
        setReports(reports.map(r => r.id === selectedReport.id ? { ...r, internal_notes: notes } : r));
        setSelectedReport({ ...selectedReport, internal_notes: notes });
      } else {
        console.error("Notes save error:", error);
        toast.error("Failed to save notes: " + error.message);
      }
    } catch (err: any) {
      console.error("Notes save exception:", err);
      toast.error("Failed to save notes: " + err.message);
    }
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
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-slate-200 bg-white text-sm font-medium text-slate-700 hover:bg-slate-50 shadow-sm">
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
                <tr><td colSpan={6} className="px-6 py-12 text-center text-slate-500">Loading reports...</td></tr>
              ) : reports.length === 0 ? (
                <tr><td colSpan={6} className="px-6 py-12 text-center text-slate-500">No reports found.</td></tr>
              ) : (
                reports.map((report) => (
                  <tr key={report.id} className="hover:bg-slate-50 transition-colors cursor-pointer" onClick={() => { setSelectedReport(report); setNotes(report.internal_notes || ""); }}>
                    <td className="px-6 py-4 font-mono font-medium text-brand-primary">{report.reference}</td>
                    <td className="px-6 py-4 font-semibold text-slate-700">{report.report_type}</td>
                    <td className="px-6 py-4 text-slate-600 max-w-[200px] truncate">{report.location}</td>
                    <td className="px-6 py-4 text-slate-500">
                      {new Date(report.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold border ${
                        report.status === 'Resolved' || report.status === 'Closed' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                        report.status === 'Under Review' || report.status === 'Assigned' ? 'bg-amber-50 text-amber-700 border-amber-200' :
                        'bg-slate-100 text-slate-700 border-slate-200'
                      }`}>
                        {report.status || 'Submitted'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="p-1.5 text-slate-400 hover:text-brand-primary rounded-md hover:bg-brand-primary/10 transition-colors" title="View Details">
                        <Eye className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Report Details Modal */}
      {selectedReport && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
            <div className="border-b border-slate-200 px-6 py-4 flex items-center justify-between bg-slate-50">
              <div className="flex items-center gap-3">
                <h2 className="text-xl font-black text-slate-900 font-mono tracking-tight">{selectedReport.reference}</h2>
                <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold border ${
                  selectedReport.status === 'Resolved' || selectedReport.status === 'Closed' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                  selectedReport.status === 'Under Review' || selectedReport.status === 'Assigned' ? 'bg-amber-50 text-amber-700 border-amber-200' :
                  'bg-slate-100 text-slate-700 border-slate-200'
                }`}>
                  {selectedReport.status || 'Submitted'}
                </span>
              </div>
              <button title="Close Details" onClick={() => setSelectedReport(null)} className="text-slate-400 hover:text-slate-600 transition-colors">
                <XCircle className="h-6 w-6" />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-6 grid grid-cols-1 md:grid-cols-3 gap-8">
               <div className="md:col-span-2 space-y-8">
                 <div>
                   <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">Issue Details</h3>
                   <div className="bg-slate-50 rounded-xl p-5 border border-slate-100 space-y-4">
                     <div className="flex items-start gap-3">
                        <AlertTriangle className="h-5 w-5 text-amber-500 mt-0.5" />
                        <div>
                          <p className="text-sm font-bold text-slate-900">Type</p>
                          <p className="text-slate-700">{selectedReport.report_type}</p>
                        </div>
                     </div>
                     <div className="flex items-start gap-3">
                        <MapPin className="h-5 w-5 text-brand-primary mt-0.5" />
                        <div>
                          <p className="text-sm font-bold text-slate-900">Location</p>
                          <p className="text-slate-700">{selectedReport.location}</p>
                        </div>
                     </div>
                     <div className="flex items-start gap-3">
                        <FileText className="h-5 w-5 text-slate-500 mt-0.5" />
                        <div>
                          <p className="text-sm font-bold text-slate-900">Description</p>
                          <p className="text-slate-700 leading-relaxed">{selectedReport.description}</p>
                        </div>
                     </div>
                   </div>
                 </div>

                 {selectedReport.photo_url && (
                   <div>
                     <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">Attached Evidence</h3>
                     <div className="rounded-xl overflow-hidden border border-slate-200 bg-slate-100 h-64 relative">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={selectedReport.photo_url} alt="Evidence" className="w-full h-full object-contain" />
                     </div>
                   </div>
                 )}

                 <div>
                   <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">Reporter Info</h3>
                   <div className="bg-slate-50 rounded-xl p-5 border border-slate-100 flex items-center gap-3">
                      <User className="h-5 w-5 text-slate-500" />
                      <div>
                        {selectedReport.anonymous ? (
                          <p className="font-bold text-slate-700">Anonymous Reporter</p>
                        ) : (
                          <>
                            <p className="font-bold text-slate-900">{selectedReport.full_name}</p>
                            <p className="text-sm text-slate-500">{selectedReport.phone} • {selectedReport.email}</p>
                          </>
                        )}
                      </div>
                   </div>
                 </div>
               </div>

               <div className="space-y-6">
                 <div>
                   <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">Quick Actions</h3>
                   <div className="space-y-2">
                     <select 
                     title="d"
                       className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:border-brand-primary outline-none font-medium"
                       value={selectedReport.status || 'Submitted'}
                       onChange={(e) => updateStatus(selectedReport.id, e.target.value)}
                     >
                       <option value="Submitted">Status: Submitted</option>
                       <option value="Under Review">Status: Under Review</option>
                       <option value="Assigned">Status: Assigned</option>
                       <option value="Action Taken">Status: Action Taken</option>
                       <option value="Resolved">Status: Resolved</option>
                       <option value="Closed">Status: Closed</option>
                     </select>
                     <button className="w-full py-2 bg-slate-100 text-slate-700 hover:bg-slate-200 text-sm font-bold rounded-lg transition-colors border border-slate-200">
                       Assign Officer
                     </button>
                   </div>
                 </div>

                 <div>
                   <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">Internal Notes</h3>
                   <textarea 
                     className="w-full h-32 px-3 py-2 border border-slate-300 rounded-lg text-sm focus:border-brand-primary outline-none resize-none mb-2"
                     placeholder="Add investigation notes here..."
                     value={notes}
                     onChange={(e) => setNotes(e.target.value)}
                   ></textarea>
                   <button onClick={saveNotes} className="w-full py-2 bg-brand-primary text-white text-sm font-bold rounded-lg hover:bg-brand-primary/90 transition-colors shadow-sm">
                     Save Notes
                   </button>
                 </div>
               </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}