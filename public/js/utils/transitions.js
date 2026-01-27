/**
 * Sistema de transiciones entre páginas
 * Añade efectos de fade-in al cargar cada página
 */

/**
 * Inicializar transiciones de página
 * Se ejecuta automáticamente al cargar el DOM
 */
export function initPageTransitions() {
  // Fade-in al cargar página (ejecutado después de que el DOM esté listo)
  document.addEventListener('DOMContentLoaded', () => {
    document.body.classList.add('page-loaded');
  });

  // Opcional: Loading state al navegar (para enlaces internos)
  document.querySelectorAll('a[href^="/"]').forEach(link => {
    link.addEventListener('click', (e) => {
      // Solo aplicar a enlaces que no abren en nueva pestaña y no tienen modificadores
      if (!link.target && !e.ctrlKey && !e.metaKey && !e.shiftKey) {
        document.body.classList.add('page-leaving');
      }
    });
  });
}
