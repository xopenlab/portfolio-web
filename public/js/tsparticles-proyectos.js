/**
 * Inicialización de tsParticles para la página de proyectos
 * Efecto sutil y minimalista reactivo al tema de color y modo oscuro/claro
 */
(function() {
  var particlesInstance = null;
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
   * Mezclar un color hex con blanco o negro para generar tintes/sombras
   * @param {string} hex - Color en formato CSS hex (#rrggbb)
   * @param {number} factor - 0 = color original, 1 = blanco/negro puro
   * @param {boolean} darken - true para oscurecer, false para aclarar
   * @returns {string} Color resultante como hex CSS (#rrggbb)
   */
  function blendColorHex(hex, factor, darken) {
    var r = parseInt(hex.slice(1, 3), 16);
    var g = parseInt(hex.slice(3, 5), 16);
    var b = parseInt(hex.slice(5, 7), 16);
    var target = darken ? 0 : 255;
    r = Math.round(r + (target - r) * factor);
    g = Math.round(g + (target - g) * factor);
    b = Math.round(b + (target - b) * factor);
    return '#' + ((1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1);
  }

  /**
   * Obtener colores actuales del tema en formato hex CSS
   * @returns {{ bgColor: string, primary: string, secondary: string, isDark: boolean }}
   */
  function getThemeColors() {
    var style = getComputedStyle(document.documentElement);
    var primary = style.getPropertyValue('--active-theme-primary').trim();
    var secondary = style.getPropertyValue('--active-theme-secondary').trim();
    var isDark = document.documentElement.classList.contains('dark');
    var fallbackBg = isDark ? '#111827' : '#f5f0eb';
    return {
      bgColor: primary ? blendColorHex(primary, isDark ? 0.85 : 0.92, isDark) : fallbackBg,
      primary: primary || '#6b8ba4',
      secondary: secondary || '#a3b8cc',
      isDark: isDark
    };
  }

  /**
   * Generar configuración de tsParticles según el tema actual
   * @returns {object} Configuración para tsParticles
   */
  function getParticlesConfig() {
    var colors = getThemeColors();
    return {
      fullScreen: { enable: false },
      fpsLimit: 60,
      background: {
        color: { value: colors.bgColor }
      },
      particles: {
        number: {
          value: colors.isDark ? 55 : 70,
          density: { enable: true, area: 800 }
        },
        color: {
          value: [colors.primary, colors.secondary]
        },
        opacity: {
          value: { min: 0.1, max: colors.isDark ? 0.3 : 0.4 },
          animation: {
            enable: true,
            speed: 0.3,
            minimumValue: 0.05,
            sync: false
          }
        },
        size: {
          value: { min: 1, max: 3 },
          animation: {
            enable: true,
            speed: 0.5,
            minimumValue: 0.5,
            sync: false
          }
        },
        move: {
          enable: true,
          speed: 0.4,
          direction: 'none',
          random: true,
          straight: false,
          outModes: { default: 'out' }
        },
        links: {
          enable: false
        }
      },
      interactivity: {
        detectsOn: 'canvas',
        events: {
          onHover: {
            enable: true,
            mode: 'grab'
          },
          resize: { enable: true }
        },
        modes: {
          grab: {
            distance: 120,
            links: {
              opacity: colors.isDark ? 0.15 : 0.25,
              color: colors.primary
            }
          }
        }
      },
      detectRetina: true
    };
  }

  /**
   * Crear instancia de tsParticles
   * El bundle slim requiere inicialización con loadSlim antes de cargar partículas
   */
  function create() {
    var el = document.getElementById('vanta-proyectos');
    if (!el || typeof tsParticles === 'undefined' || particlesInstance) return;

    // Asegurar dimensiones del contenedor para que tsParticles renderice
    el.style.width = '100%';
    el.style.height = '100%';

    loadSlim(tsParticles).then(function() {
      return tsParticles.load({ id: 'vanta-proyectos', options: getParticlesConfig() });
    }).then(function(instance) {
      particlesInstance = instance;
    });
  }

  /**
   * Actualizar colores y configuración sin destruir la instancia
   */
  function updateColors() {
    if (!particlesInstance) return;
    var config = getParticlesConfig();

    // Actualizar opciones de la instancia existente
    particlesInstance.options.background.color.value = config.background.color.value;
    particlesInstance.options.particles.color.value = config.particles.color.value;
    particlesInstance.options.particles.opacity.value = config.particles.opacity.value;
    particlesInstance.options.particles.number.value = config.particles.number.value;
    particlesInstance.options.interactivity.modes.grab.links.opacity = config.interactivity.modes.grab.links.opacity;
    particlesInstance.options.interactivity.modes.grab.links.color = config.interactivity.modes.grab.links.color;
    particlesInstance.refresh();
  }

  /**
   * Actualización debounced para evitar recreaciones excesivas
   */
  function debouncedUpdate() {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(updateColors, 300);
  }

  // Inicializar tras la animación de cortina
  document.addEventListener('curtainRevealed', create, { once: true });

  // Fallback si la cortina ya se reveló
  if (document.body.classList.contains('page-revealed')) {
    create();
  }

  // Observar cambios de tema de color (CSS custom properties)
  var styleObserver = new MutationObserver(function(mutations) {
    mutations.forEach(function(m) {
      if (m.attributeName === 'style' && particlesInstance) debouncedUpdate();
    });
  });
  styleObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['style'] });

  // Observar cambios de modo oscuro/claro (clase 'dark')
  var classObserver = new MutationObserver(function() {
    if (particlesInstance) debouncedUpdate();
  });
  classObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

  // Limpieza al salir de la página
  window.addEventListener('beforeunload', function() {
    clearTimeout(debounceTimer);
    styleObserver.disconnect();
    classObserver.disconnect();
    if (particlesInstance) particlesInstance.destroy();
  });
})();
