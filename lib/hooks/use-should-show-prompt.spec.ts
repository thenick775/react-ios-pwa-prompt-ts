import { renderHook } from '@testing-library/react';
import {
  usePromptStorage,
  useShouldShowPrompt,
} from './use-should-show-prompt.ts';
import { beforeEach, describe, expect, it } from 'vitest';
import { PromptLocalStorageKey } from '../main.ts';

describe('usePromptStorage', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it('returns default values', () => {
    const { result } = renderHook(() =>
      usePromptStorage(PromptLocalStorageKey, false)
    );

    const [storageData] = result.current;
    expect(storageData).toEqual({ isiOS: false, visits: 0 });
  });

  it('returns undefined if withOutDefaults is true and storage has not been updated', () => {
    const { result } = renderHook(() =>
      usePromptStorage(PromptLocalStorageKey, true)
    );

    const [storageData] = result.current;
    expect(storageData).toBeUndefined();
  });

  it('returns prompt data from storage', () => {
    localStorage.setItem(PromptLocalStorageKey, '{"isiOS":true,"visits":2}');

    const { result } = renderHook(() =>
      usePromptStorage(PromptLocalStorageKey, false)
    );

    const [storageData] = result.current;
    expect(storageData).toEqual({ isiOS: true, visits: 2 });
  });

  it('returns prompt data from storage if withOutDefaults is true', () => {
    localStorage.setItem(PromptLocalStorageKey, '{"isiOS":true,"visits":2}');

    const { result } = renderHook(() =>
      usePromptStorage(PromptLocalStorageKey, true)
    );

    const [storageData] = result.current;
    expect(storageData).toEqual({ isiOS: true, visits: 2 });
  });
});

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
