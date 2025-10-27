import express from 'express';
import request from 'supertest';
import { requestIdMiddleware } from '../middleware/requestId';
import { errorMiddleware } from '../middleware/error';
import { ValidationError, VALIDATION_ERROR, INTERNAL_ERROR } from '../errors';

function createTestApp() {
  const app = express();
  app.use(express.json());
  app.use(requestIdMiddleware);

  app.post('/known', (_req, _res) => {
    throw new ValidationError('Email is required', { field: 'email' });
  });

  app.get('/unknown', (_req, _res) => {
    throw new Error('Sensitive internal details');
  });

  app.use(errorMiddleware);
  return app;
}

describe('errorMiddleware', () => {
  it('normalizes known errors and sets X-Request-Id', async () => {
    const app = createTestApp();
    const reqId = 'req-known-123';
    const res = await request(app)
      .post('/known')
      .set('X-Request-Id', reqId)
      .send({ email: '' });

    expect(res.status).toBe(400);
    expect(res.headers['x-request-id']).toBe(reqId);
    expect(res.body).toHaveProperty('errorId');
    expect(res.body).toMatchObject({
      status: 400,
      code: VALIDATION_ERROR,
      message: 'Email is required',
      fieldErrors: { email: 'Email is required' },
      details: { correlationId: reqId },
    });
  });

  it('masks unknown errors to INTERNAL_ERROR and logs a single structured line', async () => {
    const app = createTestApp();
    const reqId = 'req-unknown-456';
    const logSpy = jest.spyOn(console, 'log').mockImplementation(() => {});

    const res = await request(app)
      .get('/unknown')
      .set('X-Request-Id', reqId);

    expect(res.status).toBe(500);
    expect(res.headers['x-request-id']).toBe(reqId);
    expect(res.body.code).toBe(INTERNAL_ERROR);
    expect(res.body.message).toBe('Something went wrong. Please try again.');
    expect(res.body.details?.correlationId).toBe(reqId);
    // One structured log line
    expect(logSpy).toHaveBeenCalledTimes(1);
    const logged = logSpy.mock.calls[0][0];
    const parsed = JSON.parse(logged);
    expect(parsed).toMatchObject({ requestId: reqId, code: INTERNAL_ERROR, status: 500, method: 'GET' });
    logSpy.mockRestore();
  });
});
