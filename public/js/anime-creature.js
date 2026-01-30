/**
 * Fondo animado con anime.js para la página de contacto
 * Basado en el efecto "Additive creature" de Julian Garnier
 * Adaptado para integrarse con el sistema de temas del portfolio
 *
 * Requiere: anime.js v4 UMD (cargado como script global antes de este archivo)
 */
(function () {
  var containerEl = null;
  var particuleEls = null;
  var mainLoop = null;
  var autoMove = null;
  var manualMovementTimeout = null;
  var styleObserver = null;
  var classObserver = null;
  var debounceTimer = null;
  var rows = 13;
  var grid = [rows, rows];
  var from = 'center';
  var viewport = { w: 0, h: 0 };
  var cursor = { x: 0, y: 0 };
  var initialized = false;

  // Referencia a las funciones de anime.js (global UMD)
  var animate = null;
  var stagger = null;
  var createTimeline = null;
  var createTimer = null;
  var utils = null;

  /**
   * Obtener el color primario del tema activo en formato HSL
   * @returns {{ hue: number, saturation: number, lightness: number }}
   */
  function getThemeHSL() {
    var style = getComputedStyle(document.documentElement);
    var hex = style.getPropertyValue('--active-theme-primary').trim();
    if (!hex) return { hue: 4, saturation: 70, lightness: 50 };

    // Convertir hex a HSL
    var r = parseInt(hex.slice(1, 3), 16) / 255;
    var g = parseInt(hex.slice(3, 5), 16) / 255;
    var b = parseInt(hex.slice(5, 7), 16) / 255;
    var max = Math.max(r, g, b);
    var min = Math.min(r, g, b);
    var h = 0;
    var s = 0;
    var l = (max + min) / 2;

    if (max !== min) {
      var d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      if (max === r) h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
      else if (max === g) h = ((b - r) / d + 2) / 6;
      else h = ((r - g) / d + 4) / 6;
    }

    return {
      hue: Math.round(h * 360),
      saturation: Math.round(s * 100),
      lightness: Math.round(l * 100)
    };
  }

  /**
   * Calcular índice de distancia desde el centro de la grid
   * @param {number} i - Índice del elemento
   * @returns {number} Factor normalizado 0..1 (0 = centro, 1 = borde)
   */
  function distFromCenter(i) {
    var col = i % rows;
    var row = Math.floor(i / rows);
    var center = (rows - 1) / 2;
    var dx = (col - center) / center;
    var dy = (row - center) / center;
    return Math.min(1, Math.sqrt(dx * dx + dy * dy));
  }

  /**
   * Aplicar colores del tema a las partículas
   */
  function applyThemeColors() {
    if (!particuleEls) return;
    var hsl = getThemeHSL();
    var total = particuleEls.length;

    for (var i = 0; i < total; i++) {
      var d = distFromCenter(i);
      // Lightness: 80% en el centro, 20% en los bordes
      var lightness = Math.round(80 - d * 60);
      // Shadow blur: 8em en el centro, 1em en los bordes
      var blur = Math.round(8 - d * 7);

      particuleEls[i].style.background = 'hsl(' + hsl.hue + ', ' + hsl.saturation + '%, ' + lightness + '%)';
      particuleEls[i].style.boxShadow = '0px 0px ' + blur + 'em 0px hsl(' + hsl.hue + ', ' + hsl.saturation + '%, 50%)';
    }
  }

  /**
   * Crear e inicializar la animación
   */
  function create() {
    containerEl = document.getElementById('anime-creature');
    if (!containerEl || initialized) return;

    // Verificar que anime.js está disponible como global UMD
    if (typeof window.anime === 'undefined') return;

    // Extraer funciones de anime.js
    animate = window.anime.animate;
    stagger = window.anime.stagger;
    createTimeline = window.anime.createTimeline;
    createTimer = window.anime.createTimer;
    utils = window.anime.utils;

    initialized = true;
    viewport.w = window.innerWidth * 0.5;
    viewport.h = window.innerHeight * 0.5;

    var scaleStagger = stagger([2, 5], { ease: 'inQuad', grid: grid, from: from });
    var opacityStagger = stagger([1, 0.1], { grid: grid, from: from });
    var hsl = getThemeHSL();

    // Crear partículas
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < rows * rows; i++) {
      fragment.appendChild(document.createElement('div'));
    }
    containerEl.appendChild(fragment);

    particuleEls = containerEl.querySelectorAll('div');

    utils.set(containerEl, {
      width: rows * 10 + 'em',
      height: rows * 10 + 'em'
    });

    utils.set(particuleEls, {
      x: 0,
      y: 0,
      scale: scaleStagger,
      opacity: opacityStagger,
      background: stagger([80, 20], {
        grid: grid,
        from: from,
        modifier: function (v) {
          return 'hsl(' + hsl.hue + ', ' + hsl.saturation + '%, ' + v + '%)';
        }
      }),
      boxShadow: stagger([8, 1], {
        grid: grid,
        from: from,
        modifier: function (v) {
          return '0px 0px ' + utils.round(v, 0) + 'em 0px hsl(' + hsl.hue + ', ' + hsl.saturation + '%, 50%)';
        }
      }),
      zIndex: stagger([rows * rows, 1], { grid: grid, from: from, modifier: utils.round(0) })
    });

    var pulse = function () {
      animate(particuleEls, {
        keyframes: [
          {
            scale: 5,
            opacity: 1,
            delay: stagger(90, { start: 1650, grid: grid, from: from }),
            duration: 150
          },
          {
            scale: scaleStagger,
            opacity: opacityStagger,
            ease: 'inOutQuad',
            duration: 600
          }
        ]
      });
    };

    mainLoop = createTimer({
      frameRate: 15,
      onUpdate: function () {
        animate(particuleEls, {
          x: cursor.x,
          y: cursor.y,
          delay: stagger(40, { grid: grid, from: from }),
          duration: stagger(120, { start: 750, ease: 'inQuad', grid: grid, from: from }),
          ease: 'inOut',
          composition: 'blend'
        });
      }
    });

    autoMove = createTimeline()
      .add(cursor, {
        x: [-viewport.w * 0.45, viewport.w * 0.45],
        modifier: function (x) {
          return x + Math.sin(mainLoop.currentTime * 0.0007) * viewport.w * 0.5;
        },
        duration: 3000,
        ease: 'inOutExpo',
        alternate: true,
        loop: true,
        onBegin: pulse,
        onLoop: pulse
      }, 0)
      .add(cursor, {
        y: [-viewport.h * 0.45, viewport.h * 0.45],
        modifier: function (y) {
          return y + Math.cos(mainLoop.currentTime * 0.00012) * viewport.h * 0.5;
        },
        duration: 1000,
        ease: 'inOutQuad',
        alternate: true,
        loop: true
      }, 0);

    manualMovementTimeout = createTimer({
      duration: 1500,
      onComplete: function () { autoMove.play(); }
    });

    // Seguimiento del puntero
    document.addEventListener('mousemove', followPointer);
    document.addEventListener('touchmove', followPointer);
  }

  /**
   * Seguir el movimiento del puntero/táctil
   * @param {Event} e - Evento de movimiento
   */
  function followPointer(e) {
    var event = e.type === 'touchmove' ? e.touches[0] : e;
    cursor.x = event.pageX - viewport.w;
    cursor.y = event.pageY - viewport.h;
    autoMove.pause();
    manualMovementTimeout.restart();
  }

  /**
   * Actualizar colores con debounce al cambiar tema
   */
  function debouncedUpdate() {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(applyThemeColors, 300);
  }

  // Inicialización: esperar a que la cortina se revele
  document.addEventListener('curtainRevealed', create, { once: true });

  // Fallback: si la página ya se reveló (acceso directo por URL)
  if (document.body.classList.contains('page-revealed')) {
    create();
  }

  // Observar cambios de estilo (cambio de paleta de color)
  styleObserver = new MutationObserver(function (mutations) {
    mutations.forEach(function (m) {
      if (m.attributeName === 'style' && initialized) debouncedUpdate();
    });
  });
  styleObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['style'] });

  // Observar cambios de clase (dark/light mode)
  classObserver = new MutationObserver(function () {
    if (initialized) debouncedUpdate();
  });
  classObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

  // Limpieza al salir
  window.addEventListener('beforeunload', function () {
    clearTimeout(debounceTimer);
    if (styleObserver) styleObserver.disconnect();
    if (classObserver) classObserver.disconnect();
    document.removeEventListener('mousemove', followPointer);
    document.removeEventListener('touchmove', followPointer);
  });
})();
