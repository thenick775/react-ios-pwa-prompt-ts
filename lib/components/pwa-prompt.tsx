import { useCallback, useState, type TransitionEvent } from 'react';

import { Prompt } from './prompt.tsx';
import { useUpdatePromptStorage } from '../hooks/use-update-prompt-storage.tsx';
import { useShouldShowPrompt } from '../main.ts';

type PwaPromptProps = {
  className?: string;
  copyAddHomeButtonLabel?: string;
  copyBody?: string;
  copyClosePrompt?: string;
  copyShareButtonLabel?: string;
  copyTitle?: string;
  isOpen?: boolean;
  delay?: number;
  onClose?: (e: TransitionEvent) => void;
  permanentlyHideOnDismiss?: boolean;
  promptLocalStorageKey?: string;
  promptOnVisit?: number;
  timesToShow?: number;
  transitionDuration?: number;
};

export const PromptLocalStorageKey = 'iosPwaPrompt';

export const PwaPrompt = ({
  className,
  copyAddHomeButtonLabel = "2) Press 'Add to Home Screen'.",
  copyBody = 'This website has app functionality. Add it to your home screen to use it in fullscreen and while offline.',
  copyClosePrompt = 'Cancel',
  copyShareButtonLabel = "1) Press the 'Share' button on the menu bar below.",
  copyTitle = 'Add to Home Screen',
  isOpen = false,
  delay = 1000,
  onClose = undefined,
  permanentlyHideOnDismiss = true,
  promptLocalStorageKey = PromptLocalStorageKey,
  promptOnVisit = 1,
  timesToShow = 1,
  transitionDuration = 400,
}: PwaPromptProps) => {
  const [isDismissed, setIsDismissed] = useState(false);

  const { shouldShowPrompt, setIosPwaPrompt } = useShouldShowPrompt({
    promptLocalStorageKey,
    promptOnVisit,
    timesToShow,
  });

  useUpdatePromptStorage(setIosPwaPrompt);

  const onAfterDismiss = useCallback(
    (e: TransitionEvent) => {
      if (permanentlyHideOnDismiss)
        setIosPwaPrompt((prevState) => ({
          ...prevState,
          visits: promptOnVisit + timesToShow,
        }));

      setIsDismissed(true);

      if (onClose) onClose(e);
    },
    [
      onClose,
      permanentlyHideOnDismiss,
      promptOnVisit,
      setIosPwaPrompt,
      timesToShow,
    ]
  );

  if ((!shouldShowPrompt || isDismissed) && !isOpen) {
    return null;
  }

  return (
    <Prompt
      className={className}
      delay={delay}
      copyTitle={copyTitle}
      copyBody={copyBody}
      copyAddHomeButtonLabel={copyAddHomeButtonLabel}
      copyShareButtonLabel={copyShareButtonLabel}
      copyClosePrompt={copyClosePrompt}
      onAfterDismiss={onAfterDismiss}
      transitionDuration={transitionDuration}
    />
  );
};
