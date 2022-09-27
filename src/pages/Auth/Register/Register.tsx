import { LockOutlined, MailOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import _ from "lodash";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import useLoading from "../../../hooks/useLoading";
import { Dispatch, RootState } from "../../../rematch/store";

import { useNavigate } from "react-router-dom";
import Logo from "../../../components/Logo";

const debounced = _.debounce((callback) => {
  return callback();
}, 500);

const Register = () => {
  const dispatch = useDispatch<Dispatch>();
  const navigate = useNavigate();

  const onFinish = async (values: any) => {
    dispatch.auth.register({
      ...values,
      cb: (res: any) => {
        if (res) {
          navigate("/auth/login?register=success&email=" + values.email);
        }
      },
    });
  };

  const [form] = Form.useForm();

  const user = useSelector((state: RootState) => state.auth.user);
  const { loading } = useLoading(
    (state: RootState) => state.loading.effects.auth.register
  );

  if (user) {
    return <Navigate to="/" />;
  }

  return (
    <Form initialValues={{ remember: true }} onFinish={onFinish} form={form}>
      <div className="flex-center">
        <Logo />
      </div>
      <Form.Item
        name="name"
        rules={[{ required: true, message: "Vui lòng không để trống tên" }]}
      >
        <Input
          style={{ width: 240 }}
          size="large"
          prefix={<UserOutlined className="site-form-item-icon" />}
          placeholder="Họ tên"
        />
      </Form.Item>
      <Form.Item
        name="email"
        rules={[
          { required: true, message: "Vui lòng không để trống email" },
          { type: "email", message: "Định dạng email không đúng" },
          {
            validator: async (rule, value) => {
              return new Promise<any>((resolve, reject) => {
                debounced(() =>
                  dispatch.auth.checkEmail({
                    email: value,
                    cb: (res: any) => {
                      if (res) {
                        reject("Email đã tồn tại");
                      } else {
                        resolve(true);
                      }
                    },
                  })
                );
              });
            },
          },
        ]}
      >
        <Input
          style={{ width: 240 }}
          size="large"
          prefix={<MailOutlined className="site-form-item-icon" />}
          placeholder="Email"
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
            validator: (rule, value) => {
              if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
                Promise.reject("Mật khẩu phải có ít nhất 1 chữ và một số");
              }
              return Promise.resolve();
            },
          },
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
      <Form.Item>
        <Button
          loading={loading}
          size="large"
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
