# Seguridad del Formulario de Contacto

Este documento describe las medidas de seguridad implementadas para proteger el formulario de contacto contra spam, bots y ataques automatizados.

## 🛡️ Medidas de Protección Implementadas

### 1. **Rate Limiting (Limitación de Tasa)**

**Archivos:** `src/middleware/rateLimiter.middleware.js`, `src/routes/index.routes.js`

Se han implementado dos niveles de rate limiting:

#### Limitador Moderado (`contactFormLimiter`)
- **Ventana:** 15 minutos
- **Límite:** 3 solicitudes por IP
- **Objetivo:** Prevenir spam moderado sin afectar usuarios legítimos

#### Limitador Estricto (`strictContactFormLimiter`)
- **Ventana:** 1 hora
- **Límite:** 10 solicitudes por IP
- **Objetivo:** Detectar y bloquear comportamiento sospechoso

**Características:**
- ✅ Identificación por IP del cliente
- ✅ Soporte para proxies (X-Forwarded-For, X-Real-IP)
- ✅ Headers estándar de rate limit
- ✅ Logging de intentos sospechosos
- ✅ Mensajes de error personalizados

---

### 2. **Honeypot (Campo Trampa)**

**Archivos:** `src/views/partials/sections/contact.ejs`, `src/controllers/page.controller.js`

#### Frontend
- Campo `website` oculto con CSS (`class="hidden"`)
- Atributos anti-autocompletado (`tabindex="-1"`, `autocomplete="off"`)
- Aria-hidden para lectores de pantalla

#### Backend
- Validación del campo honeypot en el controller
- Si está lleno → respuesta falsa de éxito (para no alertar al bot)
- Logging de detecciones para análisis

**Cómo funciona:**
```
Usuario humano → No ve el campo → No lo rellena → ✅ Pasa validación
Bot automático → Rellena todos los campos → ❌ Rechazado silenciosamente
```

---

### 3. **Validación de Tiempo de Envío**

**Archivos:** `src/views/partials/sections/contact.ejs`, `src/controllers/page.controller.js`

#### Frontend
- Timestamp al cargar el formulario (`formStartTime`)
- Cálculo del tiempo transcurrido al enviar
- Envío del tiempo al backend

#### Backend
- Validación de tiempo mínimo (3 segundos)
- Rechazo de envíos sospechosamente rápidos
- Mensaje de error amigable al usuario

**Objetivo:** Detectar bots que rellenan formularios instantáneamente.

---

### 4. **Validaciones de Datos Robustas**

**Archivos:** `src/views/partials/sections/contact.ejs`, `src/controllers/page.controller.js`

#### Validaciones Implementadas:

**Nombre:**
- Mínimo 3 caracteres, máximo 100
- Solo letras, espacios, guiones y apóstrofes
- Soporte para caracteres acentuados (español)

**Email:**
- Formato válido con regex robusta
- Conversión a minúsculas
- Trim de espacios

**Teléfono (opcional):**
- Mínimo 9 dígitos, máximo 15
- Formatos internacionales aceptados
- Solo válido si se proporciona

**Mensaje:**
- Mínimo 10 caracteres, máximo 1000
- Contador de caracteres en tiempo real
- Validación de longitud

---

## 📊 Monitoreo y Logging

Todas las medidas de seguridad registran eventos sospechosos en los logs:

```
⚠️  Honeypot detectado - Posible bot desde IP: xxx.xxx.xxx.xxx
⚠️  Envío sospechosamente rápido (1500ms) desde IP: xxx.xxx.xxx.xxx
⚠️  Rate limit excedido para IP: xxx.xxx.xxx.xxx
🚨 Rate limit estricto excedido para IP: xxx.xxx.xxx.xxx
```

## 🔧 Configuración

### Rate Limiting

Puedes ajustar los límites en `src/middleware/rateLimiter.middleware.js`:

```javascript
export const contactFormLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // Ajustar ventana de tiempo
  max: 3,                   // Ajustar número máximo de solicitudes
  // ...
});
```

### Tiempo Mínimo de Envío

Puedes ajustar el tiempo mínimo en `src/controllers/page.controller.js`:

```javascript
const MIN_TIME = 3000; // Ajustar tiempo mínimo en milisegundos
```

## 🚀 Mejoras Futuras Opcionales

Si necesitas mayor protección, considera añadir:

1. **Google reCAPTCHA v3**
   - Protección invisible contra bots avanzados
   - Requiere cuenta de Google
   - Gratuito hasta 1M evaluaciones/mes

2. **CSRF Tokens**
   - Protección contra ataques Cross-Site Request Forgery
   - Útil si tienes autenticación de usuarios

3. **IP Blacklisting**
   - Lista negra de IPs problemáticas
   - Requiere almacenamiento persistente

4. **Email Verification Service**
   - Validación de emails desechables
   - Servicios como ZeroBounce o Hunter.io

## 📝 Notas

- Las medidas actuales son suficientes para un portfolio personal
- No afectan la experiencia de usuarios legítimos
- Fáciles de mantener y sin dependencias externas complejas
- Balance óptimo entre seguridad y usabilidad

## 🔗 Referencias

- [express-rate-limit Documentation](https://github.com/express-rate-limit/express-rate-limit)
- [OWASP - Input Validation](https://cheatsheetseries.owasp.org/cheatsheets/Input_Validation_Cheat_Sheet.html)
- [Honeypot Technique](https://en.wikipedia.org/wiki/Honeypot_(computing))
