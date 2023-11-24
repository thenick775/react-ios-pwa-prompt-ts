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
 * Here you can interact with the PwaPrompt as it will appear in your application
 *
 * Remember to select the correct user agent using the tools above the story.
 *
 * If you are not seeing the prompt component, either raise the timesToShow, or clear your localstorage.
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
