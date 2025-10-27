import { randomUUID } from 'node:crypto';
import {
  INTERNAL_ERROR,
  VALIDATION_ERROR,
  DUPLICATE_EMAIL,
  FILE_TOO_LARGE,
  INVALID_FILE_TYPE,
  ErrorCode,
} from '../errors';

export type FieldErrors = Record<string, string>;

export interface NormalizedErrorDTO {
  errorId: string;
  status: number;
  code: ErrorCode;
  message: string;
  fieldErrors?: FieldErrors;
  details?: {
    correlationId?: string;
    hint?: string;
  };
}

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

/**
 * normalizeError converts any thrown error into a stable, safe DTO.
 * - Known typed errors map to canonical codes/status and preserve safe messages.
 * - Unknown errors map to INTERNAL_ERROR (500) with a generic message.
 * - Never includes PII; only whitelisted, non-sensitive details are emitted.
 */
export function normalizeError(
  err: unknown,
  opts?: { requestId?: string }
): NormalizedErrorDTO {
  const errorId = randomUUID();
  const correlationId = opts?.requestId;

  // Defaults for unknown errors
  let status = 500;
  let code: ErrorCode = INTERNAL_ERROR;
  let message = 'Something went wrong. Please try again.';
  let fieldErrors: FieldErrors | undefined;

  // Map known errors by inspecting safe properties (avoids brittle instanceof checks across module boundaries)
  if (isObject(err)) {
    const anyErr = err as any;
    const errCode: unknown = anyErr.code;
    const errStatus: unknown = anyErr.status;

    switch (errCode) {
      case VALIDATION_ERROR: {
        status = typeof errStatus === 'number' ? errStatus : 400;
        code = VALIDATION_ERROR;
        // If details.fieldErrors provided, prefer it
        if (isObject(anyErr.details) && isObject(anyErr.details.fieldErrors)) {
          const fe = anyErr.details.fieldErrors as Record<string, unknown>;
          fieldErrors = Object.keys(fe).reduce<FieldErrors>((acc, k) => {
            const v = fe[k];
            if (typeof v === 'string') acc[k] = v;
            return acc;
          }, {});
        } else if (typeof anyErr.field === 'string') {
          // single-field variant
          const field = anyErr.field as string;
          const msg = typeof anyErr.message === 'string' && anyErr.message.trim() ? anyErr.message : 'Invalid value';
          fieldErrors = { [field]: msg };
        }
        message = typeof anyErr.message === 'string' && anyErr.message.trim() ? anyErr.message : 'Validation failed';
        break;
      }
      case DUPLICATE_EMAIL: {
        status = 409;
        code = DUPLICATE_EMAIL;
        message = typeof anyErr.message === 'string' && anyErr.message.trim() ? anyErr.message : 'Email already exists';
        break;
      }
      case FILE_TOO_LARGE: {
        status = 413;
        code = FILE_TOO_LARGE;
        message = typeof anyErr.message === 'string' && anyErr.message.trim() ? anyErr.message : 'File too large';
        break;
      }
      case INVALID_FILE_TYPE: {
        status = 415;
        code = INVALID_FILE_TYPE;
        message = typeof anyErr.message === 'string' && anyErr.message.trim() ? anyErr.message : 'Invalid file type';
        break;
      }
      case INTERNAL_ERROR: {
        status = 500;
        code = INTERNAL_ERROR;
        message = typeof anyErr.message === 'string' && anyErr.message.trim() ? anyErr.message : 'Internal server error';
        break;
      }
      default: {
        // leave defaults (500, INTERNAL_ERROR, generic message)
      }
    }
  }

  const dto: NormalizedErrorDTO = {
    errorId,
    status,
    code,
    message,
    ...(fieldErrors && Object.keys(fieldErrors).length > 0 ? { fieldErrors } : {}),
    details: correlationId ? { correlationId } : undefined,
  };

  return dto;
}

