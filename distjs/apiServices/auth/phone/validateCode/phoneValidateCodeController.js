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
exports.verifyPhoneNumber = void 0;
const handleInputValidationErrors_1 = require("../../register/utils/errors/handleInputValidationErrors");
const validateInput_1 = require("./utils/validations/validateInput");
const handleServerError_1 = require("./utils/errors/handleServerError");
const findUserByUsername_1 = require("../utils/findUser/findUserByUsername");
const handleUserNotFoundError_1 = require("../utils/errors/handleUserNotFoundError");
const checkUserVerificationStatus_1 = require("../utils/check/checkUserVerificationStatus");
const verifyPhoneNumber = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // 1. Validación de entrada
        const { username, phoneNumber, verificationCode } = req.body;
        const inputValidationErrors = (0, validateInput_1.validateInputVerifyCode)(username, phoneNumber, verificationCode);
        (0, handleInputValidationErrors_1.handleInputValidationErrors)(inputValidationErrors, res);
        // 2. Búsqueda del usuario
        const user = yield (0, findUserByUsername_1.findUserByUsername)(username);
        (0, handleUserNotFoundError_1.handleUserNotFoundError)(username, user, res);
        // 3. Verificación del estado del usuario Email
        const isEmailVerified = (0, checkUserVerificationStatus_1.checkUserVerificationStatusEmail)(user);
        (0, checkUserVerificationStatus_1.handleEmailNotVerificationErroruser)(isEmailVerified, res);
        // 4. Verificación del estado del usuario Phone
        // const isPhoneNumberVerified = checkUserVerificationStatusPhone(user);
        // handlePhoneNotVerificationErroruser(isPhoneNumberVerified, res);
    }
    catch (error) {
        // Manejar errores generales del servidor y responder con un mensaje de error
        (0, handleServerError_1.handleServerErrorVerifyCode)(error, res);
    }
});
exports.verifyPhoneNumber = verifyPhoneNumber;
