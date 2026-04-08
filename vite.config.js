import { defineConfig, loadEnv } from "vite";
import laravel from "laravel-vite-plugin";
import react from "@vitejs/plugin-react";

export default defineConfig( ({ mode }) => {
    const env = loadEnv(mode, process.cwd());
    const isProduction = env.APP_ENV === "production";

    return {
        plugins: [
            laravel({ input: "resources/js/app.jsx", refresh: true }),
            react(),
        ],
        server: isProduction
            ? {
                  host: "env.VITE_HOST",
                  https: env.VITE_HTTPS === "true",
                  cors: env.VITE_CORS === "true",
                  hmr: {
                      host: "env.VITE_HOST",
                  },
              }
            : {
                  host: env.VITE_HOST || "localhost",
                  https: env.VITE_HTTPS === "true",
                  cors: env.VITE_CORS,
              },
    }
});
