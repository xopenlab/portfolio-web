// Importar datos del portfolio desde archivo centralizado
import { portfolioData } from '../data/portfolio.data.js';
import { colorThemes, defaultTheme } from '../data/colorThemes.data.js';

// Controlador para la página principal
export const getHome = (req, res) => {
  try {
    res.render("pages/home", {
      title: `${portfolioData.personalInfo.name} - ${portfolioData.personalInfo.title}`,
      currentYear: new Date().getFullYear(),
      data: portfolioData,
      colorThemes,
      defaultTheme,
    });
  } catch (error) {
    console.error("Error al renderizar home:", error);
    res.status(500).send("Error al cargar la página");
  }
};

// Controlador para la página de Aviso Legal
export const getLegalNotice = (req, res, next) => {
  res.render("pages/legal-notice", {
    pageState: 'is-legal',
    title: `Aviso Legal - ${portfolioData.personalInfo.name}`,
    currentYear: new Date().getFullYear(),
    data: portfolioData,
    colorThemes,
    defaultTheme,
  }, (err, html) => {
    if (err) { console.error("DEBUG LEGAL RENDER ERROR:", err); return next(err); }
    res.send(html);
  });
};

// Controlador para la página de Política de Privacidad
export const getPrivacyPolicy = (req, res) => {
  try {
    res.render("pages/privacy-policy", {
      pageState: 'is-legal',
      title: `Política de Privacidad - ${portfolioData.personalInfo.name}`,
      currentYear: new Date().getFullYear(),
      data: portfolioData,
      colorThemes,
      defaultTheme,
    });
  } catch (error) {
    console.error("Error al renderizar política de privacidad:", error);
    res.status(500).send("Error al cargar la página");
  }
};

// Controlador para la página de Política de Cookies
export const getCookiesPolicy = (req, res) => {
  try {
    res.render("pages/cookies-policy", {
      pageState: 'is-legal',
      title: `Política de Cookies - ${portfolioData.personalInfo.name}`,
      currentYear: new Date().getFullYear(),
      data: portfolioData,
      colorThemes,
      defaultTheme,
    });
  } catch (error) {
    console.error("Error al renderizar política de cookies:", error);
    res.status(500).send("Error al cargar la página");
  }
};

// Controlador para procesar el formulario de contacto
export const sendContactForm = async (req, res) => {
  try {
    const { name, email, message, website, timeElapsed } = req.body;

    // 🍯 VALIDACIÓN HONEYPOT: Si el campo 'website' está lleno, es un bot
    if (website && website.trim() !== '') {
      console.warn(`⚠️  Honeypot detectado - Posible bot desde IP: ${req.ip}`);

      // Responder como si todo fuera bien para no alertar al bot
      return res.json({
        success: true,
        message: "Mensaje enviado correctamente. Te responderé pronto.",
      });
    }

    // ⏱️ VALIDACIÓN DE TIEMPO: Detectar envíos demasiado rápidos (menos de 3 segundos)
    const MIN_TIME = 3000; // 3 segundos mínimo
    if (timeElapsed && timeElapsed < MIN_TIME) {
      console.warn(`⚠️  Envío sospechosamente rápido (${timeElapsed}ms) desde IP: ${req.ip}`);

      return res.status(400).json({
        success: false,
        message: "Por favor, tómate un momento para revisar tu mensaje antes de enviarlo.",
      });
    }

    // Validación básica de datos
    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: "Todos los campos son obligatorios.",
      });
    }

    // Validación de formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: "El formato del email no es válido.",
      });
    }

    // Importación dinámica del servicio de email
    const { sendContactEmail } = await import('../services/email.service.js');

    // Enviar el email
    const result = await sendContactEmail({ name, email, message });

    if (result.success) {
      return res.json({
        success: true,
        message: "Mensaje enviado correctamente. Te responderé pronto.",
      });
    } else {
      console.error("Error al enviar email:", result.error);
      return res.status(500).json({
        success: false,
        message: "Error al enviar el mensaje. Por favor, inténtalo de nuevo más tarde.",
      });
    }
  } catch (error) {
    console.error("Error al procesar formulario:", error);
    return res.status(500).json({
      success: false,
      message: "Error al enviar el mensaje. Inténtalo de nuevo.",
    });
  }
};
