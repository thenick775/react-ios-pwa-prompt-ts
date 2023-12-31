import {
  Title,
  Subtitle,
  Description,
  Controls,
  Source,
  Story,
} from '@storybook/blocks';
import type { Meta, StoryObj } from '@storybook/react';
import { ComponentProps } from 'react';

import { PwaPrompt } from './pwa-prompt.tsx';

import { linkTo } from '@storybook/addon-links';

type PwaPromptPropsAndCustomArgs = ComponentProps<typeof PwaPrompt> & {
  useragent?: string;
};

const meta: Meta<PwaPromptPropsAndCustomArgs> = {
  component: PwaPrompt,
  parameters: {
    docs: {
      page: () => (
        <>
          <Title />
          <Subtitle />
          <Description of={Primary} />
          <button onClick={() => window.localStorage.clear()}>
            Clear localStorage
          </button>
          <p>
            Use the button below to view the pwa-prompt as it will appear in
            your application in a mobile viewport:
          </p>
          <button onClick={linkTo('components/pwa-prompt', 'primary')}>
            Go to pwa-prompt mobile view
          </button>
          <p>
            Use the button below to view the prompt component in a mobile
            viewport with no localstorage or conditional rendering:
          </p>
          <button onClick={linkTo('components/prompt')}>
            Go to prompt mobile view
          </button>
          <Story inline />
          <Source />
          <Controls />
        </>
      ),
    },
  },
  args: {
    useragent:
      'Mozilla/5.0 (iPhone; CPU iPhone OS 17_1_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.1 Mobile/15E148 Safari/604.1',
  },
};

export default meta;
type Story = StoryObj<PwaPromptPropsAndCustomArgs>;

/**
 * Here you can interact with the PwaPrompt as it will appear in your application.
 *
 * You can change the user agent using the tools above the story. By default, it will be set to a mobile iOS user agent.
 *
 * If you are not seeing the prompt component, either raise the timesToShow, clear your localstorage, or re-mount the component.
 */
export const Primary: Story = {
  render: (props) => <PwaPrompt {...props} />,
  args: {
    copyAddHomeButtonLabel: "2) Press 'Add to Home Screen'.",
    copyBody:
      'This website has app functionality. Add it to your home screen to use it in fullscreen and while offline.',
    copyClosePrompt: 'Cancel',
    copyShareButtonLabel: "1) Press the 'Share' button on the menu bar below.",
    copyTitle: 'Add to Home Screen',
    debug: false,
    delay: 1000,
    permanentlyHideOnDismiss: true,
    promptLocalStorageKey: 'iosPwaPrompt',
    promptOnVisit: 1,
    timesToShow: 1,
  },
  tags: ['autodocs'],
};
