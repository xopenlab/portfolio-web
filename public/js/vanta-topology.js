/**
 * Inicialización de Vanta.js Topology para la página de proyectos
 */
import { initVanta } from '/js/utils/vanta-init.js';

initVanta({
  elementId: 'vanta-proyectos',
  createEffect: function(el, colors) {
    return VANTA.TOPOLOGY({
      el: el,
      p5: p5,
      mouseControls: true,
      touchControls: true,
      gyroControls: false,
      scale: 1.0,
      scaleMobile: 1.0,
      backgroundColor: colors.bgColor,
      color: colors.primary || 0x6b8ba4
    });
  }
});
