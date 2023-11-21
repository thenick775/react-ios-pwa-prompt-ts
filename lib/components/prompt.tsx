import { useState, useId, type MouseEvent } from 'react';

import { useInterval, useLockedBody } from 'usehooks-ts';
import {
  PromptOverlay,
  PromptBody,
  PromptCancelButton,
  PromptDescription,
  PromptHeader,
  PromptTitle,
  PromptWrapper,
  PromptShareIcon,
  PromptCopy,
  PromptInstructions,
  PromptInstructionStep,
  PromptAddToHomeIcon,
} from './styled.tsx';

type PromptProps = {
  delay: number;
  copyTitle: string;
  copyBody: string;
  copyAddHomeButtonLabel: string;
  copyShareButtonLabel: string;
  copyClosePrompt: string;
  onDismiss?: (e: MouseEvent) => void;
};

export const Prompt = ({
  delay,
  copyTitle,
  copyBody,
  copyAddHomeButtonLabel,
  copyShareButtonLabel,
  copyClosePrompt,
  onDismiss,
}: PromptProps) => {
  const [isVisible, setVisibility] = useState(!delay);
  const promptDescriptionId = useId();
  const promptTitleId = useId();

  useLockedBody(isVisible, 'root');

  useInterval(() => setVisibility(true), delay && !isVisible ? delay : null);

  const dismissPrompt = (e: MouseEvent) => {
    setVisibility(false);

    if (onDismiss) onDismiss(e);
  };

  return (
    <>
      <PromptOverlay
        data-testid="prompt-overlay"
        aria-label="Close"
        role="button"
        onClick={dismissPrompt}
        $isVisible={isVisible}
      />
      <PromptWrapper
        data-testid="prompt-wrapper"
        aria-describedby={promptDescriptionId}
        aria-labelledby={promptTitleId}
        role="dialog"
        $isVisible={isVisible}
      >
        <PromptHeader>
          <PromptTitle id={promptTitleId}>{copyTitle}</PromptTitle>
          <PromptCancelButton
            data-testid="prompt-dismiss-button"
            onClick={dismissPrompt}
          >
            {copyClosePrompt}
          </PromptCancelButton>
        </PromptHeader>
        <PromptBody>
          <PromptDescription>
            <PromptCopy id={promptDescriptionId}>{copyBody}</PromptCopy>
          </PromptDescription>
        </PromptBody>
        <PromptInstructions>
          <PromptInstructionStep>
            <PromptShareIcon />
            <PromptCopy $bold>{copyShareButtonLabel}</PromptCopy>
          </PromptInstructionStep>
          <PromptInstructionStep>
            <PromptAddToHomeIcon />
            <PromptCopy $bold>{copyAddHomeButtonLabel}</PromptCopy>
          </PromptInstructionStep>
        </PromptInstructions>
      </PromptWrapper>
    </>
  );
};
