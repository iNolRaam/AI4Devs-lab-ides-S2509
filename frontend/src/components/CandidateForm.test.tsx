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

  it('moves focus to first invalid field on client-side validation failure', () => {
    render(<CandidateForm />);
    // Submit immediately with empty required fields
    fireEvent.click(screen.getByRole('button', { name: /^add candidate$/i }));
    const firstNameInput = screen.getByLabelText(/first name/i);
    expect(firstNameInput).toHaveFocus();
    // And inline error is announced via aria-describedby
    expect(firstNameInput).toHaveAttribute('aria-invalid', 'true');
  });

  it('maps server fieldErrors and focuses the first invalid input', async () => {
    // Mock server returning a 400 with fieldErrors-like shape { errors: { email: 'taken' } }
    globalThis.fetch = jest.fn(() =>
      Promise.resolve({
        ok: false,
        status: 400,
        json: async () => ({ errors: { email: 'A candidate with this email already exists.' } }),
      })
    ) as jest.Mock;

    render(<CandidateForm />);
    // Fill required fields with valid values so only server validation triggers
    fireEvent.change(screen.getByLabelText(/first name/i), { target: { value: 'Jane' } });
    fireEvent.change(screen.getByLabelText(/last name/i), { target: { value: 'Doe' } });
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'jane@example.com' } });
    fireEvent.change(screen.getByLabelText(/phone/i), { target: { value: '+1 555 123 4567' } });
    fireEvent.change(screen.getByLabelText(/address/i), { target: { value: '123 Main St' } });
    fireEvent.change(screen.getByLabelText(/education/i), { target: { value: 'BSc' } });
    fireEvent.change(screen.getByLabelText(/work experience/i), { target: { value: '2 years' } });

    fireEvent.click(screen.getByRole('button', { name: /^add candidate$/i }));

    // The email input should receive focus
    const emailInput = await screen.findByLabelText(/email/i);
    expect(emailInput).toHaveFocus();
    expect(emailInput).toHaveAttribute('aria-invalid', 'true');
    expect(await screen.findByText(/already exists/i)).toBeInTheDocument();

    (globalThis.fetch as jest.Mock).mockRestore();
  });

  it('shows inline error and blocks submit for invalid CV file type', async () => {
    // Track if submit would attempt to call fetch
    globalThis.fetch = jest.fn(() => Promise.resolve({ ok: true }) as any) as jest.Mock;

    render(<CandidateForm />);

    // Fill required fields with valid values
    fireEvent.change(screen.getByLabelText(/first name/i), { target: { value: 'Jane' } });
    fireEvent.change(screen.getByLabelText(/last name/i), { target: { value: 'Doe' } });
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'jane.doe@example.com' } });
    fireEvent.change(screen.getByLabelText(/phone/i), { target: { value: '+1 555 123 4567' } });
    fireEvent.change(screen.getByLabelText(/address/i), { target: { value: '123 Main St' } });
    fireEvent.change(screen.getByLabelText(/education/i), { target: { value: 'BSc' } });
    fireEvent.change(screen.getByLabelText(/work experience/i), { target: { value: '2 years' } });

    // Select an invalid file type (text/plain)
  const fileInput = screen.getByLabelText(/cv upload/i);
    const badFile = new File(["hello"], "cv.txt", { type: "text/plain" });
    fireEvent.change(fileInput, { target: { files: [badFile] } });

    // Submit form
    fireEvent.click(screen.getByRole('button', { name: /^add candidate$/i }));

    // Inline error should be rendered and fetch NOT called
    expect(await screen.findByText(/upload a pdf or docx file/i)).toBeInTheDocument();
    expect(globalThis.fetch).not.toHaveBeenCalled();

    (globalThis.fetch as jest.Mock).mockRestore();
  });

  it('shows inline error and blocks submit when CV file is larger than 5 MB', async () => {
    globalThis.fetch = jest.fn(() => Promise.resolve({ ok: true }) as any) as jest.Mock;

    render(<CandidateForm />);

    // Fill required fields with valid values
    fireEvent.change(screen.getByLabelText(/first name/i), { target: { value: 'Jane' } });
    fireEvent.change(screen.getByLabelText(/last name/i), { target: { value: 'Doe' } });
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'jane.doe@example.com' } });
    fireEvent.change(screen.getByLabelText(/phone/i), { target: { value: '+1 555 123 4567' } });
    fireEvent.change(screen.getByLabelText(/address/i), { target: { value: '123 Main St' } });
    fireEvent.change(screen.getByLabelText(/education/i), { target: { value: 'BSc' } });
    fireEvent.change(screen.getByLabelText(/work experience/i), { target: { value: '2 years' } });

    // Create a PDF file slightly larger than 5 MB
    const bytes = new Uint8Array(5 * 1024 * 1024 + 1); // 5MB + 1 byte
    const bigPdf = new File([bytes], 'cv.pdf', { type: 'application/pdf' });

  const fileInput = screen.getByLabelText(/cv upload/i);
    fireEvent.change(fileInput, { target: { files: [bigPdf] } });

    // Submit form
    fireEvent.click(screen.getByRole('button', { name: /^add candidate$/i }));

    // Expect size error and that fetch was not called
    expect(await screen.findByText(/5 mb/i)).toBeInTheDocument();
    expect(globalThis.fetch).not.toHaveBeenCalled();

    (globalThis.fetch as jest.Mock).mockRestore();
  });

  it('shows global error banner on server failure (500) with assertive aria-live', async () => {
    globalThis.fetch = jest.fn(() => Promise.resolve({ ok: false, status: 500 })) as jest.Mock;

    render(<CandidateForm />);
    // Fill required fields
    fireEvent.change(screen.getByLabelText(/first name/i), { target: { value: 'John' } });
    fireEvent.change(screen.getByLabelText(/last name/i), { target: { value: 'Doe' } });
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'john.doe@example.com' } });
    fireEvent.change(screen.getByLabelText(/phone/i), { target: { value: '+1 555 123 4567' } });
    fireEvent.change(screen.getByLabelText(/address/i), { target: { value: '123 Main St' } });
    fireEvent.change(screen.getByLabelText(/education/i), { target: { value: 'BSc' } });
    fireEvent.change(screen.getByLabelText(/work experience/i), { target: { value: '2 years' } });

    fireEvent.click(screen.getByRole('button', { name: /^add candidate$/i }));

    const alert = await screen.findByRole('alert');
    expect(alert).toHaveTextContent(/we couldn’t save the candidate/i);
    expect(alert).toHaveAttribute('aria-live', 'assertive');

    (globalThis.fetch as jest.Mock).mockRestore();
  });

  it('shows global error banner on network failure with assertive aria-live', async () => {
    globalThis.fetch = jest.fn(() => Promise.reject(new Error('Network down'))) as jest.Mock;

    render(<CandidateForm />);
    // Fill required fields
    fireEvent.change(screen.getByLabelText(/first name/i), { target: { value: 'John' } });
    fireEvent.change(screen.getByLabelText(/last name/i), { target: { value: 'Doe' } });
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'john.doe@example.com' } });
    fireEvent.change(screen.getByLabelText(/phone/i), { target: { value: '+1 555 123 4567' } });
    fireEvent.change(screen.getByLabelText(/address/i), { target: { value: '123 Main St' } });
    fireEvent.change(screen.getByLabelText(/education/i), { target: { value: 'BSc' } });
    fireEvent.change(screen.getByLabelText(/work experience/i), { target: { value: '2 years' } });

    fireEvent.click(screen.getByRole('button', { name: /^add candidate$/i }));

    const alert = await screen.findByRole('alert');
    expect(alert).toHaveTextContent(/network error/i);
    expect(alert).toHaveAttribute('aria-live', 'assertive');

    (globalThis.fetch as jest.Mock).mockRestore();
  });
});
