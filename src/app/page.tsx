"use client";

import { useRef, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Landing from "@/components/sections/Landing";
import WorldAHero from "@/components/sections/WorldAHero";
import WorldAProjects from "@/components/sections/WorldAProjects";
import WorldAOpenSource from "@/components/sections/WorldAOpenSource";
import WorldTransition from "@/components/sections/WorldTransition";
import WorldBHero from "@/components/sections/WorldBHero";
import WorldBPortfolio from "@/components/sections/WorldBPortfolio";
import Crossover from "@/components/sections/Crossover";
import Footer from "@/components/sections/Footer";

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Calculate when we hit the transition section to change the global background
  const backgroundColor = useTransform(
    scrollYProgress,
    [0, 0.45, 0.55, 0.75, 0.80],
    ["#08090C", "#08090C", "#F5F0E8", "#F5F0E8", "#111111"]
  );

  // We enforce scroll restoration to top on mount for consistent animations
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <motion.main 
      ref={containerRef} 
      className="relative w-full"
      style={{ backgroundColor }}
    >
      <Landing />
      <WorldAHero />
      <WorldAProjects />
      <WorldAOpenSource />
      <WorldTransition />
      <WorldBHero />
      <WorldBPortfolio />
      <Crossover />
      <Footer />
    </motion.main>
  );
}
