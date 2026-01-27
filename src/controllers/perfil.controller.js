/**
 * Controller para la página de perfil curricular
 */

import { portfolioData } from '../data/portfolio.data.js';

export const getPerfil = (req, res) => {
  try {
    res.render('pages/perfil', {
      pageState: 'is-perfil',
      title: 'Perfil Profesional - Josevi Pérez',
      currentYear: new Date().getFullYear(),
      data: portfolioData
    });
  } catch (error) {
    console.error('Error al renderizar perfil:', error);
    res.status(500).send('Error al cargar la página');
  }
};
