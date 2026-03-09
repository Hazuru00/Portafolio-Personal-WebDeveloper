'use server';

import { Resend } from 'resend';

// Aquí usamos la variable de entorno, nunca el texto plano
const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmail(formData: FormData) {
  const name = formData.get('name') as string;
  const email = formData.get('email') as string;
  const message = formData.get('message') as string;

  try {
    await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: ['dev.moises.marcano@gmail.com'], // <-- CAMBIA ESTO POR TU CORREO REAL
      subject: `Nuevo mensaje de ${name} Enviado desde HazuDev. Portfolio`,
      replyTo: email,
      html: `
        <div style="font-family: sans-serif; padding: 20px; color: #333;">
          <h2>¡Nuevo contacto desde tu portafolio!</h2>
          <p><strong>Nombre:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Mensaje:</strong></p>
          <div style="background: #f4f4f4; padding: 15px; border-radius: 5px;">
            ${message}
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
