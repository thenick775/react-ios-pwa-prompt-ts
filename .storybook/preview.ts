import { customUserAgents } from './userAgent.ts';

import type { Preview, Decorator } from '@storybook/react';

export const globalTypes = {
  userAgent: {
    name: 'User Agent',
    description: 'Spoof the User-Agent string inside the preview iframe',
    defaultValue: customUserAgents[0].userAgent,
    toolbar: {
      icon: 'browser',
      dynamicTitle: true,
      items: [
        ...customUserAgents.map(({ name, userAgent }) => ({
          value: userAgent,
          title: name,
        })),
      ],
    },
  },
};

function applyUserAgent(ua?: string) {
  Object.defineProperty(window.navigator, 'userAgent', {
    configurable: true,
    get: () => ua,
  });
}

export const decorators: Decorator[] = [
  (Story, context) => {
    applyUserAgent(context.globals.userAgent as string | undefined);
    return Story();
  },
];

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
  },
  initialGlobals: {
    backgrounds: { value: 'dark' },
    viewport: { value: 'mobile1', isRotated: false },
  },
};

export default preview;
