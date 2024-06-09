import { ThemeConfig } from 'antd';
import antdTheme from 'antd/lib/theme';

export const lightTheme: ThemeConfig = {
  token: {
    fontFamily: 'Inter',
    colorPrimary: '#1a73e8',
    colorLink: '#1a73e8',
  },
  components: {
    Layout: {
      headerBg: '#f5f5f5',
    },
    Form: {
      itemMarginBottom: 16,
      verticalLabelPadding: '0 0 2px',
      labelHeight: 24,
    },
  },
  cssVar: true,
};

export const darkTheme: ThemeConfig = {
  token: {
    fontFamily: 'Inter',
    colorPrimary: '#1a73e8',
    colorLink: '#1a73e8',
    colorBgBase: '#141414',
    colorBgContainer: '#141414',
    colorBgElevated: '#141414',
  },
  components: {
    Layout: {
      bodyBg: '#141414',
      headerBg: '#141414',
      siderBg: '#141414',
      footerBg: '#141414',
    },
  },
  algorithm: antdTheme.darkAlgorithm,
  cssVar: true,
};
