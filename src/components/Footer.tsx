
import React from 'react';
import { Facebook, Instagram, ArrowUp } from 'lucide-react';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-card text-foreground/80 py-12"> {/* Mudado para bg-card e text-foreground */}
      <div className="container mx-auto">
        <div className="grid md:grid-cols-3 gap-8 mb-8 text-center md:text-left">
          <div>
            <h4 className="text-xl font-serif font-semibold text-primary mb-3">Sabor da Rua</h4> {/* Mudado para text-primary */}
            <p className="text-sm leading-relaxed">
              A autêntica culinária de rua, com ingredientes frescos e muito amor. Peça delivery ou reserve sua mesa!
            </p>
          </div>
          <div>
            <h4 className="text-xl font-serif font-semibold text-primary mb-3">Links Rápidos</h4> {/* Mudado para text-primary */}
            <ul className="space-y-2 text-sm">
              <li><a href="#hero" className="hover:text-primary transition-colors">Início</a></li> {/* Mudado hover para text-primary */}
              <li><a href="#about" className="hover:text-primary transition-colors">Sobre Nós</a></li>
              <li><a href="#menu" className="hover:text-primary transition-colors">Cardápio</a></li>
              <li><a href="#contact" className="hover:text-primary transition-colors">Contato</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Política de Privacidade</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-xl font-serif font-semibold text-primary mb-3">Siga-nos</h4> {/* Mudado para text-primary */}
            <div className="flex justify-center md:justify-start space-x-4">
              <a href="#" aria-label="Facebook" className="text-foreground/80 hover:text-primary transition-colors"> {/* Mudado cores */}
                <Facebook size={24} />
              </a>
              <a href="#" aria-label="Instagram" className="text-foreground/80 hover:text-primary transition-colors"> {/* Mudado cores */}
                <Instagram size={24} />
              </a>
              {/* Adicione mais redes sociais se necessário */}
            </div>
          </div>
        </div>
        <div className="border-t border-border/50 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-center"> {/* border-border/50 para suavizar */}
          <p>&copy; {new Date().getFullYear()} Sabor da Rua. Todos os direitos reservados.</p>
          <button 
            onClick={scrollToTop} 
            aria-label="Voltar ao topo"
            className="mt-4 md:mt-0 p-2 rounded-full hover:bg-primary/20 transition-colors" /* hover com primary/20 */
          >
            <ArrowUp size={24} className="text-foreground/80"/> {/* Mudado cor do ícone */}
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
