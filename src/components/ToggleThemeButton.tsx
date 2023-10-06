import React from 'react';
import { Button } from 'antd';
import { useThemeStore } from 'stores/theme';

const ToggleThemeButton = () => {
  const { darkMode, toggleTheme } = useThemeStore();
  return (
    <Button
      type="text"
      shape="circle"
      onClick={toggleTheme}
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.030)' }}
    >
      {darkMode ? '🌞' : '🌚'}
    </Button>
  );
};

export default ToggleThemeButton;
