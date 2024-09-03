"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleServerErrorVerifyCode = void 0;
const errorMessages_1 = require("../../../../../../middleware/erros/errorMessages");
const handleServerErrorVerifyCode = (error, res) => {
    console.error("Error en el controlador VerifyCodePhone:", error);
    if (!res.headersSent) {
        res.status(400).json({
            msg: error.message || errorMessages_1.errorMessages.databaseError,
            error,
        });
        throw new Error("Controller VerifyCodePhone error");
    }
};
exports.handleServerErrorVerifyCode = handleServerErrorVerifyCode;
