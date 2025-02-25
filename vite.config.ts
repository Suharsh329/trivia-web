import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite'
import vue from '@vitejs/plugin-vue';
import vueDevTools from 'vite-plugin-vue-devtools';
import Components from 'unplugin-vue-components/vite';
import AutoImports from 'unplugin-auto-import/vite';

export default defineConfig({
  plugins: [
    vue(),
    tailwindcss(),
    vueDevTools(),
    AutoImports({
      imports: [
        { pinia: ['defineStore'] },
        { vue: ['computed', 'defineAsyncComponent', 'onMounted', 'ref', 'toRaw', 'toRefs', 'watch'] },
        'vue-router',
      ],
      dirs: [
        './src/stores/**',
      ]
    }),
    Components({
      dirs: ['./src/'],
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
});
