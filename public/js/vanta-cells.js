/**
 * Inicialización de Vanta.js Cells para la página de contacto
 */
(function() {
  var vantaEffect = null;
  var debounceTimer = null;

  /**
   * Convertir color CSS hex (#rrggbb) a número (0xrrggbb)
   * @param {string} hex - Color en formato CSS hex
   * @returns {number} Color como número
   */
  function hexToNum(hex) {
    if (!hex || typeof hex !== 'string') return 0;
    return parseInt(hex.replace('#', ''), 16);
  }

  /**
   * Obtener colores actuales del tema
   * @returns {{ bgColor: number, color1: number, color2: number, isDark: boolean }}
   */
  function getThemeColors() {
    var style = getComputedStyle(document.documentElement);
    var primary = style.getPropertyValue('--active-theme-primary').trim();
    var secondary = style.getPropertyValue('--active-theme-secondary').trim();
    var isDark = document.documentElement.classList.contains('dark');
    return {
      bgColor: isDark ? 0x111827 : 0xf5f0eb,
      color1: primary ? hexToNum(primary) : 0x6b8ba4,
      color2: secondary ? hexToNum(secondary) : 0xa3b8cc,
      isDark: isDark
    };
  }

  /**
   * Crear efecto Vanta Cells
   */
  function create() {
    var el = document.getElementById('vanta-contacto');
    if (!el || typeof VANTA === 'undefined' || vantaEffect) return;

    var colors = getThemeColors();

    vantaEffect = VANTA.CELLS({
      el: el,
      THREE: THREE,
      mouseControls: true,
      touchControls: true,
      gyroControls: false,
      scale: 1.0,
      scaleMobile: 1.0,
      color1: colors.color1,
      color2: colors.color2,
      size: 1.5,
      speed: 1.0
    });

    // Opacidad reducida para efecto sutil
    var canvas = el.querySelector('canvas');
    if (canvas) canvas.style.opacity = colors.isDark ? '0.35' : '0.3';
  }

  /**
   * Actualizar colores del efecto sin destruirlo
   */
  function updateColors() {
    if (!vantaEffect) return;
    var colors = getThemeColors();
    vantaEffect.setOptions({
      color1: colors.color1,
      color2: colors.color2
    });

    // Ajustar opacidad según modo
    var el = document.getElementById('vanta-contacto');
    if (el) {
      var canvas = el.querySelector('canvas');
      if (canvas) canvas.style.opacity = colors.isDark ? '0.35' : '0.3';
    }
  }

  function debouncedUpdate() {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(updateColors, 300);
  }

  document.addEventListener('curtainRevealed', create, { once: true });

  if (document.body.classList.contains('page-revealed')) {
    create();
  }

  var styleObserver = new MutationObserver(function(mutations) {
    mutations.forEach(function(m) {
      if (m.attributeName === 'style' && vantaEffect) debouncedUpdate();
    });
  });
  styleObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['style'] });

  var classObserver = new MutationObserver(function() {
    if (vantaEffect) debouncedUpdate();
  });
  classObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

  window.addEventListener('beforeunload', function() {
    clearTimeout(debounceTimer);
    styleObserver.disconnect();
    classObserver.disconnect();
    if (vantaEffect) vantaEffect.destroy();
  });
})();
