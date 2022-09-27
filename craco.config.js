const CracoLessPlugin = require("craco-less");

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {
              "@primary-color": "#157dc5",
              "@border-radius-base": "6px",
              "@height-lg": "38px",
              "@font-size-lg": "14px",
              "@btn-font-weight": "500",
            },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};
