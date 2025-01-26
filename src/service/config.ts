import { EnvConfig } from "../types";

export let env: EnvConfig = {
  baseUrl: import.meta.env.VITE_SERVICE_BASE_URL,
  token: "",
};
