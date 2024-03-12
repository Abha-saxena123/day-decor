import axios, { AxiosResponse, AxiosError } from "axios";
import { BASE_URL } from "../constants/api.constant";
import {
  ErrorMessageConstants,
  ErrorReferenceConstants,
} from "../constants/error.constants";

(function setAxiosSetup(): void {
  if (axios.defaults.baseURL !== BASE_URL) {
    axios.defaults.baseURL = BASE_URL;
    axios.interceptors.response.use(
      (response: AxiosResponse) => response,

      (error: AxiosError) => {
        let errorToSend;

        if (error.response) {
          errorToSend = error.response;
        } else {
          errorToSend = error;
        }

        errorToSend = handleError(errorToSend as any);

        throw Error(errorToSend);
      }
    );
  }
})();

export function handleError({
  data,
  message,
  status,
}: {
  data?: any;
  message?: string;
  status?: number;
}): string {
  let messageData = "";

  if (status && status === 401) {
    return messageData;
  }

  if (data && data.message) {
    // To accommodate ace error handler response
    if (typeof data.message === "string") {
      messageData = data.message;
    } else if (data.message.error) {
      messageData = data.message.error;
    } else if (data.message.match(ErrorReferenceConstants.ECONNREFUSED)) {
      messageData = ErrorMessageConstants.COULD_NOT_LOAD_DETAILS;
    } else {
      messageData = ErrorMessageConstants.COMMON_MESSAGE;
    }
  } else if (message) {
    if (
      message.match(ErrorReferenceConstants.NETWORK_ERROR) ||
      message.match(ErrorReferenceConstants.ERR_NAME_NOT_RESOLVED)
    ) {
      messageData = ErrorMessageConstants.COULD_NOT_LOAD_DETAILS;
    }
  } else {
    messageData = ErrorMessageConstants.DONT_KNOW_WHAT_HAPPENED;
  }

  return messageData;
}
