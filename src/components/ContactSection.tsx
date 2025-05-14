
import React from 'react';
import { Button } from '@/components/ui/button';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

const ContactSection = () => {
  return (
    <section id="contact" className="py-16 md:py-24 bg-white">
      <div className="container mx-auto">
        <div className="text-center mb-12 md:mb-16 animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-slate-800 mb-4">
            Entre em <span className="text-brand-DEFAULT">Contato</span>
          </h2>
          <p className="text-lg text-slate-700 max-w-2xl mx-auto leading-relaxed">
            Tem alguma dúvida, sugestão ou quer fazer uma reserva? Fale conosco!
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <h3 className="text-2xl font-serif font-semibold text-slate-800 mb-6">Informações</h3>
            <div className="space-y-5 text-slate-700 text-lg">
              <div className="flex items-start">
                <MapPin className="w-6 h-6 mr-3 mt-1 text-brand-DEFAULT flex-shrink-0" />
                <span>Rua Fictícia das Delícias, 123<br />Bairro Saboroso, Cidade Exemplo - CE</span>
              </div>
              <div className="flex items-center">
                <Phone className="w-6 h-6 mr-3 text-brand-DEFAULT flex-shrink-0" />
                <span>(85) 91234-5678</span>
              </div>
              <div className="flex items-center">
                <Mail className="w-6 h-6 mr-3 text-brand-DEFAULT flex-shrink-0" />
                <span>contato@sabordarua.com.br</span>
              </div>
              <div className="flex items-start">
                <Clock className="w-6 h-6 mr-3 mt-1 text-brand-DEFAULT flex-shrink-0" />
                <span>
                  <strong>Seg - Sex:</strong> 11:00 - 23:00 <br />
                  <strong>Sáb - Dom:</strong> 12:00 - 00:00
                </span>
              </div>
            </div>
            {/* Placeholder para mapa */}
            <div className="mt-8 rounded-lg overflow-hidden shadow-lg aspect-video bg-gray-200 flex items-center justify-center">
               <p className="text-gray-500">Aqui vai um mapa!</p>
              {/* <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3981.329376017368!2d-38.5397656852409!3d-3.731860297279078!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x7c74997f9527c97%3A0x8a260696f658f04c!2sPraia%20de%20Iracema!5e0!3m2!1spt-BR!2sbr!4v1678886400000!5m2!1spt-BR!2sbr" 
                width="100%" 
                height="300" 
                style={{ border:0 }} 
                allowFullScreen={true} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="Localização do Sabor da Rua"
              ></iframe> */}
            </div>
          </div>

          <div className="bg-neutral-DEFAULT p-8 md:p-10 rounded-lg shadow-xl animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            <h3 className="text-2xl font-serif font-semibold text-brand-text mb-6">Mande uma Mensagem</h3>
            <form action="#" method="POST" className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-neutral-darktext mb-1">Nome Completo</label>
                <input type="text" name="name" id="name" required className="w-full px-4 py-3 bg-input text-foreground border-border rounded-md focus:ring-brand-DEFAULT focus:border-brand-DEFAULT transition-colors placeholder:text-muted-foreground" />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-neutral-darktext mb-1">Seu Email</label>
                <input type="email" name="email" id="email" required className="w-full px-4 py-3 bg-input text-foreground border-border rounded-md focus:ring-brand-DEFAULT focus:border-brand-DEFAULT transition-colors placeholder:text-muted-foreground" />
              </div>
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-neutral-darktext mb-1">Assunto</label>
                <input type="text" name="subject" id="subject" className="w-full px-4 py-3 bg-input text-foreground border-border rounded-md focus:ring-brand-DEFAULT focus:border-brand-DEFAULT transition-colors placeholder:text-muted-foreground" />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-neutral-darktext mb-1">Sua Mensagem</label>
                <textarea name="message" id="message" rows={4} required className="w-full px-4 py-3 bg-input text-foreground border-border rounded-md focus:ring-brand-DEFAULT focus:border-brand-DEFAULT transition-colors placeholder:text-muted-foreground"></textarea>
              </div>
              <div>
                <Button type="submit" size="lg" className="w-full bg-brand-DEFAULT hover:bg-brand-dark text-white text-lg">
                  Enviar Mensagem
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
