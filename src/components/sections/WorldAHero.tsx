"use client";

import { motion } from "framer-motion";

const skills = [
  "IDEA",
  "DESIGN",
  "FRONTEND",
  "BACKEND",
  "DATABASE",
  "PRODUCT"
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

export default function WorldAHero() {
  return (
    <section className="relative min-h-screen bg-[#0A0A0A] flex flex-col justify-center items-start px-4 md:px-16 overflow-hidden z-10 font-sans">
      
      {/* Brutalist Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px]" />

      <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col items-start">
        
        {/* Main Typographic Hook */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-8"
        >
          <h1 className="text-[12vw] md:text-[9vw] font-black tracking-tight leading-[0.95] text-white uppercase select-none">
            I TURN <br />
            IDEAS INTO <br />
            <span className="text-[#0052ff] drop-shadow-[4px_4px_0px_#ffffff]">SOFTWARE.</span>
          </h1>
        </motion.div>

        {/* Subtitle / Description */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        >
          <p className="font-mono text-white/60 max-w-2xl text-base md:text-xl uppercase border-l-4 border-[#0052ff] pl-6 py-2 bg-[#111]/50 backdrop-blur-sm shadow-[4px_4px_0px_0px_#000000]">
            System Assembly Sequence Initiated. Engineering robust, scalable infrastructure from concept to deployment. No soft edges.
          </p>
        </motion.div>

        {/* Brutalist Tags */}
        <motion.div 
          className="flex gap-3 md:gap-4 mt-12 md:mt-20 flex-wrap"
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          {skills.map((skill) => (
            <motion.div 
              key={skill} 
              variants={itemVariants}
              className="border-2 border-white/20 px-6 py-3 font-mono text-sm md:text-base text-white/80 hover:border-[#0052ff] hover:text-[#0052ff] transition-colors cursor-crosshair bg-[#050505] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_#0052ff] hover:-translate-y-1 transform duration-200"
            >
              {skill}
            </motion.div>
          ))}
        </motion.div>
        
      </div>
    </section>
  );
}
