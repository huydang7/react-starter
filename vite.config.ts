import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
// import path from "path";
// import tsconfigPaths from "vite-tsconfig-paths";
import EnvironmentPlugin from "vite-plugin-environment";
import svgr from "vite-plugin-svgr";

const configs = ({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

  return defineConfig({
    plugins: [
      react(),
      svgr(),
      // tsconfigPaths(),
      EnvironmentPlugin("all", { prefix: "ENV_" }),
    ],
    // resolve: {
    //   alias: [{ find: "@", replacement: path.resolve(__dirname, "src") }],
    // },
    server: {
      port: 8000,
      hmr: true,
    },
    build: {
      outDir: "build",
    },
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
