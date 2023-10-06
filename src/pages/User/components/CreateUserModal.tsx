import React, { useEffect } from 'react';
import { Form, Input, InputNumber, Modal, notification, Select } from 'antd';
import { useCreateUser, useUpdateUser } from 'hooks/useUserQuery';
import { Role } from 'interfaces/user';
import { enumToArray } from 'shared/utils/helpers';

const layout = {
  labelCol: { span: 24 },
  wrapperCol: { span: 24 },
};
const CreateUserModal = (props: any) => {
  const { visible, onClose, user } = props;
  const isEditMode = !!user;
  const [form] = Form.useForm();
  const { mutateAsync: create, isLoading: createLoading } = useCreateUser();
  const { mutateAsync: update, isLoading: updateLoading } = useUpdateUser();

  useEffect(() => {
    if (user) {
      form.setFieldsValue(user || {});
    } else {
      form.resetFields();
    }
  }, [user, form]);

  const onOk = async () => {
    const values = await form.validateFields();
    let message = '';
    try {
      if (!user) {
        await create(values);
        message = 'Tạo người dùng thành công';
      } else {
        await update({ id: user.id, data: { ...user, ...values } });
        message = 'Cập nhật người dùng thành công';
      }
      onClose();
      form.resetFields();
      notification.success({
        message,
      });
    } catch (error) {
      message = 'Có lỗi xảy ra';
      notification.error({
        message,
      });
    }
  };

  return (
    <Modal
      open={visible}
      onCancel={onClose}
      closable={false}
      cancelText="Hủy"
      okText={isEditMode ? 'Lưu' : 'Tạo'}
      onOk={onOk}
      confirmLoading={createLoading || updateLoading}
    >
      <h3 className="bold mb-2">{isEditMode ? 'Cập nhật' : 'Tạo mới'} người dùng</h3>
      <div className="mb-1">
        <b>Thông tin cơ bản</b>
      </div>
      <Form {...layout} form={form}>
        <Form.Item
          name={'email'}
          label="Email"
          rules={[
            { required: true, message: 'Vui lòng nhập email' },
            {
              type: 'email',
              message: 'Email không hợp lệ',
            },
          ]}
        >
          <Input disabled={isEditMode} />
        </Form.Item>
        <Form.Item
          name={'password'}
          label="Password"
          rules={[
            { required: !isEditMode, message: 'Vui lòng nhập mật khẩu' },
            { min: 8, message: 'Mật khẩu phải có ít nhất 8 ký tự' },
            {
              validator(_, value) {
                if (isEditMode && !value) {
                  return Promise.resolve();
                }
                if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
                  return Promise.reject('Mật khẩu phải có ít nhất 1 ký tự chữ và 1 ký tự số');
                }
                return Promise.resolve();
              },
            },
          ]}
        >
          <Input.Password placeholder={isEditMode ? 'Chỉ nhập khi cập nhật lại mật khẩu' : ''} />
        </Form.Item>
        <Form.Item
          name={'name'}
          rules={[{ required: true, message: 'Vui lòng nhập họ tên' }]}
          label="Họ tên"
        >
          <Input />
        </Form.Item>
        <Form.Item
          name={'role'}
          label="Role"
          rules={[{ required: true, message: 'Vui lòng chọn quyền' }]}
          initialValue={Role.USER}
        >
          <Select>
            {enumToArray(Role).map((item: any) => (
              <Select.Option key={item} value={item}>
                <span style={{ textTransform: 'capitalize' }}>{item}</span>
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item name={'phone'} label="SĐT">
          <InputNumber style={{ width: '100%' }} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CreateUserModal;
