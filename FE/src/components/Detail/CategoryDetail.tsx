import { useNavigate, useParams } from "react-router-dom";
import { PrivateLayout } from "../../layouts/PrivateLayout";
import { pb } from "../../lib/pocketbase";
import { CategoryListData, MovieListData } from "../../models/api";
import { QUERY_KEYS } from "../../models/key";
import { getCategoryData, getMovieData } from "../../utils/api";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import style from "./style.module.css";

export const CategoryDetailScreen = () => {
  const navigate = useNavigate();
  const param = useParams();
  const queryClient = useQueryClient();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { data: categoryDetail } = useQuery(
    [QUERY_KEYS.CATEGORY_DETAIL, param.id],
    async () => {
      const response = (await getCategoryData({
        id: `${param.id}`,
        accessToken: pb.authStore.token,
      })) as CategoryListData;
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
          Category Id:
        </label>
        <p className={style.label_content}>{categoryDetail?.id}</p>
        <label className={style.container} htmlFor="">
          Category Name:
        </label>
        <p className={style.label_content}>{categoryDetail?.name}</p>
        <label className={style.container} htmlFor="">
          Create At:
        </label>
        <p className={style.label_content}>{categoryDetail?.created}</p>
        <label className={style.container} htmlFor="">
          Update At:
        </label>
        <p className={style.label_content}>{categoryDetail?.updated}</p>
      </div>
    </PrivateLayout>
  );
};
