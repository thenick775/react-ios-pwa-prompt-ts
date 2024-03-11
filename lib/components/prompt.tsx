import { useState, useId, type TransitionEvent } from 'react';
import { useInterval, useScrollLock } from 'usehooks-ts';

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
  className?: string;
  onAfterDismiss?: (e: TransitionEvent) => void;
  transitionDuration?: number;
};

export const Prompt = ({
  className,
  copyAddHomeButtonLabel,
  copyBody,
  copyClosePrompt,
  copyShareButtonLabel,
  copyTitle,
  delay,
  onAfterDismiss,
  transitionDuration,
}: PromptProps) => {
  const [isVisible, setVisibility] = useState(!delay);
  const promptDescriptionId = useId();
  const promptTitleId = useId();

  useScrollLock();

  useInterval(() => setVisibility(true), delay && !isVisible ? delay : null);

  const dismissPrompt = () => setVisibility(false);

  return (
    <>
      <PromptOverlay
        data-testid="prompt-overlay"
        aria-label="Close"
        role="button"
        onClick={dismissPrompt}
        $isVisible={isVisible}
        $transitionDuration={transitionDuration && transitionDuration / 2}
      />
      <PromptWrapper
        className={className}
        data-testid="prompt-wrapper"
        aria-describedby={promptDescriptionId}
        aria-labelledby={promptTitleId}
        role="dialog"
        $isVisible={isVisible}
        onTransitionEnd={(e) => {
          if (onAfterDismiss && !isVisible) onAfterDismiss(e);
        }}
        $transitionDuration={transitionDuration}
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
