"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendVerificationEmail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
/**
 * Envía un correo de verificación con un código personalizado.
 *
 * Esta función lee una plantilla de correo electrónico desde un archivo HTML,
 * personaliza el contenido con el nombre de usuario y el código de verificación,
 * y envía el correo electrónico utilizando Nodemailer. Si el envío es exitoso,
 * la función devuelve true; de lo contrario, devuelve false.
 *
 * @param {string} email - Dirección de correo electrónico del destinatario.
 * @param {string} username - Nombre de usuario asociado al correo.
 * @param {string} verificationCode - Código de verificación generado.
 * @returns {Promise<boolean>} - Devuelve una promesa que resuelve en true si el correo se envía con éxito, o false en caso de error.
 */
const sendVerificationEmail = (email, username, verificationCode) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Construye la ruta absoluta del archivo de plantilla de correo electrónico
        const templatePath = path_1.default.join(__dirname, '..', '..', '..', '..', '..', 'apiServices', 'Auth', 'register', 'templates', 'verificationEmail.html');
        // Lee la plantilla de correo electrónico desde el archivo
        const emailTemplate = fs_1.default.readFileSync(templatePath, 'utf-8');
        // Personaliza la plantilla reemplazando los marcadores {{ username }} y {{ verificationCode }} con los valores reales
        const personalizedEmail = emailTemplate
            .replace('{{ username }}', username)
            .replace('{{ verificationCode }}', verificationCode);
        // Configura el transporte de Nodemailer para enviar el correo electrónico
        const transporter = nodemailer_1.default.createTransport({
            service: 'gmail', // Utiliza el servicio de Gmail para enviar el correo
            auth: {
                user: process.env.MAIL_USER, // Usuario de Gmail para autenticación
                pass: process.env.MAIL_PASS, // Contraseña de Gmail para autenticación
            },
            secure: true, // Usa TLS para la seguridad de la conexión
        });
        // Registra en la consola el código de verificación enviado
        console.log('Código de verificación enviado:', verificationCode);
        // Define las opciones del correo electrónico
        const mailOptions = {
            from: process.env.MAIL_USER, // Dirección de correo electrónico del remitente
            to: email, // Dirección de correo electrónico del destinatario
            subject: 'Verificación de correo electrónico', // Asunto del correo electrónico
            html: personalizedEmail, // Contenido del correo electrónico en formato HTML
        };
        // Envía el correo electrónico
        yield transporter.sendMail(mailOptions);
        console.log('Correo de verificación enviado a:', email); // Registra el éxito del envío en la consola
        return true; // Indica que el correo de verificación se envió con éxito
    }
    catch (error) {
        console.error('Error al enviar el correo de verificación:', error); // Registra el error en la consola
        return false; // Indica que hubo un error al enviar el correo de verificación
    }
});
exports.sendVerificationEmail = sendVerificationEmail;
