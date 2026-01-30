import express from 'express';
import {
  sendContactForm,
  getLegalNotice,
  getPrivacyPolicy,
  getCookiesPolicy
} from '../controllers/page.controller.js';
import { getIndex } from '../controllers/index.controller.js';
import { getProyectos } from '../controllers/proyectos.controller.js';
import { getPerfil } from '../controllers/perfil.controller.js';
import { getContacto } from '../controllers/contacto.controller.js';
import { contactFormLimiter, strictContactFormLimiter } from '../middleware/rateLimiter.middleware.js';

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

// Ruta para procesar formulario de contacto
// Aplicar ambos limitadores: uno moderado y uno estricto
router.post('/contacto',
  contactFormLimiter,      // 3 solicitudes cada 15 minutos
  strictContactFormLimiter, // 10 solicitudes cada 1 hora
  sendContactForm
);

// Ruta legacy de contacto (mantener por compatibilidad)
router.post('/contact',
  contactFormLimiter,
  strictContactFormLimiter,
  sendContactForm
);

export default router;