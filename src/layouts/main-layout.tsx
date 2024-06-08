import { Suspense } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { DesktopOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Dropdown, Layout, Menu, Space, Spin } from 'antd';
import { shallow } from 'zustand/shallow';

import Logo from '@/components/logo';
import ToggleThemeButton from '@/components/toggle-theme-button';
import { Role } from '@/interfaces/user';
import { HeaderHeight, SiderWidth } from '@/shared/constants';
import { useAuthStore } from '@/stores/auth';
import { useThemeStore } from '@/stores/theme';

import './main-layout.scss';

const { Header, Sider } = Layout;

const MainLayout = () => {
  const { currentUser, logOut } = useAuthStore(
    (state) => ({
      currentUser: state.currentUser,
      logOut: state.logOut,
    }),
    shallow
  );
  const navigate = useNavigate();
  const configs = [
    {
      path: '/',
      title: 'Quản lí tài khoản',
      icon: <DesktopOutlined />,
      roles: [Role.ADMIN, Role.USER],
    },
    {
      path: '/user',
      title: 'Quản lí người dùng',
      icon: <UserOutlined />,
      roles: [Role.ADMIN, Role.USER],
    },
  ];
  const renderMenu = () => {
    const items: any = [];
    configs.forEach((e, i) => {
      if (currentUser && e.roles.includes(currentUser.role)) {
        items.push({
          label: e.title,
          key: i,
          icon: e.icon,
          onClick: () => navigate(e.path),
        });
      }
    });
    return items;
  };

  const { darkMode } = useThemeStore();

  return (
    <Layout style={{ height: '100%' }} className="main-layout">
      <Sider className="sider" theme={darkMode ? 'dark' : 'light'} width={SiderWidth}>
        <div className="flex-center" style={{ height: 150 }}>
          <Logo />
        </div>
        <Menu style={{ borderRight: 0, marginTop: 20 }} items={renderMenu()} />
      </Sider>
      <Layout style={{ marginLeft: SiderWidth }}>
        <Header
          className="header"
          style={{
            left: SiderWidth,
            height: HeaderHeight,
          }}
        >
          <div></div>
          <Space>
            <ToggleThemeButton />
            <Dropdown
              menu={{
                items: [{ label: 'Đăng xuất', key: 1, onClick: () => logOut() }],
              }}
              placement="bottom"
              trigger={['click']}
            >
              <Button type="text" shape="round" style={{ backgroundColor: 'rgba(0, 0, 0, 0.030)' }}>
                <span> Xin chào, {currentUser?.name} </span>
              </Button>
            </Dropdown>
          </Space>
        </Header>
        <Layout style={{ marginTop: HeaderHeight }}>
          <div
            style={{
              margin: 0,
              padding: '24px',
            }}
          >
            <Suspense fallback={<Spin />}>
              <Outlet />
            </Suspense>
          </div>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
