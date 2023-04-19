import { useNavigate, useParams } from "react-router-dom";
import { PrivateLayout } from "../../layouts/PrivateLayout";
import { pb } from "../../lib/pocketbase";
import {
  ActorListData,
  CategoryListData,
  MovieListData,
} from "../../models/api";
import { QUERY_KEYS } from "../../models/key";
import { getActorData, getCategoryData, getMovieData } from "../../utils/api";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import style from "./style.module.css";

export const ActorDetailScreen = () => {
  const navigate = useNavigate();
  const param = useParams();
  const queryClient = useQueryClient();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { data: actorDetail } = useQuery(
    [QUERY_KEYS.ACTOR_DETAIL, param.id],
    async () => {
      const response = (await getActorData({
        id: `${param.id}`,
        accessToken: pb.authStore.token,
      })) as ActorListData;
      return response;
    },
    {
      refetchInterval: false,
      refetchOnWindowFocus: false,
    }
  );
  return (
    <PrivateLayout>
      <div className={style.container}>
        <label className={style.detail_label} htmlFor="">
          Actor Id:
        </label>
        <p className={style.label_content}>{actorDetail?.id}</p>
        <label className={style.container} htmlFor="">
          Actor Name:
        </label>
        <p className={style.label_content}>{actorDetail?.name}</p>
        <label className={style.container} htmlFor="">
          Actor Avatar:
        </label>
        <p className={style.label_content}>{actorDetail?.avatar}</p>
        <label className={style.container} htmlFor="">
          Create At:
        </label>
        <p className={style.label_content}>{actorDetail?.created}</p>
        <label className={style.container} htmlFor="">
          Update At:
        </label>
        <p className={style.label_content}>{actorDetail?.updated}</p>
      </div>
    </PrivateLayout>
  );
};
