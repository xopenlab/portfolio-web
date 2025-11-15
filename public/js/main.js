// JavaScript principal de la aplicación
document.addEventListener('DOMContentLoaded', () => {
  console.log('🚀 Portfolio cargado correctamente');

  // Agregar clase al body cuando el DOM esté completamente cargado
  document.body.classList.add('loaded');

  // Detectar si el usuario está en la parte superior de la página
  const handleHeaderBackground = () => {
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleHeaderBackground, { passive: true });
  handleHeaderBackground(); // Ejecutar al cargar

  // Cerrar menú móvil al hacer clic en un enlace
  const mobileMenuLinks = document.querySelectorAll('header nav a[href^="#"]');
  mobileMenuLinks.forEach(link => {
    link.addEventListener('click', () => {
      // Alpine.js manejará el cierre del menú
      setTimeout(() => {
        const mobileMenuButton = document.querySelector('[\\@click*="mobileMenuOpen"]');
        if (mobileMenuButton) {
          mobileMenuButton.click();
        }
      }, 100);
    });
  });

  // Lazy loading para imágenes (si se añaden en el futuro)
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.classList.remove('lazy');
          imageObserver.unobserve(img);
        }
      });
    });

    document.querySelectorAll('img.lazy').forEach(img => imageObserver.observe(img));
  }

  // Easter egg: Konami Code
  const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
  let konamiIndex = 0;

  document.addEventListener('keydown', (e) => {
    if (e.key === konamiCode[konamiIndex]) {
      konamiIndex++;
      if (konamiIndex === konamiCode.length) {
        activateEasterEgg();
        konamiIndex = 0;
      }
    } else {
      konamiIndex = 0;
    }
  });

  const activateEasterEgg = () => {
    // Efecto de confetti o algo divertido
    console.log('🎉 ¡Easter egg activado!');
    document.body.style.animation = 'rainbow 2s linear infinite';
    
    setTimeout(() => {
      document.body.style.animation = '';
    }, 5000);
  };

  // Prevenir comportamiento por defecto en formularios sin validación
  const forms = document.querySelectorAll('form');
  forms.forEach(form => {
    form.addEventListener('submit', (e) => {
      if (!form.checkValidity()) {
        e.preventDefault();
        e.stopPropagation();
      }
      form.classList.add('was-validated');
    });
  });

  // Analytics de scroll depth (simulado)
  let maxScroll = 0;
  window.addEventListener('scroll', () => {
    const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
    if (scrollPercent > maxScroll) {
      maxScroll = Math.round(scrollPercent);
      // Aquí podrías enviar datos a analytics
      if (maxScroll === 25 || maxScroll === 50 || maxScroll === 75 || maxScroll === 100) {
        console.log(`📊 Scroll depth: ${maxScroll}%`);
      }
    }
  }, { passive: true });

  // Performance: Log de métricas de carga
  if ('PerformanceObserver' in window) {
    try {
      const perfObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.entryType === 'navigation') {
            console.log(`⚡ Tiempo de carga: ${entry.loadEventEnd - entry.fetchStart}ms`);
          }
        }
      });
      perfObserver.observe({ entryTypes: ['navigation'] });
    } catch (e) {
      console.error('Error al observar performance:', e);
    }
  }

  // Añadir indicador de carga para transiciones
  const showLoading = () => {
    const loader = document.createElement('div');
    loader.id = 'page-loader';
    loader.innerHTML = `
      <div class="fixed inset-0 bg-white dark:bg-gray-900 z-50 flex items-center justify-center transition-opacity duration-300">
        <div class="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-primary-600"></div>
      </div>
    `;
    document.body.appendChild(loader);

    setTimeout(() => {
      loader.style.opacity = '0';
      setTimeout(() => loader.remove(), 300);
    }, 500);
  };

  // Detectar cambios de red
  if ('connection' in navigator) {
    const connection = navigator.connection;
    
    const updateNetworkStatus = () => {
      if (connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g') {
        console.warn('⚠️ Conexión lenta detectada');
        // Aquí podrías mostrar un mensaje al usuario o cargar versiones optimizadas
      }
    };

    connection.addEventListener('change', updateNetworkStatus);
    updateNetworkStatus();
  }

  // Detectar modo offline
  window.addEventListener('online', () => {
    console.log('✅ Conexión restaurada');
  });

  window.addEventListener('offline', () => {
    console.warn('⚠️ Sin conexión a internet');
  });

  // Accesibilidad: Agregar skip links
  const addSkipLink = () => {
    const skipLink = document.createElement('a');
    skipLink.href = '#main';
    skipLink.className = 'sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-primary-600 text-white px-4 py-2 rounded z-50';
    skipLink.textContent = 'Saltar al contenido principal';
    document.body.insertBefore(skipLink, document.body.firstChild);
  };

  addSkipLink();

  // Añadir animación CSS para el rainbow easter egg
  const style = document.createElement('style');
  style.textContent = `
    @keyframes rainbow {
      0% { filter: hue-rotate(0deg); }
      100% { filter: hue-rotate(360deg); }
    }
  `;
  document.head.appendChild(style);
});

export { };