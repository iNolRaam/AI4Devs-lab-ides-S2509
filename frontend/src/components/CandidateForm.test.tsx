import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import CandidateForm from './CandidateForm';

describe('CandidateForm', () => {
  it('renders the candidate form dialog', () => {
    render(<CandidateForm />);
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    // Check heading only (avoid duplicate text match)
    expect(screen.getByRole('heading', { name: /add candidate/i })).toBeInTheDocument();
  });
  it('shows character counters and caps input', () => {
    render(<CandidateForm />);
    const firstNameInput = screen.getByLabelText(/first name/i);
    fireEvent.change(firstNameInput, { target: { value: 'A'.repeat(50) } });
    expect(firstNameInput).toHaveValue('A'.repeat(40));
    expect(screen.getByText('40/40')).toBeInTheDocument();
  });

  it('preserves unsent form state in localStorage', () => {
    render(<CandidateForm />);
    const lastNameInput = screen.getByLabelText(/last name/i);
    fireEvent.change(lastNameInput, { target: { value: 'Smith' } });
    expect(JSON.parse(localStorage.getItem('candidateFormFields') || '{}').lastName).toBe('Smith');
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
    expect(dialog).toHaveStyle({ width: '100vw' });
  });

  it('shows confirmation message after successful submission', async () => {
    // Mock fetch to simulate successful API response
    globalThis.fetch = jest.fn(() => Promise.resolve({ ok: true })) as jest.Mock;
    render(<CandidateForm />);
    // Fill required fields
    fireEvent.change(screen.getByLabelText(/first name/i), { target: { value: 'John' } });
    fireEvent.change(screen.getByLabelText(/last name/i), { target: { value: 'Doe' } });
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'john.doe@example.com' } });
    fireEvent.change(screen.getByLabelText(/phone/i), { target: { value: '1234567890' } });
    fireEvent.change(screen.getByLabelText(/address/i), { target: { value: '123 Main St' } });
    fireEvent.change(screen.getByLabelText(/education/i), { target: { value: 'BSc' } });
    fireEvent.change(screen.getByLabelText(/work experience/i), { target: { value: '2 years' } });
    // Submit form
    fireEvent.click(screen.getByRole('button', { name: /^add candidate$/i }));
    // Wait for confirmation message
    const confirmation = await screen.findByText(/candidate added successfully/i);
    expect(confirmation).toBeInTheDocument();
    // Clean up fetch mock
    (globalThis.fetch as jest.Mock).mockRestore();
  });

  it('shows next actions after successful submission', async () => {
    globalThis.fetch = jest.fn(() => Promise.resolve({ ok: true })) as jest.Mock;
    const mockView = jest.fn();
    render(<CandidateForm onViewCandidate={mockView} />);
    // Fill required fields
    fireEvent.change(screen.getByLabelText(/first name/i), { target: { value: 'John' } });
    fireEvent.change(screen.getByLabelText(/last name/i), { target: { value: 'Doe' } });
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'john.doe@example.com' } });
    fireEvent.change(screen.getByLabelText(/phone/i), { target: { value: '1234567890' } });
    fireEvent.change(screen.getByLabelText(/address/i), { target: { value: '123 Main St' } });
    fireEvent.change(screen.getByLabelText(/education/i), { target: { value: 'BSc' } });
    fireEvent.change(screen.getByLabelText(/work experience/i), { target: { value: '2 years' } });
    fireEvent.click(screen.getByRole('button', { name: /^add candidate$/i }));
    // Wait for next actions UI
    const viewButton = await screen.findByRole('button', { name: /view candidate/i });
    const addAnotherButton = await screen.findByRole('button', { name: /add another candidate/i });
    expect(viewButton).toBeInTheDocument();
    expect(addAnotherButton).toBeInTheDocument();
  // Test View Candidate triggers callback
  fireEvent.click(viewButton);
  expect(mockView).toHaveBeenCalledTimes(1);
  // Test Add Another Candidate resets form
  fireEvent.click(addAnotherButton);
  expect(screen.getByLabelText(/first name/i)).toHaveValue('');
  (globalThis.fetch as jest.Mock).mockRestore();
  });
});
