// Frontend error types and decoder for server error DTOs

export type ErrorCode =
  | 'VALIDATION_ERROR'
  | 'DUPLICATE_EMAIL'
  | 'FILE_TOO_LARGE'
  | 'INVALID_FILE_TYPE'
  | 'INTERNAL_ERROR';

export type FieldErrors = Record<string, string>;

export interface ServerErrorDTO {
  errorId: string;
  status: number;
  code: ErrorCode;
  message: string;
  fieldErrors?: FieldErrors;
  details?: { correlationId?: string; hint?: string };
}

export interface AppError {
  status: number;
  code: ErrorCode;
  message: string;
  fieldErrors?: FieldErrors;
  requestId?: string;
  errorId?: string;
}

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

function hasResponseShape(value: unknown): value is {
  status: number;
  headers?: { get(name: string): string | null } | null;
  json?: () => Promise<any>;
  text?: () => Promise<string>;
} {
  return (
    isObject(value) &&
    typeof (value as any).status === 'number' &&
    (typeof (value as any).json === 'function' || typeof (value as any).text === 'function')
  );
}

/**
 * Decode a failed HTTP response or a thrown error into a normalized AppError.
 * - Reads X-Request-Id from headers when available.
 * - For server JSON matching the backend DTO, maps fields accordingly.
 * - For non-JSON or malformed payloads, falls back to INTERNAL_ERROR.
 * - Network failures (no response) map to INTERNAL_ERROR with status 0.
 */
export async function decodeError(input: unknown): Promise<AppError> {
  // Network error or unknown thrown
  if (!hasResponseShape(input)) {
    const appErr: AppError = {
      status: 0,
      code: 'INTERNAL_ERROR',
      message: 'Network error. Please try again.',
    };
    if (process.env.NODE_ENV !== 'production') {
      // eslint-disable-next-line no-console
      console.error('API Error', {
        status: appErr.status,
        code: appErr.code,
        message: appErr.message,
      });
    }
    return appErr;
  }

  const res = input;
  const requestId = res.headers?.get?.('X-Request-Id') ?? undefined;
  let body: any = undefined;

  try {
    if (typeof res.json === 'function') {
      body = await res.json();
    } else if (typeof res.text === 'function') {
      await res.text(); // consume for completeness; content ignored
    }
  } catch {
    // Ignore parse errors; we'll fall back to generic
  }

  if (isObject(body)) {
    const dto = body as Partial<ServerErrorDTO>;
    const status = typeof dto.status === 'number' ? dto.status : (res.status ?? 500);
    const code: ErrorCode = (dto.code as ErrorCode) ?? 'INTERNAL_ERROR';
    const message = typeof dto.message === 'string' && dto.message.trim()
      ? dto.message
      : 'Something went wrong. Please try again.';
    const fieldErrors = isObject(dto.fieldErrors)
      ? Object.keys(dto.fieldErrors as any).reduce<Record<string, string>>((acc, k) => {
          const v = (dto.fieldErrors as any)[k];
          if (typeof v === 'string') acc[k] = v;
          return acc;
        }, {})
      : undefined;
    const errorId = typeof dto.errorId === 'string' ? dto.errorId : undefined;
    const appErr: AppError = { status, code, message, fieldErrors, requestId, errorId };
    if (process.env.NODE_ENV !== 'production') {
      // eslint-disable-next-line no-console
      console.error('API Error', {
        requestId: appErr.requestId,
        errorId: appErr.errorId,
        status: appErr.status,
        code: appErr.code,
        message: appErr.message,
      });
    }
    return appErr;
  }

  // Non-JSON or malformed
  const appErr: AppError = {
    status: res.status ?? 500,
    code: 'INTERNAL_ERROR',
    message: 'Something went wrong. Please try again.',
    requestId,
  };
  if (process.env.NODE_ENV !== 'production') {
    // eslint-disable-next-line no-console
    console.error('API Error', {
      requestId: appErr.requestId,
      status: appErr.status,
      code: appErr.code,
      message: appErr.message,
    });
  }
  return appErr;
}
