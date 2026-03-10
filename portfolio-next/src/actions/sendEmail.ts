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
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
        <div style="text-align: center; padding-bottom: 20px; border-bottom: 1px solid #ddd;">
          <h1 style="color: #444;">¡Nuevo Mensaje del Portafolio!</h1>
        </div>
        <div style="padding: 20px 0;">
          <p>Has recibido un nuevo mensaje de:</p>
          <ul style="list-style: none; padding: 0;">
            <li style="margin-bottom: 10px;"><strong>Nombre:</strong> ${name}</li>
            <li style="margin-bottom: 10px;"><strong>Email:</strong> <a href="mailto:${email}" style="color: #007bff; text-decoration: none;">${email}</a></li>
          </ul>
          <p><strong>Mensaje:</strong></p>
          <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px; border: 1px solid #eee;">
            <p>${message}</p>
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
