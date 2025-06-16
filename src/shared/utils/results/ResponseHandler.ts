import { RESPONSE_STATUS } from "../enums/ResponseStatus";
import type { IApiResponseType } from "../../types/IApiResponseType";

/**
 * Centralized response handler for API requests
 * @param {Object} response - The API response object
 * @param {Function} onSuccess - Callback function for success
 * @param {Function} onError - Callback function for error
 */
export function handleApiResponse(response: IApiResponseType, onSuccess: Function, onError:Function, onFinally?: Function) {
  switch (response.status) {
    case RESPONSE_STATUS.SUCCESS:
      if (onSuccess) onSuccess(response.response); // Call success callback if provided
      break;
    case RESPONSE_STATUS.ERROR:
      console.error("API Error:", response.response);
      if (onError) onError(response);
      break;
    case RESPONSE_STATUS.UNAUTHORIZED:
      console.error("Unauthorized access:", response.response);
      if (onError) onError(response);
      break;

    case RESPONSE_STATUS.FORBIDDEN:
      console.error("Forbidden access:", response.response);
      if (onError) onError(response);
      break;
    default:
      console.error("Unknown status:", response.status, response.response);
      if (onError) onError(response);
  }

  if(onFinally) {
    onFinally(response);
  }
}