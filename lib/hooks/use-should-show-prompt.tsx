import { useLayoutEffect } from 'react';
import { useDeviceSelectors } from 'react-device-detect';
import { useLocalStorage } from 'usehooks-ts';

const deviceCheck = (
  isIOS: boolean,
  isIPad13: boolean,
  navigator: Navigator
) => {
  const isStandalone =
    !!navigator && 'standalone' in navigator && navigator.standalone;

  return (isIOS || isIPad13) && !isStandalone;
};

type UseShouldShowPromptProps = {
  promptLocalStorageKey: string;
  promptOnVisit: number;
  timesToShow: number;
};

export type PwaPromptData = {
  isiOS: boolean;
  visits: number;
};

export const usePromptStorage = (promptLocalStorageKey: string) => {
  return useLocalStorage<PwaPromptData>(promptLocalStorageKey, {
    isiOS: false,
    visits: 0,
  });
};

export const useUpdatePromptStorage = (promptLocalStorageKey: string) => {
  const [, setIosPwaPrompt] = usePromptStorage(promptLocalStorageKey);
  const [{ isIOS, isIPad13 }] = useDeviceSelectors(window.navigator.userAgent);

  // runs once on mount, determines if iOS/iPadOS and increments visit counter
  useLayoutEffect(() => {
    const isiOS = deviceCheck(isIOS, isIPad13, window.navigator);
    setIosPwaPrompt((prevState) => ({
      isiOS,
      visits: isiOS ? prevState.visits + 1 : prevState.visits,
    }));
  }, [setIosPwaPrompt, isIOS, isIPad13]);
};

export const useShouldShowPrompt = ({
  promptLocalStorageKey,
  promptOnVisit,
  timesToShow,
}: UseShouldShowPromptProps) => {
  const [iosPwaPrompt] = usePromptStorage(promptLocalStorageKey);

  const aboveMinVisits = iosPwaPrompt.visits >= promptOnVisit;
  const belowMaxVisits = iosPwaPrompt.visits < promptOnVisit + timesToShow;

  return {
    ...iosPwaPrompt,
    shouldShowPrompt: iosPwaPrompt.isiOS && aboveMinVisits && belowMaxVisits,
  };
};
