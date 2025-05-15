
import React, { useState, useEffect } from 'react';
import DishCard from './DishCard';
import { db } from '@/lib/firebase';
import { collection, onSnapshot, QueryDocumentSnapshot, DocumentData } from 'firebase/firestore';
import { Dish } from '@/components/admin/MenuManager'; // Importar tipo Dish

const defaultFeaturedDishes: Dish[] = [ // Valores padrão caso o Firebase esteja vazio ou carregando
  {
    id: '1',
    imageSrc: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=1981&auto=format&fit=crop',
    name: 'Pizza Provisória',
    description: 'Carregando detalhes da pizza...',
    price: 'R$ --,--',
  },
  {
    id: '2',
    imageSrc: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=1780&auto=format&fit=crop',
    name: 'Burger Provisório',
    description: 'Carregando detalhes do burger...',
    price: 'R$ --,--',
  },
  {
    id: '3',
    imageSrc: 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?q=80&w=2070&auto=format&fit=crop',
    name: 'Massa Provisória',
    description: 'Carregando detalhes da massa...',
    price: 'R$ --,--',
  },
];


const MenuHighlightSection = () => {
  const [featuredDishes, setFeaturedDishes] = useState<Dish[]>(defaultFeaturedDishes);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const dishesColRef = collection(db, "featuredDishes");
    const unsubscribe = onSnapshot(dishesColRef, (snapshot) => {
      if (snapshot.empty) {
        setFeaturedDishes(defaultFeaturedDishes); // Usa os padrões se não houver nada
      } else {
        const fetchedDishes = snapshot.docs.map((docSnap: QueryDocumentSnapshot<DocumentData>) => ({
          id: docSnap.id,
          ...(docSnap.data() as Omit<Dish, 'id'>), // Omit 'id' because it's already there
        }));
        setFeaturedDishes(fetchedDishes);
      }
      setLoading(false);
    }, (error) => {
      console.error("Error fetching featured dishes for MenuHighlightSection:", error);
      setFeaturedDishes(defaultFeaturedDishes); // Fallback em caso de erro
      setLoading(false);
    });

    return () => unsubscribe(); // Cleanup listener
  }, []);

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
        {loading && <p className="text-center text-neutral-text">Carregando pratos deliciosos...</p>}
        {!loading && featuredDishes.length === 0 && <p className="text-center text-neutral-text">Nenhum prato em destaque no momento. Volte em breve!</p>}
        {!loading && featuredDishes.length > 0 && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredDishes.map((dish, index) => (
              <DishCard key={dish.id || index} dish={dish} animationDelay={`${index * 0.15}s`} />
            ))}
          </div>
        )}
        <div className="text-center mt-12 md:mt-16 animate-fade-in-up" style={{ animationDelay: `${(featuredDishes.length || 0) * 0.15}s`}}>
          <a href="#contact" className="inline-block bg-brand-DEFAULT text-white font-semibold px-10 py-4 rounded-md hover:bg-brand-dark transition-colors duration-300 text-lg">
            Ver Cardápio Completo {/* Este botão pode levar a uma página de cardápio completo no futuro */}
          </a>
        </div>
      </div>
    </section>
  );
};

export default MenuHighlightSection;
