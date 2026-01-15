"use client";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export const HeroRight = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(0);

  // Carousel images data
  const carouselImages = [
    { id: 1, url: "/hero/art1.jpg", title: "Abstract Art" },
    { id: 2, url: "/hero/art2.webp", title: "Portrait" },
    { id: 3, url: "/hero/art3.jpg", title: "Landscape" },
    { id: 4, url: "/hero/art2.webp", title: "Modern Art" },
  ];

  const nextSlide = () => {
    setDirection(1);
    setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrentSlide(
      (prev) => (prev - 1 + carouselImages.length) % carouselImages.length
    );
  };

  const getVisibleSlides = () => {
    const slides = [];
    for (let i = 0; i < 3; i++) {
      const index = (currentSlide + i) % carouselImages.length;
      slides.push({ ...carouselImages[index], position: i });
    }
    return slides;
  };

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 100 : -100,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -100 : 100,
      opacity: 0,
    }),
  };

  return (
    <div className="md:w-1/2 w-full relative h-96 px-5">
      <button
        onClick={prevSlide}
        className="absolute left-8 top-1/2 -translate-y-1/2 z-30 bg-[#FFFFFF99] bg-opacity-50 hover:bg-opacity-70 text-white p-3 rounded-full transition-all"
      >
        <ChevronLeft size={24} />
      </button>

      <div className="flex items-center justify-center h-full gap-4 relative overflow-x-hidden">
        <AnimatePresence initial={false} custom={direction} mode="popLayout">
          {getVisibleSlides().map((slide, idx) => (
            <motion.div
              key={`${slide.id}-${currentSlide}`}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
              }}
              className={`relative group shrink-0 ${
                idx === 0
                  ? "h-full w-2/5 z-20 scale-100"
                  : idx === 1
                  ? "h-4/5 w-1/3 z-10 scale-95"
                  : "h-4/5 w-[10%] z-0 opacity-70 scale-90"
              }`}
            >
              <Image
                src={slide.url}
                alt={slide.title}
                width={400}
                height={400}
                className="w-full h-full object-cover rounded-lg shadow-lg"
              />
              {idx !== 2 && (
                <div className="absolute inset-0 bg-black/25 bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 rounded-lg flex items-end justify-center pb-6 opacity-0 group-hover:opacity-100">
                  <button className="bg-[#707070A8] backdrop-blur-lg text-white w-full px-6 py-2 rounded-lg font-semibold transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    View More{" "}
                    <ArrowRight className="inline-block ml-2" size={16} />
                  </button>
                </div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <button
        onClick={nextSlide}
        className="absolute right-8 top-1/2 -translate-y-1/2 z-30 bg-[#FFFFFF99] bg-opacity-50 hover:bg-opacity-70 text-white p-3 rounded-full transition-all"
      >
        <ChevronRight size={24} />
      </button>
    </div>
  );
};
