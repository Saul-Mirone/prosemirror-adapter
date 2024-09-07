import { viteConfigFactory } from "../../vite.config";
import solidPlugin from "vite-plugin-solid";

export default viteConfigFactory(import.meta.url, {
  plugins: [solidPlugin()],
});
