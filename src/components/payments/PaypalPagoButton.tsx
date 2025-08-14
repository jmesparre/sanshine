"use client";

import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import type { OnApproveData, OnApproveActions } from "@paypal/paypal-js";
import { useRouter } from 'next/navigation';

interface PaypalPagoButtonProps {
  amount: string;
  currency: string;
  serviceName: string;
}

const PaypalPagoButton: React.FC<PaypalPagoButtonProps> = ({ amount, currency, serviceName }) => {
  const router = useRouter();
  const paypalOptions = {
    clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || "test",
    currency: currency,
    intent: "capture",
  };

  const createOrder = () => {
    return fetch("/api/create-paypal-order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        cart: [
          {
            sku: serviceName,
            quantity: 1,
            value: amount,
          },
        ],
      }),
    })
      .then((response) => response.json())
      .then((order) => order.id);
  };

  const onApprove = (data: OnApproveData, actions: OnApproveActions) => {
    // This function is called when the user approves the payment.
    // Here you would typically capture the order details and save them to your database.
    console.log("Payment approved:", data);
    
    // For now, we'll just redirect to the success page.
    // In a real implementation, you would first verify the payment on your server.
    if (actions.order) {
        return actions.order.capture().then(() => {
            router.push('/pago-exitoso');
        });
    }
    return Promise.resolve();
  };

  const onError = (err: Record<string, unknown>) => {
    console.error("PayPal Error:", err);
    router.push('/pago-fallido');
  };

  return (
    <PayPalScriptProvider options={paypalOptions}>
      <PayPalButtons
        style={{ layout: "vertical" }}
        createOrder={createOrder}
        onApprove={onApprove}
        onError={onError}
      />
    </PayPalScriptProvider>
  );
};

export default PaypalPagoButton;
