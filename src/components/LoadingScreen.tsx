import { Spin } from "antd";
import React from "react";
import Logo from "./Logo";

const LoadingScreen = () => {
  return (
    <div
      style={{
        width: "100vw",
        height: "100%",
        flexDirection: "column",
        position: "fixed",
        background: "white",
        zIndex: 9999,
      }}
      className="flex-center"
    >
      <Logo />
      <Spin />
    </div>
  );
};

export default LoadingScreen;
