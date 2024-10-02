import { errorMessages } from "../../../../../../../middleware/erros/errorMessages";

export const validateInputrRequestPassword= (usernameOrEmail: string): string[] => {
    const errors: string[] = [];
    if (!usernameOrEmail) {
        errors.push(errorMessages.requiredFields);
    }
    return errors;
};
