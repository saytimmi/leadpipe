import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import StorySection from "@/components/StorySection";
import TransitionArrow from "@/components/TransitionArrow";
import ProblemSection from "@/components/ProblemSection";
import SolutionSection from "@/components/SolutionSection";
import VisibilitySection from "@/components/VisibilitySection";
import SocialProof from "@/components/SocialProof";
import FormSection from "@/components/FormSection";
import Footer from "@/components/Footer";
import { FormModalProvider } from "@/components/FormModal";
import SectionTracker from "@/components/SectionTracker";
import PageViewTracker from "@/components/PageViewTracker";

function SectionDivider() {
  return (
    <div className="flex justify-center">
      <div className="h-px w-24 bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
    </div>
  );
}

export default function Home() {
  return (
    <FormModalProvider>
      <PageViewTracker />
      <Header />
      <main>
        <SectionTracker name="hero"><HeroSection /></SectionTracker>
        <SectionTracker name="story"><StorySection /></SectionTracker>
        <TransitionArrow />
        <SectionTracker name="problem"><ProblemSection /></SectionTracker>
        <SectionDivider />
        <SectionTracker name="solution"><SolutionSection /></SectionTracker>
        <SectionDivider />
        <SectionTracker name="visibility"><VisibilitySection /></SectionTracker>
        <SectionDivider />
        <SectionTracker name="proof"><SocialProof /></SectionTracker>
        <SectionDivider />
        <SectionTracker name="form"><FormSection /></SectionTracker>
      </main>
      <Footer />
    </FormModalProvider>
  );
}
