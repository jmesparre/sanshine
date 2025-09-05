import { NextRequest, NextResponse } from 'next/server';
import { sendConfirmationEmail } from '@/lib/email-helper';
import { Order } from '@/types';

export async function POST(req: NextRequest) {
  try {
    const order = await req.json() as Order;

    if (!order || !order.id) {
      return NextResponse.json({ error: 'Order data or orderId is missing' }, { status: 400 });
    }

    await sendConfirmationEmail(order.id);

    return NextResponse.json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return NextResponse.json({ error: `Failed to send email: ${errorMessage}` }, { status: 500 });
  }
}
