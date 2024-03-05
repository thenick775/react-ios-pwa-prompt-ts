import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { describe, expect, test, vi } from 'vitest';
import { userEvent } from '@testing-library/user-event';

import { Prompt } from './prompt.tsx';

const defaultProps = {
  delay: 1000,
  copyTitle: 'Test Title',
  copyBody: 'Test Body',
  copyAddHomeButtonLabel: 'Add to Home',
  copyShareButtonLabel: 'Share',
  copyClosePrompt: 'Close Prompt',
};

describe('<Prompt />', () => {
  test('renders Prompt component with provided props', async () => {
    const user = userEvent.setup();

    render(<Prompt {...defaultProps} />);

    // Check if the prompt and overlay are initially hidden
    expect(screen.queryByTestId('prompt-overlay')).not.toBeVisible();
    expect(screen.getByTestId('prompt-wrapper')).toHaveStyle({
      transform: 'translateY(calc(100% + 10px))',
    });

    // Wait for the delay to pass
    await waitFor(() => {
      expect(screen.getByTestId('prompt-overlay')).toBeVisible();
    });

    // Check if prompt is visible
    expect(screen.getByTestId('prompt-wrapper')).toHaveStyle({
      transform: 'translateY(0)',
    });

    // Check if the prompt content is rendered correctly
    expect(screen.getByText(defaultProps.copyTitle)).toBeInTheDocument();
    expect(screen.getByText(defaultProps.copyClosePrompt)).toBeInTheDocument();
    expect(screen.getByText(defaultProps.copyBody)).toBeInTheDocument();
    expect(
      screen.getByText(defaultProps.copyShareButtonLabel)
    ).toBeInTheDocument();
    expect(
      screen.getByText(defaultProps.copyAddHomeButtonLabel)
    ).toBeInTheDocument();

    // Test dismissing the prompt
    await user.click(screen.getByText(defaultProps.copyClosePrompt));
    await waitFor(() => {
      expect(screen.queryByTestId('prompt-overlay')).not.toBeVisible();
    });

    // Check if styles to move off screen are applied
    expect(screen.getByTestId('prompt-wrapper')).toHaveStyle({
      transform: 'translateY(calc(100% + 10px))',
    });

    // Check if PromptOverlay is not visible
    expect(screen.queryByTestId('prompt-overlay')).not.toBeVisible();
  });

  test('calls onAfterDismiss callback when prompt is dismissed by overlay', async () => {
    const onAfterDismissMock = vi.fn();
    const user = userEvent.setup();

    render(
      <Prompt {...defaultProps} delay={0} onAfterDismiss={onAfterDismissMock} />
    );

    // Check if the prompt is initially visible
    expect(screen.getByTestId('prompt-overlay')).toBeVisible();

    // Dismiss the prompt
    await user.click(screen.getByTestId('prompt-overlay'));

    // transition end is not fired normally, we need to simulate a transition to call the callback func
    fireEvent.transitionEnd(screen.getByTestId('prompt-wrapper'));

    // Check if the onAfterDismiss callback was called
    expect(onAfterDismissMock).toHaveBeenCalledTimes(1);
  });

  test('calls onAfterDismiss callback when prompt is dismissed by button', async () => {
    const onAfterDismissMock = vi.fn();
    const user = userEvent.setup();

    render(
      <Prompt {...defaultProps} delay={0} onAfterDismiss={onAfterDismissMock} />
    );

    // Check if the prompt is initially visible
    expect(screen.getByTestId('prompt-dismiss-button')).toBeVisible();

    // Dismiss the prompt
    await user.click(screen.getByTestId('prompt-dismiss-button'));

    // transition end is not fired normally, we need to simulate a transition to call the callback func
    fireEvent.transitionEnd(screen.getByTestId('prompt-wrapper'));

    // Check if the onAfterDismiss callback was called
    expect(onAfterDismissMock).toHaveBeenCalledTimes(1);
  });
});
