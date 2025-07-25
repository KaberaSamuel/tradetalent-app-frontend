import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite"; // Import the new v4 Vite plugin

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
});
