
'use client';
import { useState } from "react";

export default function AIChatBot() {
  const [msg, setMsg] = useState("");
  const [chat, setChat] = useState([]);
  const [loading, setLoading] = useState(false);

  async function sendMessage() {
    if (!msg.trim()) return;

    const userMsg = { sender: "You", text: msg };
    setChat(prev => [...prev, userMsg]);
    setLoading(true);

    const res = await fetch("/api/gemini/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: msg }),
    });

    const data = await res.json();
    const botMsg = { sender: "AI", text: data.reply };

    setChat(prev => [...prev, botMsg]);
    setMsg("");
    setLoading(false);
  }

  return (
    <div className="card" style={{marginTop:12}}>
      <h4>🌾 AI Farming Assistant</h4>
      <div style={{height:"240px",overflowY:"auto",padding:"8px",border:"1px solid #ddd",borderRadius:"8px"}}>
        {chat.map((c,i)=>(
          <p key={i} style={{textAlign:c.sender==="You"?"right":"left"}}>
            <strong>{c.sender}: </strong>{c.text}
          </p>
        ))}
        {loading && <p>Thinking...</p>}
      </div>

      <input 
        value={msg}
        onChange={e=>setMsg(e.target.value)}
        placeholder="Ask your farming question..."
        style={{width:"100%",padding:"10px",marginTop:"10px"}}
      />

      <button className="btn" style={{marginTop:"10px"}} onClick={sendMessage}>
        Send
      </button>
    </div>
  );
}
