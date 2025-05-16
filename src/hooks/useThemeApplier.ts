
import { useEffect, useState } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { themes, ColorTheme } from '@/lib/themes';

const defaultThemeName = themes[0].name;

export function useThemeApplier() {
  const [isLoading, setIsLoading] = useState(true);
  const [activeThemeName, setActiveThemeName] = useState<string>(() => {
    // Try to get theme from localStorage first for faster initial paint
    if (typeof window !== 'undefined') {
      const storedThemeName = localStorage.getItem('activeThemeName');
      return storedThemeName || defaultThemeName;
    }
    return defaultThemeName;
  });

  useEffect(() => {
    // This effect runs once on mount to apply initial theme from localStorage/default
    // and then sets up Firestore listener.
    const applyTheme = (themeName: string) => {
      const selectedTheme = themes.find(theme => theme.name === themeName) || themes.find(t => t.name === defaultThemeName);
      if (selectedTheme) {
        Object.entries(selectedTheme.colors).forEach(([key, value]) => {
          document.documentElement.style.setProperty(key, value as string);
        });
        if (typeof window !== 'undefined') {
          localStorage.setItem('activeThemeName', themeName);
        }
      }
    };

    applyTheme(activeThemeName); // Apply initial theme

    const settingsDocRef = doc(db, "content", "siteSettings");
    const unsubscribe = onSnapshot(settingsDocRef, (docSnap) => {
      setIsLoading(true); // Set loading true while processing snapshot
      if (docSnap.exists()) {
        const newThemeName = docSnap.data().activeThemeName;
        if (newThemeName && newThemeName !== activeThemeName) {
          setActiveThemeName(newThemeName);
          applyTheme(newThemeName); // Apply new theme from Firestore
        } else if (!newThemeName && defaultThemeName !== activeThemeName) {
          // If theme was removed from DB, revert to default
          setActiveThemeName(defaultThemeName);
          applyTheme(defaultThemeName);
        }
      } else if (defaultThemeName !== activeThemeName) {
        // If doc doesn't exist, revert to default
        setActiveThemeName(defaultThemeName);
        applyTheme(defaultThemeName);
      }
      setIsLoading(false);
    }, (error) => {
      console.error("Erro ao buscar tema ativo via Firestore:", error);
      // Fallback to current activeThemeName (likely default or localStorage) if Firestore fails
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []); // Empty dependency array means this effect runs once on mount for listener setup

  // This effect reacts to changes in activeThemeName (e.g., from Firestore listener)
  // and applies the theme. It's separated to avoid re-subscribing to Firestore.
  useEffect(() => {
    const selectedTheme = themes.find(theme => theme.name === activeThemeName) || themes.find(t => t.name === defaultThemeName);
    if (selectedTheme) {
      Object.entries(selectedTheme.colors).forEach(([key, value]) => {
        document.documentElement.style.setProperty(key, value as string);
      });
      if (typeof window !== 'undefined') {
        localStorage.setItem('activeThemeName', activeThemeName);
      }
    }
    setIsLoading(false); // Ensure loading is false after theme is applied
  }, [activeThemeName]);


  return { isLoading, activeThemeName };
}

