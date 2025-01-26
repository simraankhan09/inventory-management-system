import { AxiosError } from "axios";
import { APIResponse } from "../types";

export const getApiErrorMessage = (error: AxiosError<APIResponse>) => {
  let message = "Something went wrong, please try again";
  const payload = error.response?.data.payload;
  if (Array.isArray(payload) && payload.length) {
    message = payload[0];
  } else if (error.response?.data.message) {
    message = error.response?.data.message;
  }

  return message;
};
