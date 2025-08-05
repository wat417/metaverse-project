import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";

export default defineConfig({
  base: "/", // Vercelではルートパスが基本
  plugins: [vue()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src")
    }
  },
  build: {
    outDir: "dist", // Vercelが公開するフォルダ
    emptyOutDir: true, // ビルド前に dist をクリア
    sourcemap: false, // 本番環境では不要
    rollupOptions: {
      input: path.resolve(__dirname, "index.html") // エントリーポイント
    }
  }
});