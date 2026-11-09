
import Hero from "./components/Hero";
import ProductShowcase from "./components/Showcase";
import MessagingWorkflow from "./components/MessagingWorkflow";
import UseCases from "./components/UseCases";
import PageMotion from "./components/PageMotion";
import DeveloperSection from "./components/DeveloperSection";
import GlobeSection from "./components/GlobeSection";
import { PricingSection, FAQSection, FinalCTA, Footer } from "./components/ClosingSections";

export default function Home() {
  return (
    <>
      <PageMotion />
      <main id="main-content">
      <Hero />
      <ProductShowcase />
      <MessagingWorkflow />
      <UseCases />
      <GlobeSection />
      <DeveloperSection />
      <PricingSection />
      <FAQSection />
      <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
