"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/app/lib/supabase";
import { Search, Activity, Calendar, Shield, Loader2 } from "lucide-react";

/* eslint-disable @typescript-eslint/no-explicit-any */

export default function AdminAudit() {
  const [logs, setLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    // Define fetchLogs inside useEffect to fix the "access before declaration" error
    async function fetchLogs() {
      setLoading(true);
      // In a real app we fetch from 'audit_logs', for demo we will show some mock ones if empty
      const { data } = await supabase
        .from("audit_logs")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(50);
      
      if (data && data.length > 0) {
        setLogs(data);
      } else {
        // Mock logs to show how it looks
        setLogs([
          { id: '1', user_name: 'Admin', action: 'Published Article', module: 'News', ip_address: '192.168.1.1', created_at: new Date().toISOString() },
          { id: '2', user_name: 'Admin', action: 'Updated Report Status to Resolved', module: 'Reports', ip_address: '192.168.1.1', created_at: new Date(Date.now() - 3600000).toISOString() },
          { id: '3', user_name: 'Admin', action: 'Logged In', module: 'Auth', ip_address: '192.168.1.1', created_at: new Date(Date.now() - 7200000).toISOString() },
          { id: '4', user_name: 'System', action: 'Automated Backup Completed', module: 'System', ip_address: 'localhost', created_at: new Date(Date.now() - 86400000).toISOString() },
        ]);
      }
      setLoading(false);
    }
    
    fetchLogs();

  }, []);
  
  async function fetchLogs() {
    setLoading(true);
    // In a real app we fetch from 'audit_logs', for demo we will show some mock ones if empty
    const { data } = await supabase
      .from("audit_logs")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(50);
    
    if (data && data.length > 0) {
      setLogs(data);
    } else {
      // Mock logs to show how it looks
      setLogs([
        { id: '1', user_name: 'Admin', action: 'Published Article', module: 'News', ip_address: '192.168.1.1', created_at: new Date().toISOString() },
        { id: '2', user_name: 'Admin', action: 'Updated Report Status to Resolved', module: 'Reports', ip_address: '192.168.1.1', created_at: new Date(Date.now() - 3600000).toISOString() },
        { id: '3', user_name: 'Admin', action: 'Logged In', module: 'Auth', ip_address: '192.168.1.1', created_at: new Date(Date.now() - 7200000).toISOString() },
        { id: '4', user_name: 'System', action: 'Automated Backup Completed', module: 'System', ip_address: 'localhost', created_at: new Date(Date.now() - 86400000).toISOString() },
      ]);
    }
    setLoading(false);
  }
  

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            <Shield className="h-6 w-6 text-brand-primary" /> System Audit Logs
          </h1>
          <p className="text-sm text-slate-500 mt-1">Track every administrative action performed in the CMS.</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-slate-200 bg-white text-sm font-medium text-slate-700 hover:bg-slate-50 shadow-sm">
          <Calendar className="h-4 w-4" />
          Filter by Date
        </button>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
        <div className="p-4 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input 
              placeholder="Search actions, users, or modules..." 
              className="w-full pl-9 pr-4 py-2 rounded-lg border border-slate-300 text-sm focus:outline-none focus:border-brand-primary"
            />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-white border-b border-slate-200">
              <tr>
                <th className="px-6 py-4 font-semibold text-slate-900">Timestamp</th>
                <th className="px-6 py-4 font-semibold text-slate-900">User</th>
                <th className="px-6 py-4 font-semibold text-slate-900">Module</th>
                <th className="px-6 py-4 font-semibold text-slate-900">Action Performed</th>
                <th className="px-6 py-4 font-semibold text-slate-900">IP Address</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                 <tr><td colSpan={5} className="px-6 py-12 text-center text-slate-500"><Loader2 className="h-6 w-6 animate-spin mx-auto mb-2 text-brand-primary" /> Loading logs...</td></tr>
              ) : (
                logs.map((log) => (
                  <tr key={log.id} className="hover:bg-slate-50 transition-colors font-mono text-xs">
                    <td className="px-6 py-4 text-slate-500 whitespace-nowrap">
                      {new Date(log.created_at).toLocaleString()}
                    </td>
                    <td className="px-6 py-4 font-semibold text-slate-700">
                      {log.user_name}
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center rounded-sm bg-slate-100 px-2 py-0.5 font-bold text-slate-600 border border-slate-200">
                        {log.module}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-slate-900">
                      {log.action}
                    </td>
                    <td className="px-6 py-4 text-slate-400">
                      {log.ip_address}
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