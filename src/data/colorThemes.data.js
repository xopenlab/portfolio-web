/**
 * Definición centralizada de los temas de color disponibles
 * Fuente única de verdad para paletas de color (DRY)
 */

export const colorThemes = {
  'blue-dusk': {
    primary: '#7d97b8',
    secondary: '#0369a1',
    accent: '#d946ef',
    label: 'Azul Crepúsculo'
  },
  'golden-hour': {
    primary: '#dfb255',
    secondary: '#f59e0b',
    accent: '#d946ef',
    label: 'Hora Dorada'
  },
  'forest-green': {
    primary: '#52a47e',
    secondary: '#059669',
    accent: '#ec4899',
    label: 'Verde Bosque'
  },
  'sage-mist': {
    primary: '#9eaf92',
    secondary: '#10b981',
    accent: '#8b5cf6',
    label: 'Salvia Niebla'
  },
  'stone-gray': {
    primary: '#a7b6b0',
    secondary: '#6b7280',
    accent: '#ec4899',
    label: 'Gris Piedra'
  },
  'charcoal-night': {
    primary: '#d6d3d1',
    secondary: '#a8a29e',
    accent: '#f59e0b',
    label: 'Noche Carbón'
  }
};

/** Tema por defecto */
export const defaultTheme = 'blue-dusk';
