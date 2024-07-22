import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import * as rddExports from 'react-device-detect';
import {
  afterAll,
  afterEach,
  beforeAll,
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from 'vitest';

import { PwaPrompt } from './pwa-prompt.tsx';



type iOSNavigator = Navigator & { standalone?: boolean };

describe('<PwaPrompt />', () => {
  beforeAll(() => {
    const date = Date.UTC(2001, 0, 1);
    vi.setSystemTime(date);
  });

  beforeEach(() => {
    vi.spyOn(rddExports, 'useDeviceSelectors').mockReturnValue([
      {
        isIOS: true,
        isIPad13: false,
      },
    ]);
    vi.spyOn(window, 'navigator', 'get').mockReturnValue({
      standalone: false,
    } as iOSNavigator);
  });

  afterEach(() => {
    localStorage.clear();
  });

  afterAll(() => {
    vi.useRealTimers();
  });

  it('renders Prompt if on an iOS browser not in standalone mode', async () => {
    render(<PwaPrompt />);

    // Wait for the delay to pass
    await waitFor(() => {
      expect(screen.getByTestId('prompt-overlay')).toBeInTheDocument();
    });

    expect(screen.getByTestId('prompt-wrapper')).toBeInTheDocument();
    expect(window.localStorage.getItem('iosPwaPrompt')).toEqual(
      '{"isiOS":true,"visits":1}'
    );
  });

  it('renders Prompt if on an ipad iOS browser not in standalone mode', async () => {
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
    expect(window.localStorage.getItem('iosPwaPrompt')).toEqual(
      '{"isiOS":true,"visits":1}'
    );
  });

  it('does not render Prompt if not an ipad or iOS browser', () => {
    vi.spyOn(rddExports, 'useDeviceSelectors').mockReturnValue([
      {
        isIOS: false,
        isIPad13: false,
      },
    ]);

    render(<PwaPrompt />);

    expect(screen.queryByTestId('prompt-overlay')).not.toBeInTheDocument();
    expect(screen.queryByTestId('prompt-wrapper')).not.toBeInTheDocument();
    expect(window.localStorage.getItem('iosPwaPrompt')).toEqual(
      '{"isiOS":false,"visits":0}'
    );
  });

  it('does not render Prompt if already in standalone mode', async () => {
    vi.spyOn(window, 'navigator', 'get').mockReturnValue({
      standalone: true,
    } as iOSNavigator);

    render(<PwaPrompt />);

    expect(screen.queryByTestId('prompt-overlay')).not.toBeInTheDocument();
    expect(screen.queryByTestId('prompt-wrapper')).not.toBeInTheDocument();
    expect(window.localStorage.getItem('iosPwaPrompt')).toEqual(
      '{"isiOS":false,"visits":0}'
    );
  });

  it('renders Prompt when controlled', () => {
    window.localStorage.setItem('iosPwaPrompt', '{"isiOS":true,"visits":2}');

    render(<PwaPrompt isOpen={true} />);

    expect(screen.getByTestId('prompt-wrapper')).toBeInTheDocument();
    expect(window.localStorage.getItem('iosPwaPrompt')).toEqual(
      '{"isiOS":true,"visits":3}'
    );
  });

  it('does not render Prompt when controlled', () => {
    render(<PwaPrompt isOpen={false} />);

    expect(screen.queryByTestId('prompt-overlay')).not.toBeInTheDocument();
    expect(screen.queryByTestId('prompt-wrapper')).not.toBeInTheDocument();
    expect(window.localStorage.getItem('iosPwaPrompt')).toEqual(
      '{"isiOS":true,"visits":1}'
    );
  });

  it('dismisses Prompt using overlay', async () => {
    const user = userEvent.setup();

    render(<PwaPrompt />);

    // Wait for the delay to pass
    await waitFor(() => {
      expect(screen.getByTestId('prompt-overlay')).toBeVisible();
    });

    // Dismiss the prompt
    await user.click(screen.getByTestId('prompt-overlay'));

    fireEvent.transitionEnd(screen.getByTestId('prompt-wrapper'));

    expect(screen.queryByTestId('prompt-overlay')).not.toBeInTheDocument();
    expect(screen.queryByTestId('prompt-wrapper')).not.toBeInTheDocument();
    expect(window.localStorage.getItem('iosPwaPrompt')).toEqual(
      '{"isiOS":true,"visits":2,"dismissedAt":978307200000}'
    );
  });

  it('dismisses Prompt using button', async () => {
    const user = userEvent.setup();

    render(<PwaPrompt />);

    // Wait for the delay to pass
    await waitFor(() => {
      expect(screen.getByTestId('prompt-overlay')).toBeVisible();
    });

    // Dismiss the prompt
    await user.click(screen.getByTestId('prompt-dismiss-button'));

    fireEvent.transitionEnd(screen.getByTestId('prompt-wrapper'));

    expect(screen.queryByTestId('prompt-overlay')).not.toBeInTheDocument();
    expect(screen.queryByTestId('prompt-wrapper')).not.toBeInTheDocument();
    expect(window.localStorage.getItem('iosPwaPrompt')).toEqual(
      '{"isiOS":true,"visits":2,"dismissedAt":978307200000}'
    );
  });

  it('calls onClose callback when prompt is dismissed by overlay', async () => {
    const onCloseMock = vi.fn();
    const user = userEvent.setup();

    render(<PwaPrompt onClose={onCloseMock} />);

    // Wait for the delay to pass
    await waitFor(() => {
      expect(screen.getByTestId('prompt-overlay')).toBeVisible();
    });

    // Dismiss the prompt
    await user.click(screen.getByTestId('prompt-overlay'));

    // transition end is not fired normally, we need to simulate a transition to call the callback func
    fireEvent.transitionEnd(screen.getByTestId('prompt-wrapper'));

    // Check if the onClose callback was called
    expect(onCloseMock).toHaveBeenCalledTimes(1);
    expect(window.localStorage.getItem('iosPwaPrompt')).toEqual(
      '{"isiOS":true,"visits":2,"dismissedAt":978307200000}'
    );
  });

  it('calls onClose callback when prompt is dismissed by button', async () => {
    const onCloseMock = vi.fn();
    const user = userEvent.setup();

    render(<PwaPrompt onClose={onCloseMock} />);

    // Wait for the delay to pass
    await waitFor(() => {
      expect(screen.getByTestId('prompt-overlay')).toBeVisible();
    });

    // Dismiss the prompt
    await user.click(screen.getByTestId('prompt-dismiss-button'));

    // transition end is not fired normally, we need to simulate a transition to call the callback func
    fireEvent.transitionEnd(screen.getByTestId('prompt-wrapper'));

    // Check if the onClose callback was called
    expect(onCloseMock).toHaveBeenCalledTimes(1);
    expect(window.localStorage.getItem('iosPwaPrompt')).toEqual(
      '{"isiOS":true,"visits":2,"dismissedAt":978307200000}'
    );
  });
});
