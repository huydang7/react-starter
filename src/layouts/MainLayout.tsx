import { DesktopOutlined } from "@ant-design/icons";
import { Layout, Menu, Button, Dropdown } from "antd";
import { useAuthStore } from "../stores/auth";
import { ReactComponent as MyLogo } from "../assets/imgs/logo_hoz.svg";
import { useNavigate } from "react-router-dom";
import { Role } from "../interfaces/user";

const { Header, Content, Sider } = Layout;

const MainLayout = (props: any) => {
  const { currentUser, logOut } = useAuthStore();
  const navigate = useNavigate();
  const configs = [
    {
      path: "/",
      title: "Quản lí tài khoản",
      icon: <DesktopOutlined />,
      roles: [Role.ADMIN],
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

  const menu = (
    <Menu items={[{ label: "Đăng xuất", key: 1, onClick: () => logOut() }]} />
  );
  return (
    <Layout>
      <Sider
        style={{
          overflow: "auto",
          height: "100vh",
          position: "fixed",
          left: 0,
          top: 0,
          bottom: 0,
          background: "#fff",
        }}
      >
        <div className="flex-center" style={{ height: 150 }}>
          <MyLogo width={80} />
        </div>
        <Menu style={{ borderRight: 0, marginTop: 20 }} items={renderMenu()} />
      </Sider>
      <Layout style={{ marginLeft: 200 }}>
        <Header
          style={{
            overflow: "auto",
            height: 56,
            position: "fixed",
            left: 200,
            top: 0,
            right: 0,
            background: "#f0f2f5",
            zIndex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div></div>

          <Dropdown overlay={menu} placement="bottom" trigger={["click"]}>
            <Button
              type="text"
              shape="round"
              style={{ backgroundColor: "rgba(0, 0, 0, 0.030)" }}
            >
              <span> Xin chào, {currentUser?.name} </span>
            </Button>
          </Dropdown>
        </Header>
        <Layout style={{ padding: "0 24px 24px", marginTop: 56 }}>
          <Content
            className="site-layout-background"
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
            }}
          >
            {props.children}
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
