
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import MenuHighlightSection from '@/components/MenuHighlightSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="flex flex-col min-h-screen bg-neutral-DEFAULT text-neutral-darktext">
      <Header />
      <main className="flex-grow">
        <HeroSection />
        <AboutSection />
        <MenuHighlightSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
