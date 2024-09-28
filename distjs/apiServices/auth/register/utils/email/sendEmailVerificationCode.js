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
        // Personaliza la plantilla
        const personalizedEmail = emailTemplate
            .replace('{{ username }}', username)
            .replace('{{ verificationCode }}', verificationCode);
        // Configura el transporte de Nodemailer
        const transporter = nodemailer_1.default.createTransport({
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
        setImmediate(() => __awaiter(void 0, void 0, void 0, function* () {
            try {
                yield transporter.sendMail(mailOptions);
                console.log('Correo de verificación enviado a:', email);
            }
            catch (error) {
                console.error('Error al enviar el correo de verificación:', error);
            }
        }));
        // Devuelve inmediatamente el éxito sin esperar al envío del correo
        return true;
    }
    catch (error) {
        console.error('Error al procesar el envío del correo:', error);
        return false;
    }
});
exports.sendVerificationEmail = sendVerificationEmail;
