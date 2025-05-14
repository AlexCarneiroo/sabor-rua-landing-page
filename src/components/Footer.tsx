
import React from 'react';
import { Facebook, Instagram, ArrowUp } from 'lucide-react'; // Removido Twitter, Truck

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-brand-text text-neutral-DEFAULT/80 py-12">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-3 gap-8 mb-8 text-center md:text-left">
          <div>
            <h4 className="text-xl font-serif font-semibold text-white mb-3">Sabor da Rua</h4>
            <p className="text-sm leading-relaxed">
              A autêntica culinária de rua, com ingredientes frescos e muito amor. Peça delivery ou reserve sua mesa!
            </p>
          </div>
          <div>
            <h4 className="text-xl font-serif font-semibold text-white mb-3">Links Rápidos</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#hero" className="hover:text-brand-light transition-colors">Início</a></li>
              <li><a href="#about" className="hover:text-brand-light transition-colors">Sobre Nós</a></li>
              <li><a href="#menu" className="hover:text-brand-light transition-colors">Cardápio</a></li>
              <li><a href="#contact" className="hover:text-brand-light transition-colors">Contato</a></li>
              <li><a href="#" className="hover:text-brand-light transition-colors">Política de Privacidade</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-xl font-serif font-semibold text-white mb-3">Siga-nos</h4>
            <div className="flex justify-center md:justify-start space-x-4">
              <a href="#" aria-label="Facebook" className="text-neutral-DEFAULT/80 hover:text-brand-light transition-colors">
                <Facebook size={24} />
              </a>
              <a href="#" aria-label="Instagram" className="text-neutral-DEFAULT/80 hover:text-brand-light transition-colors">
                <Instagram size={24} />
              </a>
              {/* Adicione mais redes sociais se necessário */}
            </div>
          </div>
        </div>
        <div className="border-t border-neutral-DEFAULT/30 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-center">
          <p>&copy; {new Date().getFullYear()} Sabor da Rua. Todos os direitos reservados.</p>
          <button 
            onClick={scrollToTop} 
            aria-label="Voltar ao topo"
            className="mt-4 md:mt-0 p-2 rounded-full hover:bg-brand-DEFAULT/20 transition-colors"
          >
            <ArrowUp size={24} className="text-neutral-DEFAULT/80"/>
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
