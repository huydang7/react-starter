import { Spin } from "antd";
import React, { Suspense } from "react";
import { Outlet } from "react-router-dom";

const BlankLayout = () => {
  return (
    <div style={{ height: "100%" }}>
      <Suspense fallback={<Spin />}>
        <Outlet />
      </Suspense>
    </div>
  );
};

export default BlankLayout;
