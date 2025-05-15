
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ShoppingCart } from 'lucide-react';
import { db } from '@/lib/firebase';
import { doc, onSnapshot } from 'firebase/firestore'; // Apenas onSnapshot é necessário aqui
import { HeroFormValues, defaultValues as defaultHeroValues } from '@/components/admin/HeroManager';

const HeroSection = () => {
  const [heroData, setHeroData] = useState<HeroFormValues>(defaultHeroValues);
  const [loading, setLoading] = useState(true);
  const [establishmentName, setEstablishmentName] = useState("Sabor da Rua"); // Nome padrão

  useEffect(() => {
    // Listener para dados da Hero Section
    const heroDocRef = doc(db, "content", "hero");
    const unsubscribeHero = onSnapshot(heroDocRef, (docSnap) => {
      if (docSnap.exists()) {
        setHeroData(docSnap.data() as HeroFormValues);
      } else {
        setHeroData(defaultHeroValues);
      }
      setLoading(false); // Considerar loading completo após ambos os fetches ou se um falhar
    }, (error) => {
      console.error("Error fetching hero data for HeroSection:", error);
      setHeroData(defaultHeroValues);
      setLoading(false);
    });

    // Listener para nome do estabelecimento
    const settingsDocRef = doc(db, "content", "siteSettings");
    const unsubscribeSettings = onSnapshot(settingsDocRef, (docSnap) => {
      if (docSnap.exists() && docSnap.data().establishmentName) {
        setEstablishmentName(docSnap.data().establishmentName);
      } else {
        setEstablishmentName("Sabor da Rua"); // Fallback
      }
    }, (error) => {
      console.error("Erro ao buscar nome do estabelecimento para HeroSection:", error);
      setEstablishmentName("Sabor da Rua"); // Fallback
    });

    return () => {
      unsubscribeHero();
      unsubscribeSettings();
    };
  }, []);

  if (loading) {
    return (
      <section id="hero" className="relative min-h-[calc(100vh-80px)] flex items-center justify-center bg-neutral-DEFAULT overflow-hidden">
        <p className="text-white text-xl">Carregando conteúdo...</p>
      </section>
    );
  }

  // Lógica para destacar parte do título se o nome do estabelecimento estiver nele
  let titleElement: React.ReactNode = heroData.title;
  if (heroData.title.includes(establishmentName) && establishmentName.length > 0) {
    const parts = heroData.title.split(new RegExp(`(${establishmentName})`, 'gi'));
    titleElement = parts.map((part, index) => 
      part.toLowerCase() === establishmentName.toLowerCase() ? (
        <span key={index} className="text-brand-DEFAULT">{part}</span>
      ) : (
        part
      )
    );
  }


  return (
    <section id="hero" className="relative min-h-[calc(100vh-80px)] flex items-center bg-neutral-DEFAULT overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-30 transition-all duration-500 ease-in-out" 
        style={{ backgroundImage: `url('${heroData.backgroundImageUrl || defaultHeroValues.backgroundImageUrl}')` }}
      ></div>
      <div className="absolute inset-0 bg-gradient-to-t from-neutral-DEFAULT via-neutral-DEFAULT/70 to-transparent"></div>

      <div className="container mx-auto relative z-10 text-center md:text-left py-16 md:py-24">
        <div className="max-w-2xl animate-fade-in-up">
          <h1 className="text-5xl md:text-7xl font-serif font-bold text-brand-text mb-6">
            {titleElement}
          </h1>
          <p className="text-lg md:text-xl text-neutral-text mb-10 leading-relaxed">
            {heroData.subtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <Button asChild size="lg" className="bg-brand-DEFAULT hover:bg-brand-dark text-white text-lg px-8 py-6">
              <a href={heroData.buttonLink}>
                <ShoppingCart className="mr-3 h-6 w-6" /> {heroData.buttonText}
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
