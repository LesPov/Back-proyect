"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
// Función para garantizar que el directorio existe
const ensureDirectoryExistence = (dir) => {
    if (!fs_1.default.existsSync(dir)) {
        fs_1.default.mkdirSync(dir, { recursive: true });
    }
};
// Configuración de almacenamiento con multer
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        const basePath = 'uploads/evidenciasDenuncias';
        let uploadPath;
        if (file.mimetype.startsWith('image/')) {
            uploadPath = path_1.default.join(basePath, 'imagenes');
        }
        else if (file.mimetype.startsWith('video/')) {
            uploadPath = path_1.default.join(basePath, 'videos');
        }
        else if (file.mimetype.startsWith('audio/')) {
            uploadPath = path_1.default.join(basePath, 'audios');
        }
        else {
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
const upload = (0, multer_1.default)({
    storage: storage,
    limits: { fileSize: 10 * 1024 * 1024 } // Limitar el tamaño máximo de archivo a 10 MB
}).fields([
    { name: 'pruebas', maxCount: 5 }, // Para imágenes/videos
    { name: 'audio', maxCount: 3 } // Para audios
]);
exports.default = upload;
