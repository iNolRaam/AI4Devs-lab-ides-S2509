import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import CandidateForm from './CandidateForm';

describe('CandidateForm', () => {
  it('renders the candidate form dialog', () => {
    render(<CandidateForm />);
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByText(/add candidate/i)).toBeInTheDocument();
    // Accessibility: dialog has heading
    expect(screen.getByRole('heading', { name: /add candidate/i })).toBeInTheDocument();
  });

  it('calls onClose when Close button is clicked', () => {
    const mockClose = jest.fn();
    render(<CandidateForm onClose={mockClose} />);
    fireEvent.click(screen.getByRole('button', { name: /close/i }));
    expect(mockClose).toHaveBeenCalledTimes(1);
  });
  it('is responsive at small screen widths', () => {
    window.innerWidth = 375;
    render(<CandidateForm />);
    const dialog = screen.getByRole('dialog');
    // Responsive style check (width)
    expect(dialog).toHaveStyle('width: 100vw');
  });
});
