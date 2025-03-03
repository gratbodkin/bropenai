"use client";
import { useState } from "react";
import ChadGPT from "../components/ChadGPT";

type Brofile = {
  name: string;
  quote: string;
  grind: string;
};

export default function Home() {
  const [brofile, setBrofile] = useState<Brofile | null>(null);
  const [loading, setLoading] = useState(false);

  async function generateBrofile() {
    setLoading(true);
    const res = await fetch("/api/brofile", { method: "POST" });
    const data: Brofile = await res.json();
    setBrofile(data);
    setLoading(false);
  }

  return (
    <main className="relative w-full min-h-screen bg-gray-900 text-white">
      {/* Background Image */}
      <div
        className="absolute top-0 left-0 w-full h-2/3 bg-cover bg-center"
        style={{ backgroundImage: "url('/images/chad-bg.jpg')" }}
      >
        <div className="w-full h-full bg-black/50 flex flex-col items-center justify-center">
          <h1 className="text-5xl font-extrabold text-yellow-400 drop-shadow-lg">
            Welcome to BropenAI
          </h1>
          <p className="text-lg text-gray-300 mt-2">Peak broformance starts here.</p>
        </div>
      </div>
      {
        
      }
      <div className="relative z-10 flex flex-col items-center justify-center pt-[60vh] px-6">
        <ChadGPT />
      </div>
    </main>
  );
}