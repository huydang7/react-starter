import React from 'react';
import { ConfigProvider } from 'antd';

import { darkTheme, lightTheme } from '@/shared/theme';
import { useThemeStore } from '@/stores/theme';

const ThemeWrapper = (props: { children: React.ReactNode }) => {
  const { darkMode } = useThemeStore();

  return (
    <ConfigProvider theme={darkMode ? darkTheme : lightTheme}>{props.children}</ConfigProvider>
  );
};

export default ThemeWrapper;
