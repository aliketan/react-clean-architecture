export const RESPONSE_STATUS = {
    SUCCESS: "Success",
    ERROR: "Error",
    WARNING: "Warning",
    INFO: "Information",
    LOADING: "Loading",
    NOT_FOUND: "Not Found",
    UNAUTHORIZED: "Unauthorized",
    FORBIDDEN: "Forbidden",
    SERVER_ERROR: "Server Error",
    TIMEOUT: "Timeout",
    BAD_REQUEST: "Bad Request",
    CONFLICT: "Conflict"
};

export type RESPONSE_STATUS = typeof RESPONSE_STATUS[keyof typeof RESPONSE_STATUS];