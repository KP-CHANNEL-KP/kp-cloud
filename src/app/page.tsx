"use client";

import React, { useState } from 'react';
import {
  HardDrive, Image as ImageIcon, Film, FileText, Upload,
  Loader2, Search, MoreVertical, LayoutGrid, Bell, Settings,
  CheckCircle2, AlertCircle, Download, Trash2, Share2
} from 'lucide-react';
import { motion, AnimatePresence, Variant } from 'framer-motion';

export default function Dashboard() {
  const [uploading, setUploading] = useState(false);
  const [showToast, setShowToast] = useState<{
    show: boolean;
    msg: string;
    type: 'success' | 'error';
  }>({ show: false, msg: '', type: 'success' });

  const [activeNav, setActiveNav] = useState("All Files");
  const [openMenuId, setOpenMenuId] = useState<number | null>(null);

  const triggerToast = (msg: string, type: 'success' | 'error') => {
    setShowToast({ show: true, msg, type });
    setTimeout(() => setShowToast({ show: false, msg: '', type: 'success' }), 3200);
  };

  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploading(true);
    await new Promise(resolve => setTimeout(resolve, 2800)); // fake delay

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('/api/upload', { method: 'POST', body: formData });
      const data = await response.json();

      if (data.ok) {
        triggerToast("ဖိုင်တင်ခြင်း အောင်မြင်ပါပြီ!", 'success');
      } else {
        triggerToast(data.description || "တင်လို့ မရပါဘူး", 'error');
      }
    } catch (error) {
      triggerToast("Server နဲ့ ချိတ်ဆက်၍ မရပါ", 'error');
    } finally {
      setUploading(false);
    }
  };

  // Dummy files (နောက်ပိုင်း real data နဲ့ အစားထိုး)
  const dummyFiles = [1, 2, 3, 4, 5, 6, 7, 8].map(i => ({
    id: i,
    name: `Corporate_Agreement_V${i}.pdf`,
    size: `${(i * 1.3).toFixed(1)} MB`,
    date: i % 3 === 0 ? 'Just Now' : i % 2 === 0 ? '2 hrs ago' : 'Yesterday',
  }));

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.07, delayChildren: 0.2 }
    }
  };

  const cardVariants: { [key: string]: Variant } = {
    hidden: { opacity: 0, y: 24, scale: 0.94 },
    show: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 140, damping: 18 } }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-950 to-slate-950 text-white flex overflow-hidden">
      {/* Toast - ပိုချောအောင် scale + bounce */}
      <AnimatePresence>
        {showToast.show && (
          <motion.div
            initial={{ opacity: 0, y: -40, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -40, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className={`fixed top-6 right-6 z-50 flex items-center gap-3 px-6 py-4 rounded-2xl shadow-2xl backdrop-blur-xl border font-medium ${
              showToast.type === 'success'
                ? 'bg-emerald-900/50 border-emerald-400/60 text-emerald-100'
                : 'bg-rose-900/50 border-rose-400/60 text-rose-100'
            }`}
          >
            {showToast.type === 'success' ? (
              <CheckCircle2 className="h-6 w-6 text-emerald-400" />
            ) : (
              <AlertCircle className="h-6 w-6 text-rose-400" />
            )}
            {showToast.msg}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        initial={{ x: -300 }}
        animate={{ x: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
        className="w-72 bg-black/35 backdrop-blur-2xl border-r border-white/5 flex flex-col h-screen sticky top-0 z-40"
      >
        <div className="p-6 border-b border-white/5">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg">
              <HardDrive className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight">KP Cloud</h1>
              <p className="text-xs text-slate-400">Business Storage</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 px-3 py-6 space-y-1.5">
          {[
            { icon: <LayoutGrid />, label: "All Files" },
            { icon: <ImageIcon />, label: "Photos" },
            { icon: <Film />, label: "Videos" },
            { icon: <FileText />, label: "Corporate Docs" },
          ].map(item => (
            <NavItem
              key={item.label}
              icon={item.icon}
              label={item.label}
              active={activeNav === item.label}
              onClick={() => setActiveNav(item.label)}
            />
          ))}
          <div className="h-px bg-white/5 my-5" />
          <NavItem icon={<Bell />} label="Notifications" onClick={() => setActiveNav("Notifications")} />
          <NavItem icon={<Settings />} label="Settings" onClick={() => setActiveNav("Settings")} />
        </nav>

        <div className="p-6 border-t border-white/5 text-xs text-slate-500">
          Powered by Telegram Infrastructure
        </div>
      </motion.aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto p-8 pb-20">
        <header className="mb-12 flex items-center justify-between">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 via-purple-300 to-pink-300">
              Welcome back, KP
            </h2>
            <p className="text-slate-400 mt-2">Your files • {dummyFiles.length} items</p>
          </div>

          <div className="flex items-center gap-5">
            <div className="relative group">
              <input
                type="text"
                placeholder="Search files..."
                className="pl-11 pr-5 py-3 bg-white/5 border border-white/10 rounded-full text-sm focus:outline-none focus:border-indigo-500/60 focus:bg-white/10 focus:shadow-[0_0_15px_rgba(99,102,241,0.2)] transition-all w-72 backdrop-blur-md"
              />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 group-focus-within:text-indigo-400 transition" />
            </div>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="p-3 rounded-full bg-white/5 hover:bg-white/15 transition relative"
            >
              <Bell className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 h-4 w-4 bg-rose-500 rounded-full text-[10px] flex items-center justify-center font-bold">3</span>
            </motion.button>
          </div>
        </header>

        {/* Upload Zone - drag over feedback ထည့်ချင်ရင် useDropzone သုံး၊ အခု basic */}
        <motion.label
          whileHover={{ scale: 1.015 }}
          className={`group relative block p-12 mb-12 rounded-3xl border-2 border-dashed transition-all duration-400 cursor-pointer overflow-hidden backdrop-blur-sm
            ${uploading
              ? 'border-indigo-500/60 bg-indigo-900/25 shadow-[0_0_30px_rgba(99,102,241,0.15)]'
              : 'border-white/15 hover:border-indigo-500/50 hover:bg-white/8 hover:shadow-[0_0_25px_rgba(99,102,241,0.1)]'
            }`}
        >
          <input type="file" onChange={handleUpload} className="hidden" disabled={uploading} />

          <div className="flex flex-col items-center justify-center text-center gap-5">
            {uploading ? (
              <div className="relative">
                <Loader2 className="h-16 w-16 animate-spin text-indigo-400" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="h-8 w-8 rounded-full bg-indigo-500/40 animate-ping" />
                </div>
              </div>
            ) : (
              <Upload className="h-14 w-14 text-indigo-400 group-hover:text-indigo-300 transition-transform group-hover:scale-110 duration-400" />
            )}

            <div>
              <p className="text-xl font-semibold">
                {uploading ? "Uploading... ခဏစောင့်ပါ" : "ဖိုင်ကို ဒီနေရာမှာ ချထားပါ သို့မဟုတ် နှိပ်ပါ"}
              </p>
              <p className="text-sm text-slate-400 mt-2">
                PDF, Images, Videos စသည်ဖြင့် • အများဆုံး 2GB
              </p>
            </div>
          </div>
        </motion.label>

        {/* Files Grid - stagger animation */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          {uploading && (
            <motion.div
              variants={cardVariants}
              className="bg-gradient-to-br from-indigo-900/25 to-purple-900/15 rounded-2xl p-5 border border-indigo-500/20 backdrop-blur-md animate-pulse"
            >
              <div className="h-44 bg-white/5 rounded-xl mb-4" />
              <div className="h-5 w-4/5 bg-white/10 rounded mb-3" />
              <div className="h-4 w-3/5 bg-white/5 rounded" />
            </motion.div>
          )}

          {dummyFiles.map(file => (
            <motion.div
              key={file.id}
              variants={cardVariants}
              whileHover={{ y: -8, scale: 1.04, transition: { duration: 0.25 } }}
              className="group relative bg-white/6 backdrop-blur-xl border border-white/8 rounded-2xl overflow-hidden hover:border-indigo-500/50 hover:shadow-2xl transition-all duration-300"
            >
              <div className="h-44 bg-gradient-to-br from-slate-800/80 to-slate-950 relative overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center opacity-50 group-hover:opacity-70 transition-opacity duration-400">
                  <FileText className="h-24 w-24 text-indigo-300/60" />
                </div>
              </div>

              <div className="p-5">
                <div className="flex justify-between items-start relative">
                  <h3 className="font-medium truncate pr-8">{file.name}</h3>
                  <button
                    onClick={() => setOpenMenuId(openMenuId === file.id ? null : file.id)}
                    className="p-2 rounded-lg hover:bg-white/10 transition opacity-0 group-hover:opacity-100 absolute right-0 top-0"
                  >
                    <MoreVertical className="h-5 w-5" />
                  </button>
                </div>

                <div className="mt-3 text-xs text-slate-400 flex flex-wrap gap-3">
                  <span>Business</span>
                  <span>•</span>
                  <span>{file.size}</span>
                  <span>•</span>
                  <span>{file.date}</span>
                </div>
              </div>

              {/* Dropdown Menu */}
              <AnimatePresence>
                {openMenuId === file.id && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.85, y: -8 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.85, y: -8 }}
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                    className="absolute right-4 top-20 z-30 bg-slate-900/95 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl py-2 min-w-[180px] overflow-hidden"
                  >
                    <button className="w-full text-left px-5 py-2.5 hover:bg-white/10 text-sm flex items-center gap-3">
                      <Download className="h-4 w-4" /> Download
                    </button>
                    <button className="w-full text-left px-5 py-2.5 hover:bg-white/10 text-sm flex items-center gap-3">
                      <Share2 className="h-4 w-4" /> Share Link
                    </button>
                    <button className="w-full text-left px-5 py-2.5 hover:bg-white/10 text-sm text-rose-400 flex items-center gap-3">
                      <Trash2 className="h-4 w-4" /> Delete
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.div>
      </main>
    </div>
  );
}

function NavItem({
  icon,
  label,
  active = false,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  onClick?: () => void;
}) {
  return (
    <motion.button
      whileHover={{ x: 6, scale: 1.02 }}
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      className={`group relative w-full flex items-center gap-3.5 px-5 py-3.5 rounded-xl text-sm font-medium transition-all overflow-hidden
        ${active
          ? 'bg-gradient-to-r from-indigo-600/45 to-purple-600/35 text-white shadow-md'
          : 'text-slate-300 hover:text-white hover:bg-white/8'
        }`}
    >
      {/* Shine effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent opacity-0 group-hover:opacity-100 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />

      <div className={`p-2.5 rounded-lg transition-colors ${active ? 'bg-indigo-500/30' : 'bg-white/5 group-hover:bg-white/12'}`}>
        {icon}
      </div>
      <span>{label}</span>

      {active && (
        <motion.div
          layoutId="activeNav"
          className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-8 bg-indigo-400 rounded-r-full"
        />
      )}
    </motion.button>
  );
}