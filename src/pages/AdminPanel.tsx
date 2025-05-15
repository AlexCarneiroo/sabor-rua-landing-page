
import React from 'react';
import HeroManager from '@/components/admin/HeroManager';
import MenuManager from '@/components/admin/MenuManager'; // Importar o MenuManager
// import Header from '@/components/Header';
// import Footer from '@/components/Footer';

const AdminPanel = () => {
  return (
    <div className="flex flex-col min-h-screen bg-neutral-DEFAULT text-neutral-darktext">
      {/* <Header /> */}
      <main className="flex-grow container mx-auto py-8 px-4">
        <div className="mb-8">
          <h1 className="text-4xl font-serif font-bold text-brand-DEFAULT mb-2">Painel de Controle</h1>
          <p className="text-lg text-neutral-text">Bem-vindo! Gerencie o conteúdo do seu site por aqui.</p>
        </div>

        <div className="space-y-8"> {/* Usar space-y para espaçamento entre os cards */}
          {/* Seção para Gerenciar Hero Section */}
          <div>
            <HeroManager />
          </div>

          {/* Seção para Gerenciar Cardápio */}
          <div>
            <MenuManager />
          </div>

          {/* Placeholder para futuras seções */}
          <div className="bg-card p-6 rounded-lg shadow-xl">
            <h2 className="text-2xl font-serif font-bold text-brand-DEFAULT mb-4">Configurações Gerais</h2>
            <p className="text-neutral-text">Em breve: altere cores, fontes e outras configurações do site.</p>
          </div>
        </div>
      </main>
      {/* <Footer /> */}
    </div>
  );
};

export default AdminPanel;
