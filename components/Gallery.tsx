"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Lightbox from "./Lightbox";

export default function Gallery() {
  const [images, setImages] = useState<any[]>([]);
  const [selected, setSelected] = useState<any>(null);
  const [activeFilter, setActiveFilter] = useState("All");

  const filters = ["All", "Weddings", "Portraits", "Events"];

  // Fetch images
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api/images");
      const data = await res.json();

      setImages(data);
    };

    fetchData();
  }, []);

  // Photos only
  const photos = images.filter((i) => i.type === "image");

  // Filter
  const filteredImages =
    activeFilter === "All"
      ? photos
      : photos.filter((img) => img.category === activeFilter);

  return (
    <section id="portfolio" className="max-w-7xl mx-auto px-6 md:px-10 py-24">
      {/* Heading */}
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-16">
        <div>
          <p className="uppercase tracking-[6px] text-white/50 text-sm mb-4">
            Portfolio
          </p>

          <h2 className="text-4xl md:text-6xl font-bold leading-tight">
            Selected Work
          </h2>
        </div>

        {/* Filters */}
        <div className="flex gap-3 flex-wrap">
          {filters.map((item) => (
            <button
              key={item}
              onClick={() => setActiveFilter(item)}
              className={`px-5 py-2 rounded-full border text-sm transition ${
                activeFilter === item
                  ? "bg-white text-black"
                  : "border-white/20 text-white/70 hover:bg-white hover:text-black"
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      {filteredImages.length === 0 && (
        <div className="relative overflow-hidden rounded-[32px] border border-white/10 bg-gradient-to-b from-white/[0.03] to-white/[0.01] py-32 px-8 text-center">
          {/* Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-purple-500/10 blur-[120px] rounded-full" />

          <div className="relative z-10">
            <p className="uppercase tracking-[6px] text-white/40 text-xs mb-6">
              Portfolio Coming Soon
            </p>

            <h3 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
              Moments Worth
              <br />
              Capturing.
            </h3>

            <p className="text-gray-400 max-w-2xl mx-auto leading-relaxed text-lg">
              Every frame tells a story. Cinematic weddings, emotional
              portraits, and unforgettable celebrations will appear here soon.
            </p>
          </div>
        </div>
      )}

      {/* Premium Masonry Grid */}
      <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
        {filteredImages.map((img, index) => (
          <div
            key={img._id}
            onClick={() => setSelected(img)}
            className="relative overflow-hidden rounded-[28px] cursor-pointer group break-inside-avoid"
          >
            {/* Image */}
            <Image
              src={img.url}
              alt=""
              width={600}
              height={800}
              className="w-full object-cover group-hover:scale-105 transition duration-700"
            />

            {/* Overlay */}
            <div className="pointer-events-none bg-black/10 group-hover:bg-black/40 transition duration-500" />

            {/* Gradient */}
            <div className="pointer-events-none bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition duration-500" />

            {/* Bottom Content */}
            <div className="absolute bottom-0 left-0 p-6 translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition duration-500">
              <p className="uppercase tracking-[3px] text-white/60 text-xs mb-2">
                {img.category}
              </p>

              <h3 className="text-2xl font-semibold">Cinematic Shot</h3>
            </div>

            {/* Featured Badge */}
            {img.featured && (
              <div className="absolute top-4 left-4 bg-yellow-400 text-black text-xs px-3 py-1 rounded-full font-semibold">
                Featured
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Premium Lightbox */}
      <Lightbox item={selected} onClose={() => setSelected(null)} />
    </section>
  );
}
