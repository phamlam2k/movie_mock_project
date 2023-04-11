export interface MovieListDataResponse {
  page: number;
  perPage: number;
  totalPages: number;
  totalItems: number;
  items: MovieListData[];
}

export interface MovieListDataResponseError {
  success: boolean;
  data: null;
  message: string;
}

export interface MovieListData {
  id: string;
  collectionId: string;
  collectionName: string;
  created: string;
  updated: string;
  name: string;
}
