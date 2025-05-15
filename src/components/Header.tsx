
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X, ShoppingCart } from 'lucide-react';
import { db } from '@/lib/firebase'; // Importar db
import { doc, onSnapshot } from 'firebase/firestore'; // Importar onSnapshot

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [establishmentName, setEstablishmentName] = useState("Sabor da Rua"); // Nome padrão

  useEffect(() => {
    const settingsDocRef = doc(db, "content", "siteSettings");
    const unsubscribe = onSnapshot(settingsDocRef, (docSnap) => {
      if (docSnap.exists() && docSnap.data().establishmentName) {
        setEstablishmentName(docSnap.data().establishmentName);
      } else {
        setEstablishmentName("Sabor da Rua"); // Fallback
      }
    }, (error) => {
      console.error("Erro ao buscar nome do estabelecimento para Header:", error);
      setEstablishmentName("Sabor da Rua"); // Fallback em caso de erro
    });
    return () => unsubscribe(); // Limpar listener
  }, []);

  const navLinks = [
    { href: '#hero', label: 'Início' },
    { href: '#about', label: 'Sobre Nós' },
    { href: '#menu', label: 'Cardápio' },
    { href: '#contact', label: 'Contato' },
  ];

  // Extrair a primeira parte do nome e o restante para estilização
  const nameParts = establishmentName.split(' ');
  const mainName = nameParts.slice(0, -1).join(' '); // Tudo menos a última palavra
  const lastNamePart = nameParts.length > 1 ? nameParts[nameParts.length - 1] : ''; // Última palavra, se houver

  return (
    <header className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-md shadow-sm">
      <div className="container mx-auto flex items-center justify-between h-20">
        <a href="#hero" className="text-3xl font-serif font-bold">
          <span className="text-brand-DEFAULT">{mainName}</span>
          {lastNamePart && <span className="text-neutral-darktext">{lastNamePart}</span>}
          {!mainName && !lastNamePart && <span className="text-brand-DEFAULT">{establishmentName}</span>} {/* Caso seja uma palavra só */}
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
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
