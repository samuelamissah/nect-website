import Link from "next/link";
import { LayoutDashboard, FileText, Newspaper, Settings, LogOut } from "lucide-react";
import Image from "next/image";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* Sidebar */}
      <aside className="w-64 flex-shrink-0 border-r border-slate-200 bg-white hidden md:flex flex-col">
        <div className="p-6 border-b border-slate-200">
          <Link href="/" className="flex items-center gap-3">
             <div className="h-10 w-full relative">
               <Image src="/NECT.jpeg" alt="NECT Logo" fill className="object-contain object-left mix-blend-multiply" />
             </div>
          </Link>
          <p className="mt-2 text-xs font-bold uppercase tracking-wider text-slate-500">Admin Portal</p>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          <Link href="/admin" className="flex items-center gap-3 rounded-lg bg-slate-100 px-4 py-3 text-sm font-semibold text-brand-primary">
            <LayoutDashboard className="h-5 w-5" />
            Dashboard
          </Link>
          <Link href="/admin/reports" className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-900">
            <FileText className="h-5 w-5" />
            Issue Reports
          </Link>
          <Link href="/admin/news" className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-900">
            <Newspaper className="h-5 w-5" />
            News & Media
          </Link>
          <Link href="#" className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-900">
            <Settings className="h-5 w-5" />
            Settings
          </Link>
        </nav>

        <div className="p-4 border-t border-slate-200">
          <button className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-red-600 hover:bg-red-50">
            <LogOut className="h-5 w-5" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0">
        <header className="h-16 border-b border-slate-200 bg-white flex items-center justify-between px-8">
          <h1 className="text-lg font-bold text-slate-900">System Dashboard</h1>
          <div className="flex items-center gap-4">
             <div className="flex items-center gap-2 text-sm font-medium text-slate-600">
                <div className="h-8 w-8 rounded-full bg-brand-primary text-white flex items-center justify-center">
                   A
                </div>
                Admin User
             </div>
          </div>
        </header>
        <div className="p-8 flex-1 overflow-y-auto">
          {children}
        </div>
      </main>
    </div>
  );
}