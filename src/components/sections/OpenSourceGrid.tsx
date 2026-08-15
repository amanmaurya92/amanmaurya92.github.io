"use client";

import { motion } from "framer-motion";
import { GitPullRequest, GitMerge, Code2, Terminal } from "lucide-react";

const repositories = [
  { name: "swift-java", org: "Apple / Swift Ecosystem", icon: GitPullRequest, heights: [40, 70, 45, 90, 60, 100, 30, 80] },
  { name: "sourcekit-lsp", org: "Apple / Swift Ecosystem", icon: GitMerge, heights: [20, 30, 80, 50, 40, 70, 90, 40] },
  { name: "sdk", org: "dart-lang", icon: GitPullRequest, heights: [60, 80, 50, 90, 70, 100, 40, 85] },
  { name: "tools", org: "dart-lang", icon: Terminal, heights: [30, 50, 80, 40, 60, 90, 50, 70] },
  { name: "http", org: "dart-lang", icon: Code2, heights: [50, 40, 70, 60, 80, 90, 60, 70] },
  { name: "mantle", org: "flatcar", icon: GitMerge, heights: [40, 60, 30, 80, 50, 70, 90, 60] },
  { name: "nebraska", org: "flatcar", icon: GitPullRequest, heights: [70, 50, 90, 60, 80, 100, 50, 70] }
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  show: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6 }
  }
};

export default function OpenSourceGrid() {
  return (
    <section className="relative min-h-screen py-32 bg-[#0A0A0A] z-10 font-sans">
      <div className="container mx-auto px-4 max-w-6xl">
        
        <div className="mb-16">
          <h2 className="text-4xl md:text-6xl font-bold tracking-tighter text-white mb-4">
            Open <span className="text-[#a855f7]">Source</span>
          </h2>
          <p className="font-mono text-white/40 text-sm uppercase tracking-widest">
            Meaningful contributions to the ecosystem
          </p>
        </div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
        >
          {repositories.map((repo, idx) => {
            const isLeftColumn = idx % 2 === 0;
            const accentText = isLeftColumn ? "text-[#a855f7]" : "text-[#0d9488]";
            const accentBg = isLeftColumn ? "bg-[#a855f7]" : "bg-[#0d9488]";
            const accentBorderHover = isLeftColumn ? "hover:border-[#a855f7]/50" : "hover:border-[#0d9488]/50";

            return (
              <motion.div 
                key={idx} 
                variants={cardVariants}
                className={`border border-white/10 bg-[#111] p-8 rounded-none ${accentBorderHover} transition-colors group cursor-crosshair flex flex-col justify-between min-h-[300px]`}
              >
                <div className="flex justify-between items-start mb-12">
                  <div>
                    <h3 className="text-3xl font-bold text-white mb-2 tracking-tight">{repo.name}</h3>
                    <p className="text-white/50 text-sm font-mono">{repo.org}</p>
                  </div>
                  <repo.icon className={`w-8 h-8 ${accentText} opacity-50 group-hover:opacity-100 transition-opacity`} strokeWidth={1.5} />
                </div>
                
                <div className="flex gap-4 mt-auto">
                  <div className="flex-1 h-32 bg-[#050505] border border-white/5 rounded-none flex flex-col justify-end p-4 gap-2 overflow-hidden relative">
                     <div className="absolute top-3 left-3 text-[10px] font-mono text-white/30">CONTRIBUTION GRAPH</div>
                     
                     <div className="w-full flex items-end justify-between gap-1 h-2/3 mt-6">
                       {repo.heights.map((h, i) => (
                         <motion.div 
                           key={i} 
                           className={`w-full ${accentBg} opacity-30 group-hover:opacity-100 transition-opacity`}
                           style={{ height: `${h}%`, transformOrigin: "bottom" }} 
                           initial={{ scaleY: 0 }}
                           whileInView={{ scaleY: 1 }}
                           viewport={{ once: true }}
                           transition={{ delay: 0.2 + (i * 0.05), duration: 0.5 }}
                         />
                       ))}
                     </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
        
      </div>
    </section>
  );
}
