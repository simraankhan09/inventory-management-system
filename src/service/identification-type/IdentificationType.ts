import axios from "axios";
import { EnvConfig } from "../../types";

export class IdentificationTypeService {
  constructor(private env: EnvConfig) {}

  public async getAllIdentificationTypes(): Promise<
    {
      id: number;
      name: string;
    }[]
  > {
    const url = `${this.env.baseUrl}/identification-type/all`;
    const response = await axios.get(url, {
      headers: {
        Authorization: this.env.token,
      },
    });
    return response.data.payload;
  }
}
