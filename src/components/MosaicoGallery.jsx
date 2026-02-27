import React from 'react';
import { motion } from 'framer-motion';
import galleryData from '../data/gallery.json';

const mosaicImages = galleryData.mosaicoGallery;

export default function MosaicoGallery() {
  return (
    <section className="relative w-full bg-[#050505] px-4 py-24 md:px-12 lg:px-24">
      <div className="grid gap-2 md:gap-4 grid-cols-2 md:grid-cols-4 auto-rows-[150px] sm:auto-rows-[200px] md:auto-rows-[250px]">
        {mosaicImages.map((item, i) => {
          return (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="relative overflow-hidden group rounded-sm"
              style={{ gridColumn: item.gridColumn, gridRow: item.gridRow, ...item.style }}
            >
              <img 
                src={item.src} 
                alt={`Mosaic ${i}`} 
                className="w-full h-full object-cover grayscale-0 md:grayscale transition-all duration-700 ease-out group-hover:scale-105 md:group-hover:grayscale-0"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <span className="font-sans text-white text-sm tracking-widest uppercase border border-white px-4 py-2 mix-blend-difference">View</span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
