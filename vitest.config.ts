import { defineConfig } from 'vitest/config';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'client'),
    },
  },
  test: {
    include: ['server/**/*.spec.ts', 'client/**/*.spec.ts'],
    environment: 'jsdom',
    globals: true,
  },
});
