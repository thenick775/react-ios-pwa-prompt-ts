import { useCallback, useLayoutEffect, type TransitionEvent } from 'react';
import { useLocalStorage } from 'usehooks-ts';
import { useDeviceSelectors } from 'react-device-detect';

import { Prompt } from './prompt.tsx';

type PwaPromptProps = {
  className?: string;
  copyAddHomeButtonLabel?: string;
  copyBody?: string;
  copyClosePrompt?: string;
  copyShareButtonLabel?: string;
  copyTitle?: string;
  debug?: boolean;
  delay?: number;
  onClose?: (e: TransitionEvent) => void;
  permanentlyHideOnDismiss?: boolean;
  promptLocalStorageKey?: string;
  promptOnVisit?: number;
  timesToShow?: number;
};

export type PwaPromptData = {
  isiOS: boolean;
  visits: number;
};

const deviceCheck = (
  isIOS: boolean,
  isIPad13: boolean,
  navigator: Navigator
) => {
  const isStandalone =
    !!navigator && 'standalone' in navigator && navigator.standalone;

  return (isIOS || isIPad13) && !isStandalone;
};

export const PromptLocalStorageKey = 'iosPwaPrompt';

export const PwaPrompt = ({
  className,
  copyAddHomeButtonLabel = "2) Press 'Add to Home Screen'.",
  copyBody = 'This website has app functionality. Add it to your home screen to use it in fullscreen and while offline.',
  copyClosePrompt = 'Cancel',
  copyShareButtonLabel = "1) Press the 'Share' button on the menu bar below.",
  copyTitle = 'Add to Home Screen',
  debug = false,
  delay = 1000,
  onClose = undefined,
  permanentlyHideOnDismiss = true,
  promptLocalStorageKey = PromptLocalStorageKey,
  promptOnVisit = 1,
  timesToShow = 1,
}: PwaPromptProps) => {
  const [{ isIOS, isIPad13 }] = useDeviceSelectors(window.navigator.userAgent);
  const [iosPwaPrompt, setIosPwaPrompt] = useLocalStorage<PwaPromptData>(
    promptLocalStorageKey,
    {
      isiOS: false,
      visits: 0,
    }
  );

  // runs once on mount, determines if iOS/iPadOS and increments visit counter
  useLayoutEffect(() => {
    const isiOS = deviceCheck(isIOS, isIPad13, window.navigator);
    setIosPwaPrompt((prevState) => ({
      isiOS,
      visits: isiOS ? prevState.visits + 1 : prevState.visits,
    }));
  }, [setIosPwaPrompt, isIOS, isIPad13]);

  const onDismiss = useCallback(
    (e: TransitionEvent) => {
      if (permanentlyHideOnDismiss)
        setIosPwaPrompt((prevState) => ({
          ...prevState,
          visits: timesToShow + promptOnVisit,
        }));

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

  const aboveMinVisits = iosPwaPrompt.visits >= promptOnVisit;
  const belowMaxVisits = iosPwaPrompt.visits < promptOnVisit + timesToShow;

  if ((!iosPwaPrompt.isiOS || !aboveMinVisits || !belowMaxVisits) && !debug) {
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
      onDismiss={onDismiss}
    />
  );
};
