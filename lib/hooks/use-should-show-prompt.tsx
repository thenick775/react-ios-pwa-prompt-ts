import { useLocalStorage } from 'usehooks-ts';

type UseShouldShowPromptProps = {
  promptLocalStorageKey: string;
  promptOnVisit?: number;
  timesToShow?: number;
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

export const useShouldShowPrompt = ({
  promptLocalStorageKey,
  promptOnVisit = 1,
  timesToShow = 1,
}: UseShouldShowPromptProps) => {
  const [iosPwaPrompt, setIosPwaPrompt] = usePromptStorage(
    promptLocalStorageKey
  );

  const aboveMinVisits = iosPwaPrompt.visits >= promptOnVisit;
  const belowMaxVisits = iosPwaPrompt.visits < promptOnVisit + timesToShow;

  return {
    iosPwaPrompt,
    setIosPwaPrompt,
    shouldShowPrompt: iosPwaPrompt.isiOS && aboveMinVisits && belowMaxVisits,
  };
};
