import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { checkRateLimit } from '@/lib/rateLimit';

describe('checkRateLimit', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('permite las primeras 5 solicitudes dentro de la ventana', () => {
    for (let i = 0; i < 5; i++) {
      expect(checkRateLimit('1.2.3.4').allowed).toBe(true);
    }
  });

  it('bloquea la sexta solicitud dentro de la misma ventana', () => {
    for (let i = 0; i < 5; i++) checkRateLimit('5.6.7.8');

    const result = checkRateLimit('5.6.7.8');
    expect(result.allowed).toBe(false);
    expect(result.retryAfter).toBeGreaterThan(0);
  });

  it('las IPs tienen contadores independientes (no global)', () => {
    for (let i = 0; i < 5; i++) checkRateLimit('9.9.9.9');

    expect(checkRateLimit('9.9.9.9').allowed).toBe(false);
    expect(checkRateLimit('8.8.8.8').allowed).toBe(true);
  });

  it('resetea el contador después de la ventana de 1 minuto', () => {
    for (let i = 0; i < 5; i++) checkRateLimit('2.2.2.2');
    expect(checkRateLimit('2.2.2.2').allowed).toBe(false);

    vi.advanceTimersByTime(61_000);

    expect(checkRateLimit('2.2.2.2').allowed).toBe(true);
  });
});
