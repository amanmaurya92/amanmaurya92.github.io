"use client";

import { useRef, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Landing from "@/components/sections/Landing";
import WorldAHero from "@/components/sections/WorldAHero";
import WorldAProjects from "@/components/sections/WorldAProjects";
import OpenSourceGrid from "@/components/sections/OpenSourceGrid";
import RabbitBase3D from "@/components/sections/RabbitBase3D";
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
    [0, 0.55, 0.65, 0.88, 0.92],
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
      <OpenSourceGrid />
      <RabbitBase3D />
      <WorldTransition />
      <WorldBHero />
      <WorldBPortfolio />
      <Crossover />
      <Footer />
    </motion.main>
  );
}
