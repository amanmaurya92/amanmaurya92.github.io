"use client";

import { Mail, FileText } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer className="relative py-32 bg-[#08090C] text-white overflow-hidden border-t border-white/10 z-10">
      
      <div className="container mx-auto px-4 text-center">
        
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl md:text-6xl font-editorial font-bold mb-8">
            Two skill sets. <span className="text-white/50 italic">One person.</span>
          </h2>
          <p className="text-lg md:text-2xl font-mono text-white/40 mb-20 max-w-4xl mx-auto leading-loose">
            Need someone who can build it? <br className="md:hidden" />
            Need someone who can make it beautiful? <br />
            <span className="text-white">Need someone who can do both?</span>
          </p>
        </motion.div>

        <motion.div
           initial={{ opacity: 0, scale: 0.9 }}
           whileInView={{ opacity: 1, scale: 1 }}
           viewport={{ once: true }}
           transition={{ duration: 0.8, delay: 0.2 }}
           className="relative inline-block group cursor-pointer"
        >
          <div className="absolute inset-0 bg-accent-cyan/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <a 
            href="mailto:amanmaurya9209@gmail.com" 
            className="relative flex items-center justify-center px-12 py-6 md:px-16 md:py-8 bg-white text-black font-bold text-2xl md:text-4xl tracking-tighter hover:bg-accent-cyan transition-colors rounded-sm"
          >
            LET&apos;S WORK TOGETHER
          </a>
        </motion.div>

        <div className="mt-40 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-8 font-mono text-xs md:text-sm text-white/50">
          <p>&copy; {new Date().getFullYear()} Aman. All rights reserved.</p>
          <div className="flex gap-8">
            <a href="https://github.com/amanmaurya92" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors flex items-center gap-2">
              <FaGithub className="w-4 h-4" /> GitHub
            </a>
            <a href="https://www.linkedin.com/in/amanmaurya92096/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors flex items-center gap-2">
              <FaLinkedin className="w-4 h-4" /> LinkedIn
            </a>
            <a href="mailto:amanmaurya9209@gmail.com" className="hover:text-white transition-colors flex items-center gap-2">
              <Mail className="w-4 h-4" /> Email
            </a>
            <a href="#" className="hover:text-white transition-colors flex items-center gap-2">
              <FileText className="w-4 h-4" /> Resume
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
}
