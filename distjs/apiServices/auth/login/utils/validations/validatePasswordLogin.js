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
exports.validatePassword = exports.validateStoredPassword = exports.validateRandomPassword = void 0;
// validateRandomPassword.ts
const validateRandomPassword = (user, randomPassword) => __awaiter(void 0, void 0, void 0, function* () {
    return randomPassword === user.verification.randomPassword;
});
exports.validateRandomPassword = validateRandomPassword;
// validateStoredPassword.ts
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const validateStoredPassword = (user, storedPassword) => __awaiter(void 0, void 0, void 0, function* () {
    return yield bcryptjs_1.default.compare(storedPassword, user.password);
});
exports.validateStoredPassword = validateStoredPassword;
// validatePassword.ts
const validatePassword = (user, password) => __awaiter(void 0, void 0, void 0, function* () {
    // Si la longitud de la contraseña es de 8 caracteres, se trata de una contraseña aleatoria
    if (password.length === 8) {
        return yield (0, exports.validateRandomPassword)(user, password);
    }
    else {
        return yield (0, exports.validateStoredPassword)(user, password);
    }
});
exports.validatePassword = validatePassword;
