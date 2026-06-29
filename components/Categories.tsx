"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import FadeUp from "./FadeUp";
import { useRouter } from "next/navigation";

export default function Categories() {
  const [items, setItems] = useState<any[]>([]);
  const router = useRouter();

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      const res = await fetch("/api/categories");
      const data = await res.json();

      setItems(data);
    };

    fetchCategories();
  }, []);

  // Card heights
  const getCardHeight = (index: number) => {
    switch (index) {
      case 0:
        return "h-[500px]";
      case 1:
      case 2:
        return "h-[240px]";
      default:
        return "h-[350px]";
    }
  };

  return (
    <section className="max-w-7xl mx-auto px-6 md:px-10 py-28">

      {/* Heading */}
      <FadeUp>
        <div className="mb-16">

          <p className="uppercase tracking-[6px] text-white/40 text-sm mb-4">
            Explore Stories
          </p>

          <h2 className="text-4xl md:text-6xl font-bold leading-tight">
            Crafted Through
            <br />
            Emotion & Light.
          </h2>
        </div>
      </FadeUp>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {items.map((item, index) => (
          <FadeUp key={index} delay={index * 0.1}>

            <motion.div
              onClick={() =>
                router.push(
                  `/portfolio/${item.title.toLowerCase()}`
                )
              }
              whileHover={{
                y: -8,
              }}
              transition={{
                duration: 0.4,
              }}
              className={`group relative overflow-hidden rounded-[32px] cursor-pointer ${
                index === 0
                  ? "md:col-span-2"
                  : ""
              } ${getCardHeight(index)}`}
            >

              {/* Image */}
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover group-hover:scale-105 transition duration-700"
              />

              {/* Dark Overlay */}
              <div className="pointer-events-none bg-black/30 group-hover:bg-black/50 transition duration-500" />

              {/* Gradient */}
              <div className="pointer-events-none bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

              {/* Content */}
              <div className="absolute bottom-8 left-8 z-10">

                <p className="uppercase tracking-[4px] text-white/50 text-xs mb-3">
                  {item.count} Stories
                </p>

                <h3 className="text-3xl md:text-4xl font-semibold">
                  {item.title}
                </h3>
              </div>

              {/* Hover Arrow */}
              <div className="absolute top-8 right-8 opacity-0 group-hover:opacity-100 transition duration-500">

                <div className="w-12 h-12 rounded-full border border-white/20 bg-white/10 backdrop-blur-md flex items-center justify-center">

                  <span className="text-xl">
                    ↗
                  </span>

                </div>
              </div>

            </motion.div>

          </FadeUp>
        ))}
      </div>
    </section>
  );
}