"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateInputrRequestPassword = void 0;
const errorMessages_1 = require("../../../../../../../middleware/erros/errorMessages");
const validateInputrRequestPassword = (usernameOrEmail) => {
    const errors = [];
    if (!usernameOrEmail) {
        errors.push(errorMessages_1.errorMessages.requiredFields);
    }
    return errors;
};
exports.validateInputrRequestPassword = validateInputrRequestPassword;
