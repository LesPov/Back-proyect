import whatsappClient from '../../../../chatbot/client';

// Función para enviar mensaje de WhatsApp
export const sendWhatsAppMessage = async (phoneNumber: string, message: string): Promise<void> => {
    try {
        // Asegúrate de que el número de teléfono esté en el formato correcto
        const formattedNumber = `${phoneNumber.replace(/[-+()\s]/g, '')}@c.us`; // Formato internacional de WhatsApp ID


        // Enviar el mensaje
        await whatsappClient.sendMessage(formattedNumber, message);

        console.log('Mensaje enviado con éxito a:', phoneNumber);
    } catch (error) {
        console.error('Error al enviar mensaje por WhatsApp:', error);
        throw new Error('Failed to send WhatsApp message');
    }
};
