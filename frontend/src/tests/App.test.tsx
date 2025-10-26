import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';

test('renders Recruiter Dashboard and Add Candidate button', () => {
  render(<App />);
  expect(screen.getByRole('heading', { name: /recruiter dashboard/i })).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /add candidate/i })).toBeInTheDocument();
});
