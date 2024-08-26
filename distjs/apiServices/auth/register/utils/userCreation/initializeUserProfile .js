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
exports.initializeUserProfile = void 0;
const userProfileModel_1 = require("../../../profile/models/userProfileModel");
/**
 * Inicializar el perfil de usuario.
 * @param userId - ID del usuario para el cual se inicializará el perfil.
 */
const initializeUserProfile = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    yield userProfileModel_1.UserProfileModel.create({
        userId: userId,
        firstName: '',
        lastName: '',
    });
});
exports.initializeUserProfile = initializeUserProfile;
