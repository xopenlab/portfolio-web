/**
 * Inicialización de Vanta.js Birds para la página de perfil
 */
(function() {
  var vantaEffect = null;
  var debounceTimer = null;

  /**
   * Mezclar un color hex con blanco o negro para generar tintes/sombras
   * @param {string} hex - Color en formato CSS hex (#rrggbb)
   * @param {number} factor - 0 = color original, 1 = blanco/negro puro
   * @param {boolean} darken - true para oscurecer, false para aclarar
   * @returns {number} Color resultante como número
   */
  function blendColor(hex, factor, darken) {
    var r = parseInt(hex.slice(1, 3), 16);
    var g = parseInt(hex.slice(3, 5), 16);
    var b = parseInt(hex.slice(5, 7), 16);
    var target = darken ? 0 : 255;
    r = Math.round(r + (target - r) * factor);
    g = Math.round(g + (target - g) * factor);
    b = Math.round(b + (target - b) * factor);
    return (r << 16) | (g << 8) | b;
  }

  /**
   * Obtener colores actuales del tema
   * @returns {{ bgColor: number, color1: string|number, color2: string|number }}
   */
  function getThemeColors() {
    var style = getComputedStyle(document.documentElement);
    var primary = style.getPropertyValue('--active-theme-primary').trim();
    var secondary = style.getPropertyValue('--active-theme-secondary').trim();
    var isDark = document.documentElement.classList.contains('dark');
    var fallbackBg = isDark ? 0x111827 : 0xf5f0eb;
    return {
      bgColor: primary ? blendColor(primary, isDark ? 0.85 : 0.92, isDark) : fallbackBg,
      color1: primary || 0x6b8ba4,
      color2: secondary || 0xa3b8cc
    };
  }

  /**
   * Crear efecto Vanta Birds (solo se ejecuta una vez)
   */
  function create() {
    var el = document.getElementById('vanta-perfil');
    if (!el || typeof VANTA === 'undefined') return;

    if (vantaEffect) return;

    var colors = getThemeColors();

    vantaEffect = VANTA.BIRDS({
      el: el,
      THREE: THREE,
      mouseControls: true,
      touchControls: true,
      gyroControls: false,
      quantity: 2,
      birdSize: 0.8,
      wingSpan: 20,
      speedLimit: 2,
      separation: 80,
      alignment: 30,
      cohesion: 30,
      backgroundColor: colors.bgColor,
      color1: colors.color1,
      color2: colors.color2,
      colorMode: 'lerp'
    });

    var canvas = el.querySelector('canvas');
    if (canvas) canvas.style.opacity = '0.4';
  }

  /**
   * Actualizar colores del efecto sin destruirlo
   */
  function updateColors() {
    if (!vantaEffect) return;
    var colors = getThemeColors();
    vantaEffect.setOptions({
      backgroundColor: colors.bgColor,
      color1: colors.color1,
      color2: colors.color2
    });
  }

  function debouncedUpdate() {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(updateColors, 300);
  }

  document.addEventListener('curtainRevealed', create, { once: true });

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
