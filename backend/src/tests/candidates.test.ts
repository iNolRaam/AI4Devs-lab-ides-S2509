import request from 'supertest';
import prisma, { app } from '../index';

describe('POST /api/candidates - server-side validation', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('returns 400 with field errors when required fields are missing', async () => {
    const res = await request(app).post('/api/candidates').send({});
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty('errors');
    expect(res.body.errors).toMatchObject({
      firstName: expect.any(String),
      lastName: expect.any(String),
      email: expect.any(String),
      phone: expect.any(String),
      address: expect.any(String),
      education: expect.any(String),
      workExperience: expect.any(String),
    });
  });

  it('returns 400 for invalid email and phone format', async () => {
    const res = await request(app).post('/api/candidates').send({
      firstName: 'Jane',
      lastName: 'Doe',
      email: 'invalid-email',
      phone: '12',
      address: '123 Main St',
      education: 'BSc',
      workExperience: '2 years',
    });
    expect(res.status).toBe(400);
    expect(res.body.errors).toMatchObject({
      email: expect.any(String),
      phone: expect.any(String),
    });
  });

  it('returns 400 with field error when email already exists', async () => {
    // Mock duplicate email found
    jest
      .spyOn(prisma, '$queryRaw')
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .mockResolvedValue([{ exists: 1 }] as any);

    const res = await request(app).post('/api/candidates').send({
      firstName: 'Jane',
      lastName: 'Doe',
      email: 'jane@example.com',
      phone: '+1 555 123 4567',
      address: '123 Main St',
      education: 'BSc',
      workExperience: '2 years',
    });
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty('errors');
    expect(res.body.errors).toHaveProperty('email');
  });
});
