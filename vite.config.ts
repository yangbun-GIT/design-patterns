import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// (추가) Node.js의 'path' 모듈을 불러옵니다.
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue()],

    // (추가) '@' 별칭(alias)을 설정합니다.
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
        },
    },
})
