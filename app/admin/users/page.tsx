"use client";

import { useState } from "react";
import { Users, Plus, Edit, Trash2, Shield, Lock, Search } from "lucide-react";

// Mock data for demo purposes since we don't have a real auth API hooked up here
const initialUsers = [
  { id: 1, name: "Kwame Mensah", email: "kmensah@nect.gov.gh", role: "Super Admin", status: "Active", lastLogin: "2 hours ago" },
  { id: 2, name: "Akosua Osei", email: "aosei@nect.gov.gh", role: "Administrator", status: "Active", lastLogin: "1 day ago" },
  { id: 3, name: "Samuel Addo", email: "saddo@nect.gov.gh", role: "Report Officer", status: "Active", lastLogin: "3 days ago" },
  { id: 4, name: "Ama Serwaa", email: "aserwaa@nect.gov.gh", role: "Content Editor", status: "Inactive", lastLogin: "2 weeks ago" },
];

export default function AdminUsers() {
  const [users, setUsers] = useState(initialUsers);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">User Management</h1>
          <p className="text-sm text-slate-500 mt-1">Manage staff access, roles, and permissions.</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-brand-primary text-white text-sm font-bold hover:bg-brand-primary/90 transition-colors shadow-md">
          <Plus className="h-4 w-4" />
          Add New User
        </button>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
        <div className="p-4 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input 
              placeholder="Search users..." 
              className="w-full pl-9 pr-4 py-2 rounded-lg border border-slate-300 text-sm focus:outline-none focus:border-brand-primary"
            />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-white border-b border-slate-200">
              <tr>
                <th className="px-6 py-4 font-semibold text-slate-900">User Details</th>
                <th className="px-6 py-4 font-semibold text-slate-900">Role & Access</th>
                <th className="px-6 py-4 font-semibold text-slate-900">Status</th>
                <th className="px-6 py-4 font-semibold text-slate-900">Last Login</th>
                <th className="px-6 py-4 font-semibold text-slate-900 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-slate-200 flex items-center justify-center font-bold text-slate-600">
                        {user.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <p className="font-bold text-slate-900">{user.name}</p>
                        <p className="text-slate-500 text-xs">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Shield className={`h-4 w-4 ${user.role === 'Super Admin' ? 'text-red-500' : 'text-blue-500'}`} />
                      <span className="font-medium text-slate-700">{user.role}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold ${
                      user.status === 'Active' ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-600'
                    }`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-slate-500 text-xs">
                    {user.lastLogin}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-1.5 text-slate-400 hover:text-amber-600 rounded-md hover:bg-amber-50 transition-colors" title="Reset Password">
                        <Lock className="h-4 w-4" />
                      </button>
                      <button className="p-1.5 text-slate-400 hover:text-brand-primary rounded-md hover:bg-brand-primary/10 transition-colors" title="Edit User">
                        <Edit className="h-4 w-4" />
                      </button>
                      <button className="p-1.5 text-slate-400 hover:text-red-600 rounded-md hover:bg-red-50 transition-colors" title="Disable User">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}