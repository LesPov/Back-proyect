"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const validateToken_1 = __importDefault(require("../../../middleware/validateToken/validateToken"));
const imagesController_1 = __importDefault(require("./imagesController"));
const express_1 = require("express");
const images = (0, express_1.Router)();
// Ruta para subir la imagen de perfil
images.post('/profile/:userId/upload-picture', validateToken_1.default, (req, res) => {
    (0, imagesController_1.default)(req, res);
});
exports.default = images;
