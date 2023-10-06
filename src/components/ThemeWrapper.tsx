import React, { useEffect } from 'react';
import { ConfigProvider } from 'antd';
import { darkTheme, lightTheme } from 'shared/theme';
import { useThemeStore } from 'stores/theme';

const ThemeWrapper = (props: { children: React.ReactNode }) => {
  const { darkMode } = useThemeStore();

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
    return () => {};
  }, [darkMode]);

  return (
    <ConfigProvider theme={darkMode ? darkTheme : lightTheme}>{props.children}</ConfigProvider>
  );
};

export default ThemeWrapper;
