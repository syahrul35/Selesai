import { defineConfig } from "vite";
import laravel from "laravel-vite-plugin";
import react from "@vitejs/plugin-react";

export default defineConfig({
    plugins: [
        laravel({ input: "resources/js/app.jsx", refresh: true }),
        react(),
    ],
    // server: {
    //     host: "https://selesai.syahrulmaulana.cloud",
    //     https: true,
    //     cors: false,
    //     hmr: { host: "https://selesai.syahrulmaulana.cloud" },
    // },
});
