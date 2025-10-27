import request from 'supertest';
import prisma, { app } from '../index';
import {
  VALIDATION_ERROR,
  DUPLICATE_EMAIL,
  FILE_TOO_LARGE,
  INTERNAL_ERROR,
} from '../errors';

describe('POST /api/candidates — error DTO integration', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('returns 400 VALIDATION_ERROR with fieldErrors and X-Request-Id', async () => {
    const reqId = 'req-err10-validate-1';
    const res = await request(app)
      .post('/api/candidates')
      .set('X-Request-Id', reqId)
      .send({});

    expect(res.status).toBe(400);
    expect(res.headers['x-request-id']).toBe(reqId);
    expect(res.body).toHaveProperty('errorId');
    expect(res.body.code).toBe(VALIDATION_ERROR);
    expect(res.body).toHaveProperty('fieldErrors');
    // spot-check a few required fields
    expect(res.body.fieldErrors).toMatchObject({
      firstName: expect.any(String),
      lastName: expect.any(String),
      email: expect.any(String),
    });
  });

  it('returns 409 DUPLICATE_EMAIL when email already exists', async () => {
    // Mock duplicate email found in raw query
    jest
      .spyOn(prisma, '$queryRaw')
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .mockResolvedValue([{ exists: 1 }] as any);

    const payload = {
      firstName: 'Jane',
      lastName: 'Doe',
      email: 'jane@example.com',
      phone: '+1 555 123 4567',
      address: '123 Main St',
      education: 'BSc',
      workExperience: '2 years',
    };

    const res = await request(app).post('/api/candidates').send(payload);
    expect(res.status).toBe(409);
    expect(res.body.code).toBe(DUPLICATE_EMAIL);
    expect(res.body).toHaveProperty('errorId');
    expect(res.headers['x-request-id']).toBeDefined();
  });

  it('returns 413 FILE_TOO_LARGE when CV exceeds 5MB', async () => {
    const bigBuf = Buffer.alloc(5 * 1024 * 1024 + 1, 0x61); // > 5MB
    const payload = {
      firstName: 'John',
      lastName: 'Bigfile',
      email: 'bigfile@example.com',
      phone: '+1 555 987 6543',
      address: '456 Main St',
      education: 'MSc',
      workExperience: '10 years',
    };
    const req = request(app)
      .post('/api/candidates')
      .field('firstName', payload.firstName)
      .field('lastName', payload.lastName)
      .field('email', payload.email)
      .field('phone', payload.phone)
      .field('address', payload.address)
      .field('education', payload.education)
      .field('workExperience', payload.workExperience)
      .attach('cvFile', bigBuf, { filename: 'cv.pdf', contentType: 'application/pdf' });

    const res = await req;
    expect(res.status).toBe(413);
    expect(res.body.code).toBe(FILE_TOO_LARGE);
    expect(res.body).toHaveProperty('errorId');
    expect(res.headers['x-request-id']).toBeDefined();
  });

  it('returns 500 INTERNAL_ERROR on unexpected server failure', async () => {
    // Ensure duplicate check does not short-circuit
    jest
      .spyOn(prisma, '$queryRaw')
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .mockResolvedValue([] as any);
    jest.spyOn(prisma.candidate, 'create').mockRejectedValue(new Error('DB down'));

    const payload = {
      firstName: 'Fail',
      lastName: 'Case',
      email: 'failcase@example.com',
      phone: '+1 555 000 0001',
      address: '777 Main St',
      education: 'BSc',
      workExperience: '1 year',
    };
    const res = await request(app).post('/api/candidates').send(payload);
    expect(res.status).toBe(500);
    expect(res.body.code).toBe(INTERNAL_ERROR);
    // Generic, safe message (no internal details)
    expect(res.body.message).toBe('Something went wrong. Please try again.');
    expect(res.headers['x-request-id']).toBeDefined();
  });
});
