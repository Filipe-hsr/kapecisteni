import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { About } from "@/components/sections/about";
import { Contact } from "@/components/sections/contact";
import { Gallery } from "@/components/sections/gallery";
import { Hero } from "@/components/sections/hero";
import { Paving } from "@/components/sections/paving";
import { Reviews } from "@/components/sections/reviews";
import { Services } from "@/components/sections/services";
import { Technology } from "@/components/sections/technology";

export default function Home() {
  return (
    <>
      <Header />
      <main id="obsah">
        <Hero />
        <Technology />
        <About />
        <Services />
        <Gallery />
        <Paving />
        <Reviews />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
