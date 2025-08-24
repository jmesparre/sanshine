import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { Order } from '@/types';
import { db } from '@/lib/firebase-admin';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const order = await req.json() as Order;

    if (!order || !order.userId) {
      return NextResponse.json({ error: 'Order data or userId is missing' }, { status: 400 });
    }

    if (!db) {
      return NextResponse.json({ error: 'Firebase Admin SDK not initialized' }, { status: 500 });
    }

    const userRef = db.collection('users').doc(order.userId);
    const userDoc = await userRef.get();

    if (!userDoc.exists) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const userData = userDoc.data();
    const userEmail = userData?.email;

    if (!userEmail) {
      return NextResponse.json({ error: 'User email not found' }, { status: 404 });
    }

    await resend.emails.send({
      from: 'onboarding@resend.dev', // Reemplazar con un dominio verificado
      to: userEmail,
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
