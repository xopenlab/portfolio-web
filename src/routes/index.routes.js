import express from 'express';
import {
  getLegalNotice,
  getPrivacyPolicy,
  getCookiesPolicy
} from '../controllers/page.controller.js';
import { getIndex } from '../controllers/index.controller.js';
import { getProyectos } from '../controllers/proyectos.controller.js';
import { getPerfil } from '../controllers/perfil.controller.js';
import { getContacto } from '../controllers/contacto.controller.js';

const router = express.Router();

// Rutas modulares (nuevo diseño)
router.get('/', getIndex);              // Presentación/Landing
router.get('/proyectos', getProyectos); // Galería de proyectos
router.get('/perfil', getPerfil);       // Perfil curricular
router.get('/contacto', getContacto);   // Formulario de contacto

// Rutas de páginas legales
router.get('/legal-notice', getLegalNotice);
router.get('/privacy-policy', getPrivacyPolicy);
router.get('/cookies-policy', getCookiesPolicy);

// TODO: Habilitar cuando se implemente el envío de emails
// import { sendContactForm } from '../controllers/page.controller.js';
// import { contactFormLimiter, strictContactFormLimiter } from '../middleware/rateLimiter.middleware.js';
// router.post('/contacto', contactFormLimiter, strictContactFormLimiter, sendContactForm);
// router.post('/contact', contactFormLimiter, strictContactFormLimiter, sendContactForm);

export default router;