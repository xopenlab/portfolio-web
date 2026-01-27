/**
 * Alpine.js Store para gestión de temas de color
 * 6 paletas intercambiables inspiradas en kazukinoda.com
 */

document.addEventListener('alpine:init', () => {
  Alpine.store('colorTheme', {
    // Tema actual (cargado desde localStorage)
    current: localStorage.getItem('colorTheme') || 'blue-dusk',

    // Definición de los 6 temas disponibles
    themes: {
      'blue-dusk': {
        primary: '#7d97b8',
        secondary: '#0369a1',
        accent: '#d946ef'
      },
      'golden-hour': {
        primary: '#dfb255',
        secondary: '#f59e0b',
        accent: '#d946ef'
      },
      'forest-green': {
        primary: '#52a47e',
        secondary: '#059669',
        accent: '#ec4899'
      },
      'sage-mist': {
        primary: '#9eaf92',
        secondary: '#10b981',
        accent: '#8b5cf6'
      },
      'stone-gray': {
        primary: '#a7b6b0',
        secondary: '#6b7280',
        accent: '#ec4899'
      },
      'charcoal-night': {
        primary: '#2a2927',
        secondary: '#1f2937',
        accent: '#f59e0b'
      }
    },

    /**
     * Cambiar tema de color
     * @param {string} themeName - Nombre del tema (ej: 'blue-dusk')
     */
    setTheme(themeName) {
      if (!this.themes[themeName]) {
        console.error(`Tema "${themeName}" no encontrado`);
        return;
      }

      this.current = themeName;
      const theme = this.themes[themeName];

      // Aplicar CSS custom properties en :root
      document.documentElement.style.setProperty('--active-theme-primary', theme.primary);
      document.documentElement.style.setProperty('--active-theme-secondary', theme.secondary);
      document.documentElement.style.setProperty('--active-theme-accent', theme.accent);

      // Guardar en localStorage
      localStorage.setItem('colorTheme', themeName);

      console.log(`✓ Tema de color cambiado a: ${themeName}`);
    },

    /**
     * Inicializar tema al cargar
     * Se ejecuta automáticamente cuando se monta el componente
     */
    init() {
      this.setTheme(this.current);
    }
  });
});

export { };
