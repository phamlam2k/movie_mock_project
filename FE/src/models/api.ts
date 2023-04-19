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
  description: string;
  actor: ActorListData[];
  poster: string;
  category: CategoryListData[];
}

export interface CategoryListDataResponse {
  page: number;
  perPage: number;
  totalPages: number;
  totalItems: number;
  items: CategoryListData[];
}
export interface CategoryListData {
  id: string;
  collectionId: string;
  collectionName: string;
  created: string;
  updated: string;
  name: string;
}

export interface ActorListDataResponse {
  page: number;
  perPage: number;
  totalPages: number;
  totalItems: number;
  items: ActorListData[];
}
export interface ActorListData {
  id: string;
  collectionId: string;
  collectionName: string;
  created: string;
  updated: string;
  name: string;
  avatar: string;
}

export interface ProvType {
  name: string;
  state: string;
  codeVerifier: string;
  codeChallenge: string;
  codeChallengeMethod: string;
  authUrl: string;
}
