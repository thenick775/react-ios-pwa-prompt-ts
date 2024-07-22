import { renderHook } from '@testing-library/react';
import { beforeEach, describe, expect, it } from 'vitest';

import { usePromptStorage } from './use-prompt-storage.ts';
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

  it('returns undefined if withoutDefaults is true and storage has not been updated', () => {
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

  it('returns prompt data from storage if withoutDefaults is true', () => {
    localStorage.setItem(PromptLocalStorageKey, '{"isiOS":true,"visits":2}');

    const { result } = renderHook(() =>
      usePromptStorage(PromptLocalStorageKey, true)
    );

    const [storageData] = result.current;
    expect(storageData).toEqual({ isiOS: true, visits: 2 });
  });
});
