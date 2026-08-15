"use client";

import { motion } from "framer-motion";
import { GitPullRequest, GitMerge, Users, Server, Activity } from "lucide-react";

export default function WorldAOpenSource() {
  return (
    <section className="relative min-h-screen py-32 bg-background z-10">
      <div className="container mx-auto px-4">
        
        {/* Open Source Graph Section */}
        <div className="mb-32">
          <div className="mb-16">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-4">
              Open <span className="text-accent-violet">Source</span>
            </h2>
            <p className="font-mono text-white/40 text-sm uppercase tracking-widest">Meaningful contributions to the ecosystem</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Repo Node 1 */}
            <div className="border border-white/10 bg-surface/30 p-8 rounded-xl hover:border-accent-violet/50 transition-colors group cursor-crosshair">
              <div className="flex justify-between items-start mb-12">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2">swift-java</h3>
                  <p className="text-white/50 text-sm font-mono">Apple / Swift Ecosystem</p>
                </div>
                <GitPullRequest className="w-6 h-6 text-accent-violet opacity-50 group-hover:opacity-100 transition-opacity" />
              </div>
              <div className="flex gap-4">
                <div className="flex-1 h-32 bg-background border border-white/5 rounded flex flex-col justify-end p-3 gap-1 overflow-hidden relative">
                   <div className="absolute top-3 left-3 text-[10px] font-mono text-white/30">CONTRIBUTION GRAPH</div>
                   {/* stylized bar graph */}
                   <div className="w-full flex items-end gap-1 md:gap-2 h-1/2">
                     {[40, 70, 45, 90, 60, 100, 30, 80, 50, 70].map((h, i) => (
                       <motion.div 
                         key={i} 
                         className="flex-1 bg-accent-violet/20 group-hover:bg-accent-violet/80 transition-colors" 
                         style={{ height: `${h}%` }} 
                         initial={{ scaleY: 0 }}
                         whileInView={{ scaleY: 1 }}
                         viewport={{ once: true }}
                         transition={{ delay: i * 0.05, duration: 0.5 }}
                         style-origin="bottom"
                       />
                     ))}
                   </div>
                </div>
              </div>
            </div>

            {/* Repo Node 2 */}
            <div className="border border-white/10 bg-surface/30 p-8 rounded-xl hover:border-accent-cyan/50 transition-colors group cursor-crosshair">
              <div className="flex justify-between items-start mb-12">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2">sourcekit-lsp</h3>
                  <p className="text-white/50 text-sm font-mono">Apple / Swift Ecosystem</p>
                </div>
                <GitMerge className="w-6 h-6 text-accent-cyan opacity-50 group-hover:opacity-100 transition-opacity" />
              </div>
              <div className="flex gap-4">
                 <div className="flex-1 h-32 bg-background border border-white/5 rounded flex flex-col justify-end p-3 gap-1 overflow-hidden relative">
                   <div className="absolute top-3 left-3 text-[10px] font-mono text-white/30">CONTRIBUTION GRAPH</div>
                   {/* stylized bar graph */}
                   <div className="w-full flex items-end gap-1 md:gap-2 h-1/2">
                     {[20, 30, 80, 50, 40, 70, 90, 40, 60, 85].map((h, i) => (
                       <motion.div 
                         key={i} 
                         className="flex-1 bg-accent-cyan/20 group-hover:bg-accent-cyan/80 transition-colors" 
                         style={{ height: `${h}%` }}
                         initial={{ scaleY: 0 }}
                         whileInView={{ scaleY: 1 }}
                         viewport={{ once: true }}
                         transition={{ delay: i * 0.05, duration: 0.5 }}
                         style-origin="bottom" 
                       />
                     ))}
                   </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Rabbit Base Ecosystem */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <div className="mb-16">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-4">
              Rabbit <span className="text-accent-green">Base</span>
            </h2>
            <p className="font-mono text-white/40 text-sm uppercase tracking-widest">Beyond the Code. An autonomous ecosystem.</p>
          </div>

          <div className="relative border border-white/10 bg-surface/50 backdrop-blur-xl rounded-2xl p-8 md:p-12 overflow-hidden group">
            {/* Tech background elements */}
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-accent-green/10 rounded-full blur-3xl pointer-events-none group-hover:bg-accent-green/20 transition-colors duration-700" />
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjAuMDUiLz4KPC9zdmc+')] opacity-20" />
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative z-10">
              <div className="flex flex-col gap-4">
                <div className="w-12 h-12 rounded-lg bg-background border border-white/10 flex items-center justify-center text-accent-green">
                  <Users className="w-5 h-5" />
                </div>
                <h4 className="text-xl font-bold text-white">Community</h4>
                <p className="text-white/50 text-sm leading-relaxed">Fostering a network of builders, engineers, and creators. Open knowledge sharing.</p>
              </div>
              <div className="flex flex-col gap-4">
                <div className="w-12 h-12 rounded-lg bg-background border border-white/10 flex items-center justify-center text-accent-green">
                  <Server className="w-5 h-5" />
                </div>
                <h4 className="text-xl font-bold text-white">Infrastructure</h4>
                <p className="text-white/50 text-sm leading-relaxed">Open tooling and platforms for decentralized development and deployment.</p>
              </div>
              <div className="flex flex-col gap-4">
                <div className="w-12 h-12 rounded-lg bg-background border border-white/10 flex items-center justify-center text-accent-green">
                  <Activity className="w-5 h-5" />
                </div>
                <h4 className="text-xl font-bold text-white">Initiatives</h4>
                <p className="text-white/50 text-sm leading-relaxed">Research and experimental technical projects pushing the boundaries of what is possible.</p>
              </div>
            </div>
          </div>
        </motion.div>
        
      </div>
    </section>
  );
}
