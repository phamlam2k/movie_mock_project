import { useQueryClient } from "@tanstack/react-query";
import { useNavigate, useSearchParams } from "react-router-dom";
import { pb } from "../../lib/pocketbase";
import { useEffect, useState } from "react";

export const Redirect = () => {
  const [loading, setLoading] = useState(true);
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const code = searchParams.get("code") as string;
  const local_prov = JSON.parse(localStorage.getItem("provider") as string);
  let redirectUrl = "http://localhost:3000/login/redirect";

  useEffect(() => {
    if (local_prov.state !== searchParams.get("state")) {
      let url = "http://localhost:3000/login";
      if (typeof window !== "undefined") {
        window.location.href = url;
      }
    } else {
      pb.collection("users")
        .authWithOAuth2(
          local_prov.name,
          code,
          local_prov.codeVerifier,
          redirectUrl
        )
        .then((response) => {
          // cần thêm update user
          pb.collection("users").update(response.record.profile?.id as string, {
            name: response.record.name,
          });
          setLoading(false);
          console.log("client modal after logg   == ", pb.authStore.model);
          queryClient.setQueryData(["user"], pb.authStore.model);
          navigate("/");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  return <div>{loading && <div>loading user...</div>}</div>;
};
