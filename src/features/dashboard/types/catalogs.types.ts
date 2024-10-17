export interface CatalogsResponse {
  ok: boolean;
  total: number;
  incidents: Incident[]; // Array of
}

export interface IncidentResponse {
  ok: boolean;
  msg: string;
  incident: Incident;
}

export interface IFileIncident {
  name: string;
  url: string;
  file_id: string;
  type: string;
  id: string;
}

export interface Incident {
  uid: string;
  title: string;
  description: string;
  category: {
    _id: string;
    name: string;
  };
  area: {
    _id: string;
    name: string;
  };
  service: {
    _id: string;
    name: string;
  };
  state: string;
  priority: string;
  dateRegister: string;
  dateAttention: string;
  dateEnd: string;
  files: IFileIncident[];
  user: {
    _id: string;
    name: string;
  };
}

export interface IResponseCatalog {
  docs: ICatalog[];
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

export interface ICatalog {
  id: string;
  nameItem: string;
  price: number;
  createdAt: Date;
  updatedAt: Date;
}
