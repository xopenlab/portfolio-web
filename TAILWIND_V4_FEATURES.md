# Tailwind CSS v4 - Características Avanzadas Implementadas

Este documento describe las características avanzadas de Tailwind CSS v4 implementadas en el proyecto y cómo utilizarlas.

## 📚 Índice

0. [Dark Mode Strategy](#dark-mode-strategy)
1. [Custom Variants](#custom-variants)
2. [Custom Selectors](#custom-selectors)
3. [Animation Utilities](#animation-utilities)
4. [Form Validation Utilities](#form-validation-utilities)
5. [Ejemplos Prácticos](#ejemplos-prácticos)

---

## 0. Dark Mode Strategy

### Configuración de Dark Mode en Tailwind v4

**IMPORTANTE**: En Tailwind CSS v4, la estrategia de dark mode se configura usando la directiva `@variant` en el archivo CSS, NO en `tailwind.config.js`.

```css
/* En public/css/styles.css */
@variant dark (&:where(.dark, .dark *));
```

Esta directiva le indica a Tailwind que genere selectores dark mode basados en la clase `.dark` aplicada al elemento raíz (`<html>` o `<body>`), en lugar de usar `@media (prefers-color-scheme: dark)`.

### Selectores Generados

Con esta configuración, Tailwind genera selectores como:

```css
.dark\:bg-gray-900:where(.dark,.dark *) {
  background-color: var(--color-gray-900);
}
```

Esto significa que `dark:bg-gray-900` solo se aplicará cuando hay una clase `.dark` en un ancestro.

### Uso en HTML

```html
<!-- Modo claro -->
<html>
  <body class="bg-white text-gray-900">
    Content in light mode
  </body>
</html>

<!-- Modo oscuro -->
<html class="dark">
  <body class="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
    Content in dark mode
  </body>
</html>
```

### Gestión con JavaScript

El proyecto usa `theme.js` para gestionar el estado del modo oscuro:

```javascript
// Aplicar clase .dark al <html>
document.documentElement.classList.add('dark');

// Remover clase .dark
document.documentElement.classList.remove('dark');

// Persistir en localStorage
localStorage.setItem('darkMode', 'true');
```

---

## 1. Custom Variants

Las variantes personalizadas permiten aplicar estilos basados en estados específicos del elemento.

### Variantes Disponibles

#### `optional:`
Aplica estilos a campos de formulario opcionales (sin el atributo `required`).

```html
<input type="text" class="form-input optional:border-dashed optional:border-gray-300">
```

#### `invalid:`
Aplica estilos cuando un campo de formulario es inválido.

```html
<input type="email" required class="form-input invalid:border-red-500 invalid:ring-red-200">
```

#### `valid:`
Aplica estilos cuando un campo de formulario es válido.

```html
<input type="email" required class="form-input valid:border-green-500 valid:ring-green-200">
```

#### `has-tooltip:`
Aplica estilos a elementos que tienen el atributo `data-tooltip`.

```html
<button data-tooltip="Click me!" class="has-tooltip:underline has-tooltip:decoration-dotted">
  Hover me
</button>
```

#### `interactive:`
Aplica estilos a elementos interactivos (botones, enlaces, elementos con `role="button"`).

```html
<div class="interactive:cursor-pointer interactive:hover:bg-gray-100">
  <button>Click</button>
  <a href="#">Link</a>
</div>
```

---

## 2. Custom Selectors

Los selectores personalizados agrupan múltiples elementos bajo un solo selector para estilos consistentes.

### Selectores Disponibles

#### `:--heading`
Selecciona todos los elementos de encabezado (h1, h2, h3, h4, h5, h6).

```css
/* En tu CSS personalizado */
:--heading {
  @apply font-bold text-gray-900 dark:text-gray-100;
}
```

#### `:--button`
Selecciona todos los elementos tipo botón (button, input[type="button"], etc.).

```css
/* En tu CSS personalizado */
:--button {
  @apply cursor-pointer select-none transition-all duration-200;
}
```

### Uso en @layer

```css
@layer components {
  :--heading {
    @apply mb-4 tracking-tight;
  }

  :--button {
    @apply rounded-lg px-4 py-2;
  }
}
```

---

## 3. Animation Utilities

Clases de utilidad para animaciones predefinidas que usan las variables del tema.

### Animaciones Disponibles

| Clase | Descripción | Uso |
|-------|-------------|-----|
| `.animate-fade-in` | Aparece gradualmente | Elementos que aparecen |
| `.animate-fade-in-up` | Aparece desde abajo | Hero sections, cards |
| `.animate-fade-in-down` | Aparece desde arriba | Notificaciones, headers |
| `.animate-slide-in-left` | Desliza desde la izquierda | Menús laterales |
| `.animate-slide-in-right` | Desliza desde la derecha | Paneles, sidebars |
| `.animate-bounce-slow` | Rebote lento continuo | Flechas, indicadores |
| `.animate-pulse-slow` | Pulso lento continuo | Badges, notificaciones |

### Ejemplos de Uso

```html
<!-- Hero section con animación -->
<section class="animate-fade-in-up">
  <h1>Bienvenido</h1>
</section>

<!-- Card con animación -->
<div class="card animate-fade-in">
  <h2>Contenido</h2>
</div>

<!-- Indicador de scroll -->
<div class="animate-bounce-slow">
  ↓
</div>

<!-- Badge con pulso -->
<span class="badge animate-pulse-slow">
  Nuevo
</span>
```

### Animaciones con Scroll

Para animaciones que se activan al hacer scroll, usa `.animate-on-scroll`:

```html
<div class="animate-on-scroll">
  Este contenido se animará cuando entre en el viewport
</div>
```

```javascript
// JavaScript para activar la animación
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
    }
  });
});

document.querySelectorAll('.animate-on-scroll').forEach(el => {
  observer.observe(el);
});
```

---

## 4. Form Validation Utilities

Clases de utilidad para estilos de validación de formularios.

### `.form-field-valid`

Aplica estilos de éxito cuando el campo es válido.

```html
<input
  type="email"
  required
  class="form-input form-field-valid"
  placeholder="tu@email.com"
>
```

### `.form-field-invalid`

Aplica estilos de error cuando el campo es inválido.

```html
<input
  type="email"
  required
  class="form-input form-field-invalid"
  placeholder="tu@email.com"
>
```

### Combinación Completa

```html
<form class="space-y-4">
  <div>
    <label class="form-label">Email *</label>
    <input
      type="email"
      required
      class="form-input form-field-valid form-field-invalid"
      placeholder="tu@email.com"
    >
  </div>

  <div>
    <label class="form-label">Comentario</label>
    <textarea
      class="form-input optional:border-dashed"
      placeholder="Opcional"
    ></textarea>
  </div>

  <button type="submit" class="btn-primary">
    Enviar
  </button>
</form>
```

---

## 5. Ejemplos Prácticos

### Formulario Completo con Validación

```html
<form class="max-w-md mx-auto space-y-4">
  <!-- Campo requerido con validación visual -->
  <div>
    <label class="form-label">Nombre *</label>
    <input
      type="text"
      required
      minlength="3"
      class="form-input form-field-valid form-field-invalid animate-fade-in-up"
      placeholder="Tu nombre completo"
    >
  </div>

  <!-- Campo opcional con estilo diferente -->
  <div>
    <label class="form-label">Teléfono</label>
    <input
      type="tel"
      class="form-input optional:border-dashed optional:bg-gray-50 dark:optional:bg-gray-800"
      placeholder="+34 XXX XXX XXX"
    >
  </div>

  <!-- Botón con tooltip -->
  <button
    type="submit"
    data-tooltip="Enviar formulario"
    class="btn-primary has-tooltip:shadow-xl"
  >
    Enviar
  </button>
</form>
```

### Card Interactiva con Animaciones

```html
<div class="card animate-fade-in hover:animate-pulse-slow">
  <h3 class="text-2xl mb-4">Proyecto Destacado</h3>
  <p class="text-gray-600 dark:text-gray-400 mb-4">
    Descripción del proyecto
  </p>
  <div class="flex gap-2">
    <button class="btn-primary animate-fade-in-up">
      Ver más
    </button>
    <button class="btn-outline animate-fade-in-up" style="animation-delay: 0.1s">
      GitHub
    </button>
  </div>
</div>
```

### Navegación con Custom Variants

```html
<nav class="flex gap-4">
  <a href="#home" class="nav-link interactive:scale-105">Inicio</a>
  <a href="#about" class="nav-link interactive:scale-105">Sobre mí</a>
  <a href="#projects" class="nav-link interactive:scale-105">Proyectos</a>
  <a href="#contact" class="nav-link interactive:scale-105">Contacto</a>
</nav>
```

### Section con Glassmorphism y Animaciones

```html
<section class="section glass animate-fade-in">
  <h2 class="section-title animate-fade-in-down">
    Habilidades
  </h2>
  <p class="section-subtitle animate-fade-in-up">
    Tecnologías que domino
  </p>

  <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
    <div class="card animate-slide-in-left">
      <h3>Frontend</h3>
      <span class="badge animate-pulse-slow">Experto</span>
    </div>
    <div class="card animate-fade-in-up" style="animation-delay: 0.2s">
      <h3>Backend</h3>
      <span class="badge animate-pulse-slow">Avanzado</span>
    </div>
    <div class="card animate-slide-in-right">
      <h3>DevOps</h3>
      <span class="badge animate-pulse-slow">Intermedio</span>
    </div>
  </div>
</section>
```

---

## 🎯 Mejores Prácticas

1. **Usa Custom Variants** para estados de formulario en lugar de JavaScript cuando sea posible
2. **Aplica Custom Selectors** para estilos consistentes en grupos de elementos
3. **Combina Animaciones** con `animation-delay` para efectos escalonados
4. **Usa Form Validation Utilities** para feedback visual inmediato
5. **Aprovecha las variables de `@theme`** para mantener consistencia en animaciones

---

## 📝 Notas

- Todas las animaciones están definidas en `public/css/styles.css`
- Las variantes personalizadas funcionan con todos los modificadores de Tailwind
- Los selectores personalizados solo funcionan dentro de archivos CSS, no en clases HTML
- Para mejor rendimiento, usa `animation-fill-mode: both` cuando sea necesario

---

## 🔗 Referencias

- [Tailwind CSS v4 Documentation](https://tailwindcss.com/docs)
- [Custom Variants](https://tailwindcss.com/docs/adding-custom-styles#using-custom-variants)
- [Custom Selectors](https://tailwindcss.com/docs/adding-custom-styles#using-custom-selectors)
