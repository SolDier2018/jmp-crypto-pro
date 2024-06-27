import { defineConfig } from 'vite';
import { resolve } from 'path';
import react from '@vitejs/plugin-react';
import commonjs from 'vite-plugin-commonjs';
import dts from 'vite-plugin-dts';

export default defineConfig({
    plugins: [react(), commonjs(), dts()],
    server: {
        port: 3001,
    },
    build: {
        sourcemap: true,
        outDir: 'build',
        lib: {
            entry: './src/index.ts',
            name: 'CryptoProSignature',
            fileName: () => 'index.js',
        },
        terserOptions: {
            compress: {
                drop_console: false,
            },
        },
        rollupOptions: {
            external: ['react'],
            output: {
                globals: {
                    react: 'React',
                },
            },
        },
    },
});
