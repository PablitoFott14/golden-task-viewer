import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Use relative base so the build works on GitHub Pages, Vercel, or opened
// from any sub-path. Change `base` to "/<repo-name>/" if deploying to a
// project GitHub Pages URL.
export default defineConfig({
  base: "./",
  plugins: [react()],
});
