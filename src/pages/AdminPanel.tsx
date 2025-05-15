
import React from 'react';
import HeroManager from '@/components/admin/HeroManager';
import MenuManager from '@/components/admin/MenuManager';
import SiteSettingsManager from '@/components/admin/SiteSettingsManager'; // Importar o novo componente

const AdminPanel = () => {
  return (
    <div className="flex flex-col min-h-screen bg-neutral-DEFAULT text-neutral-darktext">
      <main className="flex-grow container mx-auto py-8 px-4">
        <div className="mb-8">
          <h1 className="text-4xl font-serif font-bold text-brand-DEFAULT mb-2">Painel de Controle</h1>
          <p className="text-lg text-neutral-text">Bem-vindo! Gerencie o conteúdo do seu site por aqui.</p>
        </div>

        <div className="space-y-8">
          <div>
            <SiteSettingsManager /> {/* Adicionar o gerenciador de configurações do site */}
          </div>
          <div>
            <HeroManager />
          </div>
          <div>
            <MenuManager />
          </div>
          <div className="bg-card p-6 rounded-lg shadow-xl">
            <h2 className="text-2xl font-serif font-bold text-brand-DEFAULT mb-4">Outras Configurações</h2>
            <p className="text-neutral-text">Em breve: mais opções de personalização (cores, vídeos, etc.).</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminPanel;
