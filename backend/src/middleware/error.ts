import { Request, Response, NextFunction } from 'express';
import { normalizeError } from '../utils/errorNormalizer';
import { logError } from '../utils/logging';

/**
 * Centralized Express error-handling middleware.
 * - Normalizes errors to a safe DTO
 * - Sets HTTP status from DTO
 * - Ensures X-Request-Id header is present
 * - Emits a single structured log line (PII redacted)
 */
export function errorMiddleware(err: unknown, req: Request & { requestId?: string }, res: Response, _next: NextFunction) {
  const requestId = req.requestId || req.header('X-Request-Id') || undefined;

  const dto = normalizeError(err, { requestId });

  // Emit structured log with redacted body
  try {
    logError({
      requestId,
      code: dto.code,
      status: dto.status,
      route: req.originalUrl,
      method: req.method,
      body: req.body,
    });
  } catch {
    // Never block response due to logging failures
  }

  if (requestId) {
    res.setHeader('X-Request-Id', requestId);
  }

  res.status(dto.status).json(dto);
}
