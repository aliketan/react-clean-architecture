import type { RESPONSE_STATUS } from "../utils/enums/ResponseStatus";

export interface IAlertType { 
    message:string,
    type: RESPONSE_STATUS
}