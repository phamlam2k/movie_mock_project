import { useState } from "react";
import { pb } from "../lib/pocketbase";

export default function useLogin() {
  const [isLoading, setLoading] = useState<boolean>(false);
  const login = async ({
    username,
    password,
  }: {
    username: string;
    password: string;
  }) => {
    setLoading(true);
    try {
      const authData = await pb
        .collection("users")
        .authWithPassword(username, password);
    } catch (e) {
      alert(e);
    }
    setLoading(false);
  };
  //return (Login, isLoading)
}
