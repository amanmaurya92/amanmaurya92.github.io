"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function WorldBHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Kinetic typography movements
  const x1 = useTransform(scrollYProgress, [0, 1], ["10%", "-50%"]);
  const x2 = useTransform(scrollYProgress, [0, 1], ["-50%", "10%"]);
  const x3 = useTransform(scrollYProgress, [0, 1], ["0%", "-40%"]);

  return (
    <section ref={containerRef} className="relative min-h-[150vh] bg-transparent text-fg-creative overflow-hidden font-editorial pt-32 md:pt-48 z-10">
      
      {/* Centered Hero Text */}
      <div className="container mx-auto px-4 mb-32 relative z-20">
        <h2 className="text-5xl md:text-8xl font-bold tracking-tighter leading-[0.9] max-w-4xl text-fg-creative mix-blend-darken">
          I make brands<br/>
          <span className="text-accent-orange italic">impossible</span> to ignore.
        </h2>
        <p className="mt-8 text-lg md:text-2xl text-fg-creative/60 max-w-xl leading-relaxed">
          Bringing high-end editorial aesthetics and sharp creative direction to digital products and campaigns.
        </p>
      </div>

      {/* Kinetic Typography Marquees */}
      <div className="absolute top-1/2 left-0 w-full flex flex-col gap-2 md:gap-4 opacity-10 pointer-events-none -translate-y-1/2 rotate-[-5deg] scale-110">
        <motion.div style={{ x: x1 }} className="flex whitespace-nowrap text-[15vw] md:text-[10vw] font-bold tracking-tighter uppercase leading-none">
          <span className="mx-8">BRANDING</span>
          <span className="mx-8" style={{ WebkitTextStroke: "2px var(--fg-creative)", color: "transparent" }}>CONTENT</span>
          <span className="mx-8">CAMPAIGNS</span>
          <span className="mx-8" style={{ WebkitTextStroke: "2px var(--fg-creative)", color: "transparent" }}>BRANDING</span>
          <span className="mx-8">CONTENT</span>
        </motion.div>
        
        <motion.div style={{ x: x2, WebkitTextStroke: "2px var(--fg-creative)", color: "transparent" }} className="flex whitespace-nowrap text-[15vw] md:text-[10vw] font-bold tracking-tighter uppercase leading-none">
          <span className="mx-8">ART DIRECTION</span>
          <span className="mx-8 text-fg-creative" style={{ WebkitTextStroke: "0" }}>UI/UX</span>
          <span className="mx-8">TYPOGRAPHY</span>
          <span className="mx-8 text-fg-creative" style={{ WebkitTextStroke: "0" }}>ART DIRECTION</span>
          <span className="mx-8">UI/UX</span>
        </motion.div>

        <motion.div style={{ x: x3 }} className="flex whitespace-nowrap text-[15vw] md:text-[10vw] font-bold tracking-tighter uppercase leading-none">
          <span className="mx-8" style={{ WebkitTextStroke: "2px var(--fg-creative)", color: "transparent" }}>STORYTELLING</span>
          <span className="mx-8">MOTION</span>
          <span className="mx-8" style={{ WebkitTextStroke: "2px var(--fg-creative)", color: "transparent" }}>CANVA</span>
          <span className="mx-8">STORYTELLING</span>
          <span className="mx-8" style={{ WebkitTextStroke: "2px var(--fg-creative)", color: "transparent" }}>MOTION</span>
        </motion.div>
      </div>
    </section>
  );
}
