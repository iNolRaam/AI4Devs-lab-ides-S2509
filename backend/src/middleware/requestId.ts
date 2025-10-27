import { Request, Response, NextFunction } from 'express';
import { randomUUID } from 'node:crypto';

/**
 * Middleware to attach a unique requestId to each request.
 * - Reuses X-Request-Id header if present, else generates a UUID.
 * - Sets req.requestId and X-Request-Id response header.
 */
export function requestIdMiddleware(req: Request & { requestId?: string }, res: Response, next: NextFunction) {
  const incomingId = req.header('X-Request-Id');
  const requestId = incomingId && typeof incomingId === 'string' ? incomingId : randomUUID();
  req.requestId = requestId;
  res.setHeader('X-Request-Id', requestId);
  next();
}
