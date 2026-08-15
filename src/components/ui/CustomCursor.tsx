"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isPointer, setIsPointer] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      
      const target = e.target as HTMLElement;
      setIsPointer(
        window.getComputedStyle(target).cursor === "pointer" ||
        target.tagName.toLowerCase() === "a" ||
        target.tagName.toLowerCase() === "button" ||
        target.closest("a") !== null ||
        target.closest("button") !== null
      );
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Hydration mismatch prevention: only render on client
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <motion.div
      className="pointer-events-none fixed left-0 top-0 z-[9999] hidden h-6 w-6 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-[1.5px] border-white mix-blend-difference md:flex"
      animate={{
        x: position.x,
        y: position.y,
        scale: isPointer ? 1.5 : 1,
        backgroundColor: isPointer ? "rgba(255,255,255,1)" : "rgba(255,255,255,0)",
      }}
      transition={{
        type: "spring",
        stiffness: 150,
        damping: 15,
        mass: 0.1,
      }}
    />
  );
}
