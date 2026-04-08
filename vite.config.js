import { defineConfig, loadEnv } from "vite";
import laravel from "laravel-vite-plugin";
import react from "@vitejs/plugin-react";

export default defineConfig( ({ mode }) => {
    const env = loadEnv(mode, process.cwd());
    const host = env.VITE_HOST || "localhost";

    return {
        plugins: [
            laravel({ input: "resources/js/app.jsx", refresh: true }),
            react(),
        ],
        server: {
            host,
            https: env.VITE_HTTPS === "true",
            cors: env.VITE_CORS,

            hmr: {
                host,
            },
        },
    }
});
