
import React from 'react';
import HeroManager from '@/components/admin/HeroManager';
// import Header from '@/components/Header'; // Pode ser um Header específico para o admin
// import Footer from '@/components/Footer'; // Pode ser um Footer específico para o admin

const AdminPanel = () => {
  return (
    <div className="flex flex-col min-h-screen bg-neutral-DEFAULT text-neutral-darktext">
      {/* <Header /> */}
      <main className="flex-grow container mx-auto py-8 px-4">
        <div className="mb-8">
          <h1 className="text-4xl font-serif font-bold text-brand-DEFAULT mb-2">Painel de Controle</h1>
          <p className="text-lg text-neutral-text">Bem-vindo! Gerencie o conteúdo do seu site por aqui.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Seção para Gerenciar Hero Section */}
          <div className="md:col-span-2 lg:col-span-3"> {/* Ocupa mais espaço se necessário */}
            <HeroManager />
          </div>

          {/* Placeholder para futuras seções */}
          <div className="bg-card p-6 rounded-lg shadow-xl">
            <h2 className="text-2xl font-serif font-bold text-brand-DEFAULT mb-4">Gerenciar Cardápio</h2>
            <p className="text-neutral-text">Em breve: adicione, edite ou remova pratos do cardápio.</p>
          </div>

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
