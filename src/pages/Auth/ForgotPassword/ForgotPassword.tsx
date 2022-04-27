import React from "react";
import { Form, Input, Button, Row } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch, RootState } from "../../../rematch/store";
import { Navigate, useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { ReactComponent as MyLogo } from "../../../assets/imgs/logo_hoz.svg";
import useLoading from "../../../hooks/useLoading";

const ForgotPassword = () => {
  const dispatch = useDispatch<Dispatch>();

  // get params in url
  const location = useLocation();
  const params = new URLSearchParams(location.search);

  const email = params.get("email");

  const onFinish = (values: any) => {
    dispatch.auth.forgotPassword(values);
  };

  const user = useSelector((state: RootState) => state.auth.user);
  const { loading, finished, success, error } = useLoading(
    (state: RootState) => state.loading.effects.auth.forgotPassword
  );

  if (user) {
    return <Navigate to="/" />;
  }

  return (
    <Form initialValues={{ remember: true }} onFinish={onFinish}>
      <div className="flex-center">
        <MyLogo height={100} style={{ marginBottom: 36 }} />
      </div>

      {finished && success ? (
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
              style={{ width: 240 }}
              size="large"
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Email"
            />
          </Form.Item>
          {finished && error && (
            <Row>
              <span style={{ color: "red", fontSize: 12, width: "100%" }}>
                Không tìm thấy người dùng
              </span>
            </Row>
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
