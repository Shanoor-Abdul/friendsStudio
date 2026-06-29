"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import FadeUp from "./FadeUp";

export default function CategoryGallery({
  category,
}: {
  category: string;
}) {
  const [images, setImages] = useState<any[]>([]);
  const [selected, setSelected] = useState<any>(null);

  // Fetch Images
  useEffect(() => {
    const fetchImages = async () => {
      const res = await fetch("/api/images");
      const data = await res.json();

      const filtered = data.filter(
        (img: any) =>
          img.category.toLowerCase() ===
          category.toLowerCase()
      );

      setImages(filtered);
    };

    fetchImages();
  }, [category]);

  return (
    <div className="bg-black text-white min-h-screen">

      {/* HERO */}
      <section className="pt-36 md:pt-44 pb-20 px-6">

        <FadeUp>
          <div className="max-w-5xl mx-auto text-center">

            <p className="uppercase tracking-[6px] text-white/40 text-xs mb-6">
              Portfolio Collection
            </p>

            <h1 className="text-5xl md:text-7xl font-bold capitalize">
              {category}
            </h1>

            <p className="mt-8 text-gray-400 text-lg leading-relaxed max-w-2xl mx-auto">
              A curated cinematic collection filled with emotion,
              storytelling, timeless moments, and artistic visual depth.
            </p>
          </div>
        </FadeUp>

      </section>

      {/* GALLERY */}
      <section className="max-w-7xl mx-auto px-6 md:px-10 pb-28">

        {/* STATS */}
        <FadeUp>
          <div className="flex items-center justify-between mb-12">

            <div>
              <p className="uppercase tracking-[5px] text-white/40 text-xs mb-2">
                Visual Stories
              </p>

              <h2 className="text-3xl font-semibold">
                {images.length} Captures
              </h2>
            </div>

            <div className="w-20 h-[1px] bg-white/10" />
          </div>
        </FadeUp>

        {/* EMPTY */}
        {images.length === 0 && (
          <div className="border border-white/10 rounded-[32px] py-28 text-center bg-white/[0.02]">

            <p className="uppercase tracking-[6px] text-white/30 text-xs mb-6">
              Stories Coming Soon
            </p>

            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Moments Worth Capturing.
            </h2>

            <p className="text-gray-400 max-w-xl mx-auto leading-relaxed">
              This collection is currently being crafted with
              cinematic storytelling and emotional moments.
            </p>
          </div>
        )}

        {/* MASONRY */}
        {images.length > 0 && (
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">

            {images.map((img, index) => (
              <FadeUp key={img._id} delay={index * 0.05}>

                <div
                  onClick={() => setSelected(img)}
                  className="relative overflow-hidden rounded-[28px] cursor-pointer group break-inside-avoid"
                >

                  {/* IMAGE */}
                  {img.type === "image" ? (
                    <Image
                      src={img.url}
                      alt=""
                      width={700}
                      height={900}
                      className="w-full object-cover group-hover:scale-105 transition duration-700"
                    />
                  ) : (
                    <video
                      src={img.url}
                      controls
                      className="w-full rounded-[28px]"
                    />
                  )}

                  {/* OVERLAY */}
                  <div className="pointer-events-none bg-black/10 group-hover:bg-black/40 transition duration-500" />

                  {/* CONTENT */}
                  <div className="absolute bottom-6 left-6 opacity-0 group-hover:opacity-100 transition duration-500">

                    <p className="uppercase tracking-[4px] text-white/50 text-xs mb-2">
                      {img.category}
                    </p>

                    <h3 className="text-2xl font-semibold">
                      Cinematic Capture
                    </h3>
                  </div>

                  {/* FEATURED */}
                  {img.featured && (
                    <div className="absolute top-4 left-4 bg-yellow-400 text-black px-4 py-2 rounded-full text-xs font-semibold">
                      Featured
                    </div>
                  )}
                </div>

              </FadeUp>
            ))}
          </div>
        )}

      </section>

      {/* LIGHTBOX */}
      {selected && (
        <div
          onClick={() => setSelected(null)}
          className="fixed inset-0 bg-black/90 backdrop-blur-md z-[9999] flex items-center justify-center p-6"
        >

          {/* CLOSE */}
          <button
            onClick={() => setSelected(null)}
            className="absolute top-6 right-8 text-white text-5xl z-50"
          >
            ×
          </button>

          <div
            onClick={(e) => e.stopPropagation()}
            className="max-w-6xl w-full"
          >

            {/* IMAGE */}
           {/* MEDIA */}
<div className="flex items-center justify-center">

  {selected.type === "image" ? (

    <Image
      src={selected.url}
      alt=""
      width={1400}
      height={1000}
      className="max-w-full max-h-[85vh] object-contain rounded-[28px]"
    />

  ) : (

    <video
      src={selected.url}
      controls
      autoPlay
      playsInline
      className="max-w-full max-h-[85vh] rounded-[28px] bg-black"
      onClick={(e) => e.stopPropagation()}
    />

  )}
</div>

            {/* INFO */}
            <div className="mt-6 text-center">

              <p className="uppercase tracking-[4px] text-white/40 text-xs mb-2">
                {selected.category}
              </p>

              <h3 className="text-3xl font-semibold">
                Cinematic Capture
              </h3>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}