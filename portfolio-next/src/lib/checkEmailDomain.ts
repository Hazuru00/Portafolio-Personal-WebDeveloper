// Verificación de que el dominio del correo puede recibir mensajes:
// consulta DNS (MX con respaldo a registro A). Solo para uso en servidor.

import { Resolver } from 'node:dns/promises';

// Si el DNS no responde a tiempo, se deja pasar el correo (mejor un spam
// posible que perder un mensaje legítimo por una red lenta)
const DNS_TIMEOUT_MS = 4000;

// Servidores públicos: en algunos entornos el resolver local (p. ej.
// systemd-resolved) tarda varios segundos en responder a dominios inexistentes
const resolver = new Resolver();
try {
  resolver.setServers(['8.8.8.8', '1.1.1.1']);
} catch {
  // Si no se pueden fijar, se usan los del sistema
}

// Códigos que indican de forma concluyente que no existen registros
const MISSING_CODES = new Set(['ENOTFOUND', 'ENODATA']);

/**
 * Ejecuta una consulta DNS. Devuelve true/false si hay registros o no,
 * o null cuando la respuesta no es concluyente (error de red, timeout...).
 */
async function hasRecords(
  query: () => Promise<{ length: number }>,
): Promise<boolean | null> {
  try {
    return (await query()).length > 0;
  } catch (err) {
    const code = (err as NodeJS.ErrnoException).code;
    return code && MISSING_CODES.has(code) ? false : null;
  }
}

async function domainHasMailRecords(domain: string): Promise<boolean> {
  const mx = await hasRecords(() => resolver.resolveMx(domain));
  if (mx === true) return true;
  if (mx === null) return true; // DNS no concluyente: fail-open

  // Sin MX: se intenta con el registro A (RFC 5321 §5.1)
  const a = await hasRecords(() => resolver.resolve4(domain));
  return a !== false; // false solo si tampoco hay A (concluyente)
}

/**
 * Comprueba por DNS si el dominio del correo existe y puede recibir mensajes.
 * Devuelve false solo cuando el dominio es inexistente/malformado de forma
 * concluyente; ante dudas o timeouts deja pasar (fail-open).
 */
export function checkEmailDomain(email: string): Promise<boolean> {
  const atIndex = email.lastIndexOf('@');
  if (atIndex <= 0 || atIndex === email.length - 1) return Promise.resolve(false);

  const domain = email.slice(atIndex + 1).toLowerCase();

  return new Promise((resolve) => {
    const timer = setTimeout(() => resolve(true), DNS_TIMEOUT_MS);
    void domainHasMailRecords(domain).then((ok) => {
      clearTimeout(timer);
      resolve(ok);
    });
  });
}
