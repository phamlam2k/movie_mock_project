import { useNavigate, useParams } from "react-router-dom";
import { PrivateLayout } from "../../layouts/PrivateLayout";
import { pb } from "../../lib/pocketbase";
import { MovieListData } from "../../models/api";
import { QUERY_KEYS } from "../../models/key";
import { getMovieData } from "../../utils/api";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

export const MovieDetailScreen = () => {
  const navigate = useNavigate();
  const param = useParams();
  const queryClient = useQueryClient();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { data: movieDetail } = useQuery(
    [QUERY_KEYS.MOVIE_DETAIL, param.id],
    async () => {
      const response = (await getMovieData({
        id: `${param.id}`,
        accessToken: pb.authStore.token,
      })) as MovieListData;
      return response;
    },
    {
      refetchInterval: false,
      refetchOnWindowFocus: false,
    }
  );
  return (
    <PrivateLayout>
      <div>
        <label htmlFor="">Movie Id:</label>
        <p>{movieDetail?.id}</p>
        <label htmlFor="">Movie Name:</label>
        <p>{movieDetail?.name}</p>
        <label htmlFor="">Create At:</label>
        <p>{movieDetail?.created}</p>
        <label htmlFor="">Update At:</label>
        <p>{movieDetail?.updated}</p>
      </div>
    </PrivateLayout>
  );
};
