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
    description:
      "Programador de aplicaciones web de profesión, fotógrafo en sus ratos libres y, siempre, apasionado por el campo y la Naturaleza. Cuando trabajo en un proyecto, parto del análisis de las necesidades reales del negocio y me enfoco en la eficiencia y en la usabilidad de las soluciones implementadas. Me considero agnóstico a la tecnología, por lo que trato de aplicar soluciones \"sensatas\", tras analizar primero los problemas, siempre antes de definir cualquier posible solución.",
    highlights: [
      "Desarrollo de API RESTful e integraciones de servicios web",
      "Creación de aplicaciones para mejora de procesos industriales",
      "Diseño de bases de datos relacionales con Microsoft SQL Server",
      "Soluciones robustas y flexibles basadas en SOLID y arquitecturas mantenibles",
    ],
  },

  education: [
    {
      year: "2024",
      title: "Curso Formativo Inglés B1",
      institution: "Servei Valencià d'Ocupació i Formació",
      duration: "240 horas",
      type: "course",
    },
    {
      year: "2021",
      title: "Fast Master en Dirección de Transformación Digital",
      institution: "Nunsys",
      duration: "90 horas",
      type: "course",
    },
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
      type: "certification",
    },
    {
      year: "2016",
      title:
        "Técnico Superior Iluminación, Captación y Tratamiento de la imagen",
      institution: "Instituto Educación Secundaria La Marxadella",
      type: "degree",
    },
    {
      year: "2003",
      title: "Ingeniero Técnico Forestal",
      institution: "Universidad Politécnica de Valencia",
      type: "degree",
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
      },
      {
        title: "Aplicación web para la gestión de RRHH",
        company: "CATENVA GROUP S.L.",
        logo: "/assets/images/catenva-logo.png",
      },
      {
        title: "API RESTful para integración de SGA con plataformas de ecommerce",
        company: "AZA LOGISTICS S.L.U.",
        logo: "/assets/images/aza-logo.png",
      },
      {
        title: "Aplicación web de registro de visitas a almacenes",
        company: "AZA LOGISTICS S.L.U.",
        logo: "/assets/images/aza-logo.png",
      },
      {
        title: "Aplicación web de control de visitas y personal externo en almacenes",
        company: "AZA LOGISTICS S.L.U.",
        logo: "/assets/images/aza-logo.png",
      },
      {
        title: "Plataforma web de control de pedidos, preavisos, stocks y trazabilidad",
        company: "AZA LOGISTICS S.L.U.",
        logo: "/assets/images/aza-logo.png",
      },
      {
        title: "Servicio web (API RESTful) para la generación de códigos QR",
        company: "AZA LOGISTICS S.L.U.",
        logo: "/assets/images/aza-logo.png",
      },
      {
        title: "Servicio web (API RESTful) para la consulta y formateo de datos para generación de KPI's",
        company: "AZA LOGISTICS S.L.U.",
        logo: "/assets/images/aza-logo.png",
      },
      {
        title: "Motor de impresión de etiquetas de expedición en almacenes",
        company: "AZA LOGISTICS S.L.U.",
        logo: "/assets/images/aza-logo.png",
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
