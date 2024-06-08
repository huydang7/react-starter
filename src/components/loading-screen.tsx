import React from 'react';
import { Spin } from 'antd';

import Logo from './logo';

const LoadingScreen = () => {
  return (
    <div
      style={{
        width: '100vw',
        height: '100%',
        flexDirection: 'column',
        position: 'fixed',
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
