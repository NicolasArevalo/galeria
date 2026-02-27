import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Preloader() {
  const [percent, setPercent] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    let currentPercent = 0;
    const interval = setInterval(() => {
      currentPercent += Math.floor(Math.random() * 15) + 1;
      if (currentPercent >= 100) {
        currentPercent = 100;
        clearInterval(interval);
        setTimeout(() => setIsLoaded(true), 500);
      }
      setPercent(currentPercent);
    }, 150);

    return () => clearInterval(interval);
  }, []);

  // Lock body scroll while preloading
  useEffect(() => {
    if (!isLoaded) {
      document.body.style.overflow = 'hidden';
      if (typeof window !== 'undefined' && window.lenis) window.lenis.stop();
    } else {
      document.body.style.overflow = '';
      if (typeof window !== 'undefined' && window.lenis) window.lenis.start();
    }
    return () => { 
      document.body.style.overflow = ''; 
      if (typeof window !== 'undefined' && window.lenis) window.lenis.start();
    };
  }, [isLoaded]);

  return (
    <AnimatePresence>
      {!isLoaded && (
        <motion.div
          initial={{ y: 0 }}
          exit={{ y: '-100vh' }}
          transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[100] flex h-[100vh] w-full items-end justify-end bg-[#050505] pb-12 pr-20 md:pb-24 md:pr-40 text-white"
        >
          <div className="font-serif text-[10vw] leading-none sm:text-[8vw] md:text-[6vw]">
            {percent}%
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
