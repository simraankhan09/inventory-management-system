import { EnvConfig } from "../types";
import { AuthService } from "./auth-service/AuthService";

export class ServiceFactory {
  private static instance: ServiceFactory;
  private static env: EnvConfig;

  private constructor() {}

  public static getInstance(env: EnvConfig) {
    ServiceFactory.env = env;
    if (!ServiceFactory.instance) {
      ServiceFactory.instance = new ServiceFactory();
    }
    return ServiceFactory.instance;
  }

  public getAuthService() {
    return new AuthService(ServiceFactory.env);
  }
}
