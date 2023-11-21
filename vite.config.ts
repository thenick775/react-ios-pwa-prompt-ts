/// <reference types="vitest" />
import { defineConfig } from 'vite';
import { resolve } from 'path';
import dts from 'vite-plugin-dts';

export default defineConfig({
  build: {
    lib: {
      // Could also be a dictionary or array of multiple entry points
      entry: resolve(__dirname, 'lib/main.ts'),
      name: 'react-ios-pwa-prompt-ts',
      // the proper extensions will be added
      fileName: 'react-ios-pwa-prompt-ts',
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: ['react', 'styled-components'],
      output: {
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {
          react: 'React',
          'styled-components': 'styled',
        },
      },
    },
  },
  plugins: [
    dts({
      rollupTypes: true,
      beforeWriteFile: (filePath, content) => ({
        filePath: filePath.replace('main', 'react-ios-pwa-prompt-ts'),
        content,
      }),
    }),
  ],
  test: {
    globals: true,
    clearMocks: true,
    environment: 'jsdom',
    setupFiles: './lib/test/setup.ts',
  },
});
