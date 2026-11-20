import { describe, it, expect } from 'vitest';
import { escapeHtml, sanitizeHeaderValue } from '@/lib/sanitize';

describe('escapeHtml', () => {
  it('escapa los caracteres especiales de HTML', () => {
    expect(escapeHtml(`<script>alert("x") & 'y'</script>`)).toBe(
      '&lt;script&gt;alert(&quot;x&quot;) &amp; &#39;y&#39;&lt;/script&gt;'
    );
  });

  it('deja el texto normal intacto', () => {
    expect(escapeHtml('Hola, esto es una prueba 123')).toBe('Hola, esto es una prueba 123');
  });
});

describe('sanitizeHeaderValue', () => {
  it('elimina saltos de línea para prevenir header injection', () => {
    expect(sanitizeHeaderValue('spam\r\nBcc: victima@x.com')).toBe('spam Bcc: victima@x.com');
    expect(sanitizeHeaderValue('nombre\ncon\nsaltos')).toBe('nombre con saltos');
  });

  it('limita el largo del valor', () => {
    expect(sanitizeHeaderValue('a'.repeat(500))).toHaveLength(100);
  });
});
