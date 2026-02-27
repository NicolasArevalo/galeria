import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import galleryData from '../data/gallery.json';

const images = galleryData.horizontalGallery;

export default function HorizontalGallery() {
  const targetRef = useRef(null);
  const carouselRef = useRef(null);
  const [carouselWidth, setCarouselWidth] = useState(0);

  useEffect(() => {
    const updateWidth = () => {
      if (carouselRef.current) {
        // scrollWidth is total width of children
        // window.innerWidth is what we can see
        // The difference is how much we need to translate X
        const scrollW = carouselRef.current.scrollWidth;
        const viewportW = window.innerWidth;
        setCarouselWidth(scrollW - viewportW);
      }
    };
    
    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  const { scrollYProgress } = useScroll({
    target: targetRef,
    // Start tracking when the top of the container hits the top of the viewport
    // Stop tracking when the bottom of the container hits the bottom of the viewport
  });

  // Calculate X based on the progress
  const x = useTransform(scrollYProgress, [0, 1], ["0px", `-${carouselWidth}px`]);

  return (
    // h-[400vh] creates 300vh of scrollable space while sticky is active
    <section ref={targetRef} className="relative bg-[#050505] w-full" style={{ height: '400vh' }}>
      {/* Sticky container stays in view */}
      <div className="w-full flex items-center" style={{ position: 'sticky', top: 0, height: '100vh', overflow: 'hidden' }}>
        <motion.div ref={carouselRef} style={{ x }} className="flex flex-nowrap gap-[10vw] px-[10vw] w-max">
          {images.map((img, i) => {
            return <GalleryItem key={i} img={img} scrollYProgress={scrollYProgress} index={i} />;
          })}
        </motion.div>
      </div>
    </section>
  );
}

function GalleryItem({ img, index }) {
  return (
    <div className={`relative flex flex-col justify-center ${img.aspect} w-[70vw] sm:w-[50vw] md:w-[35vw] shrink-0`}>
      <motion.div 
        className="group relative h-full w-full overflow-hidden cursor-none"
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <img
          src={img.src}
          alt={`Gallery View ${index}`}
          className="h-full w-full object-contain transition-all duration-700 ease-out group-hover:scale-110 group-hover:grayscale-0 grayscale"
        />
        <div className="absolute inset-0 bg-black/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      </motion.div>
    </div>
  );
}
