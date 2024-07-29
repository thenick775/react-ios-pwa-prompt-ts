import { renderHook } from '@testing-library/react';
import * as rddExports from 'react-device-detect';
import { vi, describe, it, expect } from 'vitest';

import { useUpdatePromptStorage } from './use-update-prompt-storage.ts';

type iOSNavigator = Navigator & { standalone?: boolean };

describe('useUpdatePromptStorage', () => {
  const setIosPwaPromptSpy = vi.fn((cb) => cb({}));

  it('should update visits for iOS devices', () => {
    vi.spyOn(rddExports, 'useDeviceSelectors').mockReturnValue([
      {
        isIOS: true,
        isIPad13: false,
      },
    ]);
    vi.spyOn(window, 'navigator', 'get').mockReturnValue({
      standalone: false,
    } as iOSNavigator);

    renderHook(() =>
      useUpdatePromptStorage({
        setIosPwaPrompt: setIosPwaPromptSpy,
        skipStorageUpdate: false,
      })
    );

    expect(setIosPwaPromptSpy).toHaveBeenCalledOnce();
    expect(setIosPwaPromptSpy).toReturnWith({ isiOS: true, visits: 1 });
  });

  it('should update visits for iOS devices when storage exists', () => {
    vi.spyOn(rddExports, 'useDeviceSelectors').mockReturnValue([
      {
        isIOS: true,
        isIPad13: false,
      },
    ]);
    vi.spyOn(window, 'navigator', 'get').mockReturnValue({
      standalone: false,
    } as iOSNavigator);
    const setIosPwaPromptSpy = vi.fn((cb) => cb({ visits: 1, isiOS: true }));

    renderHook(() =>
      useUpdatePromptStorage({
        setIosPwaPrompt: setIosPwaPromptSpy,
        skipStorageUpdate: false,
      })
    );

    expect(setIosPwaPromptSpy).toHaveBeenCalledOnce();
    expect(setIosPwaPromptSpy).toReturnWith({ isiOS: true, visits: 2 });
  });

  it('should not update visits when skipStorageUpdate is true', () => {
    vi.spyOn(rddExports, 'useDeviceSelectors').mockReturnValue([
      {
        isIOS: true,
        isIPad13: false,
      },
    ]);
    vi.spyOn(window, 'navigator', 'get').mockReturnValue({
      standalone: false,
    } as iOSNavigator);

    renderHook(() =>
      useUpdatePromptStorage({
        setIosPwaPrompt: setIosPwaPromptSpy,
        skipStorageUpdate: true,
      })
    );

    expect(setIosPwaPromptSpy).not.toHaveBeenCalled();
  });

  it('should not update visits for non-iOS devices', () => {
    vi.spyOn(rddExports, 'useDeviceSelectors').mockReturnValue([
      {
        isIOS: false,
        isIPad13: false,
      },
    ]);
    vi.spyOn(window, 'navigator', 'get').mockReturnValue({
      standalone: false,
    } as iOSNavigator);

    renderHook(() =>
      useUpdatePromptStorage({
        setIosPwaPrompt: setIosPwaPromptSpy,
        skipStorageUpdate: false,
      })
    );

    expect(setIosPwaPromptSpy).toHaveBeenCalledOnce();
    expect(setIosPwaPromptSpy).toReturnWith({ isiOS: false, visits: 0 });
  });

  it('should not update visits if permanently dismissed', () => {
    vi.spyOn(rddExports, 'useDeviceSelectors').mockReturnValue([
      {
        isIOS: true,
        isIPad13: false,
      },
    ]);
    vi.spyOn(window, 'navigator', 'get').mockReturnValue({
      standalone: false,
    } as iOSNavigator);
    const setIosPwaPromptSpy = vi.fn((cb) =>
      cb({ visits: 1, isiOS: true, isPermanentlyDismissed: true })
    );

    renderHook(() =>
      useUpdatePromptStorage({
        setIosPwaPrompt: setIosPwaPromptSpy,
        skipStorageUpdate: false,
      })
    );

    expect(setIosPwaPromptSpy).toHaveBeenCalledOnce();
    expect(setIosPwaPromptSpy).toReturnWith({
      isiOS: true,
      visits: 1,
      isPermanentlyDismissed: true,
    });
  });

  it('should not update visits if already in standalone', () => {
    vi.spyOn(rddExports, 'useDeviceSelectors').mockReturnValue([
      {
        isIOS: true,
        isIPad13: false,
      },
    ]);
    vi.spyOn(window, 'navigator', 'get').mockReturnValue({
      standalone: true,
    } as iOSNavigator);

    renderHook(() =>
      useUpdatePromptStorage({
        setIosPwaPrompt: setIosPwaPromptSpy,
        skipStorageUpdate: false,
      })
    );

    expect(setIosPwaPromptSpy).toHaveBeenCalledOnce();
    expect(setIosPwaPromptSpy).toReturnWith({
      isiOS: false,
      visits: 0,
    });
  });
});
