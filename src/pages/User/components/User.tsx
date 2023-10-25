import { useState } from 'react';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Button, Input, Popconfirm, Space, Tag } from 'antd';
import dayjs from 'dayjs';

import TitleWithAction from '@/components/TitleWithAction';
import Table from '@/components/ui/Table';
import { useDeleteUser, useGetUsers } from '@/hooks/useUserQuery';
import { Role } from '@/interfaces/user';
import { useAuthStore } from '@/stores/auth';

import CreateUserModal from './CreateUserModal';

const initQuery = {
  page: 1,
  size: 10,
  search: '',
  order: {
    createdAt: 'DESC',
  },
};

const User = () => {
  const [editedUser, setEditedUser] = useState<any>(null);
  const [createUserModalVisible, setCreateUserModalVisible] = useState(false);
  const [query, setQuery] = useState<any>(initQuery);
  const { total, items: users, isFetching } = useGetUsers(query);
  const { mutate: deleteUser } = useDeleteUser();
  const { currentUser } = useAuthStore();
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text: any) => <span>{text}</span>,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'SĐT',
      dataIndex: 'phone',
      key: 'phone',
    },

    {
      title: 'Role',
      key: 'role',
      dataIndex: 'role',
      filters: [
        {
          text: <span>Admin</span>,
          value: Role.ADMIN,
        },
        {
          text: <span>Người dùng</span>,
          value: Role.USER,
        },
      ],
      render: (role: string) => (
        <>
          <Tag key={role}>{role?.toUpperCase()}</Tag>
        </>
      ),
    },
    {
      title: 'Ngày tạo',
      key: 'createdAt',
      dataIndex: 'createdAt',
      render: (value: any) => <>{dayjs(value).format('lll')}</>,
      sorter: true,
    },
    {
      title: 'Lần cuối cập nhật',
      key: 'updatedAt',
      dataIndex: 'updatedAt',
      render: (value: any) => <>{dayjs(value).format('lll')}</>,
    },
    {
      title: 'Action',
      key: 'action',
      render: (text: any, record: any) => (
        <Space size="middle">
          <Button
            type="dashed"
            onClick={() => {
              setEditedUser(record);
            }}
            shape="circle"
          >
            <EditOutlined />
          </Button>
          {currentUser?.id !== record?.id && (
            <Popconfirm
              title="Bạn có chắc muốn xoá người dùng này?"
              onConfirm={() => {
                deleteUser(record?.id);
              }}
              okText="Yes"
              cancelText="No"
            >
              <Button danger type="dashed" shape="circle">
                <DeleteOutlined />
              </Button>
            </Popconfirm>
          )}
        </Space>
      ),
    },
  ];

  const onSearch = (e: string) => {
    setQuery({ ...initQuery, search: e });
  };
  const onTableChange = (page: any, filter: any, sorter: any) => {
    const q: any = {
      page: page.current,
      size: page.pageSize,
    };

    if (filter?.role) {
      q.role = filter.role;
    } else {
      q.role = undefined;
    }

    if (sorter?.column) {
      q.order = { [sorter.columnKey]: sorter.order === 'ascend' ? 'ASC' : 'DESC' };
    } else {
      sorter = '';
    }

    setQuery({ ...query, ...q });
  };

  return (
    <>
      <div>
        <CreateUserModal
          visible={createUserModalVisible || editedUser}
          user={editedUser}
          onClose={() => {
            setCreateUserModalVisible(false);
            setEditedUser(null);
          }}
        />
        <Space direction="vertical" className="w-full">
          <TitleWithAction
            title="Quản lí người dùng"
            action={
              <Button type="primary" onClick={() => setCreateUserModalVisible(true)}>
                Thêm mới
              </Button>
            }
          />

          <Input.Search placeholder="Tìm kiếm" allowClear onSearch={onSearch} />
          <Table
            loading={isFetching}
            pagination={{
              current: query.page,
              pageSize: query.size,
              total: total,
            }}
            onChange={onTableChange}
            columns={columns}
            dataSource={users.map((e, i) => ({ ...e, index: i + 1 }))}
            rowKey={(record: any) => record.id}
          />
        </Space>
      </div>
    </>
  );
};

export default User;
