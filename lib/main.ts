// main component and data types
export { PwaPrompt } from './components/pwa-prompt.tsx';
export { PromptLocalStorageKey } from './components/consts.tsx';

// sub components for customization
export { Prompt } from './components/prompt.tsx';
export {
  PromptAddToHomeIcon,
  PromptBody,
  PromptCancelButton,
  PromptCopy,
  PromptDescription,
  PromptHeader,
  PromptInstructions,
  PromptInstructionStep,
  PromptOverlay,
  PromptShareIcon,
  PromptTitle,
  PromptWrapper,
} from './components/styled.tsx';
// hooks
export {
  usePromptStorage,
  type PwaPromptData,
} from './hooks/use-prompt-storage.ts';
export { useShouldShowPrompt } from './hooks/use-should-show-prompt.ts';
export { useUpdatePromptStorage } from './hooks/use-update-prompt-storage.ts';
