"use client";

import { useState } from "react";

export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null);

  async function uploadFile() {
    if (!file) return alert("Choose file");

    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();

    if (data.success) {
      alert("✅ Uploaded!");
    } else {
      alert("❌ Error: " + data.error);
    }
  }

  return (
    <div style={{ textAlign: "center", marginTop: 50 }}>
      <h2>Upload File</h2>

      <input
        type="file"
        onChange={(e) => {
          const selectedFile = e.target.files?.[0] ?? null;
setFile(selectedFile);
        }}
      />

      <br /><br />

      <button onClick={uploadFile}>Upload</button>
    </div>
  );
}