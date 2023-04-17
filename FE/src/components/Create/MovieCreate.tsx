import { useNavigate } from "react-router-dom";
import { PrivateLayout } from "../../layouts/PrivateLayout";
import { addMovie } from "../../utils/api";

import style from "./style.module.css";
import { useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from "../../models/key";
import { pb } from "../../lib/pocketbase";
import { Button, Form, Input } from "antd";

export const MovieCreateScreen = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const onAddMovie = async (values: { name: string }) => {
    try {
      const response = await addMovie({
        ...values,
        accessToken: pb.authStore.token,
      });
      if (response) {
        queryClient.invalidateQueries([QUERY_KEYS.MOVIE_LIST]);
        navigate("/book");
      } else {
      }
    } catch (error) {}
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <PrivateLayout>
      <div className={style.form_container}>
        <div className={style.form_wrapper}>
          <Form
            className={style.form}
            name="basic"
            layout="vertical"
            onFinish={onAddMovie}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item className={style.form_title}>
              <h1>Create Books</h1>
            </Form.Item>
            <Form.Item
              label="Name"
              name="name"
              rules={[
                { required: true, message: "Please input your username!" },
              ]}
            >
              <Input placeholder="Please input name" />
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className={style.login_btn}
              >
                Create Movie
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </PrivateLayout>
  );
};
