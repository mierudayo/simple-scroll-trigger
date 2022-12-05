import path, { basename } from "path";
import { defineConfig } from "vite";

export default defineConfig(({ command, mode, ssrBuild }) => ({
  build:
    mode === "production"
      ? {
          lib: {
            entry: path.resolve(__dirname, "src/SimpleScrollTrigger.ts"),
            name: "SimpleScrollTrigger",
            fileName: "SimpleScrollTrigger",
          },
        }
      : {
          outDir: "doc",
          rollupOptions: {
            input: {
              main: path.resolve(__dirname, "example/index.html"),
            },
            output: {
              dir: "doc",
            },
          },
        },
  base: "/simpleScrollTrigger",
}));
