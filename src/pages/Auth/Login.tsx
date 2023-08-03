import { Link, useLocation } from 'react-router-dom';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input, Tag } from 'antd';
import { useLogin } from 'hooks/useAuthQuery';

const Login = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const isRegisterSuccess = params.get('isRegisterSuccess') === 'true';
  const isResetPwdSuccess = params.get('isResetPwdSuccess') === 'true';

  const email = params.get('email');
  const { mutate: login, isLoading, isError } = useLogin();

  const onFinish = (values: any) => {
    login(values);
  };

  return (
    <Form onFinish={onFinish} style={{ width: 240 }}>
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
          { required: true, message: 'Vui lòng không để trống email' },
          { type: 'email', message: 'Định dạng email không đúng' },
        ]}
      >
        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Email" />
      </Form.Item>
      <Form.Item
        style={{ marginBottom: 4 }}
        name="password"
        rules={[{ required: true, message: 'Vui lòng không để trống mật khẩu' }]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Mật khẩu"
        />
      </Form.Item>
      {isError && (
        <span style={{ color: '#ff4d4f', fontSize: 12 }}>Email hoặc mật khẩu không đúng</span>
      )}
      <Form.Item style={{ margin: 0 }}>
        <Link className="login-form-forgot" to="/auth/forgot-password">
          Quên mật khẩu
        </Link>
      </Form.Item>
      <Form.Item>
        <Button
          loading={isLoading}
          type="primary"
          htmlType="submit"
          className="login-form-button mt-2"
          style={{ width: '100%' }}
        >
          Đăng nhập
        </Button>
      </Form.Item>
      Hoặc <Link to="/auth/register">đăng ký ngay!</Link>
    </Form>
  );
};

export default Login;
