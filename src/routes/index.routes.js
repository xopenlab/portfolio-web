import express from 'express';
import { getHome, sendContactForm } from '../controllers/page.controller.js';
import { contactFormLimiter, strictContactFormLimiter } from '../middleware/rateLimiter.middleware.js';

const router = express.Router();

// Ruta principal
router.get('/', getHome);

// Ruta para procesar formulario de contacto
// Aplicar ambos limitadores: uno moderado y uno estricto
router.post('/contact',
  contactFormLimiter,      // 3 solicitudes cada 15 minutos
  strictContactFormLimiter, // 10 solicitudes cada 1 hora
  sendContactForm
);

export default router;