"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateInputresetPassword = void 0;
const errorMessages_1 = require("../../../../../../middleware/erros/errorMessages");
const validateInputresetPassword = (usernameOrEmail, randomPassword, newPassword) => {
    const errors = [];
    if (!usernameOrEmail || !randomPassword || !newPassword) {
        errors.push(errorMessages_1.errorMessages.requiredFields);
    }
    return errors;
};
exports.validateInputresetPassword = validateInputresetPassword;
