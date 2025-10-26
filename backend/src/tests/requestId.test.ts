import request from 'supertest';
import express from 'express';
import { requestIdMiddleware } from '../middleware/requestId';

describe('requestIdMiddleware', () => {
  let app: express.Express;

  beforeEach(() => {
    app = express();
    app.use(requestIdMiddleware);
    app.get('/test', (req, res) => {
      res.json({ requestId: (req as any).requestId });
    });
  });

  it('generates a new requestId if none provided', async () => {
    const res = await request(app).get('/test');
    expect(res.headers['x-request-id']).toMatch(/[0-9a-fA-F-]{36}/);
    expect(res.body.requestId).toBe(res.headers['x-request-id']);
  });

  it('reuses X-Request-Id if provided', async () => {
    const customId = 'test-id-123';
    const res = await request(app).get('/test').set('X-Request-Id', customId);
    expect(res.headers['x-request-id']).toBe(customId);
    expect(res.body.requestId).toBe(customId);
  });
});
