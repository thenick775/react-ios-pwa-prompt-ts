import { useLayoutEffect } from 'react';
import { useDeviceSelectors } from 'react-device-detect';
import { PwaPromptData } from './use-should-show-prompt.tsx';

const deviceCheck = (isIOS: boolean, navigator: Navigator) => {
  const isStandalone =
    !!navigator && 'standalone' in navigator && navigator.standalone;

  return isIOS && !isStandalone;
};

export const useUpdatePromptStorage = (
  setIosPwaPrompt: React.Dispatch<React.SetStateAction<PwaPromptData>>
) => {
  const [{ isIOS, isIPad13 }] = useDeviceSelectors(window.navigator.userAgent);

  // runs once on mount, determines if iOS/iPadOS and increments visit counter
  useLayoutEffect(() => {
    const isiOS = deviceCheck(isIOS || isIPad13, window.navigator);
    setIosPwaPrompt((prevState) => ({
      isiOS,
      visits: isiOS ? prevState.visits + 1 : prevState.visits,
    }));
  }, [setIosPwaPrompt, isIOS, isIPad13]);
};
