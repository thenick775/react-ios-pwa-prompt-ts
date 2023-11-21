import { render, screen, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, test, vi } from 'vitest';

import { PwaPrompt } from './pwa-prompt.tsx';

import * as rddExports from 'react-device-detect';

import { userEvent } from '@testing-library/user-event';

class LocalStorageMock {
  store: Record<string, unknown> = {};

  clear() {
    this.store = {};
  }

  getItem(key: string) {
    return this.store[key] || null;
  }

  setItem(key: string, value: unknown) {
    this.store[key] = value + '';
  }

  removeItem(key: string) {
    delete this.store[key];
  }
}

Object.defineProperty(window, 'localStorage', {
  value: new LocalStorageMock(),
});

describe('<PwaPrompt />', () => {
  beforeEach(() => {
    window.localStorage.clear();

    vi.spyOn(rddExports, 'useDeviceSelectors').mockReturnValue([
      {
        isIOS: true,
        isIPad13: false,
      },
    ]);
    vi.spyOn(window, 'navigator', 'get').mockReturnValue({
      standalone: false,
    } as unknown as Navigator);
  });

  test('renders PwaPrompt if on an iOS browser not in standalone mode', async () => {
    render(<PwaPrompt />);

    // Wait for the delay to pass
    await waitFor(() => {
      expect(screen.getByTestId('prompt-overlay')).toBeInTheDocument();
    });

    expect(screen.getByTestId('prompt-wrapper')).toBeInTheDocument();
  });

  test('renders PwaPrompt if on an ipad iOS browser not in standalone mode', async () => {
    vi.spyOn(rddExports, 'useDeviceSelectors').mockReturnValue([
      {
        isIOS: false,
        isIPad13: true,
      },
    ]);

    render(<PwaPrompt />);

    // Wait for the delay to pass
    await waitFor(() => {
      expect(screen.getByTestId('prompt-overlay')).toBeInTheDocument();
    });

    expect(screen.getByTestId('prompt-wrapper')).toBeInTheDocument();
  });

  test('does not render PwaPrompt if not an ipad or iOS browser', () => {
    vi.spyOn(rddExports, 'useDeviceSelectors').mockReturnValue([
      {
        isIOS: false,
        isIPad13: false,
      },
    ]);

    render(<PwaPrompt />);

    expect(screen.queryByTestId('prompt-overlay')).not.toBeInTheDocument();
    expect(screen.queryByTestId('prompt-wrapper')).not.toBeInTheDocument();
  });

  test('does not render PwaPrompt if already in standalone mode', async () => {
    vi.spyOn(window, 'navigator', 'get').mockReturnValue({
      standalone: true,
    } as unknown as Navigator);

    render(<PwaPrompt />);

    // Wait for the delay to pass
    expect(screen.queryByTestId('prompt-overlay')).not.toBeInTheDocument();
    expect(screen.queryByTestId('prompt-wrapper')).not.toBeInTheDocument();
  });

  test('dismisses PwaPrompt using overlay', async () => {
    const user = userEvent.setup();

    render(<PwaPrompt />);

    // Wait for the delay to pass
    await waitFor(
      () => {
        expect(screen.getByTestId('prompt-overlay')).toBeVisible();
      },
      { timeout: 3000 }
    );

    // Dismiss the prompt
    await user.click(screen.getByTestId('prompt-overlay'));

    expect(screen.queryByTestId('prompt-overlay')).not.toBeInTheDocument();
    expect(screen.queryByTestId('prompt-wrapper')).not.toBeInTheDocument();
  });

  test('dismisses PwaPrompt using button', async () => {
    const user = userEvent.setup();

    render(<PwaPrompt />);

    // Wait for the delay to pass
    await waitFor(
      () => {
        expect(screen.getByTestId('prompt-overlay')).toBeVisible();
      },
      { timeout: 3000 }
    );

    // Dismiss the prompt
    await user.click(screen.getByTestId('prompt-dismiss-button'));

    expect(screen.queryByTestId('prompt-overlay')).not.toBeInTheDocument();
    expect(screen.queryByTestId('prompt-wrapper')).not.toBeInTheDocument();
  });
});
