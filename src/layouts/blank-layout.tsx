import React, { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { Spin } from 'antd';

const BlankLayout = () => {
  return (
    <div style={{ height: '100%' }}>
      <Suspense fallback={<Spin />}>
        <Outlet />
      </Suspense>
    </div>
  );
};

export default BlankLayout;
