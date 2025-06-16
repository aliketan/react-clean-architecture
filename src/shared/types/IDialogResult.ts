import type { RESPONSE_STATUS } from "../utils/enums/ResponseStatus";

export interface IDialogResult { 
    status: RESPONSE_STATUS;
    response: string;
}