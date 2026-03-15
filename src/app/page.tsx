import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import StorySection from "@/components/StorySection";
import ProblemSection from "@/components/ProblemSection";
import VisibilitySection from "@/components/VisibilitySection";
import SolutionSection from "@/components/SolutionSection";
import FormSection from "@/components/FormSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <StorySection />
        <ProblemSection />
        <VisibilitySection />
        <SolutionSection />
        <FormSection />
      </main>
      <Footer />
    </>
  );
}
