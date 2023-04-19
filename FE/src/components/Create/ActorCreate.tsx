import { useNavigate } from "react-router-dom";
import { PrivateLayout } from "../../layouts/PrivateLayout";
import { addCategory, addMovie } from "../../utils/api";

import style from "./style.module.css";
import { useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from "../../models/key";
import { pb } from "../../lib/pocketbase";
import { Button, Form, Input } from "antd";

export const ActorCreateScreen = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const onAddActor = async (values: { name: string; avatar: string }) => {
    try {
      const response = await addCategory({
        ...values,
        accessToken: pb.authStore.token,
      });
      if (response) {
        queryClient.invalidateQueries([QUERY_KEYS.ACTOR_LIST]);
        navigate("/actor");
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
            onFinish={onAddActor}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item className={style.form_title}>
              <h1>Create Actor</h1>
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
            <Form.Item
              label="Avatar"
              name="image"
              rules={[{ required: true, message: "Please input your image!" }]}
            >
              <Input placeholder="Please input image" />
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className={style.create_btn}
              >
                Create
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </PrivateLayout>
  );
};
