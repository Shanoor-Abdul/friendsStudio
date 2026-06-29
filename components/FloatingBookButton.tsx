"use client";

export default function FloatingBookButton() {

  const scrollToContact = () => {
    const section = document.getElementById("contact");

    section?.scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <button
      onClick={scrollToContact}
      className="
        fixed
        bottom-5
        right-5
        z-[9999]

        px-5
        py-3

        rounded-full
        bg-red-500
        text-black

        text-sm
        font-medium

        shadow-2xl
        shadow-black/40

        hover:scale-105
        hover:bg-gray-200

        transition-all
        duration-300
      "
    >
      Book Now
    </button>
  );
}