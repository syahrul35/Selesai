import { defineConfig } from "vite";
import laravel from "laravel-vite-plugin";
import react from "@vitejs/plugin-react";

export default defineConfig({
    plugins: [
        laravel({ input: "resources/js/app.jsx", refresh: true }),
        react(),
    ],
    server: {
        host: "72.61.214.176",
        https: false,
        cors: false,
        hmr: { host: "72.61.214.176" },
    },
});
