import { errorMessages } from "../../../../../../../middleware/erros/errorMessages";
import { validateInput } from "../../../utils/validations/registerValidations";

describe('validateInput', () => {
  it('should return an error if username is empty', () => {
    const errors = validateInput('', 'password', 'email@example.com', 'user');
    expect(errors).toContain(errorMessages.requiredFields); // Usa el mensaje de error actual
  });
});
