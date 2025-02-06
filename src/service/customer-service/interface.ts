import {
  CommonAddressType,
  Customer,
  PaginatedRequest,
  PaginatedResponse,
} from "../../types";

export interface ICustomerService {
  searchCustomer(
    request: PaginatedRequest
  ): Promise<PaginatedResponse<Customer>>;
  getAllCustomer(): Promise<Customer[]>;
  createCustomer(
    payload: CreateCustomerResource
  ): Promise<{ code: string; message: string }>;
}

export interface CreateCustomerResource {
  firstName: string;
  lastName: string;
  address: CommonAddressType;
  telephone?: string;
  dateOfBirth?: string;
  identificationNo: string;
  identificationTypeId: number;
}
