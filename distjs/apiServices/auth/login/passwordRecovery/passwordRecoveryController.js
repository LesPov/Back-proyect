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
exports.requestPasswordReset = void 0;
const handleServerError_1 = require("./utils/errors/handleServerError");
const handleInputValidationErrors_1 = require("../../register/utils/errors/handleInputValidationErrors");
const resentValidation_1 = require("./utils/validations/resentValidation");
const findUserPasswordReset_1 = require("./utils/findUser/findUserPasswordReset");
const findUserByUsernameLogin_1 = require("../utils/findUser/findUserByUsernameLogin");
const requestPasswordReset = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // 1. Extraer y validar los datos de entrada
        const { usernameOrEmail } = req.body;
        const inputValidationErrors = (0, resentValidation_1.validateInputPasswordReset)(usernameOrEmail);
        (0, handleInputValidationErrors_1.handleInputValidationErrors)(inputValidationErrors, res);
        // 2. Búsqueda del usuario
        const user = yield (0, findUserPasswordReset_1.findUserPasswordReset)(usernameOrEmail);
        if (!user) {
            (0, findUserByUsernameLogin_1.handleUserNotFoundErrorLogin)(usernameOrEmail, user, res);
            return;
        }
    }
    catch (error) {
        // 7. Manejo de errores de servidor
        (0, handleServerError_1.handleServerErrorPasswordReset)(error, res);
    }
});
exports.requestPasswordReset = requestPasswordReset;
