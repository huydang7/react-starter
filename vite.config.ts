import react from '@vitejs/plugin-react-swc';
import { defineConfig, loadEnv } from 'vite';
import vitePluginRequire from 'vite-plugin-require';
import svgr from 'vite-plugin-svgr';
import tsconfigPaths from 'vite-tsconfig-paths';

const configs = ({ mode }) => {
  const env = { ...process.env, ...loadEnv(mode, process.cwd()) };

  return defineConfig({
    plugins: [react(), svgr(), tsconfigPaths(), vitePluginRequire()],
    server: {
      port: env.VITE_PORT ? +env.VITE_PORT : 6868,
    },
    build: {
      outDir: 'build',
    },
  });
};

export default configs;
