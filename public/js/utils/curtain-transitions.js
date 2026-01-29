/**
 * Sistema de transiciones tipo cortina entre páginas (SPA)
 * Navegación sin recarga usando fetch + History API
 */

/**
 * Configuración de transiciones
 */
const transitionConfig = {
  // Efecto activo: 'curtain-drop', 'double-curtain', 'gradient-curtain', 'split-curtain'
  activeEffect: 'curtain-drop',

  // Duración de las animaciones (ms)
  duration: {
    enter: 600,  // Tiempo de entrada (cortina baja)
    exit: 600    // Tiempo de salida (cortina sube)
  },

  // Easing personalizado
  easing: 'cubic-bezier(0.65, 0, 0.35, 1)',

  // Usar color del tema activo
  useThemeColor: true,

  // Color de fallback si no hay tema activo
  fallbackColor: '#7d97b8',

  // Delay antes de cargar contenido
  contentLoadDelay: 50
};

/**
 * Inicializar sistema de transiciones con cortina (SPA)
 * @returns {void}
 */
export function initCurtainTransitions() {
  const curtain = document.getElementById('page-curtain');

  if (!curtain) {
    console.warn('⚠️ No se encontró el elemento #page-curtain');
    return;
  }

  // Aplicar configuración inicial
  applyCurtainEffect(curtain, transitionConfig.activeEffect);

  // Registrar estado inicial en el historial
  const currentUrl = window.location.pathname;
  window.history.replaceState({ url: currentUrl }, document.title, currentUrl);

  // Revelar página inmediatamente
  revealPage(curtain);

  // Interceptar clicks en enlaces internos
  document.addEventListener('click', async (e) => {
    const link = e.target.closest('a[href^="/"]');

    // Verificar si es un enlace válido y no tiene modificadores
    if (!link || e.ctrlKey || e.metaKey || e.shiftKey || link.target) {
      return;
    }

    // Ignorar enlaces con data-no-transition
    if (link.hasAttribute('data-no-transition')) {
      return;
    }

    // Prevenir navegación por defecto
    e.preventDefault();

    const targetUrl = link.getAttribute('href');

    // Navegar con transición SPA
    await navigateToPage(targetUrl, curtain);
  });

  // Manejar navegación con botón back/forward del navegador
  window.addEventListener('popstate', async (e) => {
    if (e.state && e.state.url) {
      await navigateToPage(e.state.url, curtain, false);
    }
  });

  console.log('✓ Sistema SPA con transiciones inicializado');
  console.log(`  Efecto activo: ${transitionConfig.activeEffect}`);
}

/**
 * Navegar a una página con transición SPA
 * @param {string} url - URL de destino
 * @param {HTMLElement} curtain - Elemento de cortina
 * @param {boolean} pushState - Si debe actualizar el historial (default: true)
 */
async function navigateToPage(url, curtain, pushState = true) {
  try {
    // 1. Bajar cortina
    await hidePage(curtain);

    // 2. Fetch del HTML de la página destino
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);

    const html = await response.text();

    // 3. Parse del HTML
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');

    // 4. Extraer contenido relevante
    const newMain = doc.querySelector('main');
    const newTitle = doc.querySelector('title')?.textContent;
    const newNav = doc.querySelector('.internal-navigation');
    const newPageState = doc.body.className;

    if (!newMain) {
      throw new Error('No se encontró <main> en la página destino');
    }

    // 5. Reemplazar contenido
    const currentMain = document.querySelector('main');
    const currentNav = document.querySelector('.internal-navigation');

    if (currentMain) {
      currentMain.replaceWith(newMain);
    }

    // Actualizar o añadir navegación interna
    if (newNav) {
      if (currentNav) {
        currentNav.replaceWith(newNav);
      } else {
        // Insertar navegación después del header
        const header = document.querySelector('header');
        if (header) {
          header.after(newNav);
        }
      }
    } else if (currentNav) {
      // Remover navegación si no existe en la nueva página
      currentNav.remove();
    }

    // 6. Actualizar título
    if (newTitle) {
      document.title = newTitle;
    }

    // 7. Actualizar clase del body
    document.body.className = newPageState;

    // 8. Actualizar URL (History API)
    if (pushState) {
      window.history.pushState({ url }, newTitle, url);
    }

    // 9. Scroll to top
    window.scrollTo(0, 0);

    // 10. Cargar scripts específicos de la página destino
    await loadPageScripts(doc);

    // 11. Re-inicializar Alpine.js en el nuevo contenido
    if (window.Alpine) {
      window.Alpine.initTree(document.querySelector('main'));
      if (newNav) {
        window.Alpine.initTree(newNav);
      }
    }

    // 12. Revelar contenido (cortina sube)
    await revealPage(curtain);

    console.log(`✓ Navegación SPA completada: ${url}`);

  } catch (error) {
    console.error('❌ Error en navegación SPA:', error);

    // Fallback: navegación tradicional
    window.location.href = url;
  }
}

/**
 * Aplicar efecto de cortina según configuración
 * @param {HTMLElement} curtain - Elemento de cortina
 * @param {string} effect - Tipo de efecto
 */
function applyCurtainEffect(curtain, effect) {
  curtain.className = 'page-curtain';
  curtain.classList.add(`effect-${effect}`);

  if (transitionConfig.useThemeColor) {
    const themeColor = getComputedStyle(document.documentElement)
      .getPropertyValue('--active-theme-primary')
      .trim();

    if (themeColor) {
      curtain.style.setProperty('--curtain-color', themeColor);
    } else {
      curtain.style.setProperty('--curtain-color', transitionConfig.fallbackColor);
    }
  }
}

/**
 * Revelar página (cortina sube)
 * @param {HTMLElement} curtain - Elemento de cortina
 * @returns {Promise<void>}
 */
function revealPage(curtain) {
  return new Promise((resolve) => {
    // Deshabilitar transiciones temporalmente para cubrir instantáneamente
    curtain.style.transition = 'none';
    curtain.classList.add('is-covering');

    // Forzar reflow
    curtain.offsetHeight;

    // Reactivar transiciones
    curtain.style.transition = '';

    // Pequeño delay antes de iniciar el reveal
    setTimeout(() => {
      curtain.classList.remove('is-covering');
      curtain.classList.add('is-revealing');

      // Limpiar clases y activar animaciones de contenido después de la cortina
      setTimeout(() => {
        curtain.classList.remove('is-revealing');
        document.body.classList.add('page-revealed');
        document.dispatchEvent(new CustomEvent('curtainRevealed'));
        resolve();
      }, transitionConfig.duration.exit);
    }, 50);
  });
}

/**
 * Ocultar página (cortina baja)
 * @param {HTMLElement} curtain - Elemento de cortina
 * @returns {Promise<void>}
 */
function hidePage(curtain) {
  return new Promise((resolve) => {
    curtain.classList.add('is-covering');

    // Resolver promesa después de la animación
    setTimeout(() => {
      resolve();
    }, transitionConfig.duration.enter + transitionConfig.contentLoadDelay);
  });
}

/**
 * Obtener configuración actual
 * @returns {Object} Configuración de transiciones
 */
export function getTransitionConfig() {
  return { ...transitionConfig };
}

/**
 * Actualizar configuración de transiciones
 * @param {Object} newConfig - Nueva configuración parcial
 */
export function updateTransitionConfig(newConfig) {
  Object.assign(transitionConfig, newConfig);

  const curtain = document.getElementById('page-curtain');
  if (curtain && newConfig.activeEffect) {
    applyCurtainEffect(curtain, newConfig.activeEffect);
  }

  console.log('✓ Configuración de transiciones actualizada:', newConfig);
}

/**
 * Scripts que no deben recargarse en navegación SPA (comunes a todas las páginas)
 */
const SKIP_SCRIPTS = [
  '/js/alpine-setup.js',
  '/js/main.js',
  'alpinejs'
];

/**
 * Librerías vendor que solo se cargan una vez (comprueban su global antes de recargar)
 * Nota: los scripts de efectos Vanta (vanta.birds, vanta.topology) no se incluyen aquí
 * porque cada efecto registra un constructor diferente en window.VANTA
 */
const VENDOR_GLOBALS = {
  '/vendor/three/three': 'THREE',
  '/vendor/p5/p5': 'p5'
};

/**
 * Cargar y ejecutar scripts específicos de la página destino
 * Excluye scripts comunes ya cargados; librerías vendor se cargan solo una vez
 * @param {Document} doc - Documento parseado de la página destino
 * @returns {Promise<void>}
 */
async function loadPageScripts(doc) {
  const scripts = doc.querySelectorAll('body > script[src]');
  const vendorScripts = [];
  const pageInitScripts = [];

  for (const script of scripts) {
    const src = script.getAttribute('src');
    if (!src) continue;

    // Saltar scripts comunes ya cargados
    if (SKIP_SCRIPTS.some(c => src.includes(c))) continue;

    // Clasificar: vendor (cargar solo si falta) vs init de página (re-ejecutar siempre)
    const vendorKey = Object.keys(VENDOR_GLOBALS).find(k => src.includes(k));
    if (vendorKey) {
      vendorScripts.push({ src, globalName: VENDOR_GLOBALS[vendorKey] });
    } else {
      pageInitScripts.push(src);
    }
  }

  if (vendorScripts.length === 0 && pageInitScripts.length === 0) return;

  // Limpiar efecto Vanta anterior si existe
  if (window.VANTA && window.VANTA.current) {
    window.VANTA.current.destroy();
    window.VANTA.current = null;
  }

  // Cargar librerías vendor solo si su global no existe aún
  for (const { src, globalName } of vendorScripts) {
    if (!window[globalName]) {
      await loadScript(src);
    }
  }

  // Re-ejecutar scripts de inicialización de página (vanta-birds.js, vanta-topology.js, etc.)
  for (const src of pageInitScripts) {
    await loadScript(src);
  }
}

/**
 * Cargar un script externo de forma dinámica
 * @param {string} src - URL del script
 * @returns {Promise<void>}
 */
function loadScript(src) {
  return new Promise((resolve, reject) => {
    // Si ya existe un script con este src, eliminarlo para re-ejecutar
    const existing = document.querySelector(`script[src="${src}"]`);
    if (existing) existing.remove();

    const script = document.createElement('script');
    script.src = src;
    script.onload = resolve;
    script.onerror = () => reject(new Error(`Error cargando script: ${src}`));
    document.body.appendChild(script);
  });
}
