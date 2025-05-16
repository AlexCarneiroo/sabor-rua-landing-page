
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css' // Tailwind CSS
import { themes as appThemes, ColorTheme } from './lib/themes'; // Importar os temas

// Função para aplicar tema inicial do localStorage ou padrão
const applyInitialTheme = () => {
  try {
    if (typeof window !== 'undefined') {
      const storedThemeName = localStorage.getItem('activeThemeName');
      // Encontra o tema no array ou usa o primeiro como padrão
      const themeToApply = appThemes.find(t => t.name === storedThemeName) || appThemes[0];

      if (themeToApply) {
        Object.entries(themeToApply.colors).forEach(([key, value]) => {
          document.documentElement.style.setProperty(key, value as string);
        });
      }
    }
  } catch (error) {
    console.error("Erro ao aplicar tema inicial do localStorage:", error);
    // Fallback para o primeiro tema em caso de erro
    const defaultTheme = appThemes[0];
    if (defaultTheme) {
      Object.entries(defaultTheme.colors).forEach(([key, value]) => {
        document.documentElement.style.setProperty(key, value as string);
      });
    }
  }
};

applyInitialTheme(); // Aplicar antes do primeiro render

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

