import multer from 'multer';
import path from 'path';
import fs from 'fs';
// Función para garantizar que el directorio existe
const ensureDirectoryExistence = (dir: string) => {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
};

// Configuración de almacenamiento con multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const basePath = 'uploads/evidenciasDenuncias';
        let uploadPath;

        if (file.mimetype.startsWith('image/')) {
            uploadPath = path.join(basePath, 'imagenes');
        } else if (file.mimetype.startsWith('video/')) {
            uploadPath = path.join(basePath, 'videos');
        } else if (file.mimetype.startsWith('audio/')) {
            uploadPath = path.join(basePath, 'audios');
        } else {
            return cb(new Error('Tipo de archivo no permitido'), '');
        }

        ensureDirectoryExistence(uploadPath);
        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname); // Guarda el nombre original
    }
});

// Configuración de multer para manejar múltiples archivos
const upload = multer({
    storage: storage,
    limits: { fileSize: 10 * 1024 * 1024 } // Limitar el tamaño máximo de archivo a 10 MB
}).fields([
    { name: 'pruebas', maxCount: 5 },  // Para imágenes/videos
    { name: 'audio', maxCount: 3 }     // Para audios
]);

export default upload;