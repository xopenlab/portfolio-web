/** @type {import('tailwindcss').Config} */
export default {
  // En Tailwind v4, la mayoría de la configuración se hace en CSS
  // Este archivo es opcional pero puede usarse para plugins adicionales
  content: [
    "./src/views/**/*.ejs",
    "./src/views/**/**/*.ejs",
    "./public/js/**/*.js"
  ],
  darkMode: 'class',
}