import { useLocalStorage } from 'usehooks-ts';

type UseShouldShowPromptProps = {
  promptLocalStorageKey: string;
  promptOnVisit?: number;
  timesToShow?: number;
  withOutDefaults?: boolean;
};

export type PwaPromptData =
  | {
      isiOS: boolean; // represents whether or not the device is considered iphone/ipad
      visits: number; // represents current prompt render (visit) count
      dismissedAt?: number; // represents when the user dismissed the prompt as a UTC epoch
    }
  | undefined;

export const usePromptStorage = (
  promptLocalStorageKey: string,
  withOutDefaults: boolean
) => {
  return useLocalStorage<PwaPromptData>(
    promptLocalStorageKey,
    !withOutDefaults
      ? {
          isiOS: false,
          visits: 0,
        }
      : undefined
  );
};

export const useShouldShowPrompt = ({
  promptLocalStorageKey,
  promptOnVisit = 1,
  timesToShow = 1,
  withOutDefaults = false,
}: UseShouldShowPromptProps) => {
  const [iosPwaPrompt, setIosPwaPrompt] = usePromptStorage(
    promptLocalStorageKey,
    withOutDefaults
  );

  const aboveMinVisits = iosPwaPrompt && iosPwaPrompt.visits >= promptOnVisit;
  const belowMaxVisits =
    iosPwaPrompt && iosPwaPrompt.visits < promptOnVisit + timesToShow;
  const shouldShowPrompt =
    iosPwaPrompt?.isiOS &&
    !iosPwaPrompt?.dismissedAt &&
    aboveMinVisits &&
    belowMaxVisits;

  return {
    aboveMinVisits,
    belowMaxVisits,
    iosPwaPrompt,
    setIosPwaPrompt,
    shouldShowPrompt,
  };
};
