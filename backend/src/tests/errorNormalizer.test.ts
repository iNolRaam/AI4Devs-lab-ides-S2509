import { normalizeError } from '../utils/errorNormalizer';
import {
  ValidationError,
  DuplicateEmailError,
  FileTooLargeError,
  InvalidFileTypeError,
  InternalError,
  VALIDATION_ERROR,
  DUPLICATE_EMAIL,
  FILE_TOO_LARGE,
  INVALID_FILE_TYPE,
  INTERNAL_ERROR,
} from '../errors';

const isUuid = (value: string) => /[0-9a-fA-F-]{36}/.test(value);

describe('errorNormalizer', () => {
  it('maps ValidationError to DTO with fieldErrors', () => {
    const err = new ValidationError('Email is required', { field: 'email' });
    const dto = normalizeError(err);
    expect(dto.status).toBe(400);
    expect(dto.code).toBe(VALIDATION_ERROR);
    expect(dto.message).toBe('Email is required');
    expect(dto.fieldErrors).toEqual({ email: 'Email is required' });
    expect(isUuid(dto.errorId)).toBe(true);
  });

  it('supports details.fieldErrors map when provided', () => {
    const err = new ValidationError('Validation failed', {
      details: { fieldErrors: { firstName: 'First name is required.' } },
    } as any);
    const dto = normalizeError(err);
    expect(dto.status).toBe(400);
    expect(dto.code).toBe(VALIDATION_ERROR);
    expect(dto.fieldErrors).toEqual({ firstName: 'First name is required.' });
  });

  it('maps DuplicateEmailError correctly', () => {
    const err = new DuplicateEmailError();
    const dto = normalizeError(err);
    expect(dto.status).toBe(409);
    expect(dto.code).toBe(DUPLICATE_EMAIL);
    expect(dto.message).toBe('Email already exists');
    expect(dto.fieldErrors).toBeUndefined();
  });

  it('maps FileTooLargeError correctly', () => {
    const err = new FileTooLargeError();
    const dto = normalizeError(err);
    expect(dto.status).toBe(413);
    expect(dto.code).toBe(FILE_TOO_LARGE);
  });

  it('maps InvalidFileTypeError correctly', () => {
    const err = new InvalidFileTypeError();
    const dto = normalizeError(err);
    expect(dto.status).toBe(415);
    expect(dto.code).toBe(INVALID_FILE_TYPE);
  });

  it('maps InternalError correctly', () => {
    const err = new InternalError();
    const dto = normalizeError(err);
    expect(dto.status).toBe(500);
    expect(dto.code).toBe(INTERNAL_ERROR);
    expect(dto.message).toBe('Internal server error');
  });

  it('masks unknown Error to INTERNAL_ERROR with generic message and correlationId', () => {
    const err = new Error('Sensitive info: test@example.com');
    const dto = normalizeError(err, { requestId: 'req-123' });
    expect(dto.status).toBe(500);
    expect(dto.code).toBe(INTERNAL_ERROR);
    expect(dto.message).toBe('Something went wrong. Please try again.');
    expect(dto.details?.correlationId).toBe('req-123');
    // Ensure we never echo the original error message
    expect(dto.message).not.toContain('test@example.com');
  });

  it('handles non-Error throws', () => {
    // Simulate throwing a string
    const dto = normalizeError('boom');
    expect(dto.status).toBe(500);
    expect(dto.code).toBe(INTERNAL_ERROR);
    expect(dto.message).toBe('Something went wrong. Please try again.');
  });
});
