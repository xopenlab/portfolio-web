/**
 * Controller para la página de presentación (landing)
 */

import { portfolioData } from '../data/portfolio.data.js';

export const getIndex = (req, res) => {
  try {
    res.render('pages/index', {
      pageState: 'is-index',
      title: 'Josevi Pérez - Programador Web Senior',
      data: portfolioData,
      currentYear: new Date().getFullYear()
    });
  } catch (error) {
    console.error('Error al renderizar index:', error);
    res.status(500).send('Error al cargar la página');
  }
};
