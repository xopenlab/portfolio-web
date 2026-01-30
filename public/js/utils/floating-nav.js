/**
 * Botón flotante minimalista para volver atrás en la navegación
 */

export function initFloatingNav() {
  // Esperar a que el DOM esté completamente cargado
  const init = () => {
    const floatingBtn = document.getElementById('floatingNavBtn');

    if (!floatingBtn) return;

    // Forzar estilos básicos via JavaScript para evitar conflictos CSS - Minimalista top-left
    floatingBtn.style.position = 'fixed';
    floatingBtn.style.top = '6rem';
    floatingBtn.style.left = '1.5rem';
    floatingBtn.style.zIndex = '99999';
    floatingBtn.style.width = '2.5rem';
    floatingBtn.style.height = '2.5rem';
    floatingBtn.style.borderRadius = '50%';
    floatingBtn.style.display = 'flex';
    floatingBtn.style.alignItems = 'center';
    floatingBtn.style.justifyContent = 'center';
    floatingBtn.style.backgroundColor = 'transparent';
    floatingBtn.style.border = 'none';
    floatingBtn.style.boxShadow = 'none';
    floatingBtn.style.cursor = 'pointer';
    floatingBtn.style.transition = 'all 0.2s ease';
    floatingBtn.style.opacity = '0';
    floatingBtn.style.pointerEvents = 'none';

    // En páginas legales, mostrar siempre
    const isLegalPage = document.body.classList.contains('legal-page') ||
                        document.querySelector('main.legal-page');

    if (isLegalPage) {
      // Mostrar inmediatamente en páginas legales
      setTimeout(() => {
        floatingBtn.style.opacity = '1';
        floatingBtn.style.pointerEvents = 'auto';
      }, 100);
    }

    // Hover effects
    floatingBtn.addEventListener('mouseenter', () => {
      floatingBtn.style.transform = 'scale(1.05)';
      floatingBtn.style.boxShadow = '0 6px 16px rgba(0, 0, 0, 0.2)';
    });

    floatingBtn.addEventListener('mouseleave', () => {
      floatingBtn.style.transform = 'scale(1)';
      floatingBtn.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
    });

    // Funcionalidad del botón: VOLVER ATRÁS en la navegación
    floatingBtn.addEventListener('click', () => {
      // Si hay historial previo, volver atrás
      if (window.history.length > 1) {
        window.history.back();
      } else {
        // Si no hay historial (entrada directa), ir a la página principal
        window.location.href = '/';
      }
    });
  };

  // Ejecutar cuando el DOM esté listo
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
}
