import { createTransport } from 'nodemailer';

/**
 * Configuración del transporter de Nodemailer para Gmail
 * Utiliza variables de entorno para credenciales SMTP
 */
const createTransporter = () => {
  const config = {
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.SMTP_PORT) || 587,
    secure: false, // true para puerto 465, false para otros puertos
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS, // Contraseña de aplicación de Gmail
    },
  };

  return createTransport(config);
};

/**
 * Envía un email con los datos del formulario de contacto
 * @param {Object} formData - Datos del formulario
 * @param {string} formData.name - Nombre del remitente
 * @param {string} formData.email - Email del remitente
 * @param {string} formData.message - Mensaje del remitente
 * @returns {Promise<Object>} Resultado del envío
 */
export const sendContactEmail = async ({ name, email, message }) => {
  try {
    // Validar que existan las credenciales SMTP
    if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
      throw new Error('Configuración SMTP incompleta. Verifica las variables de entorno SMTP_USER y SMTP_PASS.');
    }

    const transporter = createTransporter();

    // Configuración del email
    const mailOptions = {
      from: `"${name}" <${process.env.SMTP_USER}>`, // Remitente (tu cuenta Gmail)
      to: process.env.CONTACT_EMAIL || process.env.SMTP_USER, // Destinatario (tu email)
      replyTo: email, // Email del usuario para poder responder directamente
      subject: `Nuevo mensaje de contacto desde el portfolio - ${name}`,
      html: `
        <!DOCTYPE html>
        <html lang="es">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style>
            body {
              font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
              line-height: 1.6;
              color: #333;
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
              background-color: #f4f4f4;
            }
            .container {
              background-color: #ffffff;
              border-radius: 8px;
              padding: 30px;
              box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            }
            .header {
              border-bottom: 3px solid #007bff;
              padding-bottom: 15px;
              margin-bottom: 25px;
            }
            h1 {
              color: #007bff;
              margin: 0;
              font-size: 24px;
            }
            .info-row {
              margin: 15px 0;
              padding: 10px;
              background-color: #f8f9fa;
              border-left: 4px solid #007bff;
            }
            .label {
              font-weight: bold;
              color: #555;
              display: inline-block;
              min-width: 80px;
            }
            .value {
              color: #333;
            }
            .message-content {
              background-color: #f8f9fa;
              padding: 20px;
              border-radius: 4px;
              margin-top: 20px;
              white-space: pre-wrap;
              word-wrap: break-word;
            }
            .footer {
              margin-top: 30px;
              padding-top: 20px;
              border-top: 1px solid #dee2e6;
              font-size: 12px;
              color: #6c757d;
              text-align: center;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>📬 Nuevo mensaje de contacto</h1>
            </div>

            <div class="info-row">
              <span class="label">👤 Nombre:</span>
              <span class="value">${name}</span>
            </div>

            <div class="info-row">
              <span class="label">📧 Email:</span>
              <span class="value"><a href="mailto:${email}">${email}</a></span>
            </div>

            <div class="info-row">
              <span class="label">📅 Fecha:</span>
              <span class="value">${new Date().toLocaleString('es-ES', {
                dateStyle: 'long',
                timeStyle: 'short'
              })}</span>
            </div>

            <h2 style="color: #333; margin-top: 25px;">💬 Mensaje:</h2>
            <div class="message-content">
              ${message}
            </div>

            <div class="footer">
              <p>Este mensaje fue enviado desde el formulario de contacto de tu portfolio web</p>
              <p>Para responder, simplemente pulsa "Responder" en tu cliente de correo</p>
            </div>
          </div>
        </body>
        </html>
      `,
      text: `
Nuevo mensaje de contacto desde el portfolio

Nombre: ${name}
Email: ${email}
Fecha: ${new Date().toLocaleString('es-ES')}

Mensaje:
${message}

---
Para responder, simplemente responde a este email.
      `.trim(),
    };

    // Enviar el email
    const info = await transporter.sendMail(mailOptions);

    console.log('Email enviado exitosamente:', info.messageId);

    return {
      success: true,
      messageId: info.messageId,
      message: 'Email enviado correctamente',
    };
  } catch (error) {
    console.error('Error al enviar email:', error);

    return {
      success: false,
      error: error.message,
      message: 'Error al enviar el email',
    };
  }
};

/**
 * Verifica la configuración SMTP intentando conectar al servidor
 * @returns {Promise<boolean>} true si la conexión es exitosa
 */
export const verifyEmailConfig = async () => {
  try {
    if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
      console.warn('⚠️  Configuración SMTP incompleta');
      return false;
    }

    const transporter = createTransporter();
    await transporter.verify();

    console.log('✅ Configuración SMTP verificada correctamente');
    return true;
  } catch (error) {
    console.error('❌ Error en la configuración SMTP:', error.message);
    return false;
  }
};
