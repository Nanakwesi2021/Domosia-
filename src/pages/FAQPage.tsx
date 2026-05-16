import Navbar from '@/components/Navbar';
import FAQSection from '@/components/FAQSection';
import Footer from '@/components/Footer';
import FloatingContact from '@/components/FloatingContact';

const FAQPage = () => {
  return (
    <>
      <Navbar />
      <div className="pt-20">
        <FAQSection />
      </div>
      <Footer />
      <FloatingContact />
    </>
  );
};

export default FAQPage;
