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
exports.updatePasswordInDatabase = void 0;
// Nueva función que guarda la contraseña en la base de datos
const authModel_1 = require("../../../../../../../middleware/models/authModel"); // Asegúrate de que la ruta sea correcta
const errorMessages_1 = require("../../../../../../../middleware/erros/errorMessages");
const updatePasswordInDatabase = (userId, hashedPassword) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Actualiza la contraseña en la base de datos para el usuario correspondiente
        return yield authModel_1.AuthModel.update({ password: hashedPassword }, {
            where: { id: userId }
        });
    }
    catch (error) {
        // Manejar errores al interactuar con la base de datos
        console.error('Error al actualizar la contraseña:', error);
        throw new Error(errorMessages_1.errorMessages.databaseError);
    }
});
exports.updatePasswordInDatabase = updatePasswordInDatabase;
