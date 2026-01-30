/**
 * Inicialización del mapa Leaflet para la página de contacto
 * Muestra un círculo sobre la ubicación aproximada (Almussafes, Valencia)
 * Incluye selector de capas (mapa / ortofoto) y modo pantalla completa
 */
(function () {
  var map = null;
  var circle = null;
  var styleObserver = null;
  var classObserver = null;
  var debounceTimer = null;
  var isFullscreen = false;

  // Coordenadas del centro de Almussafes
  var LAT = 39.29243391373898;
  var LNG = -0.41436730342555517;
  var ZOOM = 13;
  var CIRCLE_RADIUS = 900;

  // Iconos SVG para el botón fullscreen
  var ICON_EXPAND = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"/></svg>';
  var ICON_COLLAPSE = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 14h6v6m10-10h-6V4m0 6 7-7M3 21l7-7"/></svg>';

  /**
   * Obtener el color primario del tema activo
   * @returns {string} Color en formato hex
   */
  function getThemeColor() {
    var style = getComputedStyle(document.documentElement);
    return style.getPropertyValue('--active-theme-primary').trim() || '#6b8ba4';
  }

  /**
   * Alternar modo pantalla completa del mapa
   */
  function toggleFullscreen() {
    var wrapper = document.querySelector('.contacto-map-wrapper');
    if (!wrapper) return;

    isFullscreen = !isFullscreen;
    wrapper.classList.toggle('is-fullscreen', isFullscreen);

    // Actualizar icono del botón
    var btn = wrapper.querySelector('.contacto-map-fullscreen-btn');
    if (btn) btn.innerHTML = isFullscreen ? ICON_COLLAPSE : ICON_EXPAND;

    // Activar/desactivar scroll zoom en fullscreen
    if (map) {
      if (isFullscreen) {
        map.scrollWheelZoom.enable();
      } else {
        map.scrollWheelZoom.disable();
      }
      setTimeout(function () { map.invalidateSize(); }, 100);
    }
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
      attributionControl: false
    });

    // Capas base
    var osmLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap'
    });

    var orthoLayer = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
      attribution: '&copy; Esri'
    });

    // Añadir capa por defecto
    osmLayer.addTo(map);

    // Control de capas
    L.control.layers({
      'Mapa': osmLayer,
      'Ortofoto': orthoLayer
    }, null, { position: 'topright', collapsed: true }).addTo(map);

    circle = L.circle([LAT, LNG], {
      color: color,
      fillColor: color,
      fillOpacity: 0.15,
      radius: CIRCLE_RADIUS,
      weight: 2
    }).addTo(map);

    // Botón fullscreen (fuera del mapa, en el wrapper)
    var wrapper = el.closest('.contacto-map-wrapper');
    if (wrapper && !wrapper.querySelector('.contacto-map-fullscreen-btn')) {
      var btn = document.createElement('button');
      btn.className = 'contacto-map-fullscreen-btn';
      btn.setAttribute('aria-label', 'Pantalla completa');
      btn.innerHTML = ICON_EXPAND;
      btn.addEventListener('click', toggleFullscreen);
      wrapper.appendChild(btn);
    }

    // Cerrar fullscreen con Escape (fase de captura para ejecutarse antes que main.js)
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && isFullscreen) {
        e.stopImmediatePropagation();
        e.preventDefault();
        toggleFullscreen();
      }
    }, true);

    // Forzar recálculo de dimensiones tras renderizado
    setTimeout(function () {
      if (map) map.invalidateSize();
    }, 100);
    setTimeout(function () {
      if (map) map.invalidateSize();
    }, 500);
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
