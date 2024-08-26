"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateRandomVerificationCode = void 0;
const generateRandomVerificationCode = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
};
exports.generateRandomVerificationCode = generateRandomVerificationCode;
