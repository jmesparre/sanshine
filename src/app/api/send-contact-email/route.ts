import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import * as z from 'zod';

const resend = new Resend(process.env.RESEND_API_KEY);

const sendEmailSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  message: z.string().min(10),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsedData = sendEmailSchema.safeParse(body);

    if (!parsedData.success) {
      return NextResponse.json({ error: 'Datos inválidos.' }, { status: 400 });
    }

    const { name, email, message } = parsedData.data;

    const contactEmail = process.env.CONTACT_EMAIL;

    if (!contactEmail) {
      console.error('La variable de entorno CONTACT_EMAIL no está definida.');
      return NextResponse.json({ error: 'Error de configuración del servidor.' }, { status: 500 });
    }

    const { error } = await resend.emails.send({
      from: 'Plataforma Fernanda Sarro <noreply@resend.dev>',
      to: [contactEmail],
      subject: `Nuevo mensaje de contacto de ${name}`,
      html: `
        <h1>Nuevo Mensaje de Contacto</h1>
        <p><strong>Nombre:</strong> ${name}</p>
        <p><strong>Correo Electrónico:</strong> ${email}</p>
        <hr />
        <h2>Mensaje:</h2>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `,
      replyTo: email,
    });

    if (error) {
      console.error('Error al enviar el correo:', error);
      return NextResponse.json({ error: 'Error al enviar el correo.' }, { status: 500 });
    }

    return NextResponse.json({ message: 'Correo enviado exitosamente.' });
  } catch (error) {
    console.error('Error en el endpoint:', error);
    return NextResponse.json({ error: 'Error interno del servidor.' }, { status: 500 });
  }
}
