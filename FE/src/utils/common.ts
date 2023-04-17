export {};

export enum SEARCHPARAMS {
  PAGE = "page",
  LIMIT = "limit",
  KEYWORD = "keyword",
}

export interface MenuSidebar {
  id: number;
  name: string;
  path: string;
}

export const MENU_SIDEBAR = [
  { id: 1, name: "Home", path: "/" },
  { id: 4, name: "Category", path: "/category" },
  { id: 2, name: "Movie", path: "/movie" },
  { id: 3, name: "User", path: "/user" },
  { id: 4, name: "Company", path: "/company" },
  { id: 5, name: "Genre", path: "/genre" },
];
