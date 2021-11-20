import { vars } from "../vars";

export const Error = (message: string, code: number) => {
    return {
        message,
        code: code || vars.STATUS.NOT_FOUND,
    };
};
