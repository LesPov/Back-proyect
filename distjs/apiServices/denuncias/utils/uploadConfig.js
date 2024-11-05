"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// uploadConfig.ts (Configuración de multer)
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
/**
 * Asegura que el directorio exista antes de guardar el archivo.
 * @param dir - Directorio que se verificará o creará.
 */
const ensureDirectoryExistence = (dir) => {
    if (!fs_1.default.existsSync(dir)) {
        fs_1.default.mkdirSync(dir, { recursive: true });
    }
};
const storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        const { tipo, subtipo } = req.body;
        console.log('req.body:', req.body); // Para verificar si `tipo` o `subtipo` se envían correctamente
        let uploadPath;
        if (tipo) {
            uploadPath = path_1.default.join('uploads/tipoDenuncias', tipo);
        }
        else if (subtipo) {
            uploadPath = path_1.default.join('uploads/subtipoDenuncias', subtipo);
        }
        else {
            return cb(new Error("Tipo o subtipo de denuncia no especificado"), '');
        }
        ensureDirectoryExistence(uploadPath);
        cb(null, uploadPath);
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});
// Configuración de multer para manejo de archivos
const upload = (0, multer_1.default)({ storage: storage }).single('flagImage');
exports.default = upload;
