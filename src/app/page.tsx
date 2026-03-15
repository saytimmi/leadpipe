import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import StorySection from "@/components/StorySection";
import LeakSection from "@/components/LeakSection";
import DreamSection from "@/components/DreamSection";
import ProductSection from "@/components/ProductSection";
import FormSection from "@/components/FormSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <StorySection />
        <LeakSection />
        <DreamSection />
        <ProductSection />
        <FormSection />
      </main>
      <Footer />
    </>
  );
}
