"use client";

import { FileText, AlertTriangle, Newspaper, FileArchive, Loader2, TrendingUp, Clock, CheckCircle } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, Legend } from 'recharts';
import { useState, useEffect, useRef } from "react";
import { supabase } from "@/app/lib/supabase";
import { motion, Variants } from "framer-motion";

// Animation variants
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 }
  }
};

/* eslint-disable @typescript-eslint/no-explicit-any */

export default function AdminDashboard() {
  const [loading, setLoading] = useState(true);
  const isMounted = useRef(true);
  
  // Stats state
  const [totalReports, setTotalReports] = useState(0);
  const [pendingReports, setPendingReports] = useState(0);
  const [totalArticles, setTotalArticles] = useState(0);
  const [totalResources, setTotalResources] = useState(0);

  // Chart state
  const [reportData, setReportData] = useState<any[]>([]);
  const [categoryData, setCategoryData] = useState<any[]>([]);

  useEffect(() => {
    // Set mounted flag
    isMounted.current = true;
    
    const fetchDashboardData = async () => {
      if (!isMounted.current) return;
      
      try {
        const { count: reportsCount } = await supabase
          .from('reports')
          .select('*', { count: 'exact', head: true });
        
        if (isMounted.current) {
          setTotalReports(reportsCount || 0);
        }

        // Fetch pending reports
        const { count: pendingCount } = await supabase
          .from('reports')
          .select('*', { count: 'exact', head: true })
          .in('status', ['Submitted', 'Under Review']);
        
        if (isMounted.current) {
          setPendingReports(pendingCount || 0);
        }

        // Fetch total articles
        const { count: articlesCount } = await supabase
          .from('news')
          .select('*', { count: 'exact', head: true });
        
        if (isMounted.current) {
          setTotalArticles(articlesCount || 0);
        }

        // Fetch total resources
        const { count: resourcesCount } = await supabase
          .from('resources')
          .select('*', { count: 'exact', head: true });
        
        if (isMounted.current) {
          setTotalResources(resourcesCount || 0);
        }

        // Fetch reports for charts
        const { data: reports } = await supabase
          .from('reports')
          .select('report_type, created_at, status');

        if (isMounted.current) {
          if (reports && reports.length > 0) {
            // Process category data
            const catMap: Record<string, number> = {};
            reports.forEach(r => {
              const type = r.report_type || 'Other';
              catMap[type] = (catMap[type] || 0) + 1;
            });
            
            const catChart = Object.entries(catMap)
              .map(([name, value]) => ({ name, value }))
              .sort((a, b) => b.value - a.value)
              .slice(0, 5);
            
            setCategoryData(catChart.length > 0 ? catChart : [{ name: 'No Data', value: 0 }]);

            // Process monthly data
            const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
            const currentMonth = new Date().getMonth();
            const lineChartData = [];
            
            for (let i = 5; i >= 0; i--) {
              let m = currentMonth - i;
              if (m < 0) m += 12;
              
              const monthReports = reports.filter(r => new Date(r.created_at).getMonth() === m);
              const resolved = monthReports.filter(r => r.status === 'Resolved' || r.status === 'Closed').length;
              
              lineChartData.push({
                name: months[m],
                reports: monthReports.length,
                resolved: resolved
              });
            }
            setReportData(lineChartData);
          } else {
            // Set default empty data
            setCategoryData([{ name: 'No Data', value: 0 }]);
            setReportData([
              { name: 'Jan', reports: 0, resolved: 0 },
              { name: 'Feb', reports: 0, resolved: 0 },
              { name: 'Mar', reports: 0, resolved: 0 },
              { name: 'Apr', reports: 0, resolved: 0 },
              { name: 'May', reports: 0, resolved: 0 },
              { name: 'Jun', reports: 0, resolved: 0 }
            ]);
          }
        }
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
        if (isMounted.current) {
          // Set default data on error
          setCategoryData([{ name: 'No Data', value: 0 }]);
          setReportData([
            { name: 'Jan', reports: 0, resolved: 0 },
            { name: 'Feb', reports: 0, resolved: 0 },
            { name: 'Mar', reports: 0, resolved: 0 },
            { name: 'Apr', reports: 0, resolved: 0 },
            { name: 'May', reports: 0, resolved: 0 },
            { name: 'Jun', reports: 0, resolved: 0 }
          ]);
        }
      }
      
      if (isMounted.current) {
        setLoading(false);
      }
    };

    fetchDashboardData();

    // Cleanup
    return () => {
      isMounted.current = false;
    };
  }, []);

  if (loading) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="h-full flex flex-col items-center justify-center py-20 text-slate-500"
      >
        <Loader2 className="h-8 w-8 animate-spin mb-4 text-brand-primary" />
        <p className="font-medium">Loading dashboard...</p>
      </motion.div>
    );
  }

  const stats = [
    {
      title: "Citizen Reports",
      value: totalReports,
      icon: FileText,
      color: "text-blue-600 bg-blue-50",
      trend: "All Time",
      trendColor: "text-emerald-600"
    },
    {
      title: "Pending Review",
      value: pendingReports,
      icon: AlertTriangle,
      color: "text-amber-600 bg-amber-50",
      trend: "Requires Action",
      trendColor: "text-amber-600"
    },
    {
      title: "Published Articles",
      value: totalArticles,
      icon: Newspaper,
      color: "text-emerald-600 bg-emerald-50",
      trend: "Published",
      trendColor: "text-emerald-600"
    },
    {
      title: "Resources & Docs",
      value: totalResources,
      icon: FileArchive,
      color: "text-purple-600 bg-purple-50",
      trend: "Total available",
      trendColor: "text-slate-400"
    }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      {/* Top Stats */}
      <motion.div 
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="grid gap-6 md:grid-cols-2 lg:grid-cols-4"
      >
        {stats.map((stat, idx) => (
          <motion.div 
            key={idx}
            variants={fadeInUp}
            whileHover={{ 
              y: -4,
              boxShadow: "0 20px 25px -5px rgba(0,0,0,0.05), 0 10px 10px -5px rgba(0,0,0,0.02)"
            }}
            className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-slate-500">{stat.title}</h3>
              <motion.div 
                whileHover={{ rotate: 10, scale: 1.1 }}
                className={`flex h-10 w-10 items-center justify-center rounded-lg ${stat.color}`}
              >
                <stat.icon className="h-5 w-5" />
              </motion.div>
            </div>
            <motion.p 
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring", stiffness: 300, delay: 0.1 * idx }}
              className="text-3xl font-bold text-slate-900"
            >
              {stat.value}
            </motion.p>
            <div className="mt-2 flex items-center text-sm">
              <span className={`${stat.trendColor} font-medium`}>{stat.trend}</span>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Charts Section */}
      <div className="grid gap-6 lg:grid-cols-2">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeInUp}
          className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-slate-900">Reports Received vs Resolved</h2>
            <motion.div 
              whileHover={{ rotate: 180 }}
              transition={{ duration: 0.5 }}
            >
              <TrendingUp className="h-5 w-5 text-slate-400" />
            </motion.div>
          </div>
          <div className="h-[300px] w-full">
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
          </div>
        </motion.div>
         
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeInUp}
          transition={{ delay: 0.1 }}
          className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-slate-900">Reports by Category</h2>
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <Clock className="h-4 w-4" />
              <span>Top 5</span>
            </div>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={categoryData} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" horizontal={true} vertical={false} />
                <XAxis type="number" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis dataKey="name" type="category" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} width={100} />
                <Tooltip cursor={{fill: '#f8fafc'}} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                <Bar dataKey="value" fill="#3b82f6" radius={[0, 4, 4, 0]} barSize={32} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>

      {/* Quick Actions / Recent Activity Placeholder */}
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeInUp}
        transition={{ delay: 0.2 }}
        className="grid gap-6 lg:grid-cols-3"
      >
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm col-span-2">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-4">Recent Activity</h3>
          <div className="space-y-4">
            {[
              { icon: CheckCircle, label: "New report received", time: "2 minutes ago", color: "text-emerald-600 bg-emerald-50" },
              { icon: AlertTriangle, label: "Pending review", time: "15 minutes ago", color: "text-amber-600 bg-amber-50" },
              { icon: FileText, label: "Report resolved", time: "1 hour ago", color: "text-blue-600 bg-blue-50" },
            ].map((activity, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * idx }}
                className="flex items-center gap-4 p-3 rounded-xl hover:bg-slate-50 transition-colors"
              >
                <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${activity.color}`}>
                  <activity.icon className="h-4 w-4" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-slate-900">{activity.label}</p>
                  <p className="text-xs text-slate-400">{activity.time}</p>
                </div>
                <span className="text-xs text-slate-400">View →</span>
              </motion.div>
            ))}
          </div>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full text-left px-4 py-3 rounded-xl bg-brand-primary/10 text-brand-primary font-medium hover:bg-brand-primary/20 transition-colors"
            >
              Review Pending Reports
            </motion.button>
            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full text-left px-4 py-3 rounded-xl bg-slate-100 text-slate-700 font-medium hover:bg-slate-200 transition-colors"
            >
              Create New Article
            </motion.button>
            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full text-left px-4 py-3 rounded-xl bg-slate-100 text-slate-700 font-medium hover:bg-slate-200 transition-colors"
            >
              Upload Resource
            </motion.button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}