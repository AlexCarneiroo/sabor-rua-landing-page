
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X, ShoppingCart } from 'lucide-react'; // Removido CalendarDays

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { href: '#hero', label: 'Início' },
    { href: '#about', label: 'Sobre Nós' },
    { href: '#menu', label: 'Cardápio' },
    { href: '#contact', label: 'Contato' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-md shadow-sm">
      <div className="container mx-auto flex items-center justify-between h-20">
        <a href="#hero" className="text-3xl font-serif font-bold text-brand-DEFAULT">
          Sabor<span className="text-neutral-darktext">da</span>Rua
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-6 items-center">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-neutral-darktext hover:text-brand-DEFAULT transition-colors duration-300 font-medium"
            >
              {link.label}
            </a>
          ))}
          <Button variant="default" className="bg-brand-DEFAULT hover:bg-brand-dark text-white">
            <ShoppingCart className="mr-2 h-5 w-5" /> Peça Agora
          </Button>
          {/* Botão de Reservar Mesa removido */}
        </nav>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="h-7 w-7 text-brand-DEFAULT" /> : <Menu className="h-7 w-7 text-brand-DEFAULT" />}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-20 left-0 w-full bg-background shadow-lg py-4 animate-accordion-down">
          <nav className="flex flex-col items-center space-y-4">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-neutral-darktext hover:text-brand-DEFAULT transition-colors duration-300 font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <Button variant="default" className="bg-brand-DEFAULT hover:bg-brand-dark text-white w-3/4">
              <ShoppingCart className="mr-2 h-5 w-5" /> Peça Agora
            </Button>
            {/* Botão de Reservar Mesa removido do menu mobile */}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
