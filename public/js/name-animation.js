/**
 * Animaciones del nombre principal usando Anime.js
 * Siempre activadas por defecto
 */
import anime from 'https://cdn.jsdelivr.net/npm/animejs@3.2.2/lib/anime.es.js';

/**
 * Divide el texto en letras individuales envueltas en spans
 * @param {HTMLElement} element - Elemento que contiene el texto
 */
function wrapLetters(element) {
  const text = element.textContent;
  element.innerHTML = '';

  text.split('').forEach((char, index) => {
    const span = document.createElement('span');
    span.className = 'letter';
    span.textContent = char;
    span.style.display = 'inline-block';
    element.appendChild(span);
  });
}

/**
 * Anima la entrada del nombre
 */
function animateNameEntrance() {
  const nameLines = document.querySelectorAll('.name-line');

  // Envolver cada letra en un span (solo si no están ya envueltas)
  nameLines.forEach(line => {
    if (!line.querySelector('.letter')) {
      wrapLetters(line);
    }
  });

  // Animación de entrada para cada letra
  anime.timeline({ loop: false })
    .add({
      targets: '.name-line:nth-child(1) .letter',
      translateY: [100, 0],
      translateZ: 0,
      opacity: [0, 1],
      easing: "easeOutExpo",
      duration: 1400,
      delay: (el, i) => 50 * i
    })
    .add({
      targets: '.name-line:nth-child(2) .letter',
      translateY: [100, 0],
      translateZ: 0,
      opacity: [0, 1],
      easing: "easeOutExpo",
      duration: 1400,
      delay: (el, i) => 50 * i
    }, '-=1200'); // Solapa con la animación anterior
}

/**
 * Añade efecto hover interactivo al nombre
 */
function addNameHoverEffect() {
  const nameContainer = document.querySelector('.name-artistic');

  if (!nameContainer) return;

  // Efecto cuando el mouse entra en el contenedor
  nameContainer.addEventListener('mouseenter', () => {
    anime({
      targets: '.name-artistic .letter',
      scale: [1, 1.1, 1],
      duration: 600,
      easing: 'easeInOutQuad',
      delay: anime.stagger(30)
    });
  });

  // Efecto hover individual por letra
  const letters = document.querySelectorAll('.name-artistic .letter');
  letters.forEach(letter => {
    letter.addEventListener('mouseenter', () => {
      anime({
        targets: letter,
        translateY: -10,
        scale: 1.15,
        duration: 300,
        easing: 'easeOutQuad'
      });
    });

    letter.addEventListener('mouseleave', () => {
      anime({
        targets: letter,
        translateY: 0,
        scale: 1,
        duration: 300,
        easing: 'easeOutQuad'
      });
    });
  });
}

/**
 * Inicializa todas las animaciones del nombre
 */
export function initNameAnimations() {
  // Esperar a que el DOM esté listo
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      animateNameEntrance();
      addNameHoverEffect();
    });
  } else {
    animateNameEntrance();
    addNameHoverEffect();
  }
}
