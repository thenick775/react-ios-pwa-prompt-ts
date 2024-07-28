import { usePromptStorage } from './use-prompt-storage.ts';

type UseShouldShowPromptProps = {
  promptLocalStorageKey: string;
  promptOnVisit?: number;
  timesToShow?: number;
  withoutDefaults?: boolean;
};

export const useShouldShowPrompt = ({
  promptLocalStorageKey,
  promptOnVisit = 1,
  timesToShow = 1,
  withoutDefaults = false,
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
    !iosPwaPrompt?.isPermanentlyDismissed &&
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
