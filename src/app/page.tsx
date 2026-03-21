"use client";

import React, { useState } from 'react';
import {
  HardDrive, Image as ImageIcon, Film, FileText, Upload,
  Loader2, Search, MoreVertical, LayoutGrid, Bell, Settings,
  CheckCircle2, AlertCircle, Download, Trash2, Share2
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

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

  // Dummy files
  const dummyFiles = [1, 2, 3, 4, 5, 6, 7, 8].map(i => ({
    id: i,
    name: `Corporate_Agreement_V${i}.pdf`,
    size: `${(i * 1.3).toFixed(1)} MB`,
    date: i % 3 === 0 ? 'Just Now' : i % 2 === 0 ? '2 hrs ago' : 'Yesterday',
  }));

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.3
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20, scale: 0.96 },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { type: "spring", stiffness: 150, damping: 20 }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950/90 to-purple-950/80 text-white flex overflow-hidden">
      {/* Toast */}
      <AnimatePresence>
        {showToast.show && (
          <motion.div
            initial={{ opacity: 0, y: -60, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -60, scale: 0.92 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            className={`fixed top-5 right-5 z-50 flex items-center gap-3 px-6 py-4 rounded-2xl shadow-2xl backdrop-blur-xl border font-medium ${
              showToast.type === 'success'
                ? 'bg-emerald-900/60 border-emerald-400/50 text-emerald-50'
                : 'bg-rose-900/60 border-rose-400/50 text-rose-50'
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

      {/* Sidebar - ပိုမိုကောင်းတဲ့ glass */}
      <motion.aside
        initial={{ x: -320 }}
        animate={{ x: 0 }}
        transition={{ type: "spring", stiffness: 90, damping: 18 }}
        className="w-72 bg-black/40 backdrop-blur-2xl border-r border-white/5 flex flex-col h-screen sticky top-0 z-40"
      >
        <div className="p-6 border-b border-white/6">
          <div className="flex items-center gap-3">
            <div className="h-11 w-11 rounded-2xl bg-gradient-to-br from-indigo-600/80 to-purple-600/80 flex items-center justify-center shadow-lg">
              <HardDrive className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight">KP Cloud</h1>
              <p className="text-xs text-slate-400 mt-0.5">Business Storage</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 px-4 py-8 space-y-1.5">
          {[
            { icon: <LayoutGrid size={20} />, label: "All Files" },
            { icon: <ImageIcon size={20} />, label: "Photos" },
            { icon: <Film size={20} />, label: "Videos" },
            { icon: <FileText size={20} />, label: "Corporate Docs" },
          ].map(item => (
            <NavItem
              key={item.label}
              icon={item.icon}
              label={item.label}
              active={activeNav === item.label}
              onClick={() => setActiveNav(item.label)}
            />
          ))}

          <div className="h-px bg-white/6 my-6" />

          <NavItem icon={<Bell size={20} />} label="Notifications" onClick={() => setActiveNav("Notifications")} />
          <NavItem icon={<Settings size={20} />} label="Settings" onClick={() => setActiveNav("Settings")} />
        </nav>

        <div className="p-6 border-t border-white/6 text-xs text-slate-500">
          Powered by Telegram Infrastructure
        </div>
      </motion.aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-8 lg:p-10">
        <header className="mb-12 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
          <div>
            <h2 className="text-3xl lg:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-200 via-purple-200 to-pink-200">
              Welcome back, KP
            </h2>
            <p className="text-slate-400 mt-2">Your files • {dummyFiles.length} items</p>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative group w-full sm:w-80">
              <input
                type="text"
                placeholder="Search files..."
                className="w-full pl-11 pr-5 py-3 bg-white/5 border border-white/10 rounded-full text-sm focus:outline-none focus:border-indigo-500/70 focus:bg-white/10 focus:shadow-[0_0_20px_rgba(99,102,241,0.25)] transition-all backdrop-blur-md"
              />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 group-focus-within:text-indigo-400 transition-colors" />
            </div>

            <motion.button
              whileHover={{ scale: 1.12 }}
              whileTap={{ scale: 0.92 }}
              className="p-3 rounded-full bg-white/6 hover:bg-white/15 transition relative flex-shrink-0"
            >
              <Bell className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 h-5 w-5 bg-rose-500 rounded-full text-[11px] flex items-center justify-center font-bold border-2 border-slate-950">3</span>
            </motion.button>
          </div>
        </header>

        {/* Upload Zone */}
        <motion.label
          whileHover={{ scale: 1.008 }}
          className={`group relative block p-14 lg:p-16 mb-14 rounded-3xl border-2 border-dashed transition-all duration-500 cursor-pointer backdrop-blur-xl
            ${uploading
              ? 'border-indigo-500/70 bg-indigo-900/20 shadow-[0_0_40px_rgba(99,102,241,0.2)]'
              : 'border-white/20 hover:border-indigo-500/60 hover:bg-white/5 hover:shadow-[0_0_35px_rgba(99,102,241,0.15)]'
            }`}
        >
          <input type="file" onChange={handleUpload} className="hidden" disabled={uploading} />

          <div className="flex flex-col items-center justify-center text-center gap-6">
            {uploading ? (
              <div className="relative">
                <Loader2 className="h-20 w-20 animate-spin text-indigo-400" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="h-10 w-10 rounded-full bg-indigo-500/30 animate-ping" />
                </div>
              </div>
            ) : (
              <Upload className="h-20 w-20 text-indigo-400/90 group-hover:text-indigo-300 group-hover:scale-110 transition-all duration-500" />
            )}

            <div>
              <p className="text-2xl font-semibold tracking-tight">
                {uploading ? "Uploading... ခဏစောင့်ပါ" : "ဖိုင်ကို ဒီနေရာမှာ ချထားပါ သို့မဟုတ် နှိပ်ပါ"}
              </p>
              <p className="text-base text-slate-300 mt-3 max-w-md">
                PDF, Images, Videos, Audio, Notes စသည်ဖြင့် • အများဆုံး 2GB
              </p>
            </div>
          </div>
        </motion.label>

        {/* Files Grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {uploading && (
            <motion.div
              variants={item}
              className="bg-gradient-to-br from-indigo-900/15 to-purple-900/10 rounded-2xl p-6 border border-indigo-500/15 backdrop-blur-lg animate-pulse"
            >
              <div className="h-48 bg-white/5 rounded-2xl mb-5" />
              <div className="h-6 w-4/5 bg-white/10 rounded mb-4" />
              <div className="h-4 w-3/5 bg-white/5 rounded" />
            </motion.div>
          )}

          {dummyFiles.map(file => (
            <motion.div
              key={file.id}
              variants={item}
              whileHover={{ y: -10, scale: 1.03, transition: { duration: 0.3 } }}
              className="group relative bg-white/4 backdrop-blur-2xl border border-white/8 rounded-2xl overflow-hidden hover:border-indigo-500/60 hover:shadow-2xl transition-all duration-400"
            >
              <div className="h-48 bg-gradient-to-br from-slate-900/70 to-slate-950/70 relative">
                <div className="absolute inset-0 flex items-center justify-center opacity-60 group-hover:opacity-80 transition-opacity duration-500">
                  <FileText className="h-28 w-28 text-indigo-300/70" />
                </div>
              </div>

              <div className="p-6">
                <div className="flex justify-between items-start relative">
                  <h3 className="font-semibold text-lg truncate pr-10 leading-tight">{file.name}</h3>
                  <button
                    onClick={() => setOpenMenuId(openMenuId === file.id ? null : file.id)}
                    className="p-2.5 rounded-xl hover:bg-white/10 transition absolute right-0 top-0 opacity-0 group-hover:opacity-100"
                  >
                    <MoreVertical className="h-5 w-5" />
                  </button>
                </div>

                <div className="mt-4 text-sm text-slate-400 flex flex-wrap gap-3">
                  <span>Business</span>
                  <span>•</span>
                  <span>{file.size}</span>
                  <span>•</span>
                  <span>{file.date}</span>
                </div>
              </div>

              {/* Dropdown */}
              <AnimatePresence>
                {openMenuId === file.id && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: -10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: -10 }}
                    className="absolute right-5 top-28 z-30 bg-slate-900/95 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-2xl py-3 min-w-[200px]"
                  >
                    <button className="w-full text-left px-6 py-3 hover:bg-white/10 text-sm flex items-center gap-3 transition">
                      <Download size={18} /> Download
                    </button>
                    <button className="w-full text-left px-6 py-3 hover:bg-white/10 text-sm flex items-center gap-3 transition">
                      <Share2 size={18} /> Share Link
                    </button>
                    <button className="w-full text-left px-6 py-3 hover:bg-white/10 text-sm text-rose-400 flex items-center gap-3 transition">
                      <Trash2 size={18} /> Delete
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
      whileHover={{ x: 8, scale: 1.03 }}
      whileTap={{ scale: 0.96 }}
      onClick={onClick}
      className={`group relative w-full flex items-center gap-4 px-6 py-4 rounded-2xl text-base font-medium transition-all overflow-hidden
        ${active
          ? 'bg-gradient-to-r from-indigo-600/50 to-purple-600/40 text-white shadow-lg'
          : 'text-slate-300 hover:text-white hover:bg-white/8'
        }`}
    >
      <div className={`p-3 rounded-xl transition-colors ${active ? 'bg-indigo-500/30' : 'bg-white/5 group-hover:bg-white/12'}`}>
        {icon}
      </div>
      <span>{label}</span>

      {active && (
        <motion.div
          layoutId="activeIndicator"
          className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-10 bg-gradient-to-b from-indigo-400 to-purple-400 rounded-r-full"
        />
      )}

      {/* Shine */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
    </motion.button>
  );
}