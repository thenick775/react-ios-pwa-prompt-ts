import { renderHook } from '@testing-library/react';
import { beforeEach, describe, expect, it } from 'vitest';

import { useShouldShowPrompt } from './use-should-show-prompt.ts';
import { PromptLocalStorageKey } from '../main.ts';

describe('useShouldShowPrompt', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it('should return false if iosPwaPrompt storage has not been updated', () => {
    const { result } = renderHook(() =>
      useShouldShowPrompt({ promptLocalStorageKey: PromptLocalStorageKey })
    );

    const { aboveMinVisits, belowMaxVisits, shouldShowPrompt } = result.current;
    expect(aboveMinVisits).toBe(false);
    expect(belowMaxVisits).toBe(true);
    expect(shouldShowPrompt).toBe(false);
  });

  it('should return false if storage is defined but isiOS is false', () => {
    localStorage.setItem(PromptLocalStorageKey, '{"isiOS":false,"visits":1}');

    const { result } = renderHook(() =>
      useShouldShowPrompt({ promptLocalStorageKey: PromptLocalStorageKey })
    );

    const { aboveMinVisits, belowMaxVisits, shouldShowPrompt } = result.current;
    expect(aboveMinVisits).toBe(true);
    expect(belowMaxVisits).toBe(true);
    expect(shouldShowPrompt).toBe(false);
  });

  it('should return false if storage is defined but visits are below minimum', () => {
    localStorage.setItem(PromptLocalStorageKey, '{"isiOS":true,"visits":0}');

    const { result } = renderHook(() =>
      useShouldShowPrompt({ promptLocalStorageKey: PromptLocalStorageKey })
    );

    const { aboveMinVisits, belowMaxVisits, shouldShowPrompt } = result.current;
    expect(aboveMinVisits).toBe(false);
    expect(belowMaxVisits).toBe(true);
    expect(shouldShowPrompt).toBe(false);
  });

  it('should return true if storage is defined, isiOS is true, and visits are between min/max', () => {
    localStorage.setItem(PromptLocalStorageKey, '{"isiOS":true,"visits":1}');

    const { result } = renderHook(() =>
      useShouldShowPrompt({ promptLocalStorageKey: PromptLocalStorageKey })
    );

    const { aboveMinVisits, belowMaxVisits, shouldShowPrompt } = result.current;
    expect(aboveMinVisits).toBe(true);
    expect(belowMaxVisits).toBe(true);
    expect(shouldShowPrompt).toBe(true);
  });

  it('should return false if iosPwaPrompt is defined but visits is >= max', () => {
    localStorage.setItem(PromptLocalStorageKey, '{"isiOS":true,"visits":2}');

    const { result } = renderHook(() =>
      useShouldShowPrompt({ promptLocalStorageKey: PromptLocalStorageKey })
    );

    const { aboveMinVisits, belowMaxVisits, shouldShowPrompt } = result.current;
    expect(aboveMinVisits).toBe(true);
    expect(belowMaxVisits).toBe(false);
    expect(shouldShowPrompt).toBe(false);
  });
});
