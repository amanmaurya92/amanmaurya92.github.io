"use client";

import { Trophy, Home, Compass } from "lucide-react";

export default function RabbitBase3D() {
  return (
    <section className="relative w-full min-h-[120vh] bg-[#0052ff] z-10 font-sans overflow-hidden">
      
      {/* Brutalist Grid Background overlay pattern */}
      <div className="absolute inset-0 pointer-events-none z-0 opacity-20"
           style={{ backgroundImage: 'linear-gradient(#000 2px, transparent 2px), linear-gradient(90deg, #000 2px, transparent 2px)', backgroundSize: '40px 40px' }} 
      />

      {/* Sketchfab Embed Layer with CSS Cropping to hide forced UI */}
      <div className="absolute inset-0 z-30 overflow-hidden pointer-events-none">
        <div className="absolute inset-[-100px] w-[calc(100%+200px)] h-[calc(100%+200px)]">
          <iframe 
            title="Poly Art Rabbit" 
            frameBorder="0" 
            allowFullScreen 
            allow="autoplay; fullscreen; xr-spatial-tracking" 
            src="https://sketchfab.com/models/ad9e198fb4ed4dd8a8970b541b4ae8e4/embed?autostart=1&transparent=1&ui_theme=dark&ui_controls=0&ui_infos=0&ui_stop=0&ui_animations=0&ui_watermark=0&ui_hint=0&ui_settings=0&ui_vr=0&ui_help=0&ui_inspector=0"
            className="w-full h-full border-none outline-none"
          />
        </div>
      </div>

      {/* Foreground UI Overlay */}
      <div className="container mx-auto px-4 pt-32 pb-48 relative z-20 pointer-events-none flex items-center min-h-[100vh]">
        
        {/* Main Brutalist Info Card */}
        <div className="pointer-events-auto max-w-xl bg-white border-4 border-black p-8 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
          <div className="border-b-4 border-black pb-6 mb-6">
            <h2 className="text-5xl md:text-7xl font-bold tracking-tighter text-[#0052ff] uppercase mb-2">
              Rabbit Base
            </h2>
            <div className="inline-block bg-[#ff4d00] text-white font-bold px-3 py-1 text-sm md:text-base border-2 border-black tracking-widest uppercase">
              Open Source Organization
            </div>
          </div>
          
          <p className="text-black font-medium text-lg md:text-xl leading-relaxed mb-8">
            Building autonomous developer tooling, transparent metric tracking, and scalable infrastructure for the open-source community. No soft edges.
          </p>

          {/* Metrics Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="border-2 border-black p-4 bg-[#0a0a0a] text-white">
              <div className="text-[10px] font-mono text-white/50 mb-1">ACTIVE REPOS</div>
              <div className="text-3xl font-black text-[#ff4d00]">42</div>
              <div className="text-xs font-mono mt-2">swift-java, sourcekit</div>
            </div>
            <div className="border-2 border-black p-4 bg-[#0052ff] text-white">
              <div className="text-[10px] font-mono text-white/50 mb-1">CONTRIBUTORS</div>
              <div className="text-3xl font-black text-white">1,492</div>
              <div className="text-xs font-mono mt-2">GLOBAL NETWORK</div>
            </div>
          </div>
        </div>

      </div>


      
    </section>
  );
}
