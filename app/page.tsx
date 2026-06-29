

import Navbar from "@/components/Navbar";
import CinematicHero from "@/components/CinematicHero";
import Gallery from "@/components/Gallery";
import Contact from "@/components/Contact";
import Categories from "@/components/Categories";
import FloatingBookButton from "@/components/FloatingBookButton";
import Featured from "@/components/Featured";

export default function Home() {
  return (
    <>
      <Navbar />

      <CinematicHero />

      <Categories />

       <Featured />

      <Gallery />

      <Contact />

      <FloatingBookButton />
      
    </>
  );
}