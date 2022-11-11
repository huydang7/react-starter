import { LockOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import { Link, Navigate, useLocation } from "react-router-dom";
import Logo from "../../../components/Logo";
import { useResetPasswordMutation } from "../../../hooks/useAuth";
import { useAuthStore } from "../../../stores/auth";

const ResetPassword = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const token = params.get("token");

  const { mutate, isLoading, isError, isSuccess } = useResetPasswordMutation();
  const onFinish = (values: any) => {
    delete values.newPassword;
    mutate({ ...values, token });
  };

  const user = useAuthStore().currentUser;

  if (isSuccess) {
    return <Navigate to="/auth/login?isResetPwdSuccess=true" />;
  }
  if (user) {
    return <Navigate to="/" />;
  }
  return (
    <Form
      initialValues={{ remember: true }}
      onFinish={onFinish}
      style={{ width: 240 }}
    >
      <div className="flex-center">
        <Logo />
      </div>
      <Form.Item
        name="password"
        rules={[
          { required: true, message: "Vui lòng không để trống mật khẩu" },
        ]}
      >
        <Input
          size="large"
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Mật khẩu"
        />
      </Form.Item>
      <Form.Item
        style={{ marginBottom: 4 }}
        name="newPassword"
        rules={[
          { required: true, message: "Vui lòng không để trống mật khẩu" },
        ]}
      >
        <Input
          size="large"
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Mật khẩu mới"
        />
      </Form.Item>
      {isError && (
        <span style={{ color: "red", fontSize: 12 }}>
          Không thể đặt lại mật khẩu
        </span>
      )}
      <Form.Item>
        <Button
          loading={isLoading}
          size="large"
          type="primary"
          htmlType="submit"
          className="login-form-button mt-2"
          style={{ width: "100%" }}
        >
          Đặt lại mật khẩu
        </Button>
      </Form.Item>
      Hoặc <Link to="/auth/register">đăng nhập</Link>
    </Form>
  );
};

export default ResetPassword;
