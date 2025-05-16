
import React, { useEffect, useState } from 'react';
import { Facebook, Instagram, ArrowUp } from 'lucide-react';
import { doc, onSnapshot } from 'firebase/firestore'; // Mudado para onSnapshot para atualizações em tempo real
import { db } from '@/lib/firebase';
import type { ContactFormValues } from '@/components/admin/ContactManager'; // Importar o tipo
import { defaultContactValues } from '@/components/admin/ContactManager'; // Importar valores padrão

const Footer = () => {
  const [contactData, setContactData] = useState<ContactFormValues>(defaultContactValues);
  // Estado para nome do estabelecimento, similar ao Header.tsx
  const [establishmentName, setEstablishmentName] = useState("Sabor da Rua"); 

  useEffect(() => {
    // Listener para dados de contato
    const contactDocRef = doc(db, "content", "contact");
    const unsubscribeContact = onSnapshot(contactDocRef, (docSnap) => {
      if (docSnap.exists()) {
        setContactData(docSnap.data() as ContactFormValues);
      } else {
        setContactData(defaultContactValues);
      }
    }, (error) => {
      console.error("Erro ao buscar dados de Contato para Footer:", error);
      setContactData(defaultContactValues);
    });

    // Listener para nome do estabelecimento
    const settingsDocRef = doc(db, "content", "siteSettings");
    const unsubscribeSettings = onSnapshot(settingsDocRef, (docSnap) => {
      if (docSnap.exists() && docSnap.data().establishmentName) {
        setEstablishmentName(docSnap.data().establishmentName);
      } else {
        setEstablishmentName("Sabor da Rua"); // Fallback
      }
    }, (error) => {
      console.error("Erro ao buscar nome do estabelecimento para Footer:", error);
      setEstablishmentName("Sabor da Rua"); // Fallback em caso de erro
    });
    
    return () => {
      unsubscribeContact();
      unsubscribeSettings();
    }; // Limpar listeners
  }, []);


  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-card text-foreground/80 py-12">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-3 gap-8 mb-8 text-center md:text-left">
          <div>
            <h4 className="text-xl font-serif font-semibold text-primary mb-3">{establishmentName}</h4>
            <p className="text-sm leading-relaxed">
              A autêntica culinária de rua, com ingredientes frescos e muito amor. Peça delivery ou reserve sua mesa!
            </p>
          </div>
          <div>
            <h4 className="text-xl font-serif font-semibold text-primary mb-3">Links Rápidos</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#hero" className="hover:text-primary transition-colors">Início</a></li>
              <li><a href="#about" className="hover:text-primary transition-colors">Sobre Nós</a></li>
              <li><a href="#menu" className="hover:text-primary transition-colors">Cardápio</a></li>
              <li><a href="#contact" className="hover:text-primary transition-colors">Contato</a></li>
              {/* Poderia adicionar link para política de privacidade se existisse */}
            </ul>
          </div>
          <div>
            <h4 className="text-xl font-serif font-semibold text-primary mb-3">Siga-nos</h4>
            <div className="flex justify-center md:justify-start space-x-4">
              {contactData.facebookUrl && (
                <a 
                  href={contactData.facebookUrl} 
                  aria-label="Facebook" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-foreground/80 hover:text-primary transition-colors"
                >
                  <Facebook size={24} />
                </a>
              )}
              {contactData.instagramUrl && (
                <a 
                  href={contactData.instagramUrl} 
                  aria-label="Instagram" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-foreground/80 hover:text-primary transition-colors"
                >
                  <Instagram size={24} />
                </a>
              )}
            </div>
          </div>
        </div>
        <div className="border-t border-border/50 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-center">
          <p>&copy; {new Date().getFullYear()} {establishmentName}. Todos os direitos reservados.</p>
          <button 
            onClick={scrollToTop} 
            aria-label="Voltar ao topo"
            className="mt-4 md:mt-0 p-2 rounded-full hover:bg-primary/20 transition-colors"
          >
            <ArrowUp size={24} className="text-foreground/80"/>
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
