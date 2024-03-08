import { Title, Subtitle, Controls, Story, Stories } from '@storybook/blocks';
import type { Meta, StoryObj } from '@storybook/react';
import { ComponentProps, useState } from 'react';

import { PwaPrompt } from './pwa-prompt.tsx';

import { linkTo } from '@storybook/addon-links';

type PwaPromptPropsAndCustomArgs = ComponentProps<typeof PwaPrompt> & {
  useragent?: string;
};

const meta: Meta<PwaPromptPropsAndCustomArgs> = {
  component: PwaPrompt,
  parameters: {
    docs: {
      story: {
        height: '350px',
        inline: false,
      },
      page: () => (
        <>
          <Title />
          <Subtitle />
          <p>
            If you are not seeing the prompt, either raise the timesToShow,
            clear your localstorage using the button below, or re-mount the
            component.
          </p>
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
          <p>
            You can change the user agent using the tools above the story. By
            default, it will be set to a mobile iOS user agent.
          </p>
          <Stories />
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
 * Here you can interact with the PwaPrompt as it will appear in your application with default arguments
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
    isOpen: false,
    delay: 1000,
    permanentlyHideOnDismiss: true,
    promptLocalStorageKey: 'iosPwaPrompt',
    promptOnVisit: 1,
    timesToShow: 1,
    transitionDuration: 400,
  },
  tags: ['autodocs'],
};

/**
 * Here is a basic example of using this prompt as a controlled component.
 * This can be used to reactivate the prompt based on a user interaction on demand.
 */
export const Controlled: Story = {
  render: (props) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <>
        <button
          onClick={() => {
            setIsOpen((prevState) => !prevState);
          }}
        >
          Open Prompt
        </button>
        <PwaPrompt
          {...props}
          isOpen={isOpen}
          onClose={() => {
            setIsOpen(false);
          }}
        />
      </>
    );
  },
  args: {
    promptLocalStorageKey: 'iosPwaPrompt-controlled',
  },
  tags: ['autodocs'],
};
