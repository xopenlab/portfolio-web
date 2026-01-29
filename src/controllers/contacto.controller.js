/**
 * Controller para la página de contacto
 */

import { portfolioData } from '../data/portfolio.data.js';
import { colorThemes, defaultTheme } from '../data/colorThemes.data.js';

export const getContacto = (req, res) => {
  try {
    res.render('pages/contacto', {
      pageState: 'is-contacto',
      title: 'Contacto - Josevi Pérez',
      currentYear: new Date().getFullYear(),
      data: portfolioData,
      colorThemes,
      defaultTheme
    });
  } catch (error) {
    console.error('Error al renderizar contacto:', error);
    res.status(500).send('Error al cargar la página');
  }
};
