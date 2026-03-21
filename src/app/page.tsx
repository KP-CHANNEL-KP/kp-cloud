"use client";

import React, { useState } from 'react';
import {
  HardDrive, Image as ImageIcon, Film, FileText, Upload,
  Loader2, Search, MoreVertical, Plus, LayoutGrid, List,
  Bell, Settings, CheckCircle2, AlertCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Dashboard() {
  const [uploading, setUploading] = useState(false);
  const [showToast, setShowToast] = useState<{
    show: boolean;
    msg: string;
    type: 'success' | 'error';
  }>({ show: false, msg: '', type: 'success' });

  const triggerToast = (msg: string, type: 'success' | 'error') => {
    setShowToast({ show: true, msg, type });
    setTimeout(() => setShowToast({ show: false, msg: '', type: 'success' }), 3200);
  };

  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploading(true);

    // Fake delay - တကယ့် API သုံးရင် ဖယ်ပါ
    await new Promise(resolve => setTimeout(resolve, 2800));

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-950 to-slate-950 text-white flex">
      {/* Toast */}
      <AnimatePresence>
        {showToast.show && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className={`fixed top-6 right-6 z-50 flex items-center gap-3 px-6 py-4 rounded-2xl shadow-2xl backdrop-blur-xl border ${
              showToast.type === 'success'
                ? 'bg-emerald-900/40 border-emerald-500/50 text-emerald-100'
                : 'bg-rose-900/40 border-rose-500/50 text-rose-100'
            }`}
          >
            {showToast.type === 'success' ? (
              <CheckCircle2 className="h-6 w-6 text-emerald-400" />
            ) : (
              <AlertCircle className="h-6 w-6 text-rose-400" />
            )}
            <span className="font-medium">{showToast.msg}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        initial={{ x: -280 }}
        animate={{ x: 0 }}
        className="w-72 bg-black/30 backdrop-blur-xl border-r border-white/5 flex flex-col h-screen sticky top-0"
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

        <nav className="flex-1 px-3 py-6 space-y-1">
          <NavItem icon={<LayoutGrid />} label="All Files" active />
          <NavItem icon={<ImageIcon />} label="Photos" />
          <NavItem icon={<Film />} label="Videos" />
          <NavItem icon={<FileText />} label="Corporate Docs" />
          <div className="h-px bg-white/5 my-4" />
          <NavItem icon={<Bell />} label="Notifications" />
          <NavItem icon={<Settings />} label="Settings" />
        </nav>

        <div className="p-6 border-t border-white/5">
          <div className="text-xs text-slate-400">Powered by Telegram Infrastructure</div>
        </div>
      </motion.aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto p-8">
        <header className="mb-10 flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 to-purple-300">
              Welcome back, KP
            </h2>
            <p className="text-slate-400 mt-1">Your files • {dummyFiles.length} items</p>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search files..."
                className="pl-10 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-full text-sm focus:outline-none focus:border-indigo-500/50 transition w-64 backdrop-blur-sm"
              />
              <Search className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
            </div>
            <button className="p-2.5 rounded-full bg-white/5 hover:bg-white/10 transition">
              <Bell className="h-5 w-5" />
            </button>
          </div>
        </header>

        {/* Upload Zone */}
        <motion.label
          whileHover={{ scale: 1.01 }}
          className={`group relative block p-10 mb-10 rounded-3xl border-2 border-dashed transition-all duration-300 cursor-pointer overflow-hidden
            ${uploading 
              ? 'border-indigo-500/50 bg-indigo-900/20' 
              : 'border-white/20 hover:border-indigo-500/40 bg-white/5 hover:bg-white/10'}`}
        >
          <input type="file" onChange={handleUpload} className="hidden" disabled={uploading} />

          <div className="flex flex-col items-center justify-center text-center gap-4">
            {uploading ? (
              <div className="relative">
                <Loader2 className="h-14 w-14 animate-spin text-indigo-400" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="h-6 w-6 rounded-full bg-indigo-500/30 animate-ping" />
                </div>
              </div>
            ) : (
              <Upload className="h-12 w-12 text-indigo-400 group-hover:text-indigo-300 transition" />
            )}

            <div>
              <p className="text-lg font-semibold">
                {uploading ? "Uploading... Please wait" : "Drop your file here or click to browse"}
              </p>
              <p className="text-sm text-slate-400 mt-1">
                Supports PDF, Images, Videos • Max 2GB
              </p>
            </div>
          </div>
        </motion.label>

        {/* Files Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {uploading && (
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-gradient-to-br from-indigo-900/30 to-purple-900/20 rounded-2xl p-5 border border-indigo-500/30 backdrop-blur-sm animate-pulse"
            >
              <div className="h-40 bg-white/5 rounded-xl mb-4" />
              <div className="h-5 w-3/4 bg-white/10 rounded mb-2" />
              <div className="h-4 w-1/2 bg-white/5 rounded" />
            </motion.div>
          )}

          {dummyFiles.map((file) => (
            <motion.div
              key={file.id}
              whileHover={{ y: -6, scale: 1.03 }}
              className="group bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl overflow-hidden hover:border-indigo-500/40 transition-all duration-300 shadow-xl hover:shadow-2xl"
            >
              <div className="h-40 bg-gradient-to-br from-slate-800 to-slate-900 relative">
                <div className="absolute inset-0 flex items-center justify-center opacity-40 group-hover:opacity-60 transition">
                  <FileText className="h-20 w-20 text-indigo-300/50" />
                </div>
              </div>

              <div className="p-5">
                <div className="flex justify-between items-start">
                  <h3 className="font-medium truncate pr-2">{file.name}</h3>
                  <button className="p-1.5 rounded-lg hover:bg-white/10 opacity-0 group-hover:opacity-100 transition">
                    <MoreVertical className="h-4 w-4" />
                  </button>
                </div>

                <div className="mt-2 text-xs text-slate-400 flex items-center gap-3">
                  <span>Business</span>
                  <span>•</span>
                  <span>{file.size}</span>
                  <span>•</span>
                  <span>{file.date}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </main>
    </div>
  );
}

function NavItem({
  icon,
  label,
  active = false,
}: {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
}) {
  return (
    <motion.button
      whileHover={{ x: 4 }}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all
        ${active
          ? 'bg-gradient-to-r from-indigo-600/30 to-purple-600/20 text-white border-l-4 border-indigo-500'
          : 'text-slate-300 hover:bg-white/5 hover:text-white'}`}
    >
      <div className={`p-2 rounded-lg ${active ? 'bg-indigo-500/20' : 'bg-white/5'}`}>
        {icon}
      </div>
      {label}
    </motion.button>
  );
}