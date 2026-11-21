'use server';

import { Resend } from 'resend';
import { headers } from 'next/headers';
import { checkRateLimit } from '@/lib/rateLimit';
import { escapeHtml, sanitizeHeaderValue } from '@/lib/sanitize';
import { isValidEmailFormat } from '@/lib/validateEmail';
import { checkEmailDomain } from '@/lib/checkEmailDomain';

// Aquí usamos la variable de entorno, nunca el texto plano.
// Init perezoso: si falta la API key no crashea al cargar el módulo,
// sino que devuelve un error controlado al enviar.
function getResend(): Resend | null {
  const key = process.env.RESEND_API_KEY;
  return key ? new Resend(key) : null;
}

// Resultado tipado: kind distingue rate limit de errores de validación
type SendEmailResult =
  | { success: true }
  | { success: false; error: string; kind: 'rateLimit' | 'validation' }
  | { success: false; error?: undefined; kind?: undefined };

export async function sendEmail(formData: FormData): Promise<SendEmailResult> {
  const name = ((formData.get('name') as string) ?? '').trim();
  const email = ((formData.get('email') as string) ?? '').trim();
  const message = ((formData.get('message') as string) ?? '').trim();

  // Validación en servidor: formato estricto + dominio real (MX/A por DNS)
  if (!isValidEmailFormat(email)) {
    return { success: false, error: 'El correo no tiene un formato válido.', kind: 'validation' };
  }
  if (!(await checkEmailDomain(email))) {
    return {
      success: false,
      error: 'El dominio del correo no existe o no puede recibir mensajes.',
      kind: 'validation',
    };
  }

  // Rate limit por IP real (x-forwarded-for) para no bloquear a todos los visitantes
  const hdrs = await headers();
  const ip = hdrs.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
  const { allowed, retryAfter } = checkRateLimit(ip);
  if (!allowed) {
    return {
      success: false,
      error: `Demasiadas solicitudes. Intenta de nuevo en ${retryAfter}s`,
      kind: 'rateLimit',
    };
  }

  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safeMessage = escapeHtml(message);
  const subjectName = sanitizeHeaderValue(name);

  const resend = getResend();
  if (!resend) {
    console.error('RESEND_API_KEY no está configurada');
    return { success: false };
  }

  try {
    await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: ['dev.moises.marcano@gmail.com'], // <-- CAMBIA ESTO POR TU CORREO REAL
      subject: `Nuevo mensaje de ${subjectName} Enviado desde HazuDev. Portfolio`,
      replyTo: email,
      html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
        <div style="text-align: center; padding-bottom: 20px; border-bottom: 1px solid #ddd;">
          <h1 style="color: #444;">¡Nuevo Mensaje del Portafolio!</h1>
        </div>
        <div style="padding: 20px 0;">
          <p>Has recibido un nuevo mensaje de:</p>
          <ul style="list-style: none; padding: 0;">
            <li style="margin-bottom: 10px;"><strong>Nombre:</strong> ${safeName}</li>
            <li style="margin-bottom: 10px;"><strong>Email:</strong> <a href="mailto:${safeEmail}" style="color: #007bff; text-decoration: none;">${safeEmail}</a></li>
          </ul>
          <p><strong>Mensaje:</strong></p>
          <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px; border: 1px solid #eee;">
            <p>${safeMessage}</p>
          </div>
        </div>
        <div style="text-align: center; padding-top: 20px; border-top: 1px solid #ddd; font-size: 12px; color: #888;">
          <p>Enviado desde tu portafolio HazuDev.</p>
        </div>
      </div>
      `,
    });

    return { success: true };
  } catch (error) {
    console.error("Error de Resend:", error);
    return { success: false };
  }
}
