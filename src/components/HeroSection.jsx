import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion';
import galleryData from '../data/gallery.json';

export default function HeroSection() {
  const { scrollY, scrollYProgress } = useScroll();
  const [isAtBottom, setIsAtBottom] = useState(false);

  // Trigger pulse animation when scrolled near the bottom
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    // A lower threshold prevents trackpad scroll "elasticity" fights
    if (latest >= 0.96) {
      if (!isAtBottom) setIsAtBottom(true);
    } else {
      if (isAtBottom) setIsAtBottom(false);
    }
  });

  // Map vertical scroll from 0px to 100px. Opacity goes from 100% to 50%
  const logoOpacity = useTransform(scrollY, [0, 100], [1, 0.5]);

  const [paddingX, setPaddingX] = useState('2.5rem');
  const [paddingY, setPaddingY] = useState('3rem');

  useEffect(() => {
    const updatePadding = () => {
      if (window.innerWidth < 768) {
        setPaddingX('1rem');
        setPaddingY('1.5rem');
      } else {
        setPaddingX('2.5rem');
        setPaddingY('3rem');
      }
    };
    
    updatePadding();
    window.addEventListener('resize', updatePadding);
    return () => window.removeEventListener('resize', updatePadding);
  }, []);

  return (
    <section className="relative h-screen w-full overflow-hidden bg-[#050505] text-white">
      <motion.div 
        className="fixed z-50 pointer-events-auto" 
        style={{ top: paddingY, left: paddingX, opacity: logoOpacity }}
      >
        <a href="https://galeria.niiico.com" className="block w-2.5 h-2.5 md:w-4 md:h-4 hover:scale-105 transition-transform origin-top-left">
          <svg xmlns="http://www.w3.org/2000/svg" fill="#ededed" viewBox="0 0 280 280" className="w-full h-full object-contain">
            <title>niiico.com</title>
            <polygon points="92 277 117.5 78.5 163 141.5 186.5 3.5 182 216.5 132 153 92 277"/>
          </svg>
        </a>
      </motion.div>
      <div className="fixed z-50 mix-blend-difference" style={{ top: paddingY, right: paddingX }}>
        <motion.a 
          href="https://niiico.com/sobre-mi" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="inline-block font-sans text-sm md:text-base tracking-[0.2em] text-[#FAF9F6] no-underline opacity-80 transition-all duration-200 pointer-events-auto"
          whileHover={{ opacity: 1, scale: 1.05, textShadow: "0px 0px 8px rgba(255,255,255,0.8)" }}
          whileTap={{ scale: 0.95 }}
        >
          SOBRE MÍ
        </motion.a>
      </div>
      <motion.div 
        className="fixed z-50 mix-blend-difference" 
        style={{ bottom: paddingY, left: paddingX }}
        animate={{
          x: isAtBottom ? `calc(50vw - ${paddingX} - 50%)` : "0px",
          y: isAtBottom ? "-15vh" : "0px",
        }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <motion.a 
          href="mailto:contacto@niiico.com" 
          className="inline-block font-sans text-sm md:text-base tracking-[0.2em] text-[#FAF9F6] no-underline opacity-80 hover:opacity-100 transition-all duration-300 pointer-events-auto text-center"
          animate={{
            padding: isAtBottom ? "14px 32px" : "0px",
            border: isAtBottom ? "1px solid #FAF9F6" : "0px solid transparent",
            borderRadius: isAtBottom ? "9999px" : "0px",
            scale: isAtBottom ? 1.3 : 1,
            backgroundColor: isAtBottom ? "#FAF9F6" : "transparent",
            color: isAtBottom ? "#050505" : "#FAF9F6"
          }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          whileHover={isAtBottom ? { backgroundColor: "#050505", color: "#FAF9F6" } : { textShadow: "0px 0px 8px rgba(255,255,255,0.8)" }}
        >
          CONTÁCTAME
        </motion.a>
      </motion.div>
      <div className="fixed z-[60] pointer-events-none" style={{ bottom: paddingY, right: paddingX }}>
        <div className="flex flex-col items-center justify-center gap-1">
          {/* Bouncing Dot */}
          <motion.div 
            className="rounded-full"
            style={{ width: '6px', height: '6px', backgroundColor: '#FAF9F6' }}
            // Animate on Y axis: starts at 0, bounces up to -15px (higher), falls back to 0.
            animate={{ y: [0, -15, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          />
          {/* Triangle */}
          <div 
            style={{
              width: 0,
              height: 0,
              borderLeft: '5px solid transparent',
              borderRight: '5px solid transparent',
              borderTop: '7px solid #FAF9F6',
              marginTop: '4px'
            }} 
          />
        </div>
      </div>

      {/* Main Content Layering */}
      <div className="relative flex h-full w-full items-center justify-center">
        {/* Background Text Container */}
        <motion.div 
          className="absolute z-10 w-full text-center mix-blend-difference"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, delay: 0.5, ease: 'easeOut' }}
        >
          <h1 className="font-serif font-bold text-[15vw] leading-none tracking-tight uppercase whitespace-nowrap">
            NICOLÁS
          </h1>
        </motion.div>

        {/* Foreground Image Subject */}
        {/* We use an image with a transparent background (PNG) for the layered effect */}
        <motion.div 
          className="relative z-20 h-[80vh] w-[80vw] max-w-2xl md:h-[90vh]"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.8, ease: 'easeOut' }}
        >
          <img
            src={galleryData.heroImage.src}
            alt={galleryData.heroImage.alt}
            className="h-full w-full object-cover object-center grayscale drop-shadow-2xl"
            style={{ clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)' }}
          />
        </motion.div>

        {/* Foreground Text Container (overlaps image) */}
        <motion.div 
          className="absolute z-30 w-full text-center pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 1, ease: 'easeOut' }}
        >
          <h1 className="font-serif font-bold text-[15vw] leading-none tracking-tight text-transparent mix-blend-overlay uppercase select-none whitespace-nowrap" style={{ WebkitTextStroke: '2px rgba(255,255,255,0.8)' }}>
            NICOLÁS
          </h1>
        </motion.div>
      </div>
    </section>
  );
}
