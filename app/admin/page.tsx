import { Activity, FileText, AlertTriangle, Users } from "lucide-react";

export default function AdminDashboard() {
  return (
    <div className="space-y-8">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
              <FileText className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">Total Reports</p>
              <p className="text-2xl font-bold text-slate-900">1,248</p>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-100 text-amber-600">
              <AlertTriangle className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">Pending Review</p>
              <p className="text-2xl font-bold text-slate-900">42</p>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600">
              <Activity className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">Resolved</p>
              <p className="text-2xl font-bold text-slate-900">985</p>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-100 text-purple-600">
              <Users className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">Active Agencies</p>
              <p className="text-2xl font-bold text-slate-900">37</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
         <div className="lg:col-span-2 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-bold text-slate-900 mb-6">Recent Reports</h2>
            <div className="flex items-center justify-center h-64 border-2 border-dashed border-slate-200 rounded-xl bg-slate-50">
               <p className="text-slate-500">Chart / List placeholder</p>
            </div>
         </div>
         
         <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-bold text-slate-900 mb-6">Quick Actions</h2>
            <div className="space-y-3">
               <button className="w-full text-left px-4 py-3 rounded-lg border border-slate-200 hover:border-brand-primary hover:bg-brand-primary/5 transition-colors font-medium text-slate-700">
                  Publish New Article
               </button>
               <button className="w-full text-left px-4 py-3 rounded-lg border border-slate-200 hover:border-brand-primary hover:bg-brand-primary/5 transition-colors font-medium text-slate-700">
                  Review Pending Reports
               </button>
               <button className="w-full text-left px-4 py-3 rounded-lg border border-slate-200 hover:border-brand-primary hover:bg-brand-primary/5 transition-colors font-medium text-slate-700">
                  Generate Monthly Summary
               </button>
            </div>
         </div>
      </div>
    </div>
  );
}