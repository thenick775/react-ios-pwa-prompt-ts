import { useLocalStorage } from 'usehooks-ts';

type UseShouldShowPromptProps = {
  promptLocalStorageKey: string;
  promptOnVisit?: number;
  timesToShow?: number;
  withoutDefaults?: boolean;
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
  withoutDefaults: boolean
) => {
  return useLocalStorage<PwaPromptData>(
    promptLocalStorageKey,
    !withoutDefaults
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
  withoutDefaults: withoutDefaults = false,
}: UseShouldShowPromptProps) => {
  const [iosPwaPrompt, setIosPwaPrompt] = usePromptStorage(
    promptLocalStorageKey,
    withoutDefaults
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
