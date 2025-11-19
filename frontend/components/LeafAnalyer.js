'use client';
import { useState } from "react";

export default function LeafAnalyzer() {
  const [preview, setPreview] = useState(null);
  const [result, setResult] = useState("");

  async function analyze(e) {
    const file = e.target.files[0];
    if (!file) return;

    setPreview(URL.createObjectURL(file));

    const form = new FormData();
    form.append("image", file);

    const res = await fetch("/api/gemini/leaf", {
      method: "POST",
      body: form,
    });

    const data = await res.json();
    setResult(data.result);
  }

  return (
    <div className="card" style={{marginTop:12}}>
      <h4>🌿 Leaf Disease Analyzer (AI)</h4>

      <input type="file" accept="image/*" onChange={analyze} />

      {preview && (
        <img src={preview} style={{width:"100%",marginTop:"10px",borderRadius:"10px"}} />
      )}

      {result && (
        <p style={{marginTop:"10px"}}><strong>AI Result:</strong> {result}</p>
      )}
    </div>
  );
}
