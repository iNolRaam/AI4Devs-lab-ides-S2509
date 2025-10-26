import request from 'supertest';
import prisma, { app } from '../index';

describe('POST /api/candidates - persistence', () => {
  beforeAll(async () => {
    // Clean up test candidate if exists
    await prisma.candidate.deleteMany({ where: { email: 'persist-test@example.com' } });
  });
  afterAll(async () => {
    await prisma.candidate.deleteMany({ where: { email: 'persist-test@example.com' } });
    await prisma.$disconnect();
  });

  it('creates and returns candidate record with all fields and timestamps', async () => {
    const payload = {
      firstName: 'Persist',
      lastName: 'Test',
      email: 'persist-test@example.com',
      phone: '+1 555 000 0000',
      address: '123 Persist St',
      education: 'MSc Testing',
      workExperience: '5 years QA',
    };
    const res = await request(app).post('/api/candidates').send(payload);
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('candidate');
    const candidate = res.body.candidate;
    expect(candidate).toMatchObject(payload);
    expect(candidate).toHaveProperty('id');
    expect(candidate).toHaveProperty('createdAt');
    // Confirm DB record exists
    const dbRecord = await prisma.candidate.findUnique({ where: { email: payload.email } });
    expect(dbRecord).not.toBeNull();
    expect(dbRecord?.firstName).toBe(payload.firstName);
    expect(dbRecord?.createdAt).toBeTruthy();
  });
});