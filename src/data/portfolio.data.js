/**
 * Datos centralizados del portfolio
 * Este archivo contiene toda la información personal, profesional y de proyectos
 */

export const portfolioData = {
  personalInfo: {
    name: "Josevi Pérez",
    title: "Programador Web Senior",
    location: "Almussafes (Valencia)",
    email: "jperegir@gmail.com",
    phone: "+34 667 701 362",
    linkedin: "linkedin.com/in/jose-vicente-perez-girona-0676a9291",
    github: 'https://github.com/jperegir',
  },

  about: {
    description: [
      "Programador de aplicaciones web de profesión, fotógrafo en sus ratos libres y apasionado por el campo y la Naturaleza.",
      "Cuando trabajo en un proyecto, parto del análisis de las necesidades reales del negocio y diseño soluciones eficientes, usables y sostenibles.",
      "Apuesto siempre por un enfoque tecnológicamente agnóstico, donde la herramienta nunca va por delante del problema.",
    ],
    highlights: [
      "Desarrollo de API RESTful e integraciones de servicios web",
      "Creación de aplicaciones para mejora de procesos industriales",
      "Diseño de bases de datos relacionales con Microsoft SQL Server",
      "Soluciones robustas y flexibles basadas en SOLID y arquitecturas mantenibles",
    ],
  },

  education: [
    {
      year: "2018",
      title: "Técnico Superior en Desarrollo de Aplicaciones Multiplataforma",
      institution: "Florida Universitaria",
      type: "degree",
    },
    {
      year: "2018",
      title: "Certificado en Oracle DataBase Foundations (1Z0-006)",
      institution: "Centro SERVEF de Formación CRNFP de Paterna",
      type: "degree",
    },
    {
      year: "2016",
      title: "Técnico Superior Iluminación, Captación y Tratamiento de la imagen",
      institution: "Instituto Educación Secundaria La Marxadella",
      type: "degree",
    },
    {
      year: "2003",
      title: "Certificado de Aptitud Pedagógica (CAP)",
      institution: "Universidad Politécnica de Valencia",
      type: "degree",
    },
    {
      year: "2003",
      title: "Ingeniero Técnico Forestal",
      institution: "Universidad Politécnica de Valencia",
      type: "degree",
    },
    {
      year: "2026",
      title: "Inteligencia Artificial Aplicada con Node.js (60 horas)",
      institution: "Universidad Politécnica de Valencia",
      type: "course",
    },
    {
      year: "2024",
      title: "Curso Formativo Inglés B1 (240 horas)",
      institution: "Servei Valencià d'Ocupació i Formació",
      type: "course",
    },
    {
      year: "2021",
      title: "Fast Master en Dirección de Transformación Digital (90 horas)",
      institution: "Nunsys",
      type: "course",
    },
    {
      year: "2018",
      title: "Curso de Introducción a las BBDD Relacionales Oracle (80 horas)",
      institution: "Centro SERVEF de Formación CRNFP de Paterna",
      type: "course",
    },
    {
      year: "2018",
      title: "Curso de Desarrollo de Aplicaciones Web con PHP y MySQL (80 horas)",
      institution: "Centro SERVEF de Formación CRNFP de Paterna",
      type: "course",
    },
  ],

  experience: [
    {
      year: "2024 - hoy",
      company: "CATENVA GROUP S.L.",
      position: "Programador aplicaciones web senior",
      logo: "/assets/images/catenva-logo.png",
      current: true,
    },
    {
      year: "2020",
      company: "AZA LOGISTICS S.L.U.",
      position: "Programador aplicaciones web senior",
      logo: "/assets/images/aza-logo.png",
      current: false,
    },
    {
      year: "2019",
      company: "LABORATORIOS ATL ESPAÑA S.L",
      position: "Programador aplicaciones Java y web junior",
      logo: "/assets/images/atl-logo.png",
      current: false,
    },
    {
      year: "2018",
      company: "MERCADONA S.A.",
      position: "Técnico Informático SAP ERP",
      logo: "/assets/images/mercadona-logo.png",
      current: false,
    },
    {
      year: "2017",
      company: "INDENOVA S.L.",
      position: "Programador aplicaciones Android y Java junior",
      logo: "/assets/images/indenova-logo.jpg",
      current: false,
    },
  ],

  skills: [
    { name: "Node.js", level: 95, category: "backend" },
    { name: "JavaScript (Vanilla)", level: 95, category: "frontend" },
    { name: "TypeScript", level: 70, category: "frontend" },
    { name: "Express.js", level: 95, category: "backend" },
    { name: "HTML5", level: 95, category: "frontend" },
    { name: "CSS3", level: 90, category: "frontend" },
    { name: "PHP", level: 75, category: "backend" },
    { name: "Microsoft SQL Server", level: 90, category: "database" },
    { name: "Git", level: 90, category: "tools" },
    { name: "REST API", level: 95, category: "backend" },
  ],

  projects: {
    featured: [
      {
        title: "Aplicación web para el control y la gestión de plantaciones de chopos",
        company: "CATENVA GROUP S.L.",
        logo: "/assets/images/catenva-logo.png",
        category: "webapp",
        link: "https://apps.fustek.es/gep/login/render",
      },
      {
        title: "Aplicación web para la gestión de RRHH",
        company: "CATENVA GROUP S.L.",
        logo: "/assets/images/catenva-logo.png",
        category: "webapp",
      },
      {
        title: "Aplicación web para la gestión de procesos de fabricación de contrachapados de madera",
        company: "CATENVA GROUP S.L.",
        logo: "/assets/images/catenva-logo.png",
        category: "webapp",
      },
      {
        title: "Aplicación para el control de visitas y personal externo en almacenes",
        company: "AZA LOGISTICS S.L.U.",
        logo: "/assets/images/aza-logo.png",
        category: "webapp",
      },
      {
        title: "Aplicación para la integración de datos de facturación legacy con ERP",
        company: "AZA LOGISTICS S.L.U.",
        logo: "/assets/images/aza-logo.png",
        category: "webapp",
      },
      {
        title: "Aplicación web para la generación e impresión de albaranes de expedición",
        company: "AZA LOGISTICS S.L.U.",
        logo: "/assets/images/aza-logo.png",
        category: "webapp",
      },
      {
        title: "Aplicación web para la gestión de pedidos con productos ecológicos",
        company: "AZA LOGISTICS S.L.U.",
        logo: "/assets/images/aza-logo.png",
        category: "webapp",
      },
      {
        title: "Aplicación web para la reserva de muelles de carga/descarga en almacenes",
        company: "AZA LOGISTICS S.L.U.",
        logo: "/assets/images/aza-logo.png",
        category: "webapp",
      },
      {
        title: "Aplicación web para la notificación automática a clientes de pedidos pendientes y expedidos",
        company: "AZA LOGISTICS S.L.U.",
        logo: "/assets/images/aza-logo.png",
        category: "webapp",
      },
      {
        title: "Aplicación web para el control de pedidos, preavisos, stocks y trazabilidad",
        company: "AZA LOGISTICS S.L.U.",
        logo: "/assets/images/aza-logo.png",
        category: "webapp",
        link: "https://www.azalogistics.es/seguimiento-trazal/",
      },
      {
        title: "API RESTful para registro de fichajes entrada-salida de empleados",
        company: "CATENVA GROUP S.L.",
        logo: "/assets/images/catenva-logo.png",
        category: "api",
      },
      {
        title: "API RESTful para integrar pedidos de clientes en el sistema de producción de contrachapados",
        company: "CATENVA GROUP S.L.",
        logo: "/assets/images/catenva-logo.png",
        category: "api",
      },
      {
        title: "API RESTful para integración del SGA con plataformas de ecommerce",
        company: "AZA LOGISTICS S.L.U.",
        logo: "/assets/images/aza-logo.png",
        category: "api",
      },
      {
        title: "API RESTful para generación de códigos QR para seguimiento y trazabilidad de pedidos expedidos",
        company: "AZA LOGISTICS S.L.U.",
        logo: "/assets/images/aza-logo.png",
        category: "api",
      },
      {
        title: "API RESTful para conversión de imágenes (JPG y PNG) a formato PDF",
        company: "AZA LOGISTICS S.L.U.",
        logo: "/assets/images/aza-logo.png",
        category: "api",
      },
      {
        title: "Sistema de monitorización de aplicaciones y servicios web",
        company: "CATENVA GROUP S.L.",
        logo: "/assets/images/catenva-logo.png",
        category: "automation",
      },
      {
        title: "Sistema de monitorización de dispositivos remotos de fichajes de presencia",
        company: "CATENVA GROUP S.L.",
        logo: "/assets/images/catenva-logo.png",
        category: "automation",
      },
      {
        title: "Motor de impresión de etiquetas de expedición y albaranes",
        company: "AZA LOGISTICS S.L.U.",
        logo: "/assets/images/aza-logo.png",
        category: "automation",
      },
      {
        title: "Generador de albaranes de entrega con QR de seguimiento de envíos integrado",
        company: "AZA LOGISTICS S.L.U.",
        logo: "/assets/images/aza-logo.png",
        category: "automation",
      },
      {
        title: "Sistema de notificación automática a clientes de expediciones desde almacenes",
        company: "AZA LOGISTICS S.L.U.",
        logo: "/assets/images/aza-logo.png",
        category: "automation",
      },
    ],
    libraries: [
      "Alpine.js",
      "GSAP",
      "Chart.js",
      "DataTables",
      "FullCalendar",
      "SweetAlert",
      "Select2",
      "Choices.js",
      "SheetJS",
      "ExcelJS",
      "Tesseract",
      "Bootstrap",
      "Tailwind",
      "Vitest",
      "Jest",
    ],
  },
};
