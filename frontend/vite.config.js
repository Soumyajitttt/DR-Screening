import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    // Proxy /analyze calls to the Flask/MATLAB backend (webapp/app.py) during dev.
    // Update the target if the backend runs on a different port.
    proxy: {
      "/analyze": "http://localhost:5000",
      "/uploads": "http://localhost:5000"
    }
  }
});
