import Toastify from "../../shared/utils/alerts/Toastify";
import { RESPONSE_STATUS } from "../../shared/utils/enums/ResponseStatus";

export default function notificationService() { 

    return {
        success: (message: string) => {
           Toastify.Message({ message:message, type: RESPONSE_STATUS.SUCCESS });
        },
        error: (message: string) => {
            Toastify.Message({ message:message, type: RESPONSE_STATUS.ERROR });
        },
        warning: (message: string) => {
            Toastify.Message({ message:message, type: RESPONSE_STATUS.WARNING });
        },
        info: (message: string) => {
            Toastify.Message({ message:message, type: RESPONSE_STATUS.INFO });
        }
    }
}