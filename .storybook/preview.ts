import { customUserAgents } from './userAgent';

import type { Preview } from '@storybook/react';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    userAgent: customUserAgents,
    options: {
      storySort: {
        order: ['components', ['pwa-prompt', 'prompt']],
      },
    },
    viewport: {
      defaultViewport: 'mobile1',
    },
    backgrounds: { default: 'dark' },
  },
};

export default preview;
