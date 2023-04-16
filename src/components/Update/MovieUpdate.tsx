import { Button, Form, Input } from "antd";
import { PrivateLayout } from "../../layouts/PrivateLayout";
import style from "./style.module.css";
import { pb } from "../../lib/pocketbase";
import { MovieListData } from "../../models/api";
import { getMovieData, updateMovie } from "../../utils/api";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { QUERY_KEYS } from "../../models/key";
import { useState } from "react";

export const MovieUpdateScreen = () => {
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
  const onUpdateMovie = async (values: { id: string; name: string }) => {
    if (pb.authStore.token) {
      try {
        const response = await updateMovie({
          id: values.id,
          name: values.name,
          accessToken: pb.authStore.token,
        });

        if (response) {
          queryClient.invalidateQueries([QUERY_KEYS.MOVIE_LIST]);
        } else {
        }
      } catch (error) {
      } finally {
        setIsLoading(false);
      }
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <PrivateLayout>
      <div>
        <div>
          <Form
            className={style.form}
            name="basic"
            layout="vertical"
            onFinish={onUpdateMovie}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item className={style.form_title}>
              <h1>Update Movie</h1>
            </Form.Item>
            <Form.Item
              label="Name"
              name="name"
              rules={[
                { required: true, message: "Please input your username!" },
              ]}
            >
              <Input placeholder="Please input name" value={movieDetail?.id} />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className={style.login_btn}
              >
                Save Movie
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </PrivateLayout>
  );
};
