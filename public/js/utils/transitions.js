/**
 * Sistema de transiciones entre páginas
 * Utiliza el sistema de cortina configurable
 */

import { initCurtainTransitions, getTransitionConfig, updateTransitionConfig } from './curtain-transitions.js';

/**
 * Inicializar transiciones de página
 * Delega al sistema de cortina configurable
 * @returns {void}
 */
export function initPageTransitions() {
  initCurtainTransitions();
}

/**
 * Reexportar utilidades de configuración
 * Permite cambiar el efecto de transición dinámicamente
 */
export { getTransitionConfig, updateTransitionConfig };
