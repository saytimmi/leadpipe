import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import FamiliarSection from "@/components/FamiliarSection";
import ProblemSection from "@/components/ProblemSection";
import VisibilitySection from "@/components/VisibilitySection";
import SolutionSection from "@/components/SolutionSection";
import FormSection from "@/components/FormSection";
import Footer from "@/components/Footer";
import ScrollBackground from "@/components/ScrollBackground";
import SmoothScroll from "@/components/SmoothScroll";

export default function Home() {
  return (
    <SmoothScroll>
      <ScrollBackground />
      <Header />
      <main>
        <HeroSection />
        <FamiliarSection />
        <ProblemSection />
        <VisibilitySection />
        <SolutionSection />
        <FormSection />
      </main>
      <Footer />
    </SmoothScroll>
  );
}
