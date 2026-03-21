"use client";

import React, { useState } from 'react';
import { 
  HardDrive, Image as ImageIcon, Film, FileText, Upload, 
  Loader2, Search, MoreVertical, Plus, 
  LayoutGrid, List, Bell, Settings, CheckCircle2, AlertCircle,
  Music, StickyNote // 👈 Icon အသစ်များ ထည့်သွင်းထားသည်
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

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
    // Loading animation ကို မြင်ရအောင် fake delay ထည့်ထားခြင်း (လိုအပ်ပါက ဖြုတ်နိုင်သည်)
    await new Promise(resolve => setTimeout(resolve, 3000)); 

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      
      // route.ts logic နဲ့ ကိုက်ညီအောင် data.success ကို စစ်ထားပါသည်
      if (data.success) {
        triggerToast("ဖိုင်တင်ခြင်း အောင်မြင်သည်!", 'success');
      } else {
        triggerToast(data.error || "တင်လို့မရပါ", 'error');
      }
    } catch (error) {
      triggerToast("Server နှင့် ချိတ်ဆက်၍မရပါ", 'error');
    } finally {
      setUploading(false);
    }
  };

  const dummyFiles = [1, 2, 3, 4, 5, 6, 7, 8].map(i => ({
    id: i,
    name: `Corporate_Agreement_V${i}.pdf`,
    size: `${(i * 1.2).toFixed(1)} MB`,
    date: 'Just Now'
  }));

  return (
    <div className="flex h-screen bg-[#020617] text-slate-200 font-sans selection:bg-blue-500/30 overflow-hidden">
      
      {/* 🔔 Toast Notification */}
      <AnimatePresence>
        {showToast.show && (
          <motion.div 
            initial={{ x: 300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 300, opacity: 0 }}
            className={`fixed top-6 right-6 z-50 flex items-center gap-3 px-6 py-4 rounded-2xl border backdrop-blur-2xl shadow-2xl ${
              showToast.type === 'success' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' : 'bg-rose-500/10 border-rose-500/20 text-rose-400'
            }`}
          >
            {showToast.type === 'success' ? <CheckCircle2 size={22}/> : <AlertCircle size={22}/>}
            <span className="font-bold tracking-tight">{showToast.msg}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 📁 Sidebar */}
      <aside className="w-72 bg-[#0f172a]/40 backdrop-blur-3xl p-6 flex flex-col gap-8 border-r border-white/5 shadow-2xl">
        <div className="flex items-center gap-3 px-2">
          <div className="w-11 h-11 bg-gradient-to-br from-blue-500 to-indigo-700 rounded-2xl flex items-center justify-center font-black text-white shadow-lg shadow-blue-500/30">KP</div>
          <h1 className="text-xl font-black tracking-tighter bg-gradient-to-r from-white to-slate-500 bg-clip-text text-transparent uppercase">KP Cloud</h1>
        </div>
        
        <nav className="flex flex-col gap-1.5">
          <NavItem icon={<HardDrive size={18}/>} label="All Files" active />
          <NavItem icon={<ImageIcon size={18}/>} label="Photos" />
          <NavItem icon={<Film size={18}/>} label="Videos" />
          
          {/* 👇 အသစ်ထည့်ထားသော Audio နှင့် Notes item များ */}
          <NavItem icon={<Music size={18}/>} label="Audio" />
          <NavItem icon={<StickyNote size={18}/>} label="Notes" />
          
          <NavItem icon={<FileText size={18}/>} label="Corporate Docs" />
          <div className="my-6 border-t border-white/5 mx-2" />
          <NavItem icon={<Settings size={18}/>} label="Settings" />
        </nav>
      </aside>

      {/* 🚀 Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-blue-600/10 via-transparent to-transparent">
        
        <header className="h-24 flex items-center justify-between px-10 border-b border-white/5 backdrop-blur-md">
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-blue-500 transition-colors" size={18} />
            <input 
              type="text" 
              placeholder="Search business files..." 
              className="w-[400px] bg-white/5 border border-white/10 p-4 pl-12 rounded-[1.5rem] focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:bg-white/10 transition-all font-medium text-sm"
            />
          </div>
          
          <div className="flex items-center gap-4">
            <motion.label 
              whileHover={uploading ? {} : { scale: 1.02, y: -2 }}
              whileTap={uploading ? {} : { scale: 0.98 }}
              className={`flex items-center gap-3 px-8 py-4 rounded-[1.5rem] font-black transition-all cursor-pointer shadow-2xl ${
                uploading 
                ? 'bg-slate-800 text-slate-500 border border-white/5' 
                : 'bg-blue-600 hover:bg-blue-500 text-white shadow-blue-600/40 border border-blue-400/20'
              }`}
            >
              {uploading ? (
                <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }}>
                  <Loader2 size={20}/>
                </motion.div>
              ) : <Plus size={20}/>}
              {uploading ? "PROCESSING..." : "UPLOAD FILE"}
              <input type="file" className="hidden" onChange={handleUpload} disabled={uploading} />
            </motion.label>
          </div>
        </header>

        <section className="flex-1 p-10 overflow-y-auto">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-4xl font-black text-white tracking-tighter">KP BUSINESS CLOUD</h2>
              <p className="text-sm font-semibold text-slate-500 mt-2 uppercase tracking-widest">Powered by Telegram Infrastructure</p>
            </div>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-8">
            <AnimatePresence>
              {uploading && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  className="bg-white/[0.015] p-6 rounded-[2.5rem] border-2 border-dashed border-blue-500/20 flex flex-col items-center justify-center h-[300px]"
                >
                  <div className="relative mb-6">
                    <motion.div 
                      animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="absolute -inset-4 bg-blue-500/20 rounded-full blur-xl"
                    />
                    <FileText size={64} className="text-blue-500" />
                  </div>
                  <p className="text-xs font-bold text-blue-400 uppercase tracking-widest animate-pulse">Uploading...</p>
                </motion.div>
              )}
            </AnimatePresence>

            {dummyFiles.map((file) => (
              <motion.div 
                key={file.id} 
                whileHover={{ y: -8 }}
                className="group relative bg-white/[0.03] p-6 rounded-[2.5rem] border border-white/5 hover:bg-white/[0.07] hover:border-blue-500/40 transition-all duration-300 shadow-xl shadow-black/20"
              >
                <div className="h-44 bg-slate-900/60 rounded-[2rem] mb-6 flex items-center justify-center relative border border-white/5">
                  <FileText size={64} className="text-slate-800 group-hover:text-blue-500 group-hover:scale-110 transition-all duration-500" />
                </div>
                
                <div className="flex justify-between items-center px-1">
                  <div className="min-w-0">
                    <p className="text-[15px] font-black text-slate-200 truncate group-hover:text-white transition-colors tracking-tight">{file.name}</p>
                    <p className="text-[11px] font-bold text-slate-500 mt-1 uppercase tracking-tighter">Business • {file.size} • {file.date}</p>
                  </div>
                  <button className="p-2 text-slate-600 hover:text-white transition-colors">
                    <MoreVertical size={20}/>
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

function NavItem({ icon, label, active = false }: { icon: any, label: string, active?: boolean }) {
  return (
    <div className={`group flex items-center gap-4 px-5 py-4.5 rounded-2xl cursor-pointer transition-all duration-300 border-l-4 ${
      active 
      ? 'bg-blue-600/10 text-blue-400 border-blue-500 shadow-inner' 
      : 'text-slate-500 hover:text-slate-100 border-transparent hover:border-white/10'
    }`}>
      <span className={`${active ? 'text-blue-400' : 'group-hover:text-blue-400'} transition-colors duration-300`}>{icon}</span>
      <span className="font-black text-sm uppercase tracking-tighter">{label}</span>
    </div>
  );
}