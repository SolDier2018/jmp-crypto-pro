import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({

    build: {
        outDir: 'build',
        lib: {
            entry: resolve(__dirname, 'src/index.ts'),
            name: 'CryptoProSignature',
            fileName: (format) => `crypto-pro-signature.${format}.js`
        }
    }
})