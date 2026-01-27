// Animaciones al hacer scroll
document.addEventListener('DOMContentLoaded', () => {
  // Configurar Intersection Observer para animaciones
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        // Opcionalmente, dejar de observar después de animar
        // observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observar todos los elementos con la clase animate-on-scroll
  const animatedElements = document.querySelectorAll('.animate-on-scroll');
  animatedElements.forEach(el => observer.observe(el));

  // Smooth scroll para los enlaces de navegación
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        const headerOffset = 80; // Altura del header fijo
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // Animación de las barras de progreso cuando entran en viewport
  const progressBars = document.querySelectorAll('.progress-fill');
  const progressObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const progressBar = entry.target;
        const targetWidth = progressBar.getAttribute('style').match(/width:\s*(\d+)%/)[1];
        
        // Reiniciar la animación
        progressBar.style.width = '0%';
        
        setTimeout(() => {
          progressBar.style.width = `${targetWidth}%`;
        }, 100);
        
        progressObserver.unobserve(entry.target);
      }
    });
  }, observerOptions);

  progressBars.forEach(bar => progressObserver.observe(bar));

  // Parallax suave para elementos decorativos
  let ticking = false;
  
  const handleScroll = () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('[class*="animate-pulse-slow"]');
        
        parallaxElements.forEach((el, index) => {
          const speed = 0.5 + (index * 0.1);
          const yPos = -(scrolled * speed);
          el.style.transform = `translateY(${yPos}px)`;
        });
        
        ticking = false;
      });
      
      ticking = true;
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });

  // Efecto de typing para el título (opcional)
  const typeEffect = (element, text, speed = 100) => {
    let i = 0;
    element.textContent = '';
    
    const typing = setInterval(() => {
      if (i < text.length) {
        element.textContent += text.charAt(i);
        i++;
      } else {
        clearInterval(typing);
      }
    }, speed);
  };

  // Contador animado para estadísticas
  const animateCounter = (element, target, duration = 2000) => {
    const start = 0;
    const increment = target / (duration / 16); // 60 FPS
    let current = start;

    const updateCounter = () => {
      current += increment;
      if (current < target) {
        element.textContent = Math.floor(current);
        requestAnimationFrame(updateCounter);
      } else {
        element.textContent = target;
      }
    };

    updateCounter();
  };

  // Observar contadores y animarlos cuando sean visibles
  const counterElements = document.querySelectorAll('[class*="text-4xl"][class*="gradient-text"]');
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const text = entry.target.textContent.trim();
        const match = text.match(/(\d+)/);
        
        if (match) {
          const target = parseInt(match[0]);
          animateCounter(entry.target, target);
          counterObserver.unobserve(entry.target);
        }
      }
    });
  }, { threshold: 0.5 });

  counterElements.forEach(el => counterObserver.observe(el));
});

export { };