import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ErrorBanner } from '../components/ErrorBanner';

describe('ErrorBanner', () => {
  it('renders the message and has alert semantics', () => {
    render(<ErrorBanner message="Something went wrong" />);
    const alert = screen.getByRole('alert');
    expect(alert).toBeInTheDocument();
    expect(alert).toHaveAttribute('aria-live', 'polite');
    expect(alert).toHaveTextContent('Something went wrong');
  });

  it('renders a keyboard-accessible dismiss button and calls onDismiss', () => {
    const onDismiss = jest.fn();
    render(<ErrorBanner message="Error" onDismiss={onDismiss} />);
    const btn = screen.getByRole('button', { name: /dismiss error/i });
    fireEvent.click(btn);
    expect(onDismiss).toHaveBeenCalledTimes(1);
  });

  it('renders an optional retry button and calls onRetry', () => {
    const onRetry = jest.fn();
    render(<ErrorBanner message="Network error" onRetry={onRetry} retryLabel="Try again" />);
    const btn = screen.getByRole('button', { name: /try again/i });
    fireEvent.click(btn);
    expect(onRetry).toHaveBeenCalledTimes(1);
  });
});
