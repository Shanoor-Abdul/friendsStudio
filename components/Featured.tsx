"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function Featured() {
  const [featuredImages, setFeaturedImages] = useState<any[]>([]);

  useEffect(() => {
    const fetchImages = async () => {
      const res = await fetch("/api/images");
      const data = await res.json();

      const featured = data.filter(
        (img: any) =>
          img.featured === true && img.type === "image"
      );

      setFeaturedImages(featured);
    };

    fetchImages();
  }, []);

  // empty state
  if (featuredImages.length === 0) {
    return (
      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="text-center text-gray-500">
          <h2 className="text-3xl mb-4">Featured Work</h2>
          <p>No featured photos yet ⭐</p>
        </div>
      </section>
    );
  }

  // first image big hero
  const hero = featuredImages[0];

  // remaining images
  const remaining = featuredImages.slice(1);

  return (
    <section className="max-w-6xl mx-auto px-6 py-20">

      {/* Heading */}
      <div className="mb-10">
        <p className="text-gray-400 uppercase tracking-[4px] text-sm">
          Featured Collection
        </p>

        <h2 className="text-4xl md:text-6xl font-bold mt-3">
          Selected Moments
        </h2>
      </div>

      {/* Hero Image */}
      <div className="relative overflow-hidden rounded-3xl group">
        <Image
          src={hero.url}
          alt=""
          width={1400}
          height={800}
          className="w-full h-[500px] object-cover group-hover:scale-105 transition duration-700"
        />

        <div className="pointer-events-none bg-black/30" />

        <div className="absolute bottom-8 left-8">
          <p className="text-sm uppercase tracking-[3px] text-white/70">
            Featured
          </p>

          <h3 className="text-3xl md:text-5xl font-bold">
            {hero.category}
          </h3>
        </div>
      </div>

      {/* Smaller Grid */}
      {remaining.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          {remaining.map((img) => (
            <div
              key={img._id}
              className="relative overflow-hidden rounded-2xl group"
            >
              <Image
                src={img.url}
                alt=""
                width={500}
                height={400}
                className="w-full h-[250px] object-cover group-hover:scale-110 transition duration-700"
              />

              <div className="pointer-events-none bg-black/20 opacity-0 group-hover:opacity-100 transition" />

              <div className="absolute bottom-4 left-4">
                <p className="text-sm text-white">
                  {img.category}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}