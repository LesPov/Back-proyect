"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateInput = void 0;
const errorMessages_1 = require("../../../../../../middleware/erros/errorMessages");
const validateInput = (username, phoneNumber) => {
    const errors = [];
    if (!username || !phoneNumber) {
        errors.push(errorMessages_1.errorMessages.requiredFields);
    }
    return errors;
};
exports.validateInput = validateInput;
