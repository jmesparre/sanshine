import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { db } from '@/lib/firebase-admin';
import { MercadoPagoConfig, Payment } from 'mercadopago';

const accessToken = process.env.MP_ACCESS_TOKEN;

if (!accessToken) {
  console.error('MP_ACCESS_TOKEN is not defined');
  throw new Error('MP_ACCESS_TOKEN is not defined');
}

const client = new MercadoPagoConfig({ accessToken });

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    console.log('Mercado Pago Webhook received:', body);

    if (body.type === 'payment') {
      const paymentId = body.data.id;
      const payment = new Payment(client);

      const paymentInfo = await payment.get({ id: paymentId });

      if (paymentInfo && paymentInfo.status === 'approved') {
        const orderId = paymentInfo.external_reference;

        if (orderId && db) {
          const orderRef = db.collection('orders').doc(orderId);
          await orderRef.update({ status: 'paid' });
          console.log(`Order ${orderId} updated to paid.`);

          // TODO: Trigger confirmation email
        }
      }
    }

    return NextResponse.json({ status: 'success' });
  } catch (error) {
    console.error('Error processing Mercado Pago webhook:', error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
