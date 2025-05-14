
import React from 'react';

const AboutSection = () => {
  return (
    <section id="about" className="py-16 md:py-24 bg-white">
      <div className="container mx-auto grid md:grid-cols-2 gap-12 items-center">
        <div className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          {/* Placeholder para imagem sobre o restaurante */}
          <div className="rounded-lg shadow-xl overflow-hidden aspect-video">
            <img 
              src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=1974&auto=format&fit=crop" // Imagem de um ambiente de restaurante acolhedor ou cozinha
              alt="Ambiente do Sabor da Rua" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        <div className="animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-brand-text mb-6">
            Nossa História, Seu <span className="text-brand-DEFAULT">Sabor</span> Favorito
          </h2>
          <p className="text-neutral-text text-lg mb-4 leading-relaxed">
            No Sabor da Rua, acreditamos que comida de verdade tem o poder de conectar pessoas e criar memórias. Nascemos da paixão pela culinária de rua autêntica, trazendo pratos clássicos e inovações deliciosas para sua mesa.
          </p>
          <p className="text-neutral-text text-lg mb-6 leading-relaxed">
            Utilizamos ingredientes frescos, selecionados com carinho, e preparamos cada prato com a dedicação que você merece. Seja para um delivery rápido ou uma reserva especial, estamos prontos para te servir o melhor do sabor da rua.
          </p>
          <a href="#menu" className="inline-block bg-brand-DEFAULT text-white font-semibold px-8 py-3 rounded-md hover:bg-brand-dark transition-colors duration-300 text-lg">
            Conheça Nosso Cardápio
          </a>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
