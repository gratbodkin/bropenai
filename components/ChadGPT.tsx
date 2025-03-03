"use client";
import { useState, useEffect, useRef } from "react";

export default function ChadGPT() {
  const [messages, setMessages] = useState<{ text: string; isUser: boolean }[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement | null>(null);


  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function sendMessage() {
    if (!input.trim()) return;
    setLoading(true);

    // Add user message
    setMessages((prev) => [...prev, { text: input, isUser: true }]);
    setInput("");

    const res = await fetch("/api/chadgpt", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: input }),
    });

    const data = await res.json();

    // Add AI response
    setMessages((prev) => [...prev, { text: data.response, isUser: false }]);
    setLoading(false);
  }

  return (
    <div className="max-w-lg mx-auto p-4 bg-gray-900 text-white rounded-lg shadow-lg border border-gray-700">
      <h2 className="text-2xl font-bold text-center text-yellow-400">🔥 Talk to ChadGPT 🔥</h2>
      <div className="h-64 overflow-y-auto mt-4 p-2 bg-gray-800 rounded-lg">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${msg.isUser ? "justify-end" : "justify-start"} mb-2`}
          >
            <span
              className={`inline-block p-3 rounded-lg max-w-xs text-sm ${msg.isUser ? "bg-blue-600" : "bg-gray-700"}`}
            >
              {msg.text}
            </span>
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>
      <div className="mt-4 flex">
        <input
          type="text"
          className="flex-1 p-2 rounded-l-lg bg-gray-700 text-white outline-none border border-gray-600"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask ChadGPT..."
        />
        <button
          onClick={sendMessage}
          className="bg-yellow-500 px-4 py-2 rounded-r-lg font-bold hover:bg-yellow-600"
          disabled={loading}
        >
          {loading ? "Loading..." : "Send"}
        </button>
      </div>
    </div>
  );
}
