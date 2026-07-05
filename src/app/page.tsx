"use client";

import { useState } from "react";
import Preloader from "@/components/Preloader";
import SmoothScroll from "@/components/SmoothScroll";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import WipeClean from "@/components/WipeClean";
import Sectors from "@/components/Sectors";
import Technology from "@/components/Technology";
import Process from "@/components/Process";
import Trust from "@/components/Trust";
import WithUsBand from "@/components/WithUsBand";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  const [loaded, setLoaded] = useState(false);

  return (
    <SmoothScroll>
      {!loaded && <Preloader onDone={() => setLoaded(true)} />}
      <Navbar />
      <main>
        <Hero started={loaded} />
        <WipeClean />
        <Sectors />
        <Technology />
        <Process />
        <Trust />
        <WithUsBand />
        <Contact />
      </main>
      <Footer />
    </SmoothScroll>
  );
}
