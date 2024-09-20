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
exports.uploadProfilePicture = void 0;
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const promises_1 = __importDefault(require("fs/promises"));
const authModel_1 = require("../../../middleware/models/authModel");
const errorMessages_1 = require("../../../middleware/erros/errorMessages");
const userProfileModel_1 = require("../profile/models/userProfileModel");
const successMessages_1 = require("../../../middleware/success/successMessages");
const storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads');
    },
    filename: function (req, file, cb) {
        console.log(file);
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});
const upload = (0, multer_1.default)({ storage: storage }).single('profilePicture');
const allowedImageExtensions = ['.jpg', '.jpeg', '.png', '.gif'];
const isImage = (filename) => {
    const ext = path_1.default.extname(filename).toLowerCase();
    return allowedImageExtensions.includes(ext);
};
const uploadProfilePicture = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        const user = yield authModel_1.AuthModel.findByPk(userId);
        if (!user) {
            return res.status(404).json({ msg: errorMessages_1.errorMessages.userNotFound });
        }
        return new Promise((resolve) => {
            upload(req, res, function (err) {
                return __awaiter(this, void 0, void 0, function* () {
                    if (err) {
                        console.error('Error al subir la imagen:', err);
                        return resolve(res.status(500).json({ msg: errorMessages_1.errorMessages.serverError }));
                    }
                    if (!req.file) {
                        return resolve(res.status(400).json({ msg: errorMessages_1.errorMessages.noFileUploaded }));
                    }
                    if (!isImage(req.file.filename)) {
                        yield promises_1.default.unlink(req.file.path);
                        return resolve(res.status(400).json({ msg: errorMessages_1.errorMessages.invalidImageFormat }));
                    }
                    const userProfile = yield userProfileModel_1.UserProfileModel.findOne({ where: { userId } });
                    if (userProfile) {
                        if (userProfile.profilePicture) {
                            const previousImagePath = path_1.default.resolve('uploads', userProfile.profilePicture);
                            try {
                                yield promises_1.default.access(previousImagePath);
                                yield promises_1.default.unlink(previousImagePath);
                                console.log('Imagen anterior eliminada correctamente');
                            }
                            catch (unlinkError) {
                                console.warn('La imagen anterior no existe o no se pudo eliminar:', errorMessages_1.errorMessages.unexpectedError);
                            }
                        }
                        userProfile.profilePicture = req.file.filename;
                        yield userProfile.save();
                        return resolve(res.json({ msg: successMessages_1.successMessages.profilePictureUploaded }));
                    }
                    else {
                        return resolve(res.status(404).json({ msg: errorMessages_1.errorMessages.userProfileNotFound }));
                    }
                });
            });
        });
    }
    catch (error) {
        console.error('Error al subir la imagen de perfil:', error);
        return res.status(500).json({ msg: errorMessages_1.errorMessages.serverError });
    }
});
exports.uploadProfilePicture = uploadProfilePicture;
exports.default = exports.uploadProfilePicture;
