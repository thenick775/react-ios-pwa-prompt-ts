import {
  useCallback,
  useEffect,
  useLayoutEffect,
  type MouseEvent,
} from 'react';
import { useLocalStorage } from 'usehooks-ts';
import { useDeviceSelectors } from 'react-device-detect';

import { Prompt } from './prompt.tsx';

type PwaPromptProps = {
  timesToShow?: number;
  promptOnVisit?: number;
  permanentlyHideOnDismiss?: boolean;
  copyTitle?: string;
  copyBody?: string;
  copyShareButtonLabel?: string;
  copyAddHomeButtonLabel?: string;
  copyClosePrompt?: string;
  delay?: number;
  debug?: boolean;
  onClose?: (e: MouseEvent) => void;
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

export const PwaPromptDataKey = 'iosPwaPrompt';

export const PwaPrompt = ({
  timesToShow = 1,
  promptOnVisit = 1,
  permanentlyHideOnDismiss = true,
  copyTitle = 'Add to Home Screen',
  copyBody = 'This website has app functionality. Add it to your home screen to use it in fullscreen and while offline.',
  copyShareButtonLabel = "1) Press the 'Share' button on the menu bar below.",
  copyAddHomeButtonLabel = "2) Press 'Add to Home Screen'.",
  copyClosePrompt = 'Cancel',
  delay = 1000,
  debug = false,
  onClose = undefined,
}: PwaPromptProps) => {
  const [{ isIOS, isIPad13 }] = useDeviceSelectors(window.navigator.userAgent);

  const [iosPwaPrompt, setIosPwaPrompt] = useLocalStorage<PwaPromptData>(
    PwaPromptDataKey,
    {
      isiOS: deviceCheck(isIOS, isIPad13, window.navigator),
      visits: 0,
    }
  );

  useEffect(() => {
    if (iosPwaPrompt.isiOS)
      setIosPwaPrompt((prevState) => ({
        ...prevState,
        visits: prevState.visits + 1,
      }));
  }, [setIosPwaPrompt, iosPwaPrompt.isiOS]);

  useLayoutEffect(() => {
    setIosPwaPrompt((prevState) => ({
      ...prevState,
      isiOS: deviceCheck(isIOS, isIPad13, window.navigator),
    }));
  }, [setIosPwaPrompt, isIOS, isIPad13]);

  const onDismiss = useCallback(
    (e: MouseEvent) => {
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
