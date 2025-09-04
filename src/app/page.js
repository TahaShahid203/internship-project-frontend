"use client";
import { useState } from "react";

export default function PDFEditor() {
  const [file, setFile] = useState(null);
  const [prompt, setPrompt] = useState("");
  const [downloadUrl, setDownloadUrl] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("prompt", prompt);

    const res = await fetch("https://internship-project-backend-1-dafo.onrender.com/api/edit-pdf", {
      method: "POST",
      body: formData,
    });

    const blob = await res.blob();
    const url = URL.createObjectURL(blob);
    setDownloadUrl(url);
  };

  return (
    <main className="p-6">
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={(e) => setFile(e.target.files?.[0] || null)} />
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Enter your edit instruction..."
        />
        <button type="submit">Edit PDF</button>
      </form>

      {downloadUrl && (
        <a href={downloadUrl} download="edited.pdf">Download Edited PDF</a>
      )}
    </main>
  );
}
