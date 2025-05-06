import { defineConfig } from "vite"
import react from "@vitejs/plugin-react-swc"
import mkcert from "vite-plugin-mkcert"
import framer from "vite-plugin-framer"

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react(), mkcert(), framer()],
    server: {
        port: 5178,
        strictPort: false,
    },
    build: {
        target: "ES2022",
        assetsInlineLimit: 0, // Don't inline any assets
        rollupOptions: {
            output: {
                manualChunks: undefined, // Don't split chunks
            },
        },
    },
})
