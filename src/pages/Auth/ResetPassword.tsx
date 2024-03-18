import { Link, Navigate } from 'react-router-dom';
import { CodeOutlined, LockOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';

import { useResetPassword } from '@/hooks/useAuthQuery';

const ResetPassword = () => {
  const { mutate: resetPassword, isPending, isError, isSuccess } = useResetPassword();
  const onFinish = (values: any) => {
    resetPassword({ ...values });
  };

  if (isSuccess) {
    return <Navigate to="/auth/login?isResetPwdSuccess=true" />;
  }

  return (
    <Form onFinish={onFinish} style={{ width: 240 }} labelCol={{ span: 24 }} requiredMark={false}>
      <Form.Item
        label="OTP"
        name="otp"
        rules={[{ required: true, message: 'Vui lòng không để trống OTP' }]}
      >
        <Input
          prefix={<CodeOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Mật khẩu"
        />
      </Form.Item>
      <Form.Item
        label="Mật khẩu mới"
        name="newPassword"
        rules={[
          { required: true, message: 'Vui lòng không để trống mật khẩu' },
          {
            min: 8,
            message: 'Mật khẩu phải có ít nhất 8 ký tự',
          },
          {
            validator: async (rule, value) => {
              if (!value) {
                return await Promise.resolve();
              }
              if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
                return await Promise.reject('Mật khẩu phải có ít nhất 1 chữ và một số');
              }
              return await Promise.resolve();
            },
          },
        ]}
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
          loading={isPending}
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
