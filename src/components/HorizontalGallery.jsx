import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import galleryData from '../data/gallery.json';

const images = galleryData.horizontalGallery;

export default function HorizontalGallery() {
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const updateSize = () => setIsMobile(window.innerWidth < 768);
    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  // Avoid hydration mismatch by waiting to render the correct layout
  if (!mounted) return <div style={{ height: '400vh' }} className="w-full bg-[#050505]" />;

  return isMobile ? <MobileGallery /> : <DesktopGallery />;
}

function MobileGallery() {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: targetRef });

  // Map scroll progress to X positions (sliding in from the left)
  // Making breakpoints overlap to eliminate dead time / resistance
  const xImg1 = useTransform(scrollYProgress, [0, 0.35], ["-120vw", "0vw"]);
  const xImg2 = useTransform(scrollYProgress, [0.2, 0.55], ["-120vw", "0vw"]);
  const xImg3 = useTransform(scrollYProgress, [0.4, 0.75], ["-120vw", "0vw"]);
  const xImg4 = useTransform(scrollYProgress, [0.6, 0.95], ["-120vw", "0vw"]);

  // Opacity fading in slightly faster than sliding
  const opImg1 = useTransform(scrollYProgress, [0, 0.25], [0, 1]);
  const opImg2 = useTransform(scrollYProgress, [0.2, 0.45], [0, 1]);
  const opImg3 = useTransform(scrollYProgress, [0.4, 0.65], [0, 1]);
  const opImg4 = useTransform(scrollYProgress, [0.6, 0.85], [0, 1]);

  return (
    <section ref={targetRef} className="relative bg-[#050505] w-full" style={{ height: '350vh' }}>
      <div className="w-full flex items-center justify-center relative" style={{ position: 'sticky', top: 0, height: '100vh', overflow: 'hidden' }}>
        
        {/* Img 0 - Appears immediately */}
        <motion.div 
          className="absolute shadow-[0_10px_30px_rgba(0,0,0,0.8)] z-10" 
          style={{ top: '8vh', right: '5vw', width: '50vw', rotate: 3 }}
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          <img src={images[0].src} className="w-full h-auto object-contain grayscale-0 transition duration-700" />
        </motion.div>

        {/* Img 1 - Slides from left */}
        <motion.div 
          className="absolute shadow-[0_10px_30px_rgba(0,0,0,0.8)] z-20" 
          style={{ top: '22vh', left: '4vw', width: '55vw', x: xImg1, opacity: opImg1, rotate: -2 }}
        >
          <img src={images[1].src} className="w-full h-auto object-contain grayscale-0 transition duration-700" />
        </motion.div>

        {/* Img 2 - Slides from left */}
        <motion.div 
          className="absolute shadow-[0_10px_30px_rgba(0,0,0,0.8)] z-30" 
          style={{ top: '42vh', right: '8vw', width: '60vw', x: xImg2, opacity: opImg2, rotate: 2 }}
        >
          <img src={images[2].src} className="w-full h-auto object-contain grayscale-0 transition duration-700" />
        </motion.div>

        {/* Img 3 - Slides from left */}
        <motion.div 
          className="absolute shadow-[0_10px_30px_rgba(0,0,0,0.8)] z-40" 
          style={{ top: '60vh', left: '8vw', width: '50vw', x: xImg3, opacity: opImg3, rotate: -3 }}
        >
          <img src={images[3].src} className="w-full h-auto object-contain grayscale-0 transition duration-700" />
        </motion.div>

        {/* Img 4 - Slides from left */}
        <motion.div 
          className="absolute shadow-[0_10px_30px_rgba(0,0,0,0.8)] z-50" 
          style={{ bottom: '8vh', right: '4vw', width: '65vw', x: xImg4, opacity: opImg4, rotate: 1 }}
        >
          <img src={images[4].src} className="w-full h-auto object-contain grayscale-0 transition duration-700" />
        </motion.div>

      </div>
    </section>
  );
}

function DesktopGallery() {
  const targetRef = useRef(null);
  const carouselRef = useRef(null);
  const [carouselWidth, setCarouselWidth] = useState(0);

  useEffect(() => {
    const updateWidth = () => {
      if (carouselRef.current) {
        const scrollW = carouselRef.current.scrollWidth;
        const viewportW = window.innerWidth;
        setCarouselWidth(scrollW - viewportW);
      }
    };
    
    updateWidth();
    // Use a small delay for correct layout measurement on render
    setTimeout(updateWidth, 100);
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  const { scrollYProgress } = useScroll({ target: targetRef });
  const x = useTransform(scrollYProgress, [0, 1], ["0px", `-${carouselWidth}px`]);

  return (
    <section ref={targetRef} className="relative bg-[#050505] w-full" style={{ height: '400vh' }}>
      <div className="w-full flex items-center" style={{ position: 'sticky', top: 0, height: '100vh', overflow: 'hidden' }}>
        <motion.div ref={carouselRef} style={{ x }} className="flex flex-nowrap gap-[10vw] px-[10vw] w-max">
          {images.map((img, i) => (
            <GalleryItem key={i} img={img} index={i} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function GalleryItem({ img, index }) {
  return (
    <div className={`relative flex flex-col justify-center ${img.aspect} w-[35vw] shrink-0`}>
      <motion.div 
        className="group relative h-full w-full overflow-hidden cursor-none"
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <img
          src={img.src}
          alt={`Gallery View ${index}`}
          className="h-full w-full object-contain transition-all duration-700 ease-out group-hover:scale-110 md:group-hover:grayscale-0 grayscale-0 md:grayscale"
        />
        <div className="absolute inset-0 bg-black/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      </motion.div>
    </div>
  );
}
