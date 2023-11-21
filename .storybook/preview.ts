import type { Preview } from '@storybook/react';
import { customUserAgents } from './userAgent';

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    userAgent: customUserAgents,
  },
};

export default preview;
