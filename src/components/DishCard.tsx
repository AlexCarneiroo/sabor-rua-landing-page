
import React from 'react';
import { Button } from '@/components/ui/button';
import { ShoppingCart } from 'lucide-react';

interface Dish {
  imageSrc: string;
  name: string;
  description: string;
  price: string;
}

interface DishCardProps {
  dish: Dish;
  animationDelay?: string;
}

const DishCard: React.FC<DishCardProps> = ({ dish, animationDelay }) => {
  return (
    <div 
      className="bg-white rounded-lg shadow-xl overflow-hidden transform hover:scale-105 transition-transform duration-300 flex flex-col animate-fade-in-up"
      style={{ animationDelay }}
    >
      <div className="aspect-[4/3] overflow-hidden">
        <img src={dish.imageSrc} alt={dish.name} className="w-full h-full object-cover" />
      </div>
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-2xl font-serif font-semibold text-slate-800 mb-2">{dish.name}</h3>
        <p className="text-slate-700 text-sm mb-4 flex-grow leading-relaxed">{dish.description}</p>
        <div className="flex items-center justify-between mt-auto">
          <span className="text-2xl font-bold text-brand-DEFAULT">{dish.price}</span>
          <Button variant="outline" size="sm" className="border-brand-DEFAULT text-brand-DEFAULT hover:bg-brand-DEFAULT hover:text-white">
            <ShoppingCart className="mr-2 h-4 w-4" /> Pedir
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DishCard;
