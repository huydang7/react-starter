import { Link, Navigate, useLocation } from 'react-router-dom';
import { LockOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';
import { useResetPassword } from 'hooks/useAuthQuery';

const ResetPassword = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const token = params.get('token');

  const { mutate: resetPassword, isLoading, isError, isSuccess } = useResetPassword();
  const onFinish = (values: any) => {
    delete values.newPassword;
    resetPassword({ ...values, token });
  };

  if (isSuccess) {
    return <Navigate to="/auth/login?isResetPwdSuccess=true" />;
  }

  return (
    <Form onFinish={onFinish} style={{ width: 240 }}>
      <Form.Item
        name="password"
        rules={[{ required: true, message: 'Vui lòng không để trống mật khẩu' }]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Mật khẩu"
        />
      </Form.Item>
      <Form.Item
        style={{ marginBottom: 4 }}
        name="newPassword"
        rules={[{ required: true, message: 'Vui lòng không để trống mật khẩu' }]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Mật khẩu mới"
        />
      </Form.Item>
      {isError && (
        <span style={{ color: '#ff4d4f', fontSize: 12 }}>Không thể đặt lại mật khẩu</span>
      )}
      <Form.Item>
        <Button
          loading={isLoading}
          type="primary"
          htmlType="submit"
          className="login-form-button mt-2"
          style={{ width: '100%' }}
        >
          Đặt lại mật khẩu
        </Button>
      </Form.Item>
      Hoặc <Link to="/auth/register">đăng nhập</Link>
    </Form>
  );
};

export default ResetPassword;
