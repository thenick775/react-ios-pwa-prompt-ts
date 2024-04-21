import { useLayoutEffect } from 'react';
import { useDeviceSelectors } from 'react-device-detect';
import { PwaPromptData } from './use-should-show-prompt.tsx';

type UseUpdatePromptStorageProps = {
  setIosPwaPrompt: React.Dispatch<React.SetStateAction<PwaPromptData>>;
  skipStorageUpdate?: boolean;
};

const deviceCheck = (isIOS: boolean, navigator: Navigator) => {
  const isStandalone =
    !!navigator && 'standalone' in navigator && navigator.standalone;

  return isIOS && !isStandalone;
};

export const useUpdatePromptStorage = ({
  setIosPwaPrompt,
  skipStorageUpdate = false,
}: UseUpdatePromptStorageProps) => {
  const [{ isIOS, isIPad13 }] = useDeviceSelectors(window.navigator.userAgent);

  // runs once on mount, determines if iOS/iPadOS and increments visit counter
  useLayoutEffect(() => {
    if (!skipStorageUpdate) {
      const isiOS = deviceCheck(isIOS || isIPad13, window.navigator);
      setIosPwaPrompt((prevState) => ({
        isiOS,
        visits:
          isiOS && prevState ? prevState.visits + 1 : prevState?.visits || 0,
      }));
    }
  }, [setIosPwaPrompt, isIOS, isIPad13, skipStorageUpdate]);
};
