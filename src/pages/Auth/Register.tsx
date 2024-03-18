import { Link, useNavigate } from 'react-router-dom';
import { LockOutlined, MailOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input, notification } from 'antd';
import { debounce } from 'lodash';

import { useCheckEmail, useRegister } from '@/hooks/useAuthQuery';

const debounced = debounce((callback) => {
  return callback();
}, 500);

const Register = () => {
  const navigate = useNavigate();
  const { mutateAsync: register, isPending } = useRegister();
  const checkEmail = useCheckEmail();
  const [form] = Form.useForm();

  const onFinish = async (values: any) => {
    try {
      const result = await register(values);
      if (result) {
        navigate(`/auth/login?isRegisterSuccess=true&email=${values.email}`);
      }
    } catch (error: any) {
      const errCode = error?.response?.data?.errorCode;
      if (errCode === 100) {
        const currentErrors = form.getFieldError('email');
        form.setFields([
          {
            name: 'email',
            errors: [...currentErrors, 'Email đã được sử dụng'],
          },
        ]);
      } else {
        notification.error({
          message: 'Đăng ký không thành công',
        });
      }
    }
  };

  const handleEmailChanged = (email: string) => {
    debounced(async () => {
      const res = await checkEmail.mutateAsync({ email });
      if (res) {
        const currentErrors = form.getFieldError('email');
        form.setFields([
          {
            name: 'email',
            errors: [...currentErrors, 'Email đã được sử dụng'],
          },
        ]);
      }
    });
  };

  return (
    <Form
      onFinish={onFinish}
      form={form}
      style={{ width: 240 }}
      labelCol={{ span: 24 }}
      requiredMark={false}
    >
      <Form.Item
        label="Name"
        name="name"
        rules={[{ required: true, message: 'Vui lòng không để trống tên' }]}
      >
        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Họ tên" />
      </Form.Item>
      <Form.Item
        label="Email"
        name="email"
        rules={[
          { required: true, message: 'Vui lòng không để trống email' },
          { type: 'email', message: 'Định dạng email không đúng' },
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
        label="Mật khẩu"
        name="password"
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
          placeholder="Mật khẩu"
        />
      </Form.Item>
      <Form.Item>
        <Button
          loading={isPending}
          type="primary"
          htmlType="submit"
          className="login-form-button mt-2"
          style={{ width: '100%' }}
        >
          Đăng ký
        </Button>
      </Form.Item>
      hoặc <Link to="/auth/login">đăng nhập</Link>
    </Form>
  );
};

export default Register;
