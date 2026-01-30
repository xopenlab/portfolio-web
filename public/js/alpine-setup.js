/**
 * Configuración de Alpine.js - Debe cargarse ANTES del CDN de Alpine
 * Este archivo NO es un módulo ES6 para asegurar carga síncrona
 */

/**
 * Detección inmediata del tema (ejecutado antes de que Alpine esté listo)
 */
(function() {
  const isDark = localStorage.getItem('darkMode') !== 'false';

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
        }
      });
    },

    toggle() {
      this.setTheme(!this.isDark);
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

  // Store de temas de color (datos centralizados desde data-attributes del HTML)
  const root = document.documentElement;
  const colorThemes = JSON.parse(root.dataset.colorThemes || '{}');
  const defaultTheme = root.dataset.defaultTheme || 'blue-dusk';

  Alpine.store('colorTheme', {
    current: localStorage.getItem('colorTheme') || defaultTheme,

    themes: colorThemes,

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

    },

    init() {
      this.setTheme(this.current);
    }
  });

  // Componente internalNav: aplica fondo glass al hacer scroll
  Alpine.data('internalNav', () => ({
    scrolled: false,

    init() {
      this.onScroll = () => { this.scrolled = window.scrollY > 60; };
      window.addEventListener('scroll', this.onScroll, { passive: true });
      this.onScroll();
    },

    destroy() {
      window.removeEventListener('scroll', this.onScroll);
    }
  }));

  // Componente heroReveal: gestiona el reveal de la imagen al hacer hover en el nombre
  Alpine.data('heroReveal', () => ({
    imageRevealed: false,

    revealImage() {
      this.imageRevealed = true;
    },

    hideImage() {
      this.imageRevealed = false;
    }
  }));

  // Store de paneles laterales (compartido entre header y páginas con paneles)
  Alpine.store('panel', {
    current: null,

    /**
     * Inicializar store: registrar listener de tecla ESC
     */
    init() {
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && this.current) {
          e.stopImmediatePropagation();
          this.close();
        }
      });
    },

    /**
     * Alternar panel: abrir si está cerrado, cerrar si está abierto
     * @param {string} name - Nombre del panel
     */
    toggle(name) {
      this.current = this.current === name ? null : name;
    },

    /**
     * Cerrar panel activo
     */
    close() {
      this.current = null;
    }
  });

});
