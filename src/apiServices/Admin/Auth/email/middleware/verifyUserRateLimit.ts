import rateLimit from 'express-rate-limit';

// Definir el middleware de limitación de tasa
const verifyUserRateLimit = rateLimit({
    windowMs: 3 * 60 * 1000, // 15 minutos
    max: 5, // Limita a 5 solicitudes por cada 15 minutos
    message: 'Has excedido el número máximo de solicitudes. Por favor, inténtalo de nuevo más tarde.',
    headers: true, // Incluye información sobre la tasa de limitación en los headers de respuesta
});

export default verifyUserRateLimit;
