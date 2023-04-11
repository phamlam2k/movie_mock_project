import { Form, Input, Button } from "antd";
import style from "./style.module.css";
import { Navigate, useNavigate } from "react-router-dom";
import { pb } from "../../lib/pocketbase";
import { NOTIFICATION_TYPE, notify } from "../../utils/notify";

export const LoginScreen = () => {
  const navigate = useNavigate();

  const onFinish = async (data: { username: string; password: string }) => {
    const authData = await pb
      .collection("users")
      .authWithPassword(data.username, data.password);
    navigate("/");

    console.log(authData);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  if (pb.authStore.isValid) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className={style.container}>
      <div className={style.form_wrapper}>
        <Form
          className={style.form}
          name="basic"
          layout="vertical"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item className={style.form_title}>
            <h1>Login</h1>
          </Form.Item>
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className={style.login_btn}
            >
              Login
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};
