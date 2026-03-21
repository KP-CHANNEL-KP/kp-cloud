"use client";

import React, { useState } from "react";
import {
  HardDrive, Image as ImageIcon, Film, FileText,
  Loader2, Search, MoreVertical, Plus,
  Settings, CheckCircle2, AlertCircle
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Dashboard() {
  const [uploading, setUploading] = useState(false);
  const [toast, setToast] = useState({ show: false, msg: "", type: "success" });

  const showToast = (msg: string, type: "success" | "error") => {
    setToast({ show: true, msg, type });
    setTimeout(() => setToast({ show: false, msg: "", type: "success" }), 3000);
  };

  const handleUpload = async (e: any) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();

      if (data.success) showToast("Upload success!", "success");
      else showToast("Upload failed!", "error");
    } catch {
      showToast("Server error!", "error");
    } finally {
      setUploading(false);
    }
  };

  const files = Array.from({ length: 8 }).map((_, i) => ({
    id: i,
    name: `Corporate_File_${i}.pdf`,
    size: `${(i + 1) * 1.2} MB`,
  }));

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.08 } },
  };

  const item = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex h-screen bg-gradient-to-br from-[#020617] via-[#020617] to-blue-900/20 text-white overflow-hidden"
    >

      {/* 🔔 Toast */}
      <AnimatePresence>
        {toast.show && (
          <motion.div
            initial={{ x: 200, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 200, opacity: 0 }}
            className="fixed top-6 right-6 z-50 px-6 py-4 rounded-2xl backdrop-blur-xl border border-white/10 bg-white/10 shadow-xl"
          >
            {toast.type === "success" ? <CheckCircle2 /> : <AlertCircle />}
            <span className="ml-2">{toast.msg}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <aside className="w-72 p-6 backdrop-blur-xl bg-white/5 border-r border-white/10">
        <h1 className="text-xl font-bold mb-8">KP CLOUD</h1>

        <Nav label="All Files" icon={<HardDrive />} active />
        <Nav label="Photos" icon={<ImageIcon />} />
        <Nav label="Videos" icon={<Film />} />
        <Nav label="Docs" icon={<FileText />} />
        <Nav label="Settings" icon={<Settings />} />
      </aside>

      {/* Main */}
      <main className="flex-1 p-8 overflow-y-auto">

        {/* Top */}
        <div className="flex justify-between mb-10">
          <input
            placeholder="Search..."
            className="w-96 p-4 rounded-2xl bg-white/10 backdrop-blur-lg border border-white/10"
          />

          <motion.label
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            animate={{
              boxShadow: ["0 0 0px #3b82f6", "0 0 20px #3b82f6", "0 0 0px #3b82f6"]
            }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="px-6 py-4 bg-blue-600 rounded-2xl cursor-pointer flex items-center gap-2"
          >
            {uploading ? <Loader2 className="animate-spin" /> : <Plus />}
            Upload
            <input type="file" hidden onChange={handleUpload} />
          </motion.label>
        </div>

        {/* Title */}
        <h2 className="text-3xl font-bold mb-8">KP BUSINESS CLOUD</h2>

        {/* Grid */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {files.map((f) => (
            <motion.div
              key={f.id}
              variants={item}
              whileHover={{ scale: 1.05, y: -5 }}
              className="p-6 rounded-3xl backdrop-blur-xl bg-white/5 border border-white/10 hover:border-blue-500 transition-all"
            >
              <div className="h-32 flex items-center justify-center">
                <FileText size={50} />
              </div>

              <p className="mt-4 font-bold truncate">{f.name}</p>
              <p className="text-sm text-gray-400">{f.size}</p>
            </motion.div>
          ))}
        </motion.div>

      </main>
    </motion.div>
  );
}

function Nav({ label, icon, active = false }: any) {
  return (
    <motion.div
      whileHover={{ x: 6 }}
      className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer mb-2 ${
        active ? "bg-blue-600/30" : "hover:bg-white/10"
      }`}
    >
      {icon}
      {label}
    </motion.div>
  );
}