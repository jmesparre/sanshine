import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { Order } from '@/types';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const order = await req.json() as Order;

    if (!order) {
      return NextResponse.json({ error: 'Order data is missing' }, { status: 400 });
    }

    await resend.emails.send({
      from: 'onboarding@resend.dev', // Reemplazar con un dominio verificado
      to: order.userEmail,
      subject: `Confirmación de tu orden para ${order.serviceName}`,
      html: `<h1>¡Gracias por tu compra, ${order.userName}!</h1>
             <p>Hemos confirmado el pago para tu servicio: ${order.serviceName}.</p>
             <p>Pronto nos pondremos en contacto contigo con más detalles.</p>`,
    });

    return NextResponse.json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
  }
}
