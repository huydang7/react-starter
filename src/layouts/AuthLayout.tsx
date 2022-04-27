import { Row } from "antd";
import React from "react";

const AuthLayout = (props: any) => {
  return (
    <Row justify="center" style={{ alignItems: "center", height: "100vh" }}>
      <div
        style={{
          backgroundColor: "white",
          padding: 52,
          borderRadius: 4,
          maxWidth: 540,
        }}
      >
        {props.children}
      </div>
    </Row>
  );
};

export default AuthLayout;
