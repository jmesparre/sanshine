import { NextRequest, NextResponse } from "next/server";
import { MercadoPagoConfig, Preference } from "mercadopago";

const client = new MercadoPagoConfig({
  accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN!,
});

export async function POST(req: NextRequest) {
  try {
    const { id, title, unit_price, currency_id } = await req.json();

    if (!id || !title || !unit_price || !currency_id) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const preferencePayload = {
      items: [
        {
          id,
          title,
          unit_price,
          currency_id,
          quantity: 1,
        },
      ],
      back_urls: {
        success: `${req.nextUrl.origin}/pago-exitoso`,
        failure: `${req.nextUrl.origin}/pago-fallido`,
        pending: `${req.nextUrl.origin}/pago-pendiente`,
      },
      auto_return: "approved",
    };

    const preference = new Preference(client);
    const result = await preference.create({ body: preferencePayload });

    return NextResponse.json({ id: result.id, init_point: result.init_point });
  } catch (error) {
    console.error("Error creating payment preference:", error);
    return NextResponse.json(
      { error: "Failed to create payment preference" },
      { status: 500 }
    );
  }
}
