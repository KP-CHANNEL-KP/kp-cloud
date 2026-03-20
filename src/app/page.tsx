"use client";

import React, { useState } from 'react';
import { 
  HardDrive, Image, Film, FileText, Upload, 
  Loader2, Search, MoreVertical, Plus, 
  LayoutGrid, List, Bell, Settings, CheckCircle2, AlertCircle
} from 'lucide-react';

export default function Dashboard() {
  const [uploading, setUploading] = useState(false);
  const [showToast, setShowToast] = useState<{show: boolean, msg: string, type: 'success' | 'error'}>({
    show: false, msg: '', type: 'success'
  });

  const triggerToast = (msg: string, type: 'success' | 'error') => {
    setShowToast({ show: true, msg, type });
    setTimeout(() => setShowToast({ show: false, msg: '', type: 'success' }), 3000);
  };

  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      
      if (data.ok) {
        triggerToast("Telegram ဆီသို့ ဖိုင်တင်ခြင်း အောင်မြင်သည်!", 'success');
      } else {
        triggerToast(data.description || "တင်လို့မရပါ", 'error');
      }
    } catch (error) {
      triggerToast("Server နှင့် ချိတ်ဆက်၍မရပါ", 'error');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="flex h-screen bg-[#020617] text-slate-200 font-sans selection:bg-blue-500/30">
      
      {/* Toast Notification */}
      {showToast.show && (
        <div className={`fixed top-6 right-6 z-50 flex items-center gap-3 px-5 py-3 rounded-2xl border backdrop-blur-xl animate-in slide-in-from-right-full duration-300 ${
          showToast.type === 'success' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' : 'bg-rose-500/10 border-rose-500/20 text-rose-400'
        }`}>
          {showToast.type === 'success' ? <CheckCircle2 size={20}/> : <AlertCircle size={20}/>}
          <span className="text-sm font-medium">{showToast.msg}</span>
        </div>
      )}

      {/* Sidebar - Glassmorphism style */}
      <aside className="w-72 bg-[#0f172a]/40 backdrop-blur-xl p-6 flex flex-col gap-8 border-r border-white/5">
        <div className="flex items-center gap-3 px-2">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center font-black text-white shadow-lg shadow-blue-500/20 tracking-tighter">KP</div>
          <h1 className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">KP Cloud</h1>
        </div>
        
        <nav className="flex flex-col gap-1.5">
          <NavItem icon={<HardDrive size={18}/>} label="All Files" active />
          <NavItem icon={<Image size={18}/>} label="Photos" />
          <NavItem icon={<Film size={18}/>} label="Videos" />
          <NavItem icon={<FileText size={18}/>} label="Notes" />
          <div className="my-4 border-t border-white/5 mx-2" />
          <NavItem icon={<Settings size={18}/>} label="Settings" />
        </nav>

        {/* Storage Stats Card */}
        <div className="mt-auto p-4 rounded-2xl bg-gradient-to-b from-white/5 to-transparent border border-white/5">
          <p className="text-xs font-medium text-slate-400 mb-2">Telegram Storage</p>
          <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
            <div className="h-full w-3/4 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full" />
          </div>
          <p className="text-[10px] text-slate-500 mt-2">Unlimited Cloud Storage Active</p>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-blue-900/10 via-transparent to-transparent">
        
        {/* Top Header */}
        <header className="h-24 flex items-center justify-between px-10 border-b border-white/5">
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-blue-500 transition-colors" size={18} />
            <input 
              type="text" 
              placeholder="Search files..." 
              className="w-96 bg-white/5 border border-white/10 p-3 pl-12 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:bg-white/10 transition-all placeholder:text-slate-600"
            />
          </div>
          
          <div className="flex items-center gap-4">
            <button className="p-3 rounded-2xl bg-white/5 border border-white/10 text-slate-400 hover:text-white hover:bg-white/10 transition">
              <Bell size={20} />
            </button>
            <label className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-bold transition-all cursor-pointer shadow-lg active:scale-95 ${
              uploading 
              ? 'bg-slate-800 text-slate-500 border border-white/5' 
              : 'bg-blue-600 hover:bg-blue-500 text-white shadow-blue-600/20 border border-blue-400/20'
            }`}>
              {uploading ? <Loader2 className="animate-spin" size={20}/> : <Plus size={20}/>}
              {uploading ? "Uploading..." : "New Upload"}
              <input type="file" className="hidden" onChange={handleUpload} disabled={uploading} />
            </label>
          </div>
        </header>

        {/* Content Area */}
        <section className="flex-1 p-10 overflow-y-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-white tracking-tight">Recent Files</h2>
              <p className="text-sm text-slate-500">Manage and organize your personal cloud storage</p>
            </div>
            <div className="flex bg-white/5 p-1 rounded-xl border border-white/5">
               <button className="p-2 bg-blue-600 rounded-lg shadow-lg"><LayoutGrid size={16}/></button>
               <button className="p-2 text-slate-500 hover:text-white"><List size={16}/></button>
            </div>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="group relative bg-white/[0.03] p-5 rounded-[2rem] border border-white/5 hover:bg-white/[0.06] hover:border-blue-500/30 transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl hover:shadow-blue-500/10">
                <div className="h-40 bg-slate-900/50 rounded-[1.5rem] mb-5 flex items-center justify-center group-hover:scale-[1.02] transition-transform duration-500 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <FileText size={56} className="text-slate-700 group-hover:text-blue-400 transition-colors duration-500" />
                </div>
                
                <div className="flex justify-between items-center">
                  <div className="min-w-0">
                    <p className="text-sm font-bold text-slate-300 truncate group-hover:text-white transition-colors">Important_Doc_{i}.pdf</p>
                    <p className="text-[11px] font-medium text-slate-500 mt-1 uppercase tracking-wider">2.4 MB • Today</p>
                  </div>
                  <button className="p-2 text-slate-600 hover:text-white hover:bg-white/5 rounded-xl transition">
                    <MoreVertical size={18}/>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

function NavItem({ icon, label, active = false }: { icon: any, label: string, active?: boolean }) {
  return (
    <div className={`group flex items-center gap-3.5 px-4 py-3.5 rounded-2xl cursor-pointer transition-all duration-300 ${
      active 
      ? 'bg-blue-600/10 text-blue-400 border border-blue-500/10 shadow-inner' 
      : 'text-slate-500 hover:bg-white/5 hover:text-slate-200 border border-transparent hover:border-white/5'
    }`}>
      <span className={`${active ? 'text-blue-400' : 'group-hover:text-blue-400'} transition-colors`}>{icon}</span>
      <span className="font-semibold text-[15px]">{label}</span>
      {active && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]" />}
    </div>
  );
}
