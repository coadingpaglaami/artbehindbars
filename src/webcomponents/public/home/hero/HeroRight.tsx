"use client";
import { ArrowRight, ChevronLeft, ChevronRight, Lock } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { useGetArtworks } from "@/api/gallary";
import { useAuth } from "@/api/auth";

export const HeroRight = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(0);
  const { push } = useRouter();
  const { data, isLoading } = useGetArtworks({
    page: 1,
    limit: 4,
  });
  const { isAuthenticated } = useAuth();

  const artworks = data?.data || [];

  const nextSlide = () => {
    setDirection(1);
    setCurrentSlide((prev) => (prev + 1) % artworks.length);
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrentSlide((prev) => (prev - 1 + artworks.length) % artworks.length);
  };

  const getVisibleSlides = () => {
    if (artworks.length === 0) return [];

    const slides = [];
    for (let i = 0; i < Math.min(3, artworks.length); i++) {
      const index = (currentSlide + i) % artworks.length;
      slides.push({ ...artworks[index], position: i });
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

  const handleViewDetails = (artworkId: string, isSold: boolean) => {
    if (isSold) return; // Don't navigate if sold

    if (!isAuthenticated) {
      push("/login");
    } else {
      push(`/product/${artworkId}`);
    }
  };

  if (isLoading) {
    return (
      <div className="md:w-1/2 w-full relative h-96 px-5 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (artworks.length === 0) {
    return (
      <div className="md:w-1/2 w-full relative h-96 px-5 flex items-center justify-center">
        <p className="text-gray-500">No artworks available</p>
      </div>
    );
  }

  const visibleSlides = getVisibleSlides();

  return (
    <div className="md:w-1/2 w-full relative h-96 px-5">
      {artworks.length > 1 && (
        <>
          <button
            onClick={prevSlide}
            className="absolute left-8 top-1/2 -translate-y-1/2 z-30 bg-[#FFFFFF99] bg-opacity-50 hover:bg-opacity-70 text-white p-3 rounded-full transition-all"
          >
            <ChevronLeft size={24} />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-8 top-1/2 -translate-y-1/2 z-30 bg-[#FFFFFF99] bg-opacity-50 hover:bg-opacity-70 text-white p-3 rounded-full transition-all"
          >
            <ChevronRight size={24} />
          </button>
        </>
      )}

      <div className="flex items-center justify-center h-full gap-4 relative overflow-x-hidden">
        <AnimatePresence initial={false} custom={direction} mode="popLayout">
          {visibleSlides.map((slide, idx) => (
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
                src={slide.imageUrl}
                alt={slide.title}
                width={400}
                height={400}
                className="w-full h-full object-cover rounded-lg shadow-lg"
              />

              {/* Sold Overlay */}
              {slide.isSold && (
                <div className="absolute inset-0 bg-black/60 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-xl transform -rotate-12 border-4 border-white px-6 py-3 rounded-lg">
                    SOLD
                  </span>
                </div>
              )}

              {/* Hover Overlay - only show if not sold */}
              {!slide.isSold && idx !== 2 && (
                <div className="absolute inset-0 bg-black/25 bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 rounded-lg flex items-end justify-center pb-6 opacity-0 group-hover:opacity-100">
                  <button
                    onClick={() => handleViewDetails(slide.id, slide.isSold)}
                    className="bg-[#707070A8] backdrop-blur-lg text-white w-full px-6 py-2 rounded-lg font-semibold transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 flex items-center justify-center gap-2"
                  >
                    {!isAuthenticated ? (
                      <>
                        <Lock size={16} />
                        Login to View
                      </>
                    ) : (
                      <>
                        View Details
                        <ArrowRight size={16} />
                      </>
                    )}
                  </button>
                </div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};
