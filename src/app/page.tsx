import { HeroSection } from "@/components/sections/hero-section";
import { SkillsSection } from "@/components/sections/skills-section";
import { ServicesSection } from "@/components/sections/services-section";
import { ProjectsSection } from "@/components/sections/projects-section";
import { ReviewsSection } from "@/components/sections/reviews-section";
import { ContactSection } from "@/components/sections/contact-section";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <SkillsSection />
      <ServicesSection />
      <ProjectsSection />
      <ReviewsSection />
      <ContactSection />
    </>
  );
}
