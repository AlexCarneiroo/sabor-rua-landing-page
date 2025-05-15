
import React from 'react';
import Header from '@/components/Header'; // Podemos reutilizar ou criar um Header específico para o admin
import Footer from '@/components/Footer'; // Podemos reutilizar ou criar um Footer específico para o admin

const AdminPanel = () => {
  return (
    <div className="flex flex-col min-h-screen bg-neutral-DEFAULT text-neutral-darktext">
      {/* Por enquanto, podemos omitir Header e Footer específicos do admin ou usar os existentes se fizer sentido */}
      {/* <Header /> */}
      <main className="flex-grow container mx-auto py-8">
        <div className="bg-card p-6 rounded-lg shadow-xl">
          <h1 className="text-3xl font-serif font-bold text-brand-DEFAULT mb-6">Painel de Controle</h1>
          <p className="text-neutral-text">Bem-vindo ao painel de controle. Aqui você poderá gerenciar o conteúdo do seu site.</p>
          {/* Futuras seções do painel de controle serão adicionadas aqui */}
        </div>
      </main>
      {/* <Footer /> */}
    </div>
  );
};

export default AdminPanel;
