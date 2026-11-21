import { describe, it, expect } from 'vitest';
import { isValidEmailFormat } from '@/lib/validateEmail';

describe('isValidEmailFormat', () => {
  it('acepta correos comunes', () => {
    expect(isValidEmailFormat('user@example.com')).toBe(true);
    expect(isValidEmailFormat('first.last+tag@sub.domain.co')).toBe(true);
    expect(isValidEmailFormat('o_brien@domain.org')).toBe(true);
    expect(isValidEmailFormat('  user@example.com  ')).toBe(true); // trim
  });

  it('rechaza basura sin formato', () => {
    expect(isValidEmailFormat('')).toBe(false);
    expect(isValidEmailFormat('not-an-email')).toBe(false);
    expect(isValidEmailFormat('@x.com')).toBe(false);
    expect(isValidEmailFormat('user@')).toBe(false);
    expect(isValidEmailFormat('a@b@c.com')).toBe(false);
  });

  it('exige dominio con punto y TLD (bloquea a@b)', () => {
    expect(isValidEmailFormat('a@b')).toBe(false);
    expect(isValidEmailFormat('user@localhost')).toBe(false);
    expect(isValidEmailFormat('foo@domain.c')).toBe(false); // TLD de 1 letra
    expect(isValidEmailFormat('foo@domain.123')).toBe(false);
  });

  it('rechaza dominios malformados', () => {
    expect(isValidEmailFormat('foo@bar..com')).toBe(false);
    expect(isValidEmailFormat('foo@.com')).toBe(false);
    expect(isValidEmailFormat('foo@-bar.com')).toBe(false);
    expect(isValidEmailFormat('foo@bar.com-')).toBe(false);
    expect(isValidEmailFormat('.foo@bar.com')).toBe(false);
    expect(isValidEmailFormat('foo.@bar.com')).toBe(false);
  });

  it('respeta los límites de longitud (RFC 5321)', () => {
    expect(isValidEmailFormat(`${'a'.repeat(65)}@example.com`)).toBe(false); // local > 64
    expect(isValidEmailFormat(`${'a'.repeat(64)}@example.com`)).toBe(true);
    expect(isValidEmailFormat(`${'a'.repeat(250)}@example.com`)).toBe(false); // total > 254
  });
});
