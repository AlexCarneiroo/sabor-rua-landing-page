
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ShoppingCart } from 'lucide-react';
import { db } from '@/lib/firebase';
import { doc, getDoc, onSnapshot } from 'firebase/firestore';
import { HeroFormValues, defaultValues as defaultHeroValues } from '@/components/admin/HeroManager'; // Importar tipo e valores padrão

const HeroSection = () => {
  const [heroData, setHeroData] = useState<HeroFormValues>(defaultHeroValues);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const heroDocRef = doc(db, "content", "hero");
    // Usar onSnapshot para atualizações em tempo real
    const unsubscribe = onSnapshot(heroDocRef, (docSnap) => {
      if (docSnap.exists()) {
        setHeroData(docSnap.data() as HeroFormValues);
        console.log("HeroSection data updated from Firebase:", docSnap.data());
      } else {
        setHeroData(defaultHeroValues); // Fallback para valores padrão se não houver dados
        console.log("No hero data in Firebase, using defaults for HeroSection.");
      }
      setLoading(false);
    }, (error) => {
      console.error("Error fetching hero data for HeroSection:", error);
      setHeroData(defaultHeroValues); // Fallback em caso de erro
      setLoading(false);
    });

    // Cleanup listener on component unmount
    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <section id="hero" className="relative min-h-[calc(100vh-80px)] flex items-center justify-center bg-neutral-DEFAULT overflow-hidden">
        <p className="text-white text-xl">Carregando conteúdo...</p>
      </section>
    );
  }

  return (
    <section id="hero" className="relative min-h-[calc(100vh-80px)] flex items-center bg-neutral-DEFAULT overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-30" 
        style={{ backgroundImage: `url('${heroData.backgroundImageUrl || defaultHeroValues.backgroundImageUrl}')` }}
      ></div>
      <div className="absolute inset-0 bg-gradient-to-t from-neutral-DEFAULT via-neutral-DEFAULT/70 to-transparent"></div>

      <div className="container mx-auto relative z-10 text-center md:text-left py-16 md:py-24">
        <div className="max-w-2xl animate-fade-in-up">
          <h1 className="text-5xl md:text-7xl font-serif font-bold text-brand-text mb-6">
            {heroData.title.split('Sabor da Rua')[0]}
            <span className="text-brand-DEFAULT">Sabor da Rua</span>
            {heroData.title.split('Sabor da Rua')[1]}
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
