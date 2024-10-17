export interface ServicesResponse {
  ok: boolean;
  total: number;
  services: Service[]; // Array of
}

export interface ServiceResponse {
  ok: boolean;
  msg: string;
  service: Service;
}

export interface Service {
  uid: string;
  name: string;
  status: string;
}
