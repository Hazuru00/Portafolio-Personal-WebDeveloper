// Sanitización de entradas de usuario para emails (server actions)

const HTML_ESCAPES: Record<string, string> = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;',
};

/** Escapa caracteres especiales de HTML para inyectar datos de usuario en el email de forma segura. */
export function escapeHtml(value: string): string {
  return value.replace(/[&<>"']/g, (c) => HTML_ESCAPES[c]);
}

/** Elimina saltos de línea (prevención de header injection) y limita el largo. */
export function sanitizeHeaderValue(value: string, maxLength = 100): string {
  return value.replace(/[\r\n]+/g, ' ').slice(0, maxLength);
}
