/**
 * Configuración de Alpine.js - Debe cargarse ANTES del CDN de Alpine
 * Este archivo NO es un módulo ES6 para asegurar carga síncrona
 */

/**
 * Detección inmediata del tema (ejecutado antes de que Alpine esté listo)
 */
(function() {
  const isDark = localStorage.getItem('darkMode') === 'true' ||
                 (!localStorage.getItem('darkMode') && window.matchMedia('(prefers-color-scheme: dark)').matches);

  if (isDark) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
})();

/**
 * Registrar stores cuando Alpine esté disponible
 */
document.addEventListener('alpine:init', () => {
  // Store de tema claro/oscuro
  Alpine.store('theme', {
    isDark: document.documentElement.classList.contains('dark'),

    init() {
      window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        if (!localStorage.getItem('darkMode')) {
          this.setTheme(e.matches);
          console.log('✓ Tema automático:', e.matches ? 'oscuro' : 'claro', '(preferencia del sistema)');
        }
      });
    },

    toggle() {
      this.setTheme(!this.isDark);
      console.log('✓ Tema cambiado a:', this.isDark ? 'oscuro' : 'claro');
    },

    setTheme(dark) {
      this.isDark = dark;
      const html = document.documentElement;

      if (dark) {
        html.classList.add('dark');
        localStorage.setItem('darkMode', 'true');
      } else {
        html.classList.remove('dark');
        localStorage.setItem('darkMode', 'false');
      }
    }
  });

  // Store de temas de color
  Alpine.store('colorTheme', {
    current: localStorage.getItem('colorTheme') || 'blue-dusk',

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

    setTheme(themeName) {
      if (!this.themes[themeName]) {
        console.error(`Tema "${themeName}" no encontrado`);
        return;
      }

      this.current = themeName;
      const theme = this.themes[themeName];

      document.documentElement.style.setProperty('--active-theme-primary', theme.primary);
      document.documentElement.style.setProperty('--active-theme-secondary', theme.secondary);
      document.documentElement.style.setProperty('--active-theme-accent', theme.accent);

      localStorage.setItem('colorTheme', themeName);

      console.log(`✓ Tema de color cambiado a: ${themeName}`);
    },

    init() {
      this.setTheme(this.current);
    }
  });

  console.log('✓ Alpine.js stores registrados correctamente');
});
