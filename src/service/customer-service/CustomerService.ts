import axios from "axios";
import {
  Customer,
  EnvConfig,
  PaginatedRequest,
  PaginatedResponse,
} from "../../types";
import { CreateCustomerResource, ICustomerService } from "./interface";

export class CustomerService implements ICustomerService {
  constructor(private env: EnvConfig) {}

  public async searchCustomer(
    request: PaginatedRequest
  ): Promise<PaginatedResponse<Customer>> {
    const url = `${this.env.baseUrl}/customer/search`;
    const params = {
      searchKey: request.params.searchKey,
      keyValue: request.params.searchTerm,
      pageSize: request.pageSize,
      pageNumber: request.pageNumber,
    };
    const response = await axios.get(url, {
      params,
      headers: {
        Authorization: this.env.token,
      },
    });
    return response.data.payload;
  }

  public async getAllCustomer(): Promise<Customer[]> {
    const url = `${this.env.baseUrl}/customer/all`;
    const response = await axios.get(url, {
      headers: {
        Authorization: this.env.token,
      },
    });
    return response.data.payload;
  }

  public async createCustomer(
    payload: CreateCustomerResource
  ): Promise<{ code: string; message: string }> {
    const url = `${this.env.baseUrl}/customer`;
    const response = await axios.post(url, payload, {
      headers: {
        Authorization: this.env.token,
      },
    });
    return response.data;
  }
}
