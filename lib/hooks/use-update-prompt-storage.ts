import { Dispatch, SetStateAction, useLayoutEffect } from 'react';
import { useDeviceSelectors } from 'react-device-detect';

import { PwaPromptData } from './use-prompt-storage.ts';

type UseUpdatePromptStorageProps = {
  setIosPwaPrompt: Dispatch<SetStateAction<PwaPromptData>>;
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

  // determines if iOS/iPadOS and increments visit counter
  useLayoutEffect(() => {
    if (!skipStorageUpdate) {
      const isiOS = deviceCheck(isIOS || isIPad13, window.navigator);
      setIosPwaPrompt((prevState) => {
        const currentVisits = prevState?.visits ?? 0;
        return {
          ...prevState,
          isiOS,
          visits:
            isiOS && !prevState?.dismissedAt
              ? currentVisits + 1
              : currentVisits,
        };
      });
    }
  }, [setIosPwaPrompt, isIOS, isIPad13, skipStorageUpdate]);
};
