/**
 * Inicialización de Vanta.js Birds para la página de perfil
 */
import { initVanta } from '/js/utils/vanta-init.js';

initVanta({
  elementId: 'vanta-perfil',
  createEffect: function(el, colors) {
    return VANTA.BIRDS({
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
      color1: colors.primary || 0x6b8ba4,
      color2: colors.secondary || 0xa3b8cc,
      colorMode: 'lerp'
    });
  }
});
