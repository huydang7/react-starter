import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
import tsconfigPaths from "vite-tsconfig-paths";
import vitePluginRequire from "vite-plugin-require";
import environmentPlugin from "vite-plugin-environment";

const configs = ({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

  return defineConfig({
    plugins: [
      react(),
      svgr(),
      tsconfigPaths(),
      environmentPlugin("all", { prefix: "ENV_" }),
      vitePluginRequire(),
    ],
    server: {
      port: 8000,
    },
    build: {
      outDir: "build",
    },
  });
};

export default configs;
