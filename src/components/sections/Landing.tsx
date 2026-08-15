"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function Landing() {
  const [hoveredSide, setHoveredSide] = useState<"left" | "right" | null>(null);

  return (
    <section className="relative w-full h-[100dvh] flex flex-col md:flex-row overflow-hidden text-foreground">
      {/* Background that shifts depending on hover */}
      <motion.div
        className="absolute inset-0 z-0 pointer-events-none"
        animate={{
          backgroundColor:
            hoveredSide === "left"
              ? "var(--surface)"
              : hoveredSide === "right"
              ? "var(--bg-creative)"
              : "var(--background)",
        }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      />

      {/* Engineer Side */}
      <motion.div
        className="relative z-10 flex-1 flex flex-col justify-center items-center border-b md:border-b-0 md:border-r border-white/10 cursor-pointer overflow-hidden group"
        onMouseEnter={() => setHoveredSide("left")}
        onMouseLeave={() => setHoveredSide(null)}
        animate={{
          flex: hoveredSide === "left" ? 1.5 : hoveredSide === "right" ? 0.75 : 1,
        }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
      >
        {/* Technical Grid Overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
        
        <div className="flex flex-col items-center">
          <span className="text-accent-cyan font-mono text-xs md:text-sm tracking-widest mb-4">01 &mdash; THE TECHNICAL</span>
          <h2 className="text-6xl md:text-9xl font-bold tracking-tight text-white">ENGINEER</h2>
          <p className="mt-6 text-white/50 max-w-xs text-center opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-100 font-mono text-sm">
            I turn ideas into software. Architecting scalable, high-performance systems.
          </p>
        </div>
      </motion.div>

      {/* Creative Side */}
      <motion.div
        className="relative z-10 flex-1 flex flex-col justify-center items-center cursor-pointer overflow-hidden group"
        onMouseEnter={() => setHoveredSide("right")}
        onMouseLeave={() => setHoveredSide(null)}
        animate={{
          flex: hoveredSide === "right" ? 1.5 : hoveredSide === "left" ? 0.75 : 1,
        }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
      >
        <div className="flex flex-col items-center z-10 relative">
          <motion.span 
            className="text-accent-orange font-mono text-xs md:text-sm tracking-widest mb-4"
            animate={{ color: hoveredSide === "right" ? "var(--accent-orange)" : "rgba(255,255,255,0.7)" }}
          >
            02 &mdash; THE VISUAL
          </motion.span>
          <motion.h2 
            className="text-6xl md:text-9xl font-editorial font-bold tracking-tighter"
            animate={{ color: hoveredSide === "right" ? "var(--fg-creative)" : "rgba(255,255,255,1)" }}
          >
            CREATIVE
          </motion.h2>
          <motion.p 
            className="mt-6 text-white/50 max-w-xs text-center font-editorial text-lg"
            animate={{ 
              opacity: hoveredSide === "right" ? 1 : 0,
              color: hoveredSide === "right" ? "rgba(17,17,17,0.7)" : "rgba(255,255,255,0.5)"
            }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            I make brands impossible to ignore. High-end editorial design and direction.
          </motion.p>
        </div>
      </motion.div>

      {/* Center Message */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none w-[90%] text-center">
        <motion.div 
          className="inline-block bg-background/80 px-8 py-4 md:px-12 md:py-6 rounded-none border border-white/10 backdrop-blur-xl"
          animate={{
            opacity: hoveredSide ? 0 : 1,
            y: hoveredSide ? 20 : 0,
            scale: hoveredSide ? 0.95 : 1,
          }}
          transition={{ duration: 0.4 }}
        >
          <h1 className="text-xl md:text-3xl font-medium tracking-wide">
            I build things. I design things. <br className="md:hidden" />
            <span className="text-white/50 font-editorial italic">Sometimes I do both.</span>
          </h1>
        </motion.div>
      </div>
    </section>
  );
}
