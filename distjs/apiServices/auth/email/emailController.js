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
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyUser = void 0;
const findUserByUsername_1 = require("./utils/findUser/findUserByUsername");
const handleUserNotFoundError_1 = require("./utils/errors/handleUserNotFoundError");
const checkVerificationCodeExpiration_1 = require("./utils/check/checkVerificationCodeExpiration ");
const verifyUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, verificationCode } = req.body;
        //Busca un usuario en la base de datos basado en su nombre de usuario.
        const user = yield (0, findUserByUsername_1.findUserByUsername)(username);
        // Maneja el error si el usuario no existe
        (0, handleUserNotFoundError_1.handleUserNotFoundError)(username, user, res);
        const currentDate = new Date();
        yield (0, checkVerificationCodeExpiration_1.checkVerificationCodeExpiration)(user, currentDate);
    }
    catch (error) {
    }
});
exports.verifyUser = verifyUser;
