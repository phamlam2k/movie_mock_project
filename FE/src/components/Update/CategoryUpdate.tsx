import { Button, Form, Input } from "antd";
import { PrivateLayout } from "../../layouts/PrivateLayout";
import style from "./style.module.css";
import { pb } from "../../lib/pocketbase";
import { CategoryListData, MovieListData } from "../../models/api";
import {
  getCategoryData,
  getMovieData,
  updateCategory,
  updateMovie,
} from "../../utils/api";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { QUERY_KEYS } from "../../models/key";
import { useState } from "react";

export const CategoryUpdateScreen = () => {
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

  const onUpdateCategory = async (values: { name: string }) => {
    if (pb.authStore.token) {
      console.log("Category", values);
      try {
        const response = await updateCategory({
          id: `${param.id}`,
          name: values.name,
          accessToken: pb.authStore.token,
        });

        if (response) {
          queryClient.invalidateQueries([QUERY_KEYS.CATEGORY_LIST]);
        } else {
        }
      } catch (error) {
        console.log(error);
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
            onFinish={onUpdateCategory}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item className={style.form_title}>
              <h1>Update Category</h1>
            </Form.Item>

            <Form.Item
              label="Name"
              name="name"
              rules={[
                { required: true, message: "Please input category name!" },
              ]}
            >
              <Input defaultValue={categoryDetail?.name} />
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
