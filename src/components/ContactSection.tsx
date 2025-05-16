
import React, { useEffect, useState } from 'react';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { doc, getDoc } from 'firebase/firestore'; // getDoc é suficiente aqui, não precisamos de onSnapshot para esta seção
import { db } from '@/lib/firebase';
import { defaultContactValues } from '@/components/admin/ContactManager';
import type { ContactFormValues } from '@/components/admin/ContactManager';

const ContactSection = () => {
  const [contactData, setContactData] = useState<ContactFormValues>(defaultContactValues);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContactData = async () => {
      setLoading(true); // Definir loading como true no início da busca
      try {
        const docRef = doc(db, "content", "contact");
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          setContactData(docSnap.data() as ContactFormValues);
        } else {
          console.log("Nenhum dado encontrado para a seção Contato, usando valores padrão");
          // Se não existir, podemos configurar com valores padrão se quisermos, ou apenas usar o estado inicial
          // await setDoc(docRef, defaultContactValues); // Opcional: criar se não existir
          setContactData(defaultContactValues);
        }
      } catch (error) {
        console.error("Erro ao buscar dados da seção Contato:", error);
        setContactData(defaultContactValues); // Fallback para valores padrão em caso de erro
      } finally {
        setLoading(false);
      }
    };

    fetchContactData();
  }, []);

  if (loading) {
    return (
      <section id="contact" className="py-16 md:py-24 bg-background text-foreground"> {/* Ajustado bg e text */}
        <div className="container mx-auto">
          <div className="text-center mb-12 md:mb-16">
            <div className="h-10 bg-muted/50 rounded w-1/2 mx-auto animate-pulse mb-4"></div>
            <div className="h-6 bg-muted/50 rounded w-3/4 mx-auto animate-pulse"></div>
          </div>
          <div className="max-w-2xl mx-auto bg-card p-8 rounded-lg shadow-xl animate-pulse">
            <div className="h-8 bg-muted/50 rounded w-1/3 mb-6"></div>
            <div className="space-y-5">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="flex items-start">
                  <div className="w-6 h-6 mr-3 bg-muted/50 rounded-full"></div>
                  <div className="h-5 bg-muted/50 rounded w-3/4"></div>
                </div>
              ))}
            </div>
            <div className="mt-8 rounded-lg aspect-video bg-muted/50"></div>
          </div>
        </div>
      </section>
    );
  }
  
  // Ajustando cores para alinhar com o tema escuro padrão
  return (
    <section id="contact" className="py-16 md:py-24 bg-background text-foreground">
      <div className="container mx-auto">
        <div className="text-center mb-12 md:mb-16 animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-brand-text mb-4">
            {contactData.title} <span className="text-primary">{contactData.highlightedWord}</span>
          </h2>
          <p className="text-lg text-neutral-text/80 max-w-2xl mx-auto leading-relaxed"> {/* Ajustado para neutral-text/80 */}
            {contactData.description}
          </p>
        </div>

        {/* A seção de informações de contato agora centralizada e com largura máxima */}
        <div className="max-w-2xl mx-auto bg-card p-8 md:p-10 rounded-lg shadow-xl animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          <h3 className="text-2xl font-serif font-semibold text-brand-text mb-6">Informações de Contato</h3>
          <div className="space-y-5 text-neutral-text/90 text-lg"> {/* Ajustado para neutral-text/90 */}
            <div className="flex items-start">
              <MapPin className="w-6 h-6 mr-3 mt-1 text-primary flex-shrink-0" />
              <span>{contactData.address}</span>
            </div>
            <div className="flex items-center">
              <Phone className="w-6 h-6 mr-3 text-primary flex-shrink-0" />
              <span>{contactData.phone}</span>
            </div>
            <div className="flex items-center">
              <Mail className="w-6 h-6 mr-3 text-primary flex-shrink-0" />
              <span>{contactData.email}</span>
            </div>
            <div className="flex items-start">
              <Clock className="w-6 h-6 mr-3 mt-1 text-primary flex-shrink-0" />
              <span>
                <strong>Seg - Sex:</strong> {contactData.scheduleWeekdays} <br />
                <strong>Sáb - Dom:</strong> {contactData.scheduleWeekends}
              </span>
            </div>
          </div>
          {/* Placeholder para mapa */}
          <div className="mt-8 rounded-lg overflow-hidden shadow-lg aspect-video bg-muted/30 flex items-center justify-center"> {/* Ajustado bg do placeholder */}
             <p className="text-muted-foreground">Mapa da localização (Google Maps)</p>
            {/* 
              Aqui você pode adicionar o iframe do Google Maps quando tiver a URL correta.
              Lembre-se de obter uma chave de API do Google Maps se for necessário para embeds mais complexos.
            */}
            {/* <iframe 
              src="COLOQUE_A_URL_DO_SEU_MAPA_AQUI" 
              width="100%" 
              height="350" // Aumentei um pouco a altura
              style={{ border:0 }} 
              allowFullScreen={true} 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title={`Localização de ${contactData.address.substring(0,30)}`} // Título mais dinâmico
            ></iframe> */}
          </div>
        </div>
        {/* A seção do formulário foi removida */}
      </div>
    </section>
  );
};

export default ContactSection;
