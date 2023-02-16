import { DesktopOutlined, UserOutlined } from "@ant-design/icons";
import { Layout, Menu, Button, Dropdown, Spin } from "antd";
import { useAuthStore } from "stores/auth";
import { Outlet, useNavigate } from "react-router-dom";
import { Role } from "interfaces/user";
import { HeaderHeight, SiderWidth } from "shared/constants";
import { Suspense } from "react";
import Logo from "components/Logo";

const { Header, Sider } = Layout;

const MainLayout = (props: any) => {
  const { currentUser, logOut } = useAuthStore();
  const navigate = useNavigate();
  const configs = [
    {
      path: "/",
      title: "Quản lí tài khoản",
      icon: <DesktopOutlined />,
      roles: [Role.ADMIN, Role.USER],
    },
    {
      path: "/user",
      title: "Quản lí người dùng",
      icon: <UserOutlined />,
      roles: [Role.ADMIN, Role.USER],
    },
  ];
  const renderMenu = () => {
    let items: any = [];
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

  return (
    <Layout style={{ height: "100%" }}>
      <Sider
        width={SiderWidth}
        style={{
          overflow: "auto",
          height: "100%",
          position: "fixed",
          left: 0,
          top: 0,
          bottom: 0,
          background: "#fff",
          padding: 12,
        }}
      >
        <div className="flex-center" style={{ height: 150 }}>
          <Logo />
        </div>
        <Menu style={{ borderRight: 0, marginTop: 20 }} items={renderMenu()} />
      </Sider>
      <Layout style={{ marginLeft: SiderWidth }}>
        <Header
          style={{
            overflow: "auto",
            height: HeaderHeight,
            position: "fixed",
            left: SiderWidth,
            top: 0,
            right: 0,
            background: "white",
            zIndex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div></div>

          <Dropdown
            menu={{
              items: [{ label: "Đăng xuất", key: 1, onClick: () => logOut() }],
            }}
            placement="bottom"
            trigger={["click"]}
          >
            <Button
              type="text"
              shape="round"
              style={{ backgroundColor: "rgba(0, 0, 0, 0.030)" }}
            >
              <span> Xin chào, {currentUser?.name} </span>
            </Button>
          </Dropdown>
        </Header>
        <Layout style={{ marginTop: HeaderHeight }}>
          <div
            style={{
              margin: 0,
              padding: "24px",
              background: "#f5f5f5",
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
