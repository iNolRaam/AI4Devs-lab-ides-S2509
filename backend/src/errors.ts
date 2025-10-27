// Canonical error codes and typed error classes for backend

export const VALIDATION_ERROR = 'VALIDATION_ERROR';
export const DUPLICATE_EMAIL = 'DUPLICATE_EMAIL';
export const FILE_TOO_LARGE = 'FILE_TOO_LARGE';
export const INVALID_FILE_TYPE = 'INVALID_FILE_TYPE';
export const INTERNAL_ERROR = 'INTERNAL_ERROR';

export type ErrorCode =
  | typeof VALIDATION_ERROR
  | typeof DUPLICATE_EMAIL
  | typeof FILE_TOO_LARGE
  | typeof INVALID_FILE_TYPE
  | typeof INTERNAL_ERROR;

export interface TypedErrorOptions {
  message?: string;
  field?: string;
  details?: any;
}

export class ValidationError extends Error {
  code: ErrorCode = VALIDATION_ERROR;
  status: number = 400;
  field?: string;
  details?: any;
  constructor(message = 'Validation failed', opts: TypedErrorOptions = {}) {
    super(message);
    this.field = opts.field;
    this.details = opts.details;
  }
}

export class DuplicateEmailError extends Error {
  code: ErrorCode = DUPLICATE_EMAIL;
  status: number = 409;
  field?: string = 'email';
  constructor(message = 'Email already exists', opts: TypedErrorOptions = {}) {
    super(message);
    if (opts.field) this.field = opts.field;
  }
}

export class FileTooLargeError extends Error {
  code: ErrorCode = FILE_TOO_LARGE;
  status: number = 413;
  constructor(message = 'File too large') {
    super(message);
  }
}

export class InvalidFileTypeError extends Error {
  code: ErrorCode = INVALID_FILE_TYPE;
  status: number = 415;
  constructor(message = 'Invalid file type') {
    super(message);
  }
}

export class InternalError extends Error {
  code: ErrorCode = INTERNAL_ERROR;
  status: number = 500;
  constructor(message = 'Internal server error') {
    super(message);
  }
}
