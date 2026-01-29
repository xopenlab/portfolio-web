/**
 * Inicialización de Vanta.js Halo para la página de proyectos
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
   * @returns {{ bgColor: number, baseColor: number, color2: number, isDark: boolean }}
   */
  function getThemeColors() {
    var style = getComputedStyle(document.documentElement);
    var primary = style.getPropertyValue('--active-theme-primary').trim();
    var secondary = style.getPropertyValue('--active-theme-secondary').trim();
    var isDark = document.documentElement.classList.contains('dark');
    return {
      bgColor: isDark ? 0x111827 : 0xf5f0eb,
      baseColor: primary ? hexToNum(primary) : 0x6b8ba4,
      color2: secondary ? hexToNum(secondary) : 0xa3b8cc,
      isDark: isDark
    };
  }

  /**
   * Crear efecto Vanta Halo
   */
  function create() {
    var el = document.getElementById('vanta-proyectos');
    if (!el || typeof VANTA === 'undefined' || vantaEffect) return;

    var colors = getThemeColors();

    vantaEffect = VANTA.HALO({
      el: el,
      THREE: THREE,
      mouseControls: true,
      touchControls: true,
      gyroControls: false,
      scale: 1.0,
      scaleMobile: 1.0,
      backgroundColor: colors.bgColor,
      baseColor: colors.baseColor,
      color2: colors.color2,
      amplitudeFactor: 0.8,
      size: 1.2,
      speed: 0.8
    });

    // Mayor opacidad en modo claro para compensar menor contraste
    var canvas = el.querySelector('canvas');
    if (canvas) canvas.style.opacity = colors.isDark ? '0.2' : '0.5';
  }

  /**
   * Recrear efecto con los colores actuales del tema
   * Halo usa shaders GLSL que no actualizan colores vía setOptions,
   * por lo que es necesario destruir y recrear el efecto.
   */
  function recreate() {
    if (vantaEffect) {
      vantaEffect.destroy();
      vantaEffect = null;
    }
    create();
  }

  function debouncedUpdate() {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(recreate, 300);
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
