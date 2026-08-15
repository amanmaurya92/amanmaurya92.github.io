"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const engSkills = ["React", "Next.js", "TypeScript", "Rust", "Node.js", "PostgreSQL", "gRPC", "Docker", "AWS", "WebGL"];
const creativeSkills = ["Figma", "Typography", "Art Direction", "Motion Design", "Cinema 4D", "Brand Identity", "Photography", "Copywriting"];

export default function Crossover() {
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  return (
    <section className="relative py-32 md:py-48 bg-[#111111] text-[#F5F0E8] overflow-hidden z-10">
      
      {/* Abstract overlapping shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[40vw] h-[40vw] rounded-full bg-accent-cyan/10 blur-[120px]" />
        <div className="absolute top-1/2 right-1/4 translate-x-1/2 -translate-y-1/2 w-[40vw] h-[40vw] rounded-full bg-accent-orange/10 blur-[120px]" />
      </div>

       <div className="container mx-auto px-4 text-center relative z-10">
         <motion.div
           initial={{ opacity: 0, y: 50 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 0.8 }}
         >
           <h2 className="text-4xl md:text-7xl font-bold font-editorial tracking-tighter mb-8">
             WHERE CODE MEETS DESIGN
           </h2>
           <p className="text-sm md:text-lg font-mono opacity-70 mb-24 uppercase tracking-widest text-accent-cyan">
             Designed by me. Built by me. <span className="text-accent-orange">Shipped by me.</span>
           </p>
         </motion.div>

         <div className="flex flex-col md:flex-row justify-center gap-16 md:gap-32 relative text-left">
            {/* Engineering */}
            <motion.div 
              className="flex-1"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
               <h3 className="text-xl md:text-2xl font-mono font-bold mb-8 text-white/50 border-b border-white/10 pb-4">
                 Engineering Toolkit
               </h3>
               <div className="flex flex-wrap gap-3">
                 {engSkills.map(skill => (
                   <span 
                     key={skill}
                     onMouseEnter={() => setHoveredSkill(skill)}
                     onMouseLeave={() => setHoveredSkill(null)}
                     className={`px-4 py-2 rounded-none border border-white/20 font-mono text-xs md:text-sm transition-all duration-300 cursor-crosshair
                       ${hoveredSkill === skill 
                         ? 'bg-accent-cyan text-black border-accent-cyan shadow-[0_0_15px_rgba(0,229,255,0.4)]' 
                         : 'hover:bg-white/5'}`}
                   >
                     {skill}
                   </span>
                 ))}
               </div>
            </motion.div>

            {/* Creative */}
            <motion.div 
              className="flex-1"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
               <h3 className="text-2xl md:text-3xl font-editorial font-bold mb-8 text-white/50 border-b border-white/10 pb-4">
                 Creative Toolkit
               </h3>
               <div className="flex flex-wrap gap-3">
                 {creativeSkills.map(skill => (
                   <span 
                     key={skill}
                     onMouseEnter={() => setHoveredSkill(skill)}
                     onMouseLeave={() => setHoveredSkill(null)}
                     className={`px-6 py-2 rounded-none border border-white/20 font-editorial text-lg md:text-xl transition-all duration-300 cursor-crosshair
                       ${hoveredSkill === skill 
                         ? 'bg-accent-orange text-white border-accent-orange shadow-[0_0_15px_rgba(255,77,0,0.4)]' 
                         : 'hover:bg-white/5'}`}
                   >
                     {skill}
                   </span>
                 ))}
               </div>
            </motion.div>
         </div>
       </div>
    </section>
  );
}
