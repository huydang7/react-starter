import React, { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { Row, Spin } from 'antd';

import Logo from 'components/Logo';

const AuthLayout = () => {
  return (
    <Row justify="center" style={{ alignItems: 'center', height: '100%' }}>
      <div
        style={{
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
