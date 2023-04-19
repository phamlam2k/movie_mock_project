import { Form, Input, Button } from "antd";
import style from "./style.module.css";
import { Navigate, useNavigate } from "react-router-dom";
import { pb, provider } from "../../lib/pocketbase";
import { ProvType } from "../../models/api";

export const LoginScreen = () => {
  const navigate = useNavigate();
  let provs = provider.authProviders;

  const onFinish = async (data: { username: string; password: string }) => {
    const authData = await pb
      .collection("users")
      .authWithPassword(data.username, data.password);
    navigate("/");

    console.log(authData);
  };

  const loginWithGoogge = async () => {
    const authData = await pb
      .collection("users")
      .authWithOAuth2("google", "CODE", "VERIFIER", "REDIRECT_URL");
    console.log("authentication data === ", authData);
  };

  const startLogin = (prov: ProvType) => {
    localStorage.setItem("provider", JSON.stringify(prov));
    const redirectUrl = "http://localhost:3000/login/redirect";
    const url = prov.authUrl + redirectUrl;
    console.log("prov in button === ", prov);
    console.log("combined url ==== >>>>>>  ", url);

    if (typeof window !== "undefined") {
      window.location.href = url;
    }
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
          <Form.Item>
            {provs &&
              provs?.map((item: any) => {
                return (
                  <button
                    className="p-2 bg-purple-600"
                    key={item.name}
                    onClick={() => startLogin(item)}
                  >
                    {item.name}
                  </button>
                );
              })}
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};
