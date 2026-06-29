"use client";

import Image from "next/image";

interface LightboxProps {
  item: any;
  onClose: () => void;
}

export default function Lightbox({ item, onClose }: LightboxProps) {
  if (!item) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-[9999] bg-black/90 backdrop-blur-md flex items-center justify-center p-6 mt-620 cursor-pointer"
    >
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-6 right-8 text-white text-5xl z-50"
      >
        ×
      </button>

      {/* Content */}
      <div onClick={(e) => e.stopPropagation()} className="max-w-6xl w-full">
        {/* IMAGE */}
        {item.type === "image" ? (
          <Image
            src={item.url}
            alt=""
            width={1600}
            height={1200}
            className="
            w-auto
            h-auto
            max-w-full
            max-h-[85vh]
            object-contain
            rounded-[28px]
            mx-auto"
          />
        ) : (
          <video
            src={item.url}
            controls
            autoPlay
            playsInline
            className="
            w-auto
            h-auto
            max-w-full
            max-h-[85vh]
            rounded-[28px]
            mx-auto
            bg-black"
          />
        )}

        {/* Info */}
        <div className="mt-6 text-center">
          <p className="uppercase tracking-[4px] text-white/40 text-xs mb-2">
            {item.category}
          </p>

          <h3 className="text-3xl font-semibold">Cinematic Capture</h3>

          {item.featured && (
            <div className="mt-4 inline-block bg-yellow-400 text-black px-4 py-2 rounded-full text-sm font-semibold">
              Featured Work
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
