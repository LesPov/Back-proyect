"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleServerError = void 0;
const errorMessages_1 = require("../../../../../../middleware/erros/errorMessages");
const handleServerError = (error, res) => {
    console.error("Error en el controlador forward email:", error);
    if (!res.headersSent) {
        res.status(400).json({
            msg: error.message || errorMessages_1.errorMessages.databaseError,
            error,
        });
        throw new Error("Controller ForwardEmail error");
    }
};
exports.handleServerError = handleServerError;
