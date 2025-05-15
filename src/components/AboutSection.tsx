
import React, { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { defaultAboutValues } from '@/components/admin/AboutManager';
import type { AboutFormValues } from '@/components/admin/AboutManager';

const AboutSection = () => {
  const [aboutData, setAboutData] = useState<AboutFormValues>(defaultAboutValues);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAboutData = async () => {
      try {
        const docRef = doc(db, "content", "about");
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          setAboutData(docSnap.data() as AboutFormValues);
        } else {
          console.log("Nenhum dado encontrado para a seção Sobre, usando valores padrão");
          setAboutData(defaultAboutValues);
        }
      } catch (error) {
        console.error("Erro ao buscar dados da seção Sobre:", error);
        setAboutData(defaultAboutValues);
      } finally {
        setLoading(false);
      }
    };

    fetchAboutData();
  }, []);

  if (loading) {
    return (
      <section id="about" className="py-16 md:py-24 bg-white">
        <div className="container mx-auto">
          <div className="flex justify-center">
            <div className="animate-pulse w-full max-w-4xl h-64 bg-gray-200 rounded-lg"></div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="about" className="py-16 md:py-24 bg-white">
      <div className="container mx-auto grid md:grid-cols-2 gap-12 items-center">
        <div className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          {/* Imagem da seção sobre */}
          <div className="rounded-lg shadow-xl overflow-hidden aspect-video">
            <img 
              src={aboutData.imageUrl || defaultAboutValues.imageUrl} 
              alt="Ambiente do Sabor da Rua" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        <div className="animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-slate-800 mb-6">
            {aboutData.title} <span className="text-brand-DEFAULT">{aboutData.highlightedWord}</span> Favorito
          </h2>
          <p className="text-slate-700 text-lg mb-4 leading-relaxed">
            {aboutData.paragraph1}
          </p>
          <p className="text-slate-700 text-lg mb-6 leading-relaxed">
            {aboutData.paragraph2}
          </p>
          <a href={aboutData.buttonLink} className="inline-block bg-brand-DEFAULT text-white font-semibold px-8 py-3 rounded-md hover:bg-brand-dark transition-colors duration-300 text-lg">
            {aboutData.buttonText}
          </a>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
