import { LockOutlined, MailOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import _ from "lodash";
import { Link, Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useCheckEmail, useRegister } from "../../../hooks/useAuth";
import { useAuthStore } from "../../../stores/auth";

const debounced = _.debounce((callback) => {
  return callback();
}, 500);

const Register = () => {
  const user = useAuthStore().currentUser;
  const navigate = useNavigate();
  const { mutateAsync, isLoading, isError } = useRegister();
  const checkEmail = useCheckEmail();
  const [form] = Form.useForm();

  const onFinish = async (values: any) => {
    const result = await mutateAsync(values);
    if (result) {
      navigate(`/auth/login?isRegisterSuccess=true&email=${values.email}`);
    }
  };

  const handleEmailChanged = (e: string) => {
    debounced(async () => {
      const res = await checkEmail.mutateAsync(e);
      if (res) {
        const currentErrors = form.getFieldError("email");
        form.setFields([
          {
            name: "email",
            errors: [...currentErrors, "Email đã được sử dụng"],
          },
        ]);
      }
    });
  };

  if (user) {
    return <Navigate to="/" />;
  }

  return (
    <Form
      initialValues={{ remember: true }}
      onFinish={onFinish}
      form={form}
      style={{ width: 240 }}
    >
      <Form.Item
        name="name"
        rules={[{ required: true, message: "Vui lòng không để trống tên" }]}
      >
        <Input
          prefix={<UserOutlined className="site-form-item-icon" />}
          placeholder="Họ tên"
        />
      </Form.Item>
      <Form.Item
        name="email"
        rules={[
          { required: true, message: "Vui lòng không để trống email" },
          { type: "email", message: "Định dạng email không đúng" },
        ]}
      >
        <Input
          prefix={<MailOutlined className="site-form-item-icon" />}
          placeholder="Email"
          onChange={(e) => {
            handleEmailChanged(e.target.value);
          }}
        />
      </Form.Item>
      <Form.Item
        style={{ marginBottom: 4 }}
        name="password"
        rules={[
          { required: true, message: "Vui lòng không để trống mật khẩu" },
          {
            min: 8,
            message: "Mật khẩu phải có ít nhất 8 ký tự",
          },
          {
            validator: async (rule, value) => {
              if (!value) {
                return await Promise.resolve();
              }
              if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
                return await Promise.reject(
                  "Mật khẩu phải có ít nhất 1 chữ và một số"
                );
              }
              return await Promise.resolve();
            },
          },
        ]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Mật khẩu"
        />
      </Form.Item>
      {isError && (
        <span style={{ color: "#ff4d4f", fontSize: 12 }}>
          Đăng ký không thành công
        </span>
      )}
      <Form.Item>
        <Button
          loading={isLoading}
          type="primary"
          htmlType="submit"
          className="login-form-button mt-2"
          style={{ width: "100%" }}
        >
          Đăng ký
        </Button>
      </Form.Item>
      hoặc <Link to="/auth/login">đăng nhập</Link>
    </Form>
  );
};

export default Register;
