# 🚀 Portfolio Profesional - Josevi Pérez

Portfolio web profesional desarrollado con Node.js, Express v5, Alpine.js v3.15.1, Tailwind CSS v4 y EJS.

## 📋 Características

- ✅ **Responsive Design**: Totalmente adaptable a todos los dispositivos
- ✅ **Tema Claro/Oscuro**: Alternancia suave entre modos con persistencia
- ✅ **Animaciones Suaves**: Transiciones y efectos visuales elegantes
- ✅ **SEO Optimizado**: Meta tags y estructura semántica
- ✅ **Performance**: Código optimizado y carga rápida
- ✅ **Accesibilidad**: Cumple con estándares WCAG
- ✅ **Alpine.js**: Interactividad reactiva sin complicaciones
- ✅ **Tailwind CSS v4**: Estilos modernos y personalizables

## 🛠️ Stack Tecnológico

- **Backend**: Node.js + Express v5
- **Motor de plantillas**: EJS
- **Framework CSS**: Tailwind CSS v4
- **Framework JS**: Alpine.js v3.15.1
- **JavaScript**: ES6+ (Vanilla JS)

## 📁 Estructura del Proyecto

```
portfolio-web/
├── src/
│   ├── config/
│   │   └── app.config.js
│   ├── routes/
│   │   └── index.routes.js
│   ├── controllers/
│   │   └── page.controller.js
│   └── views/
│       ├── layouts/
│       │   └── main.ejs
│       ├── partials/
│       │   ├── head.ejs
│       │   ├── header.ejs
│       │   ├── footer.ejs
│       │   └── sections/
│       │       ├── hero.ejs
│       │       ├── about.ejs
│       │       ├── education.ejs
│       │       ├── experience.ejs
│       │       ├── skills.ejs
│       │       ├── projects.ejs
│       │       └── contact.ejs
│       └── pages/
│           └── home.ejs
├── public/
│   ├── css/
│   │   ├── styles.css
│   │   └── output.css (generado)
│   ├── js/
│   │   ├── main.js
│   │   ├── theme.js
│   │   └── animations.js
│   └── images/
├── .env.example
├── .gitignore
├── package.json
├── tailwind.config.js
├── postcss.config.js
├── server.js
└── README.md
```

## 🚀 Instalación y Uso

### Prerrequisitos

- Node.js >= 18.0.0
- npm o yarn

### Paso 1: Clonar o crear el proyecto

```bash
mkdir portfolio-web
cd portfolio-web
```

### Paso 2: Instalar dependencias

```bash
npm install
```

### Paso 3: Configurar variables de entorno

```bash
cp .env.example .env
```

Edita el archivo `.env` con tu configuración:

```env
PORT=3000
NODE_ENV=development
CONTACT_EMAIL=tu-email@ejemplo.com
BASE_URL=http://localhost:3000
```

### Paso 4: Construir CSS de Tailwind

En una terminal separada, ejecuta:

```bash
npm run build:css
```

Esto generará el archivo `output.css` a partir de `styles.css`.

### Paso 5: Iniciar el servidor de desarrollo

```bash
npm run dev
```

O para ejecutar todo junto (servidor + compilación de CSS):

```bash
npm run dev:all
```

La aplicación estará disponible en `http://localhost:3000`

## 📝 Personalización

### Modificar datos del portfolio

Edita el archivo `src/controllers/page.controller.js` para actualizar:

- Información personal
- Experiencia laboral
- Educación
- Habilidades
- Proyectos

### Modificar estilos

1. **Colores del tema**: Edita `tailwind.config.js`
2. **Estilos personalizados**: Edita `src/public/css/styles.css`

### Agregar nuevas secciones

1. Crea un nuevo archivo en `src/views/partials/sections/`
2. Incluye la sección en `src/views/pages/home.ejs`

## 🎨 Temas y Colores

El proyecto usa un sistema de colores primario y secundario definido en Tailwind:

- **Primary**: Azul (#0ea5e9)
- **Secondary**: Púrpura (#d946ef)

Para cambiar los colores, modifica `tailwind.config.js`:

```javascript
colors: {
  primary: {
    // tus colores
  },
  secondary: {
    // tus colores
  }
}
```

## 📱 Responsive Design

El diseño es responsive y se adapta a:

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## 🔧 Scripts Disponibles

```bash
# Desarrollo (con hot reload)
npm run dev

# Producción
npm start

# Compilar CSS de Tailwind (watch mode)
npm run build:css

# Ejecutar todo (servidor + CSS watch)
npm run dev:all
```

## 🌐 Despliegue

### Producción local

```bash
NODE_ENV=production npm start
```

### Despliegue en servicios cloud

El proyecto puede desplegarse en:

- **Vercel**
- **Netlify**
- **Heroku**
- **Railway**
- **Render**

Asegúrate de:

1. Configurar las variables de entorno
2. Compilar Tailwind CSS antes del despliegue
3. Establecer `NODE_ENV=production`

## 📧 Formulario de Contacto

Para que el formulario funcione completamente, necesitas configurar un servicio de email. Opciones:

1. **Nodemailer** con Gmail/SMTP
2. **SendGrid**
3. **Mailgun**
4. **Amazon SES**

Ejemplo de configuración con Nodemailer (añadir en `page.controller.js`):

```javascript
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});
```

## 🎯 Características Técnicas

### Alpine.js

- Reactividad sin compilación
- Sintaxis declarativa similar a Vue
- Tamaño reducido (~15kb)

### Tailwind CSS v4

- Utility-first CSS
- Dark mode incluido
- Animaciones personalizadas
- Componentes reutilizables

### Express v5

- Rutas modernas
- Middlewares de seguridad
- Compresión GZIP
- Logging con Morgan

## 🔒 Seguridad

El proyecto incluye:

- Helmet.js para headers de seguridad
- Validación de formularios
- Sanitización de inputs
- CORS configurado
- CSP (Content Security Policy)

## 🐛 Solución de Problemas

### El CSS no se aplica

Asegúrate de que has compilado Tailwind:

```bash
npm run build:css
```

### El tema oscuro no funciona

Verifica que Alpine.js se ha cargado correctamente. Abre la consola del navegador y busca errores.

### Error de puerto en uso

Cambia el puerto en `.env`:

```env
PORT=3001
```

## 👤 Autor

**Josevi Pérez**
- Portfolio: [https://jperegir.github.io/](https://jperegir.github.io/)
- GitHub: [@jperegir](https://github.com/jperegir)

---

⭐ Si te ha gustado este proyecto, ¡dale una estrella en GitHub!