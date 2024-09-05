"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleServerErrorResendCode = void 0;
const errorMessages_1 = require("../../../../../../middleware/erros/errorMessages");
const handleServerErrorResendCode = (error, res) => {
    console.error("Error en el controlador ResendCodePhone:", error);
    if (!res.headersSent) {
        res.status(400).json({
            msg: error.message || errorMessages_1.errorMessages.databaseError,
            error,
        });
        throw new Error("Controller ResendCodePhone error");
    }
};
exports.handleServerErrorResendCode = handleServerErrorResendCode;
