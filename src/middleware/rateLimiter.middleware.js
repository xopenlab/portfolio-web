import rateLimit from 'express-rate-limit';

/**
 * Rate limiter para el formulario de contacto
 * Limita el número de solicitudes por IP para prevenir spam y ataques
 *
 * Configuración:
 * - 3 solicitudes por ventana de tiempo
 * - Ventana de 15 minutos
 * - Bloqueo temporal tras exceder el límite
 */
export const contactFormLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 3, // Máximo 3 solicitudes por ventana
  message: {
    success: false,
    message: 'Demasiados intentos de envío. Por favor, inténtalo de nuevo más tarde.',
  },
  standardHeaders: true, // Devuelve información de rate limit en headers `RateLimit-*`
  legacyHeaders: false, // Desactiva headers `X-RateLimit-*`

  /**
   * Función para generar la clave de identificación
   * Usa la IP del cliente para rastrear solicitudes
   */
  keyGenerator: (req) => {
    // Obtener IP real incluso detrás de proxies (Nginx, Cloudflare, etc.)
    return req.ip ||
           req.headers['x-forwarded-for']?.split(',')[0] ||
           req.headers['x-real-ip'] ||
           req.connection.remoteAddress;
  },

  /**
   * Handler personalizado cuando se excede el límite
   */
  handler: (req, res) => {
    console.warn(`⚠️  Rate limit excedido para IP: ${req.ip}`);

    res.status(429).json({
      success: false,
      message: 'Has excedido el límite de envíos. Por favor, espera 15 minutos antes de intentarlo de nuevo.',
      retryAfter: Math.ceil(req.rateLimit.resetTime / 1000), // Tiempo de espera en segundos
    });
  },

  /**
   * Función que se ejecuta cuando se rechaza una solicitud
   * Útil para logging y monitoreo
   */
  skip: (req) => {
    // Opcionalmente, puedes permitir ciertas IPs (whitelist)
    // const whitelist = ['127.0.0.1', '::1'];
    // return whitelist.includes(req.ip);
    return false;
  },
});

/**
 * Rate limiter más estricto para detectar comportamiento sospechoso
 * Límite más agresivo para prevenir ataques de fuerza bruta
 */
export const strictContactFormLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hora
  max: 10, // Máximo 10 solicitudes por hora
  message: {
    success: false,
    message: 'Se ha detectado actividad sospechosa. Tu acceso ha sido temporalmente bloqueado.',
  },
  standardHeaders: true,
  legacyHeaders: false,

  keyGenerator: (req) => {
    return req.ip ||
           req.headers['x-forwarded-for']?.split(',')[0] ||
           req.headers['x-real-ip'] ||
           req.connection.remoteAddress;
  },

  handler: (req, res) => {
    console.error(`🚨 Rate limit estricto excedido para IP: ${req.ip}`);

    res.status(429).json({
      success: false,
      message: 'Se ha detectado actividad sospechosa. Por favor, contacta con el administrador si crees que esto es un error.',
    });
  },
});

/**
 * Rate limiter general para toda la aplicación
 * Previene ataques DDoS y uso excesivo de recursos
 */
export const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100, // Máximo 100 solicitudes por ventana
  message: 'Demasiadas solicitudes desde esta IP. Por favor, inténtalo más tarde.',
  standardHeaders: true,
  legacyHeaders: false,

  // Excluir archivos estáticos del rate limiting
  skip: (req) => {
    const staticPaths = ['/css/', '/js/', '/images/', '/assets/', '/favicon.ico'];
    return staticPaths.some(path => req.path.startsWith(path));
  },
});
