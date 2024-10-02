"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateInputVerifyCode = void 0;
const errorMessages_1 = require("../../../../../../../middleware/erros/errorMessages");
const validateInputVerifyCode = (username, phoneNumber, verificationCode) => {
    const errors = [];
    if (!username || !phoneNumber || !verificationCode) {
        errors.push(errorMessages_1.errorMessages.requiredFields);
    }
    return errors;
};
exports.validateInputVerifyCode = validateInputVerifyCode;
