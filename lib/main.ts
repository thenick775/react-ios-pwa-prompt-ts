// main component and data types
export { PwaPrompt, PromptLocalStorageKey } from './components/pwa-prompt.tsx';
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
  useShouldShowPrompt,
  type PwaPromptData,
} from './hooks/use-should-show-prompt.ts';
export { useUpdatePromptStorage } from './hooks/use-update-prompt-storage.ts';
