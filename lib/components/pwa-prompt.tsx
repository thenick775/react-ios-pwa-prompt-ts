import { useCallback, type TransitionEvent } from 'react';

import { Prompt } from './prompt.tsx';
import { useUpdatePromptStorage } from '../hooks/use-update-prompt-storage.ts';
import { useShouldShowPrompt } from '../main.ts';

type PwaPromptProps = {
  className?: string;
  copyAddHomeButtonLabel?: string;
  copyBody?: string;
  copyClosePrompt?: string;
  copyShareButtonLabel?: string;
  copyTitle?: string;
  delay?: number;
  isOpen?: boolean;
  onClose?: (e: TransitionEvent) => void;
  permanentlyHideOnDismiss?: boolean;
  promptLocalStorageKey?: string;
  promptOnVisit?: number;
  skipStorageUpdate?: boolean;
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
  delay = 1000,
  isOpen = undefined,
  onClose = undefined,
  permanentlyHideOnDismiss = true,
  promptLocalStorageKey = PromptLocalStorageKey,
  promptOnVisit = 1,
  skipStorageUpdate = false,
  timesToShow = 1,
  transitionDuration = 400,
}: PwaPromptProps) => {
  const { shouldShowPrompt, setIosPwaPrompt } = useShouldShowPrompt({
    promptLocalStorageKey,
    promptOnVisit,
    timesToShow,
  });

  useUpdatePromptStorage({
    setIosPwaPrompt,
    skipStorageUpdate,
  });

  const onAfterDismiss = useCallback(
    (e: TransitionEvent) => {
      setIosPwaPrompt(
        (prevState) =>
          prevState && {
            ...prevState,
            visits: permanentlyHideOnDismiss
              ? promptOnVisit + timesToShow
              : prevState.visits,
            dismissedAt: Date.now(),
          }
      );

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

  if ((!shouldShowPrompt || isOpen === false) && !isOpen === true) return null;

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
