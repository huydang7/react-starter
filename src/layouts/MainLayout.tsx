import { DesktopOutlined } from "@ant-design/icons";
import { Layout, Menu, Button, Dropdown } from "antd";

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Dispatch, RootState } from "../rematch/store";
import { ReactComponent as MyLogo } from "../assets/imgs/logo_hoz.svg";

const { Header, Content, Sider } = Layout;
const MainLayout: React.FC = (props) => {
  const dispatch = useDispatch<Dispatch>();
  const user: any = useSelector((state: RootState) => state.auth.user);

  const configs = [
    {
      path: "/",
      title: "Quản lí tài khoản",
      icon: <DesktopOutlined />,
      roles: ["admin"],
    },
  ];
  const renderMenu = () => {
    return configs.map((e, i) =>
      e.roles.includes(user?.role) ? (
        <Menu.Item key={i} icon={e.icon}>
          <Link to={e.path}>{e.title}</Link>
        </Menu.Item>
      ) : (
        <></>
      )
    );
  };
  const menu = (
    <Menu>
      <Menu.Item key={"logout"} onClick={() => dispatch.auth.logOut()}>
        Đăng xuất
      </Menu.Item>
    </Menu>
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
        <Menu style={{ borderRight: 0, marginTop: 20 }}>{renderMenu()}</Menu>
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
              <span> Xin chào, {user?.name} </span>
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
