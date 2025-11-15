# 🚀 Guía de Inicio Rápido

## Pasos para poner en marcha el proyecto

### 1️⃣ Crear la estructura de directorios

```bash
mkdir -p portfolio-web/{src/{config,routes,controllers,views/{layouts,partials/{sections},pages}},public/{css,js,images}}
cd portfolio-web
```

### 2️⃣ Inicializar el proyecto

```bash
npm init -y
```

### 3️⃣ Instalar dependencias

```bash
# Dependencias principales
npm install express@5 ejs dotenv compression helmet morgan

# Dependencias de desarrollo
npm install -D nodemon tailwindcss@4 concurrently @tailwindcss/forms
```

### 4️⃣ Copiar todos los archivos

Copia todos los archivos que te he proporcionado en sus respectivas ubicaciones según la estructura de directorios.

### 5️⃣ Configurar variables de entorno

```bash
cp .env.example .env
```

Edita `.env` con tus datos:
```env
PORT=3000
NODE_ENV=development
CONTACT_EMAIL=tu-email@ejemplo.com
```

### 6️⃣ Compilar Tailwind CSS

Abre una terminal y ejecuta:
```bash
npm run build:css
```

Deja esta terminal abierta para que compile automáticamente los cambios.

### 7️⃣ Iniciar el servidor

Abre otra terminal y ejecuta:
```bash
npm run dev
```

### 8️⃣ Abrir en el navegador

Navega a: `http://localhost:3000`

---

## ⚡ Comando rápido (todo en uno)

Si prefieres ejecutar todo junto:

```bash
npm run dev:all
```

Este comando iniciará tanto el servidor como la compilación de CSS.

---

## 📝 Checklist de Personalización

- [ ] Actualizar información personal en `src/controllers/page.controller.js`
- [ ] Cambiar email en `.env`
- [ ] Actualizar enlaces de redes sociales
- [ ] Añadir tu foto de perfil (si deseas)
- [ ] Modificar colores del tema en `tailwind.config.js`
- [ ] Personalizar meta tags en `src/views/partials/head.ejs`
- [ ] Revisar y ajustar experiencia laboral
- [ ] Actualizar lista de proyectos
- [ ] Configurar formulario de contacto con servicio de email

---

## 🎨 Personalización Rápida de Colores

Edita `tailwind.config.js` para cambiar los colores:

```javascript
colors: {
  primary: {
    500: '#TU_COLOR',
    600: '#TU_COLOR_OSCURO',
    // ...
  }
}
```

---

## 🐛 Problemas Comunes

### Puerto en uso
```bash
# En .env cambia:
PORT=3001
```

### CSS no se aplica
```bash
# Ejecuta de nuevo:
npm run build:css
```

### Alpine.js no funciona
Verifica la consola del navegador. Alpine.js se carga desde CDN.

---

## 📦 Estructura de Archivos Críticos

```
portfolio-web/
├── server.js                    # ← Punto de entrada
├── package.json                 # ← Dependencias
├── .env                         # ← Configuración (crear)
├── tailwind.config.js          # ← Config Tailwind
└── src/
    ├── controllers/
    │   └── page.controller.js   # ← DATOS DEL PORTFOLIO
    ├── public/
    │   ├── css/
    │   │   ├── styles.css       # ← Estilos personalizados
    │   │   └── output.css       # ← Generado por Tailwind
    │   └── js/
    │       ├── main.js
    │       ├── theme.js
    │       └── animations.js
    └── views/
        └── ...                  # ← Plantillas EJS
```

---

## 🚀 Desplegar en Producción

### Vercel

1. Instala Vercel CLI:
```bash
npm i -g vercel
```

2. Despliega:
```bash
vercel
```

### Otras plataformas

Ver README.md para instrucciones detalladas de despliegue en:
- Netlify
- Heroku
- Railway
- Render

---

## 💡 Tips

1. **Desarrollo**: Usa `npm run dev:all` para trabajar cómodamente
2. **Colores**: Cambia los colores en `tailwind.config.js`
3. **Datos**: Todo está en `page.controller.js`
4. **Imágenes**: Coloca tus imágenes en `src/public/images/`
5. **Secciones**: Cada sección es un archivo EJS separado en `partials/sections/`

---

¿Necesitas ayuda? Revisa el README.md completo para más detalles.