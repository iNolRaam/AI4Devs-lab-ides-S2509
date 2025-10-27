// Structured logger with redaction for PII

const PII_FIELDS = new Set(['name', 'email', 'phone', 'address', 'fileContent', 'password']);

type AnyObject = { [key: string]: any };

function redactPII(obj: any): any {
  if (!obj || typeof obj !== 'object') return obj;
  const clone: any = Array.isArray(obj) ? [] : {};
  for (const key in obj) {
    if (PII_FIELDS.has(key)) {
      clone[key] = '[REDACTED]';
    } else if (typeof obj[key] === 'object' && obj[key] !== null) {
      clone[key] = redactPII(obj[key]);
    } else {
      clone[key] = obj[key];
    }
  }
  return clone;
}

interface LogErrorParams {
  requestId?: string;
  code?: string;
  status?: number;
  route?: string;
  method?: string;
  body?: any;
  [key: string]: any;
}

function logError({ requestId, code, status, route, method, body, ...rest }: LogErrorParams): void {
  const logEntry: AnyObject = {
    requestId,
    code,
    status,
    route,
    method,
    body: body ? redactPII(body) : undefined,
    ...rest // Only non-PII, non-sensitive keys should be added here
  };
  // Only keep whitelisted keys
  const allowed = ['requestId', 'code', 'status', 'route', 'method', 'body'];
  const filtered: AnyObject = {};
  for (const k of allowed) {
    if (logEntry[k] !== undefined) filtered[k] = logEntry[k];
  }
  // Emit as JSON
  console.log(JSON.stringify(filtered));
}

export { logError, redactPII };
