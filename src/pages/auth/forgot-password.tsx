import { Link, useNavigate } from 'react-router-dom';
import { UserOutlined } from '@ant-design/icons';
import { Button, Form, Input, Row } from 'antd';

import { useForgotPassword } from '@/hooks/use-auth-query';

const ForgotPassword = () => {
  const { mutate: forgotPassword, isSuccess, isError, isPending } = useForgotPassword();
  const navigate = useNavigate();
  const onFinish = (values: any) => {
    forgotPassword(values);
  };

  if (isSuccess) {
    navigate('/auth/reset-password');
  }
  return (
    <>
      <Form onFinish={onFinish} style={{ width: 240 }} labelCol={{ span: 24 }} requiredMark={false}>
        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: 'Vui lòng không để trống email' },
            { type: 'email', message: 'Định dạng email không đúng' },
          ]}
        >
          <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Email" />
        </Form.Item>
        {isError && (
          <Row>
            <span style={{ color: '#ff4d4f', fontSize: 12, width: '100%' }}>
              Không tìm thấy người dùng
            </span>
          </Row>
        )}
        <Form.Item>
          <Button
            loading={isPending}
            type="primary"
            htmlType="submit"
            className="login-form-button mt-2"
            style={{ width: '100%' }}
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
