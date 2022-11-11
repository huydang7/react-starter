import { UserOutlined } from "@ant-design/icons";
import { Button, Form, Input, Row } from "antd";
import { Link, Navigate, useLocation } from "react-router-dom";
import Logo from "../../../components/Logo";
import { useForgotPasswordMutation } from "../../../hooks/useAuth";
import { useAuthStore } from "../../../stores/auth";

const ForgotPassword = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);

  const email = params.get("email");
  const { mutate, isSuccess, isError, isLoading } = useForgotPasswordMutation();

  const onFinish = (values: any) => {
    mutate(values);
  };

  const user = useAuthStore().currentUser;

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

      {isSuccess ? (
        <Row>
          <span>
            Một thư đặt lại mật khẩu vừa được gửi tới địa chỉ email của bạn. Vui
            lòng kiểm tra email
          </span>
        </Row>
      ) : (
        <>
          <Form.Item
            initialValue={email}
            name="email"
            rules={[
              { required: true, message: "Vui lòng không để trống email" },
              { type: "email", message: "Định dạng email không đúng" },
            ]}
          >
            <Input
              size="large"
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Email"
            />
          </Form.Item>
          {isError && (
            <Row>
              <span style={{ color: "red", fontSize: 12, width: "100%" }}>
                Không tìm thấy người dùng
              </span>
            </Row>
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
              Quên mật khẩu
            </Button>
          </Form.Item>
          Hoặc <Link to="/auth/login">đăng nhập</Link>
        </>
      )}
    </Form>
  );
};

export default ForgotPassword;
