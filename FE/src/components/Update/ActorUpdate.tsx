import { Button, Form, Input } from "antd";
import { PrivateLayout } from "../../layouts/PrivateLayout";
import style from "./style.module.css";
import { pb } from "../../lib/pocketbase";
import {
  ActorListData,
  CategoryListData,
  MovieListData,
} from "../../models/api";
import {
  getActorData,
  getCategoryData,
  getMovieData,
  updateActor,
  updateCategory,
  updateMovie,
} from "../../utils/api";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { QUERY_KEYS } from "../../models/key";
import { useState } from "react";

export const ActorUpdateScreen = () => {
  const navigate = useNavigate();
  const param = useParams();
  const queryClient = useQueryClient();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { data: actorDetail } = useQuery(
    [QUERY_KEYS.CATEGORY_DETAIL, param.id],
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
  console.log(actorDetail);
  const onUpdateActor = async (values: { name: string; avatar: string }) => {
    if (pb.authStore.token) {
      try {
        const response = await updateActor({
          id: `${param.id}`,
          ...values,
          accessToken: pb.authStore.token,
        });

        if (response) {
          queryClient.invalidateQueries([QUERY_KEYS.ACTOR_LIST]);
        } else {
        }
      } catch (error) {
      } finally {
        setIsLoading(false);
      }
    }
  };
  console.log(onUpdateActor);

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
            onFinish={onUpdateActor}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item className={style.form_title}>
              <h1>Update Actor</h1>
            </Form.Item>
            <Form.Item
              label="Name"
              name="name"
              rules={[{ required: true, message: "Please input actor name!" }]}
            >
              <Input
                placeholder="Please input actor name"
                defaultValue={actorDetail?.name}
              />
            </Form.Item>
            <Form.Item
              label="Avatar"
              name="image"
              rules={[
                { required: true, message: "Please input actor avatar!" },
              ]}
            >
              <Input
                placeholder="Please input name"
                defaultValue={actorDetail?.avatar}
              />
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className={style.login_btn}
              >
                Save
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </PrivateLayout>
  );
};
