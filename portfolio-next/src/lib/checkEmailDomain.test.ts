import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

vi.mock('node:dns/promises', () => {
  const resolveMx = vi.fn();
  const resolve4 = vi.fn();
  class Resolver {
    setServers() {}
    resolveMx(...args: unknown[]) {
      return resolveMx(...args);
    }
    resolve4(...args: unknown[]) {
      return resolve4(...args);
    }
  }
  return {
    resolveMx,
    resolve4,
    Resolver,
  };
});

import { resolveMx, resolve4 } from 'node:dns/promises';
import { checkEmailDomain } from '@/lib/checkEmailDomain';

const mockMx = vi.mocked(resolveMx);
const mockA = vi.mocked(resolve4);

const notFound = () => Object.assign(new Error('ENOTFOUND'), { code: 'ENOTFOUND' });

describe('checkEmailDomain', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('devuelve true si el dominio tiene registros MX', async () => {
    mockMx.mockResolvedValue([{ exchange: 'mail.example.com', priority: 10 }]);
    expect(await checkEmailDomain('user@example.com')).toBe(true);
    expect(mockMx).toHaveBeenCalledWith('example.com');
  });

  it('usa el registro A como respaldo si no hay MX (RFC 5321)', async () => {
    mockMx.mockResolvedValue([]);
    mockA.mockResolvedValue(['93.184.216.34']);
    expect(await checkEmailDomain('user@example.com')).toBe(true);
    expect(mockA).toHaveBeenCalledWith('example.com');
  });

  it('devuelve false si no hay MX ni registro A (dominio inexistente)', async () => {
    mockMx.mockRejectedValue(notFound());
    mockA.mockRejectedValue(notFound());
    expect(await checkEmailDomain('user@no-existe-xyz123.com')).toBe(false);
  });

  it('devuelve false si el email no tiene dominio', async () => {
    expect(await checkEmailDomain('sin-arroba')).toBe(false);
    expect(await checkEmailDomain('user@')).toBe(false);
    expect(mockMx).not.toHaveBeenCalled();
  });

  it('si DNS tarda demasiado, deja pasar el correo (fail-open)', async () => {
    vi.useFakeTimers();
    mockMx.mockReturnValue(new Promise(() => {})); // nunca resuelve

    const promise = checkEmailDomain('user@example.com');
    await vi.advanceTimersByTimeAsync(4500);

    expect(await promise).toBe(true);
  });
});
