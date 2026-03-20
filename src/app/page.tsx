"use client";

import React, { useState } from 'react';
import { 
  HardDrive, Image, Film, FileText, Upload, 
  Loader2, Search, MoreVertical, Plus, 
  LayoutGrid, List, Bell, Settings, CheckCircle2, AlertCircle
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

  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 260, damping: 20 }
    }
  };

  return (
    <div className="flex h-screen bg-[#020617] text-slate-200 font-sans selection:bg-blue-500/30 overflow-hidden">
      
      {/* 🔔 Toast Notification with Framer Motion */}
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
          <motion.div 
            whileHover={{ rotate: 10, scale: 1.1 }}
            className="w-11 h-11 bg-gradient-to-br from-blue-500 to-indigo-700 rounded-2xl flex items-center justify-center font-black text-white shadow-lg shadow-blue-500/30"
          >
            KP
          </motion.div>
          <h1 className="text-xl font-black tracking-tighter bg-gradient-to-r from-white to-slate-500 bg-clip-text text-transparent uppercase">KP Cloud</h1>
        </div>
        
        <nav className="flex flex-col gap-1.5">
          <NavItem icon={<HardDrive size={18}/>} label="All Files" active />
          <NavItem icon={<Image size={18}/>} label="Photos" />
          <NavItem icon={<Film size={18}/>} label="Videos" />
          <NavItem icon={<FileText size={18}/>} label="Corporate Docs" />
          <div className="my-6 border-t border-white/5 mx-2" />
          <NavItem icon={<Settings size={18}/>} label="Settings" />
        </nav>

        {/* Storage Stats */}
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          className="mt-auto p-5 rounded-[2rem] bg-white/[0.03] border border-white/5"
        >
          <div className="flex justify-between text-xs font-bold mb-3">
            <span className="text-slate-400">STORAGE</span>
            <span className="text-blue-400">75% Used</span>
          </div>
          <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: '75%' }}
              transition={{ duration: 1.5, ease: "circOut" }}
              className="h-full bg-gradient-to-r from-blue-500 to-indigo-500" 
            />
          </div>
          <p className="text-[10px] text-slate-500 mt-3 font-semibold text-center uppercase tracking-widest">Enterprise Plan Active</p>
        </motion.div>
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
            <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className="p-3.5 rounded-2xl bg-white/5 border border-white/10 text-slate-400 hover:text-white transition shadow-xl">
              <Bell size={20} />
            </motion.button>
            <motion.label 
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className={`flex items-center gap-3 px-8 py-4 rounded-[1.5rem] font-black transition-all cursor-pointer shadow-2xl ${
                uploading 
                ? 'bg-slate-800 text-slate-500' 
                : 'bg-blue-600 hover:bg-blue-500 text-white shadow-blue-600/40 border border-blue-400/20'
              }`}
            >
              {uploading ? <Loader2 className="animate-spin" size={20}/> : <Plus size={20}/>}
              {uploading ? "PROCESSING..." : "UPLOAD FILE"}
              <input type="file" className="hidden" onChange={handleUpload} disabled={uploading} />
            </motion.label>
          </div>
        </header>

        <section className="flex-1 p-10 overflow-y-auto">
          <div className="flex items-center justify-between mb-12">
            <div>
              <motion.h2 initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="text-4xl font-black text-white tracking-tighter">KP BUSINESS CLOUD</motion.h2>
              <p className="text-sm font-semibold text-slate-500 mt-2 uppercase tracking-widest">Powered by Telegram Infrastructure</p>
            </div>
          </div>

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-8"
          >
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <motion.div 
                key={i} 
                variants={itemVariants}
                whileHover={{ y: -8 }}
                className="group relative bg-white/[0.03] p-6 rounded-[2.5rem] border border-white/5 hover:bg-white/[0.07] hover:border-blue-500/40 transition-all duration-300 shadow-xl shadow-black/20"
              >
                <div className="h-44 bg-slate-900/60 rounded-[2rem] mb-6 flex items-center justify-center relative overflow-hidden border border-white/5 group-hover:border-blue-500/20 transition-colors">
                  <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <FileText size={64} className="text-slate-800 group-hover:text-blue-500 group-hover:scale-110 transition-all duration-500" />
                </div>
                
                <div className="flex justify-between items-center px-1">
                  <div className="min-w-0">
                    <p className="text-[15px] font-black text-slate-200 truncate group-hover:text-white transition-colors tracking-tight">Financial_Statement_Q{i}.pdf</p>
                    <p className="text-[11px] font-bold text-slate-500 mt-1 uppercase tracking-tighter">Business • 4.2 MB • Just Now</p>
                  </div>
                  <motion.button whileHover={{ scale: 1.2 }} className="p-2 text-slate-600 hover:text-white transition-colors">
                    <MoreVertical size={20}/>
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </section>
      </main>
    </div>
  );
}

function NavItem({ icon, label, active = false }: { icon: any, label: string, active?: boolean }) {
  return (
    <motion.div 
      whileHover={{ x: 6, backgroundColor: 'rgba(255,255,255,0.03)' }}
      whileTap={{ scale: 0.97 }}
      className={`group flex items-center gap-4 px-5 py-4.5 rounded-2xl cursor-pointer transition-all duration-300 border-l-4 ${
        active 
        ? 'bg-blue-600/10 text-blue-400 border-blue-500 shadow-inner shadow-blue-500/10' 
        : 'text-slate-500 hover:text-slate-100 border-transparent hover:border-white/10'
      }`}
    >
      <span className={`${active ? 'text-blue-400' : 'group-hover:text-blue-400'} transition-colors duration-300`}>{icon}</span>
      <span className="font-black text-sm uppercase tracking-tighter">{label}</span>
      {active && (
        <motion.div layoutId="navGlow" className="ml-auto w-1.5 h-1.5 rounded-full bg-blue-500 shadow-[0_0_12px_rgba(59,130,246,0.8)]" />
      )}
    </motion.div>
  );
}
