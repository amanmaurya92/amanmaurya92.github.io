import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const base = env.VITE_BASE_PATH || "/";
  return {
    plugins: [react()],
    base: base.endsWith("/") ? base : `${base}/`,
    server: {
      port: 5173,
      proxy: {
        "/api": {
          target: env.VITE_PROXY_API || "http://localhost:5000",
          changeOrigin: true,
        },
      },
    },
    build: {
      outDir: "dist",
      sourcemap: false,
    },
  };
});
