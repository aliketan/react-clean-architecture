import type { RESPONSE_STATUS } from "../utils/enums/ResponseStatus";

export interface IDataResult<T> { 
    status: RESPONSE_STATUS;
    exception: string;
    response: string;
    data: T[];
}
