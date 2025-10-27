import {
  VALIDATION_ERROR,
  DUPLICATE_EMAIL,
  FILE_TOO_LARGE,
  INVALID_FILE_TYPE,
  INTERNAL_ERROR,
  ValidationError,
  DuplicateEmailError,
  FileTooLargeError,
  InvalidFileTypeError,
  InternalError,
} from '../errors';

describe('Canonical Error Codes', () => {
  it('should export all error codes', () => {
    expect(VALIDATION_ERROR).toBe('VALIDATION_ERROR');
    expect(DUPLICATE_EMAIL).toBe('DUPLICATE_EMAIL');
    expect(FILE_TOO_LARGE).toBe('FILE_TOO_LARGE');
    expect(INVALID_FILE_TYPE).toBe('INVALID_FILE_TYPE');
    expect(INTERNAL_ERROR).toBe('INTERNAL_ERROR');
  });
});

describe('Typed Error Classes', () => {
  it('ValidationError should map to 400 and VALIDATION_ERROR', () => {
    const err = new ValidationError('fail', { field: 'email' });
    expect(err.code).toBe(VALIDATION_ERROR);
    expect(err.status).toBe(400);
    expect(err.field).toBe('email');
  });

  it('DuplicateEmailError should map to 409 and DUPLICATE_EMAIL', () => {
    const err = new DuplicateEmailError();
    expect(err.code).toBe(DUPLICATE_EMAIL);
    expect(err.status).toBe(409);
    expect(err.field).toBe('email');
  });

  it('FileTooLargeError should map to 413 and FILE_TOO_LARGE', () => {
    const err = new FileTooLargeError();
    expect(err.code).toBe(FILE_TOO_LARGE);
    expect(err.status).toBe(413);
  });

  it('InvalidFileTypeError should map to 415 and INVALID_FILE_TYPE', () => {
    const err = new InvalidFileTypeError();
    expect(err.code).toBe(INVALID_FILE_TYPE);
    expect(err.status).toBe(415);
  });

  it('InternalError should map to 500 and INTERNAL_ERROR', () => {
    const err = new InternalError();
    expect(err.code).toBe(INTERNAL_ERROR);
    expect(err.status).toBe(500);
  });
});
