import { useState } from "react";
import { pb } from "../lib/pocketbase";

export const isLogin = pb.authStore.isValid;
export default function useLogin() {
  const [isLoading, setLoading] = useState<boolean>(false);
  const login = async (data: any) => {
    setLoading;
    try {
      const authData = await pb
        .collection("users")
        .authWithPassword(data.username, data.password);
    } catch (error) {
      console.log(error);
    }
  };
}
