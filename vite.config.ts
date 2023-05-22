import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    proxy: {
      "/auth": {
        target: "https://dev.api.veelapp.com/",
        changeOrigin: true,
        secure: false,
        ws: true,
      },
    },
  },
});
