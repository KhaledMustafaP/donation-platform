import Hero from "../components/Hero";
import CampaignsPreview from "../components/CampaignsPreview";
import HowItWorks from "../components/HowItWorks";
import AboutSection from "../components/AboutSection";
import CategoriesSlider from "../components/ui/CategoriesSlider";
import ServicesFlipSection from "../components/ui/ServicesFlipSection";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors">
      <Hero />
      <CampaignsPreview />
      <CategoriesSlider/>
      <ServicesFlipSection/>
      <HowItWorks />
      <AboutSection />
    </div>
  );
}
