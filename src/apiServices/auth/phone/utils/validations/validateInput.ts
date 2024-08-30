import { errorMessages } from "../../../../../middleware/erros/errorMessages";

export const validateInput = (username: string, phoneNumber:boolean ): string[] => {
    const errors: string[] = [];
    if (!username || !phoneNumber ) {
        errors.push(errorMessages.requiredFields);
    }
    return errors;
};