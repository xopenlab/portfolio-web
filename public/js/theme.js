/**
 * Gestión del tema claro/oscuro
 * Compatible con Alpine.js y ES modules
 */

// Aplicar tema inmediatamente (ya está en head.ejs, pero lo reforzamos)
(function() {
  const isDark = localStorage.getItem('darkMode') === 'true' ||
                 (!localStorage.getItem('darkMode') && window.matchMedia('(prefers-color-scheme: dark)').matches);

  if (isDark) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
})();

/**
 * Función para alternar el tema
 * Disponible globalmente para Alpine.js
 */
window.toggleTheme = function() {
  const html = document.documentElement;
  const isDark = html.classList.contains('dark');

  if (isDark) {
    html.classList.remove('dark');
    localStorage.setItem('darkMode', 'false');
  } else {
    html.classList.add('dark');
    localStorage.setItem('darkMode', 'true');
  }

  console.log('✓ Tema cambiado a:', isDark ? 'claro' : 'oscuro');
};

/**
 * Obtener estado actual del tema
 * @returns {boolean} true si está en modo oscuro
 */
window.isDarkMode = function() {
  return document.documentElement.classList.contains('dark');
};

// Escuchar cambios en las preferencias del sistema
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
  // Solo aplicar si el usuario no ha establecido preferencia manual
  if (!localStorage.getItem('darkMode')) {
    if (e.matches) {
      document.documentElement.classList.add('dark');
      console.log('✓ Tema automático: oscuro (preferencia del sistema)');
    } else {
      document.documentElement.classList.remove('dark');
      console.log('✓ Tema automático: claro (preferencia del sistema)');
    }
  }
});

export { };