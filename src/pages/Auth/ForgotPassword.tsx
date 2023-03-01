import { UserOutlined } from "@ant-design/icons";
import { Button, Form, Input, Row } from "antd";
import { Link, useLocation } from "react-router-dom";
import { useForgotPassword } from "hooks/useAuthQuery";

const ForgotPassword = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);

  const email = params.get("email");
  const { mutate, isSuccess, isError, isLoading } = useForgotPassword();

  const onFinish = (values: any) => {
    mutate(values);
  };

  if (isSuccess) {
    return (
      <span className="text-center">
        Một thư đặt lại mật khẩu vừa được gửi tới địa chỉ email của bạn. Vui
        lòng kiểm tra email
      </span>
    );
  }
  return (
    <>
      <Form
        initialValues={{ remember: true }}
        onFinish={onFinish}
        style={{ width: 240 }}
      >
        <Form.Item
          initialValue={email}
          name="email"
          rules={[
            { required: true, message: "Vui lòng không để trống email" },
            { type: "email", message: "Định dạng email không đúng" },
          ]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Email"
          />
        </Form.Item>
        {isError && (
          <Row>
            <span style={{ color: "#ff4d4f", fontSize: 12, width: "100%" }}>
              Không tìm thấy người dùng
            </span>
          </Row>
        )}
        <Form.Item>
          <Button
            loading={isLoading}
            type="primary"
            htmlType="submit"
            className="login-form-button mt-2"
            style={{ width: "100%" }}
          >
            Quên mật khẩu
          </Button>
        </Form.Item>
        Hoặc <Link to="/auth/login">đăng nhập</Link>
      </Form>
    </>
  );
};

export default ForgotPassword;
