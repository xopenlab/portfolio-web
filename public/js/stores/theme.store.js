/**
 * Alpine.js Store para gestión del tema claro/oscuro
 * No contamina el objeto global window
 */

// Detección inmediata del tema (ejecutado antes de que Alpine esté listo)
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
 * Inicializar Alpine Store cuando Alpine esté disponible
 */
document.addEventListener('alpine:init', () => {
  Alpine.store('theme', {
    // Estado reactivo: true si está en modo oscuro
    isDark: document.documentElement.classList.contains('dark'),

    /**
     * Inicializar el store
     * Se ejecuta automáticamente cuando se monta
     */
    init() {
      // Escuchar cambios en las preferencias del sistema
      window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        // Solo aplicar si el usuario no ha establecido preferencia manual
        if (!localStorage.getItem('darkMode')) {
          this.setTheme(e.matches);
          console.log('✓ Tema automático:', e.matches ? 'oscuro' : 'claro', '(preferencia del sistema)');
        }
      });
    },

    /**
     * Alternar entre tema claro y oscuro
     */
    toggle() {
      this.setTheme(!this.isDark);
      console.log('✓ Tema cambiado a:', this.isDark ? 'oscuro' : 'claro');
    },

    /**
     * Establecer tema específico
     * @param {boolean} dark - true para modo oscuro, false para modo claro
     */
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
});

export { };
