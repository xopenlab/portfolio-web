/**
 * Inicializa la funcionalidad del botón flotante de scroll to top
 * Muestra el botón después de 300px de scroll y permite volver arriba suavemente
 * @returns {void}
 */
export function initFloatingScrollTop() {
  const scrollBtn = document.getElementById('scrollToTopBtn');
  if (!scrollBtn) return;

  // Mostrar botón después de hacer scroll de 300px
  let scrollTimeout;
  window.addEventListener('scroll', () => {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
      if (window.scrollY > 300) {
        scrollBtn.style.opacity = '1';
        scrollBtn.style.pointerEvents = 'auto';
      } else {
        scrollBtn.style.opacity = '0';
        scrollBtn.style.pointerEvents = 'none';
      }
    }, 100);
  }, { passive: true });

  // Efectos hover
  scrollBtn.addEventListener('mouseenter', () => {
    scrollBtn.style.transform = 'scale(1.05)';
    scrollBtn.style.boxShadow = '0 6px 16px rgba(0, 0, 0, 0.2)';
  });

  scrollBtn.addEventListener('mouseleave', () => {
    scrollBtn.style.transform = 'scale(1)';
    scrollBtn.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
  });

  // Click: scroll hacia arriba
  scrollBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}
