import nodemailer from 'nodemailer';
import fs from 'fs';
import path from 'path';

/**
 * Envía un correo de verificación con un código personalizado.
 *
 * @param {string} email - Dirección de correo electrónico del destinatario.
 * @param {string} username - Nombre de usuario asociado al correo.
 * @param {string} verificationCode - Código de verificación generado.
 * @returns {Promise<boolean>} - Devuelve una promesa que resuelve en true si el correo se envía con éxito, o false en caso de error.
 */
export const sendVerificationEmail = async (email: string, username: string, verificationCode: string): Promise<boolean> => {
    try {
        // Construye la ruta absoluta del archivo de plantilla de correo electrónico
        const templatePath = path.join(__dirname, '..', '..', '..', '..', '..', '..', 'apiServices', 'Auth', 'register', 'templates', 'verificationEmail.html');

        // Lee la plantilla de correo electrónico desde el archivo
        const emailTemplate = fs.readFileSync(templatePath, 'utf-8');

        // Personaliza la plantilla
        const personalizedEmail = emailTemplate
            .replace('{{ username }}', username)
            .replace('{{ verificationCode }}', verificationCode);

        // Configura el transporte de Nodemailer
        const transporter = nodemailer.createTransport({
            service: 'gmail', // Utiliza el servicio de Gmail
            auth: {
                user: process.env.MAIL_USER, // Usuario de Gmail
                pass: process.env.MAIL_PASS, // Contraseña de Gmail
            },
            secure: true, // Usa TLS para la seguridad de la conexión
        });

        // Define las opciones del correo electrónico
        const mailOptions = {
            from: process.env.MAIL_USER, // Dirección de correo electrónico del remitente
            to: email, // Dirección de correo electrónico del destinatario
            subject: 'Verificación de correo electrónico', // Asunto del correo
            html: personalizedEmail, // Contenido del correo en formato HTML
        };

        // Registra el código de verificación
        console.log('Código de verificación enviado:', verificationCode);

        // Envía el correo en segundo plano
        setImmediate(async () => {
            try {
                await transporter.sendMail(mailOptions);
                console.log('Correo de verificación enviado a:', email);
            } catch (error) {
                console.error('Error al enviar el correo de verificación:', error);
            }
        });

        // Devuelve inmediatamente el éxito sin esperar al envío del correo
        return true;
    } catch (error) {
        console.error('Error al procesar el envío del correo:', error);
        return false;
    }
};
