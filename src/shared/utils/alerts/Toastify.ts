import { toast } from "react-toastify";
import type { IAlertType } from "../../types/IAlertType";
import { RESPONSE_STATUS } from "../enums/ResponseStatus";

const toastify = (param:IAlertType) => { 
    
    const options = { 
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
        theme: "colored",
    };

    switch (param.type) {
        case RESPONSE_STATUS.SUCCESS:
            toast.success(param.message, options);
            break;
        case RESPONSE_STATUS.ERROR:
            toast.error(param.message, options);
            break;
        case RESPONSE_STATUS.INFO:
            toast.info(param.message, options);
            break;
        case RESPONSE_STATUS.WARNING:
            toast.warning(param.message, options);
            break;
        default:
            toast(param.message, options);
    } 
}

export const Message = (param: IAlertType) => { 
    typeof param === "object" && param !== null && "message" in param && "type" in param ? toastify(param) : console.info("Invalid parameter for Message function");
}


export default {
    Message
};