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
          if (e.target.files) {
            setFile(e.target.files[0]);
          }
        }}
      />

      <br /><br />

      <button onClick={uploadFile}>Upload</button>
    </div>
  );
}