export type User = {
  id: number;
  email: string;
  status: string;
  role: UserRole;
  createdDate: string;
  storeId: number | null;
};

export type EnvConfig = {
  baseUrl: string;
  token: string;
};

export type APIResponse = {
  code: string;
  message: string;
  payload: any;
};

export type UserRole = "ADMIN" | "USER";

export type Customer = {
  id: number;
  first_name: string;
  last_name: string;
  common_address_id: number;
  telephone_no?: string;
  date_of_birth?: string;
  customer_ref_code: string;
  identification_id: number;
  userId: number;
};

export type PaginatedRequest = {
  params: {
    searchKey: string;
    searchTerm: string;
  };
  pageSize: number;
  pageNumber: number;
};

export interface PaginatedResponse<T> {
  content: T[];
  total: number;
  current: number;
  size: number;
}

export type CommonAddressType = {
  buildingNo: number;
  street: string;
  city: string;
  postalCode: number;
};
