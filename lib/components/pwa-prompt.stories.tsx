import type { Meta, StoryObj } from '@storybook/react';

import { PwaPrompt } from './pwa-prompt.tsx';

import {
  Title,
  Subtitle,
  Description,
  Controls,
  Source,
} from '@storybook/blocks';

const meta: Meta<typeof PwaPrompt> = {
  component: PwaPrompt,
  parameters: {
    docs: {
      page: () => (
        <>
          <Title />
          <Subtitle />
          <Description of={Primary} />
          <Source />
          <Controls />
        </>
      ),
    },
  },
};

export default meta;
type Story = StoryObj<typeof PwaPrompt>;

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
    onClose: () => {
      alert('firing onClose callback');
    },
    permanentlyHideOnDismiss: true,
    promptOnVisit: 1,
    timesToShow: 1,
  },
  tags: ['autodocs'],
};
