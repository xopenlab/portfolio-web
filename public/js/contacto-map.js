/**
 * Inicialización del mapa Leaflet para la página de contacto
 * Muestra un círculo sobre la ubicación aproximada (Almussafes, Valencia)
 */
(function () {
  var map = null;
  var circle = null;
  var styleObserver = null;
  var classObserver = null;
  var debounceTimer = null;

  // Coordenadas del centro de Almussafes
  var LAT = 39.29243391373898;
  var LNG = -0.41436730342555517;
  var ZOOM = 13;
  var CIRCLE_RADIUS = 900;

  /**
   * Obtener el color primario del tema activo
   * @returns {string} Color en formato hex
   */
  function getThemeColor() {
    var style = getComputedStyle(document.documentElement);
    return style.getPropertyValue('--active-theme-primary').trim() || '#6b8ba4';
  }

  /**
   * Crear e inicializar el mapa
   */
  function create() {
    var el = document.getElementById('contacto-map');
    if (!el || typeof L === 'undefined') return;

    // Limpiar mapa previo si existe (re-ejecución SPA)
    if (map) {
      map.remove();
      map = null;
      circle = null;
    }

    // Limpiar contenedor Leaflet residual (si el script se re-ejecutó en nuevo scope)
    if (el._leaflet_id) {
      el._leaflet_id = null;
      el.innerHTML = '';
    }

    var color = getThemeColor();

    map = L.map(el, {
      center: [LAT, LNG],
      zoom: ZOOM,
      scrollWheelZoom: false,
      zoomControl: true,
      attributionControl: true
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    circle = L.circle([LAT, LNG], {
      color: color,
      fillColor: color,
      fillOpacity: 0.15,
      radius: CIRCLE_RADIUS,
      weight: 2
    }).addTo(map);

    // Forzar recálculo de dimensiones tras renderizado
    setTimeout(function () {
      if (map) map.invalidateSize();
    }, 100);
  }

  /**
   * Actualizar color del círculo al cambiar tema
   */
  function updateColors() {
    if (!circle) return;
    var color = getThemeColor();
    circle.setStyle({
      color: color,
      fillColor: color
    });
  }

  /**
   * Actualizar colores con debounce
   */
  function debouncedUpdate() {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(updateColors, 300);
  }

  // Inicialización: esperar a que la cortina se revele
  document.addEventListener('curtainRevealed', create, { once: true });

  // Fallback: si la página ya se reveló (acceso directo por URL)
  if (document.body.classList.contains('page-revealed')) {
    create();
  }

  // Recalcular tamaño del mapa al volver a la pestaña (tras tel:/mailto:)
  document.addEventListener('visibilitychange', function () {
    if (!document.hidden && map) {
      setTimeout(function () { map.invalidateSize(); }, 200);
    }
  });

  // Recrear mapa al volver desde tel:/mailto: (pageshow cubre bfcache)
  window.addEventListener('pageshow', function () {
    var el = document.getElementById('contacto-map');
    if (el && !map) {
      create();
    } else if (map) {
      setTimeout(function () { map.invalidateSize(); }, 200);
    }
  });

  // Recrear mapa al recuperar foco (fallback adicional)
  window.addEventListener('focus', function () {
    if (map) {
      setTimeout(function () { map.invalidateSize(); }, 200);
    }
  });

  // Observar cambios de estilo (cambio de paleta de color)
  styleObserver = new MutationObserver(function (mutations) {
    mutations.forEach(function (m) {
      if (m.attributeName === 'style' && map) debouncedUpdate();
    });
  });
  styleObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['style'] });

  // Observar cambios de clase (dark/light mode)
  classObserver = new MutationObserver(function () {
    if (map) debouncedUpdate();
  });
  classObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

  // Limpieza al salir (pagehide en vez de beforeunload para no destruir en tel:/mailto:)
  window.addEventListener('pagehide', function (e) {
    // Solo limpiar si la página realmente se descarga (no bfcache)
    if (!e.persisted) {
      clearTimeout(debounceTimer);
      if (styleObserver) styleObserver.disconnect();
      if (classObserver) classObserver.disconnect();
      if (map) {
        map.remove();
        map = null;
      }
    }
  });
})();
