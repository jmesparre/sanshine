import { NextResponse } from 'next/server';

const PAYPAL_CLIENT_ID = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;
const PAYPAL_CLIENT_SECRET = process.env.PAYPAL_CLIENT_SECRET;
const PAYPAL_API_BASE = process.env.NODE_ENV === 'production' 
  ? 'https://api.paypal.com' 
  : 'https://api.sandbox.paypal.com';

async function getPayPalAccessToken() {
  if (!PAYPAL_CLIENT_ID || !PAYPAL_CLIENT_SECRET) {
    throw new Error('PayPal client ID or secret is not configured.');
  }
  const auth = Buffer.from(`${PAYPAL_CLIENT_ID}:${PAYPAL_CLIENT_SECRET}`).toString('base64');
  const response = await fetch(`${PAYPAL_API_BASE}/v1/oauth2/token`, {
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

export async function POST(request: Request) {
  try {
    const { orderId, serviceName, amount, currency } = await request.json();
    const accessToken = await getPayPalAccessToken();

    // Ensure the amount is a string with two decimal places
    const formattedAmount = parseFloat(amount).toFixed(2);

    const response = await fetch(`${PAYPAL_API_BASE}/v2/checkout/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        intent: 'CAPTURE',
        purchase_units: [{
          custom_id: orderId,
          description: serviceName,
          amount: {
            currency_code: currency,
            value: formattedAmount,
          },
        }],
      }),
    });

    const order = await response.json();

    if (!response.ok) {
      console.error('PayPal API Error:', order);
      throw new Error(`PayPal API Error: ${order.message || 'Unknown error'}`);
    }

    return NextResponse.json({ id: order.id });

  } catch (error) {
    console.error('Failed to create PayPal order:', error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return NextResponse.json({ error: 'Failed to create PayPal order.', details: errorMessage }, { status: 500 });
  }
}
