import type { Meta, StoryObj } from '@storybook/react';

import { Prompt } from './prompt.tsx';

const meta: Meta<typeof Prompt> = {
  component: Prompt,
};

export default meta;
type Story = StoryObj<typeof Prompt>;

export const Primary: Story = {
  render: (props) => <Prompt {...props} />,
  args: {
    copyAddHomeButtonLabel: "2) Press 'Add to Home Screen'.",
    copyBody:
      'This website has app functionality. Add it to your home screen to use it in fullscreen and while offline.',
    copyClosePrompt: 'Cancel',
    copyShareButtonLabel: "1) Press the 'Share' button on the menu bar below.",
    copyTitle: 'Add to Home Screen',
    delay: 1000,
  },
};
