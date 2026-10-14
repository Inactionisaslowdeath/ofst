"use client";

import { motion, MotionValue, useMotionValue, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import type Lenis from "lenis";

const images = [
  "/images/lummi/img15.png",
  "/images/lummi/img21.png",
  "/images/lummi/img3.png",
  "/images/lummi/img4.png",
  "/images/lummi/img5.png",
  "/images/lummi/img6.png",
  "/images/lummi/img7.png",
  "/images/lummi/img8.png",
  "/images/lummi/img24.png",
  "/images/lummi/img10.png",
  "/images/lummi/img11.png",
  "/images/lummi/img12.png",
  "/images/lummi/img13.png",
];

type Skiper30Props = {
  lenis?: Lenis | null;
};

const Skiper30 = ({ lenis }: Skiper30Props) => {
  const gallery = useRef<HTMLDivElement>(null);
  const [dimension, setDimension] = useState({ width: 0, height: 0 });
  const scrollYProgress = useMotionValue(0);

  const { height } = dimension;
  const y = useTransform(scrollYProgress, [0, 1], [0, height * 2]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, height * 3.3]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, height * 1.25]);
  const y4 = useTransform(scrollYProgress, [0, 1], [0, height * 3]);

  useEffect(() => {
    const resize = () => {
      setDimension({ width: window.innerWidth, height: window.innerHeight });
    };

    window.addEventListener("resize", resize);
    resize();

    return () => {
      window.removeEventListener("resize", resize);
    };
  }, []);

  // Synchronize scroll progress directly on Lenis tick (or fallback to native scroll)
  useEffect(() => {
    // Cache layout bounds to prevent layout thrashing / reflow on mobile scroll
    let cachedTop = 0;
    let cachedHeight = 0;

    const measureBounds = () => {
      if (!gallery.current) return;
      const rect = gallery.current.getBoundingClientRect();
      cachedTop = rect.top + window.scrollY;
      cachedHeight = rect.height;
    };

    measureBounds();
    window.addEventListener("resize", measureBounds);

    const updateProgress = (currentScroll?: number) => {
      const scrollY = currentScroll ?? window.scrollY;
      const viewportHeight = window.innerHeight;
      const elementTop = cachedTop || (gallery.current ? gallery.current.getBoundingClientRect().top + window.scrollY : 0);
      const elementHeight = cachedHeight || (gallery.current ? gallery.current.offsetHeight : 0);

      // start end -> end start offset progress
      const start = elementTop - viewportHeight;
      const end = elementTop + elementHeight;
      const total = end - start;

      if (total <= 0) return;
      const progress = Math.max(0, Math.min(1, (scrollY - start) / total));
      scrollYProgress.set(progress);
    };

    updateProgress();

    if (lenis) {
      const handleScroll = (e: { scroll: number }) => {
        updateProgress(e.scroll);
      };
      lenis.on("scroll", handleScroll);
      return () => {
        lenis.off("scroll", handleScroll);
        window.removeEventListener("resize", measureBounds);
      };
    } else {
      const handleNativeScroll = () => {
        updateProgress();
      };
      window.addEventListener("scroll", handleNativeScroll, { passive: true });
      return () => {
        window.removeEventListener("scroll", handleNativeScroll);
        window.removeEventListener("resize", measureBounds);
      };
    }
  }, [lenis, scrollYProgress]);

  return (
    <div className="relative w-screen left-1/2 -translate-x-1/2 overflow-x-hidden">
      <div
        ref={gallery}
        className="relative box-border flex h-[175vh] w-screen gap-[2vw] overflow-hidden bg-white dark:bg-[#09090b] px-[2vw] pt-[2vw] pb-0"
      >
        <Column images={[images[0], images[1], images[2], images[12]]} y={y} />
        <Column images={[images[3], images[4], images[5], images[10]]} y={y2} />
        <Column images={[images[6], images[7], images[8]]} y={y3} className="hidden sm:flex" />
        <Column images={[images[9], images[10], images[11]]} y={y4} className="hidden md:flex" />

        {/* Gallery bottom edge fade */}
        <div
          aria-hidden="true"
          className="hero-gallery-fade"
        />
      </div>
    </div>
  );
};

type ColumnProps = {
  images: string[];
  y: MotionValue<number>;
  className?: string;
};

const Column = ({ images, y, className = "" }: ColumnProps) => {
  return (
    <motion.div
      className={`relative -top-[45%] flex h-full flex-1 w-full flex-col gap-[2vw] first:top-[-45%] [&:nth-child(2)]:top-[-75%] [&:nth-child(3)]:top-[-45%] [&:nth-child(4)]:top-[-75%] will-change-transform [backface-visibility:hidden] [transform:translate3d(0,0,0)] ${className}`}
      style={{ y }}
    >
      {images.map((src, i) => (
        <div
          key={i}
          className={`relative w-full overflow-hidden rounded-[10px] ${
            i === 3 ? "flex sm:hidden h-[calc(25%-70px)]" : "h-[calc(25%-70px)] sm:h-full"
          }`}
        >
          <img
            src={`${src}`}
            alt="image"
            className="pointer-events-none h-full w-full rounded-[10px] object-cover"
          />
        </div>
      ))}
    </motion.div>
  );
};

export { Skiper30 };
export default Skiper30;
