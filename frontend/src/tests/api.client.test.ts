import { decodeError, AppError, ServerErrorDTO } from '../api/client';

function makeHeaders(map: Record<string, string> = {}) {
  return {
    get: (name: string) => map[name] ?? map[name.toLowerCase()] ?? null,
  } as any;
}

describe('decodeError', () => {
  it('decodes server DTO with fieldErrors and requestId from header', async () => {
    const body: ServerErrorDTO = {
      errorId: 'err-123',
      status: 400,
      code: 'VALIDATION_ERROR',
      message: 'Email is required',
      fieldErrors: { email: 'Email is required' },
      details: { correlationId: 'req-abc' },
    };
    const fakeResponse = {
      status: 400,
      headers: makeHeaders({ 'X-Request-Id': 'req-abc' }),
      json: async () => body,
    };

    const err = await decodeError(fakeResponse);
    expect(err).toEqual({
      status: 400,
      code: 'VALIDATION_ERROR',
      message: 'Email is required',
      fieldErrors: { email: 'Email is required' },
      requestId: 'req-abc',
      errorId: 'err-123',
    });
  });

  it('falls back to INTERNAL_ERROR when body is non-JSON or malformed', async () => {
    const fakeResponse = {
      status: 500,
      headers: makeHeaders(),
      text: async () => 'Internal Server Error',
    };

    const err = await decodeError(fakeResponse);
    expect(err.status).toBe(500);
    expect(err.code).toBe('INTERNAL_ERROR');
    expect(err.message).toBe('Something went wrong. Please try again.');
  });

  it('handles network failures as INTERNAL_ERROR with status 0', async () => {
    const networkErr = new Error('Failed to fetch');
    const err = await decodeError(networkErr);
    expect(err.status).toBe(0);
    expect(err.code).toBe('INTERNAL_ERROR');
    expect(err.message).toBe('Network error. Please try again.');
  });

  it('uses response status if DTO missing status/code', async () => {
    const fakeResponse = {
      status: 418,
      headers: makeHeaders({ 'X-Request-Id': 'req-teapot' }),
      json: async () => ({ message: 'I am a teapot' }),
    };
    const err: AppError = await decodeError(fakeResponse);
    expect(err.status).toBe(418);
    expect(err.code).toBe('INTERNAL_ERROR');
    expect(err.requestId).toBe('req-teapot');
  });

  it('logs requestId on handled server errors in non-production environments', async () => {
    const spy = jest.spyOn(console, 'error').mockImplementation(() => {});
    const body: Partial<ServerErrorDTO> = {
      status: 409,
      code: 'DUPLICATE_EMAIL',
      message: 'Email already exists',
      errorId: 'e-123',
    };
    const fakeResponse = {
      status: 409,
      headers: makeHeaders({ 'X-Request-Id': 'req-xyz' }),
      json: async () => body,
    };
    await decodeError(fakeResponse);
    expect(spy).toHaveBeenCalled();
    const callArgs = spy.mock.calls.find(([msg]) => msg === 'API Error');
    expect(callArgs).toBeTruthy();
    const payload = callArgs?.[1];
    expect(payload).toMatchObject({ requestId: 'req-xyz', status: 409, code: 'DUPLICATE_EMAIL' });
    spy.mockRestore();
  });
});
