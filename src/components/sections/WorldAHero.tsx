"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";

const nodes = [
  { id: "IDEA", label: "IDEA" },
  { id: "DESIGN", label: "DESIGN" },
  { id: "FRONTEND", label: "FRONTEND" },
  { id: "BACKEND", label: "BACKEND" },
  { id: "DATABASE", label: "DATABASE" },
  { id: "PRODUCT", label: "PRODUCT" },
];

function SystemNode({
  node,
  index,
  total,
  scrollYProgress,
}: {
  node: { id: string; label: string };
  index: number;
  total: number;
  scrollYProgress: MotionValue<number>;
}) {
  const step = 1 / (total + 1);
  const start = step * (index + 1);
  
  const opacity = useTransform(scrollYProgress, [start - 0.1, start], [0, 1]);
  const y = useTransform(scrollYProgress, [start - 0.1, start], [20, 0]);
  const lineOpacity = useTransform(scrollYProgress, [start + 0.05, start + 0.1], [0, 1]);
  const dotOpacity = useTransform(scrollYProgress, [start, start + 0.05], [0, 1]);

  return (
    <div className="flex flex-col md:flex-row items-center">
      <motion.div
        className="w-24 h-16 md:w-32 md:h-32 border border-white/20 bg-surface/50 backdrop-blur-md flex items-center justify-center rounded-none relative shadow-2xl"
        style={{ opacity, y }}
      >
        <span className="font-mono text-xs md:text-sm text-white/80">{node.label}</span>

        {/* Glowing dot to show activation */}
        <motion.div
          className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-accent-cyan shadow-[0_0_15px_#00E5FF]"
          style={{ opacity: dotOpacity }}
        />
      </motion.div>

      {/* Connecting line */}
      {index < total - 1 && (
        <motion.div
          className="w-1 h-8 md:w-8 md:h-1 bg-accent-cyan/50 my-1 md:my-0 mx-0 md:mx-2"
          style={{ opacity: lineOpacity }}
        />
      )}
    </div>
  );
}

export default function WorldAHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const headerOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
  const headerY = useTransform(scrollYProgress, [0, 0.15], [0, -50]);

  return (
    <section ref={containerRef} className="relative h-[300vh] bg-background">
      <div className="sticky top-0 h-screen flex flex-col items-center justify-center overflow-hidden">
        {/* Subtle Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:60px_60px]" />

        <motion.div
          className="absolute top-1/4 z-10 text-center px-4"
          style={{ opacity: headerOpacity, y: headerY }}
        >
          <h2 className="text-6xl md:text-9xl font-bold tracking-tight text-foreground">
            I turn ideas into <span className="text-accent-cyan">software.</span>
          </h2>
          <p className="mt-6 text-white/40 font-mono text-sm uppercase tracking-widest">
            System Assembly Sequence Initiated
          </p>
        </motion.div>

        {/* Nodes Assembly */}
        <div className="z-10 flex flex-col md:flex-row items-center justify-center w-full max-w-6xl px-4 mt-20 md:mt-0">
          {nodes.map((node, index) => (
            <SystemNode
              key={node.id}
              node={node}
              index={index}
              total={nodes.length}
              scrollYProgress={scrollYProgress}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
