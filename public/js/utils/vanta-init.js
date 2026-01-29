/**
 * Utilidad para inicializar y gestionar efectos Vanta.js
 * Centraliza la lógica de creación, reactividad a temas y limpieza
 */

/**
 * Inicializa un efecto Vanta.js con gestión automática de temas y limpieza
 * @param {Object} options - Opciones de configuración
 * @param {string} options.elementId - ID del elemento contenedor
 * @param {Function} options.createEffect - Función que recibe (el, colors) y retorna la instancia Vanta
 * @param {number} [options.canvasOpacity=0.4] - Opacidad del canvas
 */
export function initVanta({ elementId, createEffect, canvasOpacity = 0.4 }) {
  var vantaEffect = null;

  /** Leer colores del tema activo y crear/recrear el efecto */
  function create() {
    var el = document.getElementById(elementId);
    if (!el || typeof VANTA === 'undefined') return;

    // Destruir instancia anterior si existe
    if (vantaEffect) {
      vantaEffect.destroy();
      vantaEffect = null;
    }

    var style = getComputedStyle(document.documentElement);
    var primary = style.getPropertyValue('--active-theme-primary').trim();
    var secondary = style.getPropertyValue('--active-theme-secondary').trim();
    var isDark = document.documentElement.classList.contains('dark');
    var bgColor = isDark ? 0x111827 : 0xf5f0eb;

    vantaEffect = createEffect(el, { primary, secondary, bgColor });

    // Reducir opacidad del canvas para que el efecto sea sutil
    var canvas = el.querySelector('canvas');
    if (canvas) canvas.style.opacity = String(canvasOpacity);
  }

  // Inicializar cuando la cortina se revele
  document.addEventListener('curtainRevealed', create, { once: true });

  // Reaccionar a cambios de paleta de colores (Alpine store)
  var styleObserver = new MutationObserver(function(mutations) {
    mutations.forEach(function(m) {
      if (m.attributeName === 'style' && vantaEffect) {
        create();
      }
    });
  });
  styleObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['style'] });

  // Reaccionar a cambio dark/light
  var classObserver = new MutationObserver(function() {
    if (vantaEffect) create();
  });
  classObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

  // Limpiar al navegar (SPA)
  window.addEventListener('beforeunload', function() {
    styleObserver.disconnect();
    classObserver.disconnect();
    if (vantaEffect) vantaEffect.destroy();
  });
}
