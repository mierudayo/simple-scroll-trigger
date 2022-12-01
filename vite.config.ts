import path from "path";
import { defineConfig } from "vite";

export default defineConfig(({ command, mode, ssrBuild }) => ({
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/SimpleScrollTrigger.ts"),
      name: "SimpleScrollTrigger",
      fileName: "SimpleScrollTrigger",
    },
    rollupOptions:
      mode === "development"
        ? {
            input: { main: path.resolve(__dirname, "example/index.html") },
          }
        : undefined,
  },
}));
