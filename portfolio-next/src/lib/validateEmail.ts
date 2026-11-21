// Validación de formato de correo (RFC 5321/5322 simplificada).
// Se usa en el cliente (feedback inmediato) y en el servidor (defensa en profundidad).

// Límites de longitud de RFC 5321
const MAX_TOTAL = 254;
const MAX_LOCAL = 64;

// Formato estricto: local@dominio.tld
// - local: letras/dígitos y símbolos permitidos, puntos no al inicio/final ni consecutivos
// - dominio: etiquetas válidas (sin guiones al borde) y TLD de 2+ letras
const EMAIL_RE =
  /^[A-Za-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[A-Za-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[A-Za-z0-9](?:[A-Za-z0-9-]*[A-Za-z0-9])?\.)+[A-Za-z]{2,}$/;

/** Valida que el correo tenga un formato estrictamente válido. */
export function isValidEmailFormat(email: string): boolean {
  const value = email.trim();
  if (value.length === 0 || value.length > MAX_TOTAL) return false;

  const atIndex = value.indexOf('@');
  if (atIndex <= 0 || atIndex === value.length - 1) return false;
  if (value.indexOf('@', atIndex + 1) !== -1) return false; // un solo @

  const local = value.slice(0, atIndex);
  if (local.length > MAX_LOCAL || local.includes('..')) return false;

  return EMAIL_RE.test(value);
}
