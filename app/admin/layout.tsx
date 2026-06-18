"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { LayoutDashboard, FileText, Newspaper, Settings, LogOut, Lock, Image as ImageIcon, ShieldAlert, Video, FileArchive, Users, Home, Activity, Menu, X } from "lucide-react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Toaster } from "react-hot-toast";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passcode, setPasscode] = useState("");
  const [error, setError] = useState("");
  const [isMounted, setIsMounted] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsMounted(true);
      if (sessionStorage.getItem("nect_admin_auth") === "true") {
        setIsAuthenticated(true);
      }
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple robust protection for the demo/admin portal
    if (passcode === "NECT-ADMIN-2026") {
      sessionStorage.setItem("nect_admin_auth", "true");
      setIsAuthenticated(true);
      setError("");
    } else {
      setError("Invalid secure passcode. Access denied.");
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("nect_admin_auth");
    setIsAuthenticated(false);
  };

  if (!isMounted) return null;

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
        
        <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl relative z-10 animate-in zoom-in-95 duration-500">
          <div className="flex justify-center mb-6">
            <div className="h-16 w-16 bg-red-50 rounded-full flex items-center justify-center border-4 border-red-100">
              <ShieldAlert className="h-8 w-8 text-red-600" />
            </div>
          </div>
          <h1 className="text-2xl font-black text-center text-slate-900 mb-2 tracking-tight">Restricted Access</h1>
          <p className="text-center text-slate-500 mb-8 text-sm">This is a highly secured portal. Please enter the administrative passcode to access the NECT database.</p>
          
          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <input 
                type="password" 
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                placeholder="Enter secure passcode (Try: NECT-ADMIN-2026)" 
                className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-brand-primary focus:ring-4 focus:ring-brand-primary/20 outline-none transition-all font-mono"
              />
            </div>
            {error && <p className="text-red-600 text-sm font-bold text-center bg-red-50 py-2 rounded-md">{error}</p>}
            <button type="submit" className="w-full bg-slate-900 text-white font-bold py-3.5 rounded-lg hover:bg-slate-800 transition-colors shadow-lg shadow-slate-900/20">
              Authenticate
            </button>
          </form>

          <div className="mt-8 text-center">
            <Link href="/" className="text-sm font-semibold text-slate-400 hover:text-slate-600 transition-colors">
              &larr; Return to Public Portal
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const isActive = (path: string) => pathname === path;

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      <Toaster position="top-right" />
      
      {/* Mobile Sidebar Overlay */}
      {isMobileSidebarOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/50 z-40 md:hidden"
          onClick={() => setIsMobileSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 flex-shrink-0 border-r border-slate-200 bg-white flex flex-col h-full transform transition-transform duration-300 md:relative md:translate-x-0 ${isMobileSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-6 border-b border-slate-200 flex items-center justify-between">
          <div>
            <Link href="/" className="flex items-center gap-3">
               <div className="h-10 w-full relative">
                 <Image src="/NECT.jpeg" alt="NECT Logo" fill className="object-contain object-left mix-blend-multiply" />
               </div>
            </Link>
            <p className="mt-2 text-xs font-bold uppercase tracking-wider text-slate-500">Admin Portal</p>
          </div>
          <button className="md:hidden text-slate-500 hover:text-slate-700" onClick={() => setIsMobileSidebarOpen(false)}>
            <X className="h-6 w-6" />
          </button>
        </div>

        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          <p className="px-4 text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 mt-2">Overview</p>
          <Link href="/admin" onClick={() => setIsMobileSidebarOpen(false)} className={`flex items-center gap-3 rounded-lg px-4 py-2 text-sm font-medium transition-colors ${isActive('/admin') ? 'bg-brand-primary text-white font-bold shadow-md' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'}`}>
            <LayoutDashboard className="h-4 w-4" />
            Dashboard
          </Link>
          
          <p className="px-4 text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 mt-6">Content Management</p>
          <Link href="/admin/news" onClick={() => setIsMobileSidebarOpen(false)} className={`flex items-center gap-3 rounded-lg px-4 py-2 text-sm font-medium transition-colors ${isActive('/admin/news') ? 'bg-brand-primary text-white font-bold shadow-md' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'}`}>
            <Newspaper className="h-4 w-4" />
            News & Articles
          </Link>
          <Link href="/admin/videos" onClick={() => setIsMobileSidebarOpen(false)} className={`flex items-center gap-3 rounded-lg px-4 py-2 text-sm font-medium transition-colors ${isActive('/admin/videos') ? 'bg-brand-primary text-white font-bold shadow-md' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'}`}>
            <Video className="h-4 w-4" />
            Video Embeds
          </Link>
          <Link href="/admin/resources" onClick={() => setIsMobileSidebarOpen(false)} className={`flex items-center gap-3 rounded-lg px-4 py-2 text-sm font-medium transition-colors ${isActive('/admin/resources') ? 'bg-brand-primary text-white font-bold shadow-md' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'}`}>
            <FileArchive className="h-4 w-4" />
            Resources & Docs
          </Link>
          <Link href="/admin/gallery" onClick={() => setIsMobileSidebarOpen(false)} className={`flex items-center gap-3 rounded-lg px-4 py-2 text-sm font-medium transition-colors ${isActive('/admin/gallery') ? 'bg-brand-primary text-white font-bold shadow-md' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'}`}>
            <ImageIcon className="h-4 w-4" />
            Media Library
          </Link>
          <Link href="/admin/homepage" onClick={() => setIsMobileSidebarOpen(false)} className={`flex items-center gap-3 rounded-lg px-4 py-2 text-sm font-medium transition-colors ${isActive('/admin/homepage') ? 'bg-brand-primary text-white font-bold shadow-md' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'}`}>
            <Home className="h-4 w-4" />
            Homepage Content
          </Link>

          <p className="px-4 text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 mt-6">Operations</p>
          <Link href="/admin/reports" onClick={() => setIsMobileSidebarOpen(false)} className={`flex items-center gap-3 rounded-lg px-4 py-2 text-sm font-medium transition-colors ${isActive('/admin/reports') ? 'bg-brand-primary text-white font-bold shadow-md' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'}`}>
            <FileText className="h-4 w-4" />
            Citizen Reports
          </Link>
          
          <p className="px-4 text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 mt-6">System</p>
          <Link href="/admin/users" onClick={() => setIsMobileSidebarOpen(false)} className={`flex items-center gap-3 rounded-lg px-4 py-2 text-sm font-medium transition-colors ${isActive('/admin/users') ? 'bg-brand-primary text-white font-bold shadow-md' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'}`}>
            <Users className="h-4 w-4" />
            User Management
          </Link>
          <Link href="/admin/audit" onClick={() => setIsMobileSidebarOpen(false)} className={`flex items-center gap-3 rounded-lg px-4 py-2 text-sm font-medium transition-colors ${isActive('/admin/audit') ? 'bg-brand-primary text-white font-bold shadow-md' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'}`}>
            <Activity className="h-4 w-4" />
            Audit Logs
          </Link>
        </nav>

        <div className="p-4 border-t border-slate-200">
          <button onClick={handleLogout} className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm font-bold text-red-600 hover:bg-red-50 transition-colors">
            <LogOut className="h-5 w-5" />
            Lock Portal
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 h-full overflow-hidden w-full">
        <header className="h-16 flex-shrink-0 border-b border-slate-200 bg-white flex items-center justify-between px-4 sm:px-8">
          <div className="flex items-center gap-3">
            <button 
              className="md:hidden text-slate-600 p-1"
              onClick={() => setIsMobileSidebarOpen(true)}
            >
              <Menu className="h-6 w-6" />
            </button>
            <h1 className="text-lg font-bold text-slate-900 truncate">System Dashboard</h1>
          </div>
          <div className="flex items-center gap-4">
             <div className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm font-medium text-slate-600 bg-slate-50 py-1 sm:py-1.5 px-2 sm:px-3 rounded-full border border-slate-200">
                <div className="h-5 w-5 sm:h-6 sm:w-6 rounded-full bg-brand-primary text-white flex items-center justify-center font-bold text-[10px] sm:text-xs">
                   A
                </div>
                <span className="hidden sm:inline">Admin User</span>
             </div>
          </div>
        </header>
        <div className="p-4 sm:p-8 flex-1 overflow-y-auto">
          {children}
        </div>
      </main>
    </div>
  );
}