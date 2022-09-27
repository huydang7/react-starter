import { LockOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, useLocation } from "react-router-dom";
import Logo from "../../../components/Logo";
import useLoading from "../../../hooks/useLoading";
import { Dispatch, RootState } from "../../../rematch/store";

const ResetPassword = () => {
  const dispatch = useDispatch<Dispatch>();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const token = params.get("token");

  const onFinish = (values: any) => {
    delete values.newPassword;
    dispatch.auth.resetPassword({ ...values, token });
  };

  const user = useSelector((state: RootState) => state.auth.user);
  const { loading, error, success, finished } = useLoading(
    (state: RootState) => state.loading.effects.auth.resetPassword
  );
  if (finished && success) {
    return <Navigate to="/auth/login?isResetPwdSuccess=true" />;
  }
  if (user) {
    return <Navigate to="/" />;
  }
  return (
    <Form initialValues={{ remember: true }} onFinish={onFinish}>
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
          style={{ width: 240 }}
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
          style={{ width: 240 }}
          size="large"
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Mật khẩu mới"
        />
      </Form.Item>
      {error && (
        <span style={{ color: "red", fontSize: 12 }}>
          Không thể đặt lại mật khẩu
        </span>
      )}
      <Form.Item>
        <Button
          loading={loading}
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
