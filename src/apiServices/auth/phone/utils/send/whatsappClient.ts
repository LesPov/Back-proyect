// import { Client, LocalAuth } from 'whatsapp-web.js';
// import qrcode from 'qrcode-terminal';

// export const client = new Client({
//     authStrategy: new LocalAuth(),
// });

// // Evento que genera el código QR
// client.on('qr', (qr) => {
//     qrcode.generate(qr, { small: true });
//     console.log('QR code generated. Scan it with WhatsApp.');
// });

// // Evento que indica que el cliente está listo
// client.on('ready', () => {
//     console.log('WhatsApp Web client is ready!');
// });

// // Inicializar el cliente de WhatsApp
// export const initializeWhatsAppClient = async (): Promise<void> => {
//     return new Promise((resolve, reject) => {
//         client.initialize();

//         client.on('ready', () => {
//             resolve();
//         });

//         client.on('auth_failure', (msg) => {
//             console.error('AUTHENTICATION FAILURE', msg);
//             reject(new Error('Authentication failed'));
//         });

//         client.on('disconnected', (reason) => {
//             console.log('Client was logged out', reason);
//             reject(new Error('Client disconnected'));
//         });
//     });
// };
