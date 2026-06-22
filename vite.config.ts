import { resolve } from "node:path";
import { cloudflare } from "@cloudflare/vite-plugin";
import { defineConfig } from "vite";

const root = import.meta.dirname;

export default defineConfig({
  plugins: [cloudflare()],
  build: {
    rolldownOptions: {
      input: {
        main: resolve(root, 'index.html'),
        sketch: resolve(root, 'src/sketch/sketch.html')
      }
    }
  }
})
