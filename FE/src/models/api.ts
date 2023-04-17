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

export interface ProvType {
  name: string;
  state: string;
  codeVerifier: string;
  codeChallenge: string;
  codeChallengeMethod: string;
  authUrl: string;
}

export interface UserType {
  id: string;
  created: string;
  updated: string;
  email: string;
  verified: boolean;
  lastResetSentAt: string;
  lastVerificationSentAt: string;
  profile: Profile;
}

export interface Profile {
  id: string;
  created: string;
  updated: string;
  "@collectionId": string;
  "@collectionName": string;
  avatar: string;
  avatarUrl: string;
  name: string;
  userId: string;
  "@expand": {};
}
