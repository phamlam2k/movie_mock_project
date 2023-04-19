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
  { id: 2, name: "Actor", path: "/actor" },
  { id: 3, name: "Category", path: "/category" },
  { id: 4, name: "Movie", path: "/movie" },
  { id: 5, name: "User", path: "/user" },
];
