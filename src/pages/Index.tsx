import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import ServicesSection from '@/components/ServicesSection';
import HowItWorksSection from '@/components/HowItWorksSection';
import OffersSection from '@/components/OffersSection';
import TechnologySection from '@/components/TechnologySection';
import FAQSection from '@/components/FAQSection';
import CTASection from '@/components/CTASection';
import Footer from '@/components/Footer';
import FloatingContact from '@/components/FloatingContact';

const Index = () => {
  return (
    <>
      <Navbar />
      <HeroSection />
      <ServicesSection />
      <HowItWorksSection />
      <OffersSection />
      <TechnologySection />
      <FAQSection />
      <CTASection />
      <Footer />
      <FloatingContact />
    </>
  );
};

export default Index;
