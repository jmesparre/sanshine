import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { db } from '@/lib/firebase-admin';
import { sendConfirmationEmail } from '@/lib/email-helper';

const PAYPAL_WEBHOOK_ID = process.env.PAYPAL_WEBHOOK_ID;
const PAYPAL_CLIENT_ID = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;
const PAYPAL_CLIENT_SECRET = process.env.PAYPAL_CLIENT_SECRET;

async function getPayPalAccessToken() {
  if (!PAYPAL_CLIENT_ID || !PAYPAL_CLIENT_SECRET) {
    throw new Error('PayPal client ID or secret is not configured.');
  }
  const auth = Buffer.from(`${PAYPAL_CLIENT_ID}:${PAYPAL_CLIENT_SECRET}`).toString('base64');
  const response = await fetch('https://api.paypal.com/v1/oauth2/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': `Basic ${auth}`,
    },
    body: 'grant_type=client_credentials',
  });
  const data = await response.json();
  return data.access_token;
}

async function verifyPayPalWebhook(request: NextRequest, rawBody: string): Promise<boolean> {
  const accessToken = await getPayPalAccessToken();
  const headers = request.headers;
  const authAlgo = headers.get('paypal-auth-algo');
  const certUrl = headers.get('paypal-cert-url');
  const transmissionId = headers.get('paypal-transmission-id');
  const transmissionSig = headers.get('paypal-transmission-sig');
  const transmissionTime = headers.get('paypal-transmission-time');

  if (!PAYPAL_WEBHOOK_ID || !authAlgo || !certUrl || !transmissionId || !transmissionSig || !transmissionTime) {
    return false;
  }

  const response = await fetch('https://api.paypal.com/v1/notifications/verify-webhook-signature', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      auth_algo: authAlgo,
      cert_url: certUrl,
      transmission_id: transmissionId,
      transmission_sig: transmissionSig,
      transmission_time: transmissionTime,
      webhook_id: PAYPAL_WEBHOOK_ID,
      webhook_event: JSON.parse(rawBody),
    }),
  });

  const verification = await response.json();
  return verification.verification_status === 'SUCCESS';
}

export async function POST(request: NextRequest) {
  try {
    const rawBody = await request.text();
    const body = JSON.parse(rawBody);
    console.log('PayPal Webhook received:', body);

    const isVerified = await verifyPayPalWebhook(request, rawBody);

    if (!isVerified) {
      console.warn('PayPal webhook verification failed.');
      return NextResponse.json({ error: 'Webhook verification failed' }, { status: 403 });
    }

    if (body.event_type === 'CHECKOUT.ORDER.APPROVED') {
      const orderId = body.resource.purchase_units[0].custom_id;

      if (orderId && db) {
        const orderRef = db.collection('orders').doc(orderId);
        await orderRef.update({ status: 'paid' });
        console.log(`Order ${orderId} updated to paid.`);
        
        await sendConfirmationEmail(orderId);
      }
    }

    return NextResponse.json({ status: 'success' });
  } catch (error) {
    console.error('Error processing PayPal webhook:', error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
