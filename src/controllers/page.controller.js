// Datos del portfolio
const portfolioData = {
  personalInfo: {
    name: "Josevi Pérez",
    title: "Programador Web Senior",
    location: "Almussafes (Valencia)",
    email: "jperegir@gmail.com", // Cambiar por tu email real
    phone: "+34 667 701 362", // Cambiar por tu teléfono real
    linkedin: "linkedin.com/in/jose-vicente-perez-girona-0676a9291", // Cambiar por tu perfil
    // github: 'https://github.com/jperegir',
  },

  about: {
    description:
      "Profesional con más de siete años dedicados a la programación web, con amplia experiencia en el sector logístico y dedicado, en la actualidad, a la mejora de procesos en el sector de producción de derivados de la madera.",
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

// Controlador para la página principal
export const getHome = (req, res) => {
  try {
    res.render("pages/home", {
      title: `${portfolioData.personalInfo.name} - ${portfolioData.personalInfo.title}`,
      currentYear: new Date().getFullYear(),
      data: portfolioData,
    });
  } catch (error) {
    console.error("Error al renderizar home:", error);
    res.status(500).send("Error al cargar la página");
  }
};

// Controlador para la página de Aviso Legal
export const getLegalNotice = (req, res) => {
  try {
    res.render("pages/legal-notice", {
      title: `Aviso Legal - ${portfolioData.personalInfo.name}`,
      currentYear: new Date().getFullYear(),
      data: portfolioData,
    });
  } catch (error) {
    console.error("Error al renderizar aviso legal:", error);
    res.status(500).send("Error al cargar la página");
  }
};

// Controlador para la página de Política de Privacidad
export const getPrivacyPolicy = (req, res) => {
  try {
    res.render("pages/privacy-policy", {
      title: `Política de Privacidad - ${portfolioData.personalInfo.name}`,
      currentYear: new Date().getFullYear(),
      data: portfolioData,
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
      title: `Política de Cookies - ${portfolioData.personalInfo.name}`,
      currentYear: new Date().getFullYear(),
      data: portfolioData,
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
