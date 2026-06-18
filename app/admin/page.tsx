"use client";

import { Activity, FileText, AlertTriangle, Users, Newspaper, Video, FileArchive, Loader2 } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, Legend } from 'recharts';
import { useState, useEffect } from "react";
import { supabase } from "@/app/lib/supabase";

export default function AdminDashboard() {
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(true);
  
  // Stats state
  const [totalReports, setTotalReports] = useState(0);
  const [pendingReports, setPendingReports] = useState(0);
  const [totalArticles, setTotalArticles] = useState(0);
  const [totalResources, setTotalResources] = useState(0);
  /* eslint-disable @typescript-eslint/no-explicit-any */

  // Chart state
  const [reportData, setReportData] = useState<any[]>([]);
  const [categoryData, setCategoryData] = useState<any[]>([]);

  useEffect(() => {
    setMounted(true);
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    setLoading(true);
    
    try {
      const { count: reportsCount } = await supabase
        .from('reports')
        .select('*', { count: 'exact', head: true });
      setTotalReports(reportsCount || 0);

      // Fetch pending reports
      const { count: pendingCount } = await supabase
        .from('reports')
        .select('*', { count: 'exact', head: true })
        .in('status', ['Submitted', 'Under Review']);
      setPendingReports(pendingCount || 0);

      // Fetch total articles
      const { count: articlesCount } = await supabase
        .from('news')
        .select('*', { count: 'exact', head: true });
      setTotalArticles(articlesCount || 0);

      // Fetch total resources
      const { count: resourcesCount } = await supabase
        .from('resources')
        .select('*', { count: 'exact', head: true });
      setTotalResources(resourcesCount || 0);

      // Fetch reports for charts
      const { data: reports } = await supabase
        .from('reports')
        .select('report_type, created_at, status');

      if (reports) {
        // Process category data
        const catMap: Record<string, number> = {};
        reports.forEach(r => {
          const type = r.report_type || 'Other';
          catMap[type] = (catMap[type] || 0) + 1;
        });
        
        const catChart = Object.entries(catMap)
          .map(([name, value]) => ({ name, value }))
          .sort((a, b) => b.value - a.value)
          .slice(0, 5); // Top 5 categories
        
        setCategoryData(catChart.length > 0 ? catChart : [{ name: 'No Data', value: 0 }]);

        // Process monthly data (simple version for last 6 months)
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const currentMonth = new Date().getMonth();
        const lineChartData = [];
        
        for (let i = 5; i >= 0; i--) {
          let m = currentMonth - i;
          if (m < 0) m += 12;
          
          // Filter reports for this month
          const monthReports = reports.filter(r => new Date(r.created_at).getMonth() === m);
          const resolved = monthReports.filter(r => r.status === 'Resolved' || r.status === 'Closed').length;
          
          lineChartData.push({
            name: months[m],
            reports: monthReports.length,
            resolved: resolved
          });
        }
        setReportData(lineChartData);
      }
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    }
    
    setLoading(false);
  }

  if (!mounted) return null;

  if (loading) {
    return <div className="h-full flex flex-col items-center justify-center py-20 text-slate-500"><Loader2 className="h-8 w-8 animate-spin mb-4 text-brand-primary" /> Loading dashboard...</div>;
  }

  return (
    <div className="space-y-8">
      {/* Top Stats */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-slate-500">Citizen Reports</h3>
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
              <FileText className="h-5 w-5" />
            </div>
          </div>
          <p className="text-3xl font-bold text-slate-900">{totalReports}</p>
          <div className="mt-2 flex items-center text-sm">
            <span className="text-emerald-600 font-medium">All Time</span>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-slate-500">Pending Review</h3>
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-50 text-amber-600">
              <AlertTriangle className="h-5 w-5" />
            </div>
          </div>
          <p className="text-3xl font-bold text-slate-900">{pendingReports}</p>
          <div className="mt-2 flex items-center text-sm">
            <span className="text-amber-600 font-medium">Requires Action</span>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-slate-500">Published Articles</h3>
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
              <Newspaper className="h-5 w-5" />
            </div>
          </div>
          <p className="text-3xl font-bold text-slate-900">{totalArticles}</p>
          <div className="mt-2 flex items-center text-sm">
            <span className="text-emerald-600 font-medium">Published</span>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-slate-500">Resources & Docs</h3>
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-50 text-purple-600">
              <FileArchive className="h-5 w-5" />
            </div>
          </div>
          <p className="text-3xl font-bold text-slate-900">{totalResources}</p>
          <div className="mt-2 flex items-center text-sm">
            <span className="text-slate-400">Total available</span>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid gap-6 lg:grid-cols-2">
         <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-bold text-slate-900 mb-6">Reports Received vs Resolved</h2>
            <div className="h-[300px] w-full">
              {mounted && (
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={reportData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                    <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                    <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                    <Legend />
                    <Line type="monotone" dataKey="reports" stroke="#0f172a" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} name="Reports Received" />
                    <Line type="monotone" dataKey="resolved" stroke="#10b981" strokeWidth={3} dot={{ r: 4 }} name="Resolved" />
                  </LineChart>
                </ResponsiveContainer>
              )}
            </div>
         </div>
         
         <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-bold text-slate-900 mb-6">Reports by Category</h2>
            <div className="h-[300px] w-full">
              {mounted && (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={categoryData} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" horizontal={true} vertical={false} />
                    <XAxis type="number" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis dataKey="name" type="category" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} width={100} />
                    <Tooltip cursor={{fill: '#f8fafc'}} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                    <Bar dataKey="value" fill="#3b82f6" radius={[0, 4, 4, 0]} barSize={32} />
                  </BarChart>
                </ResponsiveContainer>
              )}
            </div>
         </div>
      </div>
    </div>
  );
}