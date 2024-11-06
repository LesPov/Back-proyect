// uploadConfig.ts (Configuración de multer)
import multer from 'multer';
import path from 'path';
import fs from 'fs';

/**
 * Asegura que el directorio exista antes de guardar el archivo.
 * @param dir - Directorio que se verificará o creará.
 */
const ensureDirectoryExistence = (dir: string) => {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
};

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const { tipo, subtipo } = req.body;
        console.log('req.body:', req.body); // Para verificar si `tipo` o `subtipo` se envían correctamente
    
        let uploadPath;
        if (tipo) {
            uploadPath = path.join('uploads/tipoDenuncias', tipo);
        } else if (subtipo) {
            uploadPath = path.join('uploads/subtipoDenuncias', subtipo);
        } 
         else {
            return cb(new Error("Tipo o subtipo de denuncia no especificado"), '');
        }
    
        ensureDirectoryExistence(uploadPath);
        cb(null, uploadPath);
    },
    filename: function (req, file, cb) {
        cb(null, `${file.originalname}`);
    }
});

// Configuración de multer para manejo de archivos
const upload = multer({ storage: storage }).single('flagImage');

export default upload;
