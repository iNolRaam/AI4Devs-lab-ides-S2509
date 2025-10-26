import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Dashboard from './Dashboard';

describe('Dashboard', () => {
  it('renders Add Candidate button with correct label and accessibility', () => {
    render(<Dashboard />);
    const button = screen.getByRole('button', { name: /add candidate/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent('Add Candidate');
    expect(button).toHaveAttribute('aria-label', 'Add Candidate');
    // Accessibility: button is focusable
    button.focus();
    expect(document.activeElement).toBe(button);
  });

  it('calls onAddCandidate when button is clicked', () => {
    const mockHandler = jest.fn();
    render(<Dashboard onAddCandidate={mockHandler} />);
    const button = screen.getByRole('button', { name: /add candidate/i });
    fireEvent.click(button);
    expect(mockHandler).toHaveBeenCalledTimes(1);
  });
  it('is responsive at small screen widths', () => {
    window.innerWidth = 375;
    render(<Dashboard />);
    const button = screen.getByRole('button', { name: /add candidate/i });
    // Responsive style check (font size)
    expect(button).toHaveStyle({ fontSize: '1.25rem' });
  });
});
