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
exports.resetPassword = void 0;
const resetPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // 1. Extraer y validar los datos de entrada
        const { usernameOrEmail, randomPassword, newPassword } = req.body;
    }
    catch (error) {
        // 7. Manejo de errores de servidor
        // handleServerErrorresetPassword(error, res);
    }
});
exports.resetPassword = resetPassword;
