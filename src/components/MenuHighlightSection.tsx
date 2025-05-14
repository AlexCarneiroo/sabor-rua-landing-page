
import React from 'react';
import DishCard from './DishCard';

const featuredDishes = [
  {
    imageSrc: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=1981&auto=format&fit=crop', // Pizza apetitosa
    name: 'Pizza Artesanal da Casa',
    description: 'Massa fermentada lentamente, molho de tomate caseiro, mussarela de primeira e seus ingredientes favoritos.',
    price: 'R$ 45,90',
  },
  {
    imageSrc: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=1780&auto=format&fit=crop', // Hambúrguer suculento
    name: 'Burger Sabor da Rua',
    description: 'Pão brioche selado na manteiga, blend de carnes nobres, queijo cheddar, bacon crocante e molho especial.',
    price: 'R$ 32,50',
  },
  {
    imageSrc: 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?q=80&w=2070&auto=format&fit=crop', // Prato de massa
    name: 'Massa Fresca ao Pesto',
    description: 'Tagliatelle artesanal envolto em um pesto de manjericão fresco com nozes, parmesão e azeite extra virgem.',
    price: 'R$ 38,00',
  },
];

const MenuHighlightSection = () => {
  return (
    <section id="menu" className="py-16 md:py-24 bg-neutral-DEFAULT">
      <div className="container mx-auto">
        <div className="text-center mb-12 md:mb-16 animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-brand-text mb-4">
            Nossos <span className="text-brand-DEFAULT">Destaques</span>
          </h2>
          <p className="text-lg text-neutral-text max-w-2xl mx-auto leading-relaxed">
            Experimente alguns dos nossos pratos mais pedidos e descubra por que o Sabor da Rua é o favorito da cidade!
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredDishes.map((dish, index) => (
            <DishCard key={dish.name} dish={dish} animationDelay={`${index * 0.15}s`} />
          ))}
        </div>
        <div className="text-center mt-12 md:mt-16 animate-fade-in-up" style={{ animationDelay: `${featuredDishes.length * 0.15}s`}}>
          <a href="#contact" className="inline-block bg-brand-DEFAULT text-white font-semibold px-10 py-4 rounded-md hover:bg-brand-dark transition-colors duration-300 text-lg">
            Ver Cardápio Completo
          </a>
        </div>
      </div>
    </section>
  );
};

export default MenuHighlightSection;
