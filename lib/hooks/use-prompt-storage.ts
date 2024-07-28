import { useLocalStorage } from 'usehooks-ts';

export type PwaPromptData =
  | {
      isiOS: boolean; // represents whether or not the device is considered iphone/ipad
      visits: number; // represents current prompt render (visit) count
      isPermanentlyDismissed?: boolean; // represents if the prompt is permanently dismissed
      lastDismissedAt?: number; // represents when the user last dismissed the prompt as a UTC epoch
    }
  | undefined;

export const usePromptStorage = (
  promptLocalStorageKey: string,
  withoutDefaults: boolean
) =>
  useLocalStorage<PwaPromptData>(
    promptLocalStorageKey,
    !withoutDefaults
      ? {
          isiOS: false,
          visits: 0,
        }
      : undefined
  );
