"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errorMessages_1 = require("../../../../../../middleware/erros/errorMessages");
const registerValidations_1 = require("../../../utils/validations/registerValidations");
describe('validateInput', () => {
    it('should return an error if username is empty', () => {
        const errors = (0, registerValidations_1.validateInput)('', 'password', 'email@example.com', 'user');
        expect(errors).toContain(errorMessages_1.errorMessages.requiredFields); // Usa el mensaje de error actual
    });
});
