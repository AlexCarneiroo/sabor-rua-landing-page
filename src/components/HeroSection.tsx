
import React from 'react';
import { Button } from '@/components/ui/button';
import { ShoppingCart } from 'lucide-react'; // Removido CalendarDays, ArrowRight

const HeroSection = () => {
  return (
    <section id="hero" className="relative min-h-[calc(100vh-80px)] flex items-center bg-neutral-DEFAULT overflow-hidden">
      {/* Imagem de fundo - placeholder */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-30" 
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=2070&auto=format&fit=crop')" }} // Imagem de comida apetitosa
      ></div>
      <div className="absolute inset-0 bg-gradient-to-t from-neutral-DEFAULT via-neutral-DEFAULT/70 to-transparent"></div>

      <div className="container mx-auto relative z-10 text-center md:text-left py-16 md:py-24">
        <div className="max-w-2xl animate-fade-in-up">
          <h1 className="text-5xl md:text-7xl font-serif font-bold text-brand-text mb-6">
            O Verdadeiro <span className="text-brand-DEFAULT">Sabor da Rua</span>,
            <br className="hidden md:block" /> no Conforto da Sua Casa!
          </h1>
          <p className="text-lg md:text-xl text-neutral-text mb-10 leading-relaxed">
            Descubra pratos autênticos e cheios de sabor, preparados com ingredientes frescos e paixão. Perfeito para seu delivery ou uma noite especial em nosso restaurante.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <Button size="lg" className="bg-brand-DEFAULT hover:bg-brand-dark text-white text-lg px-8 py-6">
              <ShoppingCart className="mr-3 h-6 w-6" /> Peça Agora Online
            </Button>
            {/* Botão "Faça sua Reserva" removido */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
