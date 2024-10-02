"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handleInputValidationErrors_1 = require("../../../utils/errors/handleInputValidationErrors");
describe('handleInputValidationErrors', () => {
    it('should send a 400 response with error details and throw an error if there are validation errors', () => {
        // Mocks
        const mockRes = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
        const errors = ['Some error'];
        // Expect the response to have status 400 and json method to be called with the correct object
        expect(() => (0, handleInputValidationErrors_1.handleInputValidationErrors)(errors, mockRes)).toThrow("Input validation failed");
        expect(mockRes.status).toHaveBeenCalledWith(400);
        expect(mockRes.json).toHaveBeenCalledWith({
            msg: errors,
            errors: `Error en la validación de la entrada de datos`,
        });
    });
    it('should not throw an error if there are no validation errors', () => {
        const mockRes = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
        // Should not throw an error
        expect(() => (0, handleInputValidationErrors_1.handleInputValidationErrors)([], mockRes)).not.toThrow();
    });
});
