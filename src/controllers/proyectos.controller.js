/**
 * Controller para la página de proyectos
 */

import { portfolioData } from '../data/portfolio.data.js';
import { colorThemes, defaultTheme } from '../data/colorThemes.data.js';

export const getProyectos = (req, res) => {
  try {
    res.render('pages/proyectos', {
      pageState: 'is-proyectos',
      title: 'Proyectos - Josevi Pérez',
      currentYear: new Date().getFullYear(),
      data: portfolioData,
      colorThemes,
      defaultTheme
    });
  } catch (error) {
    console.error('Error al renderizar proyectos:', error);
    res.status(500).send('Error al cargar la página');
  }
};
