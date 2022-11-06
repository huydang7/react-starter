import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
const configs = ({ mode }) => {
  // const env = { ...process.env, ...loadEnv(mode, process.cwd()) };

  return defineConfig({
    plugins: [react(), svgr()],
    css: {
      preprocessorOptions: {
        less: {
          javascriptEnabled: true,
          modifyVars: {
            "@primary-color": "#157dc5",
            "@border-radius-base": "6px",
            "@height-lg": "38px",
            "@font-size-lg": "14px",
            "@btn-font-weight": "500",
          },
        },
      },
    },
  });
};

export default configs;
