import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input, Tag } from "antd";
import { Link, Navigate, useLocation } from "react-router-dom";
import Logo from "../../../components/Logo";
import { useLoginMutation } from "../../../hooks/useAuth";
import { useAuthStore } from "../../../stores/auth";

const Login = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const isRegisterSuccess = params.get("register") === "success";
  const isResetPwdSuccess = params.get("isResetPwdSuccess") === "true";

  const email = params.get("email");
  const { mutate, isLoading, isError } = useLoginMutation();

  const onFinish = (values: any) => {
    mutate(values);
  };

  const user = useAuthStore().currentUser;

  if (user) {
    return <Navigate to="/" />;
  }
  return (
    <Form initialValues={{ remember: true }} onFinish={onFinish}>
      <div className="flex-center">
        <Logo />
      </div>
      {isRegisterSuccess && (
        <div className="flex-center mb-1">
          <Tag color="green">Bạn đã đăng ký thành công</Tag>
        </div>
      )}
      {isResetPwdSuccess && (
        <div className="flex-center mb-1">
          <Tag color="green">Bạn đã đặt lại mật khẩu thành công</Tag>
        </div>
      )}
      <Form.Item
        initialValue={email}
        name="email"
        rules={[
          { required: true, message: "Vui lòng không để trống email" },
          { type: "email", message: "Định dạng email không đúng" },
        ]}
      >
        <Input
          style={{ width: 240 }}
          size="large"
          prefix={<UserOutlined className="site-form-item-icon" />}
          placeholder="Email"
        />
      </Form.Item>
      <Form.Item
        style={{ marginBottom: 4 }}
        name="password"
        rules={[
          { required: true, message: "Vui lòng không để trống mật khẩu" },
        ]}
      >
        <Input
          style={{ width: 240 }}
          size="large"
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Mật khẩu"
        />
      </Form.Item>
      {isError && (
        <span style={{ color: "red", fontSize: 12 }}>
          Email hoặc mật khẩu không đúng
        </span>
      )}
      <Form.Item style={{ margin: 0 }}>
        <Link className="login-form-forgot" to="/auth/forgot-password">
          Quên mật khẩu
        </Link>
      </Form.Item>
      <Form.Item>
        <Button
          loading={isLoading}
          size="large"
          type="primary"
          htmlType="submit"
          className="login-form-button mt-2"
          style={{ width: "100%" }}
        >
          Đăng nhập
        </Button>
      </Form.Item>
      Hoặc <Link to="/auth/register">đăng ký ngay!</Link>
    </Form>
  );
};

export default Login;
