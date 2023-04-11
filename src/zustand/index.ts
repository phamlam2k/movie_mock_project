import create from "zustand";
import { DataLoginInfo } from "../utils/zustand";

export const useDataLoginInfoStore = create<DataLoginInfo>((set) => ({
  accessToken: undefined,
  setAccessToken: (token: string) => set({ accessToken: token }),
}));
