import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

export default defineConfig({
    plugins: [react()],
    base: './',
    resolve: {
        alias: {
            '@components': resolve(__dirname, 'src/components'),
            '@pages':      resolve(__dirname, 'src/pages'),
            '@hooks':      resolve(__dirname, 'src/hooks'),
            '@services':   resolve(__dirname, 'src/services'),
            '@utils':      resolve(__dirname, 'src/utils'),
            '@config':     resolve(__dirname, 'src/config'),
            '@stores':     resolve(__dirname, 'src/stores'),
            '@i18n':       resolve(__dirname, 'src/i18n'),
            '@error':      resolve(__dirname, 'src/error'),
            '@styles':     resolve(__dirname, 'src/styles'),
            '@features':   resolve(__dirname, 'src/features'),
        },
    },
})