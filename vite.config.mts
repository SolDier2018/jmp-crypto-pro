import { defineConfig } from 'vite';
import { resolve } from 'path';
import react from '@vitejs/plugin-react';
import commonjs from 'vite-plugin-commonjs';
import dts from 'vite-plugin-dts';

export default defineConfig({
    plugins: [react(), commonjs(), dts()],
    server: {
        port: 3000,
    },
    build: {
        sourcemap: true,
        commonjsOptions: { transformMixedEsModules: true },
        outDir: 'build',
        lib: {
            entry: resolve(__dirname, 'src/index.ts'),
            name: 'CryptoProSignature',
            fileName: (format) => `crypto-pro-signature.${format}.js`,
        },
        terserOptions: {
            compress: {
                drop_console: false,
            },
        },
    },
});
