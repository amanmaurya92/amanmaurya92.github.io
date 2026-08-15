"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function WorldTransition() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const textScale = useTransform(scrollYProgress, [0.2, 0.6], [1, 3]);
  const textOpacity = useTransform(scrollYProgress, [0.2, 0.5, 0.8], [0, 1, 0]);
  const filter = useTransform(scrollYProgress, [0.2, 0.6], ["blur(10px)", "blur(0px)"]);

  return (
    <section 
      ref={containerRef} 
      className="relative h-[250vh] z-20 pointer-events-none"
    >
      <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden">
         <motion.h2 
           className="text-5xl md:text-8xl font-bold text-center px-4 font-editorial tracking-tighter"
           style={{ 
             scale: textScale, 
             opacity: textOpacity,
             filter: filter,
             color: "var(--foreground)" // Changes dynamically if we handle theme swap correctly
           }}
         >
           But code isn&apos;t the<br/>
           <span className="italic font-light">only thing</span> I build.
         </motion.h2>
      </div>
    </section>
  );
}
