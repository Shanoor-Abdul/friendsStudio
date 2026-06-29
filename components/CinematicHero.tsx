"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import HeroFade from "./HeroFade";

export default function CinematicHero() {
  const [images, setImages] = useState<any[]>([]);
  const [current, setCurrent] = useState(0);

  // Fetch featured images
  useEffect(() => {
    const fetchImages = async () => {
      const res = await fetch("/api/images");
      const data = await res.json();

      const featured = data.filter(
        (img: any) => img.featured === true && img.type === "image",
      );

      setImages(featured);
    };

    fetchImages();
  }, []);

  // Auto slide
  useEffect(() => {
    if (images.length === 0) return;

    const interval = setInterval(() => {
      setCurrent((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }, 5000);

    return () => clearInterval(interval);
  }, [images]);

  const currentImage = images[current];

  return (
    <section id="home" className="relative min-h-screen overflow-hidden bg-black text-white">
      {/* Background Glow */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-purple-500/20 blur-[120px] rounded-full" />

      {/* Background Overlay */}
      <div className="pointer-events-none bg-gradient-to-b from-black via-black to-gray-950" />

      {/* Main Layout */}
      <div className="relative z-20 max-w-7xl mx-auto min-h-screen grid grid-cols-1 lg:grid-cols-2 items-center gap-16 px-6 md:px-10 pt-28 pb-16">
        {/* LEFT CONTENT */}
        <div>
          <HeroFade>
            <p className="uppercase tracking-[6px] text-white/60 text-sm mb-6">
              Cinematic Photography
            </p>
          </HeroFade>

          <HeroFade delay={0.1}>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold leading-[0.95]">
              Capturing
              <br />
              Stories Through
              <br />
              the Lens.
            </h1>
          </HeroFade>

          <HeroFade delay={0.2}>
            <p className="mt-8 text-lg text-gray-400 leading-relaxed max-w-xl">
              Timeless moments crafted with emotion, cinematic depth, and visual
              storytelling.
            </p>
          </HeroFade>

          {/* Buttons */}
          <HeroFade delay={0.3}>
            <div className="mt-10 flex gap-4 flex-wrap">
              <button className="px-8 py-4 bg-white text-black rounded-full font-medium hover:bg-gray-200 hover:scale-105 active:scale-95 transition duration-300">
                View Portfolio
              </button>

              <button className="px-8 py-4 border border-gray-700 rounded-full hover:bg-white hover:text-black hover:scale-105 active:scale-95 transition duration-300">
                Book a Shoot
              </button>
            </div>
          </HeroFade>

          {/* Indicators */}
          {images.length > 0 && (
            <HeroFade delay={0.4}>
              <div className="flex gap-2 mt-12">
                {images.map((_, index) => (
                  <div
                    key={index}
                    className={`h-2 rounded-full transition-all duration-500 ${
                      current === index ? "w-10 bg-white" : "w-2 bg-white/30"
                    }`}
                  />
                ))}
              </div>
            </HeroFade>
          )}
        </div>

        {/* RIGHT IMAGE */}
        <div className="relative flex justify-center lg:justify-end">
          {/* Glow Behind Image */}
          <div className="absolute w-[80%] h-[80%] bg-purple-500/20 blur-[100px] rounded-full" />

          {/* Animated Image Card */}
          <HeroFade delay={0.3}>
            <div className="relative w-full max-w-md md:max-w-lg">
              {/* Empty State */}
              {!currentImage ? (
                <div className="h-[650px] rounded-[32px] border border-gray-800 bg-gray-900 flex items-center justify-center text-gray-500">
                  No Featured Images
                </div>
              ) : (
                <div className="relative rounded-[32px] overflow-hidden border border-white/10 shadow-2xl">
                  {/* Image */}
                  <div className="relative h-[650px] w-full">
                    <Image
                      src={currentImage.url}
                      alt=""
                      width={700}
                      height={900}
                      priority
                      className="w-full h-[650px] object-cover transition duration-700 hover:scale-[1.02]"
                    />

                    {/* Overlay */}
                    <div className="pointer-events-none bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

                    {/* Bottom Content */}
                    <div className="absolute bottom-8 left-8">
                      <p className="uppercase tracking-[4px] text-white/60 text-xs mb-2">
                        Featured Work
                      </p>

                      <h2 className="text-3xl font-semibold">
                        {currentImage.category}
                      </h2>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </HeroFade>
        </div>
      </div>

      {/* Bottom Fade */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black to-transparent" />
    </section>
  );
}
