import { Row, Spin } from "antd";
import React, { Suspense } from "react";
import { Outlet } from "react-router-dom";
import Logo from "components/Logo";

const AuthLayout = () => {
  return (
    <Row
      justify="center"
      style={{ alignItems: "center", height: "100%", background: "#f5f5f5" }}
    >
      <div
        style={{
          backgroundColor: "white",
          padding: 36,
          borderRadius: 6,
          maxWidth: 540,
        }}
        className="flex-center flex-col"
      >
        <Logo />
        <Suspense fallback={<Spin />}>
          <Outlet />
        </Suspense>
      </div>
    </Row>
  );
};

export default AuthLayout;
