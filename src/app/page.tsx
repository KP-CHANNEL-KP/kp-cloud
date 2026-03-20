"use client";

import React, { useState } from 'react';
import { HardDrive, Image, Film, FileText, Upload, Loader2, Search, MoreVertical } from 'lucide-react';

export default function Dashboard() {
  const [uploading, setUploading] = useState(false);

  // Upload Logic
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
        alert("✅ Telegram ဆီသို့ ဖိုင်တင်ခြင်း အောင်မြင်သည်!");
      } else {
        alert("❌ Error: " + (data.description || "တင်လို့မရပါ"));
      }
    } catch (error) {
      alert("❌ Server နှင့် ချိတ်ဆက်၍မရပါ");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="flex h-screen bg-[#0f172a] text-slate-200 font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-[#1e293b] p-6 flex flex-col gap-8 border-r border-slate-700">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center font-bold text-white">KP</div>
          <h1 className="text-xl font-bold tracking-tight">KP Cloud</h1>
        </div>
        
        <nav className="flex flex-col gap-2">
          <NavItem icon={<HardDrive size={20}/>} label="All Files" active />
          <NavItem icon={<Image size={20}/>} label="Photos" />
          <NavItem icon={<Film size={20}/>} label="Videos" />
          <NavItem icon={<FileText size={20}/>} label="Notes" />
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-20 border-b border-slate-700 flex items-center justify-between px-8 bg-[#0f172a]/50 backdrop-blur-md">
          <div className="relative w-96">
            <Search className="absolute left-3 top-2.5 text-slate-500" size={18} />
            <input 
              type="text" 
              placeholder="Search your files..." 
              className="w-full bg-slate-800/50 border border-slate-700 p-2 pl-10 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>
          
          <label className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-medium transition cursor-pointer ${uploading ? 'bg-slate-700' : 'bg-blue-600 hover:bg-blue-500'}`}>
            {uploading ? <Loader2 className="animate-spin" size={18}/> : <Upload size={18}/>}
            {uploading ? "Uploading..." : "Upload"}
            <input type="file" className="hidden" onChange={handleUpload} disabled={uploading} />
          </label>
        </header>

        {/* Content Area */}
        <section className="flex-1 p-8 overflow-y-auto">
          <h2 className="text-lg font-semibold mb-6">Recent Files</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {/* Example Card */}
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="group bg-[#1e293b] p-4 rounded-2xl border border-slate-700 hover:border-blue-500/50 transition duration-300">
                <div className="h-32 bg-slate-800 rounded-xl mb-4 flex items-center justify-center group-hover:bg-slate-700 transition">
                  <FileText size={48} className="text-slate-500 group-hover:text-blue-400" />
                </div>
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm font-medium truncate w-32">Sample_File_{i}.pdf</p>
                    <p className="text-xs text-slate-500 mt-1">1.2 MB</p>
                  </div>
                  <button className="text-slate-500 hover:text-white"><MoreVertical size={16}/></button>
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
    <div className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all ${active ? 'bg-blue-600/10 text-blue-500' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}>
      {icon}
      <span className="font-medium">{label}</span>
    </div>
  );
}