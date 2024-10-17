export interface AreasResponse {
  ok: boolean;
  total: number;
  areas: Area[]; // Array of
}

export interface AreaResponse {
  ok: boolean;
  msg: string;
  area: Area;
}

export interface Area {
  uid: string;
  name: string;
  status: string;
}

export interface IResponseAmbient {
  docs: IAmbient[];
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

export interface IAmbient {
  id: string;
  dayRegister: Date;
  quantity: number;
  createdAt: Date;
  updatedAt: Date;
}
