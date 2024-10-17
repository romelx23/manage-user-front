import { IRoles } from "../../shared/types/roles";

export interface UsersResponse {
  ok: boolean;
  total: number;
  users: User[]; // Array of
}

export interface UserResponse {
  ok: boolean;
  msg: string;
  user: User;
}

export interface User {
  uid: string;
  name: string;
  role: IRoles;
  email: string;
  status: string;
}

export interface IResponseUser {
  docs: IUser[];
  totalDocs: number;
  limit: number;
  totalPages: number;
  page: number;
  pagingCounter: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  prevPage: null;
  nextPage: null;
}

export interface IUser {
  id: string;
  name: string;
  role: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
  loginAttempts: number;
}
