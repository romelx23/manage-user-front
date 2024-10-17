import { IRoles } from "../../shared/types/roles";

export interface ResponseRegister {
  ok: boolean;
  user: IUser;
  token: string;
}

export interface ResponseLogin {
  ok: boolean;
  user: IUser;
  token: string;
}

export interface ResponseRenew {
  ok: boolean;
  user: IUser;
  refreshedToken: string;
}

export interface IUser {
  role: IRoles;
  status: boolean;
  google: boolean;
  name: string;
  email: string;
  uid: string;
}
