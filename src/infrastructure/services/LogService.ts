
import { Env } from "../../shared/constants/Environment";

export default function logService() {

    return {
        debug: (message:string) => Env.isDevMode ? console.debug("DEBUG:", message) : null,
        info: (message:string) => Env.isDevMode ? console.info("INFO:", message) : null,   
        warning: (message:string) => Env.isDevMode ? console.warn("WARNING:", message) : null,
        error: (message:string, error:string = "") => Env.isDevMode ? console.error("ERROR", message, error) : null
    };
};