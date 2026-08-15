"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const works = [
  {
    id: 1,
    client: "Acme Startup",
    role: "Brand Identity",
    image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=1200&q=80",
    layout: "col-span-12 md:col-span-8 aspect-video md:aspect-[16/9] -ml-4 md:-ml-12 md:hover:z-20",
  },
  {
    id: 2,
    client: "LinkedIn Carousel",
    role: "Content Design",
    image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=800&q=80",
    layout: "col-span-12 md:col-span-4 aspect-square md:aspect-[3/4] mt-12 md:mt-48 z-10 md:-ml-8 md:hover:z-20",
  },
  {
    id: 3,
    client: "Global Campaign",
    role: "Art Direction",
    image: "https://images.unsplash.com/photo-1542744094-3a31f272c490?auto=format&fit=crop&w=1200&q=80",
    layout: "col-span-12 md:col-span-10 md:col-start-3 aspect-video md:aspect-[21/9] mt-24 md:hover:z-20",
  }
];

export default function WorldBPortfolio() {
  return (
    <section className="relative py-32 overflow-hidden bg-transparent z-10 font-editorial">
      <div className="container mx-auto px-4 max-w-7xl">
        <h3 className="text-4xl md:text-6xl font-bold mb-24 md:mb-40 tracking-tighter text-fg-creative border-b border-fg-creative/10 pb-8">
          Selected Works
        </h3>

        <div className="grid grid-cols-12 gap-6 md:gap-16 relative">
          {works.map((work) => (
            <motion.div 
              key={work.id}
              className={`relative group cursor-pointer ${work.layout}`}
              initial={{ opacity: 0, y: 100 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <div className="w-full h-full relative overflow-hidden bg-gray-200">
                <Image
                  src={work.image}
                  alt={work.client}
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                />
                
                {/* Overlay that slides in on hover */}
                <div className="absolute inset-0 bg-accent-orange/90 translate-y-[101%] group-hover:translate-y-0 transition-transform duration-500 ease-in-out flex flex-col justify-between p-6 md:p-12">
                  <div className="text-white">
                    <p className="text-xs md:text-sm uppercase tracking-widest font-mono mb-2 md:mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-300">
                      {work.role}
                    </p>
                    <h4 className="text-3xl md:text-6xl font-bold tracking-tighter opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-200">
                      {work.client}
                    </h4>
                  </div>
                  <div className="self-end opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-300">
                    <span className="w-12 h-12 rounded-full border border-white flex items-center justify-center text-white">
                      →
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
