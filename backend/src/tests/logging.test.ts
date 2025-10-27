
import { logError, redactPII } from '../utils/logging';

describe('redactPII', () => {
  it('redacts top-level PII fields', () => {
    const input = { name: 'Alice', email: 'alice@example.com', phone: '123', address: 'X', fileContent: 'secret', password: 'pw', other: 'ok' };
    const output = redactPII(input);
    expect(output).toEqual({ name: '[REDACTED]', email: '[REDACTED]', phone: '[REDACTED]', address: '[REDACTED]', fileContent: '[REDACTED]', password: '[REDACTED]', other: 'ok' });
  });

  it('redacts nested PII fields', () => {
    const input = { user: { name: 'Bob', email: 'bob@example.com' }, other: 'ok' };
    const output = redactPII(input);
    expect(output).toEqual({ user: { name: '[REDACTED]', email: '[REDACTED]' }, other: 'ok' });
  });

  it('does not redact non-PII fields', () => {
    const input = { foo: 'bar' };
    const output = redactPII(input);
    expect(output).toEqual({ foo: 'bar' });
  });
});

describe('logError', () => {
  it('logs only whitelisted keys and redacts body', () => {
    const spy = jest.spyOn(console, 'log').mockImplementation(() => {});
    const errorObj = {
      requestId: 'abc',
      code: 'VALIDATION_ERROR',
      status: 400,
      route: '/candidates',
      method: 'POST',
      body: { name: 'Alice', email: 'alice@example.com', other: 'ok' },
      extra: 'should not appear'
    };
    logError(errorObj);
    expect(spy).toHaveBeenCalledWith(
      JSON.stringify({
        requestId: 'abc',
        code: 'VALIDATION_ERROR',
        status: 400,
        route: '/candidates',
        method: 'POST',
        body: { name: '[REDACTED]', email: '[REDACTED]', other: 'ok' }
      })
    );
    spy.mockRestore();
  });
});
