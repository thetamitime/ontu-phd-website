"use client";

import Image from "next/image";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export const Carousel: React.FC<{ images: string[] }> = ({ images }) => {
  const [index, setIndex] = useState(0);

  const prevSlide = () => {
    setIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1,
    );
  };

  const nextSlide = () => {
    setIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1,
    );
  };

  return (
    <div className="my-8">
      <div className="relative">
        {images.map((src, i) => (
          <div key={i} className={`${i === index ? "block" : "hidden"}`}>
            <Image
              src={src}
              className="h-[35vh] w-full rounded-lg object-cover md:h-[45vh] lg:h-[55vh] xl:h-[65vh]"
              alt="Slide"
              width={1280}
              height={720}
            />
          </div>
        ))}

        {/* Navigation Buttons */}
        <div
          role="button"
          onClick={prevSlide}
          className="bg-base-200 hover:bg-base-300/80 absolute top-1/2 left-4 -translate-y-1/2 transform cursor-pointer rounded-full p-2"
        >
          <ChevronLeft className="size-4 md:size-6" />
        </div>
        <div
          role="button"
          onClick={nextSlide}
          className="bg-base-200 hover:bg-base-300/80 absolute top-1/2 right-4 -translate-y-1/2 transform cursor-pointer rounded-full p-2"
        >
          <ChevronRight className="size-4 md:size-6" />
        </div>
      </div>

      {/* Pagination Dots */}
      <div className="flex justify-center gap-2 py-4">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`h-2 w-2 rounded-full ${i === index ? "bg-gray-900" : "bg-gray-400"}`}
          />
        ))}
      </div>
    </div>
  );
};
