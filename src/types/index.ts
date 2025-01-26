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
