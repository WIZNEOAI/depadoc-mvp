import Navbar from "../sections/Navbar";
import Hero from "../sections/Hero";
import About from "../sections/About";
import Benefits from "../sections/Benefits";
import Pricing from "../sections/Pricing";
import FAQ from "../sections/FAQ";
import Footer from "../sections/Footer";
import FinalCTA from "../sections/FinalCTA";

const Index = () => {
  return (
    <div className="font-sans bg-lightgray min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 w-full mt-[54px] md:mt-[62px]">
        <Hero />
        <section id="about"><About /></section>
        <section id="beneficios"><Benefits /></section>
        <section id="planes"><Pricing /></section>
        {/* FinalCTA is now rendered inside Pricing at the right spot */}
        <section id="faq"><FAQ /></section>
      </main>
      <Footer />
      {/* Sticky CTA for mobile */}
      <div className="fixed z-[51] bottom-3 left-0 w-full px-4 md:hidden pointer-events-none flex justify-center">
        <a
          href="/auth"
          className="pointer-events-auto block w-full max-w-sm mx-auto px-7 py-4 bg-[#FBC02D] text-[#004C99] text-lg font-extrabold rounded-full shadow-xl transition-all hover:bg-[#004C99] hover:text-[#FBC02D] focus:outline-none focus:ring-4 focus:ring-[#FBC02D]"
          style={{ letterSpacing: "-0.01em" }}
        >
          Comenzar ahora
        </a>
      </div>
    </div>
  );
};

export default Index;