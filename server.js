import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import compression from 'compression';
import helmet from 'helmet';
import morgan from 'morgan';
import indexRoutes from './src/routes/index.routes.js';

// Configuración de __dirname para ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Cargar variables de entorno
dotenv.config();

// Crear aplicación Express
const app = express();
const PORT = process.env.PORT || 3000;

// Configuración del motor de plantillas EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src', 'views'));

// Middlewares de seguridad y optimización
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'", "https://cdn.jsdelivr.net"],
      styleSrc: ["'self'", "'unsafe-inline'", "https://cdn.jsdelivr.net", "https://fonts.googleapis.com"],
      fontSrc: ["'self'", "https://fonts.gstatic.com"],
      imgSrc: ["'self'", "data:", "https:"],
      connectSrc: ["'self'"],
      objectSrc: ["'none'"],
      upgradeInsecureRequests: []
    }
  }
}));
app.use(compression());
app.use(morgan('dev'));

// Middlewares de parseo
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Servir librerías de node_modules como estáticos (/vendor/*)
app.use('/vendor/three', express.static(path.join(__dirname, 'node_modules', 'three', 'build')));
app.use('/vendor/vanta', express.static(path.join(__dirname, 'node_modules', 'vanta', 'dist')));
app.use('/vendor/p5', express.static(path.join(__dirname, 'node_modules', 'p5', 'lib')));
app.use('/vendor/leaflet', express.static(path.join(__dirname, 'node_modules', 'leaflet', 'dist')));
app.use('/vendor/animejs', express.static(path.join(__dirname, 'node_modules', 'animejs', 'dist', 'bundles')));

// Rutas
app.use('/', indexRoutes);

// Manejo de errores 404
app.use((req, res) => {
  res.status(404).render('pages/404', {
    title: 'Página no encontrada - Josevi Pérez',
    currentYear: new Date().getFullYear()
  });
});

// Manejo de errores generales
app.use((err, req, res, next) => {
  console.error('Error:', err.stack);
  
  // Intentar renderizar la página de error
  try {
    res.status(500).render('pages/500', {
      title: 'Error del servidor - Josevi Pérez',
      currentYear: new Date().getFullYear()
    });
  } catch (renderError) {
    // Si falla el renderizado, enviar respuesta simple
    res.status(500).send(`
      <!DOCTYPE html>
      <html lang="es">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Error del servidor</title>
        <style>
          body {
            font-family: system-ui, -apple-system, sans-serif;
            display: flex;
            align-items: center;
            justify-content: center;
            min-height: 100vh;
            margin: 0;
            background: #f3f4f6;
          }
          .container {
            text-align: center;
            padding: 2rem;
          }
          h1 { font-size: 4rem; margin: 0; color: #ef4444; }
          p { color: #6b7280; margin: 1rem 0; }
          a {
            display: inline-block;
            padding: 0.75rem 1.5rem;
            background: #0ea5e9;
            color: white;
            text-decoration: none;
            border-radius: 0.5rem;
            margin-top: 1rem;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>500</h1>
          <p>Error del servidor. Por favor, intenta más tarde.</p>
          <a href="/">Volver al inicio</a>
        </div>
      </body>
      </html>
    `);
  }
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`
🚀 Servidor iniciado correctamente
📍 URL: http://localhost:${PORT}
🌍 Entorno: ${process.env.NODE_ENV || 'development'}
⏰ Hora: ${new Date().toLocaleString('es-ES')}
  `);
});

export default app;