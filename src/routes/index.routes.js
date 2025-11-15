import express from 'express';
import { getHome, sendContactForm } from '../controllers/page.controller.js';

const router = express.Router();

// Ruta principal
router.get('/', getHome);

// Ruta para procesar formulario de contacto
router.post('/contact', sendContactForm);

export default router;