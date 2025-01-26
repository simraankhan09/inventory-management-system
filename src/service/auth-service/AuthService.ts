import axios from "axios";
import { APIResponse, EnvConfig } from "../../types";

export class AuthService {
  constructor(private env: EnvConfig) {}

  public async signUp(email: string, password: string): Promise<APIResponse> {
    const url = `${this.env.baseUrl}/user/sign-up`;
    const response = await axios.post(url, { email, password });
    return response.data;
  }

  public async signIn(email: string, password: string): Promise<APIResponse> {
    const url = `${this.env.baseUrl}/user/sign-in`;
    const response = await axios.post(url, { email, password });
    return response.data;
  }

  public async getUserDetails(): Promise<APIResponse> {
    const url = `${this.env.baseUrl}/user/user-details`;
    const response = await axios.get(url, {
      headers: {
        Authorization: this.env.token,
      },
    });
    return response.data;
  }
}
