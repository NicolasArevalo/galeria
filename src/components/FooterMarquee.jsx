import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function FooterMarquee() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const textClass = isMobile 
    ? "pr-10 font-serif text-[28vh] leading-none tracking-tighter mix-blend-difference"
    : "pr-10 font-serif text-[12vw] leading-none tracking-tighter mix-blend-difference";

  return (
    <motion.footer 
      className="relative flex items-center overflow-hidden bg-white text-black sm:h-[40vh] pb-4"
      initial={{ height: "30vh" }}
      whileInView={{ height: "50vh" }}
      viewport={{ margin: "0px 0px -20% 0px" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      <motion.div
        className="flex items-center whitespace-nowrap"
        animate={{
          x: ['0%', '-50%'],
        }}
        transition={{
          repeat: Infinity,
          ease: 'linear',
          duration: 10,
        }}
      >
        <span className={textClass}>
          TRABAJEMOS JUNTOS — TRABAJEMOS JUNTOS — TRABAJEMOS JUNTOS —{' '}
        </span>
        <span className={textClass}>
          TRABAJEMOS JUNTOS — TRABAJEMOS JUNTOS — TRABAJEMOS JUNTOS —{' '}
        </span>
      </motion.div>
    </motion.footer>
  );
}
